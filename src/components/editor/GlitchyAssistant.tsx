import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import glitchyCat from '@/assets/glitchy-cat.png';

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
          problem: problemDescription.slice(0, 500), // Limit for token efficiency
          language,
          error: hasError ? lastError : null,
        },
      });

      if (error) throw error;

      setHint(data.hint);
      setMood(data.mood || 'happy');
    } catch (err) {
      console.error('Glitchy error:', err);
      setHint("*purrs* I'm here to help! Keep coding! 🐱");
      setMood('sleepy');
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
      // Toggle visibility
      setIsVisible(false);
      setTimeout(() => {
        setHint(null);
        setMood('idle');
      }, 300);
    }
  };

  const getMoodEmoji = () => {
    switch (mood) {
      case 'alert': return '😾';
      case 'happy': return '😸';
      case 'curious': return '🙀';
      case 'thinking': return '🤔';
      case 'impressed': return '😻';
      case 'sleepy': return '😿';
      case 'tired': return '😴';
      default: return '😺';
    }
  };

  const getMoodAnimation = () => {
    switch (mood) {
      case 'alert': return 'animate-bounce';
      case 'thinking': return 'animate-pulse';
      case 'curious': return 'animate-wiggle';
      default: return '';
    }
  };

  return (
    <div className="absolute -top-2 right-4 z-50">
      {/* Glitchy Cat Container */}
      <div 
        className={cn(
          "relative cursor-pointer transition-all duration-300 ease-out",
          isVisible ? "translate-y-0" : "translate-y-8",
          getMoodAnimation()
        )}
        onClick={handleGlitchyClick}
      >
        {/* Cat Image - Peeping from top */}
        <div className="relative">
          <img 
            src={glitchyCat} 
            alt="Glitchy the coding cat" 
            className={cn(
              "w-16 h-16 object-contain drop-shadow-lg transition-transform duration-200",
              "hover:scale-110",
              mood === 'alert' && "filter hue-rotate-15"
            )}
          />
          
          {/* Mood Indicator */}
          <span className="absolute -bottom-1 -right-1 text-lg">
            {getMoodEmoji()}
          </span>
          
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Speech Bubble */}
        {isVisible && hint && (
          <div 
            className={cn(
              "absolute top-full right-0 mt-2 w-64 p-3 rounded-lg",
              "bg-card border border-border shadow-lg",
              "animate-in fade-in slide-in-from-top-2 duration-200"
            )}
          >
            {/* Arrow */}
            <div className="absolute -top-2 right-6 w-4 h-4 bg-card border-l border-t border-border transform rotate-45" />
            
            {/* Content */}
            <p className="text-sm text-foreground relative z-10">{hint}</p>
            
            {/* Action */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                fetchHint(!!lastError);
              }}
              className="mt-2 text-xs text-primary hover:underline"
              disabled={isLoading}
            >
              {isLoading ? 'Thinking...' : 'Ask for another hint'}
            </button>
          </div>
        )}

        {/* Tooltip when not showing hint */}
        {!hint && !isLoading && (
          <div className="absolute top-full right-0 mt-1 opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-xs bg-card border border-border px-2 py-1 rounded shadow whitespace-nowrap">
              Click me for hints! 🐱
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
