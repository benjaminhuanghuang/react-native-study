import { useEffect, useRef } from "react";

export function useDebouncedCallback<T>(
  callback: VoidFunction,
  dependencies: T[],
  timeout: number
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(callback, timeout);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [...dependencies, timeout, callback]);
}
