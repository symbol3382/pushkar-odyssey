export const DEFAULT_SANITY_API_VERSION = '2026-02-01';
export const DEFAULT_SANITY_DATASET = 'production';

export class SanityConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SanityConfigError';
  }
}

export interface SanityEnv {
  projectId?: string;
  dataset?: string;
  apiVersion?: string;
}

export interface SanityClientOptions {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: true;
  perspective: 'published';
}

function present(value: string | undefined): string | undefined {
  const trimmed = value?.trim() ?? '';
  if (trimmed.length === 0) return undefined;
  return trimmed;
}

export function readSanityEnv(env: ImportMetaEnv = import.meta.env): SanityEnv {
  return {
    projectId: present(env.VITE_SANITY_PROJECT_ID),
    dataset: present(env.VITE_SANITY_DATASET),
    apiVersion: present(env.VITE_SANITY_API_VERSION),
  };
}

export function isSanityConfigured(env: SanityEnv = readSanityEnv()): boolean {
  return Boolean(env.projectId);
}

export function sanityClientOptions(env: SanityEnv): SanityClientOptions {
  const projectId = present(env.projectId);
  if (!projectId) {
    throw new SanityConfigError(
      'Missing VITE_SANITY_PROJECT_ID. Add it to web-ui/.env.local. Do not add a Sanity write token to a VITE_ variable.',
    );
  }

  return {
    projectId,
    dataset: present(env.dataset) ?? DEFAULT_SANITY_DATASET,
    apiVersion: present(env.apiVersion) ?? DEFAULT_SANITY_API_VERSION,
    useCdn: true,
    perspective: 'published',
  };
}

export function siteOrigin(value = import.meta.env.VITE_SITE_URL): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return url.origin;
  } catch {
    return null;
  }
}
