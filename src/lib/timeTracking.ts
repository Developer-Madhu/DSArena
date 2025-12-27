// Time tracking system for problem sessions and site activity
import { supabase } from '@/integrations/supabase/client';

interface ProblemSession {
  id: string;
  startedAt: Date;
  problemId?: string;
  problemSlug?: string;
}

interface ActivitySession {
  id: string;
  sessionStart: Date;
  problemsViewed: number;
  problemsSolved: number;
}

// In-memory session tracking
let currentProblemSession: ProblemSession | null = null;
let currentActivitySession: ActivitySession | null = null;
let visibilityPauseTime: Date | null = null;
let totalPausedTime = 0;

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

// Start a problem session when user opens a problem
export async function startProblemSession(userId: string, problemId: string): Promise<void> {
  // End any existing session first
  if (currentProblemSession) {
    await endProblemSession(userId, false);
  }

  const isUuid = isValidUUID(problemId);
  
  const baseData = {
    user_id: userId,
    started_at: new Date().toISOString(),
    problem_id: isUuid ? problemId : null,
    problem_slug: !isUuid ? problemId : null,
  };

  const { data, error } = await supabase
    .from('problem_sessions')
    .insert([baseData])
    .select('id')
    .single();

  if (error) {
    console.error('Failed to start problem session:', error);
    return;
  }

  currentProblemSession = {
    id: data.id,
    startedAt: new Date(),
    problemId: isUuid ? problemId : undefined,
    problemSlug: !isUuid ? problemId : undefined,
  };

  totalPausedTime = 0;
  visibilityPauseTime = null;

  // Update activity session
  if (currentActivitySession) {
    currentActivitySession.problemsViewed++;
  }
}

// End a problem session when user leaves or completes
export async function endProblemSession(userId: string, completed: boolean, runtimeMs?: number): Promise<number | null> {
  if (!currentProblemSession) return null;

  const endTime = new Date();
  let durationSeconds = Math.floor((endTime.getTime() - currentProblemSession.startedAt.getTime()) / 1000);
  
  // Subtract paused time
  durationSeconds = Math.max(0, durationSeconds - Math.floor(totalPausedTime / 1000));

  const { error } = await supabase
    .from('problem_sessions')
    .update({
      ended_at: endTime.toISOString(),
      duration_seconds: durationSeconds,
      completed,
    })
    .eq('id', currentProblemSession.id);

  if (error) {
    console.error('Failed to end problem session:', error);
  }

  // Update profile time stats if completed
  if (completed) {
    await updateProfileTimeStats(userId, durationSeconds);
    
    if (currentActivitySession) {
      currentActivitySession.problemsSolved++;
    }
  }

  const duration = durationSeconds;
  currentProblemSession = null;
  totalPausedTime = 0;
  visibilityPauseTime = null;

  return duration;
}

// Update profile time statistics
async function updateProfileTimeStats(userId: string, sessionDuration: number): Promise<void> {
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('total_time_spent_seconds, total_solved, avg_time_per_problem_seconds')
    .eq('id', userId)
    .single();

  if (fetchError || !profile) return;

  const newTotalTime = (profile.total_time_spent_seconds || 0) + sessionDuration;
  const totalSolved = (profile.total_solved || 0) + 1;
  const newAvgTime = Math.floor(newTotalTime / totalSolved);

  await supabase
    .from('profiles')
    .update({
      total_time_spent_seconds: newTotalTime,
      avg_time_per_problem_seconds: newAvgTime,
    })
    .eq('id', userId);
}

// Start a site activity session
export async function startActivitySession(userId: string): Promise<void> {
  if (currentActivitySession) return;

  const { data, error } = await supabase
    .from('user_activity')
    .insert([{
      user_id: userId,
      session_start: new Date().toISOString(),
    }])
    .select('id')
    .single();

  if (error) {
    console.error('Failed to start activity session:', error);
    return;
  }

  currentActivitySession = {
    id: data.id,
    sessionStart: new Date(),
    problemsViewed: 0,
    problemsSolved: 0,
  };
}

// End a site activity session
export async function endActivitySession(userId: string): Promise<void> {
  if (!currentActivitySession) return;

  const endTime = new Date();
  const durationSeconds = Math.floor((endTime.getTime() - currentActivitySession.sessionStart.getTime()) / 1000);

  await supabase
    .from('user_activity')
    .update({
      session_end: endTime.toISOString(),
      total_duration_seconds: durationSeconds,
      problems_viewed: currentActivitySession.problemsViewed,
      problems_solved: currentActivitySession.problemsSolved,
    })
    .eq('id', currentActivitySession.id);

  currentActivitySession = null;
}

// Handle visibility change for pausing/resuming timer
export function handleVisibilityChange(): void {
  if (document.hidden) {
    // Page hidden - start pausing
    visibilityPauseTime = new Date();
  } else {
    // Page visible again - calculate paused duration
    if (visibilityPauseTime) {
      totalPausedTime += new Date().getTime() - visibilityPauseTime.getTime();
      visibilityPauseTime = null;
    }
  }
}

// Get time spent on a specific problem
export async function getTimeSpentOnProblem(userId: string, problemId: string): Promise<number> {
  const isUuid = isValidUUID(problemId);
  const filterColumn = isUuid ? 'problem_id' : 'problem_slug';

  const { data, error } = await supabase
    .from('problem_sessions')
    .select('duration_seconds')
    .eq('user_id', userId)
    .eq(filterColumn, problemId)
    .not('duration_seconds', 'is', null);

  if (error || !data) return 0;

  return data.reduce((sum, row) => sum + (row.duration_seconds || 0), 0);
}

// Get average time on site per day
export async function getAverageTimeOnSite(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('user_activity')
    .select('total_duration_seconds')
    .eq('user_id', userId)
    .not('total_duration_seconds', 'is', null);

  if (error || !data || data.length === 0) return 0;

  const totalTime = data.reduce((sum, row) => sum + (row.total_duration_seconds || 0), 0);
  return Math.floor(totalTime / data.length);
}

// Get total time on site today
export async function getTodayTimeOnSite(userId: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('user_activity')
    .select('total_duration_seconds')
    .eq('user_id', userId)
    .gte('session_start', today.toISOString())
    .not('total_duration_seconds', 'is', null);

  if (error || !data) return 0;

  return data.reduce((sum, row) => sum + (row.total_duration_seconds || 0), 0);
}

// Get time stats for dashboard display
export interface TimeStats {
  avgTimePerProblem: number;
  totalTimeToday: number;
  totalTimeAllTime: number;
  problemSessionsToday: number;
}

export async function getTimeStats(userId: string): Promise<TimeStats> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Fetch profile for avg time per problem
  const { data: profile } = await supabase
    .from('profiles')
    .select('avg_time_per_problem_seconds, total_time_spent_seconds')
    .eq('id', userId)
    .single();

  // Fetch today's sessions
  const { data: todaySessions } = await supabase
    .from('problem_sessions')
    .select('duration_seconds')
    .eq('user_id', userId)
    .gte('started_at', today.toISOString())
    .not('duration_seconds', 'is', null);

  const totalTimeToday = (todaySessions || []).reduce((sum, row) => sum + (row.duration_seconds || 0), 0);

  return {
    avgTimePerProblem: profile?.avg_time_per_problem_seconds || 0,
    totalTimeToday,
    totalTimeAllTime: profile?.total_time_spent_seconds || 0,
    problemSessionsToday: (todaySessions || []).length,
  };
}

// Format seconds into human readable time
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  }
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Check if current session exists
export function hasActiveSession(): boolean {
  return currentProblemSession !== null;
}

// Get current session duration
export function getCurrentSessionDuration(): number {
  if (!currentProblemSession) return 0;
  
  let elapsed = new Date().getTime() - currentProblemSession.startedAt.getTime();
  
  // Subtract paused time
  if (visibilityPauseTime) {
    elapsed -= (new Date().getTime() - visibilityPauseTime.getTime());
  }
  elapsed -= totalPausedTime;
  
  return Math.max(0, Math.floor(elapsed / 1000));
}
