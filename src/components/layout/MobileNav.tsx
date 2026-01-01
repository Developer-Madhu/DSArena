import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Code2,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  Code,
  BookOpen,
  Home,
  Calendar,
  ClipboardCheck,
  Shield,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export function MobileNav() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
    setOpen(false);
    navigate('/');
  };

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] bg-background">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="gradient-text font-bold">DSArena</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigate('/')}
          >
            <Home className="mr-3 h-5 w-5" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigate('/problems')}
          >
            <BookOpen className="mr-3 h-5 w-5" />
            DSA Problems
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigate('/python-track')}
          >
            <Code className="mr-3 h-5 w-5" />
            Python Track
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigate('/learning-tracks')}
          >
            <Code2 className="mr-3 h-5 w-5" />
            All Tracks
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigate('/daily-challenge')}
          >
            <Calendar className="mr-3 h-5 w-5" />
            Daily Challenge
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigate('/exam')}
          >
            <ClipboardCheck className="mr-3 h-5 w-5" />
            Exam
          </Button>

          {user ? (
            <>
              <div className="my-4 border-t border-border" />
              {isAdmin && (
                <Button
                  variant="ghost"
                  className="justify-start text-primary"
                  onClick={() => handleNavigate('/exam-admin')}
                >
                  <Shield className="mr-3 h-5 w-5" />
                  Admin Panel
                </Button>
              )}
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => handleNavigate('/dashboard')}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => handleNavigate('/profile')}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </Button>
              <div className="my-4 border-t border-border" />
              <Button
                variant="ghost"
                className="justify-start text-destructive hover:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <div className="my-4 border-t border-border" />
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => handleNavigate('/auth')}
              >
                Sign in
              </Button>
              <Button
                variant="hero"
                className="justify-start"
                onClick={() => handleNavigate('/auth?mode=signup')}
              >
                Get Started
              </Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
