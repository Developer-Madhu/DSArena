// AI Story Generation Service using Google Generative AI
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyA3xHDu673YOesw92JjcSbYsWnju9pzNMQ';
const MODEL_NAME = 'gemini-3-pro-preview';

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(API_KEY);

export interface StoryGenerationOptions {
  problemTitle: string;
  problemDescription: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  language?: string;
}

export interface StoryResult {
  success: boolean;
  story?: string;
  error?: string;
}

class AIStoryGenerator {
  private cache: Map<string, string> = new Map();
  private isGenerating: Map<string, Promise<StoryResult>> = new Map();

  /**
   * Generate a story-based description for a problem
   */
  async generateStory(options: StoryGenerationOptions): Promise<StoryResult> {
    const { problemTitle, problemDescription, difficulty, category, language = 'python' } = options;
    
    // Create cache key
    const cacheKey = `${problemTitle}-${difficulty}-${category}-${language}`;
    
    // Return cached result if available
    if (this.cache.has(cacheKey)) {
      return {
        success: true,
        story: this.cache.get(cacheKey)!
      };
    }

    // Return existing generation promise if already in progress
    if (this.isGenerating.has(cacheKey)) {
      return this.isGenerating.get(cacheKey)!;
    }

    // Start new generation
    const generationPromise = this.performGeneration(cacheKey, options);
    this.isGenerating.set(cacheKey, generationPromise);
    
    try {
      const result = await generationPromise;
      this.isGenerating.delete(cacheKey);
      return result;
    } catch (error) {
      this.isGenerating.delete(cacheKey);
      throw error;
    }
  }

  private async performGeneration(cacheKey: string, options: StoryGenerationOptions): Promise<StoryResult> {
    try {
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const prompt = this.buildPrompt(options);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from AI');
      }

      // Clean and format the response
      const story = this.cleanResponse(text);
      
      // Cache the result
      this.cache.set(cacheKey, story);
      
      // Store in localStorage for persistence
      this.storeInLocalStorage(cacheKey, story);

      return {
        success: true,
        story
      };

    } catch (error) {
      console.error('Story generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private buildPrompt(options: StoryGenerationOptions): string {
    const { problemTitle, problemDescription, difficulty, category } = options;
    
    return `
Create a story-based explanation for the following coding problem. The story should help learners understand the problem in a real-world context without using emojis or special characters.

Problem Title: ${problemTitle}
Difficulty: ${difficulty}
Category: ${category}

Original Problem Description:
${problemDescription}

Please create a narrative that:
1. Sets up a realistic scenario where this problem naturally occurs
2. Explains the challenge in an intuitive, relatable way
3. Uses characters or situations that make the concept memorable
4. Connects the story context to the technical problem
5. Maintains educational value while being engaging

Make it suitable for ${difficulty} level and ensure the story helps learners understand WHY this problem exists, not just HOW to solve it.

Format the response as a cohesive narrative. Keep it concise (2-3 paragraphs max) and focus purely on the storytelling without emojis, special symbols, or decorative elements.
`;
  }

  private cleanResponse(text: string): string {
    // Remove markdown formatting and clean up the response
    let cleaned = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
      .replace(/`(.*?)`/g, '$1') // Remove code markdown
      .replace(/#{1,6}\s/g, '') // Remove header markdown
      .replace(/\n\s*\n/g, '\n\n') // Normalize line breaks
      .trim();

    // Ensure it ends properly
    if (!cleaned.endsWith('.') && !cleaned.endsWith('!') && !cleaned.endsWith('?')) {
      cleaned += '.';
    }

    return cleaned;
  }

  private storeInLocalStorage(cacheKey: string, story: string): void {
    try {
      const stories = this.getStoredStories();
      stories[cacheKey] = {
        story,
        timestamp: Date.now()
      };
      localStorage.setItem('aiGeneratedStories', JSON.stringify(stories));
    } catch (error) {
      console.warn('Failed to store story in localStorage:', error);
    }
  }

  private getStoredStories(): Record<string, { story: string; timestamp: number }> {
    try {
      const stored = localStorage.getItem('aiGeneratedStories');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  /**
   * Load stories from localStorage cache
   */
  loadFromCache(): void {
    const stored = this.getStoredStories();
    const now = Date.now();
    const weekInMs = 7 * 24 * 60 * 60 * 1000; // 1 week cache

    Object.entries(stored).forEach(([key, data]) => {
      // Only cache for a week
      if (now - data.timestamp < weekInMs) {
        this.cache.set(key, data.story);
      }
    });
  }

  /**
   * Clear all cached stories
   */
  clearCache(): void {
    this.cache.clear();
    try {
      localStorage.removeItem('aiGeneratedStories');
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  /**
   * Check if a story is being generated for the given key
   */
  isGeneratingStory(cacheKey: string): boolean {
    return this.isGenerating.has(cacheKey);
  }
}

// Export singleton instance
export const aiStoryGenerator = new AIStoryGenerator();

// Load cache on module initialization
aiStoryGenerator.loadFromCache();
