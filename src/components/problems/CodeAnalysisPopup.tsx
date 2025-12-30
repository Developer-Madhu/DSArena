import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Lightbulb, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface CodeAnalysisPopupProps {
  code: string;
  language: string;
  problemSlug: string;
  problemTitle: string;
  problemDifficulty: string;
  problemCategory: string;
  attemptCount: number;
  isVisible: boolean;
  onDismiss: () => void;
  onProceed: () => void;
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

export function CodeAnalysisPopup({
  code,
  language,
  problemSlug,
  problemTitle,
  problemDifficulty,
  problemCategory,
  attemptCount,
  isVisible,
  onDismiss,
  onProceed,
}: CodeAnalysisPopupProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  // Analyze code only when popup becomes visible
  useEffect(() => {
    if (!isVisible || analyzed) return;
    
    const analyzeCode = async () => {
      // Skip if code is just starter code or too short
      const codeLines = code.split('\n').filter(l => l.trim() && !l.trim().startsWith('#') && !l.trim().startsWith('//'));
      if (codeLines.length < 3) {
        // Not enough meaningful code to analyze - proceed directly
        onProceed();
        return;
      }

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

        if (!error && data && data.isSuboptimal && data.hint) {
          setAnalysis(data);
          setAnalyzed(true);
        } else {
          // No issues found - proceed directly
          onProceed();
        }
      } catch (err) {
        console.error('Code analysis failed:', err);
        // On error, just proceed with execution
        onProceed();
      } finally {
        setLoading(false);
      }
    };

    analyzeCode();
  }, [isVisible, analyzed, code, language, problemSlug, problemTitle, problemDifficulty, problemCategory, attemptCount, onProceed]);

  // Reset analysis state when code changes significantly
  useEffect(() => {
    setAnalyzed(false);
    setAnalysis(null);
  }, [problemSlug]);

  if (!isVisible) return null;

  // Show loading state while analyzing
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
        <Card className="w-full max-w-sm mx-4 border-2 border-primary/30 shadow-2xl">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Analyzing your code...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If no analysis or not suboptimal, don't show popup
  if (!analysis) return null;

  const handleDismiss = () => {
    setAnalyzed(false);
    setAnalysis(null);
    onDismiss();
  };

  const handleProceed = () => {
    setAnalyzed(false);
    setAnalysis(null);
    onProceed();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
      <Card className="w-full max-w-md mx-4 border-2 border-primary/30 shadow-2xl animate-in zoom-in-95">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-lg">Quick Tip from Glitchy!</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleDismiss}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {analysis.hint && (
            <p className="text-foreground mb-4 leading-relaxed">{analysis.hint}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Time: {analysis.complexity.time}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Space: {analysis.complexity.space}
            </Badge>
            {analysis.patterns.slice(0, 2).map((p, i) => (
              <Badge 
                key={i} 
                variant="outline" 
                className={cn(
                  "text-xs",
                  p.severity === 'warning' && "border-yellow-500/50 text-yellow-600",
                  p.severity === 'optimization' && "border-blue-500/50 text-blue-600"
                )}
              >
                {p.severity === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
                {p.description}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleDismiss}>
              Let me think...
            </Button>
            <Button className="flex-1" onClick={handleProceed}>
              Run anyway
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
