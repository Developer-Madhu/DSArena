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
  language?: string;
}

interface TestResult {
  passed: boolean;
  actual_output?: string;
  error?: string;
  runtime_ms?: number;
}

// Piston API language mappings
const languageConfig: Record<string, { language: string; version: string; fileName: string }> = {
  python: { language: 'python', version: '3.10.0', fileName: 'main.py' },
  javascript: { language: 'javascript', version: '18.15.0', fileName: 'main.js' },
  java: { language: 'java', version: '15.0.2', fileName: 'Main.java' },
  cpp: { language: 'c++', version: '10.2.0', fileName: 'main.cpp' },
  go: { language: 'go', version: '1.16.2', fileName: 'main.go' },
  rust: { language: 'rust', version: '1.68.2', fileName: 'main.rs' },
  csharp: { language: 'csharp', version: '6.12.0', fileName: 'Main.cs' },
  ruby: { language: 'ruby', version: '3.0.1', fileName: 'main.rb' },
  swift: { language: 'swift', version: '5.3.3', fileName: 'main.swift' },
  kotlin: { language: 'kotlin', version: '1.8.20', fileName: 'main.kt' },
};

// Wrap code for different languages to handle input
function wrapCodeForLanguage(code: string, input: string, language: string): string {
  switch (language) {
    case 'python':
      return `
import sys
from io import StringIO

# Capture input
input_data = """${input}"""
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
    case 'javascript':
      return `
const inputData = \`${input}\`.trim().split('\\n');
let inputIndex = 0;

function readline() {
  if (inputIndex < inputData.length) {
    return inputData[inputIndex++];
  }
  return '';
}

function print(...args) {
  console.log(...args);
}

// User code starts here
${code}
`;
    case 'java':
      // For Java, we don't wrap - assume user handles Scanner
      return code;
    case 'cpp':
      // For C++, we don't wrap - assume user handles cin
      return code;
    case 'go':
      // For Go, we don't wrap - assume user handles bufio
      return code;
    case 'rust':
      // For Rust, we don't wrap - assume user handles stdin
      return code;
    case 'csharp':
      // For C#, we don't wrap - assume user handles Console.ReadLine
      return code;
    case 'ruby':
      return `
$input_data = <<~INPUT
${input}
INPUT
$input_lines = $input_data.strip.split("\\n")
$input_index = 0

def gets
  if $input_index < $input_lines.length
    result = $input_lines[$input_index]
    $input_index += 1
    result + "\\n"
  else
    nil
  end
end

# User code starts here
${code}
`;
    case 'swift':
      // For Swift, we don't wrap - assume user handles readLine()
      return code;
    case 'kotlin':
      // For Kotlin, we don't wrap - assume user handles readLine()
      return code;
    default:
      return code;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, testCases, language = 'python' }: ExecuteRequest = await req.json();

    console.log(`Executing ${language} code with`, testCases.length, 'test cases');

    const config = languageConfig[language] || languageConfig.python;
    const results: TestResult[] = [];
    let consoleOutput = '';

    for (const testCase of testCases) {
      const startTime = Date.now();

      try {
        // Wrap user code based on language
        const wrappedCode = wrapCodeForLanguage(code, testCase.input, language);

        // Call Piston API for code execution
        const pistonResponse = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            language: config.language,
            version: config.version,
            files: [
              {
                name: config.fileName,
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

        // Check for compile errors first
        if (pistonResult.compile?.stderr) {
          results.push({
            passed: false,
            error: `Compile Error: ${pistonResult.compile.stderr}`,
            runtime_ms: runtime,
          });
          consoleOutput += `Compile error:\n${pistonResult.compile.stderr}\n`;
        } else if (pistonResult.run?.stderr) {
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
    consoleOutput = `[${config.language.toUpperCase()}] Passed ${passedCount}/${results.length} test cases\n\n` + consoleOutput;

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
