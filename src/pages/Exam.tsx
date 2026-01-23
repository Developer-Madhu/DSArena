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
import { useProblemExecution } from '@/hooks/useProblemExecution';
import { useExamEvaluation } from '@/hooks/useExamEvaluation';
import { ExamLanguage, selectRandomQuestions, getQuestionsByIds, ExamQuestion, getLanguageDisplayName, calculateWeightedScore } from '@/lib/examUtils';
import { generateStarterCode } from '@/lib/templateGenerator';
import { EXAM_CONFIG } from '@/lib/constants';
import { ActiveExamInterface } from '@/components/exam/ActiveExamInterface';
import { ExamViolationOverlay } from '@/components/exam/ExamViolationOverlay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Ban, Terminal, Loader2 } from 'lucide-react';


type ExamState = 'loading' | 'blocked' | 'start' | 'active' | 'results';

export default function Exam() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [examState, setExamState] = useState<ExamState>('loading');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [language, setLanguage] = useState<ExamLanguage>('python');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questionStatuses, setQuestionStatuses] = useState<('unanswered' | 'attempted' | 'completed')[]>([]);
  const [isRevoked, setIsRevoked] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(EXAM_CONFIG.DEFAULT_DURATION_SECONDS);
  const abortControllerRef = useRef<AbortController | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const submitRef = useRef<(auto?: boolean) => void>(() => { });
  const exitFullscreenRef = useRef<() => void>(() => { });

  // Handlers required BEFORE hooks
  const handleTimeUp = useCallback(() => {
    setWasAutoSubmitted(true);
    if (submitRef.current) submitRef.current(true);
  }, []);

  const handleAutoSubmitOnZeroLives = useCallback(() => {
    if (submitRef.current) submitRef.current(true);
  }, []);

  const { timeRemaining, timeSpent, canSubmit, formatTime, getTimeUntilSubmit } = useExamTimer({
    totalSeconds,
    onTimeUp: handleTimeUp,
    isActive: examState === 'active',
  });

  const { isSubmitting, submitExam } = useExamEvaluation();
  const { running: isCompiling, results: testResults, consoleOutput, execute, setResults } = useProblemExecution();

  const [heartsRemaining, setHeartsRemaining] = useState(3);
  const [wasDisqualified, setWasDisqualified] = useState(false);
  const [wasAutoSubmitted, setWasAutoSubmitted] = useState(true); // Default to true if time's up
  const [isStarting, setIsStarting] = useState(false);
  const [blockReason, setBlockReason] = useState<string>('');

  const handleSubmit = useCallback(async (auto = false) => {
    // Strict business logic: Manual submission only allowed after 50% time
    if (!auto && !canSubmit) {
      const remainingSeconds = getTimeUntilSubmit();
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      toast.error(`Retreat Denied. Survive 50% of the timer before extraction. (${minutes}m ${seconds}s remaining)`);
      return;
    }

    await submitExam({
      sessionId,
      userId: user?.id,
      questionsCount: questions.length,
      timeSpent,
      wasDisqualified,
      heartsRemaining,
      exitFullscreen: () => exitFullscreenRef.current?.(),
      onSuccess: () => setExamState('results')
    }, auto);
  }, [submitExam, sessionId, user?.id, questions.length, timeSpent, wasDisqualified, heartsRemaining, canSubmit, getTimeUntilSubmit]);

  const handleRunCode = useCallback(async () => {
    const currentQuestion = questions[currentIndex];
    const code = answers[currentIndex] || '';
    if (!sessionId || !user || !currentQuestion || isCompiling) return;

    const allTestCases = [
      ...currentQuestion.visibleTestCases.map(tc => ({ input: tc.input, expectedOutput: tc.expectedOutput })),
      ...currentQuestion.hiddenTestCases.map(tc => ({ input: tc.input, expectedOutput: tc.expectedOutput })),
    ];

    await execute({
      code,
      language,
      testCases: allTestCases,
      problemId: currentQuestion.id,
      onSuccess: async (results) => {
        let allPassed = results.length > 0 && results.every((r: any) => r.passed);

        // Bypass logic for specific accounts
        if (user.email && EXAM_CONFIG.BYPASS_EMAILS.includes(user.email)) {
          allPassed = true;
        }

        const newStatuses = [...questionStatuses];
        newStatuses[currentIndex] = allPassed ? 'completed' : 'attempted';
        setQuestionStatuses(newStatuses);

        await supabase.from('exam_answers').update({
          code: code,
          is_correct: allPassed,
          tests_passed: allPassed ? (results.length || 1) : results.filter((r: any) => r.passed).length,
          tests_total: results.length || 1,
          compilation_errors: results.filter((r: any) => r.error?.includes('compile')).length,
          runtime_errors: results.filter((r: any) => r.error && !r.error.includes('compile')).length,
        }).eq('exam_session_id', sessionId).eq('question_index', currentIndex);

        if (allPassed) toast.success('FLAWLESS VICTORY. Rank adjusted.');
        else toast.info(`Combat Result: ${results.filter((r: any) => r.passed).length} Hits, ${results.length - results.filter((r: any) => r.passed).length} Misses.`);
      }
    });
  }, [questions, currentIndex, answers, sessionId, user, isCompiling, language, questionStatuses, execute]);

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
    await handleSubmit(true);
  }, [handleSubmit]);

  const handleAbandon = useCallback(async () => {
    setWasDisqualified(true);
    await handleSubmit(true);
  }, [handleSubmit]);

  const { enterFullscreen, exitFullscreen, warning } = useExamSecurity({
    isActive: examState === 'active',
    heartsRemaining,
    onViolation: handleViolation,
    onDisqualify: handleDisqualify,
    onAbandon: handleAbandon,
    onAutoSubmit: handleAutoSubmitOnZeroLives,
  });

  useEffect(() => { submitRef.current = handleSubmit; }, [handleSubmit]);
  useEffect(() => { exitFullscreenRef.current = exitFullscreen; }, [exitFullscreen]);

  // Initial Logic
  const checkEligibility = useCallback(async () => {
    if (!user || examState === 'active' || examState === 'results') return;
    try {
      const { data: eligibility } = await supabase.from('exam_eligibility').select('*').eq('user_id', user.id).maybeSingle();
      if (eligibility && !eligibility.is_eligible) {
        // Bypass logic for specific emails - check if bypass time has passed
        const isBypass = user.email && EXAM_CONFIG.BYPASS_EMAILS.includes(user.email);
        const blockedAt = eligibility.blocked_at ? new Date(eligibility.blocked_at).getTime() : 0;
        const now = Date.now();

        if (isBypass && (now - blockedAt > EXAM_CONFIG.BYPASS_TIME_MS)) {
          // Allow bypass - do not block
        } else {
          setBlockReason('Access blocked due to previous evaluation failure.');
          setExamState('blocked');
          return;
        }
      }

      const { data: activeSession } = await supabase.from('exam_sessions').select('*').eq('user_id', user.id).eq('status', 'in_progress').maybeSingle();
      if (activeSession) {
        if (activeSession.hearts_remaining <= 0) {
          setExamState('blocked');
          return;
        }
        setSessionId(activeSession.id);
        setLanguage(activeSession.language as ExamLanguage);
        setHeartsRemaining(activeSession.hearts_remaining);
        resumeExam(activeSession);
        return;
      }
      setExamState('start');
    } catch (e) {
      setExamState('start');
    }
  }, [user, examState]);

  const getStarterCode = (lang: string, inputFormat?: string) => {
    const problemMock: any = {
      inputFormat: inputFormat || `def solution():`,
      starterCode: lang === 'python' ? 'def solution():\n    pass' : '// Write code here'
    };
    return generateStarterCode(problemMock, lang);
  };

  const resumeExam = async (session: any) => {
    try {
      let loaded: ExamQuestion[] = [];

      if (session.exam_instance_id) {
        // Fetch instance and dynamic questions
        const { data: instanceData } = await supabase
          .from('exam_instances' as any)
          .select('duration_minutes')
          .eq('id', session.exam_instance_id)
          .single() as any;

        if (instanceData) {
          setTotalSeconds(instanceData.duration_minutes * 60);
        }

        // Fetch Questions filtered by the Session's Variant
        let query = supabase
          .from('exam_questions' as any)
          .select('*')
          .eq('exam_instance_id', session.exam_instance_id)
          .order('created_at', { ascending: true }); // Ensure consistent order

        if (session.assigned_variant) {
          query = query.eq('assigned_variant', session.assigned_variant);
        }

        const { data: qData, error } = await query as any;

        if (error || !qData) throw new Error('Hosted questions missing');

        loaded = qData.map((q: any, i: number) => ({
          id: q.id,
          title: q.title,
          description: q.description,
          difficulty: i === 0 ? 'easy' : (i === 1 ? 'medium' : 'hard'),
          starterCode: getStarterCode(session.language, q.input_format),
          visibleTestCases: q.test_cases.filter((tc: any) => !tc.hidden).map((tc: any) => ({
            input: tc.input,
            expectedOutput: tc.output || tc.expectedOutput
          })),
          hiddenTestCases: q.test_cases.filter((tc: any) => tc.hidden).map((tc: any) => ({
            input: tc.input,
            expectedOutput: tc.output || tc.expectedOutput
          })),
          timeLimitMs: 2000,
          memoryLimitMb: 256
        }));
      } else {
        // Standard static track questions
        loaded = getQuestionsByIds(session.question_ids, session.language);
      }

      const { data: savedAnswers } = await supabase.from('exam_answers').select('*').eq('exam_session_id', session.id).order('question_index');
      const restoredAnswers: Record<number, string> = {};
      const restoredStatuses: any[] = [];

      loaded.forEach((q: any, i: number) => {
        const ans = savedAnswers?.find(a => a.question_index === i);
        restoredAnswers[i] = ans?.code || q.starterCode;
        restoredStatuses[i] = ans?.is_correct ? 'completed' : (ans?.code ? 'attempted' : 'unanswered');
      });

      setQuestions(loaded);
      setAnswers(restoredAnswers);
      setQuestionStatuses(restoredStatuses);
      setExamState('active');
    } catch (e) {
      console.error('Resume failed:', e);
      setExamState('start');
    }
  };

  useEffect(() => { if (user) checkEligibility(); }, [user]);

  const handleStart = async (selectedLanguage: ExamLanguage, instanceData?: any) => {
    if (!user) return navigate('/auth');
    setIsStarting(true);

    // Generate Variant FIRST
    const variant = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];

    let finalQuestions: ExamQuestion[] = [];
    let instanceId: string | null = null;

    if (instanceData) {
      instanceId = instanceData.id;
      setTotalSeconds(instanceData.duration * 60);

      // 2. FILTER: Only keep questions that match the generated variant
      const filteredRawQuestions = instanceData.questions.filter((q: any) =>
        q.assigned_variant === variant
      );

      // Safety Check
      if (filteredRawQuestions.length === 0 && instanceData.questions.length > 0) {
        toast.error(`Configuration Error: Variant '${variant}' is empty in DB. Contact Host.`);
        setIsStarting(false);
        return;
      }

      // 3. MAP: Only the filtered questions become ExamQuestions
      finalQuestions = filteredRawQuestions.map((q: any, i: number) => ({
        id: q.id,
        title: q.title,
        description: q.description,
        difficulty: i === 0 ? 'easy' : (i === 1 ? 'medium' : 'hard'),
        starterCode: getStarterCode(selectedLanguage, q.input_format),
        visibleTestCases: q.test_cases.filter((tc: any) => !tc.hidden).map((tc: any) => ({
          input: tc.input,
          expectedOutput: tc.output || tc.expectedOutput
        })),
        hiddenTestCases: q.test_cases.filter((tc: any) => tc.hidden).map((tc: any) => ({
          input: tc.input,
          expectedOutput: tc.output || tc.expectedOutput
        })),
        timeLimitMs: 2000,
        memoryLimitMb: 256
      }));
    } else {
      finalQuestions = selectRandomQuestions(selectedLanguage, 3, selectedTopic);
    }

    setQuestions(finalQuestions);

    try {
      const { data: session, error } = await supabase.from('exam_sessions').insert({
        user_id: user.id,
        language: selectedLanguage,
        question_ids: finalQuestions.map(q => q.id),
        status: 'in_progress',
        exam_instance_id: instanceId,
        assigned_variant: variant
      }).select().single();

      if (error) throw error;
      setSessionId(session.id);
      setLanguage(selectedLanguage);
      setAnswers(Object.fromEntries(finalQuestions.map((q, i) => [i, q.starterCode])));
      setQuestionStatuses(new Array(finalQuestions.length).fill('unanswered'));

      for (let i = 0; i < finalQuestions.length; i++) {
        await supabase.from('exam_answers').insert({
          exam_session_id: session.id,
          user_id: user.id,
          question_id: finalQuestions[i].id,
          question_index: i,
          code: finalQuestions[i].starterCode,
        });
      }

      setExamState('active');
      setTimeout(() => enterFullscreen(), 100);
    } catch (err) {
      toast.error('Arena Gates Jammed. Contact an Admin immediately.');
    } finally {
      setIsStarting(false);
    }
  };

  const handleCodeChange = (code: string) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: code }));
    if (questionStatuses[currentIndex] === 'unanswered') {
      const news = [...questionStatuses];
      news[currentIndex] = 'attempted';
      setQuestionStatuses(news);
    }

    // Debounced Auto-save
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      handleSaveCode(code);
    }, 2000); // 2s debounce
  };

  const handleSaveCode = async (code: string) => {
    if (sessionId) {
      await supabase.from('exam_answers').update({ code }).eq('exam_session_id', sessionId).eq('question_index', currentIndex);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center p-4">Please log in.</div>;
  if (examState === 'loading') return <div className="min-h-screen bg-[#030712] flex items-center justify-center"><Loader2 className="animate-spin text-cyan-500" /></div>;
  if (examState === 'blocked') return <div className="min-h-screen flex items-center justify-center p-4"><Card className="max-w-md p-6 text-center"><Ban className="h-12 w-12 text-destructive mx-auto mb-4" /><h2 className="text-xl font-bold">Access Blocked</h2><p className="text-muted-foreground mt-2">{blockReason}</p><Button onClick={() => navigate('/dashboard')} className="mt-4">Dashboard</Button></Card></div>;
  if (examState === 'start') return <ExamStartScreen onStart={handleStart} isLoading={isStarting} selectedTopic={selectedTopic} />;
  if (examState === 'results' && sessionId) return <ExamResultsScreen examSessionId={sessionId} language={language} timeSpent={timeSpent} hearts={heartsRemaining} wasDisqualified={wasDisqualified} wasAutoSubmitted={wasAutoSubmitted} />;

  if (examState === 'active' && questions[currentIndex]) {
    return (
      <>
        <ActiveExamInterface
          language={language}
          question={questions[currentIndex]}
          questionIndex={currentIndex}
          totalQuestions={questions.length}
          heartsRemaining={heartsRemaining}
          timeRemaining={timeRemaining}
          formatTime={formatTime}
          canSubmit={canSubmit || (user.email ? EXAM_CONFIG.BYPASS_EMAILS.includes(user.email) : false)}
          timeUntilSubmit={getTimeUntilSubmit()}
          code={answers[currentIndex] || ''}
          onCodeChange={handleCodeChange}
          onSaveCode={handleSaveCode}
          onRunCode={handleRunCode}
          onSubmit={() => handleSubmit(false)}
          results={testResults}
          consoleOutput={consoleOutput}
          isCompiling={isCompiling}
          isSubmitting={isSubmitting}
          questionStatuses={questionStatuses}
          onPrevious={() => setCurrentIndex(i => Math.max(0, i - 1))}
          onNext={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
        />
        <ExamViolationOverlay isOpen={warning.isOpen} message={warning.message} endTime={warning.endTime} onReturn={enterFullscreen} />
      </>
    );
  }

  return null;
}
