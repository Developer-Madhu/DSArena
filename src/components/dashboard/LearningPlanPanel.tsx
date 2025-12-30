import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { dynamicLearningService } from '@/lib/dynamicLearningService';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Loader2,
  GraduationCap,
  RefreshCw,
  Target,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface LearningPlanItem {
  id: string;
  problem_id: string;
  problem_title: string;
  track_id: string;
  level: string;
  topic: string | null;
  display_order: number;
  is_completed: boolean;
  failed_attempts: number;
}

interface UserPreferences {
  preferred_language: string;
  coding_familiarity: number;
  recommended_level: string;
}

export function LearningPlanPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [planItems, setPlanItems] = useState<LearningPlanItem[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      loadLearningPlan();
    }
  }, [user]);

  const loadLearningPlan = async () => {
    if (!user) return;

    try {
      // Fetch user preferences
      const { data: prefData } = await supabase
        .from('user_preferences')
        .select('preferred_language, coding_familiarity, recommended_level')
        .eq('user_id', user.id)
        .maybeSingle();

      if (prefData) {
        setPreferences(prefData);
      }

      // Fetch learning plan
      const { data: planData } = await supabase
        .from('learning_plan')
        .select('*')
        .eq('user_id', user.id)
        .order('display_order', { ascending: true })
        .limit(10);

      if (planData && planData.length > 0) {
        setPlanItems(planData as LearningPlanItem[]);
      } else if (prefData) {
        // No plan exists, generate one dynamically
        await refreshPlan();
      }
    } catch (error) {
      console.error('Failed to load learning plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshPlan = async () => {
    if (!user) return;
    
    setRefreshing(true);
    try {
      const success = await dynamicLearningService.updateLearningPlan(user.id);
      if (success) {
        // Reload the plan
        const { data: planData } = await supabase
          .from('learning_plan')
          .select('*')
          .eq('user_id', user.id)
          .order('display_order', { ascending: true })
          .limit(10);

        if (planData) {
          setPlanItems(planData as LearningPlanItem[]);
          toast.success('Learning plan updated based on your progress!');
        }
      }
    } catch (error) {
      console.error('Failed to refresh plan:', error);
      toast.error('Failed to update learning plan');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!preferences) {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="py-8 text-center">
          <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="font-semibold text-lg mb-2">Set Up Your Learning Path</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tell us about your experience level to get a personalized learning plan
          </p>
          <Button variant="hero" onClick={() => navigate('/onboarding')}>
            <Sparkles className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </CardContent>
      </Card>
    );
  }

  const completedCount = planItems.filter(item => item.is_completed).length;
  const progress = planItems.length > 0 ? (completedCount / planItems.length) * 100 : 0;
  const nextProblem = planItems.find(item => !item.is_completed);

  // Group problems by reason/topic for better display
  const strugglingProblems = planItems.filter(item => item.failed_attempts >= 2 && !item.is_completed);
  const hasStruggles = strugglingProblems.length > 0;

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-700 border-red-500/30';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTrackIcon = (trackId: string) => {
    const icons: Record<string, string> = {
      python: '🐍',
      javascript: '🟨',
      java: '☕',
      cpp: '⚡',
    };
    return icons[trackId] || '📚';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Your Learning Plan</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshPlan}
              disabled={refreshing}
              className="h-8 px-2"
              title="Update recommendations based on progress"
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            </Button>
            <Badge variant="outline" className={getLevelBadgeColor(preferences.recommended_level)}>
              {preferences.recommended_level.charAt(0).toUpperCase() + preferences.recommended_level.slice(1)} Level
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <span>{getTrackIcon(preferences.preferred_language)}</span>
          <span className="capitalize">{preferences.preferred_language} Track</span>
          <span className="text-muted-foreground/50">•</span>
          <span>{completedCount}/{planItems.length} completed</span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Problem list */}
        <div className="space-y-2 max-h-[280px] overflow-y-auto">
          {planItems.slice(0, 6).map((item, index) => (
            <Link
              key={item.id}
              to={`/problem/${item.problem_id}`}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all hover:bg-accent/50",
                item.is_completed && "bg-success/10 border-success/30",
                !item.is_completed && nextProblem?.id === item.id && "border-primary/50 bg-primary/5",
                item.failed_attempts >= 2 && !item.is_completed && "border-warning/50 bg-warning/5"
              )}
            >
              <div className="flex-shrink-0">
                {item.is_completed ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Circle className={cn(
                    "h-5 w-5",
                    nextProblem?.id === item.id ? "text-primary" : "text-muted-foreground/50"
                  )} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{index + 1}.</span>
                  <span className={cn(
                    "font-medium truncate",
                    item.is_completed && "text-muted-foreground line-through"
                  )}>
                    {item.problem_title}
                  </span>
                </div>
                {item.topic && (
                  <span className="text-xs text-muted-foreground">{item.topic}</span>
                )}
              </div>
              <Badge variant="outline" className={cn("text-xs", getLevelBadgeColor(item.level))}>
                {item.level}
              </Badge>
              {item.failed_attempts > 0 && !item.is_completed && (
                <Badge variant="destructive" className="text-xs">
                  {item.failed_attempts} retry
                </Badge>
              )}
            </Link>
          ))}
        </div>

        {/* Next problem action */}
        {nextProblem && (
          <div className="mt-4 pt-4 border-t">
            <Link to={`/problem/${nextProblem.problem_id}`}>
              <Button className="w-full gap-2" variant="hero">
                Continue Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {planItems.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">Generating your personalized plan...</p>
            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={refreshPlan}
              disabled={refreshing}
            >
              {refreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Plan
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
