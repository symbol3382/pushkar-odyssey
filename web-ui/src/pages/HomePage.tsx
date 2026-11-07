import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { PackageCard } from '../components/PackageCard';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { Seo } from '../components/Seo';
import { WorksBanner } from '../components/WorksBanner';
import { homeLinks, homeRails } from '../content/catalogs';
import { images } from '../content/images';
import type { CardView } from '../content/views';
import {
  useLocalizedCatalog,
  useLocalizedHome,
  useLocalizedSite,
  useLocalizedTestimonials,
} from '../hooks/useLocalizedContent';
import { organizationJsonLd } from '../lib/structuredData';

const HERO_CTA = {
  primary: { to: '/tours' },
  secondary: { to: '/vedic-poojas' },
} as const;

export function HomePage() {
  const { t } = useTranslation(['common', 'content']);
  const home = useLocalizedHome();
  const site = useLocalizedSite();
  const darshan = useLocalizedCatalog('darshan');
  const desert = useLocalizedCatalog('desert');
  const tours = useLocalizedCatalog('tour');
  const stays = useLocalizedCatalog('stay');
  const testimonials = useLocalizedTestimonials();
  const hero = home.data;
  const counts = {
    darshan: darshan.data?.length,
    desert: desert.data?.length,
    tour: tours.data?.length,
    stay: stays.data?.length,
  };
  const featured = {
    darshan: hero?.featuredDarshan ?? [],
    desert: hero?.featuredDesert ?? [],
    tour: hero?.featuredTours ?? [],
    stay: hero?.featuredStays ?? [],
  };
  const brand = t('site.brandName', { ns: 'content' });
  const tagline = t('site.tagline', { ns: 'content' });
  const heroTitle = t('home.heroTitle', { ns: 'content' });
  const heroSubtitle = t('home.heroSubtitle', { ns: 'content' });
  const heroImage = hero?.heroImage ?? images.homeHero;
  const heroImageAlt = hero?.heroImageAlt ?? heroTitle;

  return (
    <>
      <Seo
        title={site.data?.seoTitle ?? brand}
        description={site.data?.seoDescription ?? t('site.shortDescription', { ns: 'content' })}
        path="/"
        image={heroImage !== images.homeHero ? heroImage : site.data?.seoImage}
        jsonLd={site.data ? organizationJsonLd(site.data) : null}
      />

      <section className="relative min-h-dvh overflow-hidden grain-overlay">
        <img
          src={heroImage}
          alt={heroImageAlt}
          srcSet={hero?.heroImageSrcSet}
          sizes="100vw"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-maroon/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-ink/40" />
        <div className="relative mx-auto flex min-h-dvh max-w-page flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              {tagline}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
              {heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-sand/90 sm:text-lg">
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
                className="rounded-sm border border-cream/40 bg-cream/10 px-6 py-3 text-sm font-medium text-cream backdrop-blur-sm transition hover:bg-cream/20"
              >
                {t('home.ctaSecondary', { ns: 'content' })}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <WorksBanner />

      {homeRails.map((catalog, index) => (
        <FeaturedSection
          key={catalog.id}
          eyebrow={t(catalog.copy.homeEyebrow)}
          title={t(catalog.copy.homeTitle)}
          link={{
            to: catalog.path,
            label:
              counts[catalog.id] != null
                ? t('home.browseCount', { count: counts[catalog.id] })
                : t(catalog.copy.all),
          }}
          items={featured[catalog.id]}
          empty={t(catalog.copy.empty)}
          loading={home.status === 'loading'}
          tone={index % 2 === 1 ? 'sand' : undefined}
        />
      ))}

      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bhagwa">
          {t('home.moreEyebrow')}
        </p>
        <h2 className="mt-1 font-display text-3xl text-ink sm:text-4xl">{t('home.moreTitle')}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeLinks.map((catalog) => (
            <Link
              key={catalog.id}
              to={catalog.path}
              className="rounded-sm border border-bhagwa/15 bg-sand/40 p-6 transition hover:border-bhagwa/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bhagwa">
                {t(catalog.copy.eyebrow)}
              </p>
              <h3 className="mt-2 font-display text-2xl text-ink">{t(catalog.copy.title)}</h3>
              <p className="mt-2 text-sm text-ink-soft">{t(catalog.copy.subtitle)}</p>
            </Link>
          ))}
        </div>
      </section>

      <QueryStatus query={testimonials}>
        {testimonials.data && testimonials.data.length > 0 && (
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

      <section className="relative mx-auto max-w-page overflow-hidden px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-maroon to-bhagwa-deep px-8 py-12 sm:px-12">
          <div className="mandala-bg absolute inset-0 opacity-30" aria-hidden />
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

function FeaturedSection({
  eyebrow,
  title,
  link,
  items,
  empty,
  loading,
  tone,
}: {
  eyebrow: string;
  title: string;
  link: { to: string; label: string };
  items: CardView[];
  empty: string;
  loading?: boolean;
  tone?: 'sand';
}) {
  const body = (
    <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow={eyebrow} title={title} link={link} />
      {loading ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-live="polite">
          {['one', 'two', 'three'].map((item) => (
            <div key={item} className="aspect-[4/3] animate-pulse rounded-sm bg-sand" />
          ))}
        </div>
      ) : items.length === 0 ? (
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
