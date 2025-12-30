import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Zap, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface CodeAnalysisPanelProps {
  code: string;
  language: string;
  problemSlug: string;
  problemTitle: string;
  problemDifficulty: string;
  problemCategory: string;
  attemptCount: number;
}

interface AnalysisResult {
  patterns: Array<{
    pattern: string;
    description: string;
    severity: 'info' | 'warning' | 'optimization';
    suggestion: string;
  }>;
  complexity: { time: string; space: string };
  isSuboptimal: boolean;
  hint: string | null;
}

export function CodeAnalysisPanel({
  code,
  language,
  problemSlug,
  problemTitle,
  problemDifficulty,
  problemCategory,
  attemptCount,
}: CodeAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastAnalyzedCode, setLastAnalyzedCode] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced code analysis
  useEffect(() => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Skip if code hasn't changed meaningfully
    const codeLines = code.split('\n').filter(l => 
      l.trim() && 
      !l.trim().startsWith('#') && 
      !l.trim().startsWith('//') &&
      !l.trim().startsWith('/*') &&
      !l.trim().startsWith('*')
    );
    
    // Need at least 5 meaningful lines of code to analyze
    if (codeLines.length < 5) {
      setAnalysis(null);
      return;
    }

    // Skip if code is same as last analyzed
    if (code === lastAnalyzedCode) {
      return;
    }

    // Debounce analysis by 1.5 seconds
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('analyze-code', {
          body: {
            code,
            language,
            problemSlug,
            problemTitle,
            problemDifficulty,
            userHistory: {
              attemptCount,
              previousFailures: Math.max(0, attemptCount - 1),
              avgSolveTime: 600,
              topic: problemCategory,
            },
          },
        });

        if (!error && data) {
          setAnalysis(data);
          setLastAnalyzedCode(code);
        }
      } catch (err) {
        console.error('Code analysis failed:', err);
      } finally {
        setLoading(false);
      }
    }, 1500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [code, language, problemSlug, problemTitle, problemDifficulty, problemCategory, attemptCount, lastAnalyzedCode]);

  // Reset when problem changes
  useEffect(() => {
    setAnalysis(null);
    setLastAnalyzedCode('');
  }, [problemSlug]);

  // Show nothing if no meaningful code yet
  const codeLines = code.split('\n').filter(l => 
    l.trim() && 
    !l.trim().startsWith('#') && 
    !l.trim().startsWith('//') &&
    !l.trim().startsWith('/*') &&
    !l.trim().startsWith('*')
  );

  if (codeLines.length < 5 && !loading) {
    return (
      <Card className="border border-border/50 bg-card/50">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
            <Lightbulb className="h-4 w-4" />
            Code Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <p className="text-xs text-muted-foreground">
            Start writing your solution to see real-time analysis and tips.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Card className="border border-primary/30 bg-card/50">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Analyzing...
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <p className="text-xs text-muted-foreground">
            Checking your code for potential improvements...
          </p>
        </CardContent>
      </Card>
    );
  }

  // No issues found
  if (analysis && !analysis.isSuboptimal) {
    return (
      <Card className="border border-green-500/30 bg-green-500/5">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-sm flex items-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            Looking Good!
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-2">
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs border-green-500/30 text-green-600">
              <Zap className="h-3 w-3 mr-1" />
              {analysis.complexity.time}
            </Badge>
            <Badge variant="outline" className="text-xs border-green-500/30 text-green-600">
              Space: {analysis.complexity.space}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            No major issues detected. Ready to submit!
          </p>
        </CardContent>
      </Card>
    );
  }

  // Show analysis with suggestions
  if (analysis && analysis.isSuboptimal) {
    return (
      <Card className="border border-yellow-500/30 bg-yellow-500/5">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-sm flex items-center gap-2 text-yellow-600">
            <Lightbulb className="h-4 w-4" />
            Tip from Glitchy
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-3">
          {analysis.hint && (
            <p className="text-xs text-foreground leading-relaxed">{analysis.hint}</p>
          )}
          
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              {analysis.complexity.time}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Space: {analysis.complexity.space}
            </Badge>
          </div>

          {analysis.patterns.length > 0 && (
            <div className="space-y-1">
              {analysis.patterns.slice(0, 3).map((p, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "text-xs p-2 rounded-md",
                    p.severity === 'warning' && "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
                    p.severity === 'optimization' && "bg-blue-500/10 text-blue-700 dark:text-blue-400",
                    p.severity === 'info' && "bg-muted text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-1 font-medium">
                    {p.severity === 'warning' && <AlertTriangle className="h-3 w-3" />}
                    {p.description}
                  </div>
                  {p.suggestion && (
                    <p className="mt-1 opacity-80">{p.suggestion}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
}
