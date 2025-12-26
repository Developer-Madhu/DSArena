// Progress persistence layer - Supabase-first with loading states
import { supabase } from '@/integrations/supabase/client';

// In-memory cache for solved problems to avoid flickering
let solvedProblemsCache: { [userId: string]: { problems: Set<string>; lastFetched: number } } = {};
const CACHE_TTL = 30000; // 30 seconds cache

// Fetch solved problems from Supabase (primary source of truth)
export async function fetchSolvedProblems(userId: string): Promise<Set<string>> {
  try {
    // Check cache first
    const cached = solvedProblemsCache[userId];
    if (cached && Date.now() - cached.lastFetched < CACHE_TTL) {
      return cached.problems;
    }

    const { data, error } = await supabase
      .from('user_solved')
      .select('problem_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching solved problems:', error);
      // Return cached data if available, otherwise empty set
      return cached?.problems || new Set();
    }

    const solvedIds = new Set(data.map(d => d.problem_id));

    // Update cache
    solvedProblemsCache[userId] = { problems: solvedIds, lastFetched: Date.now() };

    return solvedIds;
  } catch (error) {
    console.error('Error fetching solved problems:', error);
    const cached = solvedProblemsCache[userId];
    return cached?.problems || new Set();
  }
}

// Check if a problem is solved (sync version using cache)
export function isProblemSolvedCached(problemId: string, userId?: string): boolean {
  if (!userId) return false;
  const cached = solvedProblemsCache[userId];
  return cached?.problems.has(problemId) || false;
}

// Save progress to Supabase
export async function saveProgress(
  userId: string,
  problemId: string,
  difficulty: 'easy' | 'medium' | 'hard',
  runtimeMs?: number
): Promise<{ success: boolean; error?: string }> {
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

    // Update cache immediately
    if (!solvedProblemsCache[userId]) {
      solvedProblemsCache[userId] = { problems: new Set(), lastFetched: Date.now() };
    }
    solvedProblemsCache[userId].problems.add(problemId);
    solvedProblemsCache[userId].lastFetched = Date.now();

    return { success: true };
  } catch (error) {
    console.error('Failed to save progress:', error);
    return { success: false, error: 'Network error' };
  }
}

// Initialize progress cache from Supabase (call on app load)
export async function initializeProgressCache(userId: string): Promise<Set<string>> {
  return fetchSolvedProblems(userId);
}

// Clear progress cache (call on logout)
export function clearProgressCache(): void {
  solvedProblemsCache = {};
}

// Get cached solved problems count for a user
export function getCachedSolvedCount(userId?: string): number {
  if (!userId) return 0;
  const cached = solvedProblemsCache[userId];
  return cached?.problems.size || 0;
}

// Get cached solved problems set
export function getCachedSolvedProblems(userId?: string): Set<string> {
  if (!userId) return new Set();
  const cached = solvedProblemsCache[userId];
  return cached?.problems || new Set();
}

// Force refresh cache from Supabase
export async function refreshProgressCache(userId: string): Promise<Set<string>> {
  // Clear cache to force fresh fetch
  if (solvedProblemsCache[userId]) {
    delete solvedProblemsCache[userId];
  }
  return fetchSolvedProblems(userId);
}
