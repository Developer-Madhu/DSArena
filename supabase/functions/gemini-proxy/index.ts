// @ts-nocheck - Deno Edge Function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: corsHeaders,
            status: 200
        });
    }

    try {
        const { contents, systemInstruction } = await req.json();
        const rawApiKey = Deno.env.get('GEMINI_API_KEY');
        const apiKey = rawApiKey?.trim();

        console.log("--- PROXY DEBUG START ---");

        if (!apiKey) {
            console.error('GEMINI_API_KEY is missing from environment variables.');
            return new Response(
                JSON.stringify({ error: 'GEMINI_API_KEY not found in Supabase secrets.' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Use v1beta and gemini-2.0-flash as recommended by the user
        const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

        console.log(`Targeting Model: gemini-2.5-flash via API v1beta (Key length: ${apiKey.length})`);

        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents,
                systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
            })
        });

        const status = response.status;
        const data = await response.json();

        console.log(`Gemini API Response Status: ${status}`);

        if (status !== 200) {
            console.error(`Gemini Error Data:`, JSON.stringify(data));
        }

        console.log("--- PROXY DEBUG END ---");

        return new Response(
            JSON.stringify(data),
            {
                status: status,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Proxy Exception:', error.message);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
