import { useCallback, useRef } from "react";

export function useDebounceCallback(callback: any, delay = 500) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounced = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounced;
}
