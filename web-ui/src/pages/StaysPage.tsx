import { useTranslation } from 'react-i18next';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { useLocalizedSite, useLocalizedStays } from '../hooks/useLocalizedContent';

export function StaysPage() {
  const { t } = useTranslation('common');
  const site = useLocalizedSite();
  const stays = useLocalizedStays();
  const items = stays.data ?? [];
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  return (
    <>
      <Seo
        title={`${t('pages.staysTitle')} · ${brand}`}
        description={t('pages.staysSubtitle')}
        path="/stays"
        image={items[0]?.image}
      />
      <PageHero
        eyebrow={t('pages.staysEyebrow')}
        title={t('pages.staysTitle')}
        subtitle={t('pages.staysSubtitle')}
        image={items[0]?.image}
        imageAlt={items[0]?.imageAlt}
      />
      <QueryStatus query={stays}>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <EmptyCatalog message={t('pages.emptyStays')} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {items.map((stay, i) => (
                <PackageCard
                  key={stay.slug}
                  to={stay.to}
                  title={stay.title}
                  summary={stay.summary}
                  image={stay.image}
                  imageAlt={stay.imageAlt}
                  imageSrcSet={stay.imageSrcSet}
                  priceLabel={stay.priceLabel}
                  meta={stay.meta}
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
