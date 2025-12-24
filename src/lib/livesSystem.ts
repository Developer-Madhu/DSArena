// Lives System - 3 lives that restore 10 minutes after loss
import { supabase } from '@/integrations/supabase/client';

const getLivesStorageKey = (userId?: string) => `dsarena_lives_data_${userId || 'anonymous'}`;

export interface LivesData {
  lives: number;
  lostTimes: number[]; // Timestamps when lives were lost
  userId?: string;
}

const DEFAULT_LIVES: LivesData = {
  lives: 3,
  lostTimes: [],
};

// Get lives data from localStorage for a specific user
export function getLocalLivesData(userId?: string): LivesData {
  try {
    const stored = localStorage.getItem(getLivesStorageKey(userId));
    if (stored) {
      const data = JSON.parse(stored) as LivesData;
      // Restore lives that have passed 10 minutes
      return restoreExpiredLives(data, userId);
    }
  } catch (e) {
    console.error('Error reading lives data:', e);
  }
  return { ...DEFAULT_LIVES, userId };
}

// Restore lives that have been lost for more than 10 minutes
function restoreExpiredLives(data: LivesData, userId?: string): LivesData {
  const now = Date.now();
  const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds
  
  // Filter out expired losses (older than 10 minutes)
  const activeLosses = data.lostTimes.filter(time => now - time < TEN_MINUTES);
  
  // Calculate restored lives
  const restoredCount = data.lostTimes.length - activeLosses.length;
  const newLives = Math.min(3, data.lives + restoredCount);
  
  if (restoredCount > 0) {
    // Update storage with restored lives
    const newData: LivesData = {
      lives: newLives,
      lostTimes: activeLosses,
      userId,
    };
    saveLivesData(newData, userId);
    return newData;
  }
  
  return data;
}

// Save lives data to localStorage for a specific user
export function saveLivesData(data: LivesData, userId?: string): void {
  try {
    localStorage.setItem(getLivesStorageKey(userId), JSON.stringify(data));
  } catch (e) {
    console.error('Error saving lives data:', e);
  }
}

// Lose a life - returns new lives data
export function loseLife(userId?: string): LivesData {
  // Always get fresh data to ensure we have latest state
  const currentData = getLocalLivesData(userId);
  
  if (currentData.lives <= 0) {
    return currentData;
  }
  
  const newData: LivesData = {
    lives: currentData.lives - 1,
    lostTimes: [...currentData.lostTimes, Date.now()],
    userId,
  };
  
  saveLivesData(newData, userId);
  return newData;
}

// Get time until next life restore (in milliseconds)
export function getTimeUntilNextRestore(userId?: string): number | null {
  const data = getLocalLivesData(userId);
  
  if (data.lives >= 3 || data.lostTimes.length === 0) {
    return null;
  }
  
  const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds
  const now = Date.now();
  
  // Find the oldest loss that hasn't been restored yet
  const sortedLosses = [...data.lostTimes].sort((a, b) => a - b);
  const oldestLoss = sortedLosses[0];
  const restoreTime = oldestLoss + TEN_MINUTES;
  
  return Math.max(0, restoreTime - now);
}

// Check if user has lives
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
export function resetLives(userId?: string): void {
  saveLivesData({ ...DEFAULT_LIVES, userId }, userId);
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
