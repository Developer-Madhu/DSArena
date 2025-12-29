import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Swords, 
  AlertTriangle,
  Target,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTierInfo, SkillTier } from '@/lib/skillRatingSystem';

interface InterviewArenaHUDProps {
  mode: 'practice' | 'interview';
  timeRemaining?: number; // seconds
  currentRating: number;
  currentTier: SkillTier;
  potentialGain: number;
  potentialLoss: number;
  attemptsUsed: number;
  maxAttempts: number;
  hintsUsed: boolean;
  topic: string;
}

export function InterviewArenaHUD({
  mode,
  timeRemaining,
  currentRating,
  currentTier,
  potentialGain,
  potentialLoss,
  attemptsUsed,
  maxAttempts,
  hintsUsed,
  topic,
}: InterviewArenaHUDProps) {
  const [displayTime, setDisplayTime] = useState(timeRemaining || 0);
  
  useEffect(() => {
    if (timeRemaining !== undefined) {
      setDisplayTime(timeRemaining);
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const tierInfo = getTierInfo(currentTier);
  const timePercent = timeRemaining !== undefined && timeRemaining > 0 
    ? (displayTime / (timeRemaining + displayTime)) * 100 
    : 100;

  const isUrgent = displayTime < 60;
  const isWarning = displayTime < 180 && displayTime >= 60;

  if (mode === 'practice') {
    return (
      <div className="flex items-center gap-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
        <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
          Practice Mode
        </Badge>
        <span className="text-sm text-muted-foreground">
          Take your time • Hints available • Rating unaffected
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Swords className="h-5 w-5 text-orange-600" />
          <span className="font-semibold text-orange-700">Interview Arena</span>
        </div>
        <Badge variant="outline" className={cn(tierInfo.bg, tierInfo.color)}>
          {topic}: {currentRating} ({tierInfo.name})
        </Badge>
      </div>

      {/* Timer */}
      {timeRemaining !== undefined && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <div className={cn(
              "flex items-center gap-2",
              isUrgent && "text-red-600 animate-pulse",
              isWarning && "text-yellow-600"
            )}>
              <Clock className="h-4 w-4" />
              <span className="font-mono font-bold text-lg">
                {formatTime(displayTime)}
              </span>
            </div>
            {isUrgent && (
              <span className="text-xs text-red-600 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Time running out!
              </span>
            )}
          </div>
          <Progress 
            value={timePercent} 
            className={cn(
              "h-2",
              isUrgent && "[&>div]:bg-red-500",
              isWarning && "[&>div]:bg-yellow-500"
            )}
          />
        </div>
      )}

      {/* Rating Stakes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-1 text-xs text-green-700 mb-1">
            <TrendingUp className="h-3 w-3" />
            <span>If Solved</span>
          </div>
          <div className="font-bold text-green-700">+{potentialGain} rating</div>
        </div>
        <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-1 text-xs text-red-700 mb-1">
            <TrendingDown className="h-3 w-3" />
            <span>If Failed</span>
          </div>
          <div className="font-bold text-red-700">{potentialLoss} rating</div>
        </div>
      </div>

      {/* Attempts & Hints */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Target className="h-3.5 w-3.5" />
          <span>Submission: {attemptsUsed}/{maxAttempts}</span>
        </div>
        {hintsUsed && (
          <Badge variant="destructive" className="text-xs">
            Hints Used (-20% rating)
          </Badge>
        )}
      </div>
    </div>
  );
}
