const pending = new Map<string, Promise<unknown>>();
const resolved = new Map<string, unknown>();

export function hasCache(key: string): boolean {
  return resolved.has(key);
}

export function peekCache(key: string): unknown {
  return resolved.get(key);
}

export function clearCache(key?: string): void {
  if (!key) {
    pending.clear();
    resolved.clear();
    return;
  }
  pending.delete(key);
  resolved.delete(key);
}

export function cachedFetch<T>(key: string, run: () => Promise<T>): Promise<T> {
  if (resolved.has(key)) return Promise.resolve(resolved.get(key) as T);
  const existing = pending.get(key);
  if (existing) return existing as Promise<T>;

  const promise = run()
    .then((value) => {
      resolved.set(key, value);
      pending.delete(key);
      return value;
    })
    .catch((error: unknown) => {
      pending.delete(key);
      throw error;
    });

  pending.set(key, promise);
  return promise;
}
