-- Fix function search path for get_skill_tier
CREATE OR REPLACE FUNCTION public.get_skill_tier(rating INTEGER)
RETURNS skill_tier
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
    IF rating >= 1800 THEN RETURN 'diamond';
    ELSIF rating >= 1500 THEN RETURN 'platinum';
    ELSIF rating >= 1200 THEN RETURN 'gold';
    ELSIF rating >= 1000 THEN RETURN 'silver';
    ELSE RETURN 'bronze';
    END IF;
END;
$$;