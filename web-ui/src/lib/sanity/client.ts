import { createClient, type SanityClient } from '@sanity/client';
import { cachedFetch } from './cache';
import { readSanityEnv, sanityClientOptions } from './config';

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  client ??= createClient(sanityClientOptions(readSanityEnv()));
  return client;
}

export function sanityFetch<T>(
  key: string,
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return cachedFetch(key, () => getSanityClient().fetch<T>(query, params));
}
