import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLocalLivesData, getTimeUntilNextRestore, formatTimeRemaining } from '@/lib/livesSystem';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface LivesDisplayProps {
  className?: string;
  showTimer?: boolean;
}

export function LivesDisplay({ className, showTimer = true }: LivesDisplayProps) {
  const [livesData, setLivesData] = useState(() => getLocalLivesData());
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    // Update lives data periodically
    const updateLives = () => {
      setLivesData(getLocalLivesData());
      setTimeRemaining(getTimeUntilNextRestore());
    };

    updateLives();
    const interval = setInterval(updateLives, 1000);
    return () => clearInterval(interval);
  }, []);

  const lives = livesData.lives;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn("flex items-center gap-1", className)}>
          {[0, 1, 2].map((i) => (
            <Heart
              key={i}
              className={cn(
                "h-5 w-5 transition-all duration-300",
                i < lives
                  ? "fill-destructive text-destructive"
                  : "fill-muted text-muted-foreground/30"
              )}
            />
          ))}
          {showTimer && timeRemaining !== null && timeRemaining > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              +1 in {formatTimeRemaining(timeRemaining)}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">
          {lives === 0 
            ? "No lives left! Wait for restoration or come back tomorrow." 
            : `${lives} lives remaining. Leaving a problem page costs a life.`}
        </p>
        {timeRemaining !== null && timeRemaining > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Next life restores in {formatTimeRemaining(timeRemaining)}
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
