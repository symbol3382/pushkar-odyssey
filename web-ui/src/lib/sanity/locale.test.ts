import { describe, expect, it } from 'vitest';
import { pickText } from './locale';

describe('pickText', () => {
  it('uses the active language, then English, then any published translation', () => {
    expect(pickText({ en: 'Hello', hi: 'नमस्ते' }, 'hi')).toBe('नमस्ते');
    expect(pickText({ en: 'Hello' }, 'ta')).toBe('Hello');
    expect(pickText({ hi: 'नमस्ते' }, 'ta')).toBe('नमस्ते');
    expect(pickText({ en: '  ' }, 'en')).toBe('');
  });
});
