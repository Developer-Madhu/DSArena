import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import {
  Code2,
  Zap,
  Shield,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Terminal,
  BarChart3,
  Users,
  Calendar,
  Flame,
  Star,
  Target,
  Crown,
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Daily Challenge System',
    description:
      'New! Fresh DSA problems every day with streak tracking, achievement badges, and progress monitoring.',
  },
  {
    icon: Code2,
    title: 'Python-Only Editor',
    description:
      'Built-in Monaco editor with syntax highlighting, auto-complete, and bracket matching for Python 3.11+.',
  },
  {
    icon: Shield,
    title: 'No Paste, No Cheat',
    description:
      'Paste protection ensures you type every character. Build real muscle memory and understanding.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description:
      'Run your code against visible test cases instantly. Submit to test against hidden cases.',
  },
  {
    icon: Trophy,
    title: 'Track Progress',
    description:
      'Monitor your solved problems, streaks, runtime stats, and climb the leaderboard.',
  },
  {
    icon: Terminal,
    title: 'Secure Sandboxing',
    description:
      'Your code runs in an isolated environment with strict time and memory limits.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description:
      'See your performance over time with runtime, memory usage, and acceptance rate metrics.',
  },
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="container relative mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Zap className="mr-2 h-4 w-4" />
              Master DSA with Python
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="gradient-text">Practice</span> DSA Problems
              <br />
              <span className="text-foreground">The Right Way</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A Pre-LeetCode style platform built for serious Python learners. No pasting, no shortcuts—just
              pure problem-solving to build real coding skills.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Practicing
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

      {/* Daily Challenge Section */}
      <section className="border-y border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Calendar className="mr-2 h-4 w-4" />
              New Feature
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              <span className="gradient-text">Daily Challenge</span> System
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Build consistent coding habits with our new daily challenge system. Get a fresh DSA problem every day, 
              track your streak, and compete with yourself to improve!
            </p>
            
            {/* Challenge Features Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Flame className="h-5 w-5 text-warning" />
                </div>
                <h3 className="font-semibold mb-1">Build Streaks</h3>
                <p className="text-sm text-muted-foreground">Daily challenges to maintain coding consistency</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Fresh Problems</h3>
                <p className="text-sm text-muted-foreground">New challenges selected from our problem database</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <Crown className="h-5 w-5 text-success" />
                </div>
                <h3 className="font-semibold mb-1">Track Progress</h3>
                <p className="text-sm text-muted-foreground">Monitor completion rates and performance metrics</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Star className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">Earn Achievements</h3>
                <p className="text-sm text-muted-foreground">Unlock badges for streaks and milestones</p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Calendar className="mr-2 h-5 w-5" />
                  Start Daily Challenge
                </Button>
              </Link>
              <Link to="/daily-challenge">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Preview Today's Challenge
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">150+</div>
              <div className="mt-1 text-sm text-muted-foreground">Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">17</div>
              <div className="mt-1 text-sm text-muted-foreground">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">∞</div>
              <div className="mt-1 text-sm text-muted-foreground">Daily Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">8</div>
              <div className="mt-1 text-sm text-muted-foreground">Tests per Problem</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">∞</div>
              <div className="mt-1 text-sm text-muted-foreground">Practice Sessions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything You Need to <span className="gradient-text">Master DSA</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Built with features that help you learn effectively and track your progress.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="border-t border-border bg-card/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Cover All <span className="gradient-text">Essential Topics</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From arrays to advanced graphs, master every data structure and algorithm pattern.
            </p>
          </div>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              How <span className="gradient-text">DSArena</span> Works
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 font-semibold">Choose a Problem</h3>
              <p className="text-sm text-muted-foreground">
                Browse by topic, difficulty, or search. Pick where you want to improve.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 font-semibold">Write Your Solution</h3>
              <p className="text-sm text-muted-foreground">
                Type your Python code in our editor. No pasting—build real understanding.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 font-semibold">Run & Submit</h3>
              <p className="text-sm text-muted-foreground">
                Test with visible cases, then submit to pass all 8 tests and track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card/50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to <span className="gradient-text">Level Up</span>?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Join thousands of developers mastering Data Structures and Algorithms with Python.
          </p>
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="xl">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Code2 className="h-4 w-4 text-primary-foreground" />
              </div>
              {/* <span className="font-semibold">DSArena</span> */}
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DSArena by Krit.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
