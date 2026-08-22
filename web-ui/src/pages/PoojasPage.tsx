import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { poojas } from '../content/poojas';

export function PoojasPage() {
  return (
    <>
      <PageHero
        eyebrow="Rituals"
        title="Poojas & aarti"
        subtitle="Priest-coordinated rituals on the ghats and at Brahma Temple — serene, clear, WhatsApp-booked."
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
