import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MissingContent, QueryStatus } from '../components/QueryStatus';
import { RichText } from '../components/RichText';
import { Seo } from '../components/Seo';
import { StickyBookBar } from '../components/StickyBookBar';
import { useLocalizedPooja, useLocalizedSite } from '../hooks/useLocalizedContent';
import { pageJsonLd } from '../lib/structuredData';
import { BulletList, Gallery, TextBlock } from '../components/DetailBits';

export function PoojaDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();
  const pooja = useLocalizedPooja(slug);
  const item = pooja.data;
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  if (pooja.status !== 'ready' || !item) {
    return (
      <QueryStatus query={pooja}>
        <MissingContent
          title={t('pages.notFoundPooja')}
          to="/poojas"
          action={t('actions.allPoojas')}
        />
      </QueryStatus>
    );
  }

  const title = item.seoTitle ?? `${item.title} · ${brand}`;
  const description = item.seoDescription ?? item.summary;

  return (
    <article className="pb-24 lg:pb-0">
      <Seo
        title={title}
        description={description}
        path={`/poojas/${item.slug}`}
        image={item.seoImage ?? item.image}
        jsonLd={
          pooja.source === 'sanity'
            ? pageJsonLd('Service', item.title, description, `/poojas/${item.slug}`)
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
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-ink/50 to-ink/50" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          {item.timing && (
            <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{item.timing}</p>
          )}
          <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{item.title}</h1>
          {item.priceLabel && <p className="mt-2 text-lg text-bhagwa-light">{item.priceLabel}</p>}
        </div>
      </div>
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.poojas'), to: '/poojas' },
          { label: item.title },
        ]}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <RichText body={item.body} fallback={item.description} />
          {item.suitableFor.length > 0 && (
            <TextBlock title={t('pages.suitableFor')} text={item.suitableFor.join(' · ')} />
          )}
          <BulletList title={t('pages.inclusions')} items={item.inclusions} />
          <BulletList title={t('pages.exclusions')} items={item.exclusions} />
          <TextBlock title={t('pages.preparation')} text={item.preparation} />
          <TextBlock title={t('pages.enquiryNote')} text={item.enquiryNote} />
          {item.languages.length > 0 && (
            <TextBlock title={t('pages.languages')} text={item.languages.join(' · ')} />
          )}
          {item.destination && (
            <p className="mt-8 text-sm text-ink-soft">
              <Link to={item.destination.to} className="text-bhagwa hover:underline">
                {item.destination.title}
              </Link>
            </p>
          )}
          <Gallery images={item.gallery} title={t('pages.gallery')} />
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-bhagwa/15 bg-sand/40 p-6">
            <p className="font-display text-xl text-ink">{t('booking.bookPooja')}</p>
            <p className="mt-2 text-sm text-ink-soft">{t('booking.poojaHint')}</p>
            <BookCTA type="pooja" title={item.title} slug={item.slug} className="mt-5" compact />
            <Link to="/poojas" className="mt-4 inline-block text-sm text-maroon hover:underline">
              ← {t('actions.allPoojas')}
            </Link>
          </div>
        </aside>
      </div>
      <StickyBookBar type="pooja" title={item.title} slug={item.slug} />
    </article>
  );
}
