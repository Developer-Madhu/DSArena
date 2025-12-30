import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import {
  Code2,
  Zap,
  Shield,
  Trophy,
  ArrowRight,
  Terminal,
  BarChart3,
  Calendar,
  Flame,
  Star,
  Target,
  Crown,
  Sparkles,
  Gamepad2,
  Rocket,
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Daily Quests',
    description: 'Fresh DSA challenges every day. Build streaks and earn achievements!',
    color: 'from-warning to-primary',
  },
  {
    icon: Code2,
    title: 'Multi-Language',
    description: 'Practice in Python, JavaScript, Java, and C++. Choose your adventure!',
    color: 'from-success to-emerald-400',
  },
  {
    icon: Shield,
    title: 'No Cheating',
    description: 'Paste protection ensures you type every character. Build real skills!',
    color: 'from-destructive to-orange-400',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Run code against test cases instantly. Submit to unlock achievements!',
    color: 'from-accent to-pink-400',
  },
  {
    icon: Trophy,
    title: 'Track Progress',
    description: 'Monitor your journey with XP, levels, and a dynamic leaderboard!',
    color: 'from-primary to-amber-400',
  },
  {
    icon: Terminal,
    title: 'Secure Sandbox',
    description: 'Your code runs in an isolated environment with strict limits.',
    color: 'from-cyan-400 to-blue-500',
  },
];

const tracks = [
  { name: 'Python', emoji: '🐍', color: 'bg-success', problems: '50+' },
  { name: 'JavaScript', emoji: '🌐', color: 'bg-primary', problems: '40+' },
  { name: 'Java', emoji: '☕', color: 'bg-orange-500', problems: '35+' },
  { name: 'C++', emoji: '⚡', color: 'bg-blue-500', problems: '30+' },
];

const topics = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stacks',
  'Binary Search',
  'Linked List',
  'Trees',
  'Graphs',
  'Heaps',
  'Dynamic Programming',
  'Backtracking',
  'Greedy',
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center rounded-full border-2 border-primary/50 bg-primary/10 px-5 py-2 text-sm font-bold text-primary shadow-brutal">
              <Sparkles className="mr-2 h-4 w-4" />
              Level Up Your Coding Skills
            </div>
            
            {/* Main heading with pixel font accent */}
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="font-pixel text-2xl sm:text-3xl lg:text-4xl text-primary block mb-4">DSARENA</span>
              <span className="text-foreground">Master DSA Like a</span>
              <br />
              <span className="gradient-text">Game Adventure</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Join thousands of coders on an epic quest to master Data Structures and Algorithms. 
              Complete daily challenges, unlock achievements, and climb the leaderboard!
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  Start Your Quest
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/problems">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Browse Problems
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Language Tracks Section */}
      <section className="border-y-2 border-border bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Choose Your <span className="gradient-text">Adventure</span>
            </h2>
            <p className="text-muted-foreground">Pick a language track and start your coding journey</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {tracks.map((track) => (
              <Link 
                key={track.name} 
                to={track.name === 'Python' ? '/python-track' : '/learning-tracks'}
                className="group"
              >
                <div className="quest-card p-6 text-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-hover transition-all">
                  <div className="text-4xl mb-3">{track.emoji}</div>
                  <h3 className="font-bold text-lg mb-1">{track.name}</h3>
                  <p className="text-sm text-muted-foreground">{track.problems} Problems</p>
                  <div className={`mt-3 h-1 ${track.color} rounded-full`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b-2 border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            <div className="text-center">
              <div className="font-pixel text-2xl sm:text-3xl text-primary">150+</div>
              <div className="mt-2 text-sm text-muted-foreground font-medium">Problems</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-2xl sm:text-3xl text-success">4</div>
              <div className="mt-2 text-sm text-muted-foreground font-medium">Languages</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-2xl sm:text-3xl text-warning">∞</div>
              <div className="mt-2 text-sm text-muted-foreground font-medium">Daily Quests</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-2xl sm:text-3xl text-accent">12</div>
              <div className="mt-2 text-sm text-muted-foreground font-medium">Topics</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-2xl sm:text-3xl text-destructive">∞</div>
              <div className="mt-2 text-sm text-muted-foreground font-medium">Adventures</div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Quest Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="quest-card p-8 sm:p-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center rounded-full border-2 border-warning/50 bg-warning/10 px-4 py-1.5 text-sm font-bold text-warning mb-4">
                    <Flame className="mr-2 h-4 w-4" />
                    NEW FEATURE
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    Daily <span className="gradient-text">Quest</span> System
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Complete a fresh coding challenge every day. Build your streak, 
                    earn XP, and unlock exclusive achievements!
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border-2 border-border">
                      <Flame className="h-5 w-5 text-warning" />
                      <div>
                        <div className="font-bold text-sm">Build Streaks</div>
                        <div className="text-xs text-muted-foreground">Daily consistency</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border-2 border-border">
                      <Crown className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-bold text-sm">Earn Badges</div>
                        <div className="text-xs text-muted-foreground">Show off skills</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border-2 border-border">
                      <Target className="h-5 w-5 text-success" />
                      <div>
                        <div className="font-bold text-sm">Track Progress</div>
                        <div className="text-xs text-muted-foreground">See your growth</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border-2 border-border">
                      <Star className="h-5 w-5 text-accent" />
                      <div>
                        <div className="font-bold text-sm">Compete</div>
                        <div className="text-xs text-muted-foreground">Beat the rest</div>
                      </div>
                    </div>
                  </div>

                  <Link to="/daily-challenge">
                    <Button variant="hero" size="lg">
                      <Calendar className="mr-2 h-5 w-5" />
                      Start Today's Quest
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                {/* Decorative side */}
                <div className="hidden md:flex flex-col items-center justify-center w-48">
                  <div className="text-8xl animate-bounce-subtle">🎯</div>
                  <div className="mt-4 font-pixel text-sm text-center text-muted-foreground">
                    NEW QUEST
                    <br />
                    DAILY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold">
              Power-Ups for Your <span className="gradient-text">Journey</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need to master Data Structures and Algorithms
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="quest-card p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-hover transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${feature.color} p-3`}>
                  <feature.icon className="h-6 w-6 text-background" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="border-t-2 border-border bg-card/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold">
              Explore <span className="gradient-text">All Topics</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From arrays to advanced graphs, conquer every algorithm pattern
            </p>
          </div>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="topic-pill cursor-pointer"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold">
              How to <span className="gradient-text">Play</span>
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="quest-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary font-pixel text-xl text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 font-bold text-lg">Pick a Quest</h3>
              <p className="text-sm text-muted-foreground">
                Choose a problem by topic, difficulty, or language track
              </p>
            </div>
            <div className="quest-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary font-pixel text-xl text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 font-bold text-lg">Write Code</h3>
              <p className="text-sm text-muted-foreground">
                Type your solution. No pasting—build real understanding!
              </p>
            </div>
            <div className="quest-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary font-pixel text-xl text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 font-bold text-lg">Level Up</h3>
              <p className="text-sm text-muted-foreground">
                Pass all tests, earn XP, and climb the leaderboard!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t-2 border-border bg-card/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-6 animate-bounce-subtle">🚀</div>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold">
            Ready to <span className="gradient-text">Start Your Adventure</span>?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Join the coding arena and begin your journey to DSA mastery today!
          </p>
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="xl">
              <Rocket className="mr-2 h-5 w-5" />
              Begin Your Quest
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary shadow-brutal">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-pixel text-sm text-primary">DSARENA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DSArena built by Vijay
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}