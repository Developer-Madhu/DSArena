import { useState, useEffect, useMemo } from 'react';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { problemsData, topicsData } from '@/lib/problemsData';
import { useAuth } from '@/lib/auth';
import { fetchSolvedProblems } from '@/lib/progressStorage';
import { Search, Home, ChevronDown, ChevronRight, Hash, ArrowLeftRight, Layers, GitBranch, Calculator, RotateCcw, Network, BarChart3, TrendingUp, Zap, Calendar, Binary } from 'lucide-react';

// Icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  "Arrays and Hashing": <Hash className="h-4 w-4" />,
  "Two Pointers": <ArrowLeftRight className="h-4 w-4" />,
  "Sliding Window": <Layers className="h-4 w-4" />,
  "Stacks": <Layers className="h-4 w-4" />,
  "Binary Search": <Search className="h-4 w-4" />,
  "Linked List": <GitBranch className="h-4 w-4" />,
  "Trees": <GitBranch className="h-4 w-4" />,
  "Maths and Geometry": <Calculator className="h-4 w-4" />,
  "Backtracking": <RotateCcw className="h-4 w-4" />,
  "Graphs": <Network className="h-4 w-4" />,
  "Priority Queues & Heaps": <BarChart3 className="h-4 w-4" />,
  "Tries": <GitBranch className="h-4 w-4" />,
  "Advanced Graph": <Network className="h-4 w-4" />,
  "1D Dynamic Programming": <TrendingUp className="h-4 w-4" />,
  "2D Dynamic Programming": <TrendingUp className="h-4 w-4" />,
  "Greedy": <Zap className="h-4 w-4" />,
  "Intervals": <Calendar className="h-4 w-4" />,
  "Bit Manipulation": <Binary className="h-4 w-4" />,
};

export default function Problems() {
  const navigate = useNavigate();
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSolvedProblems();
    }
  }, [user]);

  // Open all categories by default on mount
  useEffect(() => {
    const categories = [...new Set(problemsData.map(p => p.category))];
    setOpenCategories(new Set(categories));
  }, []);

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

  // Group problems by category
  const problemsByCategory = useMemo(() => {
    const grouped: Record<string, typeof filteredProblems> = {};
    filteredProblems.forEach(problem => {
      if (!grouped[problem.category]) {
        grouped[problem.category] = [];
      }
      grouped[problem.category].push(problem);
    });
    return grouped;
  }, [filteredProblems]);

  // Sort categories based on topicsData order
  const sortedCategories = useMemo(() => {
    const categoryOrder = topicsData.reduce((acc, topic, index) => {
      acc[topic.name] = topic.displayOrder || index;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.keys(problemsByCategory).sort((a, b) => {
      return (categoryOrder[a] || 999) - (categoryOrder[b] || 999);
    });
  }, [problemsByCategory]);

  const problemCounts = {
    total: problemsData.length,
    easy: problemsData.filter((p) => p.difficulty === 'easy').length,
    medium: problemsData.filter((p) => p.difficulty === 'medium').length,
    hard: problemsData.filter((p) => p.difficulty === 'hard').length,
  };

  // Get unique categories from problems data
  const categories = [...new Set(problemsData.map(p => p.category))];

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setOpenCategories(new Set(categories));
  };

  const collapseAll = () => {
    setOpenCategories(new Set());
  };

  // Group problems within a category by difficulty
  const groupByDifficulty = (problems: typeof filteredProblems) => {
    return {
      easy: problems.filter(p => p.difficulty === 'easy'),
      medium: problems.filter(p => p.difficulty === 'medium'),
      hard: problems.filter(p => p.difficulty === 'hard'),
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">DSA Problems</h1>
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
          <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-500 px-3 py-1">
            {problemCounts.easy} Easy
          </Badge>
          <Badge variant="outline" className="border-yellow-500/30 bg-yellow-500/10 text-yellow-500 px-3 py-1">
            {problemCounts.medium} Medium
          </Badge>
          <Badge variant="outline" className="border-red-500/30 bg-red-500/10 text-red-500 px-3 py-1">
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

        {/* Expand/Collapse All */}
        <div className="mb-4 flex gap-2">
          <Button variant="ghost" size="sm" onClick={expandAll}>
            Expand All
          </Button>
          <Button variant="ghost" size="sm" onClick={collapseAll}>
            Collapse All
          </Button>
        </div>

        {/* Problems List by Category */}
        {filteredProblems.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No problems match your filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedCategories.map((category) => {
              const categoryProblems = problemsByCategory[category];
              const grouped = groupByDifficulty(categoryProblems);
              const isOpen = openCategories.has(category);
              const solvedInCategory = categoryProblems.filter(p => solvedIds.has(p.id)).length;

              return (
                <Collapsible
                  key={category}
                  open={isOpen}
                  onOpenChange={() => toggleCategory(category)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        {isOpen ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div className="flex items-center gap-2">
                          {categoryIcons[category] || <Hash className="h-4 w-4" />}
                          <span className="font-semibold">{category}</span>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {categoryProblems.length} problems
                        </Badge>
                        {user && solvedInCategory > 0 && (
                          <Badge variant="outline" className="border-success/30 bg-success/10 text-success">
                            {solvedInCategory}/{categoryProblems.length} solved
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                          {grouped.easy.length} Easy
                        </Badge>
                        <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                          {grouped.medium.length} Medium
                        </Badge>
                        <Badge className="bg-red-500/20 text-red-500 border-red-500/30">
                          {grouped.hard.length} Hard
                        </Badge>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-2 ml-6 space-y-4">
                      {/* Easy Problems */}
                      {grouped.easy.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-green-500 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Easy ({grouped.easy.length})
                          </h4>
                          <div className="space-y-2">
                            {grouped.easy.map((problem) => (
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
                        </div>
                      )}

                      {/* Medium Problems */}
                      {grouped.medium.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-yellow-500 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-500" />
                            Medium ({grouped.medium.length})
                          </h4>
                          <div className="space-y-2">
                            {grouped.medium.map((problem) => (
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
                        </div>
                      )}

                      {/* Hard Problems */}
                      {grouped.hard.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-red-500 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            Hard ({grouped.hard.length})
                          </h4>
                          <div className="space-y-2">
                            {grouped.hard.map((problem) => (
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
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
