import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { learningRecommender, LearningRecommendation, TopicStrength } from '@/lib/learningRecommender';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  X, 
  ChevronRight, 
  Lightbulb, 
  Video, 
  Target, 
  TrendingUp,
  BookOpen,
  Flame,
  Trophy,
  ArrowRight,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';
import glitchyAvatar from '@/assets/glitchy-avatar.png';

interface AssistantState {
  isOpen: boolean;
  isMinimized: boolean;
}

export function PersonalizedAssistant() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<AssistantState>({ isOpen: false, isMinimized: true });
  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([]);
  const [strengths, setStrengths] = useState<TopicStrength[]>([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  // Don't show on auth, index, or problem detail pages
  const hiddenPaths = ['/auth', '/problem/'];
  const shouldHide = hiddenPaths.some(path => location.pathname.startsWith(path)) || location.pathname === '/';

  useEffect(() => {
    if (user && !shouldHide) {
      loadData();
      generateGreeting();
    }
  }, [user, shouldHide]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [recs, perf] = await Promise.all([
        learningRecommender.getRecommendations(user.id),
        learningRecommender.analyzePerformance(user.id)
      ]);
      setRecommendations(recs);
      setStrengths(perf);
    } catch (err) {
      console.error('Failed to load assistant data:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateGreeting = () => {
    const hour = new Date().getHours();
    const greetings = hour < 12 
      ? ['Good morning, coder!', 'Rise and code!', 'Morning brain boost time!']
      : hour < 17
      ? ['Keep that momentum going!', 'Afternoon coding session!', 'You\'re doing great today!']
      : ['Evening grind mode!', 'Night owl coding!', 'Finish strong today!'];
    
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'topic': return Target;
      case 'practice': return TrendingUp;
      case 'review': return BookOpen;
      default: return Lightbulb;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/10 text-warning border-warning/30';
      default: return 'bg-success/10 text-success border-success/30';
    }
  };

  const getTopStrengths = () => strengths.filter(s => s.isStrength).slice(0, 3);
  const getWeaknesses = () => strengths.filter(s => s.isWeakness).slice(0, 3);

  if (!user || shouldHide) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setState(prev => ({ ...prev, isOpen: !prev.isOpen, isMinimized: false }))}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-all duration-300",
          "bg-gradient-to-br from-primary to-accent hover:scale-110",
          "p-3 border-2 border-primary/30",
          state.isOpen && "scale-0 opacity-0"
        )}
      >
        <div className="relative">
          <img 
            src={glitchyAvatar} 
            alt="AI Assistant" 
            className="w-10 h-10 rounded-full"
          />
          {recommendations.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground font-bold animate-pulse">
              {recommendations.length}
            </span>
          )}
        </div>
      </button>

      {/* Assistant Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-80 sm:w-96 transition-all duration-300 origin-bottom-right",
          "bg-card border border-border rounded-2xl shadow-2xl overflow-hidden",
          state.isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={glitchyAvatar} 
                  alt="AI Assistant" 
                  className="w-10 h-10 rounded-full ring-2 ring-primary/50"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Glitchy
                </h3>
                <p className="text-xs text-muted-foreground">{greeting}</p>
              </div>
            </div>
            <button
              onClick={() => setState(prev => ({ ...prev, isOpen: false }))}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Brain className="h-8 w-8 text-primary animate-pulse" />
              </div>
            ) : (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-success/10 rounded-lg p-3 border border-success/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="h-4 w-4 text-success" />
                      <span className="text-xs font-medium">Strengths</span>
                    </div>
                    <p className="text-lg font-bold">{getTopStrengths().length}</p>
                  </div>
                  <div className="bg-warning/10 rounded-lg p-3 border border-warning/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-warning" />
                      <span className="text-xs font-medium">Focus Areas</span>
                    </div>
                    <p className="text-lg font-bold">{getWeaknesses().length}</p>
                  </div>
                </div>

                {/* Top Strengths */}
                {getTopStrengths().length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <Zap className="h-3 w-3" /> YOUR STRENGTHS
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {getTopStrengths().map((s, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-success/10 text-success border-success/30">
                          {s.topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {recommendations.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" /> PERSONALIZED FOR YOU
                    </h4>
                    <div className="space-y-2">
                      {recommendations.slice(0, 4).map((rec, i) => {
                        const Icon = getIcon(rec.type);
                        return (
                          <div
                            key={i}
                            onClick={() => {
                              if (rec.actionUrl) {
                                navigate(rec.actionUrl);
                                setState(prev => ({ ...prev, isOpen: false }));
                              }
                            }}
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-lg border bg-card/50",
                              "hover:bg-accent/30 transition-colors cursor-pointer group"
                            )}
                          >
                            <div className={cn("p-2 rounded-lg shrink-0", getPriorityColor(rec.priority))}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm leading-tight">{rec.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{rec.reason}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:translate-x-1 transition-transform" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Focus Areas */}
                {getWeaknesses().length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <Target className="h-3 w-3" /> AREAS TO IMPROVE
                    </h4>
                    <div className="space-y-2">
                      {getWeaknesses().map((w, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {w.topic}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(w.successRate)}% success
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 text-xs"
                            onClick={() => {
                              navigate('/videos');
                              setState(prev => ({ ...prev, isOpen: false }));
                            }}
                          >
                            <Video className="h-3 w-3 mr-1" />
                            Watch
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">QUICK ACTIONS</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-auto py-2 flex-col"
                      onClick={() => {
                        navigate('/daily-challenge');
                        setState(prev => ({ ...prev, isOpen: false }));
                      }}
                    >
                      <Flame className="h-4 w-4 text-warning mb-1" />
                      <span className="text-xs">Daily Challenge</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-auto py-2 flex-col"
                      onClick={() => {
                        navigate('/videos');
                        setState(prev => ({ ...prev, isOpen: false }));
                      }}
                    >
                      <Video className="h-4 w-4 text-primary mb-1" />
                      <span className="text-xs">Watch Videos</span>
                    </Button>
                  </div>
                </div>

                {/* Motivational Message */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3 border border-primary/20">
                  <p className="text-xs text-center italic text-muted-foreground">
                    "Every expert was once a beginner. Keep coding!" 💪
                  </p>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
