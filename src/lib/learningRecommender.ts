// Personalized Learning Recommender System
// Analyzes user performance and provides adaptive recommendations

import { supabase } from '@/integrations/supabase/client';
import { topicSections } from './videoData';

export interface UserPerformanceData {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  attempts: number;
  solveTime: number; // seconds
  expectedTime: number; // seconds
  isSuccess: boolean;
  language?: string;
}

export interface TopicStrength {
  topic: string;
  successRate: number;
  avgAttempts: number;
  avgSolveTime: number;
  problemsAttempted: number;
  problemsSolved: number;
  isStrength: boolean;
  isWeakness: boolean;
  needsPrerequisites: boolean;
}

export interface LearningRecommendation {
  type: 'topic' | 'video' | 'practice' | 'review';
  priority: 'high' | 'medium' | 'low';
  topic: string;
  title: string;
  reason: string;
  actionUrl?: string;
  videoId?: string;
}

// Topic dependency graph
const TOPIC_PREREQUISITES: Record<string, string[]> = {
  'Trees': ['Arrays', 'Recursion', 'Linked Lists'],
  'Graphs': ['Arrays', 'Recursion', 'Trees', 'Queues', 'Stacks'],
  'Dynamic Programming': ['Arrays', 'Recursion', 'Strings'],
  'Backtracking': ['Recursion', 'Arrays'],
  'Heaps': ['Arrays', 'Trees'],
  'Tries': ['Trees', 'Strings'],
  'Segment Trees': ['Trees', 'Arrays'],
  'Binary Search': ['Arrays', 'Sorting'],
  'Two Pointers': ['Arrays', 'Sorting'],
  'Sliding Window': ['Arrays', 'Two Pointers'],
  'Linked Lists': ['Arrays'],
  'Stacks': ['Arrays', 'Linked Lists'],
  'Queues': ['Arrays', 'Linked Lists'],
  'Sorting': ['Arrays'],
  'Searching': ['Arrays', 'Sorting'],
  'Hashing': ['Arrays'],
  'Recursion': ['Arrays', 'Strings'],
  'Bit Manipulation': ['Arrays'],
};

// Expected solve times by difficulty (in seconds)
const EXPECTED_SOLVE_TIMES: Record<string, number> = {
  easy: 600,    // 10 minutes
  medium: 1200, // 20 minutes
  hard: 2400,   // 40 minutes
};

// Topic to video section mapping
const TOPIC_TO_VIDEO_SECTION: Record<string, string> = {
  'Arrays': 'arrays',
  'Linked Lists': 'linked-lists',
  'Graphs': 'graphs',
  'Stacks': 'stacks',
  'Queues': 'queues',
  'Trees': 'trees',
  'Strings': 'arrays', // fallback
  'Sorting': 'arrays',
  'Searching': 'arrays',
  'Dynamic Programming': 'arrays',
  'Recursion': 'trees',
};

class LearningRecommenderSystem {
  private performanceCache: Map<string, UserPerformanceData[]> = new Map();
  private strengthCache: Map<string, TopicStrength[]> = new Map();
  private lastAnalysis: number = 0;
  private CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Record a problem attempt
  async recordAttempt(userId: string, data: UserPerformanceData): Promise<void> {
    const key = `perf_${userId}`;
    const existing = this.performanceCache.get(key) || [];
    existing.push({ ...data, expectedTime: EXPECTED_SOLVE_TIMES[data.difficulty] || 1200 });
    this.performanceCache.set(key, existing.slice(-100)); // Keep last 100 attempts
    this.lastAnalysis = 0; // Invalidate cache
  }

  // Analyze user strengths and weaknesses
  async analyzePerformance(userId: string): Promise<TopicStrength[]> {
    const cacheKey = `strength_${userId}`;
    if (Date.now() - this.lastAnalysis < this.CACHE_TTL) {
      const cached = this.strengthCache.get(cacheKey);
      if (cached) return cached;
    }

    // Fetch historical data from database
    const { data: solvedData } = await supabase
      .from('user_solved')
      .select('problem_slug, attempts, best_runtime_ms, first_solved_at')
      .eq('user_id', userId);

    const { data: arenaSessions } = await supabase
      .from('arena_sessions')
      .select('topic, difficulty, time_taken_seconds, result, attempts_count')
      .eq('user_id', userId);

    const { data: skillRatings } = await supabase
      .from('skill_ratings')
      .select('topic, rating, problems_solved, problems_attempted, accuracy')
      .eq('user_id', userId);

    // Aggregate by topic
    const topicStats: Map<string, {
      attempts: number;
      solved: number;
      totalTime: number;
      ratings: number[];
    }> = new Map();

    // Process arena sessions
    (arenaSessions || []).forEach(session => {
      const topic = session.topic;
      const stats = topicStats.get(topic) || { attempts: 0, solved: 0, totalTime: 0, ratings: [] };
      stats.attempts++;
      if (session.result === 'solved') stats.solved++;
      stats.totalTime += session.time_taken_seconds || 0;
      topicStats.set(topic, stats);
    });

    // Process skill ratings
    (skillRatings || []).forEach(rating => {
      const stats = topicStats.get(rating.topic) || { attempts: 0, solved: 0, totalTime: 0, ratings: [] };
      stats.ratings.push(rating.rating);
      stats.attempts = Math.max(stats.attempts, rating.problems_attempted);
      stats.solved = Math.max(stats.solved, rating.problems_solved);
      topicStats.set(rating.topic, stats);
    });

    // Calculate strengths/weaknesses
    const strengths: TopicStrength[] = [];
    topicStats.forEach((stats, topic) => {
      const successRate = stats.attempts > 0 ? (stats.solved / stats.attempts) * 100 : 0;
      const avgRating = stats.ratings.length > 0 
        ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length 
        : 1000;
      
      const isStrength = successRate >= 70 && stats.solved >= 3;
      const isWeakness = successRate < 50 || (stats.attempts >= 3 && successRate < 60);
      
      // Check if user needs prerequisites
      const prerequisites = TOPIC_PREREQUISITES[topic] || [];
      const needsPrerequisites = isWeakness && prerequisites.some(prereq => {
        const prereqStats = topicStats.get(prereq);
        return !prereqStats || (prereqStats.solved / prereqStats.attempts) < 0.6;
      });

      strengths.push({
        topic,
        successRate,
        avgAttempts: stats.attempts > 0 ? stats.solved > 0 ? stats.attempts / stats.solved : stats.attempts : 0,
        avgSolveTime: stats.solved > 0 ? stats.totalTime / stats.solved : 0,
        problemsAttempted: stats.attempts,
        problemsSolved: stats.solved,
        isStrength,
        isWeakness,
        needsPrerequisites,
      });
    });

    this.strengthCache.set(cacheKey, strengths);
    this.lastAnalysis = Date.now();
    return strengths;
  }

  // Generate personalized recommendations
  async getRecommendations(userId: string): Promise<LearningRecommendation[]> {
    const strengths = await this.analyzePerformance(userId);
    const recommendations: LearningRecommendation[] = [];

    // Find weaknesses
    const weaknesses = strengths.filter(s => s.isWeakness).sort((a, b) => a.successRate - b.successRate);
    const needsPrereqs = weaknesses.filter(s => s.needsPrerequisites);

    // Recommend prerequisites for struggling advanced topics
    for (const weakness of needsPrereqs.slice(0, 2)) {
      const prerequisites = TOPIC_PREREQUISITES[weakness.topic] || [];
      for (const prereq of prerequisites) {
        const prereqStrength = strengths.find(s => s.topic === prereq);
        if (!prereqStrength || prereqStrength.successRate < 70) {
          recommendations.push({
            type: 'topic',
            priority: 'high',
            topic: prereq,
            title: `Master ${prereq} First`,
            reason: `Strengthen your ${prereq} skills before tackling ${weakness.topic}. It's a key foundation!`,
            actionUrl: `/practice?topic=${prereq.toLowerCase().replace(' ', '-')}`,
          });
        }
      }
    }

    // Recommend videos for repeated failures
    for (const weakness of weaknesses.slice(0, 3)) {
      const videoSection = TOPIC_TO_VIDEO_SECTION[weakness.topic];
      const section = topicSections.find(s => s.id === videoSection);
      
      if (section && section.videos.length > 0) {
        const firstVideo = section.videos[0];
        recommendations.push({
          type: 'video',
          priority: weakness.successRate < 30 ? 'high' : 'medium',
          topic: weakness.topic,
          title: `Watch: ${firstVideo.title}`,
          reason: `A quick video refresher on ${weakness.topic} concepts might help boost your success rate!`,
          actionUrl: '/videos',
          videoId: firstVideo.youtubeId,
        });
      }
    }

    // Recommend practice for near-mastery topics
    const almostStrong = strengths.filter(s => 
      s.successRate >= 50 && s.successRate < 70 && s.problemsAttempted >= 2
    );
    
    for (const topic of almostStrong.slice(0, 2)) {
      recommendations.push({
        type: 'practice',
        priority: 'medium',
        topic: topic.topic,
        title: `Level Up in ${topic.topic}`,
        reason: `You're doing well! A few more problems and you'll master this topic.`,
        actionUrl: `/practice?topic=${topic.topic.toLowerCase().replace(' ', '-')}`,
      });
    }

    // Recommend review for strong topics not practiced recently
    const strongButStale = strengths.filter(s => s.isStrength);
    if (strongButStale.length > 0) {
      const topic = strongButStale[0];
      recommendations.push({
        type: 'review',
        priority: 'low',
        topic: topic.topic,
        title: `Quick Review: ${topic.topic}`,
        reason: `Keep your ${topic.topic} skills sharp with a quick refresher!`,
        actionUrl: `/practice?topic=${topic.topic.toLowerCase().replace(' ', '-')}`,
      });
    }

    return recommendations.slice(0, 6);
  }

  // Get video recommendations based on failures
  getVideoRecommendationsForTopic(topic: string): { title: string; videoId: string }[] {
    const videoSection = TOPIC_TO_VIDEO_SECTION[topic];
    const section = topicSections.find(s => s.id === videoSection);
    
    if (!section) return [];
    
    return section.videos.slice(0, 3).map(v => ({
      title: v.title,
      videoId: v.youtubeId,
    }));
  }

  // Detect topic from problem category
  detectTopic(category: string): string {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('array')) return 'Arrays';
    if (categoryLower.includes('string')) return 'Strings';
    if (categoryLower.includes('linked')) return 'Linked Lists';
    if (categoryLower.includes('tree')) return 'Trees';
    if (categoryLower.includes('graph')) return 'Graphs';
    if (categoryLower.includes('stack')) return 'Stacks';
    if (categoryLower.includes('queue')) return 'Queues';
    if (categoryLower.includes('dp') || categoryLower.includes('dynamic')) return 'Dynamic Programming';
    if (categoryLower.includes('recursion')) return 'Recursion';
    if (categoryLower.includes('sort')) return 'Sorting';
    if (categoryLower.includes('search')) return 'Searching';
    if (categoryLower.includes('hash')) return 'Hashing';
    if (categoryLower.includes('bit')) return 'Bit Manipulation';
    if (categoryLower.includes('two pointer')) return 'Two Pointers';
    if (categoryLower.includes('sliding')) return 'Sliding Window';
    return 'Arrays'; // Default
  }
}

export const learningRecommender = new LearningRecommenderSystem();
