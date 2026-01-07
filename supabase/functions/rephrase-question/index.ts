import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GEMINI_API_KEY = Deno.env.get('GOOGLE_API_KEY') || '';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { question } = await req.json()

        if (!question) {
            throw new Error('Question data is required')
        }

        const prompt = `
    You are an expert coding interview question creator. Your task is to rephrase the following coding problem to prevent rote learning, while keeping the underlying logic, constraints, and requirements EXACTLY the same.

    Original Title: ${question.title}
    Original Description: ${question.description}
    Original Input Format: ${question.inputFormat}
    Original Output Format: ${question.outputFormat}

    Instructions:
    1. Rewrite the Title to be catchy but relevant.
    2. Rewrite the Description to tell a different "story" or context (e.g., if it was about apples, make it about spaceships or server logs) but functionally identical.
    3. Keep the Input/Output formats and Constraints identical in meaning, but you can reword the explanation.
    4. Provide 3 visible test cases. You MUST modify the values if the problem allows (e.g., change array values or string content) but keep edge cases. If not modifiable (like "check prime"), just rephrase the explanation.
    
    Return ONLY a valid JSON object starting with { and ending with } in the following format:
    {
      "title": "New Title",
      "description": "New Description with markdown formatting",
      "inputFormat": "Same input format rephrased",
      "outputFormat": "Same output format rephrased",
      "visibleTestCases": [
        { "input": "...", "expectedOutput": "..." }
      ]
    }
    `;

        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error('Gemini API error:', data);
            throw new Error('Failed to generate response from Gemini');
        }

        let generatedText = data.candidates[0].content.parts[0].text;

        // Clean up markdown code blocks if present
        generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();

        let rephrasedQuestion;
        try {
            rephrasedQuestion = JSON.parse(generatedText);
        } catch (e) {
            console.error('JSON Parse Error:', e, 'Text:', generatedText);
            // Fallback to original if parse fails
            rephrasedQuestion = {
                title: question.title,
                description: question.description,
                inputFormat: question.inputFormat,
                outputFormat: question.outputFormat,
                visibleTestCases: question.visibleTestCases
            };
        }

        return new Response(
            JSON.stringify(rephrasedQuestion),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
        )
    }
})
