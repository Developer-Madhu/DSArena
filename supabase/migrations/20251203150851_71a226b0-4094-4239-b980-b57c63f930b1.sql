-- Drop existing restrictive policies on user_solved
DROP POLICY IF EXISTS "Users can manage own solved" ON public.user_solved;
DROP POLICY IF EXISTS "Users can view own solved" ON public.user_solved;

-- Create permissive policies for user_solved
CREATE POLICY "Users can insert own solved"
ON public.user_solved
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own solved"
ON public.user_solved
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own solved"
ON public.user_solved
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own solved"
ON public.user_solved
FOR DELETE
USING (auth.uid() = user_id);