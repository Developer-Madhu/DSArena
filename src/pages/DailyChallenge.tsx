// Daily Challenge Page
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth';
import { dailyChallengeService, DailyChallenge, DailyChallengeProgress } from '@/lib/dailyChallenges';
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
} from 'lucide-react';

export default function DailyChallengePage() {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [userProgress, setUserProgress] = useState<DailyChallengeProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todaySolved, setTodaySolved] = useState(false);
  const [userStreak, setUserStreak] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
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

  useEffect(() => {
    loadDailyChallenge();
  }, []);

  const loadDailyChallenge = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (user) {
        // Load today's challenge and user progress
        const [todayChallenge, progress, solved, streak] = await Promise.all([
          dailyChallengeService.getTodayChallenge(),
          dailyChallengeService.getUserChallengeProgress(user.id, today),
          dailyChallengeService.hasUserSolvedToday(user.id),
          dailyChallengeService.getUserDailyStreak(user.id)
        ]);

        setChallenge(todayChallenge);
        setUserProgress(progress);
        setTodaySolved(solved);
        setUserStreak(streak);
      } else {
        // Load challenge without user progress
        const todayChallenge = await dailyChallengeService.getTodayChallenge();
        setChallenge(todayChallenge);
      }
    } catch (err) {
      console.error('Failed to load daily challenge:', err);
      setError('Failed to load daily challenge. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateNewChallenge = async () => {
    if (!user) {
      toast.error('Please login to access daily challenges');
      return;
    }

    try {
      setIsGenerating(true);
      const newChallenge = await dailyChallengeService.generateDailyChallenge(today);
      setChallenge(newChallenge);
      toast.success('New daily challenge generated!');
    } catch (err) {
      console.error('Failed to generate challenge:', err);
      toast.error('Failed to generate new challenge. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const markAsSolved = async () => {
    if (!user || !challenge) return;

    try {
      const progress: Partial<DailyChallengeProgress> = {
        isCompleted: true,
        solvedAt: new Date().toISOString(),
        attempts: (userProgress?.attempts || 0) + 1,
        isCompleted: true
      };

      await dailyChallengeService.updateChallengeProgress(user.id, today, progress);
      
      // Update local state
      const newProgress: DailyChallengeProgress = {
        userId: user.id,
        challengeDate: today,
        ...progress
      } as DailyChallengeProgress;

      setUserProgress(newProgress);
      setTodaySolved(true);
      toast.success('Congratulations! Daily challenge completed!');

      // Reload streak
      const newStreak = await dailyChallengeService.getUserDailyStreak(user.id);
      setUserStreak(newStreak);
    } catch (err) {
      console.error('Failed to update progress:', err);
      toast.error('Failed to save progress. Please try again.');
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading daily challenge...</p>
            </div>
          </div>
        </div>
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Calendar className="h-8 w-8 text-primary" />
                Daily Challenge
              </h1>
              <p className="text-muted-foreground">{dateFormatted}</p>
            </div>
            
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
              
              {user && (
                <Button
                  onClick={generateNewChallenge}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  Generate New
                </Button>
              )}
            </div>
          </div>

          {/* User Progress */}
          {user && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Daily Streak</p>
                      <p className="text-2xl font-bold flex items-center gap-2">
                        <Flame className="h-5 w-5 text-warning" />
                        {userStreak}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Today's Status</p>
                      <p className="text-lg font-semibold flex items-center gap-2">
                        {todaySolved ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-success" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            Pending
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Attempts</p>
                      <p className="text-2xl font-bold">
                        {userProgress?.attempts || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenge Details */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{challenge.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {getDifficultyIcon(challenge.difficulty)}
                        <span className="ml-1 capitalize">{challenge.difficulty}</span>
                      </Badge>
                      <Badge variant="secondary">{challenge.category}</Badge>
                      {todaySolved && (
                        <Badge className="bg-success text-success-foreground">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Solved
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <div className="space-y-6">
                    {/* Problem Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Problem Description</h3>
                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        <div dangerouslySetInnerHTML={{ __html: challenge.description.replace(/\n/g, '<br>') }} />
                      </div>
                    </div>

                    <Separator />

                    {/* Input/Output Formats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Input Format</h4>
                        <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
                          {challenge.inputFormat}
                        </pre>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Output Format</h4>
                        <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
                          {challenge.outputFormat}
                        </pre>
                      </div>
                    </div>

                    <Separator />

                    {/* Constraints */}
                    <div>
                      <h4 className="font-semibold mb-2">Constraints</h4>
                      <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
                        {challenge.constraints}
                      </pre>
                    </div>

                    {/* Test Cases */}
                    <div>
                      <h4 className="font-semibold mb-3">Test Cases</h4>
                      <div className="space-y-4">
                        {challenge.testCases.map((testCase, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h5 className="font-medium mb-2">Test Case {index + 1}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground mb-1">Input</div>
                                <pre className="bg-muted p-2 rounded text-sm font-mono">
                                  {testCase.input}
                                </pre>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground mb-1">Expected Output</div>
                                <pre className="bg-muted p-2 rounded text-sm font-mono">
                                  {testCase.expectedOutput}
                                </pre>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Story */}
                    {challenge.story && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Story Context
                          </h4>
                          <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                            {challenge.story}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Starter Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Starter Code</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  <pre className="bg-muted p-4 rounded text-sm font-mono overflow-x-auto">
                    {challenge.starterCode}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Challenge Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!user ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">
                      Login to track your progress and earn streaks
                    </p>
                    <Button onClick={() => navigate('/auth')} className="w-full">
                      Login to Continue
                    </Button>
                  </div>
                ) : (
                  <>
                    {!todaySolved ? (
                      <div className="space-y-3">
                        <Button
                          className="w-full"
                          onClick={() => navigate(`/problem/daily-${today}`)}
                        >
                          Start Solving
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        
                        {userProgress && userProgress.attempts > 0 && (
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={markAsSolved}
                          >
                            Mark as Solved
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-success" />
                        <h3 className="font-semibold mb-2">Challenge Completed!</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Great job! Come back tomorrow for a new challenge.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          Completed at: {userProgress?.solvedAt ? new Date(userProgress.solvedAt).toLocaleTimeString() : 'Unknown'}
                        </div>
                      </div>
                    )}
                  </>
                )}

                <Separator />

                {/* Challenge Stats */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Challenge Stats</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="capitalize">{challenge.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{challenge.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="capitalize">{challenge.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Limit:</span>
                      <span>{challenge.timeLimitMs}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memory Limit:</span>
                      <span>{challenge.memoryLimitMb}MB</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Quick Links */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Quick Links</h4>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => navigate('/problems')}
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      DSA Problems
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => navigate('/learning-tracks')}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Learning Tracks
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard')}
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
