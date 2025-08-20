export function fakeFetch<T>(
  data: T,
  options?: { minDelay?: number; maxDelay?: number; failRate?: number }
): Promise<T> {
  const { minDelay = 500, maxDelay = 1500, failRate = 0.1 } = options || {};

  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  const shouldFail = Math.random() < failRate;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Error simulado del fetch"));
      } else {
        resolve(data);
      }
    }, delay);
  });
}
