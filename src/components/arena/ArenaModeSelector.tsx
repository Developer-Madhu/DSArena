import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Swords, 
  GraduationCap, 
  Clock, 
  Lightbulb, 
  AlertTriangle,
  Target,
  Lock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArenaModeProps {
  open: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'practice' | 'interview') => void;
  problemTitle: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  isUnlocked: boolean;
  unlockProgress?: {
    completed: number;
    required: number;
    accuracy: number;
    requiredAccuracy: number;
  };
}

export function ArenaModeSelector({
  open,
  onClose,
  onSelectMode,
  problemTitle,
  difficulty,
  topic,
  isUnlocked,
  unlockProgress,
}: ArenaModeProps) {
  const [selectedMode, setSelectedMode] = useState<'practice' | 'interview' | null>(null);

  const handleConfirm = () => {
    if (selectedMode) {
      onSelectMode(selectedMode);
      onClose();
    }
  };

  const interviewTimeLimit = {
    easy: 15,
    medium: 30,
    hard: 45,
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Choose Your Arena
          </DialogTitle>
          <DialogDescription className="text-left">
            Select how you want to tackle "{problemTitle}"
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Practice Arena */}
          <Card 
            className={cn(
              "cursor-pointer transition-all border-2",
              selectedMode === 'practice' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            )}
            onClick={() => setSelectedMode('practice')}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">Practice Arena</h3>
                    <Badge variant="secondary" className="text-xs">Learning Mode</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Perfect for learning and experimentation. No pressure, just growth.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1 text-green-600">
                      <Lightbulb className="h-3.5 w-3.5" />
                      <span>Hints Enabled</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Unlimited Attempts</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>No Time Limit</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 rounded bg-muted/50 text-xs text-muted-foreground">
                    <XCircle className="h-3 w-3 inline mr-1" />
                    Rating not affected
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Arena */}
          <Card 
            className={cn(
              "cursor-pointer transition-all border-2",
              !isUnlocked && "opacity-60",
              selectedMode === 'interview' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            )}
            onClick={() => isUnlocked && setSelectedMode('interview')}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-500/10">
                  <Swords className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">Interview Arena</h3>
                    <Badge className="bg-orange-500/20 text-orange-700 border-orange-500/30 text-xs">
                      Competitive
                    </Badge>
                    {!isUnlocked && (
                      <Badge variant="outline" className="text-xs">
                        <Lock className="h-3 w-3 mr-1" />
                        Locked
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Real interview conditions. Test your skills under pressure.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1 text-orange-600">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{interviewTimeLimit[difficulty]} min limit</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-500">
                      <XCircle className="h-3.5 w-3.5" />
                      <span>No Hints</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-500">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Single Submit</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 rounded bg-primary/10 text-xs text-primary">
                    <Target className="h-3 w-3 inline mr-1" />
                    Affects your {topic} skill rating
                  </div>

                  {/* Unlock progress */}
                  {!isUnlocked && unlockProgress && (
                    <div className="mt-3 p-3 rounded-lg bg-muted border">
                      <p className="text-xs font-medium mb-2">Unlock Requirements:</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>Problems completed:</span>
                          <span className={cn(
                            unlockProgress.completed >= unlockProgress.required 
                              ? "text-green-600" 
                              : "text-muted-foreground"
                          )}>
                            {unlockProgress.completed}/{unlockProgress.required}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Accuracy required:</span>
                          <span className={cn(
                            unlockProgress.accuracy >= unlockProgress.requiredAccuracy 
                              ? "text-green-600" 
                              : "text-muted-foreground"
                          )}>
                            {unlockProgress.accuracy}%/{unlockProgress.requiredAccuracy}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedMode}
            className={cn(
              selectedMode === 'interview' && "bg-orange-600 hover:bg-orange-700"
            )}
          >
            {selectedMode === 'interview' ? 'Enter Interview Arena' : 'Start Practicing'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
