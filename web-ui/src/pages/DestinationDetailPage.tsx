import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PackageCard } from '../components/PackageCard';
import { MissingContent, QueryStatus } from '../components/QueryStatus';
import { RichText } from '../components/RichText';
import { Seo } from '../components/Seo';
import { useLocalizedDestination, useLocalizedSite } from '../hooks/useLocalizedContent';
import { pageJsonLd } from '../lib/structuredData';
import { Gallery, TextBlock } from '../components/DetailBits';
import type { CardView } from '../content/views';

export function DestinationDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();
  const destination = useLocalizedDestination(slug);
  const item = destination.data;
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  if (destination.status !== 'ready' || !item) {
    return (
      <QueryStatus query={destination}>
        <MissingContent
          title={t('pages.notFoundDestination')}
          to="/destinations"
          action={t('actions.allDestinations')}
        />
      </QueryStatus>
    );
  }

  const title = item.seoTitle ?? `${item.title} · ${brand}`;
  const description = item.seoDescription ?? item.summary;

  return (
    <article className="pb-24">
      <Seo
        title={title}
        description={description}
        path={`/destinations/${item.slug}`}
        image={item.seoImage ?? item.image}
        jsonLd={
          destination.source === 'sanity'
            ? pageJsonLd('TouristAttraction', item.title, description, `/destinations/${item.slug}`)
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
          {item.region && (
            <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{item.region}</p>
          )}
          <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{item.title}</h1>
        </div>
      </div>
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.destinations'), to: '/destinations' },
          { label: item.title },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <RichText body={item.body} fallback={item.description} />
        <TextBlock title={t('pages.visiting')} text={item.visiting} />
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
        <Related title={t('nav.poojas')} items={item.relatedPoojas} />
        <Related title={t('nav.tours')} items={item.relatedTours} />
        <Related title={t('nav.services')} items={item.relatedExperiences} />
        <Gallery images={item.gallery} title={t('pages.gallery')} />
        <BookCTA type="destination" title={item.title} slug={item.slug} className="mt-10" />
        <Link to="/destinations" className="mt-4 inline-block text-sm text-maroon hover:underline">
          ← {t('actions.allDestinations')}
        </Link>
      </div>
    </article>
  );
}

function Related({ title, items }: { title: string; items: CardView[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
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
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
