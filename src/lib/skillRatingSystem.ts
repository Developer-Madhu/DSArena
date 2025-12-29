import { supabase } from '@/integrations/supabase/client';

// Skill tiers with thresholds
export const SKILL_TIERS = {
  bronze: { min: 0, max: 999, name: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-100' },
  silver: { min: 1000, max: 1199, name: 'Silver', color: 'text-slate-500', bg: 'bg-slate-100' },
  gold: { min: 1200, max: 1499, name: 'Gold', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  platinum: { min: 1500, max: 1799, name: 'Platinum', color: 'text-cyan-600', bg: 'bg-cyan-100' },
  diamond: { min: 1800, max: 9999, name: 'Diamond', color: 'text-purple-600', bg: 'bg-purple-100' },
} as const;

export type SkillTier = keyof typeof SKILL_TIERS;

// Topics for skill tracking
export const SKILL_TOPICS = [
  'Arrays',
  'Strings', 
  'Linked Lists',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Sorting & Searching',
  'Stack & Queue',
  'Hash Tables',
  'Recursion',
  'Math & Logic',
  'Bit Manipulation',
] as const;

export type SkillTopic = typeof SKILL_TOPICS[number];

// Difficulty multipliers for rating calculation
const DIFFICULTY_K_FACTOR: Record<string, number> = {
  easy: 16,
  medium: 24,
  hard: 32,
};

// Time bonus multipliers (faster = more points)
const TIME_BONUS_THRESHOLDS = {
  easy: { fast: 120, medium: 300 }, // seconds
  medium: { fast: 300, medium: 600 },
  hard: { fast: 600, medium: 1200 },
};

// Unlock requirements
export const UNLOCK_REQUIREMENTS = {
  medium: { minProblems: 5, minAccuracy: 60 }, // Need 60% accuracy on 5+ easy problems
  hard: { minProblems: 3, minAccuracy: 70 }, // Need 70% accuracy on 3+ medium problems
};

export interface SkillRating {
  id: string;
  user_id: string;
  topic: string;
  rating: number;
  tier: SkillTier;
  problems_solved: number;
  problems_attempted: number;
  accuracy: number;
  avg_time_seconds: number;
  updated_at: string;
}

export interface ArenaSession {
  id: string;
  user_id: string;
  problem_id?: string;
  problem_slug?: string;
  mode: 'practice' | 'interview';
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  time_limit_seconds?: number;
  time_taken_seconds?: number;
  hints_used: boolean;
  attempts_count: number;
  rating_before?: number;
  rating_after?: number;
  rating_change: number;
  result?: 'solved' | 'failed' | 'timeout' | 'abandoned';
  started_at: string;
  completed_at?: string;
}

export interface TopicUnlock {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  unlocked: boolean;
  problems_required: number;
  problems_completed: number;
  accuracy_required: number;
  current_accuracy: number;
}

// Get tier from rating
export function getTierFromRating(rating: number): SkillTier {
  if (rating >= 1800) return 'diamond';
  if (rating >= 1500) return 'platinum';
  if (rating >= 1200) return 'gold';
  if (rating >= 1000) return 'silver';
  return 'bronze';
}

// Get tier display info
export function getTierInfo(tier: SkillTier) {
  return SKILL_TIERS[tier];
}

// Calculate expected score (Elo-style)
function calculateExpectedScore(playerRating: number, problemRating: number): number {
  return 1 / (1 + Math.pow(10, (problemRating - playerRating) / 400));
}

// Get problem rating based on difficulty
function getProblemRating(difficulty: string): number {
  switch (difficulty) {
    case 'easy': return 1000;
    case 'medium': return 1300;
    case 'hard': return 1600;
    default: return 1000;
  }
}

// Calculate time bonus
function getTimeBonus(difficulty: string, timeSeconds: number): number {
  const thresholds = TIME_BONUS_THRESHOLDS[difficulty as keyof typeof TIME_BONUS_THRESHOLDS];
  if (!thresholds) return 1.0;
  
  if (timeSeconds <= thresholds.fast) return 1.3; // 30% bonus
  if (timeSeconds <= thresholds.medium) return 1.1; // 10% bonus
  return 1.0; // No bonus
}

// Calculate rating change
export function calculateRatingChange(
  currentRating: number,
  difficulty: 'easy' | 'medium' | 'hard',
  solved: boolean,
  timeSeconds: number,
  attemptsCount: number = 1
): number {
  const K = DIFFICULTY_K_FACTOR[difficulty];
  const problemRating = getProblemRating(difficulty);
  const expected = calculateExpectedScore(currentRating, problemRating);
  const actual = solved ? 1 : 0;
  
  let change = Math.round(K * (actual - expected));
  
  // Apply time bonus for successful solves
  if (solved) {
    const timeBonus = getTimeBonus(difficulty, timeSeconds);
    change = Math.round(change * timeBonus);
    
    // Penalty for multiple attempts
    if (attemptsCount > 1) {
      change = Math.round(change * (1 - (attemptsCount - 1) * 0.1));
    }
  }
  
  // Minimum change of 1 for any solve
  if (solved && change < 1) change = 1;
  
  return change;
}

// Fetch user's skill ratings
export async function fetchSkillRatings(userId: string): Promise<SkillRating[]> {
  const { data, error } = await supabase
    .from('skill_ratings')
    .select('*')
    .eq('user_id', userId);
    
  if (error) {
    console.error('Error fetching skill ratings:', error);
    return [];
  }
  
  return (data || []) as SkillRating[];
}

// Get or create skill rating for a topic
export async function getOrCreateSkillRating(
  userId: string, 
  topic: string
): Promise<SkillRating | null> {
  // Try to fetch existing
  const { data: existing } = await supabase
    .from('skill_ratings')
    .select('*')
    .eq('user_id', userId)
    .eq('topic', topic)
    .maybeSingle();
    
  if (existing) return existing as SkillRating;
  
  // Create new rating
  const { data: created, error } = await supabase
    .from('skill_ratings')
    .insert({
      user_id: userId,
      topic,
      rating: 1000,
      tier: 'silver',
      problems_solved: 0,
      problems_attempted: 0,
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error creating skill rating:', error);
    return null;
  }
  
  return created as SkillRating;
}

// Update skill rating after arena session
export async function updateSkillRating(
  userId: string,
  topic: string,
  ratingChange: number,
  solved: boolean,
  timeSeconds: number
): Promise<SkillRating | null> {
  const current = await getOrCreateSkillRating(userId, topic);
  if (!current) return null;
  
  const newRating = Math.max(0, current.rating + ratingChange);
  const newSolved = current.problems_solved + (solved ? 1 : 0);
  const newAttempted = current.problems_attempted + 1;
  const newAccuracy = Math.round((newSolved / newAttempted) * 100);
  
  // Calculate new average time (only for solved problems)
  let newAvgTime = current.avg_time_seconds;
  if (solved) {
    const totalTime = current.avg_time_seconds * current.problems_solved + timeSeconds;
    newAvgTime = Math.round(totalTime / newSolved);
  }
  
  const { data, error } = await supabase
    .from('skill_ratings')
    .update({
      rating: newRating,
      problems_solved: newSolved,
      problems_attempted: newAttempted,
      accuracy: newAccuracy,
      avg_time_seconds: newAvgTime,
    })
    .eq('id', current.id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating skill rating:', error);
    return null;
  }
  
  return data as SkillRating;
}

// Start an arena session
export async function startArenaSession(
  userId: string,
  problemId: string | null,
  problemSlug: string | null,
  mode: 'practice' | 'interview',
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  timeLimitSeconds?: number
): Promise<ArenaSession | null> {
  // Get current rating
  const currentRating = await getOrCreateSkillRating(userId, topic);
  
  const { data, error } = await supabase
    .from('arena_sessions')
    .insert({
      user_id: userId,
      problem_id: problemId,
      problem_slug: problemSlug,
      mode,
      topic,
      difficulty,
      time_limit_seconds: timeLimitSeconds,
      rating_before: currentRating?.rating || 1000,
      hints_used: false,
      attempts_count: 0,
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error starting arena session:', error);
    return null;
  }
  
  return data as ArenaSession;
}

// Complete an arena session
export async function completeArenaSession(
  sessionId: string,
  result: 'solved' | 'failed' | 'timeout' | 'abandoned',
  timeTakenSeconds: number,
  hintsUsed: boolean,
  attemptsCount: number
): Promise<{ session: ArenaSession; ratingChange: number } | null> {
  // Get session
  const { data: session } = await supabase
    .from('arena_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();
    
  if (!session) return null;
  
  const typedSession = session as ArenaSession;
  
  // Calculate rating change (only for interview mode)
  let ratingChange = 0;
  let newRating = typedSession.rating_before || 1000;
  
  if (typedSession.mode === 'interview') {
    ratingChange = calculateRatingChange(
      typedSession.rating_before || 1000,
      typedSession.difficulty,
      result === 'solved',
      timeTakenSeconds,
      attemptsCount
    );
    newRating = Math.max(0, (typedSession.rating_before || 1000) + ratingChange);
    
    // Update skill rating
    await updateSkillRating(
      typedSession.user_id,
      typedSession.topic,
      ratingChange,
      result === 'solved',
      timeTakenSeconds
    );
  }
  
  // Update session
  const { data: updated, error } = await supabase
    .from('arena_sessions')
    .update({
      result,
      time_taken_seconds: timeTakenSeconds,
      hints_used: hintsUsed,
      attempts_count: attemptsCount,
      rating_after: newRating,
      rating_change: ratingChange,
      completed_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
    .select()
    .single();
    
  if (error) {
    console.error('Error completing arena session:', error);
    return null;
  }
  
  return { session: updated as ArenaSession, ratingChange };
}

// Check if difficulty is unlocked for a topic
export async function checkDifficultyUnlock(
  userId: string,
  topic: string,
  targetDifficulty: 'medium' | 'hard'
): Promise<TopicUnlock> {
  const prerequisiteDifficulty = targetDifficulty === 'medium' ? 'easy' : 'medium';
  const requirements = UNLOCK_REQUIREMENTS[targetDifficulty];
  
  // Check existing unlock
  const { data: existing } = await supabase
    .from('topic_unlocks')
    .select('*')
    .eq('user_id', userId)
    .eq('topic', topic)
    .eq('difficulty', targetDifficulty)
    .maybeSingle();
    
  if (existing?.unlocked) {
    return existing as TopicUnlock;
  }
  
  // Calculate current progress from arena sessions
  const { data: sessions } = await supabase
    .from('arena_sessions')
    .select('result')
    .eq('user_id', userId)
    .eq('topic', topic)
    .eq('difficulty', prerequisiteDifficulty)
    .eq('mode', 'interview')
    .not('result', 'is', null);
    
  const totalAttempts = sessions?.length || 0;
  const solvedCount = sessions?.filter(s => s.result === 'solved').length || 0;
  const currentAccuracy = totalAttempts > 0 ? Math.round((solvedCount / totalAttempts) * 100) : 0;
  
  const unlocked = totalAttempts >= requirements.minProblems && 
                   currentAccuracy >= requirements.minAccuracy;
  
  // Upsert unlock status
  const unlockData: any = {
    user_id: userId,
    topic,
    difficulty: targetDifficulty,
    unlocked,
    problems_required: requirements.minProblems,
    problems_completed: totalAttempts,
    accuracy_required: requirements.minAccuracy,
    current_accuracy: currentAccuracy,
  };
  
  if (unlocked) {
    unlockData.unlocked_at = new Date().toISOString();
  }
  
  const { data: upserted } = await supabase
    .from('topic_unlocks')
    .upsert(unlockData, { onConflict: 'user_id,topic,difficulty' })
    .select()
    .single();
    
  return (upserted || unlockData) as TopicUnlock;
}

// Get all unlocks for a user
export async function fetchTopicUnlocks(userId: string): Promise<TopicUnlock[]> {
  const { data, error } = await supabase
    .from('topic_unlocks')
    .select('*')
    .eq('user_id', userId);
    
  if (error) {
    console.error('Error fetching topic unlocks:', error);
    return [];
  }
  
  return (data || []) as TopicUnlock[];
}

// Calculate interview readiness
export async function calculateInterviewReadiness(userId: string): Promise<{
  readiness: number;
  strongestTopic: string | null;
  weakestTopic: string | null;
}> {
  const ratings = await fetchSkillRatings(userId);
  
  if (ratings.length === 0) {
    return { readiness: 0, strongestTopic: null, weakestTopic: null };
  }
  
  // Weight by importance (some topics more common in interviews)
  const topicWeights: Record<string, number> = {
    'Arrays': 1.2,
    'Strings': 1.1,
    'Trees': 1.2,
    'Dynamic Programming': 1.3,
    'Graphs': 1.1,
    'Sorting & Searching': 1.0,
    'Linked Lists': 0.9,
    'Stack & Queue': 0.9,
    'Hash Tables': 1.0,
    'Recursion': 1.0,
    'Math & Logic': 0.8,
    'Bit Manipulation': 0.7,
  };
  
  let totalWeight = 0;
  let weightedSum = 0;
  let strongestTopic: string | null = null;
  let weakestTopic: string | null = null;
  let highestRating = 0;
  let lowestRating = Infinity;
  
  for (const rating of ratings) {
    const weight = topicWeights[rating.topic] || 1.0;
    totalWeight += weight;
    
    // Normalize rating to 0-100 scale (bronze=0, diamond=100)
    const normalizedRating = Math.min(100, Math.max(0, ((rating.rating - 800) / 12)));
    weightedSum += normalizedRating * weight;
    
    if (rating.rating > highestRating) {
      highestRating = rating.rating;
      strongestTopic = rating.topic;
    }
    if (rating.rating < lowestRating && rating.problems_attempted > 0) {
      lowestRating = rating.rating;
      weakestTopic = rating.topic;
    }
  }
  
  const readiness = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
  
  // Update profile with readiness
  await supabase
    .from('profiles')
    .update({
      interview_readiness: readiness,
      strongest_topic: strongestTopic,
      weakest_topic: weakestTopic,
    })
    .eq('id', userId);
  
  return { readiness, strongestTopic, weakestTopic };
}

// Get enhanced failure feedback
export function getFailureFeedback(
  result: 'failed' | 'timeout' | 'abandoned',
  testsPassed: number,
  testsTotal: number,
  timeSeconds: number,
  timeLimitSeconds?: number
): { title: string; description: string; suggestion: string } {
  if (result === 'timeout') {
    return {
      title: 'Time Limit Exceeded',
      description: 'Your solution took too long to complete.',
      suggestion: 'Consider optimizing your algorithm\'s time complexity. Look for nested loops or repeated calculations that could be simplified.',
    };
  }
  
  if (result === 'abandoned') {
    return {
      title: 'Session Abandoned',
      description: 'You left before completing the problem.',
      suggestion: 'Try breaking the problem into smaller steps. Practice similar problems in Practice Arena first.',
    };
  }
  
  // Failed cases analysis
  const passRate = testsTotal > 0 ? testsPassed / testsTotal : 0;
  
  if (passRate === 0) {
    return {
      title: 'Logic Error',
      description: 'Your solution didn\'t pass any test cases.',
      suggestion: 'Review the problem statement carefully. Start with the simplest case and build up.',
    };
  }
  
  if (passRate < 0.5) {
    return {
      title: 'Core Logic Issue',
      description: `Passed ${testsPassed}/${testsTotal} tests. Your approach may have a fundamental flaw.`,
      suggestion: 'Consider edge cases like empty inputs, single elements, or negative numbers.',
    };
  }
  
  if (passRate < 0.8) {
    return {
      title: 'Edge Case Failures',
      description: `Passed ${testsPassed}/${testsTotal} tests. Some edge cases are not handled.`,
      suggestion: 'Your core logic works. Focus on boundary conditions and special inputs.',
    };
  }
  
  return {
    title: 'Almost There',
    description: `Passed ${testsPassed}/${testsTotal} tests. Just a few cases remaining.`,
    suggestion: 'You\'re very close! Double-check off-by-one errors and overflow conditions.',
  };
}

// Map problem category to skill topic
export function mapCategoryToTopic(category: string): SkillTopic {
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes('array') || lowerCategory.includes('list')) return 'Arrays';
  if (lowerCategory.includes('string')) return 'Strings';
  if (lowerCategory.includes('linked')) return 'Linked Lists';
  if (lowerCategory.includes('tree') || lowerCategory.includes('bst')) return 'Trees';
  if (lowerCategory.includes('graph')) return 'Graphs';
  if (lowerCategory.includes('dynamic') || lowerCategory.includes('dp')) return 'Dynamic Programming';
  if (lowerCategory.includes('sort') || lowerCategory.includes('search') || lowerCategory.includes('binary')) return 'Sorting & Searching';
  if (lowerCategory.includes('stack') || lowerCategory.includes('queue')) return 'Stack & Queue';
  if (lowerCategory.includes('hash') || lowerCategory.includes('map') || lowerCategory.includes('set')) return 'Hash Tables';
  if (lowerCategory.includes('recurs') || lowerCategory.includes('backtrack')) return 'Recursion';
  if (lowerCategory.includes('math') || lowerCategory.includes('number')) return 'Math & Logic';
  if (lowerCategory.includes('bit') || lowerCategory.includes('binary')) return 'Bit Manipulation';
  
  return 'Arrays'; // Default
}
