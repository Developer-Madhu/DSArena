// Daily Challenge System with AI-Generated Problems
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyALrlxecmAarC-gYt3FNeFVA8XvTkHMGk0';
const MODEL_NAME = 'gemini-3-flash-preview';

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(API_KEY);

export interface DailyChallenge {
  id: string;
  date: string; // YYYY-MM-DD format
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  starterCode: string;
  testCases: {
    input: string;
    expectedOutput: string;
    is_visible: boolean;
  }[];
  timeLimitMs: number;
  memoryLimitMb: number;
  language: string;
  story?: string; // AI-generated story
  solvedBy?: number; // Number of users who solved it
  successRate?: number; // Percentage of users who solved it
  createdAt: string;
}

export interface DailyChallengeProgress {
  userId: string;
  challengeDate: string;
  solvedAt?: string;
  timeSpent?: number; // in seconds
  attempts: number;
  isCompleted: boolean;
  score?: number;
}

class DailyChallengeService {
  private cache: Map<string, DailyChallenge> = new Map();
  private isGenerating: Map<string, Promise<DailyChallenge>> = new Map();

  private readonly DIFFICULTIES: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
  private readonly CATEGORIES = [
    'Arrays and Hashing',
    'Two Pointers', 
    'Sliding Window',
    'Stacks',
    'Binary Search',
    'Linked List',
    'Trees',
    '1D Dynamic Programming',
    'Greedy',
    'Bit Manipulation'
  ];

  /**
   * Generate a new daily challenge
   */
  async generateDailyChallenge(date: string): Promise<DailyChallenge> {
    // Check if challenge already exists for this date
    const existing = this.getCachedChallenge(date);
    if (existing) {
      return existing;
    }

    // Return existing generation promise if already in progress
    if (this.isGenerating.has(date)) {
      return this.isGenerating.get(date)!;
    }

    // Start new generation
    const generationPromise = this.performGeneration(date);
    this.isGenerating.set(date, generationPromise);
    
    try {
      const result = await generationPromise;
      this.isGenerating.delete(date);
      return result;
    } catch (error) {
      this.isGenerating.delete(date);
      throw error;
    }
  }

  private async performGeneration(date: string): Promise<DailyChallenge> {
    try {
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      // Select random difficulty and category
      const difficulty = this.getRandomDifficulty();
      const category = this.getRandomCategory();
      
      // Generate problem details using AI
      const problemDetails = await this.generateProblemDetails(model, difficulty, category);
      
      // Generate AI story
      const story = await this.generateStory(model, problemDetails, difficulty, category);
      
      // Create the challenge
      const challenge: DailyChallenge = {
        id: `daily-${date}`,
        date,
        title: problemDetails.title,
        description: problemDetails.description,
        difficulty,
        category,
        inputFormat: problemDetails.inputFormat,
        outputFormat: problemDetails.outputFormat,
        constraints: problemDetails.constraints,
        starterCode: problemDetails.starterCode,
        testCases: problemDetails.testCases,
        timeLimitMs: 2000,
        memoryLimitMb: 256,
        language: 'python',
        story,
        createdAt: new Date().toISOString()
      };

      // Cache and store the challenge
      this.cache.set(date, challenge);
      this.storeChallengeInLocalStorage(challenge);
      this.storeChallengeInSupabase(challenge);

      return challenge;
    } catch (error) {
      console.error('Daily challenge generation failed:', error);
      throw new Error('Failed to generate daily challenge');
    }
  }

  private async generateProblemDetails(
    model: any, 
    difficulty: 'easy' | 'medium' | 'hard', 
    category: string
  ): Promise<any> {
    const prompt = `
Generate a coding problem for the DSArena daily challenge.

Category: ${category}
Difficulty: ${difficulty}

Please provide a complete problem with the following structure in JSON format:

{
  "title": "Problem title",
  "description": "Complete problem description with examples and explanation",
  "inputFormat": "Function signature and input format",
  "outputFormat": "Output format description", 
  "constraints": "Problem constraints",
  "starterCode": "Python starter code template",
  "testCases": [
    {
      "input": "Input format",
      "expectedOutput": "Expected output",
      "is_visible": true
    },
    {
      "input": "Another test case",
      "expectedOutput": "Expected output", 
      "is_visible": false
    }
  ]
}

Requirements:
- Title should be clear and descriptive
- Description should include problem analysis, examples, and approach strategy
- Input/output formats should be specific
- Constraints should be realistic and challenging
- Starter code should provide function signature and basic structure
- Include 3-5 test cases (1-2 visible, 2-3 hidden)
- Problem should be original and educational
- Difficulty should match the specified level

Make sure the JSON is valid and complete.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    try {
      const problemDetails = JSON.parse(jsonMatch[0]);
      
      // Validate required fields
      if (!problemDetails.title || !problemDetails.description || !problemDetails.testCases) {
        throw new Error('Invalid problem structure from AI');
      }

      return problemDetails;
    } catch (error) {
      console.error('Failed to parse AI response:', text);
      throw new Error('Invalid JSON from AI response');
    }
  }

  private async generateStory(
    model: any, 
    problemDetails: any, 
    difficulty: 'easy' | 'medium' | 'hard', 
    category: string
  ): Promise<string> {
    const prompt = `
Create a story-based explanation for this coding problem. The story should help learners understand the problem in a real-world context.

Problem Title: ${problemDetails.title}
Difficulty: ${difficulty}
Category: ${category}

Original Problem Description:
${problemDetails.description}

Please create a narrative that:
1. Sets up a realistic scenario where this problem naturally occurs
2. Explains the challenge in an intuitive, relatable way
3. Uses characters or situations that make the concept memorable
4. Connects the story context to the technical problem
5. Maintains educational value while being engaging

Format as a cohesive narrative. Keep it concise (2-3 paragraphs max) without emojis or special symbols.
`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.cleanResponse(text);
    } catch (error) {
      console.error('Story generation failed:', error);
      return `This problem challenges you to apply fundamental ${category} concepts. Understanding the underlying principles will help you develop an efficient solution.`;
    }
  }

  private cleanResponse(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
  }

  private getRandomDifficulty(): 'easy' | 'medium' | 'hard' {
    const weights = { easy: 0.4, medium: 0.4, hard: 0.2 };
    const random = Math.random();
    
    if (random < weights.easy) return 'easy';
    if (random < weights.easy + weights.medium) return 'medium';
    return 'hard';
  }

  private getRandomCategory(): string {
    return this.CATEGORIES[Math.floor(Math.random() * this.CATEGORIES.length)];
  }

  private getCachedChallenge(date: string): DailyChallenge | null {
    return this.cache.get(date) || null;
  }

  private storeChallengeInLocalStorage(challenge: DailyChallenge): void {
    try {
      const challenges = this.getStoredChallenges();
      challenges[challenge.date] = challenge;
      localStorage.setItem('dailyChallenges', JSON.stringify(challenges));
    } catch (error) {
      console.warn('Failed to store challenge in localStorage:', error);
    }
  }

  private async storeChallengeInSupabase(challenge: DailyChallenge): Promise<void> {
    try {
      // This would integrate with Supabase to store the challenge
      // For now, we'll just log it
      console.log('Storing challenge in Supabase:', challenge.id);
    } catch (error) {
      console.warn('Failed to store challenge in Supabase:', error);
    }
  }

  private getStoredChallenges(): Record<string, DailyChallenge> {
    try {
      const stored = localStorage.getItem('dailyChallenges');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  /**
   * Get today's challenge
   */
  async getTodayChallenge(): Promise<DailyChallenge> {
    const today = new Date().toISOString().split('T')[0];
    return this.getChallengeByDate(today);
  }

  /**
   * Get challenge by date
   */
  async getChallengeByDate(date: string): Promise<DailyChallenge> {
    // Try to get from cache first
    let challenge = this.getCachedChallenge(date);
    
    if (!challenge) {
      // Try to load from localStorage
      const stored = this.getStoredChallenges();
      challenge = stored[date];
      
      if (challenge) {
        this.cache.set(date, challenge);
      }
    }

    if (!challenge) {
      // Generate new challenge
      challenge = await this.generateDailyChallenge(date);
    }

    return challenge;
  }

  /**
   * Get challenge progress for a user
   */
  async getUserChallengeProgress(userId: string, challengeDate: string): Promise<DailyChallengeProgress | null> {
    try {
      // This would query Supabase for user progress
      // For now, return null
      return null;
    } catch (error) {
      console.error('Failed to get user progress:', error);
      return null;
    }
  }

  /**
   * Update user challenge progress
   */
  async updateChallengeProgress(userId: string, challengeDate: string, progress: Partial<DailyChallengeProgress>): Promise<void> {
    try {
      // This would update Supabase with user progress
      console.log('Updating challenge progress:', { userId, challengeDate, progress });
    } catch (error) {
      console.error('Failed to update challenge progress:', error);
    }
  }

  /**
   * Get user's daily challenge streak
   */
  async getUserDailyStreak(userId: string): Promise<number> {
    try {
      // This would query Supabase for user's daily challenge streak
      // For now, return 0
      return 0;
    } catch (error) {
      console.error('Failed to get user daily streak:', error);
      return 0;
    }
  }

  /**
   * Check if user solved today's challenge
   */
  async hasUserSolvedToday(userId: string): Promise<boolean> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const progress = await this.getUserChallengeProgress(userId, today);
      return progress?.isCompleted || false;
    } catch (error) {
      console.error('Failed to check if user solved today:', error);
      return false;
    }
  }

  /**
   * Get all challenges for a date range
   */
  async getChallengesByDateRange(startDate: string, endDate: string): Promise<DailyChallenge[]> {
    const challenges: DailyChallenge[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      try {
        const challenge = await this.getChallengeByDate(dateStr);
        challenges.push(challenge);
      } catch (error) {
        console.warn(`Failed to get challenge for ${dateStr}:`, error);
      }
    }
    
    return challenges;
  }

  /**
   * Load challenges from localStorage cache
   */
  loadFromCache(): void {
    const stored = this.getStoredChallenges();
    Object.values(stored).forEach(challenge => {
      this.cache.set(challenge.date, challenge);
    });
  }

  /**
   * Clear all cached challenges
   */
  clearCache(): void {
    this.cache.clear();
    try {
      localStorage.removeItem('dailyChallenges');
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
}

// Export singleton instance
export const dailyChallengeService = new DailyChallengeService();

// Load cache on module initialization
dailyChallengeService.loadFromCache();
