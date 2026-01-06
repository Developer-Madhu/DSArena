-- Create the app_config table
CREATE TABLE IF NOT EXISTS public.app_config (
    key text PRIMARY KEY,
    value text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the config
CREATE POLICY "Allow public read access" 
ON public.app_config 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" 
ON public.app_config 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update" 
ON public.app_config 
FOR UPDATE 
TO authenticated 
USING (true);

-- Insert default value
INSERT INTO public.app_config (key, value)
VALUES ('python_exam_topic', 'All')
ON CONFLICT (key) DO NOTHING;