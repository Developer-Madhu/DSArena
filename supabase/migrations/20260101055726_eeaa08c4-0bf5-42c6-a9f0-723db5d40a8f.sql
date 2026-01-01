-- Enable realtime for exam_eligibility table
ALTER TABLE exam_eligibility REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.exam_eligibility;