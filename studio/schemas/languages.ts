/** Keep these codes aligned with web-ui/src/i18n/languages.ts */
export const languages = [
  { id: "en", title: "English" },
  { id: "hi", title: "Hindi" },
  { id: "gu", title: "Gujarati" },
  { id: "mr", title: "Marathi" },
  { id: "bn", title: "Bengali" },
  { id: "ta", title: "Tamil" },
  { id: "te", title: "Telugu" },
] as const;

export type LanguageId = (typeof languages)[number]["id"];
