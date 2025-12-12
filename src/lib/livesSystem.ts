// Lives System - 3 lives that restore 24 hours after loss
import { supabase } from '@/integrations/supabase/client';

const LIVES_STORAGE_KEY = 'dsarena_lives_data';

export interface LivesData {
  lives: number;
  lostTimes: number[]; // Timestamps when lives were lost
  userId?: string;
}

const DEFAULT_LIVES: LivesData = {
  lives: 3,
  lostTimes: [],
};

// Get lives data from localStorage
export function getLocalLivesData(): LivesData {
  try {
    const stored = localStorage.getItem(LIVES_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as LivesData;
      // Restore lives that have passed 24 hours
      return restoreExpiredLives(data);
    }
  } catch (e) {
    console.error('Error reading lives data:', e);
  }
  return { ...DEFAULT_LIVES };
}

// Restore lives that have been lost for more than 24 hours
function restoreExpiredLives(data: LivesData): LivesData {
  const now = Date.now();
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  
  // Filter out expired losses (older than 24 hours)
  const activeLosses = data.lostTimes.filter(time => now - time < TWENTY_FOUR_HOURS);
  
  // Calculate restored lives
  const restoredCount = data.lostTimes.length - activeLosses.length;
  const newLives = Math.min(3, data.lives + restoredCount);
  
  if (restoredCount > 0) {
    // Update storage with restored lives
    const newData: LivesData = {
      lives: newLives,
      lostTimes: activeLosses,
      userId: data.userId,
    };
    saveLivesData(newData);
    return newData;
  }
  
  return data;
}

// Save lives data to localStorage
export function saveLivesData(data: LivesData): void {
  try {
    localStorage.setItem(LIVES_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving lives data:', e);
  }
}

// Lose a life - returns new lives data
export function loseLife(userId?: string): LivesData {
  // Always get fresh data to ensure we have latest state
  const currentData = getLocalLivesData();
  
  if (currentData.lives <= 0) {
    return currentData;
  }
  
  const newData: LivesData = {
    lives: currentData.lives - 1,
    lostTimes: [...currentData.lostTimes, Date.now()],
    userId,
  };
  
  saveLivesData(newData);
  return newData;
}

// Get time until next life restore (in milliseconds)
export function getTimeUntilNextRestore(): number | null {
  const data = getLocalLivesData();
  
  if (data.lives >= 3 || data.lostTimes.length === 0) {
    return null;
  }
  
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  const now = Date.now();
  
  // Find the oldest loss that hasn't been restored yet
  const sortedLosses = [...data.lostTimes].sort((a, b) => a - b);
  const oldestLoss = sortedLosses[0];
  const restoreTime = oldestLoss + TWENTY_FOUR_HOURS;
  
  return Math.max(0, restoreTime - now);
}

// Check if user has lives
export function hasLives(): boolean {
  const data = getLocalLivesData();
  return data.lives > 0;
}

// Get current lives count
export function getLivesCount(): number {
  const data = getLocalLivesData();
  return data.lives;
}

// Reset lives (for testing or admin purposes)
export function resetLives(): void {
  saveLivesData({ ...DEFAULT_LIVES });
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
