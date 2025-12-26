-- Add lives system columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS lives integer NOT NULL DEFAULT 3,
ADD COLUMN IF NOT EXISTS lost_times jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.lives IS 'Current number of lives (0-3)';
COMMENT ON COLUMN public.profiles.lost_times IS 'Array of timestamps when lives were lost';