-- Allow deleting instances even if they have student session history
ALTER TABLE public.exam_sessions 
DROP CONSTRAINT IF EXISTS exam_sessions_exam_instance_id_fkey;

ALTER TABLE public.exam_sessions 
ADD CONSTRAINT exam_sessions_exam_instance_id_fkey 
FOREIGN KEY (exam_instance_id) 
REFERENCES public.exam_instances(id) 
ON DELETE CASCADE;