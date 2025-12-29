import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { fetchSolvedProblems } from '@/lib/progressStorage';
import { getTimeStats, formatDuration, TimeStats } from '@/lib/timeTracking';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { SkillProfile } from '@/components/arena/SkillProfile';
import {
  Trophy,
  Target,
  Flame,
  CheckCircle2,
  ArrowRight,
  Code2,
  Loader2,
  BookOpen,
  Star,
  Zap,
  Calendar,
  Award,
  TrendingUp,
  Crown,
  Gem,
  Medal,
  Clock,
  CalendarDays,
  PlayCircle,
  Timer,
  Brain,
} from 'lucide-react';
import { problemsData } from '@/lib/problemsData';
import { getAvailableTracks, LanguageTrack } from '@/lib/languageTracksData';
import { cn } from '@/lib/utils';
import { dailyChallengeService, DailyChallenge } from '@/lib/dailyChallenges';

interface Profile {
  username: string | null;
  display_name: string | null;
  total_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  streak_days: number;
}

interface TrackProgress {
  track: LanguageTrack;
  solvedCount: number;
  solvedByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  counts: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
  progress: number;
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  
  // Daily Challenge state
  const [todayChallenge, setTodayChallenge] = useState<DailyChallenge | null>(null);
  const [todaySolved, setTodaySolved] = useState(false);
  const [userStreak, setUserStreak] = useState(0);
  const [challengeStats, setChallengeStats] = useState({
    totalCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageRuntime: 0,
    difficultyBreakdown: { easy: 0, medium: 0, hard: 0 }
  });
  const [challengeHistory, setChallengeHistory] = useState<any[]>([]);
  const [timeStats, setTimeStats] = useState<TimeStats | null>(null);
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('username, display_name, total_solved, easy_solved, medium_solved, hard_solved, streak_days')
      .eq('id', user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
    }

    // Fetch solved problems using the new progress storage
    const solved = await fetchSolvedProblems(user.id);
    setSolvedIds(solved);

    // Fetch time stats
    try {
      const stats = await getTimeStats(user.id);
      setTimeStats(stats);
    } catch (error) {
      console.error('Failed to load time stats:', error);
    }

    // Fetch Daily Challenge data
    try {
      const [challenge, hasSolvedToday, streak, stats, history] = await Promise.all([
        dailyChallengeService.getTodayChallenge(),
        dailyChallengeService.hasUserSolvedToday(),
        dailyChallengeService.getUserDailyStreak(),
        dailyChallengeService.getUserChallengeStats(),
        dailyChallengeService.getChallengeHistory(7) // Last 7 challenges
      ]);

      setTodayChallenge(challenge);
      setTodaySolved(hasSolvedToday);
      setUserStreak(streak);
      setChallengeStats(stats);
      setChallengeHistory(history);
    } catch (error) {
      console.error('Failed to load daily challenge data:', error);
      // Continue without daily challenge data if there's an error
    }

    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  // Get all available language tracks
  const availableTracks = getAvailableTracks();
  
  // Get all track problem IDs to exclude from DSA
  const allTrackProblemIds = new Set<string>();
  availableTracks.forEach(track => {
    track.problems?.forEach(p => allTrackProblemIds.add(p.id));
  });

  // Calculate DSA stats (excluding all language track problems)
  const dsaProblems = problemsData.filter(p => !allTrackProblemIds.has(p.id));
  const dsaSolvedCount = [...solvedIds].filter(id => 
    dsaProblems.some(p => p.id === id)
  ).length;
  const dsaCounts = {
    easy: dsaProblems.filter(p => p.difficulty === 'easy').length,
    medium: dsaProblems.filter(p => p.difficulty === 'medium').length,
    hard: dsaProblems.filter(p => p.difficulty === 'hard').length,
    total: dsaProblems.length,
  };
  const dsaSolvedByDifficulty = {
    easy: [...solvedIds].filter(id => dsaProblems.find(p => p.id === id && p.difficulty === 'easy')).length,
    medium: [...solvedIds].filter(id => dsaProblems.find(p => p.id === id && p.difficulty === 'medium')).length,
    hard: [...solvedIds].filter(id => dsaProblems.find(p => p.id === id && p.difficulty === 'hard')).length,
  };

  // Calculate progress for each language track
  const trackProgressData: TrackProgress[] = availableTracks.map(track => {
    const trackProblems = track.problems || [];
    const solvedCount = trackProblems.filter(p => solvedIds.has(p.id)).length;
    const counts = {
      easy: trackProblems.filter(p => p.difficulty === 'easy').length,
      medium: trackProblems.filter(p => p.difficulty === 'medium').length,
      hard: trackProblems.filter(p => p.difficulty === 'hard').length,
      total: track.totalProblems,
    };
    const solvedByDifficulty = {
      easy: trackProblems.filter(p => p.difficulty === 'easy' && solvedIds.has(p.id)).length,
      medium: trackProblems.filter(p => p.difficulty === 'medium' && solvedIds.has(p.id)).length,
      hard: trackProblems.filter(p => p.difficulty === 'hard' && solvedIds.has(p.id)).length,
    };
    const progress = counts.total > 0 ? (solvedCount / counts.total) * 100 : 0;

    return {
      track,
      solvedCount,
      solvedByDifficulty,
      counts,
      progress,
    };
  });

  const totalTracksSolved = trackProgressData.reduce((sum, t) => sum + t.solvedCount, 0);
  const totalTracksProblems = trackProgressData.reduce((sum, t) => sum + t.counts.total, 0);
  const totalSolved = dsaSolvedCount + totalTracksSolved;
  const totalProblems = dsaCounts.total + totalTracksProblems;
  const dsaProgress = dsaCounts.total > 0 ? (dsaSolvedCount / dsaCounts.total) * 100 : 0;
  const overallTracksProgress = totalTracksProblems > 0 ? (totalTracksSolved / totalTracksProblems) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold">
            Welcome back, {profile.display_name || profile.username || 'Coder'}!
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
            Track your progress and keep improving
          </p>
        </div>

        {/* Overall Stats Grid */}
        <div className="mb-6 sm:mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                Total Solved
              </CardTitle>
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="text-2xl sm:text-3xl font-bold">{totalSolved}</div>
              <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">
                of {totalProblems} problems
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                Daily Challenge Streak
              </CardTitle>
              <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="text-2xl sm:text-3xl font-bold">{userStreak || profile.streak_days}</div>
              <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">
                {userStreak > 0 ? 'consecutive days' : 'start your streak!'}
              </p>
              {userStreak > 0 && (
                <div className="mt-2 flex items-center gap-1">
                  <div className="flex -space-x-1">
                    {Array.from({ length: Math.min(userStreak, 5) }, (_, i) => (
                      <Flame key={i} className="h-3 w-3 text-warning fill-current" />
                    ))}
                  </div>
                  {userStreak > 5 && (
                    <span className="text-[10px] text-muted-foreground">+{userStreak - 5} more</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                DSA Progress
              </CardTitle>
              <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="text-2xl sm:text-3xl font-bold">{dsaProgress.toFixed(0)}%</div>
              <Progress value={dsaProgress} className="mt-2 h-1.5 sm:h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                Learning Tracks
              </CardTitle>
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="text-2xl sm:text-3xl font-bold">{overallTracksProgress.toFixed(0)}%</div>
              <Progress value={overallTracksProgress} className="mt-2 h-1.5 sm:h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Skill Profile & Leaderboard Row */}
        <div className="mb-6 sm:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Skill Profile */}
          <SkillProfile />

          {/* Leaderboard */}
          <Leaderboard />
        </div>

        {/* Daily Challenge Section */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader className="px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <CardTitle className="text-lg sm:text-xl">Daily Challenge</CardTitle>
                <Badge className={cn(
                  "ml-2",
                  todaySolved 
                    ? "bg-success text-success-foreground" 
                    : "bg-secondary text-secondary-foreground"
                )}>
                  {todaySolved ? "Completed ✓" : "Available"}
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Flame className="h-4 w-4 text-warning" />
                  <span className="font-medium">Streak: {userStreak} days</span>
                </div>
                <Link to="/daily-challenge">
                  <Button size="sm" className={todaySolved ? "variant-outline" : "hero"}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {todaySolved ? "View Challenge" : "Start Challenge"}
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          {todayChallenge && (
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Challenge Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{todayChallenge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {todayChallenge.description.substring(0, 120)}...
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={cn(
                        todayChallenge.difficulty === 'easy' && "bg-green-500/20 text-green-700 border-green-500/30",
                        todayChallenge.difficulty === 'medium' && "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
                        todayChallenge.difficulty === 'hard' && "bg-red-500/20 text-red-700 border-red-500/30"
                      )}>
                        {todayChallenge.difficulty.charAt(0).toUpperCase() + todayChallenge.difficulty.slice(1)}
                      </Badge>
                      <Badge variant="secondary">{todayChallenge.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{todayChallenge.timeLimitMs}ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-card border">
                      <div className="text-2xl font-bold text-primary">{challengeStats.totalCompleted}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-card border">
                      <div className="text-2xl font-bold text-warning">{challengeStats.averageRuntime || 0}ms</div>
                      <div className="text-xs text-muted-foreground">Avg Runtime</div>
                    </div>
                  </div>
                </div>

                {/* Recent Challenge History */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Recent Challenges
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {challengeHistory.length > 0 ? (
                      challengeHistory.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded border bg-card">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              entry.isCompleted ? "bg-success" : "bg-muted"
                            )} />
                            <span className="text-sm">{new Date(entry.challengeDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {entry.isCompleted ? (
                              <CheckCircle2 className="h-3 w-3 text-success" />
                            ) : (
                              <div className="w-3 h-3 border border-muted-foreground/30 rounded-full" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {entry.solvedAt ? new Date(entry.solvedAt).toLocaleTimeString() : 'Not solved'}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No challenge history yet. Start your first daily challenge!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Achievement Badges & Streak Milestones */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">Achievements & Badges</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              Keep coding to earn more!
            </Badge>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            {/* Streak Badges */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Flame className="h-4 w-4 text-warning" />
                Streak Milestones
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { days: 1, icon: <Zap className="h-4 w-4" />, name: "First Step", earned: (userStreak || profile.streak_days) >= 1 },
                  { days: 3, icon: <Star className="h-4 w-4" />, name: "Getting Started", earned: (userStreak || profile.streak_days) >= 3 },
                  { days: 7, icon: <Calendar className="h-4 w-4" />, name: "Week Warrior", earned: (userStreak || profile.streak_days) >= 7 },
                  { days: 14, icon: <TrendingUp className="h-4 w-4" />, name: "Consistent Coder", earned: (userStreak || profile.streak_days) >= 14 },
                  { days: 30, icon: <Crown className="h-4 w-4" />, name: "Coding Champion", earned: (userStreak || profile.streak_days) >= 30 },
                  { days: 100, icon: <Gem className="h-4 w-4" />, name: "Master of Code", earned: (userStreak || profile.streak_days) >= 100 },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={cn(
                      'relative rounded-lg border p-3 text-center transition-all',
                      badge.earned
                        ? 'border-warning/30 bg-warning/10 text-warning'
                        : 'border-border bg-muted/30 text-muted-foreground'
                    )}
                  >
                    {badge.earned && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-2 w-2 text-warning-foreground" />
                      </div>
                    )}
                    <div className="flex justify-center mb-1">
                      {badge.icon}
                    </div>
                    <div className="text-xs font-medium">{badge.days} days</div>
                    <div className="text-[10px] text-muted-foreground">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem Solving Badges */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                Problem Solving Achievements
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { count: 1, icon: <Medal className="h-4 w-4" />, name: "First Solve", earned: totalSolved >= 1 },
                  { count: 10, icon: <Trophy className="h-4 w-4" />, name: "10 Problems", earned: totalSolved >= 10 },
                  { count: 25, icon: <Star className="h-4 w-4" />, name: "Quarter Century", earned: totalSolved >= 25 },
                  { count: 50, icon: <Award className="h-4 w-4" />, name: "Half Century", earned: totalSolved >= 50 },
                  { count: 100, icon: <Crown className="h-4 w-4" />, name: "Century Club", earned: totalSolved >= 100 },
                  { count: dsaCounts.total, icon: <Gem className="h-4 w-4" />, name: "DSA Master", earned: dsaSolvedCount === dsaCounts.total },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={cn(
                      'relative rounded-lg border p-3 text-center transition-all',
                      badge.earned
                        ? 'border-primary/30 bg-primary/10 text-primary'
                        : 'border-border bg-muted/30 text-muted-foreground'
                    )}
                  >
                    {badge.earned && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-2 w-2 text-primary-foreground" />
                      </div>
                    )}
                    <div className="flex justify-center mb-1">
                      {badge.icon}
                    </div>
                    <div className="text-xs font-medium">
                      {typeof badge.count === 'number' && badge.count < 1000 ? badge.count : 'All'}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Challenge Difficulty Mastery */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Daily Challenge Mastery
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { difficulty: 'easy', solved: challengeStats.difficultyBreakdown.easy, color: 'success', bgClass: 'bg-success', borderClass: 'border-success' },
                  { difficulty: 'medium', solved: challengeStats.difficultyBreakdown.medium, color: 'warning', bgClass: 'bg-warning', borderClass: 'border-warning' },
                  { difficulty: 'hard', solved: challengeStats.difficultyBreakdown.hard, color: 'destructive', bgClass: 'bg-destructive', borderClass: 'border-destructive' },
                ].map((difficulty, index) => {
                  return (
                    <div
                      key={index}
                      className={cn(
                        'rounded-lg border p-4 transition-all',
                        difficulty.solved > 0
                          ? `${difficulty.borderClass}/30 bg-${difficulty.color}/10`
                          : 'border-border bg-muted/30'
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            'w-3 h-3 rounded-full',
                            difficulty.bgClass
                          )}></div>
                          <span className="text-sm font-medium capitalize">{difficulty.difficulty}</span>
                        </div>
                        {difficulty.solved > 0 && (
                          <Crown className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div className="text-lg font-bold mb-1">
                        {difficulty.solved} challenges
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {difficulty.solved === 0 ? "Not started yet" : 
                         difficulty.solved < 5 ? "Getting started" :
                         difficulty.solved < 15 ? "Making progress" :
                         "Daily Challenge Pro!"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Badges */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-success" />
                Difficulty Mastery
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { difficulty: 'easy', solved: dsaSolvedByDifficulty.easy, total: dsaCounts.easy, color: 'success', bgClass: 'bg-success', borderClass: 'border-success', progressClass: 'bg-success/20' },
                  { difficulty: 'medium', solved: dsaSolvedByDifficulty.medium, total: dsaCounts.medium, color: 'warning', bgClass: 'bg-warning', borderClass: 'border-warning', progressClass: 'bg-warning/20' },
                  { difficulty: 'hard', solved: dsaSolvedByDifficulty.hard, total: dsaCounts.hard, color: 'destructive', bgClass: 'bg-destructive', borderClass: 'border-destructive', progressClass: 'bg-destructive/20' },
                ].map((difficulty, index) => {
                  const percentage = difficulty.total > 0 ? (difficulty.solved / difficulty.total) * 100 : 0;
                  const isMastered = difficulty.solved === difficulty.total && difficulty.total > 0;
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        'rounded-lg border p-4 transition-all',
                        isMastered
                          ? `${difficulty.borderClass}/30 bg-${difficulty.color}/10`
                          : 'border-border bg-muted/30'
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            'w-3 h-3 rounded-full',
                            difficulty.bgClass
                          )}></div>
                          <span className="text-sm font-medium capitalize">{difficulty.difficulty}</span>
                        </div>
                        {isMastered && (
                          <Crown className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div className="text-lg font-bold mb-1">
                        {difficulty.solved}/{difficulty.total}
                      </div>
                      <Progress 
                        value={percentage} 
                        className={cn(
                          'h-2',
                          difficulty.progressClass
                        )} 
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {percentage.toFixed(0)}% complete
                        {isMastered && " • Mastered!"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DSA Problems Progress */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">DSA Problems</CardTitle>
            </div>
            <Link to="/problems">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                View all
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold">{dsaSolvedCount}</span>
              <span className="text-sm sm:text-base text-muted-foreground">/ {dsaCounts.total} solved</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-success">Easy</span>
                  <span className="text-muted-foreground">
                    {dsaSolvedByDifficulty.easy} / {dsaCounts.easy}
                  </span>
                </div>
                <Progress
                  value={dsaCounts.easy > 0 ? (dsaSolvedByDifficulty.easy / dsaCounts.easy) * 100 : 0}
                  className="h-1.5 sm:h-2 bg-success/20"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-warning">Medium</span>
                  <span className="text-muted-foreground">
                    {dsaSolvedByDifficulty.medium} / {dsaCounts.medium}
                  </span>
                </div>
                <Progress
                  value={dsaCounts.medium > 0 ? (dsaSolvedByDifficulty.medium / dsaCounts.medium) * 100 : 0}
                  className="h-1.5 sm:h-2 bg-warning/20"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-destructive">Hard</span>
                  <span className="text-muted-foreground">
                    {dsaSolvedByDifficulty.hard} / {dsaCounts.hard}
                  </span>
                </div>
                <Progress
                  value={dsaCounts.hard > 0 ? (dsaSolvedByDifficulty.hard / dsaCounts.hard) * 100 : 0}
                  className="h-1.5 sm:h-2 bg-destructive/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Tracks Progress Grid */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Learning Tracks Progress</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-2">
            {trackProgressData.map(({ track, solvedCount, solvedByDifficulty, counts, progress }) => (
              <Card key={track.id}>
                <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{track.icon}</span>
                    <CardTitle className="text-base sm:text-lg">{track.name} Track</CardTitle>
                  </div>
                  <Link to={`/${track.slug}`}>
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                      View all
                      <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl font-bold">{solvedCount}</span>
                    <span className="text-sm sm:text-base text-muted-foreground">/ {counts.total} solved</span>
                  </div>

                  {solvedCount === counts.total && counts.total > 0 && (
                    <div className="rounded-lg bg-success/10 border border-success/30 p-2 sm:p-3 text-center mb-3 sm:mb-4">
                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-success mx-auto mb-1" />
                      <p className="text-success font-medium text-xs sm:text-sm">Track Completed! 🎉</p>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 sm:h-3" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-success/10 p-2">
                      <p className="text-xs text-muted-foreground">Beginner</p>
                      <p className="text-sm font-bold text-success">{solvedByDifficulty.easy}/{counts.easy}</p>
                    </div>
                    <div className="rounded-lg bg-warning/10 p-2">
                      <p className="text-xs text-muted-foreground">Intermediate</p>
                      <p className="text-sm font-bold text-warning">{solvedByDifficulty.medium}/{counts.medium}</p>
                    </div>
                    <div className="rounded-lg bg-destructive/10 p-2">
                      <p className="text-xs text-muted-foreground">Advanced</p>
                      <p className="text-sm font-bold text-destructive">{solvedByDifficulty.hard}/{counts.hard}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-6 sm:mt-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="flex flex-col items-center justify-between gap-4 py-6 sm:py-8 sm:flex-row px-4 sm:px-6">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold">Ready to practice?</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Keep your streak going with a new problem today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {!todaySolved && (
                <Link to="/daily-challenge" className="w-full sm:w-auto">
                  <Button variant="default" size="default" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    <CalendarDays className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Daily Challenge
                  </Button>
                </Link>
              )}
              <Link to="/problems" className="w-full sm:w-auto">
                <Button variant="outline" size="default" className="w-full sm:w-auto">
                  <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  DSA Problems
                </Button>
              </Link>
              <Link to="/learning-tracks" className="w-full sm:w-auto">
                <Button variant="hero" size="default" className="w-full sm:w-auto">
                  <Target className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Learning Tracks
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
