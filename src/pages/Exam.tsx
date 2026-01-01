import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { ExamStartScreen } from '@/components/exam/ExamStartScreen';
import { ExamHeader } from '@/components/exam/ExamHeader';
import { ExamQuestionPanel } from '@/components/exam/ExamQuestionPanel';
import { ExamCodeEditor } from '@/components/exam/ExamCodeEditor';
import { ExamNavigation } from '@/components/exam/ExamNavigation';
import { ExamResultsScreen } from '@/components/exam/ExamResultsScreen';
import { useExamSecurity } from '@/hooks/useExamSecurity';
import { useExamTimer } from '@/hooks/useExamTimer';
import { ExamLanguage, selectRandomQuestions, ExamQuestion, getLanguageDisplayName } from '@/lib/examUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Ban } from 'lucide-react';

type ExamState = 'loading' | 'blocked' | 'start' | 'active' | 'results';

export default function Exam() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [examState, setExamState] = useState<ExamState>('loading');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [language, setLanguage] = useState<ExamLanguage>('python');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questionStatuses, setQuestionStatuses] = useState<('unanswered' | 'attempted' | 'completed')[]>([]);
  const [heartsRemaining, setHeartsRemaining] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasDisqualified, setWasDisqualified] = useState(false);
  const [wasAutoSubmitted, setWasAutoSubmitted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [blockReason, setBlockReason] = useState<string>('');

  // Check eligibility when component mounts
  useEffect(() => {
    if (user) {
      checkEligibility();
    } else {
      setExamState('start');
    }
  }, [user]);

  const checkEligibility = async () => {
    if (!user) return;
    
    try {
      // Check if user has failed an exam and is blocked
      const { data: eligibility } = await supabase
        .from('exam_eligibility')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (eligibility && !eligibility.is_eligible) {
        setBlockReason('You failed the previous exam. Please wait for admin approval to retake.');
        setExamState('blocked');
        return;
      }

      // Check for in-progress exam
      const { data: activeSession } = await supabase
        .from('exam_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'in_progress')
        .maybeSingle();

      if (activeSession) {
        // Resume the active session
        setSessionId(activeSession.id);
        setLanguage(activeSession.language as ExamLanguage);
        setHeartsRemaining(activeSession.hearts_remaining);
        // Load the questions and answers
        await resumeExam(activeSession);
        return;
      }

      setExamState('start');
    } catch (err) {
      console.error('Failed to check eligibility:', err);
      setExamState('start');
    }
  };

  const resumeExam = async (session: any) => {
    try {
      const selectedQuestions = selectRandomQuestions(session.language as ExamLanguage, 3);
      // In a real scenario, we'd load the exact questions from the session
      // For now, just start fresh
      setQuestions(selectedQuestions);
      setAnswers(Object.fromEntries(selectedQuestions.map((q, i) => [i, q.starterCode])));
      setQuestionStatuses(new Array(3).fill('unanswered'));
      setExamState('active');
    } catch (err) {
      console.error('Failed to resume exam:', err);
      setExamState('start');
    }
  };

  const handleTimeUp = useCallback(() => {
    setWasAutoSubmitted(true);
    handleSubmit(true);
  }, []);

  const { timeRemaining, timeSpent, canSubmit, formatTime, getTimeUntilSubmit } = useExamTimer({
    totalSeconds: 3 * 60 * 60, // 3 hours
    onTimeUp: handleTimeUp,
    isActive: examState === 'active',
  });

  const handleViolation = useCallback(async (type: string) => {
    if (heartsRemaining <= 0) return;
    
    const newHearts = heartsRemaining - 1;
    setHeartsRemaining(newHearts);

    // Save violation
    if (sessionId && user) {
      await supabase.from('exam_violations').insert({
        exam_session_id: sessionId,
        user_id: user.id,
        violation_type: type,
        hearts_before: heartsRemaining,
        hearts_after: newHearts,
      });

      await supabase.from('exam_sessions').update({
        hearts_remaining: newHearts,
        total_violations: 3 - newHearts,
      }).eq('id', sessionId);
    }
  }, [heartsRemaining, sessionId, user]);

  const handleDisqualify = useCallback(() => {
    setWasDisqualified(true);
    handleSubmit(true);
  }, []);

  const { enterFullscreen, exitFullscreen } = useExamSecurity({
    isActive: examState === 'active',
    heartsRemaining,
    onViolation: handleViolation,
    onDisqualify: handleDisqualify,
  });

  const handleStart = async (selectedLanguage: ExamLanguage) => {
    if (!user) {
      toast.error('Please log in to start the exam');
      navigate('/auth');
      return;
    }

    setIsStarting(true);
    try {
      const selectedQuestions = selectRandomQuestions(selectedLanguage, 3);
      
      // Create exam session
      const { data: session, error } = await supabase.from('exam_sessions').insert({
        user_id: user.id,
        language: selectedLanguage,
        question_ids: selectedQuestions.map(q => q.id),
        status: 'in_progress',
      }).select().single();

      if (error) throw error;

      // Create answer placeholders
      for (let i = 0; i < selectedQuestions.length; i++) {
        await supabase.from('exam_answers').insert({
          exam_session_id: session.id,
          user_id: user.id,
          question_id: selectedQuestions[i].id,
          question_index: i,
          code: selectedQuestions[i].starterCode,
        });
      }

      setSessionId(session.id);
      setLanguage(selectedLanguage);
      setQuestions(selectedQuestions);
      setAnswers(Object.fromEntries(selectedQuestions.map((q, i) => [i, q.starterCode])));
      setQuestionStatuses(new Array(3).fill('unanswered'));
      setExamState('active');

      await enterFullscreen();
    } catch (err) {
      console.error('Failed to start exam:', err);
      toast.error('Failed to start exam');
    } finally {
      setIsStarting(false);
    }
  };

  const handleCodeChange = (code: string) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: code }));
    
    if (questionStatuses[currentIndex] === 'unanswered') {
      const newStatuses = [...questionStatuses];
      newStatuses[currentIndex] = 'attempted';
      setQuestionStatuses(newStatuses);
    }
  };

  const handleSaveCode = async (code: string) => {
    if (!sessionId || !user) return;
    
    await supabase.from('exam_answers').update({
      code: code,
    }).eq('exam_session_id', sessionId).eq('question_index', currentIndex);
  };

  const handleRunComplete = async (results: any[], allPassed: boolean, compErrors: number, rtErrors: number) => {
    if (!sessionId || !user) return;

    const newStatuses = [...questionStatuses];
    newStatuses[currentIndex] = allPassed ? 'completed' : 'attempted';
    setQuestionStatuses(newStatuses);

    await supabase.from('exam_answers').update({
      code: answers[currentIndex],
      is_correct: allPassed,
      tests_passed: results.filter(r => r.passed).length,
      tests_total: results.length,
      compilation_errors: compErrors,
      runtime_errors: rtErrors,
      last_run_at: new Date().toISOString(),
      run_count: 1,
    }).eq('exam_session_id', sessionId).eq('question_index', currentIndex);
  };

  const handleSubmit = async (auto = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Determine if passed (all questions completed correctly)
      const allCorrect = questionStatuses.every(s => s === 'completed');
      const passed = allCorrect && !wasDisqualified;

      if (sessionId) {
        await supabase.from('exam_sessions').update({
          status: wasDisqualified ? 'disqualified' : 'completed',
          completed_at: new Date().toISOString(),
          time_spent_seconds: timeSpent,
          auto_submitted: auto,
          passed: passed,
        }).eq('id', sessionId);

        // Update eligibility - if failed, block from retaking
        if (!passed && user) {
          const { data: existingEligibility } = await supabase
            .from('exam_eligibility')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();

          if (existingEligibility) {
            await supabase.from('exam_eligibility').update({
              is_eligible: false,
              last_exam_passed: false,
              last_exam_session_id: sessionId,
              blocked_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }).eq('user_id', user.id);
          } else {
            await supabase.from('exam_eligibility').insert({
              user_id: user.id,
              is_eligible: false,
              last_exam_passed: false,
              last_exam_session_id: sessionId,
              blocked_at: new Date().toISOString(),
            });
          }
        }
      }

      exitFullscreen();
      setExamState('results');
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Failed to submit exam');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please <a href="/auth" className="text-primary underline">log in</a> to take the exam.</p>
      </div>
    );
  }

  if (examState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking exam eligibility...</p>
        </div>
      </div>
    );
  }

  if (examState === 'blocked') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <Ban className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-destructive">Exam Access Blocked</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{blockReason}</p>
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <div className="flex items-center gap-2 justify-center mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">What happens next?</span>
              </div>
              <p className="text-muted-foreground">
                An administrator will review your previous attempt and may grant you permission to retake the exam.
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (examState === 'start') {
    return <ExamStartScreen onStart={handleStart} isLoading={isStarting} />;
  }

  if (examState === 'results' && sessionId) {
    return (
      <ExamResultsScreen
        examSessionId={sessionId}
        language={language}
        timeSpent={timeSpent}
        hearts={heartsRemaining}
        wasDisqualified={wasDisqualified}
        wasAutoSubmitted={wasAutoSubmitted}
      />
    );
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <ExamHeader
        language={getLanguageDisplayName(language)}
        currentQuestion={currentIndex}
        totalQuestions={questions.length}
        heartsRemaining={heartsRemaining}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
        canSubmit={canSubmit}
        timeUntilSubmit={getTimeUntilSubmit()}
      />

      <div className="flex-1 flex min-h-0">
        <div className="w-1/2 p-4 border-r border-border">
          <ExamQuestionPanel question={currentQuestion} questionIndex={currentIndex} />
        </div>
        <div className="w-1/2 p-4">
          <ExamCodeEditor
            language={language}
            code={answers[currentIndex] || ''}
            onChange={handleCodeChange}
            testCases={currentQuestion.visibleTestCases}
            hiddenTestCases={currentQuestion.hiddenTestCases}
            onRunComplete={handleRunComplete}
            onSave={handleSaveCode}
          />
        </div>
      </div>

      <ExamNavigation
        currentQuestion={currentIndex}
        totalQuestions={questions.length}
        onPrevious={() => setCurrentIndex(i => Math.max(0, i - 1))}
        onNext={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
        onSubmit={() => handleSubmit(false)}
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        questionStatuses={questionStatuses}
      />
    </div>
  );
}
