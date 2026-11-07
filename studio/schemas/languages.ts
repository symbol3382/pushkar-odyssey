/** Keep these codes aligned with web-ui/src/i18n/languages.ts */
export const languages = [
  { id: "en", title: "English" },
  { id: "hi", title: "Hindi" },
] as const;

export type LanguageId = (typeof languages)[number]["id"];
