import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { stays } from '../content/stays';

export function StaysPage() {
  return (
    <>
      <PageHero
        eyebrow="Rest"
        title="Stays with courtyard calm"
        subtitle="Havelis and desert camps chosen for atmosphere, hospitality, and proximity to the sacred."
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
