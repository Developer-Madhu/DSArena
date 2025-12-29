import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getTierInfo, SkillTier, SKILL_TIERS } from '@/lib/skillRatingSystem';
import { cn } from '@/lib/utils';
import { Crown, Gem, Medal, Shield, Star } from 'lucide-react';

interface SkillRatingBadgeProps {
  rating: number;
  tier: SkillTier;
  topic?: string;
  showRating?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tierIcons: Record<SkillTier, React.ElementType> = {
  bronze: Shield,
  silver: Medal,
  gold: Star,
  platinum: Gem,
  diamond: Crown,
};

export function SkillRatingBadge({
  rating,
  tier,
  topic,
  showRating = true,
  size = 'md',
  className,
}: SkillRatingBadgeProps) {
  const tierInfo = getTierInfo(tier);
  const TierIcon = tierIcons[tier];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const nextTier = tier === 'diamond' ? null : (
    tier === 'platinum' ? 'diamond' :
    tier === 'gold' ? 'platinum' :
    tier === 'silver' ? 'gold' : 'silver'
  );
  
  const pointsToNext = nextTier 
    ? SKILL_TIERS[nextTier].min - rating 
    : 0;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge 
          variant="outline"
          className={cn(
            sizeClasses[size],
            tierInfo.bg,
            tierInfo.color,
            'font-medium cursor-default',
            className
          )}
        >
          <TierIcon className={cn(iconSizes[size], 'mr-1')} />
          {topic && <span className="mr-1">{topic}:</span>}
          {showRating && <span>{rating}</span>}
          {!showRating && <span>{tierInfo.name}</span>}
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-center">
        <p className="font-semibold">{tierInfo.name} Tier</p>
        <p className="text-xs text-muted-foreground">
          Rating: {rating}
        </p>
        {nextTier && (
          <p className="text-xs mt-1">
            {pointsToNext} points to {SKILL_TIERS[nextTier].name}
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
