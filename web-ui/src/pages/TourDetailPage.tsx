import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { StickyBookBar } from '../components/StickyBookBar';
import { useLocalizedTour } from '../hooks/useLocalizedContent';

export function TourDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation('common');
  const tour = useLocalizedTour(slug);

  if (!tour) {
    return (
      <div className="mx-auto max-w-lg px-4 py-32 text-center">
        <h1 className="font-display text-3xl text-ink">{t('pages.notFoundTour')}</h1>
        <Link to="/" className="mt-4 inline-block text-bhagwa hover:underline">
          {t('actions.backHome')}
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-24 lg:pb-0">
      <div className="relative h-[50vh] min-h-80 overflow-hidden pt-16">
        <img src={tour.image} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-ink/40 to-ink/50" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{tour.duration}</p>
          <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{tour.title}</h1>
          <p className="mt-2 text-lg text-bhagwa-light">{tour.priceLabel}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <p className="text-lg leading-relaxed text-ink-soft">{tour.description}</p>

          <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.itinerary')}</h2>
          <ol className="mt-4 space-y-4">
            {tour.itinerary.map((step) => (
              <li key={step.day} className="border-l-2 border-bhagwa/40 pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-bhagwa">{step.day}</p>
                <p className="font-medium text-ink">{step.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{step.details}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.inclusions')}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {tour.inclusions.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink-soft">
                <span className="text-bhagwa" aria-hidden>
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>

          {tour.gallery.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.gallery')}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {tour.gallery.map((src) => (
                  <img key={src} src={src} alt="" className="aspect-video w-full rounded-sm object-cover" loading="lazy" />
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-bhagwa/15 bg-sand/40 p-6">
            <p className="font-display text-xl text-ink">{t('booking.bookTour')}</p>
            <p className="mt-2 text-sm text-ink-soft">{t('booking.tourHint')}</p>
            <BookCTA type="tour" title={tour.title} slug={tour.slug} className="mt-5" compact />
            <Link to="/tours" className="mt-4 inline-block text-sm text-maroon hover:underline">
              ← {t('actions.allTours')}
            </Link>
          </div>
        </aside>
      </div>
      <StickyBookBar type="tour" title={tour.title} slug={tour.slug} />
    </article>
  );
}
