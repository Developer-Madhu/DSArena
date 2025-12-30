import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { RefreshCw, Sparkles } from 'lucide-react';
import glitchyAvatar from '@/assets/glitchy-avatar.png';

interface UserActivity {
  totalSolved: number;
  streakDays: number;
  lastActivity: string | null;
  preferredLanguage: string;
  recommendedLevel: string;
  recentTopic?: string;
  strugglingTopics: string[];
  strongTopics: string[];
}

const GLITCHY_MESSAGES = {
  welcome: [
    "DUDE! Ready to crush some code today?",
    "Hey there, code warrior! What's on the agenda?",
    "DUDE! I've been waiting for you. Let's solve some problems!",
  ],
  streak: [
    "DUDE! {days} day streak! You're on fire! 🔥",
    "Amazing! {days} days in a row! Keep that momentum going!",
    "{days} day streak! That's some serious dedication!",
  ],
  noStreak: [
    "DUDE! Let's start a new streak today!",
    "Hey! A fresh start awaits. Ready to code?",
    "Time to build that streak back up! I believe in you!",
  ],
  progress: [
    "You've solved {count} problems! Impressive work!",
    "DUDE! {count} problems down! You're leveling up fast!",
    "{count} problems conquered! Your skills are growing!",
  ],
  struggling: [
    "I noticed {topic} is tricky. Want to try some easier problems first?",
    "DUDE! {topic} can be tough. Let's build up to it step by step!",
    "{topic} giving you trouble? That's totally normal - practice makes perfect!",
  ],
  strong: [
    "You're crushing it in {topic}! Maybe try something harder?",
    "DUDE! You're a {topic} master! Time to level up!",
    "{topic} is your strength! Keep pushing those boundaries!",
  ],
  idle: [
    "Haven't seen you in a while! Ready to jump back in?",
    "DUDE! I missed you! Let's code together!",
    "Welcome back! Your problems are waiting for you!",
  ],
  encourage: [
    "Every problem you solve makes you a better coder!",
    "DUDE! Small steps lead to big victories!",
    "Keep going! You're doing better than you think!",
    "The best coders were once beginners too!",
  ],
};

export function GlitchyCompanion() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activity, setActivity] = useState<UserActivity | null>(null);

  const fetchActivity = useCallback(async () => {
    if (!user) return;

    try {
      // Fetch profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_solved, streak_days, last_activity_date, strongest_topic, weakest_topic')
        .eq('id', user.id)
        .maybeSingle();

      // Fetch preferences
      const { data: prefs } = await supabase
        .from('user_preferences')
        .select('preferred_language, recommended_level')
        .eq('user_id', user.id)
        .maybeSingle();

      // Fetch learning plan for struggling topics
      const { data: planItems } = await supabase
        .from('learning_plan')
        .select('topic, failed_attempts, is_completed')
        .eq('user_id', user.id);

      const strugglingTopics = planItems
        ?.filter(item => item.failed_attempts >= 2 && !item.is_completed)
        .map(item => item.topic)
        .filter(Boolean) as string[] || [];

      const strongTopics = profile?.strongest_topic ? [profile.strongest_topic] : [];

      setActivity({
        totalSolved: profile?.total_solved || 0,
        streakDays: profile?.streak_days || 0,
        lastActivity: profile?.last_activity_date,
        preferredLanguage: prefs?.preferred_language || 'python',
        recommendedLevel: prefs?.recommended_level || 'beginner',
        strugglingTopics,
        strongTopics,
      });
    } catch (error) {
      console.error('Failed to fetch activity:', error);
    }
  }, [user]);

  const generateMessage = useCallback(() => {
    if (!activity) {
      return GLITCHY_MESSAGES.welcome[Math.floor(Math.random() * GLITCHY_MESSAGES.welcome.length)];
    }

    const messages: string[] = [];

    // Check streak
    if (activity.streakDays > 0) {
      const streakMsg = GLITCHY_MESSAGES.streak[Math.floor(Math.random() * GLITCHY_MESSAGES.streak.length)];
      messages.push(streakMsg.replace('{days}', activity.streakDays.toString()));
    } else {
      messages.push(...GLITCHY_MESSAGES.noStreak);
    }

    // Check progress
    if (activity.totalSolved > 0) {
      const progressMsg = GLITCHY_MESSAGES.progress[Math.floor(Math.random() * GLITCHY_MESSAGES.progress.length)];
      messages.push(progressMsg.replace('{count}', activity.totalSolved.toString()));
    }

    // Check struggling topics
    if (activity.strugglingTopics.length > 0) {
      const topic = activity.strugglingTopics[0];
      const struggleMsg = GLITCHY_MESSAGES.struggling[Math.floor(Math.random() * GLITCHY_MESSAGES.struggling.length)];
      messages.push(struggleMsg.replace('{topic}', topic));
    }

    // Check strong topics
    if (activity.strongTopics.length > 0) {
      const topic = activity.strongTopics[0];
      const strongMsg = GLITCHY_MESSAGES.strong[Math.floor(Math.random() * GLITCHY_MESSAGES.strong.length)];
      messages.push(strongMsg.replace('{topic}', topic));
    }

    // Check idle time
    if (activity.lastActivity) {
      const lastDate = new Date(activity.lastActivity);
      const daysSinceActive = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceActive > 2) {
        messages.push(...GLITCHY_MESSAGES.idle);
      }
    }

    // Add encouragement
    messages.push(...GLITCHY_MESSAGES.encourage);

    // Pick a random message
    return messages[Math.floor(Math.random() * messages.length)];
  }, [activity]);

  const refreshMessage = useCallback(async () => {
    setIsThinking(true);
    await fetchActivity();
    setTimeout(() => {
      setMessage(generateMessage());
      setIsThinking(false);
    }, 500);
  }, [fetchActivity, generateMessage]);

  useEffect(() => {
    if (user) {
      fetchActivity().then(() => {
        setMessage(generateMessage());
      });
    }
  }, [user, fetchActivity, generateMessage]);

  // Auto-refresh message every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(generateMessage());
    }, 30000);
    return () => clearInterval(interval);
  }, [generateMessage]);

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 border-primary/20 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Glitchy Avatar */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-1 transition-all",
              isThinking && "animate-pulse"
            )}>
              <img
                src={glitchyAvatar}
                alt="Glitchy"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-background">
              <Sparkles className="w-2 h-2 text-success-foreground m-0.5" />
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-primary">Glitchy</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshMessage}
                disabled={isThinking}
                className="h-6 w-6 p-0"
              >
                <RefreshCw className={cn("h-3 w-3", isThinking && "animate-spin")} />
              </Button>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-border/50">
              <p className={cn(
                "text-sm text-foreground transition-opacity",
                isThinking && "opacity-50"
              )}>
                {isThinking ? "Thinking..." : message}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
