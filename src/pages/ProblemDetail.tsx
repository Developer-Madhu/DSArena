import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { TestCasePanel } from '@/components/problems/TestCasePanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { problemsData } from '@/lib/problemsData';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Play, Send, Save, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestCase {
  id: string;
  input: string;
  expected_output: string;
  is_visible: boolean;
  display_order: number;
}

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
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [showDescription, setShowDescription] = useState(true);

  // Find problem from local data
  const problem = problemsData.find(p => p.slug === slug);

  // Convert visible test cases to the format expected by TestCasePanel
  const testCases: TestCase[] = problem?.visibleTestCases.map((tc, index) => ({
    id: `tc-${index}`,
    input: tc.input,
    expected_output: tc.expectedOutput,
    is_visible: true,
    display_order: index,
  })) || [];

  useEffect(() => {
    if (!problem) {
      toast.error('Problem not found');
      navigate('/problems');
      return;
    }
    setCode(problem.starterCode);
    setLoading(false);
  }, [slug, problem, navigate]);

  // Load draft from localStorage
  useEffect(() => {
    if (problem && user) {
      const draftKey = `draft-${user.id}-${problem.id}`;
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        setCode(savedDraft);
      }
    }
  }, [problem, user]);

  const saveDraft = useCallback(() => {
    if (!user || !problem) {
      toast.error('Please sign in to save your draft');
      return;
    }
    const draftKey = `draft-${user.id}-${problem.id}`;
    localStorage.setItem(draftKey, code);
    toast.success('Draft saved');
  }, [user, problem, code]);

  const runCode = async (submitAll = false) => {
    if (!problem) return;

    if (!user) {
      toast.error('Please sign in to run code');
      return;
    }

    if (submitAll) {
      setSubmitting(true);
    } else {
      setRunning(true);
    }
    setResults(null);
    setConsoleOutput('');

    try {
      const testCasesToRun = submitAll 
        ? [...problem.visibleTestCases, ...problem.hiddenTestCases]
        : problem.visibleTestCases;

      const formattedTestCases = testCasesToRun.map(tc => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
      }));

      const { data, error } = await supabase.functions.invoke('execute-code', {
        body: { code, testCases: formattedTestCases },
      });

      if (error) {
        throw new Error(error.message || 'Failed to execute code');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data.results);
      setConsoleOutput(data.consoleOutput || '');

      const passedCount = data.results.filter((r: TestResult) => r.passed).length;
      const totalCount = data.results.length;

      if (submitAll) {
        if (passedCount === totalCount) {
          toast.success(`All ${totalCount} test cases passed!`);
        } else {
          toast.error(`${passedCount}/${totalCount} test cases passed`);
        }
      } else {
        if (passedCount === totalCount) {
          toast.success(`All visible test cases passed!`);
        } else {
          toast.info(`${passedCount}/${totalCount} visible test cases passed`);
        }
      }
    } catch (error: any) {
      console.error('Execution error:', error);
      toast.error(error.message || 'Failed to run code');
      setConsoleOutput(error.message || 'An error occurred');
    } finally {
      setRunning(false);
      setSubmitting(false);
    }
  };

  const difficultyConfig = {
    easy: { label: 'Easy', className: 'difficulty-easy' },
    medium: { label: 'Medium', className: 'difficulty-medium' },
    hard: { label: 'Hard', className: 'difficulty-hard' },
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!problem) {
    return null;
  }

  const config = difficultyConfig[problem.difficulty];

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Problem Description Panel */}
          <ResizablePanel
            defaultSize={40}
            minSize={showDescription ? 25 : 0}
            maxSize={showDescription ? 60 : 0}
            className={cn(!showDescription && 'hidden')}
          >
            <div className="flex h-full flex-col">
              {/* Problem Header */}
              <div className="border-b border-border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-xl font-bold">{problem.title}</h1>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className={cn('border', config.className)}>
                        {config.label}
                      </Badge>
                      <Badge variant="secondary">{problem.category}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem Content */}
              <ScrollArea className="flex-1">
                <div className="space-y-6 p-4">
                  {/* Description */}
                  <div>
                    <h3 className="mb-2 font-semibold">Description</h3>
                    <div className="prose prose-invert max-w-none text-sm text-foreground">
                      <p className="whitespace-pre-wrap">{problem.description}</p>
                    </div>
                  </div>

                  {/* Input Format */}
                  {problem.inputFormat && (
                    <div>
                      <h3 className="mb-2 font-semibold">Input Format</h3>
                      <pre className="rounded-lg bg-muted p-3 text-sm whitespace-pre-wrap">
                        {problem.inputFormat}
                      </pre>
                    </div>
                  )}

                  {/* Output Format */}
                  {problem.outputFormat && (
                    <div>
                      <h3 className="mb-2 font-semibold">Output Format</h3>
                      <pre className="rounded-lg bg-muted p-3 text-sm whitespace-pre-wrap">
                        {problem.outputFormat}
                      </pre>
                    </div>
                  )}

                  {/* Constraints */}
                  {problem.constraints && (
                    <div>
                      <h3 className="mb-2 font-semibold">Constraints</h3>
                      <pre className="rounded-lg bg-muted p-3 text-sm whitespace-pre-wrap">
                        {problem.constraints}
                      </pre>
                    </div>
                  )}

                  {/* Limits */}
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Time Limit: {problem.timeLimitMs}ms</span>
                    <span>Memory Limit: {problem.memoryLimitMb}MB</span>
                  </div>

                  {/* Examples */}
                  <div>
                    <h3 className="mb-3 font-semibold">Examples</h3>
                    <div className="space-y-4">
                      {testCases.slice(0, 3).map((tc, index) => (
                        <div
                          key={tc.id}
                          className="rounded-lg border border-border bg-card p-4"
                        >
                          <div className="mb-2 text-sm font-medium text-muted-foreground">
                            Example {index + 1}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <div className="mb-1 text-xs font-medium text-muted-foreground">
                                Input
                              </div>
                              <pre className="rounded bg-muted p-2 font-mono text-sm">
                                {tc.input}
                              </pre>
                            </div>
                            <div>
                              <div className="mb-1 text-xs font-medium text-muted-foreground">
                                Output
                              </div>
                              <pre className="rounded bg-muted p-2 font-mono text-sm">
                                {tc.expected_output}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <ResizablePanelGroup direction="vertical">
              {/* Editor */}
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="flex h-full flex-col">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between border-b border-border px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowDescription(!showDescription)}
                        className="rounded p-1 hover:bg-secondary"
                      >
                        {showDescription ? (
                          <ChevronLeft className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <span className="text-sm font-medium">Python 3.11</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={saveDraft}
                        disabled={!user}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </div>

                  {/* Editor Content */}
                  <div className="flex-1">
                    <CodeEditor
                      value={code}
                      onChange={setCode}
                      language="python"
                    />
                  </div>

                  {/* Editor Footer */}
                  <div className="flex items-center justify-between border-t border-border px-4 py-3">
                    <span className="text-xs text-muted-foreground">
                      Paste disabled — type your solution
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => runCode(false)}
                        disabled={running || submitting}
                      >
                        {running ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Play className="mr-2 h-4 w-4" />
                        )}
                        Run
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => runCode(true)}
                        disabled={running || submitting}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {submitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Test Results Panel */}
              <ResizablePanel defaultSize={40} minSize={20}>
                <TestCasePanel
                  testCases={testCases}
                  results={results || undefined}
                  isRunning={running || submitting}
                  consoleOutput={consoleOutput}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
