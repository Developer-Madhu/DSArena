import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { MobileNav } from './MobileNav';
import { Code2, LayoutDashboard, LogOut, Settings, User, Code, BookOpen, Calendar, Video, Gamepad2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-primary shadow-brutal">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-pixel text-xs sm:text-sm text-primary">
            DSARENA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {user ? (
            <>
              <Link to="/problems">
                <Button variant="ghost" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Problems
                </Button>
              </Link>
              <Link to="/python-track">
                <Button variant="ghost" size="sm">
                  <Code className="mr-2 h-4 w-4" />
                  Python
                </Button>
              </Link>
              <Link to="/learning-tracks">
                <Button variant="ghost" size="sm">
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Tracks
                </Button>
              </Link>
              <Link to="/daily-challenge">
                <Button variant="ghost" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Daily Quest
                </Button>
              </Link>
              <Link to="/practice-problems">
                <Button variant="ghost" size="sm">
                  Practice
                </Button>
              </Link>
              <Link to="/videos">
                <Button variant="ghost" size="sm">
                  <Video className="mr-2 h-4 w-4" />
                  Videos
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full ml-2">
                    <Avatar className="h-8 w-8 border-2 border-primary/50">
                      <AvatarFallback className="bg-primary/20 text-primary font-bold">
                        {user.email?.[0].toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border-2 border-border shadow-brutal">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/problems">
                <Button variant="ghost" size="sm">
                  Problems
                </Button>
              </Link>
              <Link to="/learning-tracks">
                <Button variant="ghost" size="sm">
                  Tracks
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="sm">
                  Start Quest
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </nav>
  );
}