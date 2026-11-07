import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiMiniBars3, HiMiniChevronDown, HiMiniXMark } from 'react-icons/hi2';
import { images } from '../content/images';
import { nav } from '../content/nav';
import { BookNowIcon, ExploreIcon, NavItemIcon } from '../content/navIcons';
import { useLocalizedSite } from '../hooks/useLocalizedContent';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useTranslation('common');
  const siteQuery = useLocalizedSite();
  const site = siteQuery.data;
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
    `inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide transition ${
      isActive ? 'text-bhagwa' : 'text-ink-soft hover:text-bhagwa'
    }`;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b border-bhagwa/10 bg-cream/55 backdrop-blur-md transition-shadow duration-300 ${
        scrolled || open ? 'bg-cream/70 shadow-sm' : ''
      }`}
    >
      <div className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2"
          onClick={() => {
            setOpen(false);
          }}
        >
          <img
            src={images.logo}
            alt={site?.brandName ?? 'Pushkar Odyssey'}
            className="size-11 shrink-0 object-contain"
          />
          <span className="hidden truncate font-brand text-[1.65rem] font-bold leading-none tracking-[0.04em] text-maroon transition group-hover:text-bhagwa lg:inline lg:text-[1.85rem]">
            {site?.brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.primary.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              <NavItemIcon path={item.to} className="size-4 shrink-0" />
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
              className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-ink-soft transition hover:text-bhagwa"
              aria-expanded={exploreOpen}
            >
              <ExploreIcon className="size-4 shrink-0" aria-hidden />
              {t('nav.explore')}
              <HiMiniChevronDown className="size-3.5" aria-hidden />
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
                  <div className="max-h-[70vh] min-w-56 overflow-y-auto rounded-sm border border-bhagwa/15 bg-cream shadow-lg shadow-ink/10">
                    {nav.explore.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-sand hover:text-bhagwa"
                      >
                        <NavItemIcon path={item.to} className="size-4 shrink-0" />
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
            className="inline-flex items-center gap-1.5 rounded-sm bg-maroon px-4 py-2 text-sm font-semibold text-cream transition hover:bg-maroon-deep"
          >
            <BookNowIcon className="size-4 shrink-0" aria-hidden />
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
            {open ? (
              <HiMiniXMark className="size-5" aria-hidden />
            ) : (
              <HiMiniBars3 className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-bhagwa/10 bg-cream lg:hidden"
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
                      `inline-flex items-center gap-2.5 rounded-sm px-3 py-3 text-base font-semibold ${
                        isActive ? 'bg-sand text-bhagwa' : 'text-ink-soft'
                      }`
                    }
                >
                  <NavItemIcon path={item.to} className="size-4 shrink-0" />
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
