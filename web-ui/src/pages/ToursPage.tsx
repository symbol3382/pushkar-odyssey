import { Link } from 'react-router-dom';
import { PackageCard } from '../components/PackageCard';
import { PageHero } from '../components/PageHero';
import { tours } from '../content/tours';

export function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Journeys"
        title="Tours in & around Pushkar"
        subtitle="Temple circuits, desert evenings, and seasonal fair immersions — paced for wonder."
        image={tours[0]?.image}
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <PackageCard
              key={tour.slug}
              to={`/tours/${tour.slug}`}
              title={tour.title}
              summary={tour.summary}
              image={tour.image}
              priceLabel={tour.priceLabel}
              meta={tour.duration}
              index={i}
            />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-ink-soft">
          Looking for something custom?{' '}
          <Link to="/contact" className="font-medium text-bhagwa hover:underline">
            Message us
          </Link>
        </p>
      </div>
    </>
  );
}
