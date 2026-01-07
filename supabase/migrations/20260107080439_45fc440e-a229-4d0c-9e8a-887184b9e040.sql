-- Create question_variants table for storing AI-generated question variants
CREATE TABLE IF NOT EXISTS public.question_variants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  original_question_id text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  input_format text NOT NULL,
  output_format text NOT NULL,
  visible_test_cases jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster lookups by original question ID
CREATE INDEX IF NOT EXISTS question_variants_original_id_idx ON public.question_variants(original_question_id);

-- Enable Row Level Security
ALTER TABLE public.question_variants ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read question variants
CREATE POLICY "Allow public read access"
  ON public.question_variants
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert new variants
CREATE POLICY "Allow authenticated insert"
  ON public.question_variants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);