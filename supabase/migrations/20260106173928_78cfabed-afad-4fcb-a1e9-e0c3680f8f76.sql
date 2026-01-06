-- Allow admins to delete exam sessions
-- This policy grants users with the 'admin' role permission to delete records from the exam_sessions table.
DROP POLICY IF EXISTS "Admins can delete exam sessions" ON public.exam_sessions;

CREATE POLICY "Admins can delete exam sessions" ON public.exam_sessions
FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Allow admins to delete exam eligibility records
-- This policy grants users with the 'admin' role permission to delete records from the exam_eligibility table.
DROP POLICY IF EXISTS "Admins can delete eligibility" ON public.exam_eligibility;

CREATE POLICY "Admins can delete eligibility" ON public.exam_eligibility
FOR DELETE USING (has_role(auth.uid(), 'admin'));