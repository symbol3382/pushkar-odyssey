import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { PackageCard } from '../components/PackageCard';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { Seo } from '../components/Seo';
import { WorksBanner } from '../components/WorksBanner';
import {
  useLocalizedHome,
  useLocalizedPoojas,
  useLocalizedSite,
  useLocalizedStays,
  useLocalizedTestimonials,
  useLocalizedTours,
} from '../hooks/useLocalizedContent';
import { organizationJsonLd } from '../lib/structuredData';
import type { CardView } from '../content/views';

export function HomePage() {
  const { t } = useTranslation(['common', 'content']);
  const home = useLocalizedHome();
  const site = useLocalizedSite();
  const tours = useLocalizedTours();
  const poojas = useLocalizedPoojas();
  const stays = useLocalizedStays();
  const testimonials = useLocalizedTestimonials();
  const hero = home.data;
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  return (
    <>
      <Seo
        title={site.data?.seoTitle ?? brand}
        description={site.data?.seoDescription ?? t('site.shortDescription', { ns: 'content' })}
        path="/"
        image={hero?.heroImage ?? site.data?.seoImage}
        jsonLd={site.data ? organizationJsonLd(site.data) : null}
      />
      <QueryStatus query={home}>
        {hero?.heroTitle ? (
          <section className="relative min-h-dvh overflow-hidden grain-overlay">
            {hero.heroImage && (
              <img
                src={hero.heroImage}
                alt={hero.heroImageAlt}
                srcSet={hero.heroImageSrcSet}
                sizes="100vw"
                className="absolute inset-0 size-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-maroon/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-ink/40" />
            <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl"
              >
                {site.data?.tagline && (
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
                    {site.data.tagline}
                  </p>
                )}
                <h1 className="mt-4 font-display text-5xl leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
                  {hero.heroTitle}
                </h1>
                {hero.heroSubtitle && (
                  <p className="mt-5 max-w-md text-base leading-relaxed text-sand/90 sm:text-lg">
                    {hero.heroSubtitle}
                  </p>
                )}
                <div className="mt-8 flex flex-wrap gap-3">
                  {hero.ctaPrimary.label && (
                    <Link
                      to={hero.ctaPrimary.to}
                      className="rounded-sm bg-bhagwa px-6 py-3 text-sm font-medium text-cream shadow-lg shadow-bhagwa/30 transition hover:bg-bhagwa-light"
                    >
                      {hero.ctaPrimary.label}
                    </Link>
                  )}
                  {hero.ctaSecondary.label && (
                    <Link
                      to={hero.ctaSecondary.to}
                      className="rounded-sm border border-cream/40 bg-cream/10 px-6 py-3 text-sm font-medium text-cream backdrop-blur-sm transition hover:bg-cream/20"
                    >
                      {hero.ctaSecondary.label}
                    </Link>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        ) : (
          <EmptyCatalog message={t('pages.emptyHome')} />
        )}
      </QueryStatus>

      <WorksBanner />

      {home.status === 'ready' && (
        <>
          <FeaturedSection
            eyebrow={t('home.featuredJourneys')}
            title={t('home.toursWithSoul')}
            link={{
              to: '/tours',
              label: tours.data
                ? t('home.allToursCount', { count: tours.data.length })
                : t('actions.allTours'),
            }}
            items={hero?.featuredTours ?? []}
            empty={t('pages.emptyTours')}
          />
          <FeaturedSection
            eyebrow={t('home.rituals')}
            title={t('home.poojasAarti')}
            link={{
              to: '/poojas',
              label: poojas.data
                ? t('home.browseCount', { count: poojas.data.length })
                : t('actions.allPoojas'),
            }}
            items={hero?.featuredPoojas ?? []}
            empty={t('pages.emptyPoojas')}
            tone="sand"
          />
          <FeaturedSection
            eyebrow={t('home.rest')}
            title={t('home.staysNear')}
            link={{
              to: '/stays',
              label: stays.data
                ? t('home.viewStaysCount', { count: stays.data.length })
                : t('actions.allStays'),
            }}
            items={hero?.featuredStays ?? []}
            empty={t('pages.emptyStays')}
          />
        </>
      )}

      <QueryStatus query={testimonials}>
        {testimonials.data && testimonials.data.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
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
                  {(item.name || item.detail) && (
                    <footer className="mt-4 text-sm text-maroon">
                      {item.name}
                      {item.name && item.detail ? ' · ' : ''}
                      {item.detail}
                    </footer>
                  )}
                </blockquote>
              ))}
            </div>
          </section>
        )}
      </QueryStatus>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-maroon to-bhagwa-deep px-8 py-12 sm:px-12">
          <div className="mandala-bg absolute inset-0 opacity-30" aria-hidden />
          <div className="relative max-w-lg">
            <h2 className="font-display text-3xl text-cream sm:text-4xl">{t('home.ctaTitle')}</h2>
            <p className="mt-3 text-sand/85">{t('home.ctaBody')}</p>
            <BookCTA type="general" title={t('home.customPlan')} className="mt-6" />
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedSection({
  eyebrow,
  title,
  link,
  items,
  empty,
  tone,
}: {
  eyebrow: string;
  title: string;
  link: { to: string; label: string };
  items: CardView[];
  empty: string;
  tone?: 'sand';
}) {
  const body = (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow={eyebrow} title={title} link={link} />
      {items.length === 0 ? (
        <EmptyCatalog message={empty} />
      ) : (
        <div
          className={`mt-10 grid gap-8 sm:grid-cols-2 ${items.length > 2 ? 'lg:grid-cols-3' : ''}`}
        >
          {items.map((item, i) => (
            <PackageCard
              key={item.slug}
              to={item.to}
              title={item.title}
              summary={item.summary}
              image={item.image}
              imageAlt={item.imageAlt}
              imageSrcSet={item.imageSrcSet}
              priceLabel={item.priceLabel}
              meta={item.meta}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
  if (tone === 'sand') return <section className="bg-sand/50">{body}</section>;
  return <section>{body}</section>;
}

function SectionHeading({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link: { to: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bhagwa">{eyebrow}</p>
        <h2 className="mt-1 font-display text-3xl text-ink sm:text-4xl">{title}</h2>
      </div>
      <Link
        to={link.to}
        className="text-sm font-medium text-maroon underline-offset-4 hover:underline"
      >
        {link.label}
      </Link>
    </div>
  );
}
