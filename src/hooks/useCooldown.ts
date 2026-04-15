import { useCallback, useRef, useState } from "react";

export function useCooldown(delay = 1000) {
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const run = useCallback(
    (callback: () => void) => {
      if (isCoolingDown) return;

      setIsCoolingDown(true);
      callback();

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        setIsCoolingDown(false);
        timeoutRef.current = null;
      }, delay);
    },
    [isCoolingDown, delay],
  );

  return {
    isCoolingDown,
    run,
  };
}
