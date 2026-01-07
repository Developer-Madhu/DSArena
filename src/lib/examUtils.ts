import { pythonProblemsData } from './pythonProblemsData';
import { javascriptProblemsData } from './javascriptProblemsData';
import { javaProblemsData } from './javaProblemsData';
import { cppProblemsData } from './cppProblemsData';
import { examQuestionsData } from './examQuestionsData';
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

// Get exam questions - uses rephrased questions for Python, original for others
export function getProblemsByLanguage(language: ExamLanguage): ProblemData[] {
  switch (language) {
    case 'python':
      // Use Python Logic Building questions for Python exams
      return pythonProblemsData;
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
  count: number = 3,
  topic?: string | null
): ExamQuestion[] {
  let problems = getProblemsByLanguage(language);

  // Filter by topic if specified and not "All"
  console.log('[selectRandomQuestions] ========== FILTERING START ==========');
  console.log('[selectRandomQuestions] Language:', language);
  console.log('[selectRandomQuestions] Topic parameter:', topic);
  console.log('[selectRandomQuestions] Initial problems count:', problems.length);

  if (topic && topic !== "All") {
    // For Python, we filter the examQuestionsData
    if (language === 'python') {
      const normalizedTopic = topic.trim().toLowerCase();
      console.log(`[selectRandomQuestions] 🔍 FILTERING for topic: "${normalizedTopic}"`);
      console.log(`[selectRandomQuestions] First 5 problem categories:`, problems.slice(0, 5).map(p => p.category));

      const allProblems = problems;
      problems = problems.filter(p => p.category.trim().toLowerCase() === normalizedTopic);

      console.log(`[selectRandomQuestions] ✅ FILTERED: Found ${problems.length} questions for topic "${normalizedTopic}" out of ${allProblems.length} total.`);

      // DEBUG: Print categories if 0 found
      if (problems.length === 0) {
        console.error('[selectRandomQuestions] ❌ NO QUESTIONS FOUND! Available categories:',
          Array.from(new Set(allProblems.map(p => p.category)))
        );
      } else {
        console.log('[selectRandomQuestions] ✓ Filtered question categories:', problems.map(p => p.category));
      }
    }
    // For other languages, we might not have categories yet, or they might be different
    // Assuming for now this feature is mainly for Python track
  } else {
    console.log('[selectRandomQuestions] ⚠️ NO FILTERING - Topic is:', topic);
  }
  console.log('[selectRandomQuestions] ========== FILTERING END ==========');

  if (problems.length < count) {
    // If not enough questions in the topic, return all available ones (or throw error)
    // To match requirement "strictly within the chosen topic", we should probably throw or return fewer
    // But returning fewer might break UI that expects 3.
    // Let's throw for now to see if we need to handle it.
    throw new Error(`Not enough questions available for ${language} in topic "${topic || 'All'}". Need ${count}, have ${problems.length}`);
  }

  // Filter by difficulty constraints if we need exactly 3 questions
  if (count === 3 && language === 'python') {
    const easy = problems.filter(p => p.difficulty.toLowerCase() === 'easy');
    const medium = problems.filter(p => p.difficulty.toLowerCase() === 'medium');
    const hard = problems.filter(p => p.difficulty.toLowerCase() === 'hard');

    // If we have at least one of each, pick one of each
    if (easy.length > 0 && medium.length > 0 && hard.length > 0) {
      const selectedEasy = shuffleArray(easy)[0];
      const selectedMedium = shuffleArray(medium)[0];
      const selectedHard = shuffleArray(hard)[0];

      const selected = [selectedEasy, selectedMedium, selectedHard];
      console.log('[selectRandomQuestions] ✅ Selected 1 Easy, 1 Medium, 1 Hard');

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
  }

  // Fallback: Shuffle and Sort by difficulty
  const shuffled = shuffleArray(problems);
  let selected = shuffled.slice(0, count);

  // Sort selected so they define difficulty progression (Easy -> Medium -> Hard) roughly
  const diffOrder: Record<string, number> = { 'easy': 1, 'medium': 2, 'hard': 3 };
  selected.sort((a, b) => {
    return (diffOrder[a.difficulty.toLowerCase()] || 99) - (diffOrder[b.difficulty.toLowerCase()] || 99);
  });

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

// Question weights for scoring (must total 100%)
export const QUESTION_WEIGHTS = [0.30, 0.30, 0.40]; // Easy: 30%, Intermediate: 30%, Advanced: 40%

// Calculate weighted score for exam
// Calculate weighted score for exam
export function calculateWeightedScore(
  answers: { testsTotal: number; testsPassed: number; questionIndex: number }[]
): { score: number; maxScore: number; percentage: number; questionScores: number[] } {
  const questionScores: number[] = [0, 0, 0]; // Initialize with 0s for 3 questions
  let totalWeightedScore = 0;

  answers.forEach((answer) => {
    // Ensure index is within bounds (0-2)
    if (answer.questionIndex >= 0 && answer.questionIndex < 3) {
      const weight = QUESTION_WEIGHTS[answer.questionIndex];

      // Calculate proportional score for this question: (tests passed / total tests) * weight * 100
      // e.g. Q1 (30pts): 5/5 tests -> 1.0 * 30 = 30pts
      // e.g. Q3 (40pts): 2/5 tests -> 0.4 * 40 = 16pts
      const proportionalScore = answer.testsTotal > 0
        ? (answer.testsPassed / answer.testsTotal) * weight * 100
        : 0;

      questionScores[answer.questionIndex] = proportionalScore;
      totalWeightedScore += proportionalScore;
    }
  });

  // Max score is always 100%
  const maxScore = 100;
  // Round to 1 decimal place for cleaner display
  const percentage = Math.round(totalWeightedScore * 10) / 10;

  return {
    score: percentage, // Score matches percentage
    maxScore,
    percentage,
    questionScores
  };
}

// Legacy score calculation (for backwards compatibility)
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
