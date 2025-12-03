import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import {
  Trophy,
  Target,
  Flame,
  Clock,
  CheckCircle2,
  ArrowRight,
  Code2,
  Loader2,
} from 'lucide-react';
import { problemsData } from '@/lib/problemsData';

interface Profile {
  username: string | null;
  display_name: string | null;
  total_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  streak_days: number;
}

interface RecentSubmission {
  id: string;
  status: string;
  is_accepted: boolean;
  created_at: string;
  problems: { title: string; slug: string } | null;
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [problemCounts, setProblemCounts] = useState({ easy: 0, medium: 0, hard: 0 });
  const [loading, setLoading] = useState(true);

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

    // Fetch recent submissions
    const { data: submissionsData } = await supabase
      .from('submissions')
      .select(`
        id,
        status,
        is_accepted,
        created_at,
        problems (title, slug)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (submissionsData) {
      setRecentSubmissions(submissionsData as RecentSubmission[]);
    }

    // Calculate problem counts from local data
    const counts = { easy: 0, medium: 0, hard: 0 };
    problemsData.forEach((p) => {
      if (p.difficulty in counts) {
        counts[p.difficulty as keyof typeof counts]++;
      }
    });
    setProblemCounts(counts);

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

  const totalProblems = problemCounts.easy + problemCounts.medium + problemCounts.hard;
  const progressPercent = totalProblems > 0 ? (profile.total_solved / totalProblems) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {profile.display_name || profile.username || 'Coder'}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your progress and keep improving
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Solved
              </CardTitle>
              <Trophy className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{profile.total_solved}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                of {totalProblems} problems
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Streak
              </CardTitle>
              <Flame className="h-5 w-5 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{profile.streak_days}</div>
              <p className="mt-1 text-xs text-muted-foreground">days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Submissions
              </CardTitle>
              <Code2 className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{recentSubmissions.length}</div>
              <p className="mt-1 text-xs text-muted-foreground">recent attempts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Progress
              </CardTitle>
              <Target className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{progressPercent.toFixed(0)}%</div>
              <Progress value={progressPercent} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Problems by Difficulty */}
          <Card>
            <CardHeader>
              <CardTitle>Problems by Difficulty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-success">Easy</span>
                  <span className="text-muted-foreground">
                    {profile.easy_solved} / {problemCounts.easy}
                  </span>
                </div>
                <Progress
                  value={problemCounts.easy > 0 ? (profile.easy_solved / problemCounts.easy) * 100 : 0}
                  className="h-2 bg-success/20"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-warning">Medium</span>
                  <span className="text-muted-foreground">
                    {profile.medium_solved} / {problemCounts.medium}
                  </span>
                </div>
                <Progress
                  value={problemCounts.medium > 0 ? (profile.medium_solved / problemCounts.medium) * 100 : 0}
                  className="h-2 bg-warning/20"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-destructive">Hard</span>
                  <span className="text-muted-foreground">
                    {profile.hard_solved} / {problemCounts.hard}
                  </span>
                </div>
                <Progress
                  value={problemCounts.hard > 0 ? (profile.hard_solved / problemCounts.hard) * 100 : 0}
                  className="h-2 bg-destructive/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Submissions</CardTitle>
              <Link to="/problems">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentSubmissions.length === 0 ? (
                <div className="py-8 text-center">
                  <Code2 className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">No submissions yet</p>
                  <Link to="/problems">
                    <Button variant="link" className="mt-2">
                      Start practicing
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentSubmissions.map((submission) => (
                    <Link
                      key={submission.id}
                      to={`/problem/${submission.problems?.slug}`}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        {submission.is_accepted ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <Clock className="h-5 w-5 text-warning" />
                        )}
                        <span className="font-medium">
                          {submission.problems?.title || 'Unknown Problem'}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
            <div>
              <h3 className="text-xl font-bold">Ready to practice?</h3>
              <p className="text-muted-foreground">
                Keep your streak going with a new problem today.
              </p>
            </div>
            <Link to="/problems">
              <Button variant="hero" size="lg">
                Start Practicing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
