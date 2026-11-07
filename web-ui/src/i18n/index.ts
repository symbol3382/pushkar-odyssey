import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '../locales/en/common.json';
import enContent from '../locales/en/content.json';
import hiCommon from '../locales/hi/common.json';
import hiContent from '../locales/hi/content.json';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './languages';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, content: enContent },
      hi: { common: hiCommon, content: hiContent },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    ns: ['common', 'content'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'pushkar-tour-lang',
    },
    returnNull: false,
  });

export default i18n;
