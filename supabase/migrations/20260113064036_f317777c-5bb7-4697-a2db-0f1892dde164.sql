-- Add is_root column to admins table if it doesn't exist
ALTER TABLE public.admins ADD COLUMN IF NOT EXISTS is_root BOOLEAN DEFAULT FALSE;

-- Drop existing policies if they exist and create new open policies
DROP POLICY IF EXISTS "Admins can view own record" ON public.admins;
DROP POLICY IF EXISTS "Admins can update own record" ON public.admins;
DROP POLICY IF EXISTS "Admins can manage exam instances" ON public.exam_instances;
DROP POLICY IF EXISTS "Admins can view exam instances" ON public.exam_instances;
DROP POLICY IF EXISTS "Admins can manage exam questions" ON public.exam_questions;
DROP POLICY IF EXISTS "Admins can view exam questions" ON public.exam_questions;

-- Create open policies for setup
CREATE POLICY "Allow all on admins" ON public.admins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on exam_instances" ON public.exam_instances FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on exam_questions" ON public.exam_questions FOR ALL USING (true) WITH CHECK (true);