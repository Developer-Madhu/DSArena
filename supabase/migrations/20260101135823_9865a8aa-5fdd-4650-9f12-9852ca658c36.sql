-- Enforce exam eligibility when starting a new exam session
-- Adds a RESTRICTIVE INSERT policy so existing permissive policies cannot bypass it.

ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Create only if it doesn't already exist (idempotent-ish)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'exam_sessions'
      AND policyname = 'Users can start exam only if eligible'
  ) THEN
    CREATE POLICY "Users can start exam only if eligible"
    ON public.exam_sessions
    AS RESTRICTIVE
    FOR INSERT
    WITH CHECK (
      auth.uid() = user_id
      AND COALESCE(
        (
          SELECT e.is_eligible
          FROM public.exam_eligibility e
          WHERE e.user_id = auth.uid()
        ),
        true
      ) = true
    );
  END IF;
END $$;
