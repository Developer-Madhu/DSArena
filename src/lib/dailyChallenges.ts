// Daily Challenge Service - Manages daily coding challenges and user progress
import { supabase } from '@/integrations/supabase/client';
import { problemsData } from './problemsData';

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  timeLimitMs: number;
  memoryLimitMb: number;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    is_visible: boolean;
  }>;
  story?: string;
}

export interface DailyChallengeProgress {
  userId: string;
  challengeDate: string;
  isCompleted: boolean;
  solvedAt?: string;
  runtimeMs?: number;
  language?: string;
}

class DailyChallengeService {
  // Get today's challenge
  async getTodayChallenge(): Promise<DailyChallenge> {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      // Try to get existing challenge for today
      const { data: existingChallenge, error } = await supabase
        .from('daily_challenges')
        .select('*')
        .eq('date', today)
        .single();

      if (existingChallenge && !error) {
        return this.transformChallenge(existingChallenge);
      }

      // If no challenge exists for today, generate one
      return await this.generateDailyChallenge(today);
    } catch (error) {
      console.error('Error fetching today challenge:', error);
      throw new Error('Failed to fetch today\'s challenge. Please check your database connection.');
    }
  }

  // Generate a new daily challenge
  async generateDailyChallenge(date: string): Promise<DailyChallenge> {
    try {
      // Select a random problem from the problems database
      const availableProblems = problemsData;
      if (!availableProblems || availableProblems.length === 0) {
        throw new Error('No problems available for daily challenge generation');
      }

      const randomProblem = availableProblems[Math.floor(Math.random() * availableProblems.length)];

      // Create challenge data
      const challengeData = {
        date,
        title: randomProblem.title,
        description: randomProblem.description,
        category: randomProblem.category,
        difficulty: randomProblem.difficulty,
        input_format: randomProblem.inputFormat,
        output_format: randomProblem.outputFormat,
        constraints: randomProblem.constraints,
        time_limit_ms: randomProblem.timeLimitMs,
        memory_limit_mb: randomProblem.memoryLimitMb,
        test_cases: [
          ...randomProblem.visibleTestCases.map(tc => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            is_visible: true
          })),
          ...randomProblem.hiddenTestCases.map(tc => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            is_visible: false
          }))
        ]
      };

      // Insert into database
      const { data: newChallenge, error } = await supabase
        .from('daily_challenges')
        .insert([challengeData])
        .select()
        .single();

      if (error) {
        console.error('Error creating daily challenge:', error);
        throw new Error(`Failed to create daily challenge: ${error.message}`);
      }

      if (!newChallenge) {
        throw new Error('No challenge data returned from database');
      }

      return this.transformChallenge(newChallenge);
    } catch (error) {
      console.error('Error generating daily challenge:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to generate daily challenge');
    }
  }

  // Get user progress for a specific challenge
  async getUserChallengeProgress(userId: string, challengeDate: string): Promise<DailyChallengeProgress | null> {
    try {
      const { data, error } = await supabase
        .from('daily_challenge_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('challenge_date', challengeDate)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user progress:', error);
        return null;
      }

      return data ? {
        userId: data.user_id,
        challengeDate: data.challenge_date,
        isCompleted: data.is_completed,
        solvedAt: data.solved_at,
        runtimeMs: data.runtime_ms,
        language: data.language
      } : null;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }
  }

  // Check if user has solved today's challenge
  async hasUserSolvedToday(userId: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const { data, error } = await supabase
        .from('daily_challenge_progress')
        .select('is_completed')
        .eq('user_id', userId)
        .eq('challenge_date', today)
        .eq('is_completed', true)
        .single();

      return !error && !!data;
    } catch (error) {
      return false;
    }
  }

  // Update user progress
  async updateChallengeProgress(userId: string, challengeDate: string, progress: Partial<DailyChallengeProgress>): Promise<void> {
    try {
      const updateData = {
        user_id: userId,
        challenge_date: challengeDate,
        is_completed: progress.isCompleted,
        solved_at: progress.solvedAt,
        runtime_ms: progress.runtimeMs,
        language: progress.language,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('daily_challenge_progress')
        .upsert([updateData], {
          onConflict: 'user_id,challenge_date'
        });

      if (error) {
        console.error('Error updating progress:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error updating challenge progress:', error);
      throw error;
    }
  }

  // Get user's daily streak
  async getUserDailyStreak(userId: string): Promise<number> {
    try {
      // Get all completed challenges for the user, ordered by date
      const { data: completions, error } = await supabase
        .from('daily_challenge_progress')
        .select('challenge_date, is_completed')
        .eq('user_id', userId)
        .eq('is_completed', true)
        .order('challenge_date', { ascending: false });

      if (error) {
        console.error('Error fetching streak data:', error);
        return 0;
      }

      if (!completions || completions.length === 0) {
        return 0;
      }

      // Calculate streak
      const today = new Date();
      let streak = 0;
      let currentDate = new Date(today);

      for (const completion of completions) {
        const completionDate = new Date(completion.challenge_date);
        
        // Check if this completion is consecutive
        const daysDiff = Math.floor((currentDate.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === streak) {
          streak++;
          currentDate = completionDate;
        } else {
          break;
        }
      }

      return streak;
    } catch (error) {
      console.error('Error calculating streak:', error);
      return 0;
    }
  }

  // Get user's challenge history
  async getUserChallengeHistory(userId: string, limit: number = 30): Promise<DailyChallengeProgress[]> {
    try {
      // Get progress data without join to avoid relationship issues
      const { data: progressData, error: progressError } = await supabase
        .from('daily_challenge_progress')
        .select('*')
        .eq('user_id', userId)
        .order('challenge_date', { ascending: false })
        .limit(limit);

      if (progressError) {
        console.error('Error fetching challenge progress:', progressError);
        return [];
      }

      if (!progressData || progressData.length === 0) {
        return [];
      }

      // Get challenge details separately
      const dates = progressData.map(p => p.challenge_date);
      const { data: challengeData, error: challengeError } = await supabase
        .from('daily_challenges')
        .select('date, title, difficulty, category')
        .in('date', dates);

      if (challengeError) {
        console.error('Error fetching challenge details:', challengeError);
        // Return progress data without challenge details
        return progressData.map(item => ({
          userId: item.user_id,
          challengeDate: item.challenge_date,
          isCompleted: item.is_completed,
          solvedAt: item.solved_at,
          runtimeMs: item.runtime_ms,
          language: item.language
        }));
      }

      // Combine progress and challenge data
      const challengeMap = new Map(challengeData?.map(c => [c.date, c]) || []);
      
      return progressData.map(item => {
        const challenge = challengeMap.get(item.challenge_date);
        return {
          userId: item.user_id,
          challengeDate: item.challenge_date,
          isCompleted: item.is_completed,
          solvedAt: item.solved_at,
          runtimeMs: item.runtime_ms,
          language: item.language,
          challenge: challenge ? {
            title: challenge.title,
            difficulty: challenge.difficulty,
            category: challenge.category
          } : undefined
        };
      });
    } catch (error) {
      console.error('Error fetching challenge history:', error);
      return [];
    }
  }

  // Transform database challenge to frontend format
  private transformChallenge(dbChallenge: any): DailyChallenge {
    return {
      id: dbChallenge.id,
      date: dbChallenge.date,
      title: dbChallenge.title,
      description: dbChallenge.description,
      category: dbChallenge.category,
      difficulty: dbChallenge.difficulty,
      inputFormat: dbChallenge.input_format,
      outputFormat: dbChallenge.output_format,
      constraints: dbChallenge.constraints,
      timeLimitMs: dbChallenge.time_limit_ms,
      memoryLimitMb: dbChallenge.memory_limit_mb,
      testCases: dbChallenge.test_cases || [],
      story: dbChallenge.story
    };
  }

  // Get available challenges for a date range (for calendar view)
  async getChallengeCalendar(startDate: string, endDate: string): Promise<Array<{
    date: string;
    challenge?: DailyChallenge;
    userCompleted?: boolean;
  }>> {
    try {
      const { data: challenges, error } = await supabase
        .from('daily_challenges')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching challenge calendar:', error);
        return [];
      }

      return challenges?.map(challenge => ({
        date: challenge.date,
        challenge: this.transformChallenge(challenge)
      })) || [];
    } catch (error) {
      console.error('Error fetching challenge calendar:', error);
      return [];
    }
  }

  // Get daily challenge statistics for the user
  async getUserChallengeStats(userId: string): Promise<{
    totalCompleted: number;
    currentStreak: number;
    longestStreak: number;
    averageRuntime: number;
    difficultyBreakdown: {
      easy: number;
      medium: number;
      hard: number;
    };
  }> {
    try {
      // Get progress data without join
      const { data: progressData, error: progressError } = await supabase
        .from('daily_challenge_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('is_completed', true);

      if (progressError) {
        console.error('Error fetching challenge stats:', progressError);
        return {
          totalCompleted: 0,
          currentStreak: 0,
          longestStreak: 0,
          averageRuntime: 0,
          difficultyBreakdown: { easy: 0, medium: 0, hard: 0 }
        };
      }

      const totalCompleted = progressData?.length || 0;
      const currentStreak = await this.getUserDailyStreak(userId);
      
      // Calculate difficulty breakdown if we have progress data
      const difficultyBreakdown = { easy: 0, medium: 0, hard: 0 };
      let totalRuntime = 0;
      let runtimeCount = 0;

      if (progressData && progressData.length > 0) {
        // Get challenge details for difficulty breakdown
        const dates = progressData.map(p => p.challenge_date);
        const { data: challengeData, error: challengeError } = await supabase
          .from('daily_challenges')
          .select('date, difficulty')
          .in('date', dates);

        if (!challengeError && challengeData) {
          const challengeMap = new Map(challengeData.map(c => [c.date, c.difficulty]));
          
          progressData.forEach(item => {
            const difficulty = challengeMap.get(item.challenge_date);
            if (difficulty && difficultyBreakdown.hasOwnProperty(difficulty)) {
              difficultyBreakdown[difficulty as keyof typeof difficultyBreakdown]++;
            }
            
            if (item.runtime_ms) {
              totalRuntime += item.runtime_ms;
              runtimeCount++;
            }
          });
        } else {
          // If challenge data fetch fails, just calculate runtime stats
          progressData.forEach(item => {
            if (item.runtime_ms) {
              totalRuntime += item.runtime_ms;
              runtimeCount++;
            }
          });
        }
      }

      return {
        totalCompleted,
        currentStreak,
        longestStreak: currentStreak, // For now, same as current
        averageRuntime: runtimeCount > 0 ? Math.round(totalRuntime / runtimeCount) : 0,
        difficultyBreakdown
      };
    } catch (error) {
      console.error('Error fetching challenge stats:', error);
      return {
        totalCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        averageRuntime: 0,
        difficultyBreakdown: { easy: 0, medium: 0, hard: 0 }
      };
    }
  }
}

export const dailyChallengeService = new DailyChallengeService();
