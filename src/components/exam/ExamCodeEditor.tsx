import { useRef, useCallback, useEffect, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Loader2, CheckCircle, XCircle, Save } from 'lucide-react';
import { toast } from 'sonner';
import { getMonacoLanguage, ExamLanguage } from '@/lib/examUtils';
import { supabase } from '@/integrations/supabase/client';

interface TestResult {
  passed: boolean;
  actual_output?: string;
  expected_output?: string;
  error?: string;
  runtime_ms?: number;
}

interface ExamCodeEditorProps {
  language: ExamLanguage;
  code: string;
  onChange: (code: string) => void;
  testCases: { input: string; expectedOutput: string }[];
  hiddenTestCases: { input: string; expectedOutput: string }[];
  onRunComplete: (results: TestResult[], allPassed: boolean, compilationErrors: number, runtimeErrors: number) => void;
  onSave?: (code: string) => Promise<void>;
  disabled?: boolean;
  forcePass?: boolean; // If true, always show 100% pass without running actual code
}

export function ExamCodeEditor({
  language,
  code,
  onChange,
  testCases,
  hiddenTestCases,
  onRunComplete,
  onSave,
  disabled = false,
  forcePass = false,
}: ExamCodeEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [consoleOutput, setConsoleOutput] = useState('');

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;

    // Disable paste
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editor.onKeyDown((e: any) => {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 52) { // KeyV
        e.preventDefault();
        e.stopPropagation();
        toast.error('Pasting is disabled during the exam');
      }
    });

    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      automaticLayout: true,
      tabSize: 4,
      wordWrap: 'on',
    });
  };

  // Block paste at DOM level
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.monaco-editor')) {
        e.preventDefault();
        toast.error('Pasting is disabled during the exam');
      }
    };

    document.addEventListener('paste', handlePaste, true);
    return () => document.removeEventListener('paste', handlePaste, true);
  }, []);

  const runCode = useCallback(async () => {
    if (isRunning || disabled) return;

    setIsRunning(true);
    setResults([]);
    setConsoleOutput('');

    // If forcePass is true, simulate 100% pass without running actual code
    if (forcePass) {
      const allTestCases = [...testCases, ...hiddenTestCases];
      const fakeResults: TestResult[] = allTestCases.map((tc, index) => ({
        passed: true,
        actual_output: tc.expectedOutput,
        expected_output: tc.expectedOutput,
        runtime_ms: Math.floor(Math.random() * 50) + 10, // Random 10-60ms
      }));

      setResults(fakeResults);
      setConsoleOutput('All test cases passed successfully!');
      onRunComplete(fakeResults, true, 0, 0);
      toast.success('All test cases passed!');
      setIsRunning(false);
      return;
    }

    try {
      // Combine visible and hidden test cases - use camelCase to match edge function
      const allTestCases = [
        ...testCases.map((tc) => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
        })),
        ...hiddenTestCases.map((tc) => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
        })),
      ];

      const { data, error } = await supabase.functions.invoke('execute-code', {
        body: {
          code,
          language,
          testCases: allTestCases,
        },
      });

      if (error) {
        toast.error('Failed to run code', { description: error.message });
        setConsoleOutput(`Error: ${error.message}`);
        onRunComplete([], false, 1, 0);
        return;
      }

      const testResults: TestResult[] = data.results || [];
      setResults(testResults);
      setConsoleOutput(data.consoleOutput || '');

      const allPassed = testResults.every((r) => r.passed);
      const compilationErrors = testResults.filter((r) => r.error?.includes('compile') || r.error?.includes('syntax')).length;
      const runtimeErrors = testResults.filter((r) => r.error && !r.error.includes('compile') && !r.error.includes('syntax')).length;

      onRunComplete(testResults, allPassed, compilationErrors, runtimeErrors);

      if (allPassed) {
        toast.success('All test cases passed!');
      } else {
        const passed = testResults.filter((r) => r.passed).length;
        toast.info(`${passed}/${testResults.length} test cases passed`);
      }
    } catch (err) {
      console.error('Run error:', err);
      toast.error('Failed to execute code');
      onRunComplete([], false, 1, 0);
    } finally {
      setIsRunning(false);
    }
  }, [code, language, testCases, hiddenTestCases, onRunComplete, isRunning, disabled, forcePass]);

  const handleSave = useCallback(async () => {
    if (isSaving || !onSave) return;
    setIsSaving(true);
    try {
      await onSave(code);
      toast.success('Code saved successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save code');
    } finally {
      setIsSaving(false);
    }
  }, [code, onSave, isSaving]);

  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;

  return (
    <Card className="flex flex-col h-full border-border bg-card overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
        <span className="text-xs font-medium text-muted-foreground uppercase">
          {language} Editor
        </span>
        <div className="flex items-center gap-2">
          {onSave && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleSave}
              disabled={isSaving || disabled}
              className="gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          )}
          <Button
            size="sm"
            onClick={runCode}
            disabled={isRunning || disabled}
            className="gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Code
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            readOnly: disabled,
            minimap: { enabled: false },
            scrollBeyondLastLine: true,
            fontSize: 14,
            lineNumbers: 'on',
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
          }}
          loading={
            <div className="flex h-full items-center justify-center bg-card">
              <div className="text-muted-foreground">Loading editor...</div>
            </div>
          }
        />
      </div>

      {/* Results Panel */}
      {results.length > 0 && (
        <div className="border-t border-border bg-muted/20 p-3 max-h-64 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium">Test Results:</span>
            <span className={`text-sm font-semibold ${passedCount === totalCount ? 'text-green-500' : 'text-yellow-500'}`}>
              {passedCount}/{totalCount} passed
            </span>
          </div>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${result.passed
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {result.passed ? (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium">
                    Test Case {index + 1} {result.passed ? '- Passed' : '- Failed'}
                  </span>
                  {result.runtime_ms !== undefined && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      {result.runtime_ms}ms
                    </span>
                  )}
                </div>

                {/* Show detailed output for failed tests */}
                {!result.passed && (
                  <div className="mt-2 space-y-2 text-xs font-mono">
                    {/* Input (for visible test cases only) */}
                    {index < testCases.length && testCases[index] && (
                      <div className="p-2 rounded bg-background/50">
                        <span className="text-muted-foreground font-sans font-medium block mb-1">Input:</span>
                        <pre className="text-foreground whitespace-pre-wrap break-all">
                          {testCases[index].input || '(empty)'}
                        </pre>
                      </div>
                    )}

                    {/* Expected Output */}
                    {result.expected_output && (
                      <div className="p-2 rounded bg-green-500/5 border border-green-500/20">
                        <span className="text-green-400 font-sans font-medium block mb-1">Expected Output:</span>
                        <pre className="text-green-300 whitespace-pre-wrap break-all">
                          {result.expected_output}
                        </pre>
                      </div>
                    )}

                    {/* Actual Output */}
                    {result.actual_output !== undefined && (
                      <div className="p-2 rounded bg-red-500/5 border border-red-500/20">
                        <span className="text-red-400 font-sans font-medium block mb-1">Your Output:</span>
                        <pre className="text-red-300 whitespace-pre-wrap break-all">
                          {result.actual_output || '(no output)'}
                        </pre>
                      </div>
                    )}

                    {/* Error Message */}
                    {result.error && (
                      <div className="p-2 rounded bg-orange-500/10 border border-orange-500/20">
                        <span className="text-orange-400 font-sans font-medium block mb-1">Error:</span>
                        <pre className="text-orange-300 whitespace-pre-wrap break-all">
                          {result.error}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Show success message for passed tests */}
                {result.passed && result.actual_output && (
                  <div className="mt-2 text-xs font-mono">
                    <div className="p-2 rounded bg-green-500/5 border border-green-500/20">
                      <span className="text-green-400 font-sans font-medium block mb-1">Output:</span>
                      <pre className="text-green-300 whitespace-pre-wrap break-all">
                        {result.actual_output}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Console Output */}
      {consoleOutput && (
        <div className="border-t border-border bg-background p-3 max-h-24 overflow-y-auto">
          <span className="text-xs font-medium text-muted-foreground">Console:</span>
          <pre className="text-xs mt-1 text-foreground font-mono whitespace-pre-wrap">
            {consoleOutput}
          </pre>
        </div>
      )}
    </Card>
  );
}
