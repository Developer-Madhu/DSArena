import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { Code2, Star, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { getAvailableTracks } from '@/lib/languageTracksData';
import { cn } from '@/lib/utils';

const FAMILIARITY_LEVELS = [
  { value: 1, label: 'Complete Beginner', description: 'Never coded before' },
  { value: 2, label: 'Beginner', description: 'Know basic syntax' },
  { value: 3, label: 'Intermediate', description: 'Can write simple programs' },
  { value: 4, label: 'Advanced', description: 'Comfortable with algorithms' },
  { value: 5, label: 'Expert', description: 'Ready for complex challenges' },
];

const getRecommendedLevel = (familiarity: number): string => {
  if (familiarity <= 2) return 'beginner';
  if (familiarity <= 3) return 'intermediate';
  return 'advanced';
};

export default function OnboardingFlow() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [codingFamiliarity, setCodingFamiliarity] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const availableTracks = getAvailableTracks();

  const handleComplete = async () => {
    if (!user || !selectedLanguage || !codingFamiliarity) return;

    setLoading(true);
    try {
      const recommendedLevel = getRecommendedLevel(codingFamiliarity);

      // Save user preferences
      const { error: prefError } = await supabase
        .from('user_preferences')
        .insert({
          user_id: user.id,
          preferred_language: selectedLanguage,
          coding_familiarity: codingFamiliarity,
          recommended_level: recommendedLevel,
          onboarding_completed: true,
        });

      if (prefError) throw prefError;

      // Generate learning plan based on preferences
      const track = availableTracks.find(t => t.id === selectedLanguage);
      if (track?.problems) {
        // Map difficulty to level
        const difficultyToLevel = (difficulty: string): string => {
          if (difficulty === 'easy') return 'beginner';
          if (difficulty === 'medium') return 'intermediate';
          return 'advanced';
        };

        // Filter problems based on recommended level
        const levelOrder = ['beginner', 'intermediate', 'advanced'];
        const maxLevelIndex = levelOrder.indexOf(recommendedLevel);
        
        const planProblems = track.problems
          .filter(p => {
            const problemLevel = difficultyToLevel(p.difficulty);
            return levelOrder.indexOf(problemLevel) <= maxLevelIndex;
          })
          .slice(0, 10) // Start with first 10 problems
          .map((p, index) => ({
            user_id: user.id,
            problem_id: p.slug, // Store slug for routing
            problem_title: p.title,
            track_id: selectedLanguage,
            level: difficultyToLevel(p.difficulty),
            topic: p.category,
            display_order: index,
            is_completed: false,
            failed_attempts: 0,
          }));

        if (planProblems.length > 0) {
          const { error: planError } = await supabase
            .from('learning_plan')
            .insert(planProblems);

          if (planError) {
            console.error('Failed to create learning plan:', planError);
          }
        }
      }

      toast.success('Your personalized learning plan is ready!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('Failed to save preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 2) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="relative w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of 2</span>
            <span>{progress.toFixed(0)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl border-border/50">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
              {step === 1 ? (
                <Code2 className="h-8 w-8 text-primary-foreground" />
              ) : (
                <Star className="h-8 w-8 text-primary-foreground" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {step === 1 ? 'Choose Your Language' : 'Your Coding Experience'}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? 'Select the programming language you want to learn'
                : 'Help us personalize your learning journey'}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {step === 1 ? (
              <div className="grid grid-cols-2 gap-3">
                {availableTracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setSelectedLanguage(track.id)}
                    className={cn(
                      "flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200",
                      selectedLanguage === track.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    )}
                  >
                    <span className="text-3xl mb-2">{track.icon}</span>
                    <span className="font-semibold">{track.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {track.totalProblems} problems
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <RadioGroup
                value={codingFamiliarity.toString()}
                onValueChange={(val) => setCodingFamiliarity(parseInt(val))}
                className="space-y-3"
              >
                {FAMILIARITY_LEVELS.map((level) => (
                  <div
                    key={level.value}
                    className={cn(
                      "flex items-center space-x-3 rounded-xl border-2 p-4 transition-all cursor-pointer",
                      codingFamiliarity === level.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setCodingFamiliarity(level.value)}
                  >
                    <RadioGroupItem value={level.value.toString()} id={`level-${level.value}`} />
                    <div className="flex-1">
                      <Label htmlFor={`level-${level.value}`} className="font-semibold cursor-pointer">
                        {level.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < level.value ? "text-warning fill-warning" : "text-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Preview of recommended level */}
            {step === 2 && codingFamiliarity > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Your Recommended Path</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on your experience, we'll start you at the{' '}
                  <span className="font-semibold text-foreground capitalize">
                    {getRecommendedLevel(codingFamiliarity)}
                  </span>{' '}
                  level with {selectedLanguage && availableTracks.find(t => t.id === selectedLanguage)?.name} problems.
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step === 1 ? (
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedLanguage}
                  className="gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={handleComplete}
                  disabled={!codingFamiliarity || loading}
                  className="gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating your plan...
                    </>
                  ) : (
                    <>
                      Start Learning
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
