import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ProblemCard } from '@/components/problems/ProblemCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { Search, Filter, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'easy' | 'medium' | 'hard';
  acceptance_rate: number;
  topics: { name: string; slug: string } | null;
}

interface UserSolved {
  problem_id: string;
}

const difficultyOptions = ['all', 'easy', 'medium', 'hard'] as const;

export default function Problems() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [topics, setTopics] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const { user } = useAuth();

  useEffect(() => {
    fetchProblems();
    fetchTopics();
  }, []);

  useEffect(() => {
    if (user) {
      fetchSolvedProblems();
    }
  }, [user]);

  const fetchProblems = async () => {
    const { data, error } = await supabase
      .from('problems')
      .select(`
        id,
        title,
        slug,
        difficulty,
        acceptance_rate,
        topics (name, slug)
      `)
      .eq('is_published', true)
      .order('title');

    if (!error && data) {
      setProblems(data as Problem[]);
    }
    setLoading(false);
  };

  const fetchTopics = async () => {
    const { data, error } = await supabase
      .from('topics')
      .select('id, name, slug')
      .order('display_order');

    if (!error && data) {
      setTopics(data);
    }
  };

  const fetchSolvedProblems = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_solved')
      .select('problem_id')
      .eq('user_id', user.id);

    if (!error && data) {
      setSolvedIds(new Set(data.map((d: UserSolved) => d.problem_id)));
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(search.toLowerCase());
    const matchesTopic =
      selectedTopic === 'all' || problem.topics?.slug === selectedTopic;
    const matchesDifficulty =
      selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  const problemCounts = {
    total: problems.length,
    easy: problems.filter((p) => p.difficulty === 'easy').length,
    medium: problems.filter((p) => p.difficulty === 'medium').length,
    hard: problems.filter((p) => p.difficulty === 'hard').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Problems</h1>
          <p className="mt-2 text-muted-foreground">
            {problemCounts.total} problems across {topics.length} topics
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Badge variant="outline" className="px-3 py-1">
            {problemCounts.total} Total
          </Badge>
          <Badge variant="outline" className="difficulty-easy px-3 py-1">
            {problemCounts.easy} Easy
          </Badge>
          <Badge variant="outline" className="difficulty-medium px-3 py-1">
            {problemCounts.medium} Medium
          </Badge>
          <Badge variant="outline" className="difficulty-hard px-3 py-1">
            {problemCounts.hard} Hard
          </Badge>
          {user && (
            <Badge variant="outline" className="border-success/30 bg-success/10 text-success px-3 py-1">
              {solvedIds.size} Solved
            </Badge>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic.id} value={topic.slug}>
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Problems List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              {problems.length === 0
                ? 'No problems available yet. Check back soon!'
                : 'No problems match your filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                id={problem.id}
                title={problem.title}
                slug={problem.slug}
                difficulty={problem.difficulty}
                topic={problem.topics?.name}
                acceptanceRate={problem.acceptance_rate || undefined}
                isSolved={solvedIds.has(problem.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
