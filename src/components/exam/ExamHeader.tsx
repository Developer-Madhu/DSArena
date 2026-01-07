import React from 'react';
import { Heart, Clock, AlertTriangle, Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ExamHeaderProps {
  language: string;
  currentQuestion: number;
  totalQuestions: number;
  heartsRemaining: number;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  canSubmit: boolean;
  timeUntilSubmit: number;
}

export function ExamHeader({
  language,
  currentQuestion,
  totalQuestions,
  heartsRemaining,
  timeRemaining,
  formatTime,
  canSubmit,
  timeUntilSubmit,
}: ExamHeaderProps) {
  const isTimeLow = timeRemaining < 30 * 60; // Less than 30 minutes
  const isTimeCritical = timeRemaining < 10 * 60; // Less than 10 minutes

  const progressPercent = ((currentQuestion) / totalQuestions) * 100;

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Exam info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">DSArena Exam</span>
            <Badge variant="secondary" className="uppercase">
              {language}
            </Badge>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <Progress value={progressPercent} className="w-24 h-2" />
          </div>
        </div>

        {/* Center - Timer */}
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
          isTimeCritical ? "bg-destructive/20 text-destructive animate-pulse" :
            isTimeLow ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
              "bg-muted"
        )}>
          <Clock className="h-4 w-4" />
          <span className={cn(
            "font-mono text-lg font-bold",
            isTimeCritical && "text-destructive"
          )}>
            {formatTime(timeRemaining)}
          </span>
        </div>

        {/* Right side - Hearts, Network, and Submit status */}
        <div className="flex items-center gap-4">
          {/* Network Status */}
          <NetworkStatus />

          {/* Submit status */}
          {!canSubmit && (
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span>Submit in {formatTime(timeUntilSubmit)}</span>
            </div>
          )}

          {canSubmit && (
            <Badge variant="default" className="bg-green-600">
              Ready to Submit
            </Badge>
          )}

          {/* Hearts */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <Heart
                key={index}
                className={cn(
                  "h-6 w-6 transition-all duration-300",
                  index < heartsRemaining
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile progress */}
      <div className="sm:hidden mt-2 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Q{currentQuestion + 1}/{totalQuestions}
        </span>
        <Progress value={progressPercent} className="flex-1 h-1" />
      </div>
    </div>
  );
}

function NetworkStatus() {
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);
  const [isSlow, setIsSlow] = React.useState(false);

  React.useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    const updateConnectionStatus = () => {
      // Check for slow connection using Network Information API if available
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const connection = (navigator as any).connection;
      if (connection) {
        // effectiveType: 'slow-2g', '2g', '3g', or '4g'
        const isSlowConnection = connection.effectiveType === 'slow-2g' ||
          connection.effectiveType === '2g'; // || connection.downlink < 1
        setIsSlow(isSlowConnection);
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateConnectionStatus);
      updateConnectionStatus(); // Initial check
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if (connection) {
        connection.removeEventListener('change', updateConnectionStatus);
      }
    };
  }, []);

  if (isOffline || isSlow) {
    return (
      <div className="flex items-center justify-center p-2" title={isOffline ? "No Internet Connection" : "Slow Connection"}>
        {/* Dinosaur Icon (Black and White) */}
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-foreground" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10a1 1 0 0 1-1-1v-2a3 3 0 0 0-6 0h-2l-2 2H7v1h2v1h-1v1h-2v2h2v4h1v-3h2v3h1v-4h2v-4h1v-2h2v2h1v1h2v-3a1 1 0 0 1-1-1zM4 22h16a1 1 0 0 0 1-1v-1h-2v1H5v-1H3v1a1 1 0 0 0 1 1z" />
          <path d="M4 14h2v2H4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-2" title="Good Connection">
      <Wifi className="w-5 h-5 text-green-500" />
    </div>
  );
}
