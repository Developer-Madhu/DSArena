import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CompletionCertificate } from '@/components/certificate/CompletionCertificate';
import { pythonProblemsData, PYTHON_TRACK_TOTAL, getPythonCategories } from '@/lib/pythonProblemsData';
import { useAuth } from '@/lib/auth';
import { fetchSolvedProblems } from '@/lib/progressStorage';
import { LivesDisplay } from '@/components/lives/LivesDisplay';
import { 
  CheckCircle2, 
  Trophy, 
  Code, 
  ChevronRight,
  ChevronDown,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

// Category icons and colors mapping
const categoryConfig: Record<string, { icon: string; color: string }> = {
  'Python Core': { icon: '🐍', color: 'from-green-500 to-emerald-600' },
  'Arrays/Lists': { icon: '📊', color: 'from-blue-500 to-cyan-600' },
  'Strings': { icon: '🔤', color: 'from-purple-500 to-violet-600' },
  'Searching & Sorting': { icon: '🔍', color: 'from-orange-500 to-amber-600' },
  'Stack & Queue': { icon: '📦', color: 'from-pink-500 to-rose-600' },
  'Linked List': { icon: '🔗', color: 'from-indigo-500 to-blue-600' },
  'Trees': { icon: '🌳', color: 'from-green-600 to-teal-600' },
  'Recursion & Backtracking': { icon: '🔁', color: 'from-red-500 to-orange-600' },
  'Hashing': { icon: '🗂️', color: 'from-yellow-500 to-amber-600' },
  'Must-Have Interview': { icon: '🎯', color: 'from-red-600 to-pink-600' },
};

export default function PythonTrack() {
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [showCertificate, setShowCertificate] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSolvedProblems(user.id).then(setSolvedIds);
    }
  }, [user]);

  const solvedCount = pythonProblemsData.filter(p => solvedIds.has(p.id)).length;
  const progressPercent = (solvedCount / PYTHON_TRACK_TOTAL) * 100;
  const isTrackComplete = solvedCount === PYTHON_TRACK_TOTAL;

  // Get unique categories in order
  const categories = getPythonCategories();

  // Group problems by category
  const problemsByCategory = categories.map(category => ({
    category,
    problems: pythonProblemsData.filter(p => p.category === category),
    config: categoryConfig[category] || { icon: '📝', color: 'from-gray-500 to-slate-600' }
  }));

  const toggleSection = (category: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(categories));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const renderProblemsByDifficulty = (problems: typeof pythonProblemsData, difficulty: 'easy' | 'medium' | 'hard', label: string, emoji: string) => {
    const filteredProblems = problems.filter(p => p.difficulty === difficulty);
    if (filteredProblems.length === 0) return null;

    const sectionSolvedCount = filteredProblems.filter(p => solvedIds.has(p.id)).length;

    return (
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2 px-2">
          <span className="text-lg">{emoji}</span>
          <h4 className="text-sm font-semibold text-muted-foreground">{label}</h4>
          <Badge variant="outline" className="text-[10px] ml-auto">
            {sectionSolvedCount}/{filteredProblems.length}
          </Badge>
        </div>
        <div className="grid gap-2">
          {filteredProblems.map((problem) => {
            const isSolved = solvedIds.has(problem.id);
            
            return (
              <Link
                key={problem.id}
                to={isSolved ? '#' : `/problem/${problem.slug}`}
                onClick={(e) => {
                  if (isSolved) {
                    e.preventDefault();
                  }
                }}
                className={cn(
                  "group flex items-center gap-3 rounded-lg border p-3 transition-all duration-200",
                  isSolved 
                    ? "border-success/30 bg-success/5 cursor-default" 
                    : "border-border bg-card/50 hover:border-primary/50 hover:bg-card hover:shadow-md"
                )}
              >
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "font-medium text-sm truncate transition-colors",
                    isSolved ? "text-success" : "text-foreground group-hover:text-primary"
                  )}>
                    {problem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {isSolved ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCategorySection = (categoryData: typeof problemsByCategory[0], index: number) => {
    const { category, problems, config } = categoryData;
    const isExpanded = expandedSections.has(category);
    const categorySolvedCount = problems.filter(p => solvedIds.has(p.id)).length;
    const categoryProgress = (categorySolvedCount / problems.length) * 100;

    const easyCount = problems.filter(p => p.difficulty === 'easy').length;
    const mediumCount = problems.filter(p => p.difficulty === 'medium').length;
    const hardCount = problems.filter(p => p.difficulty === 'hard').length;

    return (
      <Collapsible
        key={category}
        open={isExpanded}
        onOpenChange={() => toggleSection(category)}
        className="mb-4"
      >
        <CollapsibleTrigger asChild>
          <div className={cn(
            "w-full rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-lg",
            isExpanded ? "border-primary/50 bg-card" : "border-border bg-card/80 hover:border-primary/30"
          )}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Section number and icon */}
                <div className={cn(
                  "flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br text-2xl sm:text-3xl flex-shrink-0",
                  config.color
                )}>
                  {config.icon}
                </div>

                {/* Title and stats */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground font-mono">Section {index + 1}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg truncate">{category}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={categoryProgress} className="h-1.5 flex-1 max-w-[120px]" />
                    <span className="text-xs text-muted-foreground">
                      {categorySolvedCount}/{problems.length}
                    </span>
                  </div>
                </div>

                {/* Difficulty breakdown */}
                <div className="hidden sm:flex items-center gap-2">
                  {easyCount > 0 && (
                    <Badge variant="outline" className="text-[10px] border-success/50 text-success">
                      🟢 {easyCount}
                    </Badge>
                  )}
                  {mediumCount > 0 && (
                    <Badge variant="outline" className="text-[10px] border-warning/50 text-warning">
                      🟡 {mediumCount}
                    </Badge>
                  )}
                  {hardCount > 0 && (
                    <Badge variant="outline" className="text-[10px] border-destructive/50 text-destructive">
                      🔴 {hardCount}
                    </Badge>
                  )}
                </div>

                {/* Expand icon */}
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                  isExpanded && "rotate-180"
                )} />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="pt-3 px-1">
          <div className="rounded-xl border border-border bg-card/50 p-4">
            {renderProblemsByDifficulty(problems, 'easy', 'Beginner', '🟢')}
            {renderProblemsByDifficulty(problems, 'medium', 'Intermediate', '🟡')}
            {renderProblemsByDifficulty(problems, 'hard', 'Advanced', '🔴')}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  // Overall stats
  const totalEasy = pythonProblemsData.filter(p => p.difficulty === 'easy').length;
  const totalMedium = pythonProblemsData.filter(p => p.difficulty === 'medium').length;
  const totalHard = pythonProblemsData.filter(p => p.difficulty === 'hard').length;
  const solvedEasy = pythonProblemsData.filter(p => p.difficulty === 'easy' && solvedIds.has(p.id)).length;
  const solvedMedium = pythonProblemsData.filter(p => p.difficulty === 'medium' && solvedIds.has(p.id)).length;
  const solvedHard = pythonProblemsData.filter(p => p.difficulty === 'hard' && solvedIds.has(p.id)).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Code className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Python Learning Track
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Master Python programming through {PYTHON_TRACK_TOTAL} carefully curated challenges across {categories.length} categories.
          </p>
          
          {/* Lives Display */}
          <div className="flex justify-center mt-4">
            <LivesDisplay showTimer />
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-6 sm:mb-8 rounded-lg sm:rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Track Progress</span>
                <span className="text-xs sm:text-sm font-bold text-primary">
                  {solvedCount} / {PYTHON_TRACK_TOTAL} Problems
                </span>
              </div>
              <Progress value={progressPercent} className="h-2 sm:h-3" />
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-2">
                {isTrackComplete 
                  ? "🎉 Congratulations! You've completed the entire Python Track!" 
                  : `${PYTHON_TRACK_TOTAL - solvedCount} problems remaining to complete the track`}
              </p>
            </div>
            
            {isTrackComplete ? (
              <Button 
                onClick={() => setShowCertificate(true)}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 w-full sm:w-auto"
              >
                <Trophy className="w-4 h-4" />
                View Certificate
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Complete all to earn certificate</span>
              </div>
            )}
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="rounded-lg sm:rounded-xl border border-border bg-card p-3 sm:p-4 text-center">
            <span className="text-xl sm:text-2xl">🟢</span>
            <p className="text-lg sm:text-2xl font-bold text-success mt-1">{solvedEasy}/{totalEasy}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Beginner</p>
          </div>
          <div className="rounded-lg sm:rounded-xl border border-border bg-card p-3 sm:p-4 text-center">
            <span className="text-xl sm:text-2xl">🟡</span>
            <p className="text-lg sm:text-2xl font-bold text-warning mt-1">{solvedMedium}/{totalMedium}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Intermediate</p>
          </div>
          <div className="rounded-lg sm:rounded-xl border border-border bg-card p-3 sm:p-4 text-center">
            <span className="text-xl sm:text-2xl">🔴</span>
            <p className="text-lg sm:text-2xl font-bold text-destructive mt-1">{solvedHard}/{totalHard}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Advanced</p>
          </div>
        </div>

        {/* Expand/Collapse Controls */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Problem Categories</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={expandAll} className="text-xs">
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs">
              Collapse All
            </Button>
          </div>
        </div>

        {/* Category Sections */}
        {problemsByCategory.map((categoryData, index) => renderCategorySection(categoryData, index))}

        {/* Certificate Dialog */}
        <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
          <DialogContent className="max-w-[95vw] sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your Certificate
              </DialogTitle>
            </DialogHeader>
            <CompletionCertificate
              completionDate={new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
              trackName="Python Learning Track"
              totalProblems={PYTHON_TRACK_TOTAL}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
