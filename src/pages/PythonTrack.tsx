import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CompletionCertificate } from '@/components/certificate/CompletionCertificate';
import { pythonProblemsData, PYTHON_TRACK_TOTAL } from '@/lib/pythonProblemsData';
import { useAuth } from '@/lib/auth';
import { fetchSolvedProblems } from '@/lib/progressStorage';
import { 
  CheckCircle2, 
  Trophy, 
  Code, 
  ChevronRight,
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

export default function PythonTrack() {
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [showCertificate, setShowCertificate] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSolvedProblems(user.id).then(setSolvedIds);
    }
  }, [user]);

  const solvedCount = pythonProblemsData.filter(p => solvedIds.has(p.id)).length;
  const progressPercent = (solvedCount / PYTHON_TRACK_TOTAL) * 100;
  const isTrackComplete = solvedCount === PYTHON_TRACK_TOTAL;

  const beginnerProblems = pythonProblemsData.filter(p => p.difficulty === 'easy');
  const intermediateProblems = pythonProblemsData.filter(p => p.difficulty === 'medium');
  const advancedProblems = pythonProblemsData.filter(p => p.difficulty === 'hard');

  const renderProblemList = (problems: typeof pythonProblemsData, title: string, icon: string) => {
    const sectionSolvedCount = problems.filter(p => solvedIds.has(p.id)).length;
    
    return (
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl">{icon}</span>
          <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
          <Badge variant="secondary" className="ml-2 text-xs">
            {sectionSolvedCount}/{problems.length}
          </Badge>
        </div>
        <div className="grid gap-2 sm:gap-3">
          {problems.map((problem) => {
            const isSolved = solvedIds.has(problem.id);
            const problemNumber = pythonProblemsData.findIndex(p => p.id === problem.id) + 1;
            
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
                  "group flex items-center gap-3 sm:gap-4 rounded-lg sm:rounded-xl border p-3 sm:p-4 transition-all duration-200",
                  isSolved 
                    ? "border-success/30 bg-success/5 cursor-default" 
                    : "border-border bg-card hover:border-primary/50 hover:bg-card/80 hover:shadow-lg"
                )}
              >
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted text-xs sm:text-sm font-mono font-bold flex-shrink-0">
                  {problemNumber}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={cn(
                      "font-semibold text-sm sm:text-base truncate transition-colors",
                      isSolved ? "text-success" : "text-foreground group-hover:text-primary"
                    )}>
                      {problem.title}
                    </h3>
                    {isSolved && (
                      <Badge className="bg-success/20 text-success border-success/30 text-[10px] sm:text-xs hidden sm:inline-flex">
                        Completed ✓
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  {isSolved ? (
                    <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
                  ) : (
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

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
            Master Python programming from basics to advanced concepts through {PYTHON_TRACK_TOTAL} carefully curated coding challenges.
          </p>
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="rounded-lg sm:rounded-xl border border-border bg-card p-3 sm:p-4 text-center">
            <span className="text-xl sm:text-2xl">🟢</span>
            <p className="text-lg sm:text-2xl font-bold text-success mt-1">{beginnerProblems.filter(p => solvedIds.has(p.id)).length}/{beginnerProblems.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Beginner</p>
          </div>
          <div className="rounded-lg sm:rounded-xl border border-border bg-card p-3 sm:p-4 text-center">
            <span className="text-xl sm:text-2xl">🟡</span>
            <p className="text-lg sm:text-2xl font-bold text-warning mt-1">{intermediateProblems.filter(p => solvedIds.has(p.id)).length}/{intermediateProblems.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Intermediate</p>
          </div>
          <div className="rounded-lg sm:rounded-xl border border-border bg-card p-3 sm:p-4 text-center">
            <span className="text-xl sm:text-2xl">🔴</span>
            <p className="text-lg sm:text-2xl font-bold text-destructive mt-1">{advancedProblems.filter(p => solvedIds.has(p.id)).length}/{advancedProblems.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Advanced</p>
          </div>
        </div>

        {/* Problem Lists by Level */}
        {renderProblemList(beginnerProblems, 'Beginner Level (1-10)', '🟢')}
        {renderProblemList(intermediateProblems, 'Intermediate Level (11-20)', '🟡')}
        {renderProblemList(advancedProblems, 'Advanced Level (21-30)', '🔴')}

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
              userName={user?.email?.split('@')[0] || 'Coder'}
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
