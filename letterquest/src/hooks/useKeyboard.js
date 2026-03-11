import { useEffect, useRef, useCallback } from 'react';

// Custom hook for keyboard input during gameplay
// Debounces rapid presses (200ms) and only accepts letter keys
export function useKeyboard(onKeyPress, active = true) {
  const lastPressTime = useRef(0);
  const DEBOUNCE_MS = 200;

  const handler = useCallback(
    (e) => {
      if (!active) return;

      // Only accept letter keys
      if (!/^[a-zA-Z]$/.test(e.key)) return;

      // Debounce
      const now = Date.now();
      if (now - lastPressTime.current < DEBOUNCE_MS) return;
      lastPressTime.current = now;

      e.preventDefault();
      onKeyPress(e.key);
    },
    [onKeyPress, active]
  );

  useEffect(() => {
    if (!active) return;
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler, active]);
}
