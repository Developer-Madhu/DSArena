import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Code2, Mail, Lock, ArrowLeft, Eye, EyeOff, Terminal, Sparkles, Github, Globe, ArrowRight } from 'lucide-react';
import { z } from 'zod';
import logo from '@/assets/logo.png';
import { EmailVerificationOverlay } from '@/components/auth/EmailVerificationOverlay';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, signUp, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  // Get the redirect URL from query params
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (user) {
      if (!showVerification) {
        navigate(redirectTo);
      }
    }
  }, [user, navigate, redirectTo, showVerification]);

  const validateForm = () => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        err.errors.forEach((error) => {
          if (error.path[0] === 'email') fieldErrors.email = error.message;
          if (error.path[0] === 'password') fieldErrors.password = error.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      try {
        z.string().email('Please enter a valid email address').parse(email);
        setErrors({});
      } catch {
        setErrors({ email: 'Please enter a valid email address' });
        return;
      }

      setLoading(true);
      try {
        const { error } = await resetPassword(email);
        if (error) {
          toast.error(error.message);
        } else {
          setResetSent(true);
          toast.success('Recovery Signal Broadcast. Intercept it in your inbox to regain command.');
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('Identity Clash. This operator is already in the Arena. Log in instead?');
          } else {
            toast.error(error.message);
          }
        } else {
          setSignupEmail(email);
          setShowVerification(true);
          toast.success('Recruit Registered. Your spot on the Global Leaderboard is reserved.');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login')) {
            toast.error('Access Denied. Biometrics do not match our records.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Resuming Simulation. Your rivals have been busy while you were away.');
          navigate(redirectTo);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-dark font-sans text-white min-h-screen relative overflow-x-hidden flex flex-col selection:bg-primary/30">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 radial-glow pointer-events-none z-0"></div>

      {/* Navigation */}
      <header className="relative z-10 w-full px-6 lg:px-20 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 flex items-center justify-center rounded-lg overflow-hidden">
              <img src={logo} alt="" className="h-full w-full object-contain" />
            </div>
            <h2 className="font-display text-xl font-bold tracking-tight">DSArena</h2>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <Link className="text-sm font-medium text-white/70 hover:text-white transition-colors" to="/">Home</Link>
            <Link className="text-sm font-medium text-white/70 hover:text-white transition-colors" to="/leaderboard">Leaderboard</Link>
          </nav>
          <button className="text-sm font-bold px-6 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors" onClick={() => toast.info('Reinforcements contacted. Stand by for assist.')}>
            Support
          </button>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px]">
          {/* Glass Panel Wrapper */}
          <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
            {/* Header Component Inside Card */}
            <div className="px-8 pt-10 text-center">
              <h1 className="font-display text-3xl font-bold mb-2">
                {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Join the Arena' : 'Forgot Password'}
              </h1>
              <p className="text-white/50 text-sm font-light">
                {mode === 'signin'
                  ? 'Access your tactical interface and start coding.'
                  : mode === 'signup'
                    ? 'Establish your neural link and start practice.'
                    : 'Enter your identifier to recover access cache.'}
              </p>
            </div>

            {/* Tabs Component */}
            <div className="mt-8 px-8">
              <div className="flex border-b justify-center border-white/10 gap-8">
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setResetSent(false); }}
                  className={`flex flex-col items-center justify-center border-b-2 pb-3 transition-all ${mode === 'signin' || mode === 'forgot' ? 'border-primary text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                >
                  <span className="text-sm font-bold tracking-wide">Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setResetSent(false); }}
                  className={`flex flex-col items-center justify-center border-b-2 pb-3 transition-all ${mode === 'signup' ? 'border-primary text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                >
                  <span className="text-sm font-bold tracking-wide">Sign Up</span>
                </button>
              </div>
            </div>

            {/* Form Section */}
            {mode === 'forgot' && resetSent ? (
              <div className="p-8 text-center space-y-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-primary shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
                </div>
                <p className="text-white/70 font-light">
                  Neural reset link has been dispatched to <strong>{email}</strong>. Check your priority inbox.
                </p>
                <button
                  onClick={() => { setMode('signin'); setResetSent(false); }}
                  className="text-primary font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Return to Link Point
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Email Field */}
                <div className="space-y-2 group">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 group-focus-within:text-cyber-cyan transition-colors">
                    Enter Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-cyber-cyan">
                      <Mail className="h-5 w-5" />
                    </span>
                    <input
                      className={`cyber-input w-full pl-8 py-3 text-white placeholder:text-white/20 font-light tracking-wide focus:ring-0 ${errors.email ? 'border-red-500/50' : ''}`}
                      placeholder="commander@dsarena.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-400 mt-1 uppercase tracking-tighter">{errors.email}</p>}
                </div>

                {/* Password Field */}
                {mode !== 'forgot' && (
                  <div className="space-y-2 group">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 group-focus-within:text-cyber-cyan transition-colors">
                        Enter Password
                      </label>
                      {mode === 'signin' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[10px] text-primary hover:text-primary/80 uppercase font-bold tracking-tighter"
                        >
                          Lost Access?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-cyber-cyan">
                        <Lock className="h-5 w-5" />
                      </span>
                      <input
                        className={`cyber-input w-full pl-8 py-3 text-white placeholder:text-white/20 font-light tracking-wide focus:ring-0 ${errors.password ? 'border-red-500/50' : ''}`}
                        placeholder="••••••••••••"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-[10px] text-red-400 mt-1 uppercase tracking-tighter">{errors.password}</p>}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  className="neon-button w-full bg-primary py-4 rounded-lg font-display font-bold text-white uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="animate-spin h-4 w-4" /> Initializing...
                    </span>
                  ) : (
                    <>
                      {mode === 'signin' ? 'Initialize Session' : mode === 'signup' ? 'Create Account' : 'Dispatch Recovery'}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Footer Social Auth */}
            {/* <div className="px-8 pb-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">External Auth</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => toast.info('Syncing Combat Data from GitHub...')}
                  className="flex items-center justify-center gap-3 py-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <Github className="w-5 h-5 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-white">GitHub</span>
                </button>
                <button
                  onClick={() => toast.info('Syncing Combat Data from Google...')}
                  className="flex items-center justify-center gap-3 py-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <Globe className="w-5 h-5 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-white">Google</span>
                </button>
              </div>
            </div> */}

            {/* Bottom Disclaimer */}
            <div className="p-8 pt-0 text-center">
              <p className="text-white/30 text-xs font-light">
                Secure protocols active. By entering, you agree to our <Link className="text-white/50 hover:text-white underline underline-offset-4" to="/terms">Terms of Engagement</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="relative z-10 w-full px-6 py-8 border-t border-white/5 bg-black/40 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-mono">© 2144 DSArena Orbital Command • V2.4.0</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 font-mono">
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></span>
              Sub-orbital Systems Hub Established
            </span>
          </div>
        </div>
      </footer>

      {showVerification && (
        <EmailVerificationOverlay
          email={signupEmail}
          onClose={() => {
            setShowVerification(false);
            navigate(redirectTo);
          }}
        />
      )}
    </div>
  );
}
