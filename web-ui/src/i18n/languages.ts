export const SUPPORTED_LANGUAGES = [
  { code: 'en', nativeLabel: 'English', englishLabel: 'English' },
  { code: 'hi', nativeLabel: 'हिन्दी', englishLabel: 'Hindi' },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';
