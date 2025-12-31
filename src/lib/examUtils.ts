import { pythonProblemsData } from './pythonProblemsData';
import { javascriptProblemsData } from './javascriptProblemsData';
import { javaProblemsData } from './javaProblemsData';
import { cppProblemsData } from './cppProblemsData';
import { ProblemData } from './problemsData';

export type ExamLanguage = 'python' | 'javascript' | 'java' | 'cpp';

export interface ExamQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  starterCode: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  visibleTestCases: { input: string; expectedOutput: string }[];
  hiddenTestCases: { input: string; expectedOutput: string }[];
  timeLimitMs: number;
  memoryLimitMb: number;
}

// Get problems by language
export function getProblemsByLanguage(language: ExamLanguage): ProblemData[] {
  switch (language) {
    case 'python':
      return pythonProblemsData.filter(p => p.category === 'Python Core');
    case 'javascript':
      return javascriptProblemsData;
    case 'java':
      return javaProblemsData;
    case 'cpp':
      return cppProblemsData;
    default:
      return [];
  }
}

// Get language display name
export function getLanguageDisplayName(language: ExamLanguage): string {
  switch (language) {
    case 'python':
      return 'Python';
    case 'javascript':
      return 'JavaScript';
    case 'java':
      return 'Java';
    case 'cpp':
      return 'C++';
    default:
      return language;
  }
}

// Get language for Monaco editor
export function getMonacoLanguage(language: ExamLanguage): string {
  switch (language) {
    case 'python':
      return 'python';
    case 'javascript':
      return 'javascript';
    case 'java':
      return 'java';
    case 'cpp':
      return 'cpp';
    default:
      return 'plaintext';
  }
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Select random questions for exam
export function selectRandomQuestions(
  language: ExamLanguage,
  count: number = 3
): ExamQuestion[] {
  const problems = getProblemsByLanguage(language);
  
  if (problems.length < count) {
    throw new Error(`Not enough questions available for ${language}. Need ${count}, have ${problems.length}`);
  }
  
  const shuffled = shuffleArray(problems);
  const selected = shuffled.slice(0, count);
  
  return selected.map((problem) => ({
    id: problem.id,
    title: problem.title,
    description: problem.description,
    difficulty: problem.difficulty,
    starterCode: problem.starterCode || '',
    inputFormat: problem.inputFormat,
    outputFormat: problem.outputFormat,
    constraints: problem.constraints,
    visibleTestCases: problem.visibleTestCases || [],
    hiddenTestCases: problem.hiddenTestCases || [],
    timeLimitMs: problem.timeLimitMs || 2000,
    memoryLimitMb: problem.memoryLimitMb || 256,
  }));
}

// Get questions by IDs
export function getQuestionsByIds(
  questionIds: string[],
  language: ExamLanguage
): ExamQuestion[] {
  const problems = getProblemsByLanguage(language);
  
  return questionIds.map((id) => {
    const problem = problems.find((p) => p.id === id);
    if (!problem) {
      throw new Error(`Question not found: ${id}`);
    }
    return {
      id: problem.id,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      starterCode: problem.starterCode || '',
      inputFormat: problem.inputFormat,
      outputFormat: problem.outputFormat,
      constraints: problem.constraints,
      visibleTestCases: problem.visibleTestCases || [],
      hiddenTestCases: problem.hiddenTestCases || [],
      timeLimitMs: problem.timeLimitMs || 2000,
      memoryLimitMb: problem.memoryLimitMb || 256,
    };
  });
}

// Format time for display
export function formatExamTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

// Calculate score
export function calculateScore(
  answers: { isCorrect: boolean; testsTotal: number; testsPassed: number }[]
): { score: number; maxScore: number; percentage: number } {
  let score = 0;
  let maxScore = 0;
  
  answers.forEach((answer) => {
    maxScore += answer.testsTotal;
    score += answer.testsPassed;
  });
  
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  
  return { score, maxScore, percentage };
}
