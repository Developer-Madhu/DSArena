import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { fetchSolvedProblems } from '@/lib/progressStorage';
import { getTimeStats, TimeStats } from '@/lib/timeTracking';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import {
  Trophy,
  Flame,
  Target,
  Search,
  Bell,
  User,
  Zap,
  Play,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Terminal,
  Activity,
  Award,
  TrendingUp,
  Layout,
  Brain
} from 'lucide-react';
import { problemsData } from '@/lib/problemsData';
import { getAvailableTracks } from '@/lib/languageTracksData';
import { dailyChallengeService, DailyChallenge } from '@/lib/dailyChallenges';
import { toast } from 'sonner';
import { useDashboardLogic, Profile } from '@/hooks/useDashboardLogic';
import { useLivesManager } from '@/hooks/useLivesManager';
import { DASHBOARD_CONFIG } from '@/lib/constants';


export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const {
    profile,
    solvedIds,
    loading,
    todayChallenge,
    todaySolved,
    userStreak,
    challengeStats,
    challengeHistory,
    timeStats,
    accuracy,
    heatmapData,
    calculations,
    handleEnterArena
  } = useDashboardLogic(user, authLoading);

  const { lives } = useLivesManager(user?.id);
  const navigate = useNavigate();

  const calendarGrid = useMemo(() => {
    const weeks = 48;
    const daysPerWeek = 7;
    const totalDays = weeks * daysPerWeek;
    const grid = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < weeks; i++) {
      const week = [];
      for (let j = 0; j < daysPerWeek; j++) {
        // Calculate day offset to show historical data ending at 'today'
        const dayOffset = (totalDays - 1) - (i * daysPerWeek + j);
        const date = new Date(today);
        date.setDate(today.getDate() - dayOffset);
        const dateStr = date.toISOString().split('T')[0];
        const activity = heatmapData.find(d => d.date === dateStr);
        week.push({ date: dateStr, intensity: activity?.count || 0 });
      }
      grid.push(week);
    }
    return grid;
  }, [heatmapData]);


  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] font-mono">
        <div className="flex flex-col items-center gap-4">
          <Terminal className="h-10 w-10 text-primary animate-pulse" />
          <div className="text-primary text-xs tracking-[0.3em] uppercase animate-pulse">Synchronizing Command Center...</div>
        </div>
      </div>
    );
  }

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen bg-[#030712] font-display text-white selection:bg-primary/30 relative overflow-x-hidden">
      <Navbar />

      {/* Decorative Overlays */}
      <div className="fixed top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none opacity-40 transition-opacity duration-1000" />
      <div className="fixed bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none opacity-30" />

      <main className="max-w-[1400px] mx-auto px-6 py-10">

        {/* Terminal Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-white/[0.02] border border-white/5 p-4 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/30 font-mono tracking-tighter uppercase italic">root@dsarena / dashboard</span>
              <h1 className="text-white tracking-tighter text-2xl font-black italic uppercase flex items-center gap-3">
                <Layout className="h-5 w-5 text-primary" /> COMMAND CENTER
              </h1>
            </div>
          </div>

          {/* <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
              <input
                placeholder="Search algorithms..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-xs font-mono uppercase tracking-widest outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div> */}

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-md border border-white/5 group hover:border-primary/30 transition-all cursor-default">
                <Flame className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">LIVES: {lives}</span>
              </div>
            </div>
            <div className="h-9 w-[1px] bg-white/10" />
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-md">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">{profile.xp || 0} XP</span>
            </div>
            <button className="relative group">
              <div className="absolute -top-1 -right-1 size-2 bg-primary rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 size-2 bg-primary rounded-full" />
              <Bell className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Global Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Widget A: Profile Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="cyber-card p-8 flex flex-col gap-8 group">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="size-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
                    <User className="h-10 w-10 text-white/20" />
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-primary/50" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-black italic tracking-tighter uppercase">{profile.username}</h2>
                  <div className="rank-badge inline-block">{calculations.rank}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] italic">Level Progress</span>
                  <span className="text-[10px] font-mono text-primary">{calculations.dsaProgress.toFixed(0)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all duration-1000"
                    style={{ width: `${calculations.dsaProgress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={handleEnterArena}
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] italic hover:brightness-110 shadow-lg shadow-violet-900/40 transition-all active:scale-95 group/btn"
              >
                <Zap className="h-4 w-4 fill-current group-hover:animate-bounce" />
                Enter Zone
              </button>
            </div>

            {/* Widget B: Global Elite Layout Integration */}
            <div className="cyber-card p-6 flex flex-col gap-6 grow">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white/40 italic">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  HALL OF WARRIORS
                </h3>
              </div>
              <div className="dashboard-leaderboard-compact">
                <Leaderboard />
              </div>
            </div>
          </div>

          {/* Right Section Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Widget C: Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'PROBLEMS SOLVED', value: solvedIds.size, detail: '+12%', color: 'border-primary', glow: 'text-primary' },
                { label: 'AVG. ACCURACY', value: `${accuracy.toFixed(1)}%`, detail: '+2.1%', color: 'border-cyan-500/50', glow: 'text-cyan-400' },
                { label: 'STREAK (DAYS)', value: userStreak || profile.streak_days, detail: '+3d', color: 'border-white/10', glow: 'text-white' },
              ].map((stat, i) => (
                <div key={i} className={`cyber-card p-6 border-l-4 ${stat.color} hover:bg-white/[0.04] transition-all cursor-default`}>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-4 italic">{stat.label}</p>
                  <div className="flex items-end gap-3">
                    <span className={`text-4xl font-black italic tracking-tighter ${stat.glow}`}>{stat.value}</span>
                    <span className="text-[10px] text-emerald-500 font-bold mb-1">{stat.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Widget D: Neural Activity Map */}
            <div className="cyber-card p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white/40 italic">
                  <Brain className="h-4 w-4 text-primary" />
                  ENGAGEMENT HEATMAP
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-white/20 uppercase font-bold italic">
                  <span>NONE</span>
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary/20" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary/60" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shadow-[0_0_5px_cyan]" />
                  </div>
                  <span>ELITE</span>
                </div>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <div className="flex gap-1.5 w-max">
                  {calendarGrid.map((week, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      {week.map((day, j) => {
                        const intensity = day.intensity;
                        const isElite = intensity >= 5;
                        const isHigh = intensity >= 3 && intensity < 5;
                        const isMed = intensity >= 1 && intensity < 3;

                        return (
                          <div
                            key={j}
                            title={`${day.date}: ${intensity} units`}
                            className={`size-3 rounded-sm transition-all duration-500 ${isElite ? 'bg-cyan-400 shadow-[0_0_8px_cyan]' :
                                isHigh ? 'bg-primary/60' :
                                  isMed ? 'bg-primary/20' :
                                    'bg-white/5 hover:bg-white/10'
                              }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Widget E: Recent Tactical Engagements */}
            <div className="cyber-card p-8 flex flex-col gap-6 grow">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white/40 italic">
                <Terminal className="h-4 w-4 text-primary" />
                COMBAT HISTORY
              </h3>

              <div className="space-y-3">
                {challengeHistory.length > 0 ? (
                  challengeHistory.slice(0, 5).map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-lg group hover:bg-white/[0.04] transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-md ${entry.isCompleted ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                          {entry.isCompleted ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold tracking-tight text-white/80 group-hover:text-white transition-colors">
                            {entry.challenges?.difficulty?.toUpperCase() || 'UNIT'}: {entry.challenges?.title || 'System Protocol'}
                          </p>
                          <p className="text-[10px] text-white/20 font-mono tracking-tighter">
                            Executed on {new Date(entry.challengeDate).toLocaleDateString()} • {entry.isCompleted ? 'Decrypted Successfully' : 'Bypass Failed'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-mono ${entry.isCompleted ? 'text-emerald-500' : 'text-red-500/50'}`}>
                          {entry.isCompleted ? '+45 XP' : '-1 LIFE'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-xl">
                    <Activity className="h-8 w-8 text-white/10 mx-auto mb-3" />
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] italic font-mono">No recent engagement packets found in buffer...</p>
                  </div>
                )}

                {/* Visual Filler if history is short */}
                {challengeHistory.length < 3 && (
                  <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-lg opacity-40 grayscale blur-[1px]">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Play className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold tracking-tight text-white/80">Arena Match vs. ZenMaster</p>
                        <p className="text-[10px] text-white/20 font-mono tracking-tighter italic">Pending Neural Sync...</p>
                      </div>
                    </div>
                    <div className="text-right"><span className="text-xs font-mono text-primary">+120 XP</span></div>
                  </div>
                )}
              </div>

              <button onClick={() => navigate('/daily-challenge')} className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-primary transition-colors italic group">
                View Full Tactical History <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Global Footer Substrate */}
        <div className="mt-12 flex items-center justify-between py-8 border-t border-white/5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest italic">Core Engine: Nominal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest italic">Neural Link: Encrypted</span>
            </div>
          </div>
          <p className="text-[10px] text-white/10 font-mono uppercase tracking-[0.4em]">DS-ARENA COMMAND OS V2.4.9 // 2026</p>
        </div>
      </main>
    </div>
  );
}
