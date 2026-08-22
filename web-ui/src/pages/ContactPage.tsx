import { useState, type ReactNode, type SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHero } from '../components/PageHero';
import { images } from '../content/images';
import { site as siteMeta } from '../content/site';
import { useLocalizedSite } from '../hooks/useLocalizedContent';
import { buildCallUrl, buildWhatsAppUrl } from '../lib/whatsapp';

export function ContactPage() {
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('Tour');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');

  const interestOptions = [
    { value: 'Tour', label: t('pages.interestTour') },
    { value: 'Stay', label: t('pages.interestStay') },
    { value: 'Pooja / Aarti', label: t('pages.interestPooja') },
    { value: 'Service', label: t('pages.interestService') },
    { value: 'Custom package', label: t('pages.interestCustom') },
  ];

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const extras = [
      dates ? `${t('pages.preferredDates')}: ${dates}` : null,
      guests ? `${t('pages.guests')}: ${guests}` : null,
      message ? `${t('pages.message')}: ${message}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const text = t('site.contactWhatsApp', {
      ns: 'content',
      name: name || '—',
      interest,
      extra: extras,
      brand: site.brandName,
    });

    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <PageHero
        eyebrow={t('pages.contactEyebrow')}
        title={t('contact.title', { ns: 'content' })}
        subtitle={t('contact.subtitle', { ns: 'content' })}
        image={images.contactHero}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-2xl text-ink">{t('pages.directLines')}</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <p className="text-xs uppercase tracking-wider text-bhagwa">{t('pages.whatsappPhone')}</p>
              <a href={buildCallUrl()} className="mt-1 block text-lg text-ink hover:text-bhagwa">
                {siteMeta.contact.phone}
              </a>
            </li>
            <li>
              <p className="text-xs uppercase tracking-wider text-bhagwa">{t('pages.email')}</p>
              <a href={`mailto:${siteMeta.contact.email}`} className="mt-1 block text-ink hover:text-bhagwa">
                {siteMeta.contact.email}
              </a>
            </li>
            <li>
              <p className="text-xs uppercase tracking-wider text-bhagwa">{t('pages.address')}</p>
              <p className="mt-1 text-ink-soft">{site.address}</p>
              <a
                href={siteMeta.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-bhagwa hover:underline"
              >
                {t('actions.openMap')}
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="rounded-sm border border-bhagwa/15 bg-sand/30 p-6 sm:p-8">
          <p className="text-sm text-ink-soft">{t('contact.formIntro', { ns: 'content' })}</p>
          <div className="mt-6 space-y-4">
            <Field label={t('pages.yourName')}>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                placeholder={t('pages.namePlaceholder')}
                autoComplete="name"
              />
            </Field>
            <Field label={t('pages.interest')}>
              <select
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                }}
                className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
              >
                {interestOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t('pages.preferredDates')}>
                <input
                  value={dates}
                  onChange={(e) => {
                    setDates(e.target.value);
                  }}
                  className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                  placeholder={t('pages.datesPlaceholder')}
                />
              </Field>
              <Field label={t('pages.guests')}>
                <input
                  value={guests}
                  onChange={(e) => {
                    setGuests(e.target.value);
                  }}
                  className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                  placeholder={t('pages.guestsPlaceholder')}
                />
              </Field>
            </div>
            <Field label={t('pages.message')}>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="mt-1.5 min-h-28 w-full resize-y rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                placeholder={t('pages.messagePlaceholder')}
              />
            </Field>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-sm bg-bhagwa py-3 text-sm font-medium text-cream transition hover:bg-bhagwa-light"
          >
            {t('actions.continueWhatsApp')}
          </button>
        </form>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wider text-maroon">
      {label}
      {children}
    </label>
  );
}
