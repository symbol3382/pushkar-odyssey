import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { useLocalizedSite, useLocalizedTours } from '../hooks/useLocalizedContent';

export function ToursPage() {
  const { t } = useTranslation('common');
  const site = useLocalizedSite();
  const tours = useLocalizedTours();
  const items = tours.data ?? [];
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  return (
    <>
      <Seo
        title={`${t('pages.toursTitle')} · ${brand}`}
        description={t('pages.toursSubtitle')}
        path="/tours"
        image={items[0]?.image}
      />
      <PageHero
        eyebrow={t('pages.toursEyebrow')}
        title={t('pages.toursTitle')}
        subtitle={t('pages.toursSubtitle')}
        image={items[0]?.image}
        imageAlt={items[0]?.imageAlt}
      />
      <QueryStatus query={tours}>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <EmptyCatalog message={t('pages.emptyTours')} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((tour, i) => (
                <PackageCard
                  key={tour.slug}
                  to={tour.to}
                  title={tour.title}
                  summary={tour.summary}
                  image={tour.image}
                  imageAlt={tour.imageAlt}
                  imageSrcSet={tour.imageSrcSet}
                  priceLabel={tour.priceLabel}
                  meta={tour.meta}
                  index={i}
                />
              ))}
            </div>
          )}
          <p className="mt-10 text-center text-sm text-ink-soft">
            {t('actions.lookingCustom')}{' '}
            <Link to="/contact" className="font-medium text-bhagwa hover:underline">
              {t('actions.messageUs')}
            </Link>
          </p>
        </div>
      </QueryStatus>
    </>
  );
}
