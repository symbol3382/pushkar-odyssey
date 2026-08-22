import { useTranslation } from 'react-i18next';
import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { useLocalizedStays } from '../hooks/useLocalizedContent';

export function StaysPage() {
  const { t } = useTranslation('common');
  const stays = useLocalizedStays();

  return (
    <>
      <PageHero
        eyebrow={t('pages.staysEyebrow')}
        title={t('pages.staysTitle')}
        subtitle={t('pages.staysSubtitle')}
        image={stays[0]?.image}
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {stays.map((stay, i) => (
            <PackageCard
              key={stay.slug}
              to={`/stays/${stay.slug}`}
              title={stay.title}
              summary={stay.summary}
              image={stay.image}
              priceLabel={stay.priceLabel}
              meta={stay.location}
              index={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}
