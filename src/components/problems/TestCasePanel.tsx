import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestCase {
  id: string;
  input: string;
  expected_output: string;
  is_visible: boolean;
}

interface TestResult {
  passed: boolean;
  actual_output?: string;
  error?: string;
  runtime_ms?: number;
}

interface TestCasePanelProps {
  testCases: TestCase[];
  results?: TestResult[];
  isRunning?: boolean;
  consoleOutput?: string;
}

export function TestCasePanel({
  testCases,
  results,
  isRunning,
  consoleOutput,
}: TestCasePanelProps) {
  const [activeTab, setActiveTab] = useState('testcases');
  const visibleCases = testCases.filter((tc) => tc.is_visible);

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
        <div className="border-b border-border px-4">
          <TabsList className="h-12 bg-transparent">
            <TabsTrigger
              value="testcases"
              className="data-[state=active]:bg-secondary"
            >
              Test Cases
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-secondary"
            >
              Results
              {results && (
                <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                  {results.filter((r) => r.passed).length}/{results.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="console"
              className="data-[state=active]:bg-secondary"
            >
              Console
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="testcases" className="flex-1 p-0 mt-0">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-4">
              {visibleCases.map((testCase, index) => (
                <div
                  key={testCase.id}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <div className="mb-2 text-sm font-medium text-muted-foreground">
                    Case {index + 1}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 text-xs font-medium text-muted-foreground">
                        Input
                      </div>
                      <pre className="rounded bg-background p-2 font-mono text-sm text-foreground">
                        {testCase.input}
                      </pre>
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-medium text-muted-foreground">
                        Expected Output
                      </div>
                      <pre className="rounded bg-background p-2 font-mono text-sm text-foreground">
                        {testCase.expected_output}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="results" className="flex-1 p-0 mt-0">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-4">
              {isRunning ? (
                <div className="flex items-center justify-center py-8">
                  <Clock className="mr-2 h-5 w-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">Running tests...</span>
                </div>
              ) : results ? (
                results.map((result, index) => (
                  <div
                    key={index}
                    className={cn(
                      'rounded-lg border p-4',
                      result.passed
                        ? 'border-success/30 bg-success/5'
                        : 'border-destructive/30 bg-destructive/5'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      <span className="font-medium">
                        Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                      </span>
                      {result.runtime_ms && (
                        <span className="ml-auto text-sm text-muted-foreground">
                          {result.runtime_ms}ms
                        </span>
                      )}
                    </div>
                    {!result.passed && result.actual_output && (
                      <div className="mt-3">
                        <div className="mb-1 text-xs font-medium text-muted-foreground">
                          Your Output
                        </div>
                        <pre className="rounded bg-background p-2 font-mono text-sm text-foreground">
                          {result.actual_output}
                        </pre>
                      </div>
                    )}
                    {result.error && (
                      <div className="mt-3">
                        <div className="mb-1 text-xs font-medium text-destructive">
                          Error
                        </div>
                        <pre className="rounded bg-destructive/10 p-2 font-mono text-sm text-destructive">
                          {result.error}
                        </pre>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Run your code to see test results
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="console" className="flex-1 p-0 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {consoleOutput ? (
                <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">
                  {consoleOutput}
                </pre>
              ) : (
                <p className="text-muted-foreground">
                  Console output will appear here when you run your code.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
