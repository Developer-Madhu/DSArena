// Dynamic Motivation & Cheer Engine
// Generates personalized encouragement based on user progress

import { supabase } from '@/integrations/supabase/client';

export interface ProgressEvent {
  type: 'solve_after_failures' | 'improved_time' | 'harder_problem' | 'topic_complete' | 'streak_milestone' | 'first_solve' | 'fast_solve';
  problemTitle?: string;
  topic?: string;
  difficulty?: string;
  attemptCount?: number;
  solveTime?: number;
  previousBestTime?: number;
  streakCount?: number;
}

export interface MotivationMessage {
  message: string;
  emoji: string;
  type: 'celebration' | 'encouragement' | 'milestone' | 'streak';
  intensity: 'low' | 'medium' | 'high';
}

interface UserProgressTrend {
  isImproving: boolean;
  consecutiveSolves: number;
  recentFailures: number;
  avgTimeImprovement: number;
  topicsCompleted: string[];
  currentStreak: number;
}

class MotivationEngineSystem {
  private userTrends: Map<string, UserProgressTrend> = new Map();
  private lastMessages: Map<string, string[]> = new Map();

  // Update user trend data
  updateTrend(userId: string, event: ProgressEvent): void {
    const trend = this.userTrends.get(userId) || {
      isImproving: false,
      consecutiveSolves: 0,
      recentFailures: 0,
      avgTimeImprovement: 0,
      topicsCompleted: [],
      currentStreak: 0,
    };

    if (event.type === 'solve_after_failures' || event.type === 'first_solve' || event.type === 'fast_solve') {
      trend.consecutiveSolves++;
      trend.recentFailures = 0;
      trend.isImproving = true;
    }

    if (event.type === 'improved_time' && event.solveTime && event.previousBestTime) {
      const improvement = ((event.previousBestTime - event.solveTime) / event.previousBestTime) * 100;
      trend.avgTimeImprovement = (trend.avgTimeImprovement + improvement) / 2;
    }

    if (event.type === 'topic_complete' && event.topic) {
      if (!trend.topicsCompleted.includes(event.topic)) {
        trend.topicsCompleted.push(event.topic);
      }
    }

    if (event.type === 'streak_milestone' && event.streakCount) {
      trend.currentStreak = event.streakCount;
    }

    this.userTrends.set(userId, trend);
  }

  // Generate dynamic motivation message
  generateMessage(userId: string, event: ProgressEvent): MotivationMessage {
    const trend = this.userTrends.get(userId);
    const recentMessages = this.lastMessages.get(userId) || [];

    let message: MotivationMessage;

    switch (event.type) {
      case 'solve_after_failures':
        message = this.generatePerseveranceMessage(event, trend);
        break;
      case 'improved_time':
        message = this.generateSpeedImprovementMessage(event, trend);
        break;
      case 'harder_problem':
        message = this.generateDifficultyMessage(event, trend);
        break;
      case 'topic_complete':
        message = this.generateTopicCompleteMessage(event, trend);
        break;
      case 'streak_milestone':
        message = this.generateStreakMessage(event, trend);
        break;
      case 'first_solve':
        message = this.generateFirstSolveMessage(event, trend);
        break;
      case 'fast_solve':
        message = this.generateFastSolveMessage(event, trend);
        break;
      default:
        message = this.generateGenericMessage(event, trend);
    }

    // Avoid repeating the same message
    if (recentMessages.includes(message.message)) {
      message = this.getAlternativeMessage(event, trend);
    }

    // Track recent messages
    recentMessages.push(message.message);
    this.lastMessages.set(userId, recentMessages.slice(-10));

    return message;
  }

  private generatePerseveranceMessage(event: ProgressEvent, trend?: UserProgressTrend): MotivationMessage {
    const attempts = event.attemptCount || 1;
    const messages = [
      { msg: `${attempts} attempts and you nailed it! That's the spirit of a true coder!`, emoji: '💪', intensity: 'high' as const },
      { msg: `Persistence pays off! You conquered this after ${attempts} tries!`, emoji: '🏆', intensity: 'high' as const },
      { msg: `Never gave up, and look at you now - problem solved!`, emoji: '🌟', intensity: 'medium' as const },
      { msg: `That was tough, but you tougher! Great resilience!`, emoji: '🔥', intensity: 'high' as const },
      { msg: `Every attempt taught you something - and now it clicked!`, emoji: '💡', intensity: 'medium' as const },
    ];

    const selected = this.weightedRandom(messages, trend?.isImproving ? 2 : 0);
    return {
      message: selected.msg,
      emoji: selected.emoji,
      type: 'encouragement',
      intensity: selected.intensity,
    };
  }

  private generateSpeedImprovementMessage(event: ProgressEvent, trend?: UserProgressTrend): MotivationMessage {
    const improvement = event.previousBestTime && event.solveTime
      ? Math.round(((event.previousBestTime - event.solveTime) / event.previousBestTime) * 100)
      : 0;

    const messages = [
      { msg: `Lightning fast! You improved your time by ${improvement}%!`, emoji: '⚡', intensity: 'high' as const },
      { msg: `Speed demon! Your coding efficiency is showing!`, emoji: '🚀', intensity: 'high' as const },
      { msg: `Faster and cleaner - your skills are leveling up!`, emoji: '📈', intensity: 'medium' as const },
      { msg: `That's ${improvement}% faster! Your algorithms are getting sharper!`, emoji: '⏱️', intensity: 'medium' as const },
    ];

    const selected = this.weightedRandom(messages, improvement > 30 ? 2 : 0);
    return {
      message: selected.msg,
      emoji: selected.emoji,
      type: 'celebration',
      intensity: selected.intensity,
    };
  }

  private generateDifficultyMessage(event: ProgressEvent, trend?: UserProgressTrend): MotivationMessage {
    const difficulty = event.difficulty || 'challenging';
    const messages = [
      { msg: `A ${difficulty} problem? No problem for you!`, emoji: '🎯', intensity: 'high' as const },
      { msg: `Stepping up to ${difficulty} and crushing it!`, emoji: '💎', intensity: 'high' as const },
      { msg: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} mode unlocked and conquered!`, emoji: '🔓', intensity: 'medium' as const },
      { msg: `Taking on the tough ones - that's how champions are made!`, emoji: '👑', intensity: 'high' as const },
    ];

    const selected = this.weightedRandom(messages, difficulty === 'hard' ? 2 : 0);
    return {
      message: selected.msg,
      emoji: selected.emoji,
      type: 'milestone',
      intensity: selected.intensity,
    };
  }

  private generateTopicCompleteMessage(event: ProgressEvent, trend?: UserProgressTrend): MotivationMessage {
    const topic = event.topic || 'this topic';
    const topicsCount = trend?.topicsCompleted.length || 1;

    const messages = [
      { msg: `${topic} mastered! That's topic #${topicsCount} in your belt!`, emoji: '🎓', intensity: 'high' as const },
      { msg: `You've conquered ${topic}! Ready for the next challenge?`, emoji: '🏅', intensity: 'high' as const },
      { msg: `${topic} complete! Your coding arsenal grows stronger!`, emoji: '⚔️', intensity: 'medium' as const },
      { msg: `Another topic down! ${topic} is now your playground!`, emoji: '🎪', intensity: 'medium' as const },
    ];

    const selected = this.weightedRandom(messages, topicsCount > 3 ? 2 : 0);
    return {
      message: selected.msg,
      emoji: selected.emoji,
      type: 'milestone',
      intensity: selected.intensity,
    };
  }

  private generateStreakMessage(event: ProgressEvent, trend?: UserProgressTrend): MotivationMessage {
    const streak = event.streakCount || trend?.currentStreak || 1;

    type MessageItem = { msg: string; emoji: string; intensity: 'low' | 'medium' | 'high' };
    
    let messages: MessageItem[];
    if (streak >= 7) {
      messages = [
        { msg: `${streak} day streak! You're on fire and unstoppable!`, emoji: '🔥', intensity: 'high' },
        { msg: `A whole week of coding! Consistency is your superpower!`, emoji: '💪', intensity: 'high' },
      ];
    } else if (streak >= 3) {
      messages = [
        { msg: `${streak} days strong! Keep that momentum going!`, emoji: '📈', intensity: 'medium' },
        { msg: `Streak building! ${streak} days of dedication!`, emoji: '⭐', intensity: 'medium' },
      ];
    } else {
      messages = [
        { msg: `Day ${streak}! Every streak starts with day one!`, emoji: '🌱', intensity: 'low' },
        { msg: `${streak} days in! The journey begins!`, emoji: '🚀', intensity: 'low' },
      ];
    }

    const selected = messages[Math.floor(Math.random() * messages.length)];
    return {
      message: selected.msg,
      emoji: selected.emoji,
      type: 'streak',
      intensity: selected.intensity,
    };
  }

  private generateFirstSolveMessage(event: ProgressEvent, trend?: UserProgressTrend): MotivationMessage {
    const messages = [
      { msg: `First solve of the day! What a great way to start!`, emoji: '🌅', intensity: 'medium' as const },
      { msg: `Problem solved! You're off to an amazing start!`, emoji: '✨', intensity: 'medium' as const },
      { msg: `And we're off! First problem down, skills going up!`, emoji: '🎬', intensity: 'low' as const },
    ];

    const selected = this.weightedRandom(messages, 0);
    return {
      message: selected.msg,
      emoji: selected.emoji,
      type: 'encouragement',
      intensity: selected.intensity,
    };
  }

  private generateFastSolveMessage(event: ProgressEvent, trend?: UserProgressTrend): MotivationMessage {
    const time = event.solveTime ? Math.round(event.solveTime / 60) : 0;
    const consecutive = trend?.consecutiveSolves || 1;

    type MessageItem = { msg: string; emoji: string; intensity: 'low' | 'medium' | 'high' };
    
    const messages: MessageItem[] = time < 5
      ? [
          { msg: `Under 5 minutes! Your brain is a problem-solving machine!`, emoji: '🧠', intensity: 'high' },
          { msg: `Blazing fast! That's speed-coding at its finest!`, emoji: '⚡', intensity: 'high' },
        ]
      : [
          { msg: `Quick solve! You made that look easy!`, emoji: '🎯', intensity: 'medium' },
          { msg: `Efficient and effective - nice work!`, emoji: '💫', intensity: 'medium' },
        ];

    if (consecutive >= 3) {
      messages.push({
        msg: `${consecutive} fast solves in a row! You're in the zone!`,
        emoji: '🔥',
        intensity: 'high',
      });
    }

    const selected = messages[Math.floor(Math.random() * messages.length)];
    return {
      message: selected.msg,
      emoji: selected.emoji,
      type: 'celebration',
      intensity: selected.intensity,
    };
  }

  private generateGenericMessage(event: ProgressEvent, trend?: UserProgressTrend): MotivationMessage {
    type MessageItem = { msg: string; emoji: string; intensity: 'low' | 'medium' | 'high' };
    const messages: MessageItem[] = [
      { msg: `Great job! Keep pushing forward!`, emoji: '💪', intensity: 'low' },
      { msg: `Another problem conquered! You're doing great!`, emoji: '🌟', intensity: 'low' },
      { msg: `Progress is progress! Well done!`, emoji: '📈', intensity: 'low' },
    ];

    const selected = messages[Math.floor(Math.random() * messages.length)];
    return {
      message: selected.msg,
      emoji: selected.emoji,
      type: 'encouragement',
      intensity: selected.intensity,
    };
  }

  private getAlternativeMessage(event: ProgressEvent, trend?: UserProgressTrend): MotivationMessage {
    const alternatives = [
      { msg: `You're making it happen! Amazing work!`, emoji: '🎉', intensity: 'medium' as const },
      { msg: `Skills on display! Impressive problem-solving!`, emoji: '💡', intensity: 'medium' as const },
      { msg: `That's how it's done! Brilliant!`, emoji: '⭐', intensity: 'medium' as const },
    ];

    return {
      message: alternatives[Math.floor(Math.random() * alternatives.length)].msg,
      emoji: alternatives[Math.floor(Math.random() * alternatives.length)].emoji,
      type: 'encouragement',
      intensity: 'medium',
    };
  }

  private weightedRandom<T>(items: T[], bias: number): T {
    const index = Math.min(
      Math.floor(Math.random() * items.length + bias * Math.random()),
      items.length - 1
    );
    return items[index];
  }

  // Check if we should show motivation based on frequency
  shouldShowMotivation(userId: string): boolean {
    const recentMessages = this.lastMessages.get(userId) || [];
    // Don't spam - max one message per 30 seconds conceptually tracked by count
    return recentMessages.length < 20;
  }
}

export const motivationEngine = new MotivationEngineSystem();
