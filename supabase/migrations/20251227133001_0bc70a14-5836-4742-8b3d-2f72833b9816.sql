-- Problem sessions table to track time spent per problem
CREATE TABLE public.problem_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  problem_id uuid REFERENCES public.problems(id) ON DELETE SET NULL,
  problem_slug text,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  duration_seconds integer,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- User activity table to track overall website session time
CREATE TABLE public.user_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  session_start timestamptz NOT NULL DEFAULT now(),
  session_end timestamptz,
  total_duration_seconds integer DEFAULT 0,
  problems_viewed integer DEFAULT 0,
  problems_solved integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Leaderboard achievements table for cute tags
CREATE TABLE public.leaderboard_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tag_name text NOT NULL,
  tag_icon text NOT NULL,
  tag_type text NOT NULL CHECK (tag_type IN ('daily_winner', 'weekly_winner', 'streak_master', 'speed_demon', 'night_owl', 'early_bird', 'diamond_mind', 'bullseye', 'wizard')),
  earned_at timestamptz DEFAULT now()
);

-- Add columns to profiles for fast solve tracking and time stats
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS consecutive_fast_solves integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_fast_solve_at timestamptz,
ADD COLUMN IF NOT EXISTS total_time_spent_seconds integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS avg_time_per_problem_seconds integer DEFAULT 0;

-- Enable RLS on new tables
ALTER TABLE public.problem_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_achievements ENABLE ROW LEVEL SECURITY;

-- RLS policies for problem_sessions
CREATE POLICY "Users can manage own problem sessions"
ON public.problem_sessions FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS policies for user_activity
CREATE POLICY "Users can manage own activity"
ON public.user_activity FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS policies for leaderboard_achievements
CREATE POLICY "Achievements are viewable by everyone"
ON public.leaderboard_achievements FOR SELECT
USING (true);

CREATE POLICY "Users can insert own achievements"
ON public.leaderboard_achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Enable realtime for leaderboards
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_solved;
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard_achievements;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_problem_sessions_user_id ON public.problem_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_problem_sessions_started_at ON public.problem_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_achievements_user_id ON public.leaderboard_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_achievements_earned_at ON public.leaderboard_achievements(earned_at);