// Progress persistence layer with localStorage backup and Supabase sync
import { supabase } from '@/integrations/supabase/client';

const PROGRESS_KEY = 'dsarena_user_progress';

interface LocalProgress {
  solvedProblems: string[];
  lastUpdated: string;
  userId?: string;
}

// Get progress from localStorage
export function getLocalProgress(): LocalProgress {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading local progress:', e);
  }
  return { solvedProblems: [], lastUpdated: new Date().toISOString() };
}

// Save progress to localStorage
export function saveLocalProgress(problemId: string, userId?: string): void {
  try {
    const current = getLocalProgress();
    if (!current.solvedProblems.includes(problemId)) {
      current.solvedProblems.push(problemId);
    }
    current.lastUpdated = new Date().toISOString();
    current.userId = userId;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Error saving local progress:', e);
  }
}

// Check if problem is solved locally
export function isProblemSolvedLocally(problemId: string): boolean {
  const progress = getLocalProgress();
  return progress.solvedProblems.includes(problemId);
}

// Clear local progress for a user (on logout)
export function clearLocalProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
}

// Sync local progress to Supabase
export async function syncProgressToSupabase(userId: string): Promise<void> {
  const local = getLocalProgress();
  
  for (const problemId of local.solvedProblems) {
    try {
      // Check if already exists in DB
      const { data: existing } = await supabase
        .from('user_solved')
        .select('id')
        .eq('user_id', userId)
        .eq('problem_id', problemId)
        .maybeSingle();
      
      if (!existing) {
        await supabase
          .from('user_solved')
          .insert({
            user_id: userId,
            problem_id: problemId,
            attempts: 1,
          });
      }
    } catch (e) {
      console.error('Error syncing problem to Supabase:', problemId, e);
    }
  }
}

// Save progress to both local and Supabase
export async function saveProgress(
  userId: string,
  problemId: string,
  difficulty: 'easy' | 'medium' | 'hard',
  runtimeMs?: number
): Promise<{ success: boolean; error?: string }> {
  // Always save locally first (offline-first)
  saveLocalProgress(problemId, userId);

  try {
    // Check if already solved in DB
    const { data: existing, error: checkError } = await supabase
      .from('user_solved')
      .select('id, attempts, best_runtime_ms')
      .eq('user_id', userId)
      .eq('problem_id', problemId)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking existing record:', checkError);
      return { success: false, error: checkError.message };
    }

    if (existing) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('user_solved')
        .update({
          attempts: (existing.attempts || 0) + 1,
          best_runtime_ms: runtimeMs && (!existing.best_runtime_ms || runtimeMs < existing.best_runtime_ms)
            ? runtimeMs
            : existing.best_runtime_ms,
          last_attempt_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (updateError) {
        console.error('Error updating user_solved:', updateError);
        return { success: false, error: updateError.message };
      }
    } else {
      // Create new record
      const { error: insertError } = await supabase
        .from('user_solved')
        .insert({
          user_id: userId,
          problem_id: problemId,
          best_runtime_ms: runtimeMs,
          attempts: 1,
        });

      if (insertError) {
        console.error('Error inserting user_solved:', insertError);
        return { success: false, error: insertError.message };
      }

      // Update profile stats
      const difficultyField = `${difficulty}_solved` as 'easy_solved' | 'medium_solved' | 'hard_solved';

      const { data: profile } = await supabase
        .from('profiles')
        .select('total_solved, easy_solved, medium_solved, hard_solved')
        .eq('id', userId)
        .maybeSingle();

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            total_solved: (profile.total_solved || 0) + 1,
            [difficultyField]: (profile[difficultyField] || 0) + 1,
            last_activity_date: new Date().toISOString().split('T')[0],
          })
          .eq('id', userId);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to save progress:', error);
    return { success: false, error: 'Network error' };
  }
}

// Fetch solved problems from Supabase with local fallback
export async function fetchSolvedProblems(userId: string): Promise<Set<string>> {
  try {
    const { data, error } = await supabase
      .from('user_solved')
      .select('problem_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching solved problems:', error);
      // Fall back to local storage
      const local = getLocalProgress();
      return new Set(local.solvedProblems);
    }

    const solvedIds = new Set(data.map(d => d.problem_id));

    // Merge with local progress
    const local = getLocalProgress();
    for (const id of local.solvedProblems) {
      solvedIds.add(id);
    }

    return solvedIds;
  } catch (error) {
    console.error('Error fetching solved problems:', error);
    const local = getLocalProgress();
    return new Set(local.solvedProblems);
  }
}
