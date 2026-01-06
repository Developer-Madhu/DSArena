import { useEffect, useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UseExamSecurityProps {
  isActive: boolean;
  heartsRemaining: number;
  onViolation: (type: string) => void;
  onDisqualify: () => void;
  onAbandon?: () => void;
  onAutoSubmit?: () => void; // Called when lives reach 0 to auto-submit
}

const GRACE_PERIOD_MS = 10 * 1000; // 10 seconds grace period

export function useExamSecurity({
  isActive,
  heartsRemaining,
  onViolation,
  onDisqualify,
  onAbandon,
  onAutoSubmit,
}: UseExamSecurityProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const violationCountRef = useRef(0);

  // Use ref to track current hearts to avoid stale closure issues
  const heartsRef = useRef(heartsRemaining);
  useEffect(() => {
    heartsRef.current = heartsRemaining;
  }, [heartsRemaining]);

  // Grace period tracking
  const focusLossTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isFocusLostRef = useRef(false);
  const pendingViolationTypeRef = useRef<string | null>(null);
  const [warning, setWarning] = useState<{ isOpen: boolean; message: string; endTime: number | null }>({
    isOpen: false,
    message: '',
    endTime: null,
  });

  // Clear the grace period timer
  const clearGracePeriodTimer = useCallback(() => {
    if (focusLossTimerRef.current) {
      clearTimeout(focusLossTimerRef.current);
      focusLossTimerRef.current = null;
    }
    isFocusLostRef.current = false;
    pendingViolationTypeRef.current = null;
    setWarning({ isOpen: false, message: '', endTime: null });
  }, []);

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

  // Handle violation with grace period
  const triggerGracePeriod = useCallback((violationType: string, message: string) => {
    // If already tracking a violation, don't restart (unless it's a different critical type, but keep simple)
    if (isFocusLostRef.current) return;

    isFocusLostRef.current = true;
    pendingViolationTypeRef.current = violationType;

    // Show warning immediately
    setWarning({
      isOpen: true,
      message: message,
      endTime: Date.now() + GRACE_PERIOD_MS
    });

    // Start grace period timer
    focusLossTimerRef.current = setTimeout(() => {
      const currentHearts = heartsRef.current;

      // If timer executes, it means user didn't return in time
      if (isFocusLostRef.current && currentHearts > 0) {
        onViolation(violationType);

        // Attempt to re-enter fullscreen automatically after penalty
        // We use a small timeout to allow state updates to settle and hope browser grants permission
        setTimeout(() => {
          console.log('Attempting auto-fullscreen recovery after violation penalty...');
          enterFullscreen().then(success => {
            if (success) {
              console.log('Auto-fullscreen recovery successful');
            } else {
              console.warn('Auto-fullscreen recovery blocked by browser or failed');
            }
          }).catch(err => console.error('Auto-fullscreen error:', err));
        }, 100);

        // Check if this causes lives to reach 0
        const newHearts = currentHearts - 1;
        if (newHearts <= 0 && onAutoSubmit) {
          setTimeout(() => {
            onAutoSubmit();
          }, 100);
        }
      }
      clearGracePeriodTimer();
    }, GRACE_PERIOD_MS);
  }, [onViolation, onAutoSubmit, clearGracePeriodTimer, enterFullscreen]);

  // Handle return to safe state
  const handleSafeStateReturn = useCallback(() => {
    // Only clear if we are currently in a "lost" state and the environment is actually safe
    // Safe means: Fullscreen IS active AND Document IS visible/focused
    const isSafe = !!document.fullscreenElement && !document.hidden;

    if (isFocusLostRef.current && isSafe) {
      clearGracePeriodTimer();
    }
  }, [clearGracePeriodTimer]);



  // Handle fullscreen change
  useEffect(() => {
    if (!isActive) return;

    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      if (!isNowFullscreen && isActive && heartsRef.current > 0) {
        // Fullscreen exited - trigger grace period
        triggerGracePeriod('fullscreen_exit', 'Please return to fullscreen within 10 seconds or a life will be eliminated.');
      } else if (isNowFullscreen) {
        // Returned to fullscreen
        handleSafeStateReturn();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isActive, triggerGracePeriod, handleSafeStateReturn]);

  // Handle visibility change (tab switch)
  useEffect(() => {
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden && heartsRef.current > 0) {
        triggerGracePeriod('tab_switch', 'Please return to the exam tab within 10 seconds or a life will be eliminated.');
      } else if (!document.hidden) {
        handleSafeStateReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, triggerGracePeriod, handleSafeStateReturn]);

  // Handle window blur
  useEffect(() => {
    if (!isActive) return;

    const handleBlur = () => {
      if (heartsRef.current > 0 && !document.hidden && !!document.fullscreenElement) {
        // Only trigger blur if not already covered by hidden/fullscreen
        // But often blur happens with tab switch, so let's be careful not to double trigger.
        // triggerGracePeriod checks `isFocusLostRef`, so it handles deduping.
        triggerGracePeriod('window_blur', 'Please keep the exam window focused.');
      }
    };

    const handleFocus = () => {
      handleSafeStateReturn();
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isActive, triggerGracePeriod, handleSafeStateReturn]);

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

  // Cleanup grace period timer on unmount or when exam becomes inactive
  useEffect(() => {
    if (!isActive) {
      clearGracePeriodTimer();
    }
    return () => {
      clearGracePeriodTimer();
    };
  }, [isActive, clearGracePeriodTimer]);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    warning,
  };
}
