import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { catalogById, type CatalogId } from '../content/catalogs';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import {
  useLocalizedCatalog,
  useLocalizedCategoryPage,
  useLocalizedSite,
} from '../hooks/useLocalizedContent';

export function CatalogPage({ catalogId }: { catalogId: CatalogId }) {
  const { t } = useTranslation('common');
  const catalog = catalogById(catalogId);
  const site = useLocalizedSite();
  const listing = useLocalizedCatalog(catalogId);
  const items = listing.data ?? [];
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });
  const title = t(catalog.copy.title);
  const subtitle = t(catalog.copy.subtitle);
  const categoryPage = useLocalizedCategoryPage(catalogId, title);
  const heroImage =
    categoryPage.data?.image && categoryPage.data.image.length > 0
      ? categoryPage.data.image
      : items[0]?.image;
  const heroImageAlt =
    categoryPage.data?.imageAlt && categoryPage.data.imageAlt.length > 0
      ? categoryPage.data.imageAlt
      : items[0]?.imageAlt && items[0].imageAlt.length > 0
        ? items[0].imageAlt
        : title;

  return (
    <>
      <Seo
        title={`${title} · ${brand}`}
        description={subtitle}
        path={catalog.path}
        image={heroImage}
      />
      <PageHero
        eyebrow={t(catalog.copy.eyebrow)}
        title={title}
        subtitle={subtitle}
        image={heroImage}
        imageAlt={heroImageAlt}
      />
      <QueryStatus query={listing}>
        <div className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <EmptyCatalog message={t(catalog.copy.empty)} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
