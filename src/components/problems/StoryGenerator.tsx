import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiStoryGenerator, StoryResult } from '@/lib/aiStoryGenerator';
import { Loader2, AlertCircle, BookOpen } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  language?: string;
}

interface StoryGeneratorProps {
  problem: Problem;
  onStoryGenerated?: (story: string) => void;
  className?: string;
}

// Generate a simple fallback story based on problem details
function generateFallbackStory(problem: Problem): string {
  const difficultyContext = {
    easy: "This is a great starting point for beginners to understand fundamental programming concepts.",
    medium: "This problem builds on foundational knowledge and introduces more complex thinking patterns.",
    hard: "This advanced problem challenges you to think deeply about optimization and edge cases."
  };

  return `📖 Understanding "${problem.title}"

${difficultyContext[problem.difficulty]}

This ${problem.category} problem asks you to work through a common programming scenario. As you solve it, you'll develop skills that are directly applicable to real-world software development.

Take your time to understand the problem description, think about the approach before coding, and remember that the best solutions often come from understanding the underlying pattern rather than jumping straight to implementation.`;
}

export function StoryGenerator({ problem, onStoryGenerated, className }: StoryGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [story, setStory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Check for existing saved story
  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem('userStories') || '{}');
    const saved = savedStories[problem.title];
    if (saved) {
      setStory(saved);
      setIsGenerating(false);
      setError(null);
      onStoryGenerated?.(saved);
    } else {
      // Auto-generate story if not saved
      handleGenerateStory();
    }
  }, [problem.title]);

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result: StoryResult = await aiStoryGenerator.generateStory({
        problemTitle: problem.title,
        problemDescription: problem.description,
        difficulty: problem.difficulty,
        category: problem.category,
        language: problem.language
      });

      if (result.success && result.story) {
        setStory(result.story);
        onStoryGenerated?.(result.story);
      } else {
        // Use fallback story when AI fails
        console.log('Using fallback story due to:', result.error);
        const fallback = generateFallbackStory(problem);
        setStory(fallback);
        setError(result.error?.includes('402') || result.error?.includes('credits') 
          ? 'AI story generation temporarily unavailable. Showing a brief overview instead.'
          : null);
        onStoryGenerated?.(fallback);
      }
    } catch (error) {
      console.error('Story generation error:', error);
      // Use fallback on error
      const fallback = generateFallbackStory(problem);
      setStory(fallback);
      setError('Unable to generate AI story. Showing a brief overview instead.');
      onStoryGenerated?.(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {isGenerating ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Generating story-based explanation...</span>
          </div>
        ) : story ? (
          <div className="space-y-3">
            {error && (
              <Alert variant="default" className="border-yellow-500/50 bg-yellow-500/10">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-600 dark:text-yellow-400 text-xs">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <ScrollArea className="h-64 w-full rounded-md border border-border">
              <div className="p-4">
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {story}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <BookOpen className="h-8 w-8 mb-2 opacity-50" />
            <span>Story explanation unavailable</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StoryGenerator;
