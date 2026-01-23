import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CompletionCertificate } from '@/components/certificate/CompletionCertificate';
import { getTrackBySlug } from '@/lib/languageTracksData';
import { ProblemData } from '@/lib/problemsData';
import { useAuth } from '@/lib/auth';
import { fetchSolvedProblems } from '@/lib/progressStorage';
import { LivesDisplay } from '@/components/lives/LivesDisplay';
import {
  CheckCircle2,
  Trophy,
  ChevronRight,
  ChevronDown,
  Sparkles,
  GraduationCap,
  Zap,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Search,
  ArrowLeft,
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

// Difficulty config mapping - Matching Python's vibe
const difficultyConfig: Record<string, { icon: any; color: string; accent: string; label: string }> = {
  'easy': { icon: Cpu, color: 'from-emerald-500 to-cyan-600', accent: 'text-emerald-400', label: 'Beginner Level' },
  'medium': { icon: Layers, color: 'from-amber-500 to-orange-600', accent: 'text-amber-400', label: 'Intermediate Level' },
  'hard': { icon: Target, color: 'from-rose-600 to-red-600', accent: 'text-rose-400', label: 'Advanced Level' },
};

export default function LanguageTrackPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [showCertificate, setShowCertificate] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['easy']));
  const { user } = useAuth();

  // Get track from URL path slug
  const trackSlug = slug || '';
  const track = getTrackBySlug(trackSlug);
  const problems = track?.problems || [];

  useEffect(() => {
    if (!track || !track.isAvailable) {
      navigate('/learning-tracks');
      return;
    }
  }, [track, navigate]);

  useEffect(() => {
    if (user) {
      fetchSolvedProblems(user.id).then(setSolvedIds);
    }
  }, [user]);

  if (!track || !track.isAvailable) {
    return null;
  }

  const solvedCount = problems.filter(p => solvedIds.has(p.id)).length;
  const progressPercent = (solvedCount / track.totalProblems) * 100;
  const isTrackComplete = solvedCount === track.totalProblems;

  const groupedProblems = {
    easy: problems.filter(p => p.difficulty === 'easy'),
    medium: problems.filter(p => p.difficulty === 'medium'),
    hard: problems.filter(p => p.difficulty === 'hard'),
  };

  const toggleSection = (diff: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(diff)) {
        next.delete(diff);
      } else {
        next.add(diff);
      }
      return next;
    });
  };

  const renderProblemMatrix = (problemList: ProblemData[]) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {problemList.map((problem) => {
          const isSolved = solvedIds.has(problem.id);
          const diffColor = problem.difficulty === 'easy' ? 'bg-emerald-500' : problem.difficulty === 'medium' ? 'bg-amber-500' : 'bg-rose-500';

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

  const renderDataCartridge = (diff: 'easy' | 'medium' | 'hard', index: number) => {
    const problemList = groupedProblems[diff];
    if (problemList.length === 0) return null;

    const config = difficultyConfig[diff];
    const isExpanded = expandedSections.has(diff);
    const sectionSolvedCount = problemList.filter(p => solvedIds.has(p.id)).length;
    const sectionProgress = (sectionSolvedCount / problemList.length) * 100;

    return (
      <Collapsible
        key={diff}
        open={isExpanded}
        onOpenChange={() => toggleSection(diff)}
        className="mb-6"
      >
        <CollapsibleTrigger asChild>
          <div className={cn(
            "group relative w-full rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden",
            isExpanded ? "bg-[#0B1121] border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]" : "bg-white/[0.02] border-white/5 hover:border-white/20"
          )}>
            <div className="p-5 flex items-center gap-6 relative z-10">
              <div className="relative">
                <div className={cn(
                  "size-14 hex-mask bg-gradient-to-br flex items-center justify-center relative z-10 transition-transform group-hover:scale-110",
                  config.color
                )}>
                  <config.icon className="h-7 w-7 text-white" />
                </div>
                <div className={cn("absolute inset-0 blur-xl opacity-20 scale-150", config.color.split(' ')[0])} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5 pt-1">
                  <span className="text-[10px] text-white/30 font-mono tracking-[0.2em] uppercase italic">Module 0{index + 1}</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <h3 className="text-xl font-black italic tracking-tighter uppercase text-white group-hover:text-emerald-400 transition-colors">
                  {config.label}
                </h3>
              </div>

              <div className="hidden md:flex flex-col items-end gap-2 pr-4">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40 italic">
                  <span>UNITS DECRYPTED:</span>
                  <span className="text-white">{sectionSolvedCount} / {problemList.length}</span>
                </div>
                <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981] transition-all duration-1000"
                    style={{ width: `${sectionProgress}%` }}
                  />
                </div>
              </div>

              <ChevronDown className={cn(
                "h-5 w-5 text-white/20 transition-transform duration-500",
                isExpanded && "rotate-180 text-emerald-500"
              )} />
            </div>

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
            {renderProblemMatrix(problemList)}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] font-display text-white selection:bg-primary/30 relative overflow-x-hidden">
      <Navbar />

      {/* Decorative Overlays */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[120px] pointer-events-none opacity-50" />
      <div className="fixed -bottom-48 -right-48 -z-10 size-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-10 pt-24">

        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/learning-tracks')}
            className="text-white/40 hover:text-white hover:bg-white/5 italic font-black uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft className="h-3 w-3 mr-2" />
            Abort to Hub
          </Button>
          <div className="flex items-center gap-4">
            <LivesDisplay showTimer />
          </div>
        </div>

        {/* Header Section: The Neural core */}
        <div className="relative mb-20 text-center py-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <div className="size-[500px] rounded-full border-[40px] border-primary animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full border-[2px] border-dashed border-primary/50 animate-[spin_10s_linear_infinite_reverse]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-4">
              {track.icon.startsWith('http') ? (
                <img src={track.icon} alt={track.name} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-2xl">{track.icon}</span>
              )}
              <div className="h-4 w-[1px] bg-white/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">{track.name} Protocol: Initialized</span>
            </div>
            <div>
              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-white drop-shadow-2xl">
                The {track.name} <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Core</span>
              </h1>
              <p className="text-lg md:text-xl text-white/40 mt-6 max-w-2xl mx-auto font-light tracking-wide italic lowercase">
                {track.description} through {track.totalProblems} sequential tactical units.
              </p>
            </div>
          </div>
        </div>

        {/* Tactical Progress HUD */}
        <div className="cyber-card p-10 mb-16 bg-[#0B1121]/80 backdrop-blur-xl border-white/5">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 w-full space-y-8">
              <div className="flex items-center justify-between border-l-2 border-primary pl-4 py-1">
                <div className="space-y-1">
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-widest italic">Global Core Status</span>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
                    {solvedCount} / {track.totalProblems} <span className="text-primary opacity-50 font-mono text-xl">PARTS ONLINE</span>
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
                    className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-md shadow-[0_0_15px_-3px_rgba(124,58,237,0.5)] transition-all duration-1000 relative"
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
            <Terminal className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white/40 italic">System Syllabus</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setExpandedSections(new Set(['easy', 'medium', 'hard']))} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-primary transition-colors italic">Load All</button>
            <div className="h-3 w-[1px] bg-white/10" />
            <button onClick={() => setExpandedSections(new Set())} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-primary transition-colors italic">Purge Buffer</button>
          </div>
        </div>

        {/* Difficulty Data Cartridges */}
        <div className="space-y-4 mb-32">
          {renderDataCartridge('easy', 0)}
          {renderDataCartridge('medium', 1)}
          {renderDataCartridge('hard', 2)}
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
                trackName={`${track.name} Learning Track`}
                totalProblems={track.totalProblems}
              />
            </div>
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer Substrate */}
      <footer className="relative z-10 w-full px-10 py-16 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-2">
            <h4 className="text-xl font-black italic tracking-tighter uppercase text-white/80">Neural {track.name} Core</h4>
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
