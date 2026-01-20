import { useState, useEffect, useCallback } from 'react';
import { fetchLivesData, getTimeUntilNextRestore, hasLives, loseLife, formatTimeRemaining } from '@/lib/livesSystem';
import { LIVES_CONFIG, REFRESH_INTERVALS } from '@/lib/constants';
import { toast } from 'sonner';

export function useLivesManager(userId?: string) {
    const [lives, setLives] = useState<number>(LIVES_CONFIG.MAX_LIVES);
    const [noLives, setNoLives] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [timeUntilRestore, setTimeUntilRestore] = useState<number | null>(null);

    const refreshLives = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            return;
        }
        const data = await fetchLivesData(userId);
        setLives(data.lives);
        setNoLives(data.lives === 0);
        setIsLoading(false);
        return data;
    }, [userId]);

    useEffect(() => {
        if (userId) {
            refreshLives();
        }
    }, [userId, refreshLives]);

    // Polling for timer/restore
    useEffect(() => {
        if (!userId) return;

        const timer = setInterval(() => {
            const remaining = getTimeUntilNextRestore(userId);
            setTimeUntilRestore(remaining);

            // If we were at 0 lives and now have lives (due to auto-restore)
            if (noLives && hasLives(userId)) {
                refreshLives();
            }
        }, REFRESH_INTERVALS.LIVES_POLLING_MS);

        return () => clearInterval(timer);
    }, [userId, noLives, refreshLives]);

    const handlePenalty = useCallback(() => {
        if (!userId) return null;

        // Check if user has lives before penalizing
        if (!hasLives(userId)) return null;

        const newLivesData = loseLife(userId);
        setLives(newLivesData.lives);

        if (newLivesData.lives === 0) {
            setNoLives(true);
            toast.error('System Inactive. Respawn in 10:00.', {
                duration: 5000,
            });
        } else {
            toast.warning(`⚠️ BREACH DETECTED. Life Stripped. ${newLivesData.lives} Remain. FOCUS!`, {
                duration: 3000,
            });
        }

        return newLivesData;
    }, [userId]);

    return {
        lives,
        noLives,
        isLoading,
        timeUntilRestore,
        formattedTimeRemaining: timeUntilRestore ? formatTimeRemaining(timeUntilRestore) : null,
        penalize: handlePenalty,
        refreshLives,
        setNoLives
    };
}
