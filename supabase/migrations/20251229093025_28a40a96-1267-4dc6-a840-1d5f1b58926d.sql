-- Enable full replica identity for realtime updates on user_solved
ALTER TABLE public.user_solved REPLICA IDENTITY FULL;

-- Also enable for leaderboard_achievements to ensure complete data
ALTER TABLE public.leaderboard_achievements REPLICA IDENTITY FULL;