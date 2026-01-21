import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import {
  Code2,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Code,
  BookOpen,
  Calendar,
  ClipboardCheck,
  Shield,
  Menu,
  Trophy,
  Zap,
  Terminal,
  Swords,
  ChevronRight,
  Mail
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.png';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminRole();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const checkAdminRole = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();
    setIsAdmin(!!data);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Mode B: Hidden (Stealth)
  if (location.pathname === '/daily-challenge') {
    return null;
  }

  // Determine Mode A: Vertical Dock
  const isVerticalMode = ['/problems', '/learning-tracks'].includes(location.pathname);

  const NavIconItem = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active?: boolean }) => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={cn(
              "p-3 rounded-2xl transition-all duration-300 group relative",
              active
                ? "bg-primary text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                : "text-slate-500 hover:text-white hover:bg-white/5"
            )}
          >
            {icon}
            {active && (
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-2xl -z-10 animate-pulse" />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={20} className="bg-[#0B1121] border-white/10 text-[10px] font-bold tracking-widest uppercase py-2 px-3">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const UserMenuFallback = () => (
    user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button id="navbar-menu-trigger" className="flex items-center outline-none group">
            <Avatar className={cn(
              "h-9 w-9 ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-500",
              isVerticalMode ? "h-10 w-10 ring-2" : "h-7 w-7"
            )}>
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-[10px]">
                {user.email?.[0].toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isVerticalMode ? "start" : "end"} side={isVerticalMode ? "right" : "bottom"} sideOffset={25} className="w-64 bg-[#0B1121]/95 border-white/10 text-slate-300 backdrop-blur-xl p-2 shadow-2xl animate-scale-in">
          <div className="px-2 py-1.5 mb-1">
            <p className="text-sm font-medium text-white truncate">{user.email}</p>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{isAdmin ? 'Administrator' : 'Developer System'}</p>
          </div>
          <DropdownMenuSeparator className="bg-white/5" />

          <DropdownMenuItem onClick={() => navigate('/dashboard')} className="focus:bg-primary/10 focus:text-white cursor-pointer py-2.5 rounded-lg">
            <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/profile')} className="focus:bg-primary/10 focus:text-white cursor-pointer py-2.5 rounded-lg">
            <User className="mr-2 h-4 w-4 text-primary" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-white/5 my-1" />
          <DropdownMenuLabel className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-2 py-1.5">Navigation</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => navigate('/problems')} className="focus:bg-white/5 focus:text-white cursor-pointer py-2 px-3">
            <Terminal className="mr-2 h-4 w-4" />
            Problems Library
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/python-track')} className="focus:bg-white/5 focus:text-white cursor-pointer py-2 px-3">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
              className="mr-2 h-4 w-4 object-contain"
              alt="Python"
            />
            Python Track
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/learning-tracks')} className="focus:bg-white/5 focus:text-white cursor-pointer py-2 px-3">
            <BookOpen className="mr-2 h-4 w-4" />
            All Tracks
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/daily-challenge')} className="focus:bg-white/5 focus:text-white cursor-pointer py-2 px-3">
            <Zap className="mr-2 h-4 w-4 text-primary" />
            Daily Challenge
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/exam')} className="focus:bg-white/5 focus:text-white cursor-pointer py-2 px-3">
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Exam System
          </DropdownMenuItem>

          {isAdmin && (
            <>
              <DropdownMenuSeparator className="bg-white/5 my-1" />
              <DropdownMenuItem onClick={() => navigate('/exam-admin')} className="focus:bg-red-400/10 cursor-pointer text-red-400 focus:text-red-400 py-2.5 rounded-lg">
                <Shield className="mr-2 h-4 w-4" />
                Admin Control Panel
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator className="bg-white/5 my-1" />

          {/* <DropdownMenuItem onClick={() => navigate('/settings')} className="focus:bg-white/5 focus:text-white cursor-pointer py-2 px-3">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => navigate('/contact')} className="focus:bg-white/5 focus:text-white cursor-pointer py-2.5 rounded-lg">
            <Mail className="mr-2 h-4 w-4 text-primary" />
            Contact Support
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut} className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer py-2.5 rounded-lg">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Link to="/auth" className={cn(
        "text-sm font-bold text-white hover:text-primary transition-colors",
        isVerticalMode && "p-3 rounded-xl bg-white/5"
      )}>
        {isVerticalMode ? <User className="h-5 w-5" /> : "Login"}
      </Link>
    )
  );

  // Render Mode A: Vertical Dock
  if (isVerticalMode) {
    return (
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-8 py-8 px-4 bg-[#030712]/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Logo Icon Only */}
        <Link to="/" className="group relative">
          <div className="size-10 flex items-center justify-center rounded-2xl overflow-hidden transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-primary/10">
            <img src={logo} alt="DSArena" className="h-full w-full object-contain transition-transform duration-500" />
          </div>
          <div className="absolute -inset-2 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <div className="w-8 h-[1px] bg-white/5" />

        <div className="flex flex-col gap-4">
          <NavIconItem to="/problems" icon={<Code2 className="h-5 w-5" />} label="Problems" active={location.pathname === '/problems'} />
          <NavIconItem to="/daily-challenge" icon={<Swords className="h-5 w-5" />} label="Compete" />
          <NavIconItem to="/practice-problems" icon={<Trophy className="h-5 w-5" />} label="Practice" active={location.pathname === '/practice-problems'} />
          <NavIconItem to="/learning-tracks" icon={<BookOpen className="h-5 w-5" />} label="Learning" active={location.pathname === '/learning-tracks'} />
        </div>

        <div className="mt-auto pt-4 flex flex-col items-center gap-6">
          <div className="w-8 h-[1px] bg-white/5" />
          <UserMenuFallback />
        </div>
      </aside>
    );
  }

  // Render Mode C: Default Horizontal
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <nav className="glass px-6 py-2 rounded-full flex items-center gap-8 pointer-events-auto shadow-2xl shadow-black/50">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-6 rounded-sm flex items-center justify-center transition-transform group-hover:rotate-12 overflow-hidden">
            <img src={logo} alt="" className="h-full w-full object-contain" />
          </div>
          <span className="font-space font-bold tracking-tight text-lg text-white">DSArena</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <Link to="/problems" className="hover:text-primary transition-colors">Problems</Link>
          <Link to="/daily-challenge" className="hover:text-primary transition-colors">Compete</Link>
          <Link to="/practice-problems" className="hover:text-primary transition-colors">Practice</Link>
        </div>

        <div className="h-4 w-[1px] bg-white/10 mx-2" />
        <UserMenuFallback />
      </nav>
    </header>
  );
}
