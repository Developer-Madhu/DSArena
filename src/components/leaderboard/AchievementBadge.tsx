import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface Achievement {
  id: string;
  tagName: string;
  tagIcon: string;
  tagType: string;
  earnedAt: Date;
}

// Cute tags unique to DSArena
export const ACHIEVEMENT_TAGS = {
  daily_winner: { name: 'Code Fox', icon: '🦊', description: 'Daily leaderboard winner' },
  weekly_winner: { name: 'Dragon Coder', icon: '🐉', description: 'Weekly leaderboard winner' },
  streak_master: { name: 'Blaze Runner', icon: '🔥', description: '7+ day streak' },
  speed_demon: { name: 'Speed Demon', icon: '🚀', description: 'Solved 5 problems in 1 hour' },
  night_owl: { name: 'Night Owl', icon: '🦉', description: 'Solved after midnight' },
  early_bird: { name: 'Early Bird', icon: '🐤', description: 'Solved before 6 AM' },
  diamond_mind: { name: 'Diamond Mind', icon: '💎', description: 'Solved 3 hard problems in a day' },
  bullseye: { name: 'Bullseye', icon: '🎯', description: 'First try success on hard problem' },
  wizard: { name: 'Wizard', icon: '🧙', description: '30+ problems solved' },
} as const;

interface AchievementBadgeProps {
  tagType: keyof typeof ACHIEVEMENT_TAGS;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

export function AchievementBadge({ 
  tagType, 
  size = 'md', 
  showName = false,
  className 
}: AchievementBadgeProps) {
  const tag = ACHIEVEMENT_TAGS[tagType];
  
  if (!tag) return null;

  const sizeClasses = {
    sm: 'text-xs p-1',
    md: 'text-sm p-1.5',
    lg: 'text-base p-2',
  };

  const iconSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              'inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30',
              sizeClasses[size],
              className
            )}
          >
            <span className={iconSizes[size]}>{tag.icon}</span>
            {showName && <span className="font-medium">{tag.name}</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-semibold">{tag.name}</p>
            <p className="text-xs text-muted-foreground">{tag.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface AchievementListProps {
  achievements: Achievement[];
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementList({ achievements, maxDisplay = 5, size = 'sm' }: AchievementListProps) {
  const displayAchievements = achievements.slice(0, maxDisplay);
  const remaining = achievements.length - maxDisplay;

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {displayAchievements.map((achievement) => (
        <AchievementBadge 
          key={achievement.id} 
          tagType={achievement.tagType as keyof typeof ACHIEVEMENT_TAGS} 
          size={size}
        />
      ))}
      {remaining > 0 && (
        <span className="text-xs text-muted-foreground">+{remaining} more</span>
      )}
    </div>
  );
}
