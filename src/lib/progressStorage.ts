// Progress persistence layer - backend-first with local fallback hydration guard
import { supabase } from '@/integrations/supabase/client';

// In-memory cache for solved problems to avoid flickering
let solvedProblemsCache: { [userId: string]: { problems: Set<string>; lastFetched: number } } = {};
const CACHE_TTL = 30000; // 30 seconds cache

// Local backup (per-user) to prevent UI regressions if backend fetch returns empty temporarily.
const LOCAL_SOLVED_KEY_PREFIX = 'dsarena_solved_v1:';

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

function localSolvedKey(userId: string) {
  return `${LOCAL_SOLVED_KEY_PREFIX}${userId}`;
}

function readLocalSolved(userId: string): Set<string> {
  try {
    const raw = localStorage.getItem(localSolvedKey(userId));
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is string => typeof x === 'string' && x.length > 0));
  } catch {
    return new Set();
  }
}

function writeLocalSolved(userId: string, solved: Set<string>) {
  try {
    localStorage.setItem(localSolvedKey(userId), JSON.stringify(Array.from(solved)));
  } catch {
    // ignore
  }
}

async function seedSolvedToBackend(userId: string, solved: Set<string>) {
  // Best-effort: insert rows; ignore duplicates.
  for (const id of solved) {
    let payload: any;
    if (id.startsWith('host-q-')) {
      payload = { user_id: userId, problem_slug: id, attempts: 1 };
    } else {
      payload = isValidUUID(id)
        ? { user_id: userId, problem_id: id, attempts: 1 }
        : { user_id: userId, problem_slug: id, attempts: 1 };
    }

    const { error } = await supabase.from('user_solved').insert([payload] as any);
    // 23505 = unique_violation (already exists)
    if (error && error.code !== '23505') {
      // Don’t spam console for every row; one error is enough signal.
      console.error('Failed to seed solved problem to backend:', { id, error });
      return;
    }
  }
}

// Fetch solved problems from backend (primary source of truth), with hydration guard.
export async function fetchSolvedProblems(userId: string): Promise<Set<string>> {
  try {
    const cached = solvedProblemsCache[userId];
    if (cached && Date.now() - cached.lastFetched < CACHE_TTL) {
      return cached.problems;
    }

    const { data, error } = await supabase
      .from('user_solved')
      .select('problem_id, problem_slug')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching solved problems:', error);
      // Prefer cached, then local fallback.
      return cached?.problems || readLocalSolved(userId);
    }

    const solvedIds = new Set<string>();
    for (const row of data || []) {
      const id = (row as any).problem_slug ?? (row as any).problem_id;
      if (typeof id === 'string' && id.length > 0) solvedIds.add(id);
    }

    // Hydration guard: if backend returns empty but we have local progress, keep local and backfill.
    if (solvedIds.size === 0) {
      const local = readLocalSolved(userId);
      if (local.size > 0) {
        solvedProblemsCache[userId] = { problems: local, lastFetched: Date.now() };
        // Backfill asynchronously (don’t block UI)
        setTimeout(() => {
          seedSolvedToBackend(userId, local);
        }, 0);
        return local;
      }
    }

    solvedProblemsCache[userId] = { problems: solvedIds, lastFetched: Date.now() };
    writeLocalSolved(userId, solvedIds);
    return solvedIds;
  } catch (error) {
    console.error('Error fetching solved problems:', error);
    const cached = solvedProblemsCache[userId];
    return cached?.problems || readLocalSolved(userId);
  }
}

// Check if a problem is solved (sync version using cache)
export function isProblemSolvedCached(problemId: string, userId?: string): boolean {
  if (!userId) return false;
  const cached = solvedProblemsCache[userId];
  return cached?.problems.has(problemId) || false;
}

// Save progress to backend
export async function saveProgress(
  userId: string,
  problemId: string,
  difficulty: 'easy' | 'medium' | 'hard',
  runtimeMs?: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const isHostQuestion = problemId.startsWith('host-q-');
    const isUuid = !isHostQuestion && isValidUUID(problemId);
    const matchColumn = isUuid ? 'problem_id' : 'problem_slug';

    // Check if already solved in DB
    const { data: existing, error: checkError } = await supabase
      .from('user_solved')
      .select('id, attempts, best_runtime_ms')
      .eq('user_id', userId)
      .eq(matchColumn, problemId)
      .maybeSingle() as { data: any; error: any };

    if (checkError) {
      console.error('Error checking existing record:', checkError);
      // Still update cache/local backup so UI doesn't regress.
      if (!solvedProblemsCache[userId]) {
        solvedProblemsCache[userId] = { problems: new Set(), lastFetched: Date.now() };
      }
      solvedProblemsCache[userId].problems.add(problemId);
      solvedProblemsCache[userId].lastFetched = Date.now();
      writeLocalSolved(userId, solvedProblemsCache[userId].problems);
      return { success: false, error: checkError.message };
    }

    if (existing) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('user_solved')
        .update({
          attempts: (existing.attempts || 0) + 1,
          best_runtime_ms:
            runtimeMs && (!existing.best_runtime_ms || runtimeMs < existing.best_runtime_ms)
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
      const insertPayload: Record<string, any> = {
        user_id: userId,
        best_runtime_ms: runtimeMs,
        attempts: 1,
      };

      if (isHostQuestion) {
        insertPayload.problem_slug = problemId;
        insertPayload.problem_id = null;
      } else {
        insertPayload[matchColumn] = problemId;
      }

      const { error: insertError } = await supabase.from('user_solved').insert([insertPayload] as any);

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

    // Update cache + local backup immediately
    if (!solvedProblemsCache[userId]) {
      solvedProblemsCache[userId] = { problems: new Set(), lastFetched: Date.now() };
    }
    solvedProblemsCache[userId].problems.add(problemId);
    solvedProblemsCache[userId].lastFetched = Date.now();
    writeLocalSolved(userId, solvedProblemsCache[userId].problems);

    return { success: true };
  } catch (error) {
    console.error('Failed to save progress:', error);
    return { success: false, error: 'Network error' };
  }
}

// Initialize progress cache from backend (call on app load)
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

// Force refresh cache from backend
export async function refreshProgressCache(userId: string): Promise<Set<string>> {
  if (solvedProblemsCache[userId]) {
    delete solvedProblemsCache[userId];
  }
  return fetchSolvedProblems(userId);
}


// Save code draft to cloud
export async function saveDraft(
  userId: string,
  problemId: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const isUuid = isValidUUID(problemId);
    const payload: Record<string, any> = {
      user_id: userId,
      code,
      updated_at: new Date().toISOString(),
    };

    if (isUuid) {
      payload.problem_id = problemId;
    } else {
      payload.problem_slug = problemId;
    }

    const { error } = await (supabase
      .from('drafts')
      .upsert(payload as any, {
        onConflict: isUuid ? 'user_id,problem_id' : 'user_id,problem_slug'
      }) as any);

    if (error) {
      console.error('Error saving draft:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to save draft:', error);
    return { success: false, error: 'Network error' };
  }
}

// Load code draft from cloud
export async function loadDraft(
  userId: string,
  problemId: string
): Promise<string | null> {
  try {
    const isUuid = isValidUUID(problemId);
    const query = supabase
      .from('drafts')
      .select('code')
      .eq('user_id', userId);

    if (isUuid) {
      query.eq('problem_id', problemId);
    } else {
      query.eq('problem_slug', problemId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error('Error loading draft:', error);
      return null;
    }

    return data?.code || null;
  } catch (error) {
    console.error('Failed to load draft:', error);
    return null;
  }
}

// Load last written code from submissions as a secondary fallback
export async function loadLastSubmission(
  userId: string,
  problemId: string
): Promise<string | null> {
  try {
    const isUuid = isValidUUID(problemId);

    // Check both UUID and problem_slug/id for robustness
    const query = supabase
      .from('submissions')
      .select('code')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (isUuid) {
      query.eq('problem_id', problemId);
    } else {
      query.eq('problem_slug', problemId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error('Error loading last submission:', error);
      return null;
    }

    return data?.code || null;
  } catch (error) {
    console.error('Failed to load last submission:', error);
    return null;
  }
}
