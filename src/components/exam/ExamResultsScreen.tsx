import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Trophy, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Home,
  FileText,
  Loader2,
  Brain,
  Target,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { formatExamTime } from '@/lib/examUtils';

interface ExamResultsScreenProps {
  examSessionId: string;
  language: string;
  timeSpent: number;
  hearts: number;
  wasDisqualified: boolean;
  wasAutoSubmitted: boolean;
}

interface ResultData {
  totalScore: number;
  maxScore: number;
  questionsCorrect: number;
  questionsTotal: number;
  compilationErrors: number;
  runtimeErrors: number;
  aiFeedback: string | null;
  weakConcepts: string[];
  suggestions: string[];
}

export function ExamResultsScreen({
  examSessionId,
  language,
  timeSpent,
  hearts,
  wasDisqualified,
  wasAutoSubmitted,
}: ExamResultsScreenProps) {
  const [results, setResults] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  useEffect(() => {
    loadResults();
  }, [examSessionId]);

  const loadResults = async () => {
    try {
      // Fetch exam results
      const { data: resultData, error: resultError } = await supabase
        .from('exam_results')
        .select('*')
        .eq('exam_session_id', examSessionId)
        .single();

      if (resultError) {
        console.error('Error loading results:', resultError);
        // Generate results if not found
        await generateResults();
        return;
      }

      setResults({
        totalScore: resultData.total_score || 0,
        maxScore: resultData.max_score || 0,
        questionsCorrect: resultData.questions_correct || 0,
        questionsTotal: resultData.questions_total || 0,
        compilationErrors: resultData.total_compilation_errors || 0,
        runtimeErrors: resultData.total_runtime_errors || 0,
        aiFeedback: resultData.ai_feedback,
        weakConcepts: resultData.weak_concepts || [],
        suggestions: resultData.improvement_suggestions || [],
      });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResults = async () => {
    setIsGeneratingAnalysis(true);
    try {
      // Fetch answers for this exam
      const { data: answers } = await supabase
        .from('exam_answers')
        .select('*')
        .eq('exam_session_id', examSessionId);

      if (!answers) return;

      const totalScore = answers.reduce((sum, a) => sum + (a.tests_passed || 0), 0);
      const maxScore = answers.reduce((sum, a) => sum + (a.tests_total || 0), 0);
      const questionsCorrect = answers.filter(a => a.is_correct).length;
      const compilationErrors = answers.reduce((sum, a) => sum + (a.compilation_errors || 0), 0);
      const runtimeErrors = answers.reduce((sum, a) => sum + (a.runtime_errors || 0), 0);

      // Generate AI analysis
      const { data: aiData } = await supabase.functions.invoke('analyze-exam', {
        body: {
          examSessionId,
          language,
          answers: answers.map(a => ({
            questionId: a.question_id,
            code: a.code,
            isCorrect: a.is_correct,
            testsPassed: a.tests_passed,
            testsTotal: a.tests_total,
            compilationErrors: a.compilation_errors,
            runtimeErrors: a.runtime_errors,
            errorMessages: a.error_messages,
            timeSpent: a.time_spent_seconds,
          })),
          totalTimeSpent: timeSpent,
          violations: 3 - hearts,
        },
      });

      const aiFeedback = aiData?.analysis || null;
      const weakConcepts = aiData?.weakConcepts || [];
      const suggestions = aiData?.suggestions || [];

      // Save results
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('exam_results').insert({
          exam_session_id: examSessionId,
          user_id: user.id,
          total_score: totalScore,
          max_score: maxScore,
          questions_correct: questionsCorrect,
          questions_total: answers.length,
          total_compilation_errors: compilationErrors,
          total_runtime_errors: runtimeErrors,
          avg_time_per_question_seconds: Math.round(timeSpent / answers.length),
          weak_concepts: weakConcepts,
          improvement_suggestions: suggestions,
          ai_feedback: aiFeedback,
        });
      }

      setResults({
        totalScore,
        maxScore,
        questionsCorrect,
        questionsTotal: answers.length,
        compilationErrors,
        runtimeErrors,
        aiFeedback,
        weakConcepts,
        suggestions,
      });
    } catch (err) {
      console.error('Error generating results:', err);
    } finally {
      setIsGeneratingAnalysis(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  const percentage = results ? Math.round((results.totalScore / results.maxScore) * 100) || 0 : 0;
  const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Exam Complete</h1>
          <p className="text-muted-foreground">
            {language.toUpperCase()} Programming Exam
          </p>
          {wasDisqualified && (
            <Badge variant="destructive" className="text-lg px-4 py-1">
              Disqualified - Too Many Violations
            </Badge>
          )}
          {wasAutoSubmitted && !wasDisqualified && (
            <Badge variant="secondary" className="text-lg px-4 py-1">
              Auto-submitted - Time Expired
            </Badge>
          )}
        </div>

        {/* Score Card */}
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary">{grade}</div>
                <p className="text-muted-foreground">Grade</p>
              </div>
              <Separator orientation="vertical" className="h-20" />
              <div className="text-center">
                <div className="text-4xl font-bold">{percentage}%</div>
                <p className="text-muted-foreground">Score</p>
              </div>
              <Separator orientation="vertical" className="h-20" />
              <div className="text-center">
                <div className="text-4xl font-bold">
                  {results?.questionsCorrect}/{results?.questionsTotal}
                </div>
                <p className="text-muted-foreground">Questions Correct</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4 text-center">
              <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-xl font-bold">{formatExamTime(timeSpent)}</div>
              <p className="text-sm text-muted-foreground">Time Spent</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4 text-center">
              <Trophy className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <div className="text-xl font-bold">{results?.totalScore}/{results?.maxScore}</div>
              <p className="text-sm text-muted-foreground">Tests Passed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto text-red-500 mb-2" />
              <div className="text-xl font-bold">{results?.compilationErrors}</div>
              <p className="text-sm text-muted-foreground">Compile Errors</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4 text-center">
              <XCircle className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <div className="text-xl font-bold">{results?.runtimeErrors}</div>
              <p className="text-sm text-muted-foreground">Runtime Errors</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis */}
        {isGeneratingAnalysis ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Brain className="h-12 w-12 mx-auto text-primary mb-4 animate-pulse" />
              <p className="text-lg font-medium">Generating AI Analysis...</p>
              <p className="text-sm text-muted-foreground">Analyzing your code and performance</p>
            </CardContent>
          </Card>
        ) : results?.aiFeedback ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{results.aiFeedback}</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ) : null}

        {/* Weak Concepts & Suggestions */}
        <div className="grid md:grid-cols-2 gap-4">
          {results?.weakConcepts && results.weakConcepts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-yellow-500" />
                  Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.weakConcepts.map((concept, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{concept}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {results?.suggestions && results.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild>
            <Link to="/problems">
              <FileText className="h-4 w-4 mr-2" />
              Practice More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
