// Lives System - 3 lives that restore 10 minutes after loss (Supabase-backed)
import { supabase } from '@/integrations/supabase/client';

export interface LivesData {
  lives: number;
  lostTimes: number[]; // Timestamps when lives were lost
  userId?: string;
}

const DEFAULT_LIVES: LivesData = {
  lives: 3,
  lostTimes: [],
};

const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds

// In-memory cache to avoid excessive DB calls during the same session
let livesCache: { [userId: string]: { data: LivesData; lastFetched: number } } = {};
const CACHE_TTL = 5000; // 5 seconds cache

// Restore lives that have been lost for more than 10 minutes
function restoreExpiredLives(data: LivesData): LivesData {
  const now = Date.now();
  
  // Filter out expired losses (older than 10 minutes)
  const activeLosses = data.lostTimes.filter(time => now - time < TEN_MINUTES);
  
  // Calculate restored lives
  const restoredCount = data.lostTimes.length - activeLosses.length;
  const newLives = Math.min(3, data.lives + restoredCount);
  
  if (restoredCount > 0) {
    return {
      lives: newLives,
      lostTimes: activeLosses,
      userId: data.userId,
    };
  }
  
  return data;
}

// Get lives data from Supabase for a specific user (async)
export async function fetchLivesData(userId: string): Promise<LivesData> {
  try {
    // Check cache first
    const cached = livesCache[userId];
    if (cached && Date.now() - cached.lastFetched < CACHE_TTL) {
      return restoreExpiredLives(cached.data);
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('lives, lost_times')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching lives data:', error);
      return { ...DEFAULT_LIVES, userId };
    }

    if (!data) {
      return { ...DEFAULT_LIVES, userId };
    }

    const livesData: LivesData = {
      lives: data.lives ?? 3,
      lostTimes: (data.lost_times as number[]) || [],
      userId,
    };

    // Restore expired lives
    const restoredData = restoreExpiredLives(livesData);
    
    // If lives were restored, update the database
    if (restoredData.lives !== livesData.lives || restoredData.lostTimes.length !== livesData.lostTimes.length) {
      await saveLivesDataToSupabase(restoredData, userId);
    }

    // Update cache
    livesCache[userId] = { data: restoredData, lastFetched: Date.now() };

    return restoredData;
  } catch (e) {
    console.error('Error fetching lives data:', e);
    return { ...DEFAULT_LIVES, userId };
  }
}

// Synchronous getter that uses cache (for compatibility with existing sync calls)
export function getLocalLivesData(userId?: string): LivesData {
  if (!userId) {
    return { ...DEFAULT_LIVES };
  }
  
  const cached = livesCache[userId];
  if (cached) {
    return restoreExpiredLives(cached.data);
  }
  
  // Return default if no cache, the async fetch should populate it
  return { ...DEFAULT_LIVES, userId };
}

// Save lives data to Supabase
async function saveLivesDataToSupabase(data: LivesData, userId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        lives: data.lives,
        lost_times: data.lostTimes,
      })
      .eq('id', userId);

    if (error) {
      console.error('Error saving lives data:', error);
    }

    // Update cache
    livesCache[userId] = { data, lastFetched: Date.now() };
  } catch (e) {
    console.error('Error saving lives data:', e);
  }
}

// Lose a life - returns new lives data (async)
export async function loseLifeAsync(userId: string): Promise<LivesData> {
  const currentData = await fetchLivesData(userId);
  
  if (currentData.lives <= 0) {
    return currentData;
  }
  
  const newData: LivesData = {
    lives: currentData.lives - 1,
    lostTimes: [...currentData.lostTimes, Date.now()],
    userId,
  };
  
  await saveLivesDataToSupabase(newData, userId);
  return newData;
}

// Synchronous lose life (updates cache immediately, saves async)
export function loseLife(userId?: string): LivesData {
  if (!userId) {
    return { ...DEFAULT_LIVES };
  }

  const currentData = getLocalLivesData(userId);
  
  if (currentData.lives <= 0) {
    return currentData;
  }
  
  const newData: LivesData = {
    lives: currentData.lives - 1,
    lostTimes: [...currentData.lostTimes, Date.now()],
    userId,
  };
  
  // Update cache immediately
  livesCache[userId] = { data: newData, lastFetched: Date.now() };
  
  // Save to Supabase asynchronously
  saveLivesDataToSupabase(newData, userId);
  
  return newData;
}

// Get time until next life restore (in milliseconds)
export function getTimeUntilNextRestore(userId?: string): number | null {
  const data = getLocalLivesData(userId);
  
  if (data.lives >= 3 || data.lostTimes.length === 0) {
    return null;
  }
  
  const now = Date.now();
  
  // Find the oldest loss that hasn't been restored yet
  const sortedLosses = [...data.lostTimes].sort((a, b) => a - b);
  const oldestLoss = sortedLosses[0];
  const restoreTime = oldestLoss + TEN_MINUTES;
  
  return Math.max(0, restoreTime - now);
}

// Check if user has lives (async version for initial load)
export async function hasLivesAsync(userId: string): Promise<boolean> {
  const data = await fetchLivesData(userId);
  return data.lives > 0;
}

// Check if user has lives (sync version using cache)
export function hasLives(userId?: string): boolean {
  const data = getLocalLivesData(userId);
  return data.lives > 0;
}

// Get current lives count
export function getLivesCount(userId?: string): number {
  const data = getLocalLivesData(userId);
  return data.lives;
}

// Reset lives (for testing or admin purposes)
export async function resetLives(userId: string): Promise<void> {
  const newData = { ...DEFAULT_LIVES, userId };
  await saveLivesDataToSupabase(newData, userId);
}

// Initialize lives cache from Supabase (call on app load)
export async function initializeLivesCache(userId: string): Promise<LivesData> {
  return fetchLivesData(userId);
}

// Clear lives cache (call on logout)
export function clearLivesCache(): void {
  livesCache = {};
}

// Format time remaining as string
export function formatTimeRemaining(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}
