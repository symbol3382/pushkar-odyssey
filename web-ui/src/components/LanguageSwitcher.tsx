import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LuLanguages } from 'react-icons/lu';
import type { LanguageCode } from '../i18n/languages';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { t, i18n } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const currentCode = (i18n.resolvedLanguage ?? i18n.language).split('-')[0] as LanguageCode;
  const current =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentCode) ?? SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const choose = (code: LanguageCode) => {
    void i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={
          compact
            ? 'inline-flex size-10 items-center justify-center text-ink transition hover:text-bhagwa'
            : 'inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-bhagwa'
        }
        aria-label={t('language.label')}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          setOpen((value) => !value);
        }}
      >
        <LuLanguages className={compact ? 'size-5' : 'size-4'} aria-hidden />
        {!compact && <span>{current.nativeLabel}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="listbox"
            aria-label={t('language.choose')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-50 pt-2"
          >
            <div className="min-w-44 overflow-hidden rounded-sm border border-bhagwa/15 bg-cream shadow-lg shadow-ink/10">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const selected = lang.code === current.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition ${
                      selected
                        ? 'bg-sand text-bhagwa'
                        : 'text-ink-soft hover:bg-sand hover:text-bhagwa'
                    }`}
                    onClick={() => {
                      choose(lang.code);
                    }}
                  >
                    <span className="font-medium">{lang.nativeLabel}</span>
                    <span className="text-xs text-ink-soft/70">{lang.englishLabel}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
