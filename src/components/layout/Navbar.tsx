import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { MobileNav } from './MobileNav';
import { Code2, LayoutDashboard, LogOut, Settings, User, Code, BookOpen, Calendar } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
          <span className="text-lg sm:text-xl font-bold">
            <span className="gradient-text">DSArena</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
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
                  Python Track
                </Button>
              </Link>
              <Link to="/learning-tracks">
                <Button variant="ghost" size="sm">
                  All Tracks
                </Button>
              </Link>
              <Link to="/daily-challenge">
                <Button variant="ghost" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Daily Challenge
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
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {user.email?.[0].toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
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
                  Get Started
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
