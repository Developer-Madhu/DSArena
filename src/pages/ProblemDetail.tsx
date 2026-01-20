import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, Home } from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { allProblemsData } from '@/lib/problemsData';
import { checkBonusEligibility, recordFastSolve, resetFastSolveStreak, getBonusCode } from '@/lib/bonusCodeSystem';
import { useMotivationToast } from '@/hooks/useMotivationToast';
import { useVideoRecommendations } from '@/hooks/useVideoRecommendations';
import { useLivesManager } from '@/hooks/useLivesManager';
import { useProblemExecution } from '@/hooks/useProblemExecution';
import { learningRecommender } from '@/lib/learningRecommender';
import { LivesDisplay } from '@/components/lives/LivesDisplay';
import { GlitchyAssistant } from '@/components/editor/GlitchyAssistant';
import { CodeAnalysisPanel } from '@/components/problems/CodeAnalysisPanel';
import { startProblemSession, endProblemSession, getCurrentSessionDuration } from '@/lib/timeTracking';

// Neural Editor components
import { ProblemDescriptionPane } from '@/components/arena/ProblemDescriptionPane';
import { NeuralEditorPane } from '@/components/arena/NeuralEditorPane';
import { ExecutionStreamPane } from '@/components/arena/ExecutionStreamPane';
import CompilerVisualizerModal from '@/components/arena/CompilerVisualizerModal';
import { generateStarterCode } from '@/lib/templateGenerator';

interface TestResult {
  passed: boolean;
  actual_output?: string;
  error?: string;
  runtime_ms?: number;
}

export default function ProblemDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [bonusApplied, setBonusApplied] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);

  const sessionStartedRef = useRef(false);
  const isLanguageSwitching = useRef(false);

  const { showMotivation } = useMotivationToast();
  const { triggerVideoRecommendation, resetFailures } = useVideoRecommendations();
  const { noLives, penalize, timeUntilRestore, formattedTimeRemaining } = useLivesManager(user?.id);
  const { running, submitting, results, consoleOutput, lastError, execute, setResults, setLastError } = useProblemExecution();

  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState(false);
  const [alreadySolved, setAlreadySolved] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const problem = allProblemsData.find(p => p.slug === slug);

  const isDSAProblem = useMemo(() => {
    if (!problem) return false;
    if (problem.language) return false;
    const category = problem.category.toLowerCase();
    const pythonCategories = ['python core', 'data structures', 'functions', 'oop', 'file handling', 'algorithms'];
    if (pythonCategories.some(c => category.includes(c.toLowerCase()) && problem.id.startsWith('python-'))) {
      return false;
    }
    return !category.includes('track');
  }, [problem]);

  const defaultLanguage = useMemo(() => {
    if (!problem) return 'python';
    if (problem.language) return problem.language;
    if (problem.id.startsWith('python-')) return 'python';
    if (problem.id.startsWith('js-') || problem.id.startsWith('javascript-')) return 'javascript';
    if (problem.id.startsWith('java-')) return 'java';
    if (problem.id.startsWith('cpp-') || problem.id.startsWith('c++-')) return 'cpp';

    const category = problem.category.toLowerCase();
    if (category.includes('javascript')) return 'javascript';
    if (category.includes('java')) return 'java';
    if (category.includes('c++')) return 'cpp';
    return 'python';
  }, [problem]);

  const editorLanguage = selectedLanguage || defaultLanguage;

  useEffect(() => {
    if (!selectedLanguage && defaultLanguage) {
      setSelectedLanguage(defaultLanguage);
    }
  }, [defaultLanguage, selectedLanguage]);

  useEffect(() => {
    const initializeCode = async () => {
      if (!editorLanguage || !problem || !user?.id) return;

      // Lock: Prevent auto-save during language switch/initialization
      isLanguageSwitching.current = true;

      const draftKey = `draft-${user.id}-${problem.id}-${editorLanguage}`;

      // 1. Try local storage first (instant)
      const savedLocalDraft = localStorage.getItem(draftKey);
      if (savedLocalDraft) {
        setCode(savedLocalDraft);
        isLanguageSwitching.current = false;
        return;
      }

      // 2. Fallback to cloud draft
      const { loadDraft, loadLastSubmission } = await import('@/lib/progressStorage');
      const savedCloudDraft = await loadDraft(user.id, problem.id);

      if (savedCloudDraft) {
        setCode(savedCloudDraft);
        localStorage.setItem(draftKey, savedCloudDraft);
        setLastSyncedAt(new Date());
      } else {
        // 3. Last fallback: Try to recover from recent submissions
        const lastSubmission = await loadLastSubmission(user.id, problem.id);
        if (lastSubmission) {
          setCode(lastSubmission);
          localStorage.setItem(draftKey, lastSubmission);
          setLastSyncedAt(new Date());
        } else {
          // 4. Default: Starter code
          setCode(generateStarterCode(problem, editorLanguage));
        }
      }

      // Unlock: Code is now loaded for the new language
      isLanguageSwitching.current = false;
    };

    initializeCode();
  }, [editorLanguage, user?.id, problem]);

  useEffect(() => {
    const checkIfSolved = async () => {
      if (!user || !problem) return;
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(problem.id);
      const filter = isUuid ? `problem_id.eq.${problem.id}` : `problem_slug.eq.${problem.id}`;
      const { data } = await supabase.from('user_solved').select('id').eq('user_id', user.id).or(filter).maybeSingle();
      if (data) { setAlreadySolved(true); setSolved(true); }
    };
    checkIfSolved();
  }, [user, problem]);

  const lastPenalizedRef = useRef<number>(0);

  // Consolidate focus violation penalties (visibility change and blur)
  useEffect(() => {
    if (noLives) return;

    const handleFocusLoss = () => {
      const now = Date.now();
      // Only penalize if we haven't penalized in the last 2 seconds to avoid double-firing
      if (now - lastPenalizedRef.current < 2000) return;

      if (document.hidden || !document.hasFocus()) {
        penalize();
        lastPenalizedRef.current = now;
      }
    };

    document.addEventListener('visibilitychange', handleFocusLoss);
    window.addEventListener('blur', handleFocusLoss);

    return () => {
      document.removeEventListener('visibilitychange', handleFocusLoss);
      window.removeEventListener('blur', handleFocusLoss);
    };
  }, [noLives, penalize]);

  useEffect(() => {
    if (!user?.id || !problem || sessionStartedRef.current) return;
    sessionStartedRef.current = true;
    startProblemSession(user.id, problem.id);
    const timerInterval = setInterval(() => setCurrentTime(getCurrentSessionDuration()), 1000);
    return () => {
      clearInterval(timerInterval);
      if (user?.id && sessionStartedRef.current) {
        endProblemSession(user.id, solved);
        sessionStartedRef.current = false;
      }
    };
  }, [user?.id, problem, solved]);

  useEffect(() => {
    // Guard: Skip auto-save if we're in the middle of switching languages
    if (isLanguageSwitching.current) return;

    if (problem && user?.id && code && !loading) {
      const draftKey = `draft-${user.id}-${problem.id}-${editorLanguage}`;
      localStorage.setItem(draftKey, code);

      // Debounced cloud save could be here, but for now we'll rely on handleSave 
      // or explicit save points to avoid spamming the DB
    }
  }, [code, user, problem, isDSAProblem, editorLanguage, loading]);

  useEffect(() => {
    if (!problem) { navigate('/problems'); return; }
    setLoading(false);
  }, [slug, problem, navigate]);

  const saveProgressHandler = async (runtimeMs?: number) => {
    if (!user || !problem) return;
    const solveTime = await endProblemSession(user.id, true, runtimeMs);
    if (solveTime !== null) await recordFastSolve(user.id, solveTime);
    const { saveProgress } = await import('@/lib/progressStorage');
    await saveProgress(user.id, problem.id, problem.difficulty, runtimeMs);
  };

  const runCode = async (submitAll = false) => {
    if (!problem || !user) return;
    setAttemptCount(prev => prev + 1);

    const testCasesToRun = submitAll ? [...problem.visibleTestCases, ...problem.hiddenTestCases] : problem.visibleTestCases;
    const formattedTestCases = testCasesToRun.map(tc => ({ input: tc.input, expectedOutput: tc.expectedOutput }));

    await execute({
      code,
      language: editorLanguage,
      testCases: formattedTestCases,
      problemId: problem.id,
      userId: user.id,
      onSuccess: async (executionResults, avgRuntime) => {
        // Auto-save logic on every run/submit for cross-device persistence
        const { saveDraft } = await import('@/lib/progressStorage');
        setSyncing(true);
        saveDraft(user.id, problem.id, code).then((res) => {
          if (res.success) setLastSyncedAt(new Date());
          setSyncing(false);
        }).catch(() => setSyncing(false));

        const passedCount = executionResults.filter(r => r.passed).length;
        const totalCount = executionResults.length;
        const topic = learningRecommender.detectTopic(problem.category);

        if (submitAll) {
          if (passedCount === totalCount) {
            setSolved(true);
            await saveProgressHandler(Math.round(avgRuntime));
            toast.success('FLAWLESS VICTORY. Rank adjusted.');
            resetFailures(topic);
          } else {
            toast.error(`Combat Result: ${passedCount} Hits, ${totalCount - passedCount} Misses.`);
            triggerVideoRecommendation(topic);
          }
        }
      }
    }, submitAll);
  };

  const handleSave = useCallback(async () => {
    if (problem && user?.id && code) {
      setSyncing(true);
      const draftKey = `draft-${user.id}-${problem.id}-${editorLanguage}`;
      localStorage.setItem(draftKey, code);

      const { saveDraft } = await import('@/lib/progressStorage');
      const result = await saveDraft(user.id, problem.id, code);

      setSyncing(false);
      if (result.success) {
        setLastSyncedAt(new Date());
        toast.success('Logic Uploaded to Mainframe. It\'s permanent now.');
      } else {
        toast.warning('Saved locally, but cloud sync failed');
      }
    }
  }, [code, user, problem, editorLanguage]);

  const handleHome = () => {
    navigate('/');
  };

  const handleNextQuestion = useCallback(() => {
    if (!problem) return;
    const currentIndex = allProblemsData.findIndex(p => p.slug === problem.slug);
    if (currentIndex !== -1 && currentIndex < allProblemsData.length - 1) {
      const nextProblem = allProblemsData[currentIndex + 1];
      navigate(`/problem/${nextProblem.slug}`);
    } else {
      toast.info('Map Edge Reached. Turn back or choose a new zone.');
    }
  }, [problem, navigate]);

  const handlePrevQuestion = useCallback(() => {
    if (!problem) return;
    const currentIndex = allProblemsData.findIndex(p => p.slug === problem.slug);
    if (currentIndex > 0) {
      const prevProblem = allProblemsData[currentIndex - 1];
      navigate(`/problem/${prevProblem.slug}`);
    } else {
      toast.info('Map Edge Reached. Turn back or choose a new zone.');
    }
  }, [problem, navigate]);

  if (loading || !problem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (noLives && !alreadySolved) {
    return (
      <div className="flex h-screen flex-col bg-[#030712]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <h2 className="text-2xl font-bold text-rose-500 mb-4 uppercase tracking-[0.2em]">System Locked</h2>
            <p className="text-slate-400 mb-6 font-mono text-sm leading-relaxed">
              Neural synchronization lost due to repeated focus violations. Restoring connectivity...
            </p>
            {formattedTimeRemaining && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-6">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Estimated Restore Time</p>
                <p className="text-4xl font-mono font-bold text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  {formattedTimeRemaining}
                </p>
              </div>
            )}
            <Button onClick={() => navigate('/learning-tracks')} variant="outline" className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 uppercase tracking-widest font-bold text-xs">
              Return to Station
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#030712] overflow-hidden">
      {/* <Navbar /> */}

      <div className="flex-1 relative overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Pane A: Problem Description */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="flex h-full flex-col">
              <ProblemDescriptionPane
                problem={problem}
                activeTab="description"
                onHome={handleHome}
              />
              {!alreadySolved && (
                <div className="p-4 border-t border-slate-800/50 bg-[#030712]">
                  <CodeAnalysisPanel
                    code={code}
                    language={editorLanguage}
                    problemSlug={problem.slug}
                    problemTitle={problem.title}
                    problemDifficulty={problem.difficulty}
                    problemCategory={problem.category}
                    attemptCount={attemptCount}
                  />
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-slate-800/50 hover:bg-cyan-500/30 transition-colors" />

          {/* Pane B: Editor */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full relative overflow-hidden">
              <NeuralEditorPane
                key={editorLanguage}
                code={code}
                setCode={setCode}
                language={editorLanguage}
                setLanguage={setSelectedLanguage}
                isLanguageLocked={false}
                onRun={() => runCode(false)}
                onSubmit={() => runCode(true)}
                onSave={handleSave}
                onNext={handleNextQuestion}
                onPrev={handlePrevQuestion}
                onVisualize={() => setIsVisualizerOpen(true)}
                running={running}
                submitting={submitting}
              />

              {/* Glitchy Assistant: Floating in bottom right of panel 2 */}
              <div className="absolute bottom-12 right-6 z-30">
                <GlitchyAssistant
                  code={code}
                  language={editorLanguage}
                  problemDescription={problem.description}
                  lastError={lastError}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-slate-800/50 hover:bg-cyan-500/30 transition-colors" />

          {/* Pane C: Execution Stream */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <ExecutionStreamPane
              results={results}
              consoleOutput={consoleOutput}
              status={running ? 'running' : submitting ? 'running' : 'idle'}
              testCases={problem.visibleTestCases.map(tc => ({
                input: tc.input,
                expected_output: tc.expectedOutput
              }))}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Footer Navigation */}
      <div className="h-8 bg-[#030712] border-t border-slate-800/50 px-4 flex items-center justify-between text-[10px] text-slate-600 font-bold tracking-widest uppercase shrink-0 z-10">
        <div className="flex items-center gap-4">
          <span className="hover:text-cyan-500 cursor-pointer transition-colors" onClick={() => navigate('/problems')}>Problems</span>
          <span className="text-slate-800">/</span>
          <span className="hover:text-cyan-500 cursor-pointer transition-colors" onClick={() => navigate(`/track/${problem.slug}`)}>{problem.category}</span>
          <span className="text-slate-800">/</span>
          <span className="text-slate-400 italic">{problem.title}</span>
          {lastSyncedAt && (
            <>
              <span className="text-slate-800">|</span>
              <span className="text-[9px] text-cyan-500/60 animate-in fade-in">
                {syncing ? 'SYNCING...' : `CLOUD SYNCED: ${lastSyncedAt.toLocaleTimeString()}`}
              </span>
            </>
          )}
        </div>
        <LivesDisplay />
      </div>
      {/* {isVisualizerOpen && (
        <CompilerVisualizerModal
          isOpen={isVisualizerOpen}
          onClose={() => setIsVisualizerOpen(false)}
          initialCode={code}
          language={editorLanguage}
        />
      )} */}
    </div>
  );
}
