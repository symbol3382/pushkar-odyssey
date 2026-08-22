import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { StickyBookBar } from '../components/StickyBookBar';
import { useLocalizedStay } from '../hooks/useLocalizedContent';

export function StayDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation('common');
  const stay = useLocalizedStay(slug);

  if (!stay) {
    return (
      <div className="mx-auto max-w-lg px-4 py-32 text-center">
        <h1 className="font-display text-3xl text-ink">{t('pages.notFoundStay')}</h1>
        <Link to="/stays" className="mt-4 inline-block text-bhagwa hover:underline">
          {t('actions.allStays')}
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-24 lg:pb-0">
      <div className="relative h-[50vh] min-h-80 overflow-hidden pt-16">
        <img src={stay.image} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-ink/40 to-ink/50" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{stay.location}</p>
          <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{stay.title}</h1>
          <p className="mt-2 text-lg text-bhagwa-light">{stay.priceLabel}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <p className="text-lg leading-relaxed text-ink-soft">{stay.description}</p>
          <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.amenities')}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {stay.amenities.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink-soft">
                <span className="text-bhagwa" aria-hidden>
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.inclusions')}</h2>
          <ul className="mt-3 space-y-2">
            {stay.inclusions.map((item) => (
              <li key={item} className="text-sm text-ink-soft">
                · {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-bhagwa/15 bg-sand/40 p-6">
            <p className="font-display text-xl text-ink">{t('booking.bookStay')}</p>
            <BookCTA type="stay" title={stay.title} slug={stay.slug} className="mt-5" compact />
            <Link to="/stays" className="mt-4 inline-block text-sm text-maroon hover:underline">
              ← {t('actions.allStays')}
            </Link>
          </div>
        </aside>
      </div>
      <StickyBookBar type="stay" title={stay.title} slug={stay.slug} />
    </article>
  );
}
