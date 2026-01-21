import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { practiceProblemsData } from '@/lib/practiceProblemsData';
import { usePracticeLogic } from '@/features/practice/hooks/usePracticeLogic';
import {
  Code,
  Zap,
  Terminal,
  Activity,
  Cpu,
  Layers,
  ArrowUpRight,
  Shield,
  Binary,
  Lock,
  ArrowRight,
  X,
  RefreshCcw
} from 'lucide-react';

export default function PracticeProblemsIndex() {
  const navigate = useNavigate();
  const {
    adminCode,
    setAdminCode,
    injectedQuestions,
    injectedTitle,
    isValidating,
    handleAdminSubmit,
    clearSession
  } = usePracticeLogic();

  const getCategory = (problem: any) => {
    if (problem.title.includes('Pattern') || problem.slug.includes('stars') || problem.slug.includes('numbers')) return 'Pattern Printing';
    if (problem.slug === 'prime-numbers') return 'Number Theory';
    if (problem.slug === 'fibonacci-series') return 'Series & Sequences';
    return 'Algorithm Checks';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pattern Printing': return Layers;
      case 'Number Theory': return Binary;
      case 'Series & Sequences': return Cpu;
      case 'Algorithm Checks': return Shield;
      default: return Code;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] font-display text-white selection:bg-primary/30 relative overflow-x-hidden">
      <Navbar />

      {/* Decorative Overlays */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-[600px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-[120px] pointer-events-none opacity-50" />
      <div className="fixed -bottom-48 -right-48 -z-10 size-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-10 pt-24">
        {/* Header Section: The Neural core */}
        <div className="relative mb-20 text-center py-20 overflow-hidden">
          {/* Visual Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <div className="size-[500px] rounded-full border-[40px] border-blue-500 animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full border-[2px] border-dashed border-blue-500/50 animate-[spin_10s_linear_infinite_reverse]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-4">
              <div className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 italic">Practice Protocols: Active</span>
            </div>
            <div>
              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-white drop-shadow-2xl">
                THE <span className="text-blue-500">Training</span> Dojo
              </h1>
              <p className="text-lg md:text-xl text-white/40 mt-6 max-w-2xl mx-auto font-light tracking-wide italic lowercase">
                Master every pattern before you bleed for it. Sequential drills. Zero life cost. No rankings. Just you vs. the algorithm—until you're ready to fight for real. The moment you step into the Arena, this safety disappears.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Access Field */}
        <div className="mb-12 max-w-md mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <form
            onSubmit={handleAdminSubmit}
            className="relative flex items-center bg-[#0B1121]/80 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 focus-within:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 pl-4 flex-1">
              <Lock className="h-4 w-4 text-blue-500/50 group-hover:text-blue-400 transition-colors" />
              <input
                type="text"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Enter Administrative Protocol Code"
                className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[11px] font-mono tracking-[0.2em] text-white/70 placeholder:text-white/20 w-full"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {injectedQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={clearSession}
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 p-2.5 rounded-lg transition-all active:scale-95 group/btn"
                  title="Exit / Change Code"
                >
                  <RefreshCcw className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                disabled={isValidating}
                className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 p-2.5 rounded-lg transition-all active:scale-95 group/btn disabled:opacity-50"
              >
                {isValidating ? (
                  <Activity className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                )}
              </button>
            </div>
          </form>
          <div className="mt-3 flex items-center justify-center gap-2 opacity-50">
            <div className={`size-1 rounded-full animate-pulse ${injectedQuestions.length > 0 ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-blue-500 shadow-[0_0_8px_#3b82f6]'}`} />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 italic">
              {injectedQuestions.length > 0 ? 'Tactical Uplink Persistent' : 'Secure Uplink Established'}
            </span>
          </div>
        </div>

        {/* Injected Content Section */}
        {injectedQuestions.length > 0 && (
          <div className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-emerald-400" />
                <h2 className="text-xl font-bold uppercase tracking-widest text-white italic">
                  Injected Protocol: {injectedTitle}
                </h2>
              </div>
              <button
                onClick={clearSession}
                className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-red-400 transition-colors flex items-center gap-2"
              >
                Clear Override <X className="h-3 w-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {injectedQuestions.map((problem) => {
                const Icon = Shield;
                return (
                  <Link
                    key={problem.id}
                    to={`/practice-problems/${problem.slug}`}
                    className="group relative flex flex-col p-5 rounded-xl border bg-emerald-500/[0.02] border-emerald-500/10 hover:border-emerald-500/50 hover:bg-emerald-500/[0.04] transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]">
                      <Icon className="size-24 -rotate-12 translate-x-4 -translate-y-4" />
                    </div>
                    <div className="flex items-start justify-between mb-5 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="size-12 hex-mask bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          <Icon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/60 italic leading-none mb-1">External Unit</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-white/80 group-hover:text-white transition-colors mb-3 relative z-10 uppercase italic">
                      {problem.title}
                    </h3>
                    <p className="text-xs text-white/30 group-hover:text-white/50 line-clamp-2 italic mb-6 leading-relaxed relative z-10">
                      {problem.description.split('.')[0]}.
                    </p>
                    <div className="mt-auto pt-4 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10 italic">
                      External Protocol Active
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0" />
          </div>
        )}

        {/* Unified Question Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-32">
          {practiceProblemsData.map((problem) => {
            const category = getCategory(problem);
            const Icon = getCategoryIcon(category);

            return (
              <Link
                key={problem.id}
                to={`/practice-problems/${problem.slug}`}
                className="group relative flex flex-col p-5 rounded-xl border bg-white/[0.02] border-white/5 hover:border-blue-500/50 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] overflow-hidden"
              >
                {/* Visual Artifact */}
                <div className="absolute top-0 right-0 p-3 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]">
                  <Icon className="size-24 -rotate-12 translate-x-4 -translate-y-4" />
                </div>

                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="size-12 hex-mask bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 italic leading-none mb-1">{category}</span>
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-white/10 text-white/20 uppercase tracking-tighter w-fit font-mono">
                        {problem.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-blue-500 transition-all opacity-0 group-hover:opacity-100" />
                </div>

                <h3 className="text-base font-bold tracking-tight text-white/80 group-hover:text-white transition-colors mb-3 relative z-10 uppercase italic">
                  {problem.title}
                </h3>

                <p className="text-xs text-white/30 group-hover:text-white/50 line-clamp-2 italic mb-6 leading-relaxed relative z-10">
                  {problem.description.split('.')[0]}.
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-2">
                    <Zap className="h-3 w-3 text-blue-400/30" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20 italic">
                      {problem.visibleTestCases.length} Scenarios
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-blue-400 opacity-40 group-hover:opacity-100 transition-opacity italic tracking-[0.2em]">
                    Execute
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Global Footer Substrate */}
        <div className="bg-[#0B1121]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-12 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute inset-0 bg-blue-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10">
            <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white/90 mb-4">PATTERNS MEMORIZED. PROVE IT.</h3>
            <p className="text-sm text-white/30 mb-10 max-w-xl mx-auto italic leading-relaxed">
              If you've mastered the patterns in safety, now risk your lives in the Arena. Every problem you solved here becomes 3x harder under time pressure. The training room stays open—but champions don't look back.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 rounded-lg bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all italic"
              >
                ← RETURN TO BASE
              </button>
              <button
                onClick={() => navigate('/problems')}
                className="px-8 py-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 hover:bg-blue-500/20 transition-all italic"
              >
                ENTER THE ARENA →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full px-10 py-16 border-t border-white/5 bg-black/40 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-2">
            <h4 className="text-xl font-black italic tracking-tighter uppercase text-white/80">TRAINING SECTOR</h4>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-mono">© 2541 DSARENA COMBAT SYSTEMS</p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold">Protocol</span>
              <span className="text-xs font-mono text-blue-500 italic"> ENCRYPTED</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold">Status</span>
              <span className="text-xs font-mono text-cyan-500 italic">STANDBY MODE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Background grain fiber */}
      <div className="fixed inset-0 -z-20 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
