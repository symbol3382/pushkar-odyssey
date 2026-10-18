import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MissingContent, QueryStatus } from '../components/QueryStatus';
import { RichText } from '../components/RichText';
import { Seo } from '../components/Seo';
import { StickyBookBar } from '../components/StickyBookBar';
import { useLocalizedSite, useLocalizedStay } from '../hooks/useLocalizedContent';
import { pageJsonLd } from '../lib/structuredData';
import { BulletList, Gallery, TextBlock } from '../components/DetailBits';

export function StayDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();
  const stay = useLocalizedStay(slug);
  const item = stay.data;
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  if (stay.status !== 'ready' || !item) {
    return (
      <QueryStatus query={stay}>
        <MissingContent
          title={t('pages.notFoundStay')}
          to="/stays"
          action={t('actions.allStays')}
        />
      </QueryStatus>
    );
  }

  const title = item.seoTitle ?? `${item.title} · ${brand}`;
  const description = item.seoDescription ?? item.summary;
  const jsonLd =
    stay.source === 'sanity'
      ? {
          ...pageJsonLd('LodgingBusiness', item.title, description, `/stays/${item.slug}`),
          ...(item.address ? { address: item.address } : {}),
        }
      : null;

  return (
    <article className="pb-24 lg:pb-0">
      <Seo
        title={title}
        description={description}
        path={`/stays/${item.slug}`}
        image={item.seoImage ?? item.image}
        jsonLd={jsonLd}
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
          {item.location && (
            <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{item.location}</p>
          )}
          <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{item.title}</h1>
          {item.priceLabel && <p className="mt-2 text-lg text-bhagwa-light">{item.priceLabel}</p>}
        </div>
      </div>
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.stays'), to: '/stays' },
          { label: item.title },
        ]}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <RichText body={item.body} fallback={item.description} />
          <p className="mt-4 text-sm text-ink-soft">{t('pages.stayAvailability')}</p>
          <BulletList title={t('pages.amenities')} items={item.amenities} />
          <BulletList title={t('pages.inclusions')} items={item.inclusions} />
          <TextBlock title={t('pages.rooms')} text={item.rooms} />
          <TextBlock title={t('pages.enquiryNote')} text={item.enquiryNote} />
          {item.mapUrl && (
            <a
              href={item.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-bhagwa hover:underline"
            >
              {t('actions.openMap')}
            </a>
          )}
          {item.destination && (
            <p className="mt-4">
              <Link to={item.destination.to} className="text-bhagwa hover:underline">
                {item.destination.title}
              </Link>
            </p>
          )}
          <Gallery images={item.gallery} title={t('pages.gallery')} />
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-bhagwa/15 bg-sand/40 p-6">
            <p className="font-display text-xl text-ink">{t('booking.bookStay')}</p>
            <BookCTA type="stay" title={item.title} slug={item.slug} className="mt-5" compact />
            <Link to="/stays" className="mt-4 inline-block text-sm text-maroon hover:underline">
              ← {t('actions.allStays')}
            </Link>
          </div>
        </aside>
      </div>
      <StickyBookBar type="stay" title={item.title} slug={item.slug} />
    </article>
  );
}
