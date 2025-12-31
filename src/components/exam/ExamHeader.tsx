import { Heart, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ExamHeaderProps {
  language: string;
  currentQuestion: number;
  totalQuestions: number;
  heartsRemaining: number;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  canSubmit: boolean;
  timeUntilSubmit: number;
}

export function ExamHeader({
  language,
  currentQuestion,
  totalQuestions,
  heartsRemaining,
  timeRemaining,
  formatTime,
  canSubmit,
  timeUntilSubmit,
}: ExamHeaderProps) {
  const isTimeLow = timeRemaining < 30 * 60; // Less than 30 minutes
  const isTimeCritical = timeRemaining < 10 * 60; // Less than 10 minutes
  
  const progressPercent = ((currentQuestion) / totalQuestions) * 100;

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Exam info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">DSArena Exam</span>
            <Badge variant="secondary" className="uppercase">
              {language}
            </Badge>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <Progress value={progressPercent} className="w-24 h-2" />
          </div>
        </div>

        {/* Center - Timer */}
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
          isTimeCritical ? "bg-destructive/20 text-destructive animate-pulse" :
          isTimeLow ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
          "bg-muted"
        )}>
          <Clock className="h-4 w-4" />
          <span className={cn(
            "font-mono text-lg font-bold",
            isTimeCritical && "text-destructive"
          )}>
            {formatTime(timeRemaining)}
          </span>
        </div>

        {/* Right side - Hearts and Submit status */}
        <div className="flex items-center gap-4">
          {/* Submit status */}
          {!canSubmit && (
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span>Submit in {formatTime(timeUntilSubmit)}</span>
            </div>
          )}
          
          {canSubmit && (
            <Badge variant="default" className="bg-green-600">
              Ready to Submit
            </Badge>
          )}

          {/* Hearts */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <Heart
                key={index}
                className={cn(
                  "h-6 w-6 transition-all duration-300",
                  index < heartsRemaining
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile progress */}
      <div className="sm:hidden mt-2 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Q{currentQuestion + 1}/{totalQuestions}
        </span>
        <Progress value={progressPercent} className="flex-1 h-1" />
      </div>
    </div>
  );
}
