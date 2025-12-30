import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { learningRecommender } from '@/lib/learningRecommender';

interface VideoRecommendation {
  title: string;
  videoId: string;
}

export function useVideoRecommendations() {
  const navigate = useNavigate();
  const [failureCount, setFailureCount] = useState<Map<string, number>>(new Map());

  const recordFailure = useCallback((topic: string) => {
    setFailureCount(prev => {
      const newMap = new Map(prev);
      const count = (newMap.get(topic) || 0) + 1;
      newMap.set(topic, count);
      return newMap;
    });
  }, []);

  const checkAndRecommendVideo = useCallback((topic: string, failCount?: number): VideoRecommendation[] | null => {
    const count = failCount ?? failureCount.get(topic) ?? 0;
    
    // Recommend videos after 3+ failures on the same topic
    if (count >= 3) {
      const videos = learningRecommender.getVideoRecommendationsForTopic(topic);
      
      if (videos.length > 0) {
        toast.info(
          `Having trouble with ${topic}? Check out some helpful videos!`,
          {
            duration: 8000,
            action: {
              label: 'Watch Now',
              onClick: () => navigate('/videos'),
            },
          }
        );
        return videos;
      }
    }
    
    return null;
  }, [failureCount, navigate]);

  const triggerVideoRecommendation = useCallback((topic: string) => {
    recordFailure(topic);
    const count = (failureCount.get(topic) || 0) + 1;
    return checkAndRecommendVideo(topic, count);
  }, [recordFailure, failureCount, checkAndRecommendVideo]);

  const resetFailures = useCallback((topic?: string) => {
    if (topic) {
      setFailureCount(prev => {
        const newMap = new Map(prev);
        newMap.delete(topic);
        return newMap;
      });
    } else {
      setFailureCount(new Map());
    }
  }, []);

  return {
    recordFailure,
    checkAndRecommendVideo,
    triggerVideoRecommendation,
    resetFailures,
    getFailureCount: (topic: string) => failureCount.get(topic) || 0,
  };
}
