import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero } from '../components/PageHero';
import { MissingContent, QueryStatus } from '../components/QueryStatus';
import { RichText } from '../components/RichText';
import { Seo } from '../components/Seo';
import { useLocalizedPage, useLocalizedSite } from '../hooks/useLocalizedContent';

export function GeneralPage() {
  const { slug } = useParams();
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();
  const page = useLocalizedPage(slug);
  const item = page.data;
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  if (page.status !== 'ready' || !item) {
    return (
      <QueryStatus query={page}>
        <MissingContent title={t('pages.notFoundPage')} to="/" action={t('actions.backHome')} />
      </QueryStatus>
    );
  }

  return (
    <>
      <Seo
        title={item.seoTitle ?? `${item.title} · ${brand}`}
        description={item.seoDescription ?? item.summary}
        path={`/pages/${item.slug}`}
        image={item.seoImage ?? item.image}
      />
      <PageHero
        title={item.title}
        subtitle={item.summary}
        image={item.image || undefined}
        imageAlt={item.imageAlt}
      />
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: item.title }]} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <RichText body={item.body} fallback={item.summary} />
      </div>
    </>
  );
}
