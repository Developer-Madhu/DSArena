-- Add exam eligibility tracking to exam_sessions
ALTER TABLE public.exam_sessions 
ADD COLUMN IF NOT EXISTS passed boolean DEFAULT NULL,
ADD COLUMN IF NOT EXISTS can_retake boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS retake_approved_by uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS retake_approved_at timestamp with time zone;

-- Create exam_eligibility table to track user exam access
CREATE TABLE IF NOT EXISTS public.exam_eligibility (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_eligible boolean DEFAULT true,
  last_exam_passed boolean DEFAULT NULL,
  last_exam_session_id uuid REFERENCES public.exam_sessions(id),
  blocked_at timestamp with time zone,
  unblocked_by uuid REFERENCES auth.users(id),
  unblocked_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.exam_eligibility ENABLE ROW LEVEL SECURITY;

-- RLS Policies for exam_eligibility
CREATE POLICY "Users can view own eligibility" 
ON public.exam_eligibility 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all eligibility" 
ON public.exam_eligibility 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update eligibility" 
ON public.exam_eligibility 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert eligibility" 
ON public.exam_eligibility 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Update exam_sessions policies to allow admin view
CREATE POLICY "Admins can view all exam sessions" 
ON public.exam_sessions 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update exam sessions" 
ON public.exam_sessions 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'));

-- Allow admins to view all profiles for the admin panel
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));