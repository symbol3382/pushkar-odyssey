import { useTranslation } from 'react-i18next';
import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { useLocalizedPoojas } from '../hooks/useLocalizedContent';

export function PoojasPage() {
  const { t } = useTranslation('common');
  const poojas = useLocalizedPoojas();

  return (
    <>
      <PageHero
        eyebrow={t('pages.poojasEyebrow')}
        title={t('pages.poojasTitle')}
        subtitle={t('pages.poojasSubtitle')}
        image={poojas[0]?.image}
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {poojas.map((pooja, i) => (
            <PackageCard
              key={pooja.slug}
              to={`/poojas/${pooja.slug}`}
              title={pooja.title}
              summary={pooja.summary}
              image={pooja.image}
              priceLabel={pooja.priceLabel}
              meta={pooja.timing}
              index={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}
