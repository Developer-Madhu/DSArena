import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { aiStoryGenerator, StoryResult } from '@/lib/aiStoryGenerator';
import { StoryModal } from './StoryModal';
import { Sparkles, RefreshCw, Loader2, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState<string>('');
  const [hasGenerated, setHasGenerated] = useState(false);

  // Check for existing saved story
  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem('userStories') || '{}');
    const saved = savedStories[problem.title];
    if (saved) {
      setStory(saved);
      setHasGenerated(true);
    }
  }, [problem.title]);

  useEffect(() => {
    // Check if we already have a generated story for this problem
    const cacheKey = `${problem.title}-${problem.difficulty}-${problem.category}-${problem.language || 'python'}`;
    const isGenerating = aiStoryGenerator.isGeneratingStory(cacheKey);
    
    if (isGenerating) {
      setIsGenerating(true);
    }
  }, [problem]);

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
        setHasGenerated(true);
        onStoryGenerated?.(result.story);
        toast.success('AI story generated! 🎉', {
          description: 'Your personalized story-based explanation is ready.',
          duration: 3000,
        });
      } else {
        toast.error('Failed to generate story', {
          description: result.error || 'Something went wrong. Please try again.',
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Story generation error:', error);
      toast.error('Story generation failed', {
        description: 'Please check your connection and try again.',
        duration: 4000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'engaging': return <Lightbulb className="h-4 w-4" />;
      case 'educational': return <BookOpen className="h-4 w-4" />;
      case 'personalized': return <TrendingUp className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Story Generator
          </CardTitle>
          <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Transform this problem into an engaging, story-based explanation
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {!hasGenerated ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-4 border border-primary/20">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                What you'll get:
              </h4>
              <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {getFeatureIcon('engaging')}
                  <span>Real-world scenario to make it relatable</span>
                </div>
                <div className="flex items-center gap-2">
                  {getFeatureIcon('educational')}
                  <span>Intuitive explanation of the challenge</span>
                </div>
                <div className="flex items-center gap-2">
                  {getFeatureIcon('personalized')}
                  <span>Personalized to your skill level</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerateStory}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating your story...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate AI Story
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Your AI-Generated Story</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateStory}
                disabled={isGenerating}
                className="h-8"
              >
                {isGenerating ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
              </Button>
            </div>

            {/* Story Modal Integration */}
            <StoryModal
              problemTitle={problem.title}
              problemDifficulty={problem.difficulty}
              problemCategory={problem.category}
              initialStory={story}
              onSave={(savedStory) => {
                setStory(savedStory);
                onStoryGenerated?.(savedStory);
              }}
            >
              <Button variant="default" className="w-full gap-2">
                <BookOpen className="h-4 w-4" />
                View & Edit Story
              </Button>
            </StoryModal>

            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-success text-sm">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Story Generated Successfully!</span>
              </div>
              <p className="text-xs text-success/80 mt-1">
                This AI-generated story helps make the problem more engaging and easier to understand.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StoryGenerator;
