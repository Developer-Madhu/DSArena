import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  Clock, 
  Target, 
  Lightbulb,
  ArrowRight,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFailureFeedback } from '@/lib/skillRatingSystem';

interface FailureFeedbackProps {
  result: 'failed' | 'timeout' | 'abandoned';
  testsPassed: number;
  testsTotal: number;
  timeSeconds: number;
  timeLimitSeconds?: number;
  ratingChange?: number;
  onRetryPractice: () => void;
  onNextProblem: () => void;
  onReviewSolution?: () => void;
}

export function FailureFeedback({
  result,
  testsPassed,
  testsTotal,
  timeSeconds,
  timeLimitSeconds,
  ratingChange,
  onRetryPractice,
  onNextProblem,
  onReviewSolution,
}: FailureFeedbackProps) {
  const feedback = getFailureFeedback(
    result,
    testsPassed,
    testsTotal,
    timeSeconds,
    timeLimitSeconds
  );

  const resultColors = {
    failed: 'text-red-600 bg-red-500/10 border-red-500/20',
    timeout: 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20',
    abandoned: 'text-gray-600 bg-gray-500/10 border-gray-500/20',
  };

  const resultIcons = {
    failed: AlertCircle,
    timeout: Clock,
    abandoned: Target,
  };

  const ResultIcon = resultIcons[result];

  return (
    <Card className={cn("border-2", resultColors[result])}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ResultIcon className="h-5 w-5" />
            {feedback.title}
          </CardTitle>
          {ratingChange !== undefined && ratingChange !== 0 && (
            <Badge 
              variant="outline" 
              className={cn(
                ratingChange > 0 
                  ? "bg-green-500/10 text-green-700 border-green-500/30"
                  : "bg-red-500/10 text-red-700 border-red-500/30"
              )}
            >
              {ratingChange > 0 ? '+' : ''}{ratingChange} rating
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-muted-foreground">{feedback.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/50">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {testsPassed}/{testsTotal}
            </div>
            <div className="text-xs text-muted-foreground">Tests Passed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Math.floor(timeSeconds / 60)}:{(timeSeconds % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground">Time Spent</div>
          </div>
        </div>

        {/* Suggestion */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-primary">Suggestion</p>
              <p className="text-sm text-muted-foreground mt-1">
                {feedback.suggestion}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={onRetryPractice} variant="outline" className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" />
            Practice Mode
          </Button>
          {onReviewSolution && (
            <Button onClick={onReviewSolution} variant="outline" className="flex-1">
              <BookOpen className="mr-2 h-4 w-4" />
              Review Solution
            </Button>
          )}
          <Button onClick={onNextProblem} className="flex-1">
            Next Problem
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
