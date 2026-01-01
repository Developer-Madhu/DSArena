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
}: ExamCodeEditorProps) {
  const editorRef = useRef<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [consoleOutput, setConsoleOutput] = useState('');

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    
    // Disable paste
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

    try {
      // Combine visible and hidden test cases
      const allTestCases = [
        ...testCases.map((tc) => ({
          input: tc.input,
          expected_output: tc.expectedOutput,
          is_visible: true,
        })),
        ...hiddenTestCases.map((tc) => ({
          input: tc.input,
          expected_output: tc.expectedOutput,
          is_visible: false,
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
  }, [code, language, testCases, hiddenTestCases, onRunComplete, isRunning, disabled]);

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
        <div className="border-t border-border bg-muted/20 p-3 max-h-48 overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Results:</span>
            <span className={`text-sm ${passedCount === totalCount ? 'text-green-500' : 'text-yellow-500'}`}>
              {passedCount}/{totalCount} passed
            </span>
          </div>
          <div className="space-y-2">
            {results.slice(0, 5).map((result, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 p-2 rounded text-xs ${
                  result.passed ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}
              >
                {result.passed ? (
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <span className="font-medium">Test {index + 1}</span>
                  {result.error && (
                    <p className="text-red-400 mt-1 truncate">{result.error}</p>
                  )}
                </div>
              </div>
            ))}
            {results.length > 5 && (
              <p className="text-xs text-muted-foreground">
                +{results.length - 5} more tests...
              </p>
            )}
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
