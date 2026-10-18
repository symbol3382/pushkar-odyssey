import { describe, expect, it } from 'vitest';
import { SanityConfigError, isSanityConfigured, sanityClientOptions } from './config';

describe('sanity client options', () => {
  it('treats a missing or example project id as not configured', () => {
    expect(isSanityConfigured({})).toBe(false);
    expect(isSanityConfigured({ projectId: 'your_project_id' })).toBe(false);
    expect(isSanityConfigured({ projectId: 'demo-project' })).toBe(true);
  });

  it('rejects a missing project id without inventing one', () => {
    expect(() => sanityClientOptions({})).toThrow(SanityConfigError);
  });

  it('reads published content through the CDN and does not accept a token', () => {
    const options = sanityClientOptions({ projectId: 'demo-project', dataset: '', apiVersion: '' });
    expect(options).toEqual({
      projectId: 'demo-project',
      dataset: 'production',
      apiVersion: '2026-02-01',
      useCdn: true,
      perspective: 'published',
    });
    expect(options).not.toHaveProperty('token');
  });
});
