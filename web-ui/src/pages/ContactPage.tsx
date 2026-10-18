import { useState, type ReactNode, type SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHero } from '../components/PageHero';
import { QueryStatus } from '../components/QueryStatus';
import { Seo } from '../components/Seo';
import { images } from '../content/images';
import { useLocalizedFaqs, useLocalizedSite } from '../hooks/useLocalizedContent';
import { buildCallUrl, buildWhatsAppUrl } from '../lib/whatsapp';

export function ContactPage() {
  const { t } = useTranslation(['common', 'content']);
  const siteQuery = useLocalizedSite();
  const faqs = useLocalizedFaqs();
  const site = siteQuery.data;
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const interestOptions = [
    { value: 'tour', label: t('pages.interestTour') },
    { value: 'stay', label: t('pages.interestStay') },
    { value: 'pooja', label: t('pages.interestPooja') },
    { value: 'service', label: t('pages.interestService') },
    { value: 'custom', label: t('pages.interestCustom') },
  ];
  const selectedInterest = interest || interestOptions[0]?.value || 'tour';

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    const label =
      interestOptions.find((option) => option.value === selectedInterest)?.label ??
      selectedInterest;
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
      interest: label,
      extra: extras,
      brand: site?.brandName ?? t('site.brandName', { ns: 'content' }),
    });
    const pageUrl = window.location.href;
    const url = buildWhatsAppUrl(`${text}\n${pageUrl}`, site?.contact.whatsapp ?? '');
    if (!url) {
      setFormError(t('pages.enquiryUnavailable'));
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const call = site ? buildCallUrl(site.contact.phone) : null;
  const brand = site?.brandName ?? t('site.brandName', { ns: 'content' });

  return (
    <>
      <Seo
        title={`${t('contact.title', { ns: 'content' })} · ${brand}`}
        description={t('contact.subtitle', { ns: 'content' })}
        path="/contact"
        image={images.contactHero}
      />
      <PageHero
        eyebrow={t('pages.contactEyebrow')}
        title={t('contact.title', { ns: 'content' })}
        subtitle={t('contact.subtitle', { ns: 'content' })}
        image={images.contactHero}
        imageAlt=""
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-2xl text-ink">{t('pages.directLines')}</h2>
          <QueryStatus query={siteQuery}>
            <ul className="mt-6 space-y-4 text-sm">
              {site?.contact.phone && (
                <li>
                  <p className="text-xs tracking-wider text-bhagwa uppercase">
                    {t('pages.whatsappPhone')}
                  </p>
                  {call ? (
                    <a href={call} className="mt-1 block text-lg text-ink hover:text-bhagwa">
                      {site.contact.phone}
                    </a>
                  ) : (
                    <p className="mt-1 text-lg text-ink">{site.contact.phone}</p>
                  )}
                </li>
              )}
              {site?.contact.email && (
                <li>
                  <p className="text-xs tracking-wider text-bhagwa uppercase">{t('pages.email')}</p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="mt-1 block text-ink hover:text-bhagwa"
                  >
                    {site.contact.email}
                  </a>
                </li>
              )}
              {site?.contact.address && (
                <li>
                  <p className="text-xs tracking-wider text-bhagwa uppercase">
                    {t('pages.address')}
                  </p>
                  <p className="mt-1 text-ink-soft">{site.contact.address}</p>
                  {site.contact.mapUrl && (
                    <a
                      href={site.contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-bhagwa hover:underline"
                    >
                      {t('actions.openMap')}
                    </a>
                  )}
                </li>
              )}
            </ul>
          </QueryStatus>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-sm border border-bhagwa/15 bg-sand/30 p-6 sm:p-8"
        >
          <p className="text-sm text-ink-soft">{t('contact.formIntro', { ns: 'content' })}</p>
          <div className="mt-6 space-y-4">
            <Field label={t('pages.yourName')}>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                placeholder={t('pages.namePlaceholder')}
                autoComplete="name"
              />
            </Field>
            <Field label={t('pages.interest')}>
              <select
                value={selectedInterest}
                onChange={(event) => {
                  setInterest(event.target.value);
                }}
                className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
              >
                {interestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t('pages.preferredDates')}>
                <input
                  value={dates}
                  onChange={(event) => {
                    setDates(event.target.value);
                  }}
                  className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                  placeholder={t('pages.datesPlaceholder')}
                />
              </Field>
              <Field label={t('pages.guests')}>
                <input
                  value={guests}
                  onChange={(event) => {
                    setGuests(event.target.value);
                  }}
                  className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                  placeholder={t('pages.guestsPlaceholder')}
                />
              </Field>
            </div>
            <Field label={t('pages.message')}>
              <textarea
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                className="mt-1.5 min-h-28 w-full resize-y rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                placeholder={t('pages.messagePlaceholder')}
              />
            </Field>
          </div>
          {formError && (
            <p className="mt-4 text-sm text-maroon" role="alert">
              {formError}
            </p>
          )}
          <button
            type="submit"
            className="mt-6 w-full rounded-sm bg-bhagwa py-3 text-sm font-medium text-cream transition hover:bg-bhagwa-light"
          >
            {t('actions.continueWhatsApp')}
          </button>
          <p className="mt-3 text-xs text-ink-soft">{t('booking.notConfirmed')}</p>
        </form>
      </div>
      <QueryStatus query={faqs}>
        {faqs.data && faqs.data.length > 0 && (
          <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
            <h2 className="font-display text-3xl text-ink">{t('pages.faqTitle')}</h2>
            <div className="mt-6 space-y-3">
              {faqs.data.map((item) => (
                <details
                  key={item.id}
                  className="rounded-sm border border-bhagwa/15 bg-sand/30 p-4"
                >
                  <summary className="cursor-pointer font-medium text-ink">{item.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </QueryStatus>
    </>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-semibold tracking-wider text-maroon uppercase">
      {label}
      {children}
    </label>
  );
}
