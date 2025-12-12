// Multi-language learning tracks configuration
import { ProblemData } from './problemsData';
import { pythonProblemsData, PYTHON_TRACK_TOTAL } from './pythonProblemsData';
import { javascriptProblemsData, JAVASCRIPT_TRACK_TOTAL } from './javascriptProblemsData';
import { javaProblemsData, JAVA_TRACK_TOTAL } from './javaProblemsData';
import { cppProblemsData, CPP_TRACK_TOTAL } from './cppProblemsData';

export interface LanguageTrack {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  totalProblems: number;
  isAvailable: boolean;
  problems?: ProblemData[];
}

export const languageTracks: LanguageTrack[] = [
  {
    id: 'python',
    name: 'Python',
    slug: 'python-track',
    description: 'Master Python programming from basics to advanced concepts',
    icon: '🐍',
    color: 'from-yellow-500 to-blue-500',
    totalProblems: PYTHON_TRACK_TOTAL,
    isAvailable: true,
    problems: pythonProblemsData,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    slug: 'javascript-track',
    description: 'Learn JavaScript from fundamentals to advanced patterns',
    icon: '🟨',
    color: 'from-yellow-400 to-yellow-600',
    totalProblems: JAVASCRIPT_TRACK_TOTAL,
    isAvailable: true,
    problems: javascriptProblemsData,
  },
  {
    id: 'java',
    name: 'Java',
    slug: 'java-track',
    description: 'Master Java programming and object-oriented concepts',
    icon: '☕',
    color: 'from-orange-500 to-red-500',
    totalProblems: JAVA_TRACK_TOTAL,
    isAvailable: true,
    problems: javaProblemsData,
  },
  {
    id: 'cpp',
    name: 'C++',
    slug: 'cpp-track',
    description: 'Learn C++ for competitive programming and system design',
    icon: '⚡',
    color: 'from-blue-500 to-purple-500',
    totalProblems: CPP_TRACK_TOTAL,
    isAvailable: true,
    problems: cppProblemsData,
  },
  {
    id: 'go',
    name: 'Go',
    slug: 'go-track',
    description: 'Master Go for backend development and concurrent programming',
    icon: '🐹',
    color: 'from-cyan-400 to-blue-500',
    totalProblems: 30,
    isAvailable: false,
  },
  {
    id: 'rust',
    name: 'Rust',
    slug: 'rust-track',
    description: 'Learn Rust for safe systems programming',
    icon: '🦀',
    color: 'from-orange-600 to-red-600',
    totalProblems: 30,
    isAvailable: false,
  },
  {
    id: 'csharp',
    name: 'C#',
    slug: 'csharp-track',
    description: 'Master C# for .NET development',
    icon: '💜',
    color: 'from-purple-500 to-indigo-600',
    totalProblems: 30,
    isAvailable: false,
  },
  {
    id: 'ruby',
    name: 'Ruby',
    slug: 'ruby-track',
    description: 'Learn Ruby for elegant and productive coding',
    icon: '💎',
    color: 'from-red-500 to-pink-500',
    totalProblems: 30,
    isAvailable: false,
  },
  {
    id: 'swift',
    name: 'Swift',
    slug: 'swift-track',
    description: 'Master Swift for iOS and macOS development',
    icon: '🍎',
    color: 'from-orange-500 to-red-400',
    totalProblems: 30,
    isAvailable: false,
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    slug: 'kotlin-track',
    description: 'Learn Kotlin for modern Android development',
    icon: '🤖',
    color: 'from-purple-400 to-orange-500',
    totalProblems: 30,
    isAvailable: false,
  },
];

export function getTrackById(id: string): LanguageTrack | undefined {
  return languageTracks.find(track => track.id === id);
}

export function getTrackBySlug(slug: string): LanguageTrack | undefined {
  return languageTracks.find(track => track.slug === slug);
}

export function getAvailableTracks(): LanguageTrack[] {
  return languageTracks.filter(track => track.isAvailable);
}

export function getComingSoonTracks(): LanguageTrack[] {
  return languageTracks.filter(track => !track.isAvailable);
}

export function getTrackProblems(trackId: string): ProblemData[] {
  const track = getTrackById(trackId);
  return track?.problems || [];
}

// Export all problems for unified access
export { pythonProblemsData, PYTHON_TRACK_TOTAL };
export { javascriptProblemsData, JAVASCRIPT_TRACK_TOTAL };
export { javaProblemsData, JAVA_TRACK_TOTAL };
export { cppProblemsData, CPP_TRACK_TOTAL };
