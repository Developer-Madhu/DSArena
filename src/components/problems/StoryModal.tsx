import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Sparkles, BookOpen, Copy, Edit3, Save, X, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryModalProps {
  problemTitle: string;
  problemDifficulty: 'easy' | 'medium' | 'hard';
  problemCategory: string;
  initialStory?: string;
  onSave?: (story: string) => void;
  children?: React.ReactNode;
}

export function StoryModal({
  problemTitle,
  problemDifficulty,
  problemCategory,
  initialStory = '',
  onSave,
  children
}: StoryModalProps) {
  const [story, setStory] = useState(initialStory);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStory, setEditedStory] = useState(initialStory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleSave = () => {
    setStory(editedStory);
    setIsEditing(false);
    onSave?.(editedStory);
    
    // Save to localStorage
    const savedStories = JSON.parse(localStorage.getItem('userStories') || '{}');
    savedStories[problemTitle] = editedStory;
    localStorage.setItem('userStories', JSON.stringify(savedStories));
    
    toast.success('Story saved!', {
      description: 'Your personalized story has been saved for future reference.',
      duration: 3000,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story);
      toast.success('Story copied!', {
        description: 'The story has been copied to your clipboard.',
        duration: 2000,
      });
    } catch (error) {
      toast.error('Failed to copy', {
        description: 'Please try again or copy manually.',
        duration: 2000,
      });
    }
  };

  const loadSavedStory = () => {
    const savedStories = JSON.parse(localStorage.getItem('userStories') || '{}');
    const saved = savedStories[problemTitle];
    if (saved) {
      setStory(saved);
      setEditedStory(saved);
      toast.info('Loaded saved story', {
        description: 'Your previously saved story has been loaded.',
        duration: 2000,
      });
    } else {
      toast.info('No saved story found', {
        description: 'Generate a new story first.',
        duration: 2000,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2">
            <BookOpen className="h-4 w-4" />
            View Story
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <div>
                <DialogTitle className="text-xl">
                  AI Story for: {problemTitle}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={getDifficultyColor(problemDifficulty)}>
                    {problemDifficulty}
                  </Badge>
                  <Badge variant="secondary">{problemCategory}</Badge>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {story ? (
            <div className="h-full flex flex-col">
              {/* Story Actions */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadSavedStory}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Load Saved
                  </Button>
                </div>
                
                {isEditing && (
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </div>

              {/* Story Content */}
              <ScrollArea className="flex-1">
                <div className="pr-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editedStory}
                        onChange={(e) => setEditedStory(e.target.value)}
                        className="min-h-[300px] font-mono text-sm"
                        placeholder="Edit your story here..."
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{editedStory.length} characters</span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(false)}
                            className="h-6 px-2"
                          >
                            <X className="h-3 w-3 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-invert prose-lg max-w-none">
                      <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
                        {story}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Story Footer */}
              {!isEditing && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>{story.length} characters</span>
                      <span>Generated by AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Story ID: {problemTitle.replace(/\s+/g, '-').toLowerCase()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Story Generated Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Generate an AI-powered story to make this problem more engaging and easier to understand.
                </p>
                <Button variant="outline" onClick={loadSavedStory}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Loading Saved Story
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StoryModal;
