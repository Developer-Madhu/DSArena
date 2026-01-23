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
  GraduationCap,
  Zap,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Database,
  Search,
  Box,
  Share2,
  TreePine,
  RotateCcw,
  Hash,
  Target
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

// Category icons and colors mapping - Updated for Cyber-Zen
const categoryConfig: Record<string, { icon: any; color: string; accent: string }> = {
  'Python Core': { icon: Cpu, color: 'from-emerald-500 to-cyan-600', accent: 'text-emerald-400' },
  'Arrays/Lists': { icon: Layers, color: 'from-blue-500 to-cyan-600', accent: 'text-cyan-400' },
  'Strings': { icon: Terminal, color: 'from-purple-500 to-violet-600', accent: 'text-violet-400' },
  'Searching & Sorting': { icon: Search, color: 'from-orange-500 to-amber-600', accent: 'text-amber-400' },
  'Stack & Queue': { icon: Box, color: 'from-pink-500 to-rose-600', accent: 'text-rose-400' },
  'Linked List': { icon: Share2, color: 'from-indigo-500 to-blue-600', accent: 'text-blue-400' },
  'Trees': { icon: TreePine, color: 'from-green-600 to-teal-600', accent: 'text-teal-400' },
  'Recursion & Backtracking': { icon: RotateCcw, color: 'from-red-500 to-orange-600', accent: 'text-orange-400' },
  'Hashing': { icon: Hash, color: 'from-yellow-500 to-amber-600', accent: 'text-yellow-400' },
  'Must-Have Interview': { icon: Target, color: 'from-red-600 to-pink-600', accent: 'text-pink-400' },
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
    config: categoryConfig[category] || { icon: Database, color: 'from-gray-500 to-slate-600', accent: 'text-slate-400' }
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

  const renderProblemMatrix = (problems: typeof pythonProblemsData) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {problems.map((problem) => {
          const isSolved = solvedIds.has(problem.id);
          const diffColor = problem.difficulty === 'easy' ? 'bg-emerald-500' : problem.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500';

          return (
            <Link
              key={problem.id}
              to={`/problem/${problem.slug}`}
              className={cn(
                "group relative flex flex-col p-4 rounded-lg border transition-all duration-300 cursor-pointer",
                isSolved
                  ? "bg-emerald-500/10 border-emerald-500/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] hover:bg-emerald-500/20"
                  : "bg-white/[0.03] border-white/5 hover:border-emerald-500/50 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn("size-2 rounded-full shadow-[0_0_5px_currentColor]", diffColor)} />
                {isSolved ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Zap className="h-3.5 w-3.5 text-white/10 group-hover:text-emerald-500/50 transition-colors" />
                )}
              </div>

              <h4 className={cn(
                "text-sm font-bold tracking-tight mb-4 transition-colors",
                isSolved ? "text-emerald-400" : "text-white/80 group-hover:text-white"
              )}>
                {problem.title}
              </h4>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{problem.difficulty}</span>
                {!isSolved && (
                  <span className="text-[10px] font-black uppercase text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">Execute</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  const renderDataCartridge = (categoryData: typeof problemsByCategory[0], index: number) => {
    const { category, problems, config } = categoryData;
    const isExpanded = expandedSections.has(category);
    const categorySolvedCount = problems.filter(p => solvedIds.has(p.id)).length;
    const categoryProgress = (categorySolvedCount / problems.length) * 100;

    return (
      <Collapsible
        key={category}
        open={isExpanded}
        onOpenChange={() => toggleSection(category)}
        className="mb-6"
      >
        <CollapsibleTrigger asChild>
          <div className={cn(
            "group relative w-full rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden",
            isExpanded ? "bg-[#0B1121] border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]" : "bg-white/[0.02] border-white/5 hover:border-white/20"
          )}>
            {/* Header Glass */}
            <div className="p-5 flex items-center gap-6 relative z-10">
              {/* Hex Icon Hub */}
              <div className="relative">
                <div className={cn(
                  "size-14 hex-mask bg-gradient-to-br flex items-center justify-center relative z-10 transition-transform group-hover:scale-110",
                  config.color
                )}>
                  <config.icon className="h-7 w-7 text-white" />
                </div>
                <div className={cn("absolute inset-0 blur-xl opacity-20 scale-150", config.color.split(' ')[0])} />
              </div>

              {/* Identity & Progress */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5 pt-1">
                  <span className="text-[10px] text-white/30 font-mono tracking-[0.2em] uppercase italic">Module 0{index + 1}</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <h3 className="text-xl font-black italic tracking-tighter uppercase text-white group-hover:text-emerald-400 transition-colors">
                  {category}
                </h3>
              </div>

              {/* Tactical Stats */}
              <div className="hidden md:flex flex-col items-end gap-2 pr-4">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40 italic">
                  <span>UNITS DECRYPTED:</span>
                  <span className="text-white">{categorySolvedCount} / {problems.length}</span>
                </div>
                <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981] transition-all duration-1000"
                    style={{ width: `${categoryProgress}%` }}
                  />
                </div>
              </div>

              <ChevronDown className={cn(
                "h-5 w-5 text-white/20 transition-transform duration-500",
                isExpanded && "rotate-180 text-emerald-500"
              )} />
            </div>

            {/* Visual Glitch Bar */}
            <div className={cn(
              "absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity",
              isExpanded ? "opacity-100 bg-emerald-500" : "bg-white/10"
            )} />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="pt-4 transition-all">
          <div className="p-8 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
              <Activity className="h-4 w-4 text-emerald-500" />
              <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 italic">Neural Matrix Grid // Deploy Sub-Protocols</h5>
            </div>
            {renderProblemMatrix(problems)}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] font-display text-white selection:bg-primary/30 relative overflow-x-hidden">
      <Navbar />

      {/* Decorative Overlays */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-[600px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent blur-[120px] pointer-events-none opacity-50" />
      <div className="fixed -bottom-48 -right-48 -z-10 size-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-10 pt-24">

        {/* Header Section: The Neural core */}
        <div className="relative mb-20 text-center py-20 overflow-hidden">
          {/* Ouroboros Visual Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <div className="size-[500px] rounded-full border-[40px] border-emerald-500 animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full border-[2px] border-dashed border-emerald-500/50 animate-[spin_10s_linear_infinite_reverse]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-4">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 italic">Core Language: Initialized</span>
            </div>
            <div>
              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-white drop-shadow-2xl">
                The Python <span className="text-emerald-500">Core</span>
              </h1>
              <p className="text-lg md:text-xl text-white/40 mt-6 max-w-2xl mx-auto font-light tracking-wide italic lowercase">
                Master the architectural patterns of AI and elite data science through {PYTHON_TRACK_TOTAL} sequential tactical units.
              </p>
            </div>

            <div className="mt-4">
              <LivesDisplay showTimer />
            </div>
          </div>
        </div>

        {/* Tactical Progress HUD */}
        <div className="cyber-card p-10 mb-16 bg-[#0B1121]/80 backdrop-blur-xl border-emerald-500/20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 w-full space-y-8">
              <div className="flex items-center justify-between border-l-2 border-emerald-500 pl-4 py-1">
                <div className="space-y-1">
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-widest italic">Global Core Status</span>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
                    {solvedCount} / {PYTHON_TRACK_TOTAL} <span className="text-emerald-500 opacity-50 font-mono text-xl">PARTS ONLINE</span>
                  </h2>
                </div>
                {isTrackComplete && (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] font-black uppercase tracking-widest animate-pulse h-8 px-4">
                    Track Synchronized
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <div className="h-6 w-full bg-white/5 rounded-lg border border-white/5 overflow-hidden p-1">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-cyan-500 rounded-md shadow-[0_0_15px_-3px_#10b981] transition-all duration-1000 relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 mix-blend-overlay animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.2em]">
                  <span>Neutral Linkage: {progressPercent.toFixed(1)}%</span>
                  <span>System Capacity: Nominal</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-72 flex flex-col gap-4">
              {isTrackComplete ? (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="w-full h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-white shadow-xl shadow-yellow-900/20 group hover:scale-[1.02] transition-all active:scale-95 italic"
                >
                  <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Claim Certification
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center h-16 border-2 border-dashed border-white/5 rounded-xl bg-white/[0.02]">
                  <GraduationCap className="w-5 h-5 text-white/10 mb-1" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/20 italic">Synchronize all core parts to unlock</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Terminal className="h-4 w-4 text-emerald-500" />
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white/40 italic">System Syllabus</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={expandAll} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-emerald-500 transition-colors italic">Load All</button>
            <div className="h-3 w-[1px] bg-white/10" />
            <button onClick={collapseAll} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-emerald-500 transition-colors italic">Purge Buffer</button>
          </div>
        </div>

        {/* Category Data Cartridges */}
        <div className="space-y-4 mb-32">
          {problemsByCategory.map((categoryData, index) => renderDataCartridge(categoryData, index))}
        </div>

        {/* Certificate Dialog */}
        <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
          <DialogContent className="max-w-[95vw] sm:max-w-3xl bg-[#030712] border-white/10 p-0 overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            <DialogHeader className="p-6 border-b border-white/5 relative z-10">
              <DialogTitle className="flex items-center gap-3 text-white tracking-widest uppercase font-black italic">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Track Certification Authorized
              </DialogTitle>
            </DialogHeader>
            <div className="p-8 relative z-10 bg-white/[0.02]">
              <CompletionCertificate
                completionDate={new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                trackName="Python Learning Track"
                totalProblems={PYTHON_TRACK_TOTAL}
              />
            </div>
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer Substrate */}
      <footer className="relative z-10 w-full px-10 py-16 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-2">
            <h4 className="text-xl font-black italic tracking-tighter uppercase text-white/80">Neural Python Core</h4>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-mono">© 2541 DSArena Orbital Research Unit // Encrypted</p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold">Latency</span>
              <span className="text-xs font-mono text-emerald-500">0.02ms</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold">Sync Protocol</span>
              <span className="text-xs font-mono text-cyan-500">Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
