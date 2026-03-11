import { useState, useEffect, useRef, useCallback } from 'react';

// Custom hook for countdown timer with progress tracking
export function useTimer(duration, onExpire, active = true) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const reset = useCallback(() => {
    setTimeLeft(duration);
    startTimeRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [duration]);

  const start = useCallback(() => {
    reset();
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        onExpire?.();
      }
    }, 50); // Update frequently for smooth animation
  }, [duration, onExpire, reset]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const progress = timeLeft / duration; // 1 = full, 0 = expired

  return { timeLeft, progress, start, reset };
}
