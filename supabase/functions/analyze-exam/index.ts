import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { examSessionId, language, answers, totalTimeSpent, violations } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `Analyze this coding exam performance and provide detailed feedback:

Language: ${language}
Total Time: ${Math.round(totalTimeSpent / 60)} minutes
Violations: ${violations}

Questions attempted:
${answers.map((a: any, i: number) => `
Question ${i + 1} (${a.questionId}):
- Correct: ${a.isCorrect ? 'Yes' : 'No'}
- Tests: ${a.testsPassed}/${a.testsTotal}
- Compile errors: ${a.compilationErrors}
- Runtime errors: ${a.runtimeErrors}
- Time spent: ${Math.round(a.timeSpent / 60)} mins
- Errors: ${a.errorMessages?.join(', ') || 'None'}
Code:
\`\`\`
${a.code?.slice(0, 500)}
\`\`\`
`).join('\n')}

Provide:
1. Overall performance summary (2-3 sentences)
2. Specific coding mistakes found
3. Weak concepts detected
4. Time management assessment
5. 3-5 actionable improvement suggestions

Be constructive and encouraging.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a coding instructor analyzing student exam performance. Be helpful, specific, and encouraging.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      console.error('AI error:', await response.text());
      return new Response(JSON.stringify({
        analysis: 'Performance analysis is temporarily unavailable.',
        weakConcepts: [],
        suggestions: ['Practice regularly', 'Review fundamentals'],
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || '';

    // Extract weak concepts and suggestions
    const weakConcepts: string[] = [];
    const suggestions: string[] = [];

    const lines = analysis.split('\n');
    let currentSection = '';
    for (const line of lines) {
      if (line.includes('Weak') || line.includes('weak')) currentSection = 'weak';
      else if (line.includes('suggestion') || line.includes('Improvement') || line.includes('recommend')) currentSection = 'suggest';
      
      if (line.startsWith('-') || line.startsWith('•') || line.match(/^\d+\./)) {
        const text = line.replace(/^[-•\d.]+\s*/, '').trim();
        if (text && currentSection === 'weak') weakConcepts.push(text);
        else if (text && currentSection === 'suggest') suggestions.push(text);
      }
    }

    return new Response(JSON.stringify({
      analysis,
      weakConcepts: weakConcepts.slice(0, 5),
      suggestions: suggestions.slice(0, 5),
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Analysis failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
