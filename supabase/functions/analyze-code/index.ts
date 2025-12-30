import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  code: string;
  language: string;
  problemSlug: string;
  problemTitle: string;
  problemDifficulty: string;
  expectedComplexity?: string;
  userHistory: {
    attemptCount: number;
    previousFailures: number;
    avgSolveTime: number;
    topic: string;
  };
}

interface CodePattern {
  pattern: string;
  description: string;
  severity: 'info' | 'warning' | 'optimization';
  suggestion: string;
}

// Static code analysis patterns
const analyzeCodePatterns = (code: string, language: string): CodePattern[] => {
  const patterns: CodePattern[] = [];
  const lines = code.split('\n');
  
  // Detect nested loops (potential O(n²) or worse)
  let loopDepth = 0;
  let maxLoopDepth = 0;
  const loopKeywords = language === 'python' 
    ? ['for ', 'while '] 
    : ['for(', 'for (', 'while(', 'while ('];
  
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    loopKeywords.forEach(kw => {
      if (trimmed.startsWith(kw) || trimmed.includes(kw)) {
        loopDepth++;
        maxLoopDepth = Math.max(maxLoopDepth, loopDepth);
      }
    });
    // Rough heuristic for loop end
    if (language === 'python') {
      if (trimmed === '' || (!trimmed.startsWith(' ') && !trimmed.startsWith('\t') && loopDepth > 0)) {
        loopDepth = Math.max(0, loopDepth - 1);
      }
    }
  });
  
  if (maxLoopDepth >= 3) {
    patterns.push({
      pattern: 'triple_nested_loop',
      description: 'Triple nested loop detected',
      severity: 'warning',
      suggestion: 'Consider if this complexity is necessary. Could a hash map or different data structure reduce iterations?'
    });
  } else if (maxLoopDepth >= 2) {
    patterns.push({
      pattern: 'nested_loop',
      description: 'Nested loop detected',
      severity: 'info',
      suggestion: 'Nested loops often indicate O(n²) complexity. Check if the inner loop can be optimized.'
    });
  }
  
  // Detect repeated array scans
  const arrayMethodsJS = ['.indexOf(', '.includes(', '.find(', '.filter('];
  const arrayMethodsPy = [' in ', '.index(', '.count('];
  const methods = language === 'python' ? arrayMethodsPy : arrayMethodsJS;
  
  let arrayScans = 0;
  lines.forEach(line => {
    methods.forEach(m => {
      if (line.includes(m)) arrayScans++;
    });
  });
  
  if (arrayScans >= 3) {
    patterns.push({
      pattern: 'repeated_scans',
      description: 'Multiple array/list scans detected',
      severity: 'optimization',
      suggestion: 'Consider pre-processing with a Set or HashMap for O(1) lookups instead of repeated scans.'
    });
  }
  
  // Detect string concatenation in loops (inefficient)
  const stringConcatInLoop = lines.some((line, idx) => {
    const hasConcat = line.includes('+=') && (line.includes('"') || line.includes("'"));
    const inLoop = lines.slice(Math.max(0, idx - 5), idx).some(l => 
      loopKeywords.some(kw => l.includes(kw))
    );
    return hasConcat && inLoop;
  });
  
  if (stringConcatInLoop) {
    patterns.push({
      pattern: 'string_concat_loop',
      description: 'String concatenation inside loop',
      severity: 'optimization',
      suggestion: language === 'python' 
        ? 'Use list.append() and "".join() for better performance.'
        : 'Consider using Array.join() or template literals for efficiency.'
    });
  }
  
  // Detect recursive calls without memoization
  const hasFunctionDef = language === 'python' 
    ? lines.some(l => l.trim().startsWith('def '))
    : lines.some(l => l.includes('function '));
  
  const hasRecursion = lines.some(line => {
    // Simple heuristic: function calls itself
    const funcNameMatch = language === 'python'
      ? code.match(/def\s+(\w+)\s*\(/)
      : code.match(/function\s+(\w+)\s*\(/);
    if (funcNameMatch) {
      return line.includes(funcNameMatch[1] + '(');
    }
    return false;
  });
  
  const hasMemo = code.includes('@lru_cache') || code.includes('@cache') || 
                  code.includes('memo') || code.includes('cache') ||
                  code.includes('dp[') || code.includes('dp =');
  
  if (hasRecursion && !hasMemo && hasFunctionDef) {
    patterns.push({
      pattern: 'recursion_no_memo',
      description: 'Recursive approach without memoization',
      severity: 'warning',
      suggestion: 'If solving overlapping subproblems, consider adding memoization or converting to dynamic programming.'
    });
  }
  
  // Detect sorting when not optimal
  const hasSorting = code.includes('.sort(') || code.includes('sorted(');
  if (hasSorting) {
    patterns.push({
      pattern: 'sorting_used',
      description: 'Sorting operation detected',
      severity: 'info',
      suggestion: 'Sorting adds O(n log n) complexity. For some problems, a single pass with the right data structure is faster.'
    });
  }
  
  // Detect global variables (code smell)
  if (language === 'python') {
    const hasGlobal = lines.some(l => l.trim().startsWith('global '));
    if (hasGlobal) {
      patterns.push({
        pattern: 'global_variable',
        description: 'Global variable usage detected',
        severity: 'info',
        suggestion: 'Consider passing values as parameters or using a class to manage state.'
      });
    }
  }
  
  return patterns;
};

// Estimate complexity from code patterns
const estimateComplexity = (code: string, patterns: CodePattern[]): { time: string; space: string } => {
  let timeComplexity = 'O(n)';
  let spaceComplexity = 'O(1)';
  
  const hasTripleNested = patterns.some(p => p.pattern === 'triple_nested_loop');
  const hasNested = patterns.some(p => p.pattern === 'nested_loop');
  const hasRecursion = patterns.some(p => p.pattern === 'recursion_no_memo');
  const hasSorting = patterns.some(p => p.pattern === 'sorting_used');
  
  if (hasTripleNested) {
    timeComplexity = 'O(n³)';
  } else if (hasNested) {
    timeComplexity = 'O(n²)';
  } else if (hasSorting) {
    timeComplexity = 'O(n log n)';
  }
  
  // Space estimation
  if (code.includes('dp[') || code.includes('dp =') || code.includes('matrix')) {
    spaceComplexity = 'O(n²)';
  } else if (code.includes('[]') || code.includes('{}') || code.includes('set(') || code.includes('dict(')) {
    spaceComplexity = 'O(n)';
  }
  
  if (hasRecursion) {
    spaceComplexity = 'O(n) stack';
  }
  
  return { time: timeComplexity, space: spaceComplexity };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: AnalysisRequest = await req.json();
    const { code, language, problemSlug, problemTitle, problemDifficulty, expectedComplexity, userHistory } = body;
    
    console.log(`Analyzing code for problem: ${problemSlug}, language: ${language}`);
    
    // Perform static analysis
    const patterns = analyzeCodePatterns(code, language);
    const complexity = estimateComplexity(code, patterns);
    
    // Determine if code seems suboptimal
    const isSuboptimal = patterns.some(p => p.severity === 'warning' || p.severity === 'optimization');
    
    // Generate dynamic hint message using AI
    let aiHint: string | null = null;
    
    if (isSuboptimal && patterns.length > 0) {
      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      
      if (LOVABLE_API_KEY) {
        try {
          const patternDescriptions = patterns.map(p => `- ${p.description}: ${p.suggestion}`).join('\n');
          
          const prompt = `You are a friendly, playful coding mentor named "Glitchy". A student is working on "${problemTitle}" (${problemDifficulty} difficulty, topic: ${userHistory.topic}).

Their code shows these patterns:
${patternDescriptions}

Estimated complexity: Time ${complexity.time}, Space ${complexity.space}
${expectedComplexity ? `Optimal complexity for this problem: ${expectedComplexity}` : ''}

Student stats: ${userHistory.attemptCount} attempts, ${userHistory.previousFailures} failures, avg solve time: ${Math.round(userHistory.avgSolveTime / 60)} minutes.

Generate a SHORT (max 2 sentences), encouraging, playful hint that:
1. Acknowledges their effort
2. Gently points toward optimization WITHOUT giving the solution
3. Uses a fun, supportive tone with maybe one emoji
4. Relates to patterns detected

Do NOT give code or explicit solutions. Be encouraging!`;

          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [
                { role: "system", content: "You are Glitchy, a playful and encouraging AI coding assistant. Keep responses very brief and fun." },
                { role: "user", content: prompt }
              ],
              max_tokens: 150,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            aiHint = data.choices?.[0]?.message?.content || null;
          }
        } catch (aiError) {
          console.error('AI hint generation failed:', aiError);
        }
      }
    }
    
    return new Response(JSON.stringify({
      patterns,
      complexity,
      isSuboptimal,
      hint: aiHint,
      analysis: {
        linesOfCode: code.split('\n').filter(l => l.trim()).length,
        hasRecursion: patterns.some(p => p.pattern === 'recursion_no_memo'),
        dataStructuresUsed: detectDataStructures(code, language),
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Analysis failed',
      patterns: [],
      isSuboptimal: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function detectDataStructures(code: string, language: string): string[] {
  const structures: string[] = [];
  
  if (code.includes('[]') || code.includes('list(') || code.includes('Array')) structures.push('array');
  if (code.includes('{}') || code.includes('dict(') || code.includes('Map(') || code.includes('Object.')) structures.push('hashmap');
  if (code.includes('set(') || code.includes('Set(')) structures.push('set');
  if (code.includes('deque') || code.includes('queue') || code.includes('Queue')) structures.push('queue');
  if (code.includes('stack') || code.includes('Stack') || code.includes('.pop()')) structures.push('stack');
  if (code.includes('heap') || code.includes('heapq') || code.includes('PriorityQueue')) structures.push('heap');
  if (code.includes('node') || code.includes('Node') || code.includes('TreeNode')) structures.push('tree/graph');
  
  return structures;
}
