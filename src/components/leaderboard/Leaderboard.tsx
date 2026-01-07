import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, Medal, Crown, Flame, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AchievementBadge, ACHIEVEMENT_TAGS } from './AchievementBadge';
import { formatDuration } from '@/lib/timeTracking';

interface LeaderboardEntry {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  problemsSolved: number;
  totalTime: number;
  rank: number;
  achievements: string[];
  streak: number;
}

interface LeaderboardProps {
  className?: string;
}

export function Leaderboard({ className }: LeaderboardProps) {
  const { user } = useAuth();
  const [dailyLeaders, setDailyLeaders] = useState<LeaderboardEntry[]>([]);
  const [weeklyLeaders, setWeeklyLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  useEffect(() => {
    fetchLeaderboards();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('leaderboard-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_solved' },
        () => fetchLeaderboards()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeaderboards = async () => {
    setLoading(true);
    
    try {
      const [daily, weekly] = await Promise.all([
        fetchLeaderboard('daily'),
        fetchLeaderboard('weekly'),
      ]);
      
      setDailyLeaders(daily);
      setWeeklyLeaders(weekly);
    } catch (error) {
      console.error('Failed to fetch leaderboards:', error);
    }
    
    setLoading(false);
  };

  const fetchLeaderboard = async (period: 'daily' | 'weekly'): Promise<LeaderboardEntry[]> => {
    const now = new Date();
    let startDate: Date;
    
    if (period === 'daily') {
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
    } else {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
    }

    // Fetch user_solved data grouped by user
    const { data: solvedData, error: solvedError } = await supabase
      .from('user_solved')
      .select('user_id, first_solved_at, best_runtime_ms')
      .gte('first_solved_at', startDate.toISOString());

    if (solvedError) {
      console.error('Error fetching solved data:', solvedError);
      return [];
    }

    // Group by user
    const userStats: Record<string, { count: number; totalTime: number }> = {};
    for (const row of solvedData || []) {
      if (!userStats[row.user_id]) {
        userStats[row.user_id] = { count: 0, totalTime: 0 };
      }
      userStats[row.user_id].count++;
      userStats[row.user_id].totalTime += row.best_runtime_ms || 0;
    }

    // Get user IDs with activity
    const userIds = Object.keys(userStats);
    if (userIds.length === 0) return [];

    // Fetch profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, display_name, username, avatar_url, streak_days')
      .in('id', userIds);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return [];
    }

    // Fetch achievements
    const { data: achievements } = await supabase
      .from('leaderboard_achievements')
      .select('user_id, tag_type')
      .in('user_id', userIds) as { data: any[] | null; error: any };

    const achievementsByUser: Record<string, string[]> = {};
    for (const ach of achievements || []) {
      if (!achievementsByUser[ach.user_id]) {
        achievementsByUser[ach.user_id] = [];
      }
      achievementsByUser[ach.user_id].push(ach.tag_type);
    }

    // Build leaderboard entries
    const entries: LeaderboardEntry[] = (profiles || []).map((profile) => ({
      userId: profile.id,
      displayName: profile.display_name || profile.username || 'Anonymous',
      avatarUrl: profile.avatar_url,
      problemsSolved: userStats[profile.id]?.count || 0,
      totalTime: userStats[profile.id]?.totalTime || 0,
      rank: 0,
      achievements: achievementsByUser[profile.id] || [],
      streak: profile.streak_days || 0,
    }));

    // Sort by problems solved (desc), then by time (asc)
    entries.sort((a, b) => {
      if (b.problemsSolved !== a.problemsSolved) {
        return b.problemsSolved - a.problemsSolved;
      }
      return a.totalTime - b.totalTime;
    });

    // Assign ranks
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return entries.slice(0, 10);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="w-5 text-center font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const renderLeaderboardEntry = (entry: LeaderboardEntry, isCurrentUser: boolean) => (
    <div
      key={entry.userId}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg transition-colors',
        isCurrentUser ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30 hover:bg-muted/50',
        entry.rank <= 3 && 'border-l-4',
        entry.rank === 1 && 'border-l-yellow-500',
        entry.rank === 2 && 'border-l-gray-400',
        entry.rank === 3 && 'border-l-amber-600'
      )}
    >
      <div className="flex-shrink-0 w-8">
        {getRankIcon(entry.rank)}
      </div>
      
      <Avatar className="h-8 w-8">
        <AvatarImage src={entry.avatarUrl || undefined} />
        <AvatarFallback>{entry.displayName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn('font-medium truncate', isCurrentUser && 'text-primary')}>
            {entry.displayName}
            {isCurrentUser && <span className="text-xs ml-1">(You)</span>}
          </span>
          {entry.achievements.slice(0, 2).map((ach) => (
            <AchievementBadge key={ach} tagType={ach as keyof typeof ACHIEVEMENT_TAGS} size="sm" />
          ))}
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
          <span className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            {entry.problemsSolved} solved
          </span>
          {entry.streak > 0 && (
            <span className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-warning" />
              {entry.streak} streak
            </span>
          )}
        </div>
      </div>
      
      <div className="text-right">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Zap className="h-3 w-3 text-primary" />
          {entry.problemsSolved}
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {formatDuration(Math.floor(entry.totalTime / 1000))}
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = (leaders: LeaderboardEntry[]) => {
    if (loading) {
      return (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      );
    }

    if (leaders.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="h-10 w-10 mx-auto mb-2 opacity-50" />
          <p>No activity yet today!</p>
          <p className="text-sm">Be the first to solve a problem!</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {leaders.map((entry) => 
          renderLeaderboardEntry(entry, entry.userId === user?.id)
        )}
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-primary" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'daily' | 'weekly')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="daily" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-1">
              <Flame className="h-3 w-3" />
              Weekly
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            {renderLeaderboard(dailyLeaders)}
          </TabsContent>
          
          <TabsContent value="weekly">
            {renderLeaderboard(weeklyLeaders)}
          </TabsContent>
        </Tabs>
        
        {/* Achievement Tags Legend */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-2">Earn unique badges:</p>
          <div className="flex flex-wrap gap-1">
            {Object.entries(ACHIEVEMENT_TAGS).slice(0, 5).map(([key, tag]) => (
              <Badge key={key} variant="outline" className="text-xs">
                {tag.icon} {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
