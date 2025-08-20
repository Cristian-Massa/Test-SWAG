import { useState, useEffect, useMemo } from "react";
import { fakeFetch } from "../libs/fakeFetch";

interface UseFetchOptions {
  minDelay?: number;
  maxDelay?: number;
  failRate?: number;
}

export function useFetch<T>(data: T, options?: UseFetchOptions) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoizamos options para que no cambie la referencia a menos que cambien sus valores reales
  const memoOptions = useMemo(
    () => options,
    [options?.minDelay, options?.maxDelay, options?.failRate]
  );

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(null);

    fakeFetch<T>(data, memoOptions)
      .then((res) => {
        if (isMounted) setResult(res);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [data, memoOptions]);

  return { data: result, loading, error };
}
