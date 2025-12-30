import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motivationEngine, ProgressEvent, MotivationMessage } from '@/lib/motivationEngine';
import confetti from 'canvas-confetti';

interface MotivationToastProps {
  userId: string;
  event: ProgressEvent;
}

export function useMotivationToast() {
  const showMotivation = (userId: string, event: ProgressEvent) => {
    if (!motivationEngine.shouldShowMotivation(userId)) return;

    motivationEngine.updateTrend(userId, event);
    const message = motivationEngine.generateMessage(userId, event);

    // Trigger confetti for high intensity celebrations
    if (message.intensity === 'high' && message.type === 'celebration') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }

    // Show toast with appropriate styling
    const toastFn = message.type === 'celebration' ? toast.success : toast.info;
    toastFn(`${message.emoji} ${message.message}`, {
      duration: message.intensity === 'high' ? 5000 : 3000,
    });
  };

  return { showMotivation };
}
