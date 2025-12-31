import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ExamQuestion } from '@/lib/examUtils';
import { cn } from '@/lib/utils';

interface ExamQuestionPanelProps {
  question: ExamQuestion;
  questionIndex: number;
}

export function ExamQuestionPanel({ question, questionIndex }: ExamQuestionPanelProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="flex flex-col h-full border-border bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {questionIndex + 1}
          </span>
          <Badge className={cn("capitalize", getDifficultyColor(question.difficulty))}>
            {question.difficulty}
          </Badge>
        </div>
        <h2 className="text-xl font-bold text-foreground">{question.title}</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Description</h3>
            <div className="text-sm text-foreground whitespace-pre-wrap">
              {question.description}
            </div>
          </div>

          <Separator />

          {/* Input Format */}
          {question.inputFormat && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Input Format</h3>
              <code className="text-sm bg-muted px-2 py-1 rounded text-foreground">
                {question.inputFormat}
              </code>
            </div>
          )}

          {/* Output Format */}
          {question.outputFormat && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Output Format</h3>
              <p className="text-sm text-foreground">{question.outputFormat}</p>
            </div>
          )}

          {/* Constraints */}
          {question.constraints && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Constraints</h3>
              <p className="text-sm text-foreground font-mono">{question.constraints}</p>
            </div>
          )}

          <Separator />

          {/* Sample Test Cases */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Sample Test Cases</h3>
            <div className="space-y-3">
              {question.visibleTestCases.slice(0, 2).map((testCase, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Input:</span>
                    <pre className="text-sm font-mono mt-1 text-foreground bg-background p-2 rounded">
                      {testCase.input || '(no input)'}
                    </pre>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Expected Output:</span>
                    <pre className="text-sm font-mono mt-1 text-foreground bg-background p-2 rounded">
                      {testCase.expectedOutput}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
