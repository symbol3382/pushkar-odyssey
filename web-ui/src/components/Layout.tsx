import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalizedSite } from '../hooks/useLocalizedContent';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const site = useLocalizedSite();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
  }, [i18n.language, i18n.resolvedLanguage]);

  useEffect(() => {
    const href = site.data?.favicon?.src;
    if (!href) return;
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.append(link);
    }
    link.href = href;
  }, [site.data?.favicon?.src]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
