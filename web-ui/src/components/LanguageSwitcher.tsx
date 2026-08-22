import { useTranslation } from 'react-i18next';
import type { LanguageCode } from '../i18n/languages';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { t, i18n } = useTranslation('common');
  const current = (i18n.resolvedLanguage ?? i18n.language).split('-')[0] as LanguageCode;

  return (
    <label className={`relative inline-flex items-center gap-1.5 ${compact ? '' : ''}`}>
      <span className="sr-only">{t('language.choose')}</span>
      <select
        value={SUPPORTED_LANGUAGES.some((l) => l.code === current) ? current : 'en'}
        onChange={(e) => {
          void i18n.changeLanguage(e.target.value);
          document.documentElement.lang = e.target.value;
        }}
        className="max-w-[7.5rem] cursor-pointer appearance-none rounded-sm border border-bhagwa/25 bg-cream/90 py-1.5 pl-2 pr-7 text-xs font-medium text-ink-soft transition hover:border-bhagwa/50 focus-visible:outline-bhagwa sm:max-w-none sm:text-sm"
        aria-label={t('language.label')}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeLabel}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 text-[10px] text-ink-soft" aria-hidden>
        ▾
      </span>
    </label>
  );
}
