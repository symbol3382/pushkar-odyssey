import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { nav } from '../content/nav';
import { useLocalizedSite } from '../hooks/useLocalizedContent';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useTranslation('common');
  const site = useLocalizedSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm tracking-wide transition ${
      isActive ? 'text-bhagwa' : 'text-ink-soft hover:text-bhagwa'
    }`;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-bhagwa/10 bg-cream/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2"
          onClick={() => {
            setOpen(false);
          }}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-bhagwa to-maroon font-display text-sm text-cream shadow-md shadow-bhagwa/30">
            प
          </span>
          <span className="truncate font-display text-xl font-semibold tracking-tight text-ink transition group-hover:text-bhagwa sm:text-2xl">
            {site.brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.primary.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {t(item.labelKey)}
            </NavLink>
          ))}
          <div
            className="relative"
            onMouseEnter={() => {
              setExploreOpen(true);
            }}
            onMouseLeave={() => {
              setExploreOpen(false);
            }}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm tracking-wide text-ink-soft transition hover:text-bhagwa"
              aria-expanded={exploreOpen}
            >
              {t('nav.explore')}
              <ChevronDown />
            </button>
            <AnimatePresence>
              {exploreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full pt-2"
                >
                  <div className="min-w-48 overflow-hidden rounded-sm border border-bhagwa/15 bg-cream shadow-lg shadow-ink/10">
                    {nav.explore.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2.5 text-sm text-ink-soft transition hover:bg-sand hover:text-bhagwa"
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <LanguageSwitcher />
          <Link
            to="/contact"
            className="rounded-sm bg-maroon px-4 py-2 text-sm font-medium text-cream transition hover:bg-maroon-deep"
          >
            {t('nav.bookNow')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm border border-bhagwa/20 text-ink"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => {
              setOpen((v) => !v);
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-bhagwa/10 bg-cream lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {[...nav.primary, ...nav.explore].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `rounded-sm px-3 py-3 text-base ${isActive ? 'bg-sand text-bhagwa' : 'text-ink-soft'}`
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function ChevronDown() {
  return (
    <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
