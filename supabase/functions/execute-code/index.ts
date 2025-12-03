import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface ExecuteRequest {
  code: string;
  testCases: TestCase[];
}

interface TestResult {
  passed: boolean;
  actual_output?: string;
  error?: string;
  runtime_ms?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, testCases }: ExecuteRequest = await req.json();

    console.log('Executing code with', testCases.length, 'test cases');

    const results: TestResult[] = [];
    let consoleOutput = '';

    for (const testCase of testCases) {
      const startTime = Date.now();

      try {
        // Wrap user code to handle input and capture output
        const wrappedCode = `
import sys
from io import StringIO

# Capture input
input_data = """${testCase.input}"""
input_lines = input_data.strip().split('\\n')
input_index = 0

def custom_input(prompt=''):
    global input_index
    if input_index < len(input_lines):
        result = input_lines[input_index]
        input_index += 1
        return result
    return ''

# Override input function
input = custom_input

# User code starts here
${code}
`;

        // Call Piston API for code execution
        const pistonResponse = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            language: 'python',
            version: '3.10.0',
            files: [
              {
                name: 'main.py',
                content: wrappedCode,
              },
            ],
            stdin: testCase.input,
            run_timeout: 5000, // 5 second timeout
          }),
        });

        const pistonResult = await pistonResponse.json();
        console.log('Piston result:', JSON.stringify(pistonResult));

        const endTime = Date.now();
        const runtime = endTime - startTime;

        if (pistonResult.run?.stderr) {
          results.push({
            passed: false,
            error: pistonResult.run.stderr,
            runtime_ms: runtime,
          });
          consoleOutput += `Test case error:\n${pistonResult.run.stderr}\n`;
        } else {
          const actualOutput = (pistonResult.run?.stdout || '').trim();
          const expectedOutput = testCase.expectedOutput.trim();
          const passed = actualOutput === expectedOutput;

          results.push({
            passed,
            actual_output: actualOutput,
            runtime_ms: runtime,
          });

          if (!passed) {
            consoleOutput += `Expected: ${expectedOutput}\nGot: ${actualOutput}\n\n`;
          }
        }
      } catch (error: unknown) {
        console.error('Execution error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Execution failed';
        results.push({
          passed: false,
          error: errorMessage,
          runtime_ms: Date.now() - startTime,
        });
      }
    }

    const passedCount = results.filter(r => r.passed).length;
    consoleOutput = `Passed ${passedCount}/${results.length} test cases\n\n` + consoleOutput;

    return new Response(
      JSON.stringify({ results, consoleOutput }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in execute-code function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to execute code';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
