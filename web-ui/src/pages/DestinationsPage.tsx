import { useTranslation } from 'react-i18next';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { useLocalizedDestinations, useLocalizedSite } from '../hooks/useLocalizedContent';

export function DestinationsPage() {
  const { t } = useTranslation('common');
  const site = useLocalizedSite();
  const destinations = useLocalizedDestinations();
  const items = destinations.data ?? [];
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  return (
    <>
      <Seo
        title={`${t('pages.destinationsTitle')} · ${brand}`}
        description={t('pages.destinationsSubtitle')}
        path="/destinations"
        image={items[0]?.image}
      />
      <PageHero
        eyebrow={t('pages.destinationsEyebrow')}
        title={t('pages.destinationsTitle')}
        subtitle={t('pages.destinationsSubtitle')}
        image={items[0]?.image}
        imageAlt={items[0]?.imageAlt}
      />
      <QueryStatus query={destinations}>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <EmptyCatalog message={t('pages.emptyDestinations')} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((destination, i) => (
                <PackageCard
                  key={destination.slug}
                  to={destination.to}
                  title={destination.title}
                  summary={destination.summary}
                  image={destination.image}
                  imageAlt={destination.imageAlt}
                  imageSrcSet={destination.imageSrcSet}
                  priceLabel={destination.priceLabel}
                  meta={destination.meta}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </QueryStatus>
    </>
  );
}
