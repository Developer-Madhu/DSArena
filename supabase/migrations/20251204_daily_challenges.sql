-- Daily Challenge System Migration
-- Creates the missing tables for daily challenges functionality

-- Daily challenges table
CREATE TABLE public.daily_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty difficulty_level NOT NULL DEFAULT 'easy',
  input_format TEXT,
  output_format TEXT,
  constraints TEXT,
  time_limit_ms INTEGER DEFAULT 2000,
  memory_limit_mb INTEGER DEFAULT 256,
  test_cases JSONB NOT NULL DEFAULT '[]',
  story TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Daily challenge progress table
CREATE TABLE public.daily_challenge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_date DATE NOT NULL REFERENCES public.daily_challenges(date) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  solved_at TIMESTAMPTZ,
  runtime_ms INTEGER,
  language TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, challenge_date)
);

-- Add foreign key constraint explicitly
ALTER TABLE public.daily_challenge_progress 
ADD CONSTRAINT fk_daily_challenge_progress_challenge_date 
FOREIGN KEY (challenge_date) REFERENCES public.daily_challenges(date) ON DELETE CASCADE;

-- Indexes for performance
CREATE INDEX idx_daily_challenges_date ON public.daily_challenges(date);
CREATE INDEX idx_daily_challenge_progress_user_date ON public.daily_challenge_progress(user_id, challenge_date);
CREATE INDEX idx_daily_challenge_progress_user_completed ON public.daily_challenge_progress(user_id, is_completed);
CREATE INDEX idx_daily_challenge_progress_completed_date ON public.daily_challenge_progress(is_completed, challenge_date);

-- Enable RLS
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenge_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for daily_challenges
CREATE POLICY "Daily challenges are viewable by everyone" 
ON public.daily_challenges 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Admins can manage daily challenges" 
ON public.daily_challenges 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for daily_challenge_progress
CREATE POLICY "Users can view own challenge progress" 
ON public.daily_challenge_progress 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own challenge progress" 
ON public.daily_challenge_progress 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenge progress" 
ON public.daily_challenge_progress 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Update timestamp triggers
CREATE TRIGGER update_daily_challenges_updated_at
  BEFORE UPDATE ON public.daily_challenges
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_daily_challenge_progress_updated_at
  BEFORE UPDATE ON public.daily_challenge_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Insert some sample daily challenges for testing
INSERT INTO public.daily_challenges (date, title, description, category, difficulty, input_format, output_format, constraints, time_limit_ms, memory_limit_mb, test_cases) VALUES
('2025-12-25', 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 'Array', 'easy', 'First line contains an integer n (array size). Second line contains n space-separated integers. Third line contains target integer.', 'Two space-separated indices.', '2 <= n <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.', 2000, 256, '[
  {"input": "4\n2 7 11 15\n9", "expectedOutput": "0 1", "is_visible": true},
  {"input": "3\n3 2 4\n6", "expectedOutput": "1 2", "is_visible": true},
  {"input": "5\n1 2 3 4 5\n8", "expectedOutput": "2 4", "is_visible": false}
]'::jsonb),
('2025-12-26', 'Palindrome Number', 'Given an integer x, return true if x is palindrome integer.', 'Math', 'easy', 'Single integer x.', 'True or False.', '-2^31 <= x <= 2^31 - 1', 1000, 128, '[
  {"input": "121", "expectedOutput": "True", "is_visible": true},
  {"input": "-121", "expectedOutput": "False", "is_visible": true},
  {"input": "10", "expectedOutput": "False", "is_visible": false}
]'::jsonb),
('2025-12-27', 'Valid Parentheses', 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.', 'Stack', 'easy', 'String s containing parentheses characters.', 'True if valid, False otherwise.', '1 <= s.length <= 10^4\ns consists of parentheses only "()[]{}".', 1500, 256, '[
  {"input": "()", "expectedOutput": "True", "is_visible": true},
  {"input": "()[]{}", "expectedOutput": "True", "is_visible": true},
  {"input": "(]", "expectedOutput": "False", "is_visible": false}
]'::jsonb);
