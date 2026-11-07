import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { catalogs, type Catalog } from '../content/catalogs';
import type { CardView } from '../content/views';

type FeaturedMap = Record<Catalog['id'], CardView[]>;

export function HomeCategorySections({ featured }: { featured: FeaturedMap }) {
  return (
    <div className="space-y-0">
      {catalogs.map((catalog) => (
        <CategoryPanel
          key={catalog.id}
          catalog={catalog}
          items={featured[catalog.id]}
        />
      ))}
    </div>
  );
}

function CategoryPanel({ catalog, items }: { catalog: Catalog; items: CardView[] }) {
  const { t } = useTranslation('common');
  const preview = items.slice(0, 3);

  if (catalog.homeLayout === 'sacred') {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-maroon via-maroon-deep to-ink text-cream">
        <div className="bg-mandala absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto grid max-w-page gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              {t(catalog.copy.homeEyebrow)}
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              {t(catalog.copy.homeTitle)}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85">
              {t(catalog.copy.homeBody)}
            </p>
            <Link
              to={catalog.path}
              className="mt-8 inline-flex rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-soft"
            >
              {t(catalog.copy.homeCta)}
            </Link>
          </motion.div>
          <div className="grid gap-3">
            {(preview.length > 0 ? preview : placeholderCards(3)).map((item, index) => (
              <Link
                key={item.slug}
                to={item.to.startsWith('/') ? item.to : catalog.path}
                className="border border-cream/15 bg-cream/5 px-5 py-4 backdrop-blur-sm transition hover:bg-cream/10"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold-soft">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-1 font-display text-2xl text-cream">{item.title}</p>
                <p className="mt-1 text-sm text-cream/70">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (catalog.homeLayout === 'desert') {
    return (
      <section className="relative overflow-hidden bg-sand">
        <div
          className="absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_80%_20%,rgba(201,120,48,0.22),transparent_45%),radial-gradient(circle_at_60%_80%,rgba(122,42,42,0.12),transparent_40%)] lg:w-1/2"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-page flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-end lg:px-8 lg:py-28">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-bhagwa">
              {t(catalog.copy.homeEyebrow)}
            </p>
            <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              {t(catalog.copy.homeTitle)}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{t(catalog.copy.homeBody)}</p>
            <Link
              to={catalog.path}
              className="mt-8 inline-flex rounded-sm bg-bhagwa px-5 py-3 text-sm font-semibold text-cream transition hover:bg-bhagwa-light"
            >
              {t(catalog.copy.homeCta)}
            </Link>
          </motion.div>
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {(preview.length > 0 ? preview : placeholderCards(3)).map((item) => (
              <Link
                key={item.slug}
                to={item.to.startsWith('/') ? item.to : catalog.path}
                className="border border-bhagwa/20 bg-cream/70 p-5 shadow-[0_18px_40px_-28px_rgba(74,28,28,0.45)] transition hover:-translate-y-1"
              >
                <p className="font-display text-xl text-maroon">{item.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (catalog.homeLayout === 'journey') {
    return (
      <section className="border-y border-bhagwa/10 bg-cream">
        <div className="mx-auto max-w-page px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-bhagwa">
                {t(catalog.copy.homeEyebrow)}
              </p>
              <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
                {t(catalog.copy.homeTitle)}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{t(catalog.copy.homeBody)}</p>
            </div>
            <Link
              to={catalog.path}
              className="text-sm font-semibold text-maroon underline-offset-4 hover:underline"
            >
              {t(catalog.copy.homeCta)} →
            </Link>
          </div>
          <div className="mt-12 grid gap-0 md:grid-cols-3">
            {(preview.length > 0 ? preview : placeholderCards(3)).map((item, index) => (
              <Link
                key={item.slug}
                to={item.to.startsWith('/') ? item.to : catalog.path}
                className={`border border-bhagwa/15 p-6 transition hover:bg-sand/60 ${
                  index > 0 ? 'md:border-l-0' : ''
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bhagwa">
                  {item.meta ?? t('home.journeyStep', { step: index + 1 })}
                </p>
                <p className="mt-3 font-display text-2xl text-ink">{item.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (catalog.homeLayout === 'celebration') {
    return (
      <section className="relative overflow-hidden bg-ink text-cream">
        <div
          className="absolute -left-20 top-10 size-72 rounded-full bg-bhagwa/25 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -right-16 bottom-0 size-80 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-page px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              {t(catalog.copy.homeEyebrow)}
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">{t(catalog.copy.homeTitle)}</h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">{t(catalog.copy.homeBody)}</p>
            <Link
              to={catalog.path}
              className="mt-8 inline-flex rounded-sm border border-cream/40 px-5 py-3 text-sm font-semibold text-cream transition hover:bg-cream/10"
            >
              {t(catalog.copy.homeCta)}
            </Link>
          </div>
          <div className="mt-12 flex gap-4 overflow-x-auto pb-2">
            {(preview.length > 0 ? preview : placeholderCards(4)).map((item) => (
              <Link
                key={item.slug}
                to={item.to.startsWith('/') ? item.to : catalog.path}
                className="min-w-[240px] flex-1 border border-cream/15 bg-cream/5 p-5 transition hover:bg-cream/10"
              >
                <p className="font-display text-2xl">{item.title}</p>
                <p className="mt-2 text-sm text-cream/70">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-bhagwa">
              {t(catalog.copy.homeEyebrow)}
            </p>
            <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              {t(catalog.copy.homeTitle)}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{t(catalog.copy.homeBody)}</p>
            <Link
              to={catalog.path}
              className="mt-8 inline-flex rounded-sm bg-maroon px-5 py-3 text-sm font-semibold text-cream transition hover:bg-maroon-deep"
            >
              {t(catalog.copy.homeCta)}
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(preview.length > 0 ? preview : placeholderCards(4)).map((item, index) => (
              <Link
                key={item.slug}
                to={item.to.startsWith('/') ? item.to : catalog.path}
                className={`border border-bhagwa/15 bg-cream p-5 transition hover:border-bhagwa/40 ${
                  index === 0 ? 'sm:col-span-2 sm:min-h-36' : ''
                }`}
              >
                <p className="font-display text-xl text-ink sm:text-2xl">{item.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function placeholderCards(count: number): CardView[] {
  return Array.from({ length: count }, (_, index) => ({
    slug: `placeholder-${String(index)}`,
    title: 'Coming soon',
    summary: 'Ask on WhatsApp for the latest offerings in this category.',
    image: '',
    imageAlt: '',
    priceLabel: null,
    to: '#',
  }));
}
