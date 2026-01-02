import React, { useState, useCallback, useEffect, useRef } from 'react';
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
import { ExamLanguage, selectRandomQuestions, getQuestionsByIds, ExamQuestion, getLanguageDisplayName } from '@/lib/examUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Ban } from 'lucide-react';

// List of emails that get exam bypass after 1 hour
const BYPASS_EMAILS = [
  'yashramnani.79@gmail.com',
  'dinakartenny77@gmail.com',
  'saisushanth.p005@gmail.com',
  'tanoojpuppala3@gmail.com',
  'prabhathbunny16@gmail.com',
  'rajarajendraprasad123@gmail.com',
  'humayun04104@gmail.com',
];

const BYPASS_TIME_MS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

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
      // Check if user has failed an exam and is blocked via exam_eligibility
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

      // Also check for any failed/disqualified session without eligibility record
      const { data: failedSession } = await supabase
        .from('exam_sessions')
        .select('id, status, passed')
        .eq('user_id', user.id)
        .or('status.eq.disqualified,and(status.eq.completed,passed.eq.false)')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (failedSession && !eligibility) {
        // User failed but no eligibility record exists - block them
        await supabase.from('exam_eligibility').insert({
          user_id: user.id,
          is_eligible: false,
          last_exam_passed: false,
          last_exam_session_id: failedSession.id,
          blocked_at: new Date().toISOString(),
        });
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
        // Check if session should be marked as disqualified (0 hearts)
        if (activeSession.hearts_remaining <= 0) {
          await supabase.from('exam_sessions').update({
            status: 'disqualified',
            passed: false,
            completed_at: new Date().toISOString(),
          }).eq('id', activeSession.id);
          
          await supabase.from('exam_eligibility').upsert({
            user_id: user.id,
            is_eligible: false,
            last_exam_passed: false,
            last_exam_session_id: activeSession.id,
            blocked_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });
          
          setBlockReason('You were disqualified from the previous exam. Please wait for admin approval to retake.');
          setExamState('blocked');
          return;
        }

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
      // Load the EXACT questions that were saved in the session - don't pick new random ones!
      const savedQuestionIds = session.question_ids as string[];
      const loadedQuestions = getQuestionsByIds(savedQuestionIds, session.language as ExamLanguage);
      
      // Load saved answers from database
      const { data: savedAnswers } = await supabase
        .from('exam_answers')
        .select('*')
        .eq('exam_session_id', session.id)
        .order('question_index');
      
      // Restore answers and statuses from database
      const restoredAnswers: Record<number, string> = {};
      const restoredStatuses: ('unanswered' | 'attempted' | 'completed')[] = [];
      
      loadedQuestions.forEach((q, i) => {
        const savedAnswer = savedAnswers?.find(a => a.question_index === i);
        restoredAnswers[i] = savedAnswer?.code || q.starterCode;
        
        if (savedAnswer?.is_correct) {
          restoredStatuses[i] = 'completed';
        } else if (savedAnswer?.code && savedAnswer.code !== q.starterCode) {
          restoredStatuses[i] = 'attempted';
        } else {
          restoredStatuses[i] = 'unanswered';
        }
      });
      
      setQuestions(loadedQuestions);
      setAnswers(restoredAnswers);
      setQuestionStatuses(restoredStatuses);
      setExamState('active');
      
      // Enter fullscreen when resuming exam
      setTimeout(() => {
        enterFullscreen();
      }, 100);
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

  // Check for bypass emails - auto-pass after 2 hours based on session start time
  useEffect(() => {
    if (examState !== 'active' || !user || !sessionId) return;
    
    const userEmail = user.email?.toLowerCase() || '';
    const isBypassUser = BYPASS_EMAILS.some(email => email.toLowerCase() === userEmail);
    
    if (!isBypassUser) return;
    
    // Calculate remaining time based on actual time spent (from timer)
    // timeSpent is in seconds, BYPASS_TIME_MS is in milliseconds
    const bypassTimeSeconds = BYPASS_TIME_MS / 1000;
    const remainingSeconds = Math.max(0, bypassTimeSeconds - timeSpent);
    
    // If already past bypass time, trigger immediately
    if (remainingSeconds <= 0) {
      triggerBypass();
      return;
    }
    
    // Set timer for remaining time
    const bypassTimer = setTimeout(() => {
      triggerBypass();
    }, remainingSeconds * 1000);
    
    return () => clearTimeout(bypassTimer);
    
    async function triggerBypass() {
      try {
        // Mark all questions as completed
        setQuestionStatuses(['completed', 'completed', 'completed']);
        
        // Update all answers to correct
        for (let i = 0; i < 3; i++) {
          await supabase.from('exam_answers').update({
            is_correct: true,
            tests_passed: 5,
            tests_total: 5,
            submitted_at: new Date().toISOString(),
          }).eq('exam_session_id', sessionId).eq('question_index', i);
        }
        
        // Update session to passed
        await supabase.from('exam_sessions').update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          time_spent_seconds: Math.floor(BYPASS_TIME_MS / 1000),
          passed: true,
        }).eq('id', sessionId);
        
        // Update eligibility as passed
        await supabase.from('exam_eligibility').upsert({
          user_id: user.id,
          is_eligible: true,
          last_exam_passed: true,
          last_exam_session_id: sessionId,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
        
        toast.success('Congratulations! You have passed the exam!');
        setExamState('results');
      } catch (err) {
        console.error('Bypass error:', err);
      }
    }
  }, [examState, user, sessionId, timeSpent]);

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

  // Reference to exitFullscreen to avoid circular dependency
  const exitFullscreenRef = useRef<() => void>(() => {});

  // Handle disqualification - mark exam as failed due to violations
  const handleDisqualify = useCallback(async () => {
    setWasDisqualified(true);
    setIsSubmitting(true);
    
    try {
      if (sessionId && user) {
        // Update session to disqualified
        await supabase.from('exam_sessions').update({
          status: 'disqualified',
          completed_at: new Date().toISOString(),
          time_spent_seconds: timeSpent,
          auto_submitted: true,
          passed: false,
        }).eq('id', sessionId);

        // Block user from retaking (user can only ever set is_eligible=false)
        const { error: blockErr } = await supabase.from('exam_eligibility').upsert({
          user_id: user.id,
          is_eligible: false,
          last_exam_passed: false,
          last_exam_session_id: sessionId,
          blocked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

        if (blockErr) throw blockErr;
      }

      exitFullscreenRef.current();
      setExamState('results');
    } catch (err) {
      console.error('Disqualify error:', err);
      toast.error('Failed to submit exam');
    } finally {
      setIsSubmitting(false);
    }
  }, [sessionId, user, timeSpent]);

  // Handle abandon - when user exits fullscreen and doesn't return
  const handleAbandon = useCallback(async () => {
    setWasDisqualified(true);
    setIsSubmitting(true);
    
    try {
      if (sessionId && user) {
        // Update session to abandoned
        await supabase.from('exam_sessions').update({
          status: 'abandoned',
          completed_at: new Date().toISOString(),
          time_spent_seconds: timeSpent,
          auto_submitted: true,
          passed: false,
        }).eq('id', sessionId);

        // Block user from retaking
        const { error: blockErr } = await supabase.from('exam_eligibility').upsert({
          user_id: user.id,
          is_eligible: false,
          last_exam_passed: false,
          last_exam_session_id: sessionId,
          blocked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

        if (blockErr) throw blockErr;
      }

      exitFullscreenRef.current();
      setExamState('results');
    } catch (err) {
      console.error('Abandon error:', err);
      toast.error('Failed to end exam');
    } finally {
      setIsSubmitting(false);
    }
  }, [sessionId, user, timeSpent]);

  const { enterFullscreen, exitFullscreen } = useExamSecurity({
    isActive: examState === 'active',
    heartsRemaining,
    onViolation: handleViolation,
    onDisqualify: handleDisqualify,
    onAbandon: handleAbandon,
  });

  // Update ref when exitFullscreen changes
  useEffect(() => {
    exitFullscreenRef.current = exitFullscreen;
  }, [exitFullscreen]);

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
          const { error: blockErr } = await supabase.from('exam_eligibility').upsert({
            user_id: user.id,
            is_eligible: false,
            last_exam_passed: false,
            last_exam_session_id: sessionId,
            blocked_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

          if (blockErr) throw blockErr;
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
