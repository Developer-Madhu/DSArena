import { useState, useEffect, useCallback, useRef } from 'react';

interface UseExamTimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function useExamTimer({ totalSeconds, onTimeUp, isActive }: UseExamTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);
  const [timeSpent, setTimeSpent] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Two hours in seconds (when submit becomes enabled)
  const TWO_HOURS = 2 * 60 * 60; // 7200 seconds
  
  const canSubmit = timeSpent >= TWO_HOURS;

  const startTimer = useCallback(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
  }, []);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now() - (timeSpent * 1000);
    }
  }, [timeSpent]);

  useEffect(() => {
    if (!isActive) {
      pauseTimer();
      return;
    }

    startTimer();

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          pauseTimer();
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
      
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, startTimer, pauseTimer, onTimeUp]);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getTimeUntilSubmit = useCallback(() => {
    const remaining = TWO_HOURS - timeSpent;
    return remaining > 0 ? remaining : 0;
  }, [timeSpent]);

  return {
    timeRemaining,
    timeSpent,
    canSubmit,
    formatTime,
    getTimeUntilSubmit,
    pauseTimer,
    resumeTimer,
  };
}
