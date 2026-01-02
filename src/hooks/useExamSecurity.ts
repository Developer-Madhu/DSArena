import { useEffect, useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UseExamSecurityProps {
  isActive: boolean;
  heartsRemaining: number;
  onViolation: (type: string) => void;
  onDisqualify: () => void;
  onAbandon?: () => void; // Called when user exits fullscreen and doesn't return
}

export function useExamSecurity({
  isActive,
  heartsRemaining,
  onViolation,
  onDisqualify,
  onAbandon,
}: UseExamSecurityProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const violationCountRef = useRef(0);

  // Request fullscreen
  const enterFullscreen = useCallback(async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
      return true;
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
      toast.error('Please enable fullscreen mode to continue the exam');
      return false;
    }
  }, []);

  // Exit fullscreen
  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
    setIsFullscreen(false);
  }, []);

  // Track fullscreen exit attempts - if user exits and doesn't re-enter, abandon exam
  const fullscreenExitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullscreenExitCountRef = useRef(0);

  // Handle fullscreen change
  // If user exits fullscreen (e.g., by pressing Escape), give them 3 seconds to re-enter
  // If they don't re-enter after 2 consecutive exits, abandon the exam
  useEffect(() => {
    if (!isActive) return;

    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      
      if (!isNowFullscreen && isActive && heartsRemaining > 0) {
        fullscreenExitCountRef.current += 1;
        const exitCount = fullscreenExitCountRef.current;
        
        onViolation('fullscreen_exit');
        
        // If this is the second consecutive exit, abandon immediately
        if (exitCount >= 2) {
          toast.error('🚫 Exam abandoned due to repeated fullscreen exits!', {
            description: 'Your exam has been terminated and you are blocked from retaking.',
            duration: 5000,
          });
          if (onAbandon) {
            onAbandon();
          } else {
            onDisqualify();
          }
          return;
        }
        
        toast.error('⚠️ Warning: Fullscreen exited!', {
          description: `You lost a heart. ${heartsRemaining - 1} hearts remaining. Return to fullscreen or your exam will be terminated.`,
          duration: 3000,
        });
        
        // Clear any existing timeout
        if (fullscreenExitTimeoutRef.current) {
          clearTimeout(fullscreenExitTimeoutRef.current);
        }
        
        // Set timeout - if user doesn't re-enter fullscreen within 3 seconds, abandon exam
        fullscreenExitTimeoutRef.current = setTimeout(() => {
          if (!document.fullscreenElement && isActive) {
            toast.error('🚫 Exam abandoned!', {
              description: 'You did not return to fullscreen mode. Your exam has been terminated.',
              duration: 5000,
            });
            if (onAbandon) {
              onAbandon();
            } else {
              onDisqualify();
            }
          }
        }, 3000);
        
        // Also try to re-enter fullscreen immediately
        setTimeout(() => {
          enterFullscreen();
        }, 100);
      } else if (isNowFullscreen) {
        // User re-entered fullscreen, clear the abandon timeout but keep exit count
        if (fullscreenExitTimeoutRef.current) {
          clearTimeout(fullscreenExitTimeoutRef.current);
          fullscreenExitTimeoutRef.current = null;
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      if (fullscreenExitTimeoutRef.current) {
        clearTimeout(fullscreenExitTimeoutRef.current);
      }
    };
  }, [isActive, heartsRemaining, onViolation, onDisqualify, onAbandon, enterFullscreen]);

  // Continuously check and enforce fullscreen while exam is active
  useEffect(() => {
    if (!isActive) return;

    const enforceFullscreen = setInterval(() => {
      if (!document.fullscreenElement && heartsRemaining > 0) {
        enterFullscreen();
      }
    }, 500);

    return () => clearInterval(enforceFullscreen);
  }, [isActive, heartsRemaining, enterFullscreen]);

  // Handle visibility change (tab switch)
  useEffect(() => {
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden && heartsRemaining > 0) {
        onViolation('tab_switch');
        toast.error('⚠️ Warning: Tab switch detected!', {
          description: `You lost a heart. ${heartsRemaining - 1} hearts remaining.`,
          duration: 5000,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, heartsRemaining, onViolation]);

  // Handle window blur
  useEffect(() => {
    if (!isActive) return;

    const handleBlur = () => {
      if (heartsRemaining > 0) {
        onViolation('window_blur');
        toast.error('⚠️ Warning: Focus lost!', {
          description: `You lost a heart. ${heartsRemaining - 1} hearts remaining.`,
          duration: 5000,
        });
      }
    };

    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('blur', handleBlur);
    };
  }, [isActive, heartsRemaining, onViolation]);

  // Prevent copy, paste, right-click
  useEffect(() => {
    if (!isActive) return;

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      onViolation('copy');
      toast.warning('Copying is disabled during the exam');
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      onViolation('paste');
      toast.warning('Pasting is disabled during the exam');
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.warning('Right-click is disabled during the exam');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+V, Ctrl+X
      if (e.ctrlKey || e.metaKey) {
        if (['c', 'v', 'x'].includes(e.key.toLowerCase())) {
          e.preventDefault();
          toast.warning('Keyboard shortcuts are disabled during the exam');
        }
      }
      
      // Prevent F5 refresh
      if (e.key === 'F5') {
        e.preventDefault();
        toast.warning('Page refresh is disabled during the exam');
      }
      
      // Prevent Ctrl+R refresh
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        toast.warning('Page refresh is disabled during the exam');
      }
    };

    // Prevent back navigation
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, '', window.location.href);
      toast.warning('Back navigation is disabled during the exam');
    };

    // Push initial state
    window.history.pushState(null, '', window.location.href);

    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isActive, onViolation]);

  // Prevent beforeunload
  useEffect(() => {
    if (!isActive) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'You have an exam in progress. Are you sure you want to leave?';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isActive]);

  // Check hearts and disqualify if needed
  useEffect(() => {
    if (heartsRemaining <= 0 && isActive) {
      onDisqualify();
    }
  }, [heartsRemaining, isActive, onDisqualify]);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
}
