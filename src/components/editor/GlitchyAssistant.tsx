import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import glitchyAvatar from '@/assets/glitchy-avatar.png';

interface GlitchyAssistantProps {
  code: string;
  language: string;
  problemDescription: string;
  lastError?: string | null;
}

type GlitchyMood = 'idle' | 'thinking' | 'alert' | 'happy' | 'curious' | 'impressed' | 'sleepy' | 'tired';

export function GlitchyAssistant({ code, language, problemDescription, lastError }: GlitchyAssistantProps) {
  const [hint, setHint] = useState<string | null>(null);
  const [mood, setMood] = useState<GlitchyMood>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastCodeLength, setLastCodeLength] = useState(0);

  // Show Glitchy when there's an error
  useEffect(() => {
    if (lastError && lastError.length > 0) {
      setMood('alert');
      setIsVisible(true);
      fetchHint(true);
    }
  }, [lastError]);

  // Track code changes for curious reactions
  useEffect(() => {
    const diff = Math.abs(code.length - lastCodeLength);
    if (diff > 50 && lastCodeLength > 0) {
      setMood('curious');
      setIsVisible(true);
    }
    setLastCodeLength(code.length);
  }, [code]);

  const fetchHint = useCallback(async (hasError = false) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setMood('thinking');

    try {
      const { data, error } = await supabase.functions.invoke('glitchy-hint', {
        body: {
          code,
          problem: problemDescription.slice(0, 500),
          language,
          error: hasError ? lastError : null,
        },
      });

      if (error) throw error;

      setHint(data.hint);
      setMood(data.mood || 'happy');
    } catch (err) {
      console.error('Glitchy error:', err);
      setHint("DUDE! I'm here to help! Keep coding!");
      setMood('idle');
    } finally {
      setIsLoading(false);
    }
  }, [code, language, problemDescription, lastError, isLoading]);

  const handleGlitchyClick = () => {
    if (!isVisible) {
      setIsVisible(true);
      setMood('curious');
    } else if (!hint) {
      fetchHint(false);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setHint(null);
        setMood('idle');
      }, 300);
    }
  };

  const getMoodAnimation = () => {
    return ''; // No animations
  };

  const getMoodGlow = () => {
    switch (mood) {
      case 'alert': return 'shadow-[0_0_20px_hsl(var(--destructive)/0.6)]';
      case 'happy': return 'shadow-[0_0_15px_hsl(var(--primary)/0.5)]';
      case 'curious': return 'shadow-[0_0_12px_hsl(var(--accent)/0.4)]';
      default: return 'shadow-lg';
    }
  };

  return (
    <div className="absolute -top-8 right-4 z-50">
      {/* Glitchy Avatar - Peeking from border like Snapchat */}
      <div 
        className={cn(
          "relative cursor-pointer transition-all duration-300 ease-out group",
          getMoodAnimation()
        )}
        onClick={handleGlitchyClick}
      >
        {/* Avatar Container - Positioned to peek over edge */}
        <div 
          className={cn(
            "relative w-16 h-16 rounded-full overflow-hidden transition-all duration-300",
            "border-3 border-primary/70 hover:border-primary",
            getMoodGlow(),
            "hover:scale-110",
            mood === 'alert' && "border-destructive"
          )}
          style={{
            clipPath: 'inset(25% 0 0 0 round 0 0 50% 50%)'
          }}
        >
          {/* The peeking avatar image */}
          <img 
            src={glitchyAvatar} 
            alt="Glitchy Assistant" 
            className={cn(
              "w-full h-full object-cover object-top transition-transform duration-300",
              isVisible ? "translate-y-0" : "translate-y-2"
            )}
          />
          
          {/* Overlay effects based on mood */}
          <div className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-300",
            mood === 'alert' && "bg-destructive/20 animate-pulse",
            mood === 'thinking' && "bg-primary/10",
            mood === 'happy' && "bg-primary/5"
          )} />
        </div>
        
        {/* Loading Spinner Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-end justify-center pb-1">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Thinking bubbles when curious or thinking */}
        {(mood === 'thinking' || mood === 'curious') && !hint && (
          <div className="absolute -left-6 top-2 flex flex-col gap-1">
            <span className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-3 h-3 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {/* Alert indicator */}
        {mood === 'alert' && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full animate-ping" />
        )}

        {/* Speech Bubble */}
        {isVisible && hint && (
          <div 
            className={cn(
              "absolute top-full right-0 mt-3 w-72 p-4 rounded-xl",
              "bg-card/95 backdrop-blur-sm border border-border/80 shadow-2xl",
              "animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200"
            )}
          >
            {/* Arrow pointing up-right */}
            <div className="absolute -top-2 right-6 w-4 h-4 bg-card/95 border-l border-t border-border/80 transform rotate-45" />
            
            {/* Content */}
            <p className="text-sm text-foreground relative z-10 leading-relaxed">{hint}</p>
            
            {/* Action */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                fetchHint(!!lastError);
              }}
              className="mt-3 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? '💭 Thinking...' : '✨ Ask for another hint'}
            </button>
          </div>
        )}

        {/* Hover tooltip */}
        <div className={cn(
          "absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none",
          (hint || isLoading) && "hidden"
        )}>
          <span className="text-xs bg-card/90 backdrop-blur border border-border px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            Click me for hints! ✨
          </span>
        </div>
      </div>
    </div>
  );
}
