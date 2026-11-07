import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { catalogById, type CatalogId } from '../content/catalogs';
import type { CardView } from '../content/views';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { useLocalizedCatalog, useLocalizedSite } from '../hooks/useLocalizedContent';

export function CatalogPage({ catalogId }: { catalogId: CatalogId }) {
  const { t } = useTranslation('common');
  const catalog = catalogById(catalogId);
  const site = useLocalizedSite();
  const listing = useLocalizedCatalog(catalogId);
  const items = listing.data ?? [];
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });
  const groups = productGroups(catalogId, items);

  return (
    <>
      <Seo
        title={`${t(catalog.copy.title)} · ${brand}`}
        description={t(catalog.copy.subtitle)}
        path={catalog.path}
        image={items[0]?.image}
      />
      <PageHero
        eyebrow={t(catalog.copy.eyebrow)}
        title={t(catalog.copy.title)}
        subtitle={t(catalog.copy.subtitle)}
        image={items[0]?.image}
        imageAlt={items[0]?.imageAlt}
      />
      <QueryStatus query={listing}>
        <div className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <EmptyCatalog message={t(catalog.copy.empty)} />
          ) : (
            <div className="space-y-12">
              {groups.map((group) => (
                <section key={group.key}>
                  {group.label && (
                    <h2 className="font-display text-2xl text-ink">{t(group.label)}</h2>
                  )}
                  <div
                    className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${group.label ? 'mt-6' : ''}`}
                  >
                    {group.items.map((item, index) => (
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

function productGroups(catalogId: CatalogId, items: CardView[]) {
  if (catalogId !== 'product') return [{ key: 'all', label: '', items }];
  const local = items.filter((item) => item.groupKey === 'local');
  const boho = items.filter((item) => item.groupKey === 'boho');
  const other = items.filter((item) => item.groupKey !== 'local' && item.groupKey !== 'boho');
  const groups = [
    { key: 'local', label: 'catalog.productCatalog.local', items: local },
    { key: 'boho', label: 'catalog.productCatalog.boho', items: boho },
    { key: 'other', label: '', items: other },
  ].filter((group) => group.items.length > 0);
  if (groups.length <= 1) return [{ key: 'all', label: '', items }];
  return groups;
}
