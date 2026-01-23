// Daily Challenge Page with Problem-Solving Interface
import { useState, useEffect, useCallback, useRef } from 'react';
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
import { useLivesManager } from '@/hooks/useLivesManager';
import { useProblemExecution } from '@/hooks/useProblemExecution';
import { LivesDisplay } from '@/components/lives/LivesDisplay';
import { GlitchyAssistant } from '@/components/editor/GlitchyAssistant';
import { LanguageSelector } from '@/components/editor/LanguageSelector';
import { StoryGenerator } from '@/components/problems/StoryGenerator';
import { NeuralEditorPane } from '@/components/arena/NeuralEditorPane';
import { generateStarterCode } from '@/lib/templateGenerator';
import { ProblemData } from '@/lib/problemsData';

export interface ExecutionResult {
  passed: boolean;
  runtime_ms?: number;
  error?: string;
  consoleOutput?: string;
}

export default function DailyChallengePage() {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [userProgress, setUserProgress] = useState<DailyChallengeProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todaySolved, setTodaySolved] = useState(false);
  const [userStreak, setUserStreak] = useState(0);

  const [solved, setSolved] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');

  const { user } = useAuth();
  const { noLives, penalize, formattedTimeRemaining } = useLivesManager(user?.id);
  const { running, submitting, results, consoleOutput, lastError, execute, setResults, setLastError } = useProblemExecution();

  const [code, setCode] = useState('');
  const [showDescription, setShowDescription] = useState(true);
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
  useEffect(() => {
    const initializeCode = async () => {
      if (!challenge || !selectedLanguage) return;

      const userId = user?.id || 'anonymous';
      const draftKey = `daily-challenge-draft-${userId}-${selectedLanguage}`;

      // 1. Try local storage first
      const savedLocalDraft = localStorage.getItem(draftKey);
      if (savedLocalDraft) {
        setCode(savedLocalDraft);
        return;
      }

      // 2. Try cloud draft if user is logged in
      if (user?.id) {
        const { loadDraft } = await import('@/lib/progressStorage');
        const cloudDraft = await loadDraft(user.id, challenge.id);
        if (cloudDraft) {
          setCode(cloudDraft);
          localStorage.setItem(draftKey, cloudDraft);
          return;
        }
      }

      // 3. Fallback to starter code
      const problemMapped = {
        ...challenge,
        starterCode: '',
        visibleTestCases: challenge.testCases.filter(tc => tc.is_visible),
        hiddenTestCases: challenge.testCases.filter(tc => !tc.is_visible),
      } as unknown as ProblemData;
      setCode(generateStarterCode(problemMapped, selectedLanguage));
    };

    initializeCode();
  }, [challenge, selectedLanguage, user?.id]);

  useEffect(() => {
    loadDailyChallenge();
  }, []);

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
    if (!challenge || !user) {
      console.error('Cannot save progress: challenge or user is missing');
      return;
    }

    try {
      // 1. Save progress using local storage (legacy compatibility)
      await dailyChallengeService.updateChallengeProgress(today, {
        isCompleted: true,
        solvedAt: new Date().toISOString(),
        runtimeMs,
        language: selectedLanguage
      });

      // 2. Persist to Supabase to prevent XP farming (Authoritative check)
      const { saveProgress } = await import('@/lib/progressStorage');
      await saveProgress(user.id, challenge.id, challenge.difficulty, runtimeMs);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const lastPenalizedRef = useRef<number>(0);

  // Focus violation penalties (visibility change and blur)
  useEffect(() => {
    if (noLives || !user) return;

    const handleFocusLoss = () => {
      const now = Date.now();
      if (now - lastPenalizedRef.current < 2000) return;

      if (document.hidden || !document.hasFocus()) {
        penalize();
        lastPenalizedRef.current = now;
      }
    };

    document.addEventListener('visibilitychange', handleFocusLoss);
    window.addEventListener('blur', handleFocusLoss);

    return () => {
      document.removeEventListener('visibilitychange', handleFocusLoss);
      window.removeEventListener('blur', handleFocusLoss);
    };
  }, [noLives, user, penalize]);

  const saveDraft = useCallback(async () => {
    if (!user) {
      toast.error('Please sign in to save your draft');
      return;
    }
    if (!challenge) return;

    const draftKey = `daily-challenge-draft-${user.id}-${selectedLanguage}`;
    localStorage.setItem(draftKey, code);

    const { saveDraft: saveToCloud } = await import('@/lib/progressStorage');
    const result = await saveToCloud(user.id, challenge.id, code);

    if (result.success) {
      toast.success('Logic Uploaded to Mainframe');
    } else {
      toast.warning('Saved locally, but synchronization failed');
    }
  }, [user, code, selectedLanguage, challenge]);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);

    // Debounced Auto-save
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      if (challenge && user?.id) {
        import('@/lib/progressStorage').then(({ saveDraft: saveToCloud }) => {
          saveToCloud(user.id, challenge.id, newCode);
        });
      }
    }, 2000);
  };

  const runCode = async (submitAll = false) => {
    if (!challenge) return;
    if (!user) { toast.error('Please sign in to run code'); return; }

    const testCasesToRun = submitAll
      ? challenge.testCases
      : challenge.testCases.filter(tc => tc.is_visible);

    const formattedTestCases = testCasesToRun.map(tc => ({
      input: tc.input,
      expectedOutput: tc.expectedOutput,
    }));

    await execute({
      code,
      language: selectedLanguage,
      testCases: formattedTestCases,
      problemId: challenge.id,
      userId: user.id,
      onSuccess: async (executionResults, avgRuntime) => {
        const passedCount = executionResults.filter(r => r.passed).length;
        const totalCount = executionResults.length;

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
      }
    }, submitAll);
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
            <h2 className="text-2xl font-bold text-destructive mb-4 uppercase tracking-[0.2em]">Neural Sync Failed</h2>
            <p className="text-muted-foreground mb-6 font-mono text-sm leading-relaxed">
              Synchronization lost due to repeated focus violations. Restore protocol in progress...
            </p>
            {formattedTimeRemaining && (
              <div className="bg-muted/50 border border-border rounded-lg p-6 mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-bold">Time Until Restore</p>
                <p className="text-4xl font-mono font-bold text-primary">{formattedTimeRemaining}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/learning-tracks')} variant="outline" className="uppercase tracking-widest font-bold text-xs">
                Tracks
              </Button>
              <Button onClick={() => navigate('/problems')} variant="default" className="uppercase tracking-widest font-bold text-xs">
                Problems
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
      {user && (
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
                  {/* Problem Description Section */}
                  <div>
                    <h3 className="mb-2 font-semibold">Problem Description</h3>
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
                    {challenge && (
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
                      onChange={handleCodeChange}
                      language={selectedLanguage}
                      hideHeader
                      hideBorder
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