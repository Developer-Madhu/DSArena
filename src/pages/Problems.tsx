import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { ProblemCard } from '@/components/problems/ProblemCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { problemsData, topicsData } from '@/lib/problemsData';
import { useAuth } from '@/lib/auth';
import { fetchSolvedProblems } from '@/lib/progressStorage';
import { Search, Home } from 'lucide-react';

export default function Problems() {
  const navigate = useNavigate();
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSolvedProblems();
    }
  }, [user]);

  const loadSolvedProblems = async () => {
    if (!user) return;
    const solved = await fetchSolvedProblems(user.id);
    setSolvedIds(solved);
  };

  const filteredProblems = problemsData.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(search.toLowerCase());
    const matchesTopic =
      selectedTopic === 'all' || problem.category === selectedTopic;
    const matchesDifficulty =
      selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  const problemCounts = {
    total: problemsData.length,
    easy: problemsData.filter((p) => p.difficulty === 'easy').length,
    medium: problemsData.filter((p) => p.difficulty === 'medium').length,
    hard: problemsData.filter((p) => p.difficulty === 'hard').length,
  };

  // Get unique categories from problems data
  const categories = [...new Set(problemsData.map(p => p.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Problems</h1>
            <p className="mt-2 text-muted-foreground">
              {problemCounts.total} problems across {categories.length} topics
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
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
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
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
        {filteredProblems.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No problems match your filters.
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
                topic={problem.category}
                isSolved={solvedIds.has(problem.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
