const GEMINI_API_KEY = 'AIzaSyCEExLBHyTQ4nfn4DmKTOS2IJybAnMqFbs';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;

export async function rephraseQuestionWithGemini(question: any, count: number = 1) {
    const prompt = `
    You are an expert coding interview question creator. Your task is to generate ${count} DISTINCT variants of the following coding problem.
    Prevent rote learning by changing the "story" and context completely, but keep the underlying logic, constraints, and specific requirements EXACTLY the same.

    Original Title: ${question.title}
    Original Description: ${question.description}
    Original Input Format: ${question.inputFormat}
    Original Output Format: ${question.outputFormat}

    Instructions:
    1. Provide ${count} variants.
    2. For EACH variant:
       - Rewrite the Title to be catchy.
       - Rewrite the Description with a unique story (e.g., sci-fi, history, cooking).
       - Keep Input/Output/Constraints functionally identical.
       - Provide 3 visible test cases (modify values if possible, else keep same).
    
    Return ONLY a valid JSON object starting with { and ending with } in the strict format:
    {
      "variants": [
        {
          "title": "New Title 1",
          "description": "New Description 1...",
          "inputFormat": "...",
          "outputFormat": "...",
          "visibleTestCases": [...]
        },
        ...
      ]
    }
    `;

    try {
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

        const parsed = JSON.parse(generatedText);
        return parsed.variants || [];
    } catch (error) {
        console.error('Error calling Gemini:', error);
        return null;
    }
}
