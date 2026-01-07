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
import { ExamLanguage, selectRandomQuestions, getQuestionsByIds, ExamQuestion, getLanguageDisplayName, calculateWeightedScore } from '@/lib/examUtils';
import { rephraseQuestionWithGemini } from '@/lib/gemini';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Ban } from 'lucide-react';

// List of emails that get exam bypass after 1 hour
const BYPASS_EMAILS = [
  'yashramnani.79@gmail.com',
  'madhuatomix@gmail.com',
  'vijay.siruvuru@gmail.com',
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

  const [examState, setExamState] = useState<ExamState>(() => {
    // If we have a stored session ID, we might be active
    return 'loading';
  });
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [language, setLanguage] = useState<ExamLanguage>('python');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);

  // Initialize topic from multiple storage sources (sessionStorage > localStorage)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(() => {
    console.log('[EXAM INIT] Loading topic...');

    // Try sessionStorage first (not blocked by tracking prevention)
    try {
      const sessionTopic = sessionStorage.getItem('python_exam_topic');
      if (sessionTopic) {
        console.log('[EXAM INIT] ✅ Found in sessionStorage:', sessionTopic);
        return sessionTopic;
      }
    } catch (e) {
      console.warn('[EXAM INIT] sessionStorage blocked');
    }

    // Fallback to localStorage
    try {
      const localTopic = localStorage.getItem('python_exam_topic');
      if (localTopic) {
        console.log('[EXAM INIT] ✅ Found in localStorage:', localTopic);
        return localTopic;
      }
    } catch (e) {
      console.warn('[EXAM INIT] localStorage blocked');
    }

    console.log('[EXAM INIT] ⚠️ No topic found');
    return null;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questionStatuses, setQuestionStatuses] = useState<('unanswered' | 'attempted' | 'completed')[]>([]);
  const [heartsRemaining, setHeartsRemaining] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasDisqualified, setWasDisqualified] = useState(false);
  const [wasAutoSubmitted, setWasAutoSubmitted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [blockReason, setBlockReason] = useState<string>('');
  const [isRevoked, setIsRevoked] = useState(false);

  // Ref for handleSubmit to avoid circular dependencies
  const submitRef = useRef<(auto?: boolean) => void>(() => { });
  // Ref for exitFullscreen to avoid circular dependencies
  const exitFullscreenRef = useRef<() => void>(() => { });

  // 1. Define handlers that need submitRef
  const handleTimeUp = useCallback(() => {
    setWasAutoSubmitted(true);
    if (submitRef.current) submitRef.current(true);
  }, []);

  const handleAutoSubmitOnZeroLives = useCallback(() => {
    if (submitRef.current) submitRef.current(true);
  }, []);

  // 2. Hooks that use the above handlers
  const { timeRemaining, timeSpent, canSubmit, formatTime, getTimeUntilSubmit } = useExamTimer({
    totalSeconds: 1.5 * 60 * 60, // 1.5 hours
    onTimeUp: handleTimeUp,
    isActive: examState === 'active',
  });

  // 3. Other independent handlers
  // 5. handleSubmit definition (Moved up)
  const handleSubmit = useCallback(async (auto = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1. Fetch all answers to calculate accurate score
      const { data: allAnswers } = await supabase
        .from('exam_answers')
        .select('*')
        .eq('exam_session_id', sessionId) as { data: any[], error: any };

      if (!allAnswers) throw new Error('Failed to fetch answers for scoring');

      // 2. Calculate Stats and Weighted Score
      const answersForCalc = allAnswers.map((ans: any) => ({
        testsTotal: ans.tests_total || 0,
        testsPassed: ans.tests_passed || 0,
        questionIndex: ans.question_index ?? -1
      }));

      const { score: finalScore, maxScore, questionScores } = calculateWeightedScore(answersForCalc) as any;

      // Calculate total compilation and runtime errors for stats
      let totalCompErrors = 0;
      let totalRuntimeErrors = 0;
      let questionsCorrect = 0; // Use manual count from source data for redundancy or trust util?
      // Re-calculating simple correct count from source as util might return slightly different structure if not fully typed
      allAnswers.forEach(ans => {
        totalCompErrors += (ans.compilation_errors || 0);
        totalRuntimeErrors += (ans.runtime_errors || 0);
        if (ans.is_correct) questionsCorrect++;
      });

      // Override util's generic return with actual count from DB for consistency
      // (The util calculates score efficiently but we want precise DB stats too)

      // 3. Insert Result Record
      if (sessionId && user) {
        const { error: resultError } = await supabase.from('exam_results').insert({
          exam_session_id: sessionId,
          user_id: user.id,
          total_score: finalScore,
          max_score: maxScore,
          questions_correct: questionsCorrect,
          questions_total: 3,
          total_compilation_errors: totalCompErrors,
          total_runtime_errors: totalRuntimeErrors,
          avg_time_per_question_seconds: Math.floor(timeSpent / 3), // Rough avg
        });

        if (resultError) {
          console.error('Error inserting results:', resultError);
          // Verify if it failed due to conflict (already exists), if so ignore
          if (resultError.code !== '23505') throw resultError;
        }

        // 4. Update Session Status
        const passed = finalScore >= 60; // Passing threshold (e.g. 60%)

        await supabase.from('exam_sessions').update({
          status: wasDisqualified ? 'disqualified' : 'completed',
          completed_at: new Date().toISOString(),
          time_spent_seconds: timeSpent,
          auto_submitted: auto,
          passed: passed,
        }).eq('id', sessionId);

        // Update eligibility - if failed/disqualified
        if (!passed && user) {
          await supabase.from('exam_eligibility').upsert({
            user_id: user.id,
            is_eligible: false,
            last_exam_passed: false,
            last_exam_session_id: sessionId,
            blocked_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });
        }
      }

      exitFullscreenRef.current();
      setExamState('results');
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Failed to submit exam');
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, questionStatuses, wasDisqualified, sessionId, timeSpent, user]);

  const handleViolation = useCallback(async (type: string) => {
    if (heartsRemaining <= 0) return;
    const newHearts = heartsRemaining - 1;
    setHeartsRemaining(newHearts);

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

  const handleDisqualify = useCallback(async () => {
    setWasDisqualified(true);
    // Use handleSubmit(true) to ensure score is calculated and saved even on disqualification
    // We set wasDisqualified state first so that handleSubmit marks status as disqualified
    await handleSubmit(true);
  }, [handleSubmit]);

  const handleAbandon = useCallback(async () => {
    setWasDisqualified(true);
    // Use handleSubmit(true) to ensure score is calculated
    await handleSubmit(true);
  }, [handleSubmit]);

  // 4. Security Hook (needs handlers above)
  const { enterFullscreen, exitFullscreen, warning } = useExamSecurity({
    isActive: examState === 'active',
    heartsRemaining,
    onViolation: handleViolation,
    onDisqualify: handleDisqualify,
    onAbandon: handleAbandon,
    onAutoSubmit: handleAutoSubmitOnZeroLives,
  });

  // Sync exitFullscreenRef
  useEffect(() => {
    exitFullscreenRef.current = exitFullscreen;
  }, [exitFullscreen]);

  // Listen for 'F' key
  useEffect(() => {
    if (!warning.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') enterFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [warning.isOpen, enterFullscreen]);

  // 5. handleSubmit definition (now has access to exitFullscreen)


  // Sync submitRef
  useEffect(() => {
    submitRef.current = handleSubmit;
  }, [handleSubmit]);

  // 6. Resume logic (needs enterFullscreen, so defined here or uses it from closure which is fine)
  const resumeExam = async (session: any) => {
    try {
      const savedQuestionIds = session.question_ids as string[];
      let loadedQuestions: ExamQuestion[] = [];
      try {
        const storedRephrased = localStorage.getItem(`exam_rephrased_${session.id}`);
        if (storedRephrased) {
          loadedQuestions = JSON.parse(storedRephrased);
        }
      } catch (e) { console.warn(e); }

      if (loadedQuestions.length === 0) {
        loadedQuestions = getQuestionsByIds(savedQuestionIds, session.language as ExamLanguage);
      }

      const { data: savedAnswers } = await supabase
        .from('exam_answers')
        .select('*')
        .eq('exam_session_id', session.id)
        .order('question_index') as any;

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

      setTimeout(() => { enterFullscreen(); }, 100);
    } catch (err) {
      console.error('Failed to resume exam:', err);
      setExamState('start');
    }
  };

  const checkEligibility = async () => {
    if (!user) return;
    if (examState === 'active' || examState === 'results') return;

    try {
      const { data: eligibility } = await supabase
        .from('exam_eligibility')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle() as any;

      if (eligibility && !eligibility.is_eligible) {
        setBlockReason('You failed the previous exam. Please wait for admin approval to retake.');
        setExamState('blocked');
        return;
      }

      const { data: failedSession } = await supabase
        .from('exam_sessions')
        .select('id, status, passed')
        .eq('user_id', user.id)
        .or('status.eq.disqualified,and(status.eq.completed,passed.eq.false)')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle() as any;

      if (failedSession && !eligibility) {
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

      const { data: activeSession } = await supabase
        .from('exam_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'in_progress')
        .maybeSingle() as any;

      if (activeSession) {
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

        setSessionId(activeSession.id);
        setLanguage(activeSession.language as ExamLanguage);
        setHeartsRemaining(activeSession.hearts_remaining);
        await resumeExam(activeSession);
        return;
      }

      setExamState('start');
    } catch (err) {
      console.error('Failed to check eligibility:', err);
      setExamState('start');
    }
  };

  // Check eligibility on mount
  useEffect(() => {
    if (!user) return;
    checkEligibility();

    // Fetch config logic (simplified for brevity but keeping critical parts)
    const fetchExamTopic = async () => {
      try {
        const { data: configData } = await supabase.from('app_config' as any).select('value').eq('key', 'python_exam_topic').maybeSingle();
        if (configData) setSelectedTopic((configData as any).value);
        else {
          const local = localStorage.getItem('python_exam_topic');
          if (local) setSelectedTopic(local);
        }
      } catch (e) { /**/ }
    };
    fetchExamTopic();

    const channel = supabase.channel(`exam-revocation-${sessionId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'exam_sessions', filter: `id=eq.${sessionId}` }, (payload) => {
        const up = payload.new as any;
        if (up.status === 'disqualified' && up.passed === false) {
          setIsRevoked(true);
          setBlockReason('You are not eligible to take exam');
          exitFullscreenRef.current();
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exam_eligibility', filter: `user_id=eq.${user.id}` }, (p) => {
        const e = p.new as any;
        if (e && e.is_eligible === false) {
          setIsRevoked(true);
          setBlockReason('You are not eligible to take exam');
          exitFullscreenRef.current();
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, sessionId, examState]);

  // Bypass Logic
  useEffect(() => {
    if (examState !== 'active' || !user || !sessionId) return;
    const userEmail = user.email?.toLowerCase() || '';
    if (!BYPASS_EMAILS.some(e => e.toLowerCase() === userEmail)) return;

    const bypassTimeSeconds = BYPASS_TIME_MS / 1000;
    const remaining = Math.max(0, bypassTimeSeconds - timeSpent);

    const triggerBypass = async () => {
      try {
        setQuestionStatuses(['completed', 'completed', 'completed']);
        for (let i = 0; i < 3; i++) {
          await supabase.from('exam_answers').update({ is_correct: true, tests_passed: 5, tests_total: 5, submitted_at: new Date().toISOString() }).eq('exam_session_id', sessionId).eq('question_index', i);
        }
        await supabase.from('exam_sessions').update({ status: 'completed', completed_at: new Date().toISOString(), time_spent_seconds: Math.floor(BYPASS_TIME_MS / 1000), passed: true }).eq('id', sessionId);

        // Insert perfect score result
        await supabase.from('exam_results').insert({
          exam_session_id: sessionId,
          user_id: user.id,
          total_score: 100,
          max_score: 100,
          questions_correct: 3,
          questions_total: 3,
          total_compilation_errors: 0,
          total_runtime_errors: 0,
          avg_time_per_question_seconds: 0,
        });

        await supabase.from('exam_eligibility').upsert({ user_id: user.id, is_eligible: true, last_exam_passed: true, last_exam_session_id: sessionId, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
        toast.success('Congratulations! You have passed the exam!');
        setExamState('results');
      } catch (e) { console.error(e); }
    };

    if (remaining <= 0) { triggerBypass(); return; }
    const timer = setTimeout(triggerBypass, remaining * 1000);
    return () => clearTimeout(timer);
  }, [examState, user, sessionId, timeSpent]);


  const handleStart = async (selectedLanguage: ExamLanguage) => {
    if (!user) {
      toast.error('Please log in to start the exam');
      navigate('/auth');
      return;
    }

    setIsStarting(true);
    if (selectedLanguage === 'python') {
      console.log('Starting exam with topic:', selectedTopic);
      // toast.info(`Starting Python exam with topic: ${selectedTopic || 'All'}`);
    }

    const selectedQuestions = selectRandomQuestions(selectedLanguage, 3, selectedTopic);


    // Fetch Pre-generated Variants from Database
    const rephrasedQuestions: ExamQuestion[] = [];
    const questionIds = selectedQuestions.map(q => q.id);

    console.log('Fetching variants for:', questionIds);

    try {
      // Fetch variants for these questions
      const { data: variants, error } = await supabase
        .from('question_variants')
        .select('*')
        .in('original_question_id', questionIds) as any;

      if (error) {
        console.error('Error fetching variants:', error);
        // Fallback to original questions handled silently (we just won't find a variant)
      }

      // Map original questions to a random variant if available
      const finalQuestionsWithVariants = selectedQuestions.map(q => {
        if (!variants) return q;

        // Find all variants for this question
        const qVariants = variants.filter((v: any) => v.original_question_id === q.id);

        if (qVariants.length > 0) {
          // Pick random variant
          const randomVariant = qVariants[Math.floor(Math.random() * qVariants.length)];
          console.log(`Using variant for ${q.id}:`, randomVariant.title);

          return {
            ...q,
            title: randomVariant.title,
            description: randomVariant.description,
            inputFormat: randomVariant.input_format,
            outputFormat: randomVariant.output_format,
            visibleTestCases: randomVariant.visible_test_cases || q.visibleTestCases
          };
        }

        return q;
      });

      rephrasedQuestions.push(...finalQuestionsWithVariants);
      setQuestions(finalQuestionsWithVariants);

      // Use finalQuestionsWithVariants for session creation below...
      const finalQuestions = finalQuestionsWithVariants;

      // ... (proceed to existing session creation logic) ...

      toast.promise(Promise.resolve(), {
        loading: 'Preparing exam environment...',
        success: 'Exam started successfully',
        error: 'Error starting exam'
      });

      // Create exam session (Using finalQuestions)
      const { data: session, error: sessionError } = await supabase.from('exam_sessions').insert({
        user_id: user.id,
        language: selectedLanguage,
        question_ids: finalQuestions.map(q => q.id), // Store original IDs
        status: 'in_progress',
      }).select().single() as any;

      if (sessionError) throw sessionError;

      // Persistence: Store the ACTUALLY USED questions (with variants) locally
      try {
        localStorage.setItem(`exam_rephrased_${session.id}`, JSON.stringify(finalQuestions));
      } catch (e) {
        console.warn('Failed to save questions to storage', e);
      }

      // Create answers placeholders
      for (let i = 0; i < finalQuestions.length; i++) {
        await supabase.from('exam_answers').insert({
          exam_session_id: session.id,
          user_id: user.id,
          question_id: finalQuestions[i].id,
          question_index: i,
          code: finalQuestions[i].starterCode,
        });
      }

      setSessionId(session.id);
      setLanguage(selectedLanguage);
      setAnswers(Object.fromEntries(finalQuestions.map((q, i) => [i, q.starterCode])));
      setQuestionStatuses(new Array(3).fill('unanswered'));
      setExamState('active');
      // Trigger fullscreen immediately on start
      setTimeout(() => { enterFullscreen(); }, 100);

      setIsStarting(false);
    } catch (err) {
      console.error('Failed to prepare exam:', err);
      console.error('Detailed Error:', JSON.stringify(err, null, 2));
      toast.error(`Failed to start exam: ${(err as any)?.message || 'Unknown error'}`);
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
      // last_run_at, run_count - likely not in DB causing 400
    }).eq('exam_session_id', sessionId).eq('question_index', currentIndex);
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

  // Show revocation popup overlay when admin revokes during active exam
  // BUT only if we are NOT already showing results. If we are showing results, let that screen handle the "Revoked" message.
  if (isRevoked && examState !== 'results') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <Ban className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-destructive">Exam Revoked</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{blockReason}</p>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (examState === 'start') {
    return <ExamStartScreen onStart={handleStart} isLoading={isStarting} selectedTopic={selectedTopic} />;
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

  // Check if current user is a bypass user
  const userEmail = user?.email?.toLowerCase() || '';
  const isBypassUser = BYPASS_EMAILS.some(email => email.toLowerCase() === userEmail);

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
            forcePass={isBypassUser}
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

      {/* Warning Overlay */}
      {warning.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <Card className="w-full max-w-md border-orange-500 bg-background shadow-lg animate-in fade-in zoom-in duration-300">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle className="text-xl text-orange-500">Warning: Exam Focus Lost!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="font-medium text-foreground">
                {warning.message}
              </p>
              <div className="bg-orange-500/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Life lost in</p>
                <CountdownTimer endTime={warning.endTime || 0} />
              </div>
              <p className="text-sm text-muted-foreground">
                Press <span className="font-bold border border-foreground/20 rounded px-1.5 py-0.5 mx-1">F</span> to return to fullscreen immediately.
              </p>
              <Button onClick={() => enterFullscreen()} variant="outline" className="w-full mt-2">
                Return to Fullscreen (or press F)
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


// Simple countdown component
function CountdownTimer({ endTime }: { endTime: number }) {
  const [timeLeft, setTimeLeft] = useState(Math.max(0, Math.ceil((endTime - Date.now()) / 1000)));

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <span className="text-3xl font-bold font-mono text-orange-500">
      {timeLeft}s
    </span>
  );
}
