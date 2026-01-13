-- This allows sessions to be deleted while automatically clearing student history links
ALTER TABLE public.exam_eligibility
DROP CONSTRAINT IF EXISTS exam_eligibility_last_exam_session_id_fkey;

ALTER TABLE public.exam_eligibility
ADD CONSTRAINT exam_eligibility_last_exam_session_id_fkey 
FOREIGN KEY (last_exam_session_id) 
REFERENCES exam_sessions(id) 
ON DELETE SET NULL;