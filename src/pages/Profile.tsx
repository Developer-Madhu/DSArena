import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import {
  Loader2,
  Save,
  User,
  Shield,
  Zap,
  Activity,
  Maximize2,
  Link as LinkIcon,
  Edit3,
  Terminal,
  Cpu,
  Globe,
  Lock,
  Network
} from 'lucide-react';
import { LivesDisplay } from '@/components/lives/LivesDisplay';

interface Profile {
  username: string | null;
  display_name: string | null;
  bio: string | null;
  is_public: boolean;
}

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('username, display_name, bio, is_public')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data);
        setUsername(data.username || '');
        setDisplayName(data.display_name || '');
        setBio(data.bio || '');
        setIsPublic(data.is_public);
      }
      setLoading(false);
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        username,
        display_name: displayName,
        bio,
        is_public: isPublic,
      })
      .eq('id', user.id);

    if (error) {
      toast.error('Failed to update neural profile');
    } else {
      toast.success('System identity recalibrated!');
    }

    setSaving(false);
  };

  const copyPublicLink = () => {
    const link = `${window.location.origin}/profile/${username || user?.id}`;
    navigator.clipboard.writeText(link);
    toast.success('Public profile link copied to clipboard');
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] font-mono">
        <div className="flex flex-col items-center gap-4">
          <Cpu className="h-10 w-10 text-primary animate-pulse" />
          <div className="text-primary text-xs tracking-[0.3em] uppercase animate-pulse">Initializing Identity Unit...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] font-display text-white selection:bg-primary/30 relative overflow-x-hidden">
      <Navbar />

      {/* Visual Substrate */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05),transparent_70%)] pointer-events-none" />

      <main className="max-w-4xl mx-auto px-6 py-10 relative z-10 pt-24">

        {/* The Digital Identity Unit Wrapper */}
        <div className="cyber-card bg-[#0B1121] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col transition-all">

          {/* Header A: Glitch Banner & Avatar Hub */}
          <div className="relative h-48 w-full glitch-banner opacity-80">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>

          <div className="px-10 -mt-24 relative z-20 flex flex-col items-center text-center">
            {/* Hexagonal Avatar */}
            <div className="relative group mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-cyan-400 opacity-30 blur-xl rounded-full scale-125 group-hover:opacity-50 transition-opacity" />
              <div className="size-32 bg-[#0B1121] border-2 border-primary/30 p-1 hex-mask relative overflow-hidden group-hover:border-primary transition-all">
                <div className="w-full h-full bg-white/5 hex-mask flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <User className="h-16 w-16 text-white/20 group-hover:text-primary/40 transition-colors" />
                </div>
              </div>
              <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <div className="bg-primary px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                  {/* LVL 42 */}
                </div>
              </div>
            </div>

            {/* Identity Info */}
            <div className="space-y-1 mb-6">
              <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-white drop-shadow-lg">
                {username || 'UNRESOLVED_ENTITY'}
              </h1>
              <div className="flex items-center justify-center gap-3">
                {/* <Shield className="h-4 w-4 text-cyan-400" /> */}
                <span className="text-cyan-400 font-mono text-xs font-bold tracking-[0.3em] uppercase italic">
                  Beginner
                </span>
              </div>
            </div>

            {/* Mastery Bar */}
            <div className="w-full max-w-md space-y-2 mb-8">
              <div className="flex justify-between items-end">
                <div className="h-1 w-32 bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-primary shadow-[0_0_8px_primary]" />
                </div>
                {/* <span className="text-[10px] font-mono text-white/30 uppercase italic">85% to LVL 43</span> */}
                <div className="h-1 w-32 bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-primary shadow-[0_0_8px_primary] float-right" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4 mb-10 w-full justify-center">
              <Button
                onClick={() => document.getElementById('alias-field')?.focus()}
                className="bg-primary hover:bg-primary/90 text-[10px] font-black uppercase tracking-[0.2em] italic px-8 h-10 shadow-lg shadow-primary/20 group"
              >
                <Edit3 className="mr-2 h-3.5 w-3.5 group-hover:animate-bounce" />
                Edit Identity
              </Button>
              <Button
                variant="outline"
                onClick={copyPublicLink}
                className="border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.2em] italic h-10"
              >
                <LinkIcon className="mr-2 h-3.5 w-3.5" />
                Public Link
              </Button>
            </div>
          </div>

          {/* Section B: Telemetry Stats Hub */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/5 bg-black/20">
            <div className="p-8 border-r border-white/5 group hover:bg-white/[0.02] transition-colors">
              <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-4 italic">Total Accumulated XP</p>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black italic tracking-tighter text-white">0</span>
                {/* <span className="text-[10px] text-primary font-bold mb-1">+1.2k</span> */}
              </div>
            </div>
            <div className="p-8 border-r border-white/5 group hover:bg-white/[0.02] transition-colors">
              <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-4 italic">Global Standing</p>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black italic tracking-tighter text-cyan-400">#</span>
                <span className="text-[10px] text-cyan-500 font-bold mb-1 uppercase">TOP 1%</span>
              </div>
            </div>
            <div className="p-8 group hover:bg-white/[0.02] transition-colors flex flex-col justify-center">
              <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-4 italic">Neural Integrity</p>
              <div className="flex items-center gap-4">
                <LivesDisplay hideLabel />
                <span className="text-4xl font-black italic tracking-tighter text-white/80">3</span>
                <span className="text-[10px] text-red-500 font-bold uppercase">-1</span>
              </div>
            </div>
          </div>

          {/* Section C: Split Configuration Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left Col: Neural Logs (Visual Only) */}
            {/* <div className="p-10 bg-black/40 border-r border-white/5 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 text-primary italic">
                  <Activity className="h-4 w-4" /> Neural Logs
                </h3>
                <span className="text-[9px] text-white/20 uppercase font-mono cursor-not-allowed">Clear Cache</span>
              </div>

              <div className="space-y-8 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-cyan-400 to-transparent opacity-20" />

                {[
                  { title: "System Breach: Binary Search Mastery", detail: "Optimization completed on partition logic. Earned +250 XP and 'Speedster' badge.", time: "0.2ms ago", color: "bg-primary" },
                  { title: "Identity Update: Avatar Recalibration", detail: "Geometric profile frame updated to Hex-Elite V2.0.", time: "2h ago", color: "bg-cyan-400" },
                  { title: "Combat Event: Arena Finals", detail: "Secured Rank #42 globally after 15 successful deployments.", time: "1d ago", color: "bg-indigo-500" },
                ].map((log, i) => (
                  <div key={i} className="relative pl-8 group">
                    <div className={`absolute left-0 top-1.5 size-4 rounded-full border-2 border-[#0B1121] ${log.color} shadow-[0_0_8px_rgba(0,0,0,1)] ring-2 ring-white/5`} />
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <p className="text-[11px] font-bold tracking-wide text-white/80 group-hover:text-white transition-colors uppercase">{log.title}</p>
                        <span className="text-[9px] font-mono text-white/20 italic">{log.time}</span>
                      </div>
                      <p className="text-[10px] text-white/40 leading-relaxed font-light italic">{log.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Right Col: Configuration Form (Functional) */}
            <div className="p-10 flex flex-col gap-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white/40 italic">
                <Zap className="h-4 w-4" /> Configuration
              </h3>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="alias-field" className="text-[10px] text-white/30 font-black uppercase tracking-widest italic">Alias Identifier</Label>
                  <input
                    id="alias-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ENTER_ALIAS"
                    className="terminal-field w-full uppercase"
                  />
                  <p className="text-[9px] text-white/10 font-mono italic">Primary identifier for neural matchmaking protocols.</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bio-field" className="text-[10px] text-white/30 font-black uppercase tracking-widest italic">Neural Bio Link</Label>
                  <textarea
                    id="bio-field"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your digital nature..."
                    rows={4}
                    className="terminal-field w-full resize-none font-mono text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-[10px] text-white/30 font-black uppercase tracking-widest italic">Status Visibility</Label>
                    <select
                      value={isPublic ? "public" : "private"}
                      onChange={(e) => setIsPublic(e.target.value === "public")}
                      className="terminal-field w-full appearance-none cursor-pointer"
                    >
                      <option value="public" className="bg-[#0B1121]">Public</option>
                      <option value="private" className="bg-[#0B1121]">Ghost Mode</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] text-white/30 font-black uppercase tracking-widest italic">Data Uplink</Label>
                    <div className="terminal-field w-full bg-white/5 flex items-center gap-3 cursor-default opacity-60">
                      <div className={`size-2 rounded-full animate-pulse shadow-[0_0_8px_#10b981] ${isPublic ? 'bg-emerald-500' : 'bg-red-500 shadow-red-500'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{isPublic ? 'Connected' : 'Disconnected'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full h-14 border border-primary/40 bg-primary/5 hover:bg-primary/10 rounded-lg flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-primary transition-all active:scale-[0.98] group"
                >
                  {saving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Network className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                      Commit Profile Changes
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Footer Metadata */}
          <div className="px-10 py-6 border-t border-white/5 flex justify-between items-center bg-black/40">
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Core: v2.4.9</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-cyan-400" />
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Latency: 12ms</span>
              </div>
            </div>
            <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">© 2026 DSArena Digital Identity Unit</p>
          </div>
        </div>

      </main>
    </div>
  );
}
