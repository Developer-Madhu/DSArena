import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';
import { fetchSolvedProblems } from '@/lib/progressStorage';
import { languageTracks, getAvailableTracks, getComingSoonTracks } from '@/lib/languageTracksData';
import { LivesDisplay } from '@/components/lives/LivesDisplay';
import { Lock, ArrowRight, CheckCircle2, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LearningTracks() {
  const { user } = useAuth();
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      fetchSolvedProblems(user.id).then(setSolvedIds);
    }
  }, [user]);

  const availableTracks = getAvailableTracks();
  const comingSoonTracks = getComingSoonTracks();

  // Calculate progress for each track
  const getTrackProgress = (track: typeof languageTracks[0]) => {
    if (!track.problems) return { solved: 0, percent: 0 };
    const solved = track.problems.filter(p => solvedIds.has(p.id)).length;
    return {
      solved,
      percent: (solved / track.totalProblems) * 100
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learning Tracks
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            Master programming languages from basics to advanced with structured learning paths.
            Each track contains 30 carefully curated problems.
          </p>
          
          {/* Lives Display */}
          <div className="flex justify-center mt-4">
            <LivesDisplay showTimer />
          </div>
        </div>

        {/* Available Tracks */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Available Now
          </h2>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {availableTracks.map((track) => {
              const { solved, percent } = getTrackProgress(track);
              const isComplete = solved === track.totalProblems;

              return (
                <Link key={track.id} to={`/${track.slug}`}>
                  <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl sm:text-4xl">{track.icon}</span>
                          <div>
                            <CardTitle className="text-lg sm:text-xl">{track.name}</CardTitle>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {track.totalProblems} Problems
                            </p>
                          </div>
                        </div>
                        {isComplete && (
                          <Badge className="bg-success/20 text-success border-success/30">
                            Complete ✓
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">
                        {track.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{solved}/{track.totalProblems}</span>
                        </div>
                        <Progress value={percent} className="h-2" />
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-4 text-primary">
                        {solved > 0 ? 'Continue Learning' : 'Start Learning'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Coming Soon Tracks */}
        {comingSoonTracks.length > 0 && (
          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              Coming Soon
            </h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {comingSoonTracks.map((track) => (
                <Card
                  key={track.id}
                  className="opacity-60 cursor-not-allowed"
                >
                  <CardContent className="p-3 sm:p-4 text-center">
                    <span className="text-2xl sm:text-3xl block mb-2">{track.icon}</span>
                    <h3 className="font-semibold text-sm sm:text-base">{track.name}</h3>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Coming Soon
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
