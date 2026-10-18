import { useCallback, useEffect, useState } from 'react';
import { clearCache, hasCache, peekCache } from '../lib/sanity/cache';
import { isSanityConfigured } from '../lib/sanity/config';

export interface ContentQuery<T> {
  status: 'loading' | 'ready' | 'error';
  data: T | null;
  error: Error | null;
  retry: () => void;
  source: 'local' | 'sanity';
}

export function useContentQuery<TRaw, TView>(
  cacheKey: string | null,
  load: (() => Promise<TRaw>) | null,
  select: (raw: TRaw) => TView,
  empty: TView,
): ContentQuery<TView> {
  const configured = isSanityConfigured();
  const [attempt, setAttempt] = useState(0);
  const [fetched, setFetched] = useState<{ key: string; raw: TRaw } | null>(null);
  const [failure, setFailure] = useState<{ key: string; error: Error } | null>(null);

  useEffect(() => {
    if (!configured || !cacheKey || !load || hasCache(cacheKey)) return;
    let active = true;
    load()
      .then((raw) => {
        if (!active) return;
        setFetched({ key: cacheKey, raw });
        setFailure((current) => (current?.key === cacheKey ? null : current));
      })
      .catch((caught: unknown) => {
        if (!active) return;
        setFailure({
          key: cacheKey,
          error: caught instanceof Error ? caught : new Error('Content request failed'),
        });
      });
    return () => {
      active = false;
    };
  }, [attempt, cacheKey, configured, load]);

  const retry = useCallback(() => {
    if (cacheKey) clearCache(cacheKey);
    setFetched(null);
    setFailure(null);
    setAttempt((value) => value + 1);
  }, [cacheKey]);

  if (!configured) {
    return { status: 'ready', data: empty, error: null, retry, source: 'local' };
  }
  if (!cacheKey) {
    return { status: 'ready', data: empty, error: null, retry, source: 'sanity' };
  }

  const resolved = hasCache(cacheKey)
    ? (peekCache(cacheKey) as TRaw)
    : fetched?.key === cacheKey
      ? fetched.raw
      : undefined;
  if (resolved !== undefined) {
    return { status: 'ready', data: select(resolved), error: null, retry, source: 'sanity' };
  }

  const error = failure?.key === cacheKey ? failure.error : null;
  if (error) {
    return { status: 'error', data: null, error, retry, source: 'sanity' };
  }
  return { status: 'loading', data: null, error: null, retry, source: 'sanity' };
}
