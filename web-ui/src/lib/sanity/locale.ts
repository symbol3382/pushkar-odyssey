export const CONTENT_LANGUAGES = ['en', 'hi', 'gu', 'mr', 'bn', 'ta', 'te'] as const;

export type ContentLanguage = (typeof CONTENT_LANGUAGES)[number];

export type LocaleValue<T> = Partial<Record<ContentLanguage, T>> | null | undefined;

function languageCode(language: string): ContentLanguage | null {
  const code = language.toLowerCase().split('-')[0];
  return CONTENT_LANGUAGES.find((item) => item === code) ?? null;
}

function hasValue<T>(value: T | undefined): value is T {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return value != null;
}

export function pickLocale<T>(field: LocaleValue<T>, language: string): T | undefined {
  if (!field) return undefined;
  const preferred = languageCode(language);
  if (preferred && hasValue(field[preferred])) return field[preferred];
  if (hasValue(field.en)) return field.en;
  for (const code of CONTENT_LANGUAGES) {
    if (hasValue(field[code])) return field[code];
  }
  return undefined;
}

export function pickText(field: LocaleValue<string>, language: string): string {
  const value = pickLocale(field, language);
  return typeof value === 'string' ? value.trim() : '';
}
