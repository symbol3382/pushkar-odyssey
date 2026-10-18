import { useTranslation } from 'react-i18next';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { useLocalizedPoojas, useLocalizedSite } from '../hooks/useLocalizedContent';

export function PoojasPage() {
  const { t } = useTranslation('common');
  const site = useLocalizedSite();
  const poojas = useLocalizedPoojas();
  const items = poojas.data ?? [];
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  return (
    <>
      <Seo
        title={`${t('pages.poojasTitle')} · ${brand}`}
        description={t('pages.poojasSubtitle')}
        path="/poojas"
        image={items[0]?.image}
      />
      <PageHero
        eyebrow={t('pages.poojasEyebrow')}
        title={t('pages.poojasTitle')}
        subtitle={t('pages.poojasSubtitle')}
        image={items[0]?.image}
        imageAlt={items[0]?.imageAlt}
      />
      <QueryStatus query={poojas}>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <EmptyCatalog message={t('pages.emptyPoojas')} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((pooja, i) => (
                <PackageCard
                  key={pooja.slug}
                  to={pooja.to}
                  title={pooja.title}
                  summary={pooja.summary}
                  image={pooja.image}
                  imageAlt={pooja.imageAlt}
                  imageSrcSet={pooja.imageSrcSet}
                  priceLabel={pooja.priceLabel}
                  meta={pooja.meta}
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
