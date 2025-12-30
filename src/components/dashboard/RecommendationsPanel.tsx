import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, BookOpen, Target, Video, ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { learningRecommender, LearningRecommendation } from '@/lib/learningRecommender';
import { cn } from '@/lib/utils';

export function RecommendationsPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadRecommendations();
    }
  }, [user]);

  const loadRecommendations = async () => {
    if (!user) return;
    try {
      const recs = await learningRecommender.getRecommendations(user.id);
      setRecommendations(recs);
    } catch (err) {
      console.error('Failed to load recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || recommendations.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'topic': return Target;
      case 'practice': return TrendingUp;
      default: return BookOpen;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/30';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30';
      default: return 'bg-green-500/10 text-green-600 border-green-500/30';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Personalized For You</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.slice(0, 4).map((rec, i) => {
          const Icon = getIcon(rec.type);
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => rec.actionUrl && navigate(rec.actionUrl)}
            >
              <div className={cn("p-2 rounded-lg", getPriorityColor(rec.priority))}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{rec.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{rec.reason}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
