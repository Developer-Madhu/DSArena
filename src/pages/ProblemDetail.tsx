import { useState, useEffect, useCallback, useMemo } from 'react';
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
import { problemsData, allProblemsData } from '@/lib/problemsData';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Play, Send, Save, Loader2, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { getLocalLivesData, loseLife, hasLives, formatTimeRemaining, getTimeUntilNextRestore } from '@/lib/livesSystem';
import { LivesDisplay } from '@/components/lives/LivesDisplay';
import { GlitchyAssistant } from '@/components/editor/GlitchyAssistant';
import { LanguageSelector } from '@/components/editor/LanguageSelector';
import { StoryGenerator } from '@/components/problems/StoryGenerator';

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
  const [solved, setSolved] = useState(false);
  const [alreadySolved, setAlreadySolved] = useState(false);
  const [noLives, setNoLives] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Find problem from local data (includes Python track)
  const problem = allProblemsData.find(p => p.slug === slug);
  const problemIndex = allProblemsData.findIndex(p => p.slug === slug);
  
  // Check if this is a DSA problem (allows language selection) or a track problem (fixed language)
  const isDSAProblem = useMemo(() => {
    if (!problem) return false;
    const category = problem.category.toLowerCase();
    return !category.includes('track');
  }, [problem]);

  // Determine default language based on problem's explicit language field or category
  const defaultLanguage = useMemo(() => {
    if (!problem) return 'python';
    
    // Use explicit language field if available
    if (problem.language) return problem.language;
    
    // Fallback to category-based detection
    const category = problem.category.toLowerCase();
    if (category === 'javascript track') return 'javascript';
    if (category === 'java track') return 'java';
    if (category === 'c++ track') return 'cpp';
    if (category === 'go track') return 'go';
    if (category === 'rust track') return 'rust';
    if (category === 'c# track') return 'csharp';
    if (category === 'ruby track') return 'ruby';
    if (category === 'swift track') return 'swift';
    if (category === 'kotlin track') return 'kotlin';
    if (category === 'python track') return 'python';
    return 'python'; // Default for DSA problems
  }, [problem]);

  // Final editor language: user selection for DSA, fixed for tracks
  const editorLanguage = isDSAProblem && selectedLanguage ? selectedLanguage : defaultLanguage;

  // Language-specific starter code templates
  const getStarterCodeForLanguage = useCallback((lang: string): string => {
    const templates: Record<string, string> = {
      python: `# Write your solution here
def solution():
    # Your code here
    pass

# Read input
# n = int(input())
# Print output
# print(result)
`,
      javascript: `// Write your solution here
function solution() {
    // Your code here
}

// Read input from stdin
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
    lines.push(line);
});

rl.on('close', () => {
    // Parse input and call solution
    console.log(solution());
});
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Read input
        // int n = scanner.nextInt();
        
        // Your solution here
        
        // Print output
        // System.out.println(result);
    }
}
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // Read input
    // int n;
    // cin >> n;
    
    // Your solution here
    
    // Print output
    // cout << result << endl;
    
    return 0;
}
`,
      go: `package main

import (
    "fmt"
)

func main() {
    // Read input
    // var n int
    // fmt.Scan(&n)
    
    // Your solution here
    
    // Print output
    // fmt.Println(result)
}
`,
      rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    
    // Read input
    // let n: i32 = lines.next().unwrap().unwrap().parse().unwrap();
    
    // Your solution here
    
    // Print output
    // println!("{}", result);
}
`,
      csharp: `using System;

class Program {
    static void Main() {
        // Read input
        // int n = int.Parse(Console.ReadLine());
        
        // Your solution here
        
        // Print output
        // Console.WriteLine(result);
    }
}
`,
      ruby: `# Write your solution here

# Read input
# n = gets.to_i

# Your solution here

# Print output
# puts result
`,
      swift: `import Foundation

// Read input
// let n = Int(readLine()!)!

// Your solution here

// Print output
// print(result)
`,
      kotlin: `fun main() {
    // Read input
    // val n = readLine()!!.toInt()
    
    // Your solution here
    
    // Print output
    // println(result)
}
`,
    };
    return templates[lang] || templates.python;
  }, []);

  // Initialize selected language when problem loads (for DSA problems)
  useEffect(() => {
    if (isDSAProblem && !selectedLanguage) {
      setSelectedLanguage(defaultLanguage);
    }
  }, [isDSAProblem, defaultLanguage, selectedLanguage]);

  // Update code when language changes for DSA problems
  useEffect(() => {
    if (isDSAProblem && selectedLanguage) {
      // Check if there's a saved draft for this language
      const draftKey = `draft-${user?.id}-${problem?.id}-${selectedLanguage}`;
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        setCode(savedDraft);
      } else {
        // Use language-specific starter code
        setCode(getStarterCodeForLanguage(selectedLanguage));
      }
    }
  }, [selectedLanguage, isDSAProblem, user?.id, problem?.id, getStarterCodeForLanguage]);
  
  // Get next problem in same category
  const nextProblem = useMemo(() => {
    if (!problem) return null;
    const sameCategoryProblems = allProblemsData.filter(p => p.category === problem.category);
    const currentIdx = sameCategoryProblems.findIndex(p => p.slug === slug);
    if (currentIdx >= 0 && currentIdx < sameCategoryProblems.length - 1) {
      return sameCategoryProblems[currentIdx + 1];
    }
    return null;
  }, [problem, slug]);

  // Check if already solved
  useEffect(() => {
    const checkIfSolved = async () => {
      if (!user || !problem) return;
      const { data } = await supabase
        .from('user_solved')
        .select('id')
        .eq('user_id', user.id)
        .eq('problem_id', problem.id)
        .maybeSingle();
      if (data) {
        setAlreadySolved(true);
        setSolved(true);
      }
    };
    checkIfSolved();
  }, [user, problem]);

  // Lives system - detect when user leaves the page
  useEffect(() => {
    // Check if user has lives
    if (!hasLives(user?.id)) {
      setNoLives(true);
      return;
    }

    // Only apply lives system if problem is not already solved
    if (alreadySolved) return;

    const handleVisibilityChange = () => {
      if (document.hidden && !alreadySolved && hasLives(user?.id)) {
        // User switched tabs or minimized - lose a life
        const newLivesData = loseLife(user?.id);
        
        if (newLivesData.lives === 0) {
          setNoLives(true);
          toast.error('You lost all your lives! Come back in 10 minutes.', {
            duration: 5000,
          });
        } else {
          toast.warning(`You lost a life for leaving! ${newLivesData.lives} lives remaining.`, {
            duration: 3000,
          });
        }
      }
    };

    const handleBlur = () => {
      if (!alreadySolved && hasLives(user?.id)) {
        // Window lost focus - lose a life (only if we still have lives)
        const currentLives = getLocalLivesData(user?.id);
        if (currentLives.lives > 0) {
          const newLivesData = loseLife(user?.id);
          
          if (newLivesData.lives === 0) {
            setNoLives(true);
            toast.error('You lost all your lives! Come back in 10 minutes.', {
              duration: 5000,
            });
          } else {
            toast.warning(`Focus lost! You lost a life. ${newLivesData.lives} remaining.`, {
              duration: 3000,
            });
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [user, alreadySolved]);

  // Reset life check when problem changes
  useEffect(() => {
    setNoLives(!hasLives(user?.id));
  }, [slug, user?.id]);

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
    setSolved(false);
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

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#00D9FF', '#10B981', '#8B5CF6'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#00D9FF', '#10B981', '#8B5CF6'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const saveProgressHandler = async (runtimeMs?: number) => {
    if (!user || !problem) {
      console.error('Cannot save progress: user or problem is missing');
      return;
    }

    const { saveProgress } = await import('@/lib/progressStorage');
    const result = await saveProgress(user.id, problem.id, problem.difficulty, runtimeMs);
    
    if (!result.success) {
      console.error('Failed to save progress:', result.error);
      // Progress is already saved locally, so user won't lose data
    }
  };

  const saveDraft = useCallback(() => {
    if (!user || !problem) {
      toast.error('Please sign in to save your draft');
      return;
    }
    // Save draft with language suffix for DSA problems
    const draftKey = isDSAProblem 
      ? `draft-${user.id}-${problem.id}-${editorLanguage}`
      : `draft-${user.id}-${problem.id}`;
    localStorage.setItem(draftKey, code);
    toast.success('Draft saved');
  }, [user, problem, code, isDSAProblem, editorLanguage]);

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
    setLastError(null); // Clear previous errors

    try {
      const testCasesToRun = submitAll 
        ? [...problem.visibleTestCases, ...problem.hiddenTestCases]
        : problem.visibleTestCases;

      const formattedTestCases = testCasesToRun.map(tc => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
      }));

      const { data, error } = await supabase.functions.invoke('execute-code', {
        body: { code, testCases: formattedTestCases, language: editorLanguage },
      });

      if (error) {
        throw new Error(error.message || 'Failed to execute code');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data.results);
      setConsoleOutput(data.consoleOutput || '');
      
      // Check for any errors in results
      const errorResult = data.results.find((r: TestResult) => r.error);
      if (errorResult) {
        setLastError(errorResult.error);
      }

      const passedCount = data.results.filter((r: TestResult) => r.passed).length;
      const totalCount = data.results.length;
      const avgRuntime = data.results.reduce((sum: number, r: TestResult) => sum + (r.runtime_ms || 0), 0) / totalCount;

      if (submitAll) {
        if (passedCount === totalCount) {
          setSolved(true);
          triggerConfetti();
          await saveProgressHandler(Math.round(avgRuntime));
          toast.success(`🎉 Congratulations! All ${totalCount} test cases passed!`);
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
    } catch (error: unknown) {
      console.error('Execution error:', error);
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      setConsoleOutput(message);
      setLastError(message); // Set error for Glitchy to react
    } finally {
      setRunning(false);
      setSubmitting(false);
    }
  };

  const goToNextProblem = () => {
    if (nextProblem) {
      navigate(`/problem/${nextProblem.slug}`);
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

  // No lives left - show blocked screen
  if (noLives && !alreadySolved) {
    const timeRemaining = getTimeUntilNextRestore();
    return (
      <div className="flex h-screen flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="flex justify-center mb-6">
              {[0, 1, 2].map((i) => (
                <Heart
                  key={i}
                  className="h-12 w-12 fill-muted text-muted-foreground/30 mx-1"
                />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-destructive mb-4">No Lives Remaining</h2>
            <p className="text-muted-foreground mb-6">
              You've lost all your lives by leaving problem pages. Lives restore 10 minutes after being lost.
            </p>
            {timeRemaining && (
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Next life restores in:</p>
                <p className="text-2xl font-bold text-primary">{formatTimeRemaining(timeRemaining)}</p>
              </div>
            )}
            <Button onClick={() => navigate('/learning-tracks')} variant="outline">
              Return to Learning Tracks
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />

      {/* Already Solved Banner */}
      {alreadySolved && (
        <div className="bg-success/10 border-b border-success/30 px-4 py-3 text-center">
          <p className="text-success font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            You have already completed this problem! ✓
            {nextProblem && (
              <Button variant="link" onClick={goToNextProblem} className="text-success underline p-0 h-auto">
                Try the next one →
              </Button>
            )}
          </p>
        </div>
      )}

      {/* Lives Display Banner */}
      {!alreadySolved && (
        <div className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            ⚠️ Leaving this page will cost you a life!
          </span>
          <LivesDisplay />
        </div>
      )}

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
                      {solved && (
                        <Badge className="bg-success text-success-foreground">Solved ✓</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem Content */}
              <ScrollArea className="flex-1">
                <div className="space-y-6 p-4">
                  {/* AI Story-Based Explanation */}
                  <StoryGenerator 
                    problem={{
                      id: problem.id,
                      title: problem.title,
                      description: problem.description,
                      difficulty: problem.difficulty,
                      category: problem.category,
                      language: editorLanguage
                    }}
                    onStoryGenerated={(story) => {
                      console.log('Story generated:', story);
                    }}
                  />

                  {/* Technical Details */}
                  <div className="mt-6">
                    <h3 className="mb-2 font-semibold">Technical Details</h3>
                    <div className="prose prose-invert max-w-none text-sm text-foreground">
                      <p className="whitespace-pre-wrap text-muted-foreground">{problem.description}</p>
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
                      {isDSAProblem ? (
                        <LanguageSelector
                          value={selectedLanguage || 'python'}
                          onChange={setSelectedLanguage}
                          disabled={alreadySolved}
                        />
                      ) : (
                        <span className="text-sm font-medium capitalize">{editorLanguage}</span>
                      )}
                    </div>
                    {/* Glitchy AI Assistant - positioned in header */}
                    {!alreadySolved && problem && (
                      <GlitchyAssistant
                        code={code}
                        language={editorLanguage}
                        problemDescription={problem.description}
                        lastError={lastError}
                      />
                    )}
                  </div>

                  {/* Editor Content */}
                  <div className="flex-1 relative">
                    
                    {alreadySolved && (
                      <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
                          <p className="text-lg font-semibold text-success">Problem Completed!</p>
                          <p className="text-sm text-muted-foreground mt-1">You've already solved this problem</p>
                          {nextProblem && (
                            <Button
                              onClick={goToNextProblem}
                              className="mt-4"
                              variant="outline"
                            >
                              Try Next Problem
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    <CodeEditor
                      value={code}
                      onChange={setCode}
                      language={editorLanguage}
                    />
                  </div>

                  {/* Editor Footer */}
                  <div className="flex items-center justify-between border-t border-border px-4 py-3">
                    <span className="text-xs text-muted-foreground">
                      {alreadySolved ? "This problem is already completed" : "Paste disabled — type your solution"}
                    </span>
                    <div className="flex gap-2">
                      {alreadySolved ? (
                        nextProblem && (
                          <Button
                            variant="outline"
                            onClick={goToNextProblem}
                            className="border-success text-success hover:bg-success/10"
                          >
                            Next Problem
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )
                      ) : (
                        <>
                          {solved && nextProblem && (
                            <Button
                              variant="outline"
                              onClick={goToNextProblem}
                              className="border-success text-success hover:bg-success/10"
                            >
                              Next Problem
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}
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
                        </>
                      )}
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
