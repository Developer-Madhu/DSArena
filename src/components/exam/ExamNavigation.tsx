import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExamNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  isSubmitting: boolean;
  questionStatuses: ('unanswered' | 'attempted' | 'completed')[];
}

export function ExamNavigation({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  canSubmit,
  isSubmitting,
  questionStatuses,
}: ExamNavigationProps) {
  const isFirst = currentQuestion === 0;
  const isLast = currentQuestion === totalQuestions - 1;

  return (
    <div className="bg-card border-t border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Question indicators */}
        <div className="flex items-center gap-2">
          {questionStatuses.map((status, index) => (
            <button
              key={index}
              className={cn(
                "w-8 h-8 rounded-full text-sm font-medium transition-all",
                index === currentQuestion && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                status === 'completed' && "bg-green-500 text-white",
                status === 'attempted' && "bg-yellow-500 text-white",
                status === 'unanswered' && "bg-muted text-muted-foreground"
              )}
              onClick={() => {
                // Navigate to question (handled by parent)
              }}
              disabled
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={isFirst}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {isLast ? (
            <Button
              size="sm"
              onClick={onSubmit}
              disabled={!canSubmit || isSubmitting}
              className={cn(
                "gap-1",
                canSubmit && "bg-green-600 hover:bg-green-700"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Exam
                </>
              )}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={onNext}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
