import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  fetchLivesData, 
  getLocalLivesData, 
  getTimeUntilNextRestore, 
  formatTimeRemaining 
} from '@/lib/livesSystem';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/lib/auth';

interface LivesDisplayProps {
  className?: string;
  showTimer?: boolean;
}

export function LivesDisplay({ className, showTimer = true }: LivesDisplayProps) {
  const { user } = useAuth();
  const [livesData, setLivesData] = useState(() => getLocalLivesData(user?.id));
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch lives data from Supabase on mount
  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    const loadLivesData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLivesData(user.id);
        setLivesData(data);
        setTimeRemaining(getTimeUntilNextRestore(user.id));
      } catch (error) {
        console.error('Error loading lives data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLivesData();
  }, [user?.id]);

  // Update timer periodically
  useEffect(() => {
    if (!user?.id) return;

    const updateTimer = () => {
      setLivesData(getLocalLivesData(user.id));
      setTimeRemaining(getTimeUntilNextRestore(user.id));
    };

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [user?.id]);

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
                isLoading
                  ? "fill-muted text-muted-foreground/50 animate-pulse"
                  : i < lives
                    ? "fill-destructive text-destructive"
                    : "fill-muted text-muted-foreground/30"
              )}
            />
          ))}
          {showTimer && !isLoading && timeRemaining !== null && timeRemaining > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              +1 in {formatTimeRemaining(timeRemaining)}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">
          {isLoading 
            ? "Loading lives..."
            : lives === 0 
              ? "No lives left! Wait for restoration or come back tomorrow." 
              : `${lives} lives remaining. Leaving a problem page costs a life.`}
        </p>
        {!isLoading && timeRemaining !== null && timeRemaining > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Next life restores in {formatTimeRemaining(timeRemaining)}
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
