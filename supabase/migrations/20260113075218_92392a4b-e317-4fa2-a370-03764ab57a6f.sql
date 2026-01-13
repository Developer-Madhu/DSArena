-- Link sessions to host instances
ALTER TABLE public.exam_sessions 
ADD COLUMN IF NOT EXISTS exam_instance_id UUID REFERENCES public.exam_instances(id);

-- Index for faster performance
CREATE INDEX IF NOT EXISTS idx_exam_sessions_instance ON public.exam_sessions(exam_instance_id);