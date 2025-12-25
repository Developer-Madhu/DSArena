// Daily Challenge Page with Problem-Solving Interface
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { TestCasePanel } from '@/components/problems/TestCasePanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useAuth } from '@/lib/auth';
import { dailyChallengeService, DailyChallenge, DailyChallengeProgress } from '@/lib/dailyChallenges';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Calendar,
  Trophy,
  Clock,
  Target,
  Flame,
  Star,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Home,
  Zap,
  BookOpen,
  Play,
  Send,
  Save,
  ChevronLeft,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { getLocalLivesData, loseLife, hasLives, formatTimeRemaining, getTimeUntilNextRestore } from '@/lib/livesSystem';
import { LivesDisplay } from '@/components/lives/LivesDisplay';
import { GlitchyAssistant } from '@/components/editor/GlitchyAssistant';
import { LanguageSelector } from '@/components/editor/LanguageSelector';
import { StoryGenerator } from '@/components/problems/StoryGenerator';

export default function DailyChallengePage() {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [userProgress, setUserProgress] = useState<DailyChallengeProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todaySolved, setTodaySolved] = useState(false);
  const [userStreak, setUserStreak] = useState(0);

  const [code, setCode] = useState('');
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [showDescription, setShowDescription] = useState(true);
  const [solved, setSolved] = useState(false);
  const [noLives, setNoLives] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');

  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const currentDate = new Date();
  const dateFormatted = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Helper functions for UI elements
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-700 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Target className="h-4 w-4" />;
      case 'medium': return <Zap className="h-4 w-4" />;
      case 'hard': return <Star className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  // Language-specific starter code templates
  const getStarterCodeForLanguage = useCallback((lang: string): string => {
    const templates: Record<string, string> = {
      python: `# Write your solution here
def solution():
    # Your code here
    pass

# Read input
# n = int(input())
# Print output
# print(result)
`,
      javascript: `// Write your solution here
function solution() {
    // Your code here
}

// Read input from stdin
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
    lines.push(line);
});

rl.on('close', () => {
    // Parse input and call solution
    console.log(solution());
});
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Read input
        // int n = scanner.nextInt();
        
        // Your solution here
        
        // Print output
        // System.out.println(result);
    }
}
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // Read input
    // int n;
    // cin >> n;
    
    // Your solution here
    
    // Print output
    // cout << result << endl;
    
    return 0;
}
`,
    };
    return templates[lang] || templates.python;
  }, []);

  useEffect(() => {
    loadDailyChallenge();
  }, []);

  useEffect(() => {
    // Initialize code when challenge and language are loaded
    if (challenge && selectedLanguage) {
      const draftKey = `daily-challenge-draft-${user?.id || 'anonymous'}-${selectedLanguage}`;
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        setCode(savedDraft);
      } else {
        setCode(getStarterCodeForLanguage(selectedLanguage));
      }
    }
  }, [challenge, selectedLanguage, user?.id, getStarterCodeForLanguage]);

  const loadDailyChallenge = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load today's challenge
      const todayChallenge = await dailyChallengeService.getTodayChallenge();
      setChallenge(todayChallenge);

      // Load user progress (works for both logged in and anonymous users)
      const progress = await dailyChallengeService.getTodayChallengeProgress();
      const solved = await dailyChallengeService.hasUserSolvedToday();
      const streak = await dailyChallengeService.getUserDailyStreak();

      setUserProgress(progress);
      setTodaySolved(solved);
      setUserStreak(streak);
    } catch (err) {
      console.error('Failed to load daily challenge:', err);
      setError('Failed to load daily challenge. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  const markAsSolved = async () => {
    if (!challenge) return;

    try {
      const progress: Partial<DailyChallengeProgress> = {
        isCompleted: true,
        solvedAt: new Date().toISOString()
      };

      await dailyChallengeService.updateChallengeProgress(today, progress);
      
      // Update local state
      const newProgress: DailyChallengeProgress = {
        challengeDate: today,
        ...progress
      } as DailyChallengeProgress;

      setUserProgress(newProgress);
      setTodaySolved(true);
      toast.success('Congratulations! Daily challenge completed!');

      // Reload streak
      const newStreak = await dailyChallengeService.getUserDailyStreak();
      setUserStreak(newStreak);
    } catch (err) {
      console.error('Failed to update progress:', err);
      toast.error('Failed to save progress. Please try again.');
    }
  };

  // Lives system integration
  useEffect(() => {
    // Check if user has lives
    if (!hasLives(user?.id)) {
      setNoLives(true);
      return;
    }

    // Only apply lives system if challenge is not already solved
    if (todaySolved) return;

    const handleVisibilityChange = () => {
      if (document.hidden && !todaySolved && hasLives(user?.id)) {
        // User switched tabs or minimized - lose a life
        const newLivesData = loseLife(user?.id);
        
        if (newLivesData.lives === 0) {
          setNoLives(true);
          toast.error('You lost all your lives! Come back in 10 minutes.', {
            duration: 5000,
          });
        } else {
          toast.warning(`You lost a life for leaving! ${newLivesData.lives} lives remaining.`, {
            duration: 3000,
          });
        }
      }
    };

    const handleBlur = () => {
      if (!todaySolved && hasLives(user?.id)) {
        // Window lost focus - lose a life (only if we still have lives)
        const currentLives = getLocalLivesData(user?.id);
        if (currentLives.lives > 0) {
          const newLivesData = loseLife(user?.id);
          
          if (newLivesData.lives === 0) {
            setNoLives(true);
            toast.error('You lost all your lives! Come back in 10 minutes.', {
              duration: 5000,
            });
          } else {
            toast.warning(`Focus lost! You lost a life. ${newLivesData.lives} remaining.`, {
              duration: 3000,
            });
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [user, todaySolved]);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#00D9FF', '#10B981', '#8B5CF6'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#00D9FF', '#10B981', '#8B5CF6'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const saveProgressHandler = async (runtimeMs?: number) => {
    if (!challenge) {
      console.error('Cannot save progress: challenge is missing');
      return;
    }

    try {
      // Save progress using local storage
      await dailyChallengeService.updateChallengeProgress(today, {
        isCompleted: true,
        solvedAt: new Date().toISOString(),
        runtimeMs,
        language: selectedLanguage
      });
      
      console.log('Saving progress:', { challengeId: challenge.id, runtimeMs });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const saveDraft = useCallback(() => {
    if (!user) {
      toast.error('Please sign in to save your draft');
      return;
    }
    const draftKey = `daily-challenge-draft-${user.id}-${selectedLanguage}`;
    localStorage.setItem(draftKey, code);
    toast.success('Draft saved');
  }, [user, code, selectedLanguage]);

  const runCode = async (submitAll = false) => {
    if (!challenge) return;

    if (!user) {
      toast.error('Please sign in to run code');
      return;
    }

    if (submitAll) {
      setSubmitting(true);
    } else {
      setRunning(true);
    }
    setResults(null);
    setConsoleOutput('');
    setLastError(null);

    try {
      const testCasesToRun = submitAll 
        ? challenge.testCases
        : challenge.testCases.filter(tc => tc.is_visible);

      const formattedTestCases = testCasesToRun.map(tc => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
      }));

      const { data, error } = await supabase.functions.invoke('execute-code', {
        body: { code, testCases: formattedTestCases, language: selectedLanguage }
      });

      if (error) {
        throw new Error(error.message || 'Failed to execute code');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data.results);
      setConsoleOutput(data.consoleOutput || '');
      
      // Check for any errors in results
      const errorResult = data.results.find((r: any) => r.error);
      if (errorResult) {
        setLastError(errorResult.error);
      }

      const passedCount = data.results.filter((r: any) => r.passed).length;
      const totalCount = data.results.length;
      const avgRuntime = data.results.reduce((sum: number, r: any) => sum + (r.runtime_ms || 0), 0) / totalCount;

      if (submitAll) {
        if (passedCount === totalCount) {
          setSolved(true);
          triggerConfetti();
          await saveProgressHandler(Math.round(avgRuntime));
          await markAsSolved();
          toast.success(`🎉 Congratulations! All ${totalCount} test cases passed!`);
        } else {
          toast.error(`${passedCount}/${totalCount} test cases passed`);
        }
      } else {
        if (passedCount === totalCount) {
          toast.success(`All visible test cases passed!`);
        } else {
          toast.info(`${passedCount}/${totalCount} visible test cases passed`);
        }
      }
    } catch (error: unknown) {
      console.error('Execution error:', error);
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      setConsoleOutput(message);
      setLastError(message);
    } finally {
      setRunning(false);
      setSubmitting(false);
    }
  };

  // Convert test cases to format expected by TestCasePanel
  const testCases = challenge?.testCases.map((tc, index) => ({
    id: `tc-${index}`,
    input: tc.input,
    expected_output: tc.expectedOutput,
    is_visible: tc.is_visible,
    display_order: index,
  })) || [];

  // No lives left - show blocked screen
  if (noLives && !todaySolved) {
    const timeRemaining = getTimeUntilNextRestore();
    return (
      <div className="flex h-screen flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="flex justify-center mb-6">
              {[0, 1, 2].map((i) => (
                <Heart
                  key={i}
                  className="h-12 w-12 fill-muted text-muted-foreground/30 mx-1"
                />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-destructive mb-4">No Lives Remaining</h2>
            <p className="text-muted-foreground mb-6">
              You've lost all your lives by leaving the page. Lives restore 10 minutes after being lost.
            </p>
            {timeRemaining && (
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Next life restores in:</p>
                <p className="text-2xl font-bold text-primary">{formatTimeRemaining(timeRemaining)}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/learning-tracks')} variant="outline">
                Learning Tracks
              </Button>
              <Button onClick={() => navigate('/problems')} variant="default">
                DSA Problems
              </Button>
              <Button onClick={() => navigate('/')} variant="secondary">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <XCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <h1 className="text-2xl font-bold mb-4">Failed to Load Challenge</h1>
            <p className="text-muted-foreground mb-6">
              {error || 'Unable to load the daily challenge. Please try again.'}
            </p>
            <Button onClick={loadDailyChallenge} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />

      {/* Already Solved Banner */}
      {todaySolved && (
        <div className="bg-success/10 border-b border-success/30 px-4 py-3 text-center">
          <p className="text-success font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Daily Challenge Completed! Great job! 🎉
          </p>
        </div>
      )}

      {/* Lives Display Banner */}
      {!todaySolved && user && (
        <div className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Daily Challenge - {dateFormatted}</span>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-sm">Streak: {userStreak}</span>
            </div>
          </div>
          <LivesDisplay />
        </div>
      )}

      {/* Lives Warning Banner */}
      {!todaySolved && (
        <div className="bg-card border-b border-border px-4 py-2 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">
            ⚠️ Leaving this page will cost you a life!
          </span>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Problem Description Panel */}
          <ResizablePanel
            defaultSize={40}
            minSize={showDescription ? 25 : 0}
            maxSize={showDescription ? 60 : 0}
            className={cn(!showDescription && 'hidden')}
          >
            <div className="flex h-full flex-col">
              {/* Problem Header */}
              <div className="border-b border-border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-xl font-bold">{challenge.title}</h1>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {getDifficultyIcon(challenge.difficulty)}
                        <span className="ml-1 capitalize">{challenge.difficulty}</span>
                      </Badge>
                      <Badge variant="secondary">{challenge.category}</Badge>
                      {todaySolved && (
                        <Badge className="bg-success text-success-foreground">Completed ✓</Badge>
                      )}
                    </div>
                  </div>
                  {/* Back to Home Button */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/')}
                      className="flex items-center gap-2"
                    >
                      <Home className="h-4 w-4" />
                      <span className="hidden sm:inline">Home</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Problem Content */}
              <ScrollArea className="flex-1">
                <div className="space-y-6 p-4">
                  {/* Story Description Section */}
                  <div>
                    <h3 className="mb-2 font-semibold">Story Description</h3>
                    
                    {/* AI Story */}
                    {challenge.story && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Story Context
                        </h4>
                        <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                          {challenge.story}
                        </div>
                      </div>
                    )}

                    {/* Story Generator for Dynamic Story Creation */}
                    <StoryGenerator
                      problem={{
                        id: challenge.id,
                        title: challenge.title,
                        description: challenge.description,
                        difficulty: challenge.difficulty,
                        category: challenge.category,
                        language: selectedLanguage
                      }}
                      onStoryGenerated={(story) => {
                        // Update challenge with generated story
                        setChallenge(prev => prev ? { ...prev, story } : null);
                      }}
                      className="mt-4"
                    />
                  </div>

                  <Separator />

                  {/* Technical Description */}
                  <div>
                    <h3 className="mb-2 font-semibold">Technical Description</h3>
                    <div className="prose prose-invert max-w-none text-sm text-foreground">
                      <div dangerouslySetInnerHTML={{ __html: challenge.description.replace(/\n/g, '<br>') }} />
                    </div>
                  </div>

                  <Separator />

                  {/* Input/Output Formats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Input Format</h4>
                      <pre className="rounded-lg bg-muted p-3 text-sm whitespace-pre-wrap">
                        {challenge.inputFormat}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Output Format</h4>
                      <pre className="rounded-lg bg-muted p-3 text-sm whitespace-pre-wrap">
                        {challenge.outputFormat}
                      </pre>
                    </div>
                  </div>

                  <Separator />

                  {/* Constraints */}
                  <div>
                    <h4 className="font-semibold mb-2">Constraints</h4>
                    <pre className="rounded-lg bg-muted p-3 text-sm whitespace-pre-wrap">
                      {challenge.constraints}
                    </pre>
                  </div>

                  {/* Limits */}
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Time Limit: {challenge.timeLimitMs}ms</span>
                    <span>Memory Limit: {challenge.memoryLimitMb}MB</span>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="font-semibold mb-3">Test Cases</h4>
                    <div className="space-y-4">
                      {challenge.testCases.filter(tc => tc.is_visible).map((testCase, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-border bg-card p-4"
                        >
                          <div className="mb-2 text-sm font-medium text-muted-foreground">
                            Example {index + 1}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <div className="mb-1 text-xs font-medium text-muted-foreground">
                                Input
                              </div>
                              <pre className="rounded bg-muted p-2 font-mono text-sm">
                                {testCase.input}
                              </pre>
                            </div>
                            <div>
                              <div className="mb-1 text-xs font-medium text-muted-foreground">
                                Output
                              </div>
                              <pre className="rounded bg-muted p-2 font-mono text-sm">
                                {testCase.expectedOutput}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <ResizablePanelGroup direction="vertical">
              {/* Editor */}
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="flex h-full flex-col">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between border-b border-border px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowDescription(!showDescription)}
                        className="rounded p-1 hover:bg-secondary"
                      >
                        {showDescription ? (
                          <ChevronLeft className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <LanguageSelector
                        value={selectedLanguage}
                        onChange={setSelectedLanguage}
                        disabled={todaySolved}
                      />
                    </div>
                    {/* Glitchy AI Assistant - positioned in header */}
                    {!todaySolved && challenge && (
                      <GlitchyAssistant
                        code={code}
                        language={selectedLanguage}
                        problemDescription={challenge.description}
                        lastError={lastError}
                      />
                    )}
                  </div>

                  {/* Editor Content */}
                  <div className="flex-1 relative">
                    
                    {todaySolved && (
                      <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
                          <p className="text-lg font-semibold text-success">Daily Challenge Completed!</p>
                          <p className="text-sm text-muted-foreground mt-1">Great job! Come back tomorrow for a new challenge.</p>
                          {userProgress?.solvedAt && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Completed at {new Date(userProgress.solvedAt).toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <CodeEditor
                      value={code}
                      onChange={setCode}
                      language={selectedLanguage}
                    />
                  </div>

                  {/* Editor Footer */}
                  <div className="flex items-center justify-between border-t border-border px-4 py-3">
                    <span className="text-xs text-muted-foreground">
                      {todaySolved ? "Daily challenge completed" : "Paste disabled — type your solution"}
                    </span>
                    <div className="flex gap-2">
                      {todaySolved ? (
                        <div className="flex items-center gap-2 text-sm text-success">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            onClick={saveDraft}
                            size="sm"
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => runCode(false)}
                            disabled={running || submitting}
                          >
                            {running ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Play className="mr-2 h-4 w-4" />
                            )}
                            Run
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => runCode(true)}
                            disabled={running || submitting}
                            className="bg-primary hover:bg-primary/90"
                          >
                            {submitting ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="mr-2 h-4 w-4" />
                            )}
                            Submit
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Test Results Panel */}
              <ResizablePanel defaultSize={40} minSize={20}>
                <TestCasePanel
                  testCases={testCases}
                  results={results || undefined}
                  isRunning={running || submitting}
                  consoleOutput={consoleOutput}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
