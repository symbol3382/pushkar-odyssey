import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MissingContent, QueryStatus } from '../components/QueryStatus';
import { RichText } from '../components/RichText';
import { Seo } from '../components/Seo';
import { StickyBookBar } from '../components/StickyBookBar';
import { useLocalizedSite, useLocalizedTour } from '../hooks/useLocalizedContent';
import { pageJsonLd } from '../lib/structuredData';
import { BulletList, Gallery, TextBlock } from '../components/DetailBits';

export function TourDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();
  const tour = useLocalizedTour(slug);
  const item = tour.data;
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  if (tour.status !== 'ready' || !item) {
    return (
      <QueryStatus query={tour}>
        <MissingContent
          title={t('pages.notFoundTour')}
          to="/tours"
          action={t('actions.allTours')}
        />
      </QueryStatus>
    );
  }

  const title = item.seoTitle ?? `${item.title} · ${brand}`;
  const description = item.seoDescription ?? item.summary;
  const group =
    item.minGroup && item.maxGroup
      ? t('pages.groupRange', { min: item.minGroup, max: item.maxGroup })
      : item.minGroup
        ? t('pages.groupMin', { min: item.minGroup })
        : item.maxGroup
          ? t('pages.groupMax', { max: item.maxGroup })
          : null;

  return (
    <article className="pb-24 lg:pb-0">
      <Seo
        title={title}
        description={description}
        path={`/tours/${item.slug}`}
        image={item.seoImage ?? item.image}
        jsonLd={
          tour.source === 'sanity'
            ? pageJsonLd('TouristTrip', item.title, description, `/tours/${item.slug}`)
            : null
        }
      />
      <div className="relative h-[50vh] min-h-80 overflow-hidden pt-16">
        {item.image && (
          <img
            src={item.image}
            alt={item.imageAlt}
            srcSet={item.imageSrcSet}
            sizes="100vw"
            className="absolute inset-0 size-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-ink/40 to-ink/50" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          {item.meta && (
            <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{item.meta}</p>
          )}
          <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{item.title}</h1>
          {item.priceLabel && <p className="mt-2 text-lg text-bhagwa-light">{item.priceLabel}</p>}
        </div>
      </div>
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.tours'), to: '/tours' },
          { label: item.title },
        ]}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <RichText body={item.body} fallback={item.description} />
          {item.itinerary.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.itinerary')}</h2>
              <ol className="mt-4 space-y-4">
                {item.itinerary.map((step) => (
                  <li
                    key={`${step.day}-${step.title}`}
                    className="border-l-2 border-bhagwa/40 pl-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-bhagwa">
                      {step.day}
                    </p>
                    <p className="font-medium text-ink">{step.title}</p>
                    {step.location && <p className="text-sm text-maroon">{step.location}</p>}
                    <p className="mt-1 text-sm text-ink-soft">{step.details}</p>
                  </li>
                ))}
              </ol>
            </>
          )}
          <BulletList title={t('pages.inclusions')} items={item.inclusions} />
          <BulletList title={t('pages.exclusions')} items={item.exclusions} />
          <TextBlock title={t('pages.transport')} text={item.transport} />
          <TextBlock title={t('pages.accommodation')} text={item.accommodation} />
          <TextBlock title={t('pages.season')} text={item.season} />
          {group && <TextBlock title={t('pages.groupSize')} text={group} />}
          {item.languages.length > 0 && (
            <TextBlock title={t('pages.languages')} text={item.languages.join(' · ')} />
          )}
          {item.destinations.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.related')}</h2>
              <ul className="mt-3 space-y-2">
                {item.destinations.map((destination) => (
                  <li key={destination.to}>
                    <Link to={destination.to} className="text-bhagwa hover:underline">
                      {destination.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Gallery images={item.gallery} title={t('pages.gallery')} />
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-bhagwa/15 bg-sand/40 p-6">
            <p className="font-display text-xl text-ink">{t('booking.bookTour')}</p>
            <p className="mt-2 text-sm text-ink-soft">{t('booking.tourHint')}</p>
            <BookCTA type="tour" title={item.title} slug={item.slug} className="mt-5" compact />
            <Link to="/tours" className="mt-4 inline-block text-sm text-maroon hover:underline">
              ← {t('actions.allTours')}
            </Link>
          </div>
        </aside>
      </div>
      <StickyBookBar type="tour" title={item.title} slug={item.slug} />
    </article>
  );
}
