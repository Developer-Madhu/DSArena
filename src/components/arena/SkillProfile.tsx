import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Target, 
  TrendingUp, 
  TrendingDown,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Lock,
  Unlock,
  Zap,
  Brain,
  BarChart3,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import { 
  fetchSkillRatings, 
  fetchTopicUnlocks,
  calculateInterviewReadiness,
  SkillRating,
  TopicUnlock,
  SKILL_TOPICS,
  getTierInfo,
  SkillTier,
} from '@/lib/skillRatingSystem';
import { SkillRatingBadge } from './SkillRatingBadge';

interface SkillProfileProps {
  className?: string;
}

export function SkillProfile({ className }: SkillProfileProps) {
  const { user } = useAuth();
  const [skillRatings, setSkillRatings] = useState<SkillRating[]>([]);
  const [unlocks, setUnlocks] = useState<TopicUnlock[]>([]);
  const [readiness, setReadiness] = useState({
    readiness: 0,
    strongestTopic: null as string | null,
    weakestTopic: null as string | null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadSkillData();
    }
  }, [user?.id]);

  const loadSkillData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    const [ratings, topicUnlocks, readinessData] = await Promise.all([
      fetchSkillRatings(user.id),
      fetchTopicUnlocks(user.id),
      calculateInterviewReadiness(user.id),
    ]);
    
    setSkillRatings(ratings);
    setUnlocks(topicUnlocks);
    setReadiness(readinessData);
    setLoading(false);
  };

  // Get rating for a topic (default to 1000 if not found)
  const getRatingForTopic = (topic: string): SkillRating | null => {
    return skillRatings.find(r => r.topic === topic) || null;
  };

  // Sort topics by rating
  const sortedByStrength = [...SKILL_TOPICS].sort((a, b) => {
    const ratingA = getRatingForTopic(a)?.rating || 1000;
    const ratingB = getRatingForTopic(b)?.rating || 1000;
    return ratingB - ratingA;
  });

  // Calculate overall stats
  const totalProblems = skillRatings.reduce((sum, r) => sum + r.problems_solved, 0);
  const totalAttempts = skillRatings.reduce((sum, r) => sum + r.problems_attempted, 0);
  const overallAccuracy = totalAttempts > 0 
    ? Math.round((totalProblems / totalAttempts) * 100) 
    : 0;
  const avgRating = skillRatings.length > 0
    ? Math.round(skillRatings.reduce((sum, r) => sum + r.rating, 0) / skillRatings.length)
    : 1000;

  if (loading) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Skill Profile
          </CardTitle>
          <Badge variant="outline" className="text-lg font-bold">
            {readiness.readiness}% Ready
          </Badge>
        </div>
        <CardDescription>
          Your interview readiness and skill breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="unlocks">Progress</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Interview Readiness */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Interview Readiness</span>
                <span className="text-2xl font-bold">{readiness.readiness}%</span>
              </div>
              <Progress value={readiness.readiness} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Beginner</span>
                <span>Ready for Interviews</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold text-primary">{avgRating}</div>
                <div className="text-xs text-muted-foreground">Avg Rating</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold text-accent">{overallAccuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">{totalProblems}</div>
                <div className="text-xs text-muted-foreground">Problems Solved</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">{skillRatings.length}</div>
                <div className="text-xs text-muted-foreground">Topics Explored</div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-2 gap-4">
              {readiness.strongestTopic && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium">Strongest</span>
                  </div>
                  <div className="font-semibold">{readiness.strongestTopic}</div>
                </div>
              )}
              {readiness.weakestTopic && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 text-red-700 mb-1">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-xs font-medium">Needs Work</span>
                  </div>
                  <div className="font-semibold">{readiness.weakestTopic}</div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Topics Tab */}
          <TabsContent value="topics" className="mt-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {sortedByStrength.map((topic, index) => {
                  const rating = getRatingForTopic(topic);
                  const tier = rating?.tier as SkillTier || 'silver';
                  const tierInfo = getTierInfo(tier);
                  
                  return (
                    <div 
                      key={topic}
                      className={cn(
                        "p-3 rounded-lg border transition-colors",
                        rating ? "bg-card" : "bg-muted/30"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {index < 3 && rating && (
                            <Trophy className={cn(
                              "h-4 w-4",
                              index === 0 && "text-yellow-500",
                              index === 1 && "text-slate-400",
                              index === 2 && "text-amber-600"
                            )} />
                          )}
                          <span className="font-medium">{topic}</span>
                        </div>
                        {rating ? (
                          <SkillRatingBadge 
                            rating={rating.rating} 
                            tier={tier}
                            size="sm"
                          />
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Not Started
                          </Badge>
                        )}
                      </div>
                      
                      {rating && (
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {rating.problems_solved} solved
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {rating.accuracy}% accuracy
                          </div>
                          {rating.avg_time_seconds > 0 && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {Math.round(rating.avg_time_seconds / 60)}m avg
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Unlocks Tab */}
          <TabsContent value="unlocks" className="mt-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {SKILL_TOPICS.slice(0, 6).map(topic => {
                  const mediumUnlock = unlocks.find(
                    u => u.topic === topic && u.difficulty === 'medium'
                  );
                  const hardUnlock = unlocks.find(
                    u => u.topic === topic && u.difficulty === 'hard'
                  );
                  
                  return (
                    <div key={topic} className="p-3 rounded-lg border bg-card">
                      <div className="font-medium mb-2">{topic}</div>
                      <div className="space-y-2">
                        {/* Easy - Always unlocked */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Unlock className="h-4 w-4 text-green-600" />
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">
                              Easy
                            </Badge>
                          </div>
                          <span className="text-green-600 text-xs">Unlocked</span>
                        </div>
                        
                        {/* Medium */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {mediumUnlock?.unlocked ? (
                              <Unlock className="h-4 w-4 text-green-600" />
                            ) : (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30 text-xs">
                              Medium
                            </Badge>
                          </div>
                          {mediumUnlock?.unlocked ? (
                            <span className="text-green-600 text-xs">Unlocked</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              {mediumUnlock?.problems_completed || 0}/5 @ 60%
                            </span>
                          )}
                        </div>
                        
                        {/* Hard */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {hardUnlock?.unlocked ? (
                              <Unlock className="h-4 w-4 text-green-600" />
                            ) : (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <Badge className="bg-red-500/20 text-red-700 border-red-500/30 text-xs">
                              Hard
                            </Badge>
                          </div>
                          {hardUnlock?.unlocked ? (
                            <span className="text-green-600 text-xs">Unlocked</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              {hardUnlock?.problems_completed || 0}/3 @ 70%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
