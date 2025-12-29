-- Create enum for arena mode
CREATE TYPE public.arena_mode AS ENUM ('practice', 'interview');

-- Create enum for arena result
CREATE TYPE public.arena_result AS ENUM ('solved', 'failed', 'timeout', 'abandoned');

-- Create enum for skill tier
CREATE TYPE public.skill_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum', 'diamond');

-- Skill ratings per topic per user
CREATE TABLE public.skill_ratings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 1000,
    tier skill_tier NOT NULL DEFAULT 'silver',
    problems_solved INTEGER NOT NULL DEFAULT 0,
    problems_attempted INTEGER NOT NULL DEFAULT 0,
    accuracy NUMERIC(5,2) DEFAULT 0,
    avg_time_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, topic)
);

-- Arena sessions tracking
CREATE TABLE public.arena_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id UUID,
    problem_slug TEXT,
    mode arena_mode NOT NULL,
    topic TEXT NOT NULL,
    difficulty difficulty_level NOT NULL,
    time_limit_seconds INTEGER,
    time_taken_seconds INTEGER,
    hints_used BOOLEAN DEFAULT false,
    attempts_count INTEGER DEFAULT 1,
    rating_before INTEGER,
    rating_after INTEGER,
    rating_change INTEGER DEFAULT 0,
    result arena_result,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Topic unlocks tracking
CREATE TABLE public.topic_unlocks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    difficulty difficulty_level NOT NULL,
    unlocked BOOLEAN DEFAULT false,
    problems_required INTEGER DEFAULT 0,
    problems_completed INTEGER DEFAULT 0,
    accuracy_required NUMERIC(5,2) DEFAULT 0,
    current_accuracy NUMERIC(5,2) DEFAULT 0,
    unlocked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, topic, difficulty)
);

-- Add interview_readiness to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS interview_readiness INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS strongest_topic TEXT,
ADD COLUMN IF NOT EXISTS weakest_topic TEXT,
ADD COLUMN IF NOT EXISTS total_arena_sessions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS interview_sessions_completed INTEGER DEFAULT 0;

-- Enable RLS on all new tables
ALTER TABLE public.skill_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arena_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_unlocks ENABLE ROW LEVEL SECURITY;

-- RLS policies for skill_ratings
CREATE POLICY "Users can view own skill ratings"
ON public.skill_ratings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skill ratings"
ON public.skill_ratings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skill ratings"
ON public.skill_ratings FOR UPDATE
USING (auth.uid() = user_id);

-- Public leaderboard view for skill ratings
CREATE POLICY "Public skill ratings are viewable"
ON public.skill_ratings FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = skill_ratings.user_id 
    AND profiles.is_public = true
));

-- RLS policies for arena_sessions
CREATE POLICY "Users can view own arena sessions"
ON public.arena_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own arena sessions"
ON public.arena_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own arena sessions"
ON public.arena_sessions FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for topic_unlocks
CREATE POLICY "Users can view own topic unlocks"
ON public.topic_unlocks FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own topic unlocks"
ON public.topic_unlocks FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own topic unlocks"
ON public.topic_unlocks FOR UPDATE
USING (auth.uid() = user_id);

-- Function to calculate tier from rating
CREATE OR REPLACE FUNCTION public.get_skill_tier(rating INTEGER)
RETURNS skill_tier
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
    IF rating >= 1800 THEN RETURN 'diamond';
    ELSIF rating >= 1500 THEN RETURN 'platinum';
    ELSIF rating >= 1200 THEN RETURN 'gold';
    ELSIF rating >= 1000 THEN RETURN 'silver';
    ELSE RETURN 'bronze';
    END IF;
END;
$$;

-- Trigger to auto-update tier when rating changes
CREATE OR REPLACE FUNCTION public.update_skill_tier()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.tier := get_skill_tier(NEW.rating);
    NEW.updated_at := now();
    IF NEW.problems_attempted > 0 THEN
        NEW.accuracy := ROUND((NEW.problems_solved::NUMERIC / NEW.problems_attempted::NUMERIC) * 100, 2);
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_skill_ratings_tier
BEFORE UPDATE ON public.skill_ratings
FOR EACH ROW
EXECUTE FUNCTION public.update_skill_tier();

-- Enable realtime for skill ratings
ALTER TABLE public.skill_ratings REPLICA IDENTITY FULL;
ALTER TABLE public.arena_sessions REPLICA IDENTITY FULL;