export const SUPPORTED_LANGUAGES = [
  { code: 'en', nativeLabel: 'English', englishLabel: 'English' },
  { code: 'hi', nativeLabel: 'हिन्दी', englishLabel: 'Hindi' },
  { code: 'gu', nativeLabel: 'ગુજરાતી', englishLabel: 'Gujarati' },
  { code: 'mr', nativeLabel: 'मराठी', englishLabel: 'Marathi' },
  { code: 'bn', nativeLabel: 'বাংলা', englishLabel: 'Bengali' },
  { code: 'ta', nativeLabel: 'தமிழ்', englishLabel: 'Tamil' },
  { code: 'te', nativeLabel: 'తెలుగు', englishLabel: 'Telugu' },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';
