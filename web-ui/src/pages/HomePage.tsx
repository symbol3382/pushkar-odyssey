import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { HeroScrim } from '../components/HeroScrim';
import { HomeCategorySections } from '../components/HomeCategorySections';
import { QueryStatus } from '../components/QueryStatus';
import { Seo } from '../components/Seo';
import { WorksBanner } from '../components/WorksBanner';
import type { HomeHeroImage } from '../content/views';
import {
  useLocalizedHome,
  useLocalizedSite,
  useLocalizedTestimonials,
} from '../hooks/useLocalizedContent';
import { organizationJsonLd } from '../lib/structuredData';

const HERO_CTA = {
  primary: { to: '/darshan' },
  secondary: { to: '/cultural-program' },
} as const;

const HERO_ROTATE_MS = 7000;

export function HomePage() {
  const { t } = useTranslation(['common', 'content']);
  const home = useLocalizedHome();
  const site = useLocalizedSite();
  const testimonials = useLocalizedTestimonials();
  const hero = home.data;
  const brand = t('site.brandName', { ns: 'content' });
  const tagline = t('site.tagline', { ns: 'content' });
  const heroTitle = t('home.heroTitle', { ns: 'content' });
  const heroSubtitle = t('home.heroSubtitle', { ns: 'content' });
  const heroImages = hero?.heroImages ?? [];
  const seoImage = heroImages[0]?.src;
  const featured = {
    darshan: hero?.featuredDarshan ?? [],
    cultural: hero?.featuredCultural ?? [],
    tour: hero?.featuredTours ?? [],
    events: hero?.featuredEvents ?? [],
    bestsellers: hero?.featuredBestsellers ?? [],
  };

  return (
    <>
      <Seo
        title={site.data?.seoTitle ?? brand}
        description={site.data?.seoDescription ?? t('site.shortDescription', { ns: 'content' })}
        path="/"
        image={seoImage || site.data?.seoImage}
        jsonLd={site.data ? organizationJsonLd(site.data) : null}
      />

      <section className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-maroon via-bhagwa-deep to-ink">
        <HomeHeroSlideshow images={heroImages} alt={heroTitle} />
        <HeroScrim tone="bottom" />
        <div className="relative mx-auto flex min-h-dvh max-w-page flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-shadow-hero max-w-4xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              {tagline}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
              {heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream/90 sm:text-lg">
              {heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={HERO_CTA.primary.to}
                className="rounded-sm bg-bhagwa px-6 py-3 text-sm font-medium text-cream shadow-lg shadow-bhagwa/30 transition hover:bg-bhagwa-light"
              >
                {t('home.ctaPrimary', { ns: 'content' })}
              </Link>
              <Link
                to={HERO_CTA.secondary.to}
                className="rounded-sm border border-cream/50 bg-ink/25 px-6 py-3 text-sm font-medium text-cream backdrop-blur-sm transition hover:bg-ink/40"
              >
                {t('home.ctaSecondary', { ns: 'content' })}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <WorksBanner />
      <HomeCategorySections featured={featured} />

      <QueryStatus query={testimonials}>
        {testimonials.data && testimonials.data.length > 0 ? (
          <section className="mx-auto max-w-page px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bhagwa">
              {t('home.testimonialsEyebrow')}
            </p>
            <h2 className="mt-1 font-display text-3xl text-ink sm:text-4xl">
              {t('pages.testimonialsTitle')}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {testimonials.data.map((item) => (
                <blockquote
                  key={item.id}
                  className="rounded-sm border border-bhagwa/15 bg-sand/40 p-6"
                >
                  <p className="text-ink-soft">“{item.quote}”</p>
                  {item.name || item.detail ? (
                    <footer className="mt-4 text-sm text-maroon">
                      {item.name}
                      {item.name && item.detail ? ' · ' : ''}
                      {item.detail}
                    </footer>
                  ) : null}
                </blockquote>
              ))}
            </div>
          </section>
        ) : null}
      </QueryStatus>

      <section className="relative mx-auto max-w-page overflow-hidden px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-maroon to-bhagwa-deep px-8 py-12 sm:px-12">
          <div className="bg-mandala absolute inset-0 opacity-30" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-3xl text-cream sm:text-4xl">{t('home.ctaTitle')}</h2>
            <p className="mt-3 max-w-3xl text-sand/85">{t('home.ctaBody')}</p>
            <BookCTA type="general" title={t('home.customPlan')} className="mt-6" />
          </div>
        </div>
      </section>
    </>
  );
}

function HomeHeroSlideshow({ images, alt }: { images: HomeHeroImage[]; alt: string }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = images.length;
  const active = count > 0 ? images[index % count] : undefined;

  useEffect(() => {
    if (reduceMotion || count < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => current + 1);
    }, HERO_ROTATE_MS);
    return () => {
      window.clearInterval(timer);
    };
  }, [count, reduceMotion]);

  if (!active) return null;

  return (
    <div className="absolute inset-0" aria-hidden={count > 1}>
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={`${active.src}-${String(index)}`}
          src={active.src}
          alt={count > 1 ? '' : alt}
          srcSet={active.srcSet}
          sizes="100vw"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0 size-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}
