import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BulletList, Gallery, TextBlock } from '../components/DetailBits';
import { HeroScrim } from '../components/HeroScrim';
import { MissingContent, QueryStatus } from '../components/QueryStatus';
import { RichText } from '../components/RichText';
import { Seo } from '../components/Seo';
import { StickyBookBar } from '../components/StickyBookBar';
import { catalogById, type CatalogId } from '../content/catalogs';
import { useLocalizedCatalogItem, useLocalizedSite } from '../hooks/useLocalizedContent';
import { pageJsonLd } from '../lib/structuredData';

export function CatalogDetailPage({ catalogId }: { catalogId: CatalogId }) {
  const { slug } = useParams();
  const { t } = useTranslation('common');
  const catalog = catalogById(catalogId);
  const site = useLocalizedSite();
  const listing = useLocalizedCatalogItem(catalogId, slug);
  const item = listing.data;
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  if (listing.status !== 'ready' || !item) {
    return (
      <QueryStatus query={listing}>
        <MissingContent
          title={t(catalog.copy.notFound)}
          to={catalog.path}
          action={t(catalog.copy.all)}
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
        path={`${catalog.path}/${item.slug}`}
        image={item.seoImage ?? item.image}
        jsonLd={
          listing.source === 'sanity'
            ? pageJsonLd(catalog.jsonLd, item.title, description, `${catalog.path}/${item.slug}`)
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
        <HeroScrim tone="bottom" />
        <div className="text-shadow-hero absolute inset-x-0 bottom-0 mx-auto max-w-page px-4 pb-10 sm:px-6 lg:px-8">
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
          { label: t(catalog.copy.nav), to: catalog.path },
          { label: item.title },
        ]}
      />
      <div className="mx-auto grid max-w-page gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <RichText body={item.body} fallback={item.description} />
          {catalog.id === 'stay' && (
            <p className="mt-6 text-sm text-ink-soft">{t('pages.stayAvailability')}</p>
          )}
          {item.seasonal && <p className="mt-6 text-sm text-ink-soft">{t('pages.seasonal')}</p>}
          {item.itinerary.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.itinerary')}</h2>
              <ol className="mt-4 space-y-4">
                {item.itinerary.map((step) => (
                  <li key={`${step.day}-${step.title}`} className="border-l-2 border-bhagwa/40 pl-4">
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
          {item.notes.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.notes')}</h2>
              <div className="mt-4 space-y-4">
                {item.notes.map((note) => (
                  <div key={note.question}>
                    <p className="font-medium text-ink">{note.question}</p>
                    <p className="mt-1 text-sm text-ink-soft">{note.answer}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          <BulletList title={t('pages.inclusions')} items={item.inclusions} />
          <BulletList title={t('pages.highlights')} items={item.highlights} />
          <BulletList title={t('pages.exclusions')} items={item.exclusions} />
          <BulletList title={t('pages.amenities')} items={item.amenities} />
          <TextBlock title={t('pages.format')} text={item.format} />
          <TextBlock
            title={t('pages.purpose')}
            text={item.purposes.length > 0 ? item.purposes.join(' · ') : undefined}
          />
          <TextBlock title={t('pages.preparation')} text={item.preparation} />
          <TextBlock title={t('pages.transport')} text={item.transport} />
          <TextBlock title={t('pages.accommodation')} text={item.accommodation} />
          <TextBlock title={t('pages.rooms')} text={item.rooms} />
          <TextBlock title={t('pages.address')} text={item.address} />
          <TextBlock title={t('pages.location')} text={item.location} />
          <TextBlock title={t('pages.when')} text={item.when} />
          <TextBlock title={t('pages.season')} text={item.season} />
          {group && <TextBlock title={t('pages.groupSize')} text={group} />}
          {item.languages.length > 0 && (
            <TextBlock title={t('pages.languages')} text={item.languages.join(' · ')} />
          )}
          <TextBlock title={t('pages.enquiryNote')} text={item.enquiryNote} />
          {item.mapUrl && (
            <p className="mt-6">
              <a
                href={item.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-bhagwa hover:underline"
              >
                {t('actions.openMap')}
              </a>
            </p>
          )}
          <Gallery images={item.gallery} title={t('pages.gallery')} />
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-bhagwa/15 bg-sand/40 p-6">
            <p className="font-display text-xl text-ink">{t(catalog.copy.book)}</p>
            <p className="mt-2 text-sm text-ink-soft">{t(catalog.copy.hint)}</p>
            <BookCTA
              type={catalog.bookingType}
              title={item.title}
              slug={item.slug}
              className="mt-5"
              compact
            />
            <Link to={catalog.path} className="mt-4 inline-block text-sm text-maroon hover:underline">
              ← {t(catalog.copy.all)}
            </Link>
          </div>
        </aside>
      </div>
      <StickyBookBar type={catalog.bookingType} title={item.title} slug={item.slug} />
    </article>
  );
}
