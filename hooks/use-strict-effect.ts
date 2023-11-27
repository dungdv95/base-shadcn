import { useEffect, useRef } from "react";

export function useStrictEffect(fn: () => void, deps: any[]) {
  const previousRef = useRef<any[]>();

  const unsubRef = useRef<any>();

  useEffect(() => {
    if (deps.some((d, i) => d !== previousRef.current?.[i])) {
      unsubRef.current?.();
      unsubRef.current = fn();
    }

    previousRef.current = deps;
  });

  useEffect(() => {
    return () => unsubRef.current?.();
  }, []);
}
