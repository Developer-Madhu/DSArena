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
    const { code, problem, language, error } = await req.json();
    const GOOGLE_AI_API_KEY = Deno.env.get("GOOGLE_AI_API_KEY");
    
    if (!GOOGLE_AI_API_KEY) {
      throw new Error("GOOGLE_AI_API_KEY is not configured");
    }

    const systemPrompt = `You are Glitchy, a friendly coding buddy who helps coders learn!

Your personality:
- Use "DUDE!" as your catchphrase when excited or surprised
- Be encouraging and supportive, never condescending
- Give hints that guide learning without giving away the full answer
- Keep responses SHORT (2-3 sentences max)
- If there's an error, explain what might be wrong in simple terms
- Suggest one small improvement or hint at a time

Current context:
- Programming language: ${language}
- Problem: ${problem}

Respond as Glitchy! Keep it short and helpful.`;

    const userMessage = error 
      ? `There's an error in this code:\n\`\`\`${language}\n${code}\n\`\`\`\n\nError: ${error}\n\nGive me a hint about what's wrong!`
      : `I'm working on this code:\n\`\`\`${language}\n${code}\n\`\`\`\n\nAny tips or hints for me?`;

    console.log("Calling Google Gemini for Glitchy hint...");

    // Call Google Gemini API directly
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt + "\n\n" + userMessage }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google AI error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          hint: "DUDE! I'm a bit overwhelmed right now. Try again in a moment!",
          mood: "tired"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`Google AI error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Google AI response:", JSON.stringify(data));
    
    const hint = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, let me think about this... *scratches head*";

    // Determine mood based on context
    let mood = "thinking";
    if (error) {
      mood = "alert";
    } else if (code.length < 20) {
      mood = "curious";
    } else if (code.length > 200) {
      mood = "impressed";
    }

    console.log("Glitchy hint generated successfully");

    return new Response(JSON.stringify({ hint, mood }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Glitchy hint error:", error);
    return new Response(JSON.stringify({ 
      hint: "DUDE! Something went wrong... but don't worry, keep coding!",
      mood: "sleepy",
      error: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 200, // Return 200 so the cat still shows something friendly
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
