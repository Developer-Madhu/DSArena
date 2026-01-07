-- -- Create the app_config table if it doesn't exist
-- CREATE TABLE IF NOT EXISTS public.app_config (
--     key text PRIMARY KEY,
--     value text NOT NULL
-- );

-- -- Enable Row Level Security
-- ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- -- Create policies
-- -- Allow anyone to read the config (needed for students taking exams)
-- CREATE POLICY "Allow public read access" 
-- ON public.app_config 
-- FOR SELECT 
-- USING (true);

-- -- Allow authenticated users to insert/update (for admins)
-- CREATE POLICY "Allow authenticated insert" 
-- ON public.app_config 
-- FOR INSERT 
-- TO authenticated 
-- WITH CHECK (true);

-- CREATE POLICY "Allow authenticated update" 
-- ON public.app_config 
-- FOR UPDATE 
-- TO authenticated 
-- USING (true);

-- -- Insert default value if not exists
-- INSERT INTO public.app_config (key, value)
-- VALUES ('python_exam_topic', 'All')
-- ON CONFLICT (key) DO NOTHING;
-- Create the app_config table
CREATE TABLE IF NOT EXISTS public.app_config (
    key text PRIMARY KEY,
    value text NOT NULL
);
-- Enable Row Level Security
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;
-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access" ON public.app_config;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.app_config;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.app_config;
-- Allow anyone to read the config
CREATE POLICY "Allow public read access" 
ON public.app_config 
FOR SELECT 
USING (true);
-- Allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert" 
ON public.app_config 
FOR INSERT 
TO authenticated 
WITH CHECK (true);
CREATE POLICY "Allow authenticated update" 
ON public.app_config 
FOR UPDATE 
TO authenticated 
USING (true);
-- Insert default value
INSERT INTO public.app_config (key, value)
VALUES ('python_exam_topic', 'All')
ON CONFLICT (key) DO NOTHING;