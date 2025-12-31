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

type ExamState = 'start' | 'active' | 'results';

export default function Exam() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [examState, setExamState] = useState<ExamState>('start');
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
      if (sessionId) {
        await supabase.from('exam_sessions').update({
          status: wasDisqualified ? 'disqualified' : 'completed',
          completed_at: new Date().toISOString(),
          time_spent_seconds: timeSpent,
          auto_submitted: auto,
        }).eq('id', sessionId);
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
