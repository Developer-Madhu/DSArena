import { useEffect, useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UseExamSecurityProps {
  isActive: boolean;
  heartsRemaining: number;
  onViolation: (type: string) => void;
  onDisqualify: () => void;
  onAbandon?: () => void;
  onAutoSubmit?: () => void;
}

const GRACE_PERIOD_MS = 10 * 1000;

export function useExamSecurity({
  isActive,
  heartsRemaining,
  onViolation,
  onDisqualify,
  onAbandon,
  onAutoSubmit,
}: UseExamSecurityProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use ref to track current hearts
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

  const clearGracePeriodTimer = useCallback(() => {
    if (focusLossTimerRef.current) {
      clearTimeout(focusLossTimerRef.current);
      focusLossTimerRef.current = null;
    }
    isFocusLostRef.current = false;
    pendingViolationTypeRef.current = null;
    setWarning({ isOpen: false, message: '', endTime: null });
  }, []);

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

  const exitFullscreen = useCallback(() => {
    try {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn('Exit fullscreen failed:', err);
        });
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    } catch (err) {
      console.warn('Exit fullscreen error:', err);
    }
    setIsFullscreen(false);
  }, []);

  const triggerGracePeriod = useCallback((violationType: string, message: string) => {
    if (isFocusLostRef.current) return;

    isFocusLostRef.current = true;
    pendingViolationTypeRef.current = violationType;

    setWarning({
      isOpen: true,
      message: message,
      endTime: Date.now() + GRACE_PERIOD_MS
    });

    focusLossTimerRef.current = setTimeout(() => {
      // If timer executes, it means user didn't return in time
      if (isFocusLostRef.current) {
        console.warn('[EXAM SECURITY] 10-second warning expired - eliminating all lives & auto-submitting');
        if (onAbandon) {
          onAbandon();
        } else if (onAutoSubmit) {
          onAutoSubmit();
        }
      }
      clearGracePeriodTimer();
    }, GRACE_PERIOD_MS);
  }, [onViolation, onAbandon, onAutoSubmit, clearGracePeriodTimer]);

  const handleSafeStateReturn = useCallback(() => {
    const isSafe = !!document.fullscreenElement && !document.hidden;
    if (isFocusLostRef.current && isSafe) {
      clearGracePeriodTimer();
    }
  }, [clearGracePeriodTimer]);

  // Sync Fullscreen State & Listener
  useEffect(() => {
    if (!isActive) return;

    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      if (!isNowFullscreen && heartsRef.current > 0) {
        triggerGracePeriod('fullscreen_exit', 'Please return to fullscreen within 10 seconds or a life will be eliminated.');
      } else if (isNowFullscreen) {
        handleSafeStateReturn();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    // Initial check when becoming active
    if (document.fullscreenElement) {
      setIsFullscreen(true);
    } else {
      // If we are active but NOT in fullscreen, that's immediate violation?
      // No, let's allow the user a moment or assume enterFullscreen was called.
      // But if they manually exited during "loading", we should know.
      // Let's just sync state.
      setIsFullscreen(false);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isActive, triggerGracePeriod, handleSafeStateReturn]);

  // Visibility (Exact original logic)
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

  // Blur (Exact original logic)
  useEffect(() => {
    if (!isActive) return;

    const handleBlur = () => {
      if (heartsRef.current > 0 && !document.hidden && !!document.fullscreenElement) {
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

  // Copy/Paste (Exact original logic)
  useEffect(() => {
    if (!isActive) return;
    // ... (keep short for brevity in thought, but full in file)
    const handleCopy = (e: ClipboardEvent) => { e.preventDefault(); onViolation('copy'); toast.warning('Copying is disabled'); };
    const handlePaste = (e: ClipboardEvent) => { e.preventDefault(); onViolation('paste'); toast.warning('Pasting is disabled'); };
    const handleContextMenu = (e: MouseEvent) => { e.preventDefault(); toast.warning('Right-click is disabled'); };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (['c', 'v', 'x'].includes(e.key.toLowerCase())) { e.preventDefault(); toast.warning('Shortcuts disabled'); }
        if (e.key.toLowerCase() === 'r') { e.preventDefault(); toast.warning('Refresh disabled'); }
      }
      if (e.key === 'F5') { e.preventDefault(); toast.warning('Refresh disabled'); }
    };
    const handlePopState = (e: PopStateEvent) => { e.preventDefault(); window.history.pushState(null, '', window.location.href); toast.warning('Back nav disabled'); };

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

  useEffect(() => {
    if (!isActive) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault(); e.returnValue = 'Exam in progress'; return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isActive]);

  useEffect(() => {
    if (heartsRemaining <= 0 && isActive) {
      onDisqualify();
    }
  }, [heartsRemaining, isActive, onDisqualify]);

  useEffect(() => {
    if (!isActive) clearGracePeriodTimer();
    return () => clearGracePeriodTimer();
  }, [isActive, clearGracePeriodTimer]);

  return { isFullscreen, enterFullscreen, exitFullscreen, warning };
}
