import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiStoryGenerator, StoryResult } from '@/lib/aiStoryGenerator';
import { Loader2 } from 'lucide-react';

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

export function StoryGenerator({ problem, onStoryGenerated, className }: StoryGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [story, setStory] = useState<string>('');

  // Check for existing saved story
  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem('userStories') || '{}');
    const saved = savedStories[problem.title];
    if (saved) {
      setStory(saved);
      setIsGenerating(false);
      onStoryGenerated?.(saved);
    } else {
      // Auto-generate story if not saved
      handleGenerateStory();
    }
  }, [problem.title]);

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    
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
        console.error('Failed to generate story:', result.error);
      }
    } catch (error) {
      console.error('Story generation error:', error);
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
          <div>
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
          <div className="text-center py-8 text-muted-foreground">
            Unable to generate story explanation
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StoryGenerator;
