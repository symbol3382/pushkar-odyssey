import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { StickyBookBar } from '../components/StickyBookBar';
import { useLocalizedPooja } from '../hooks/useLocalizedContent';

export function PoojaDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation('common');
  const pooja = useLocalizedPooja(slug);

  if (!pooja) {
    return (
      <div className="mx-auto max-w-lg px-4 py-32 text-center">
        <h1 className="font-display text-3xl text-ink">{t('pages.notFoundPooja')}</h1>
        <Link to="/poojas" className="mt-4 inline-block text-bhagwa hover:underline">
          {t('actions.allPoojas')}
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-24 lg:pb-0">
      <div className="relative h-[50vh] min-h-80 overflow-hidden pt-16">
        <img src={pooja.image} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-ink/50 to-ink/50" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{pooja.timing}</p>
          <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{pooja.title}</h1>
          <p className="mt-2 text-lg text-bhagwa-light">{pooja.priceLabel}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <p className="text-lg leading-relaxed text-ink-soft">{pooja.description}</p>
          <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.suitableFor')}</h2>
          <p className="mt-2 text-sm text-ink-soft">{pooja.suitableFor.join(' · ')}</p>
          <h2 className="mt-10 font-display text-2xl text-ink">{t('pages.inclusions')}</h2>
          <ul className="mt-3 space-y-2">
            {pooja.inclusions.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink-soft">
                <span className="text-bhagwa" aria-hidden>
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-bhagwa/15 bg-sand/40 p-6">
            <p className="font-display text-xl text-ink">{t('booking.bookPooja')}</p>
            <p className="mt-2 text-sm text-ink-soft">{t('booking.poojaHint')}</p>
            <BookCTA type="pooja" title={pooja.title} slug={pooja.slug} className="mt-5" compact />
            <Link to="/poojas" className="mt-4 inline-block text-sm text-maroon hover:underline">
              ← {t('actions.allPoojas')}
            </Link>
          </div>
        </aside>
      </div>
      <StickyBookBar type="pooja" title={pooja.title} slug={pooja.slug} />
    </article>
  );
}
