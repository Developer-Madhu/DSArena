import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { fetchSolvedProblems } from '@/lib/progressStorage';
import { getTimeStats, TimeStats } from '@/lib/timeTracking';
import { problemsData } from '@/lib/problemsData';
import { getAvailableTracks } from '@/lib/languageTracksData';
import { dailyChallengeService, DailyChallenge } from '@/lib/dailyChallenges';
import { DASHBOARD_CONFIG, RANK_THRESHOLDS } from '@/lib/constants';

export interface Profile {
    username: string | null;
    display_name: string | null;
    total_solved: number;
    easy_solved: number;
    medium_solved: number;
    hard_solved: number;
    streak_days: number;
    xp: number;
}

export interface SolvedProblem {
    id: string;
    title: string;
    difficulty: string;
    slug: string;
    type: 'official' | 'host';
}

export interface HistoryEntry {
    challengeDate: string;
    isCompleted: boolean;
    challenges: {
        title: string;
        difficulty: string;
        slug: string;
    };
}

export interface HeatmapEntry {
    date: string;
    count: number;
}

export function useDashboardLogic(user: User | null, authLoading: boolean) {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    // Daily Challenge state
    const [todayChallenge, setTodayChallenge] = useState<DailyChallenge | null>(null);
    const [todaySolved, setTodaySolved] = useState(false);
    const [userStreak, setUserStreak] = useState(0);
    const [challengeStats, setChallengeStats] = useState({
        totalCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        averageRuntime: 0,
        difficultyBreakdown: { easy: 0, medium: 0, hard: 0 }
    });
    const [challengeHistory, setChallengeHistory] = useState<any[]>([]);
    const [timeStats, setTimeStats] = useState<TimeStats | null>(null);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [heatmapData, setHeatmapData] = useState<HeatmapEntry[]>([]);

    const fetchDashboardData = useCallback(async () => {
        if (!user) return;

        try {
            setLoading(true);
            const { data: profileData } = await supabase
                .from('profiles')
                .select('username, display_name, total_solved, easy_solved, medium_solved, hard_solved, streak_days, xp')
                .eq('id', user.id)
                .maybeSingle();

            if (profileData) {
                const data = profileData as any;
                setProfile({
                    username: data.username,
                    display_name: data.display_name,
                    total_solved: data.total_solved || 0,
                    easy_solved: data.easy_solved || 0,
                    medium_solved: data.medium_solved || 0,
                    hard_solved: data.hard_solved || 0,
                    streak_days: data.streak_days || 0,
                    xp: data.xp || 0
                });
            }

            const [solved, stats, challenge, hasSolvedToday, streak, dStats, history] = await Promise.all([
                fetchSolvedProblems(user.id),
                getTimeStats(user.id).catch(() => null),
                dailyChallengeService.getTodayChallenge().catch(() => null),
                dailyChallengeService.hasUserSolvedToday().catch(() => false),
                dailyChallengeService.getUserDailyStreak().catch(() => 0),
                dailyChallengeService.getUserChallengeStats().catch(() => ({
                    totalCompleted: 0, currentStreak: 0, longestStreak: 0, averageRuntime: 0, difficultyBreakdown: { easy: 0, medium: 0, hard: 0 }
                })),
                dailyChallengeService.getChallengeHistory(DASHBOARD_CONFIG.CHALLENGE_HISTORY_LIMIT).catch(() => [])
            ]);

            setSolvedIds(solved);
            setTimeStats(stats);
            setTodayChallenge(challenge);
            setTodaySolved(hasSolvedToday);
            setUserStreak(streak);
            setChallengeStats(dStats);
            setChallengeHistory(history);

            // 1. Fetch Submissions for Accuracy & Heatmap Problems
            const { data: submissions } = await supabase
                .from('submissions')
                .select('tests_passed, tests_total, problem_id, problem_slug, created_at')
                .eq('user_id', user.id);

            // 2. Fetch User Activity for Heatmap Time
            const { data: userActivity } = await supabase
                .from('user_activity')
                .select('session_start, total_duration_seconds')
                .eq('user_id', user.id);

            // Calculate Accuracy
            if (submissions) {
                const totalPassed = submissions.reduce((sum, s) => sum + (s.tests_passed || 0), 0);
                const totalPossible = submissions.reduce((sum, s) => sum + (s.tests_total || 0), 0);
                setAccuracy(totalPossible > 0 ? (totalPassed / totalPossible) * 100 : 0);
            }

            // Calculate Heatmap Data
            if (submissions && userActivity) {
                const dailyMap = new Map<string, { problems: Set<string>, duration: number }>();

                submissions.forEach(s => {
                    if (!s.created_at) return;
                    const date = new Date(s.created_at).toISOString().split('T')[0];
                    if (!dailyMap.has(date)) dailyMap.set(date, { problems: new Set(), duration: 0 });
                    if (s.problem_id || s.problem_slug) {
                        dailyMap.get(date)!.problems.add((s.problem_id || s.problem_slug) as string);
                    }
                });

                userActivity.forEach(a => {
                    if (!a.session_start) return;
                    const date = new Date(a.session_start).toISOString().split('T')[0];
                    if (!dailyMap.has(date)) dailyMap.set(date, { problems: new Set(), duration: 0 });
                    dailyMap.get(date)!.duration += a.total_duration_seconds || 0;
                });

                const heatmap: HeatmapEntry[] = Array.from(dailyMap.entries()).map(([date, data]) => {
                    const problemsFactor = data.problems.size;
                    const timeFactor = (data.duration / 60) / 10;
                    const intensity = Math.ceil((problemsFactor + timeFactor) / 2);
                    return { date, count: intensity };
                });
                setHeatmapData(heatmap);
            }

            // 3. Polymorphic Universal History Fetching
            const { data: solvedRecords } = await supabase
                .from('user_solved')
                .select('problem_id, problem_slug, first_solved_at')
                .eq('user_id', user.id);

            if (solvedRecords && solvedRecords.length > 0) {
                const officialIds: string[] = [];
                const officialSlugs: string[] = [];
                const hostIds: string[] = [];
                const recordMap = new Map<string, any>();

                solvedRecords.forEach(r => {
                    const id = r.problem_id || r.problem_slug;
                    if (!id) return;
                    recordMap.set(id, r);

                    if (id.startsWith('host-q-')) {
                        hostIds.push(id.replace('host-q-', ''));
                    } else {
                        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                        if (UUID_REGEX.test(id)) officialIds.push(id);
                        else officialSlugs.push(id);
                    }
                });

                const [offResultById, offResultBySlug, hostResult] = await Promise.all([
                    officialIds.length > 0 ? supabase.from('problems').select('id, slug, title, difficulty').in('id', officialIds) : Promise.resolve({ data: [] }),
                    officialSlugs.length > 0 ? supabase.from('problems').select('id, slug, title, difficulty').in('slug', officialSlugs) : Promise.resolve({ data: [] }),
                    hostIds.length > 0 ? supabase.from('exam_questions').select('id, title').in('id', hostIds) : Promise.resolve({ data: [] })
                ]);

                const officialDetails = [...(offResultById.data || []), ...(offResultBySlug.data || [])];
                const hostDetails = hostResult.data || [];

                const universalHistory: HistoryEntry[] = [];

                // Normalize Official
                officialDetails.forEach(d => {
                    const rec = recordMap.get(d.id) || recordMap.get(d.slug);
                    if (rec) {
                        universalHistory.push({
                            challengeDate: rec.first_solved_at || new Date().toISOString(),
                            isCompleted: true,
                            challenges: {
                                title: d.title,
                                difficulty: d.difficulty || 'medium',
                                slug: d.slug || d.id
                            }
                        });
                    }
                });

                // Normalize Host (Ghost filtering included - if not found in db, discarded)
                hostDetails.forEach(d => {
                    const rec = recordMap.get(`host-q-${d.id}`);
                    if (rec) {
                        universalHistory.push({
                            challengeDate: rec.first_solved_at || new Date().toISOString(),
                            isCompleted: true,
                            challenges: {
                                title: d.title,
                                difficulty: 'medium', // Default for host questions
                                slug: `host-q-${d.id}`
                            }
                        });
                    }
                });

                // Sort by date descending and limit
                setChallengeHistory(universalHistory
                    .sort((a, b) => new Date(b.challengeDate).getTime() - new Date(a.challengeDate).getTime())
                    .slice(0, DASHBOARD_CONFIG.CHALLENGE_HISTORY_LIMIT)
                );
            }
        } catch (error) {
            console.error('Dashboard Logic Error:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/auth');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user, fetchDashboardData]);

    // Derived calculations
    const calculations = useMemo(() => {
        if (!solvedIds) return { dsaProgress: 0, rank: 'TRAINEE' };

        const availableTracks = getAvailableTracks();
        const allTrackProblemIds = new Set<string>();
        availableTracks.forEach(track => track.problems?.forEach(p => allTrackProblemIds.add(p.id)));

        const dsaProblems = problemsData.filter(p => !allTrackProblemIds.has(p.id));
        const dsaSolvedCount = Array.from(solvedIds).filter(id => dsaProblems.some(p => p.id === id)).length;
        const progress = dsaProblems.length > 0 ? (dsaSolvedCount / dsaProblems.length) * 100 : 0;

        let rank = 'TRAINEE';
        if (solvedIds.size > RANK_THRESHOLDS.ELITE_COMMANDER) rank = 'ELITE COMMANDER';
        else if (solvedIds.size > RANK_THRESHOLDS.SENIOR_TACTICIAN) rank = 'SENIOR TACTICIAN';
        else if (solvedIds.size > RANK_THRESHOLDS.PRO_ELITE) rank = 'PRO-ELITE';
        else if (solvedIds.size > RANK_THRESHOLDS.OPERATIVE) rank = 'OPERATIVE';

        return { dsaProgress: progress, rank };
    }, [solvedIds]);

    const handleEnterArena = useCallback(() => {
        const unsolved = problemsData.find(p => !solvedIds.has(p.id));
        if (unsolved) navigate(`/problem/${unsolved.slug}`);
        else navigate('/problems');
    }, [solvedIds, navigate]);

    return {
        profile,
        solvedIds,
        loading,
        todayChallenge,
        todaySolved,
        userStreak,
        challengeStats,
        challengeHistory,
        timeStats,
        accuracy,
        heatmapData,
        calculations,
        handleEnterArena,
        refreshData: fetchDashboardData
    };
}
