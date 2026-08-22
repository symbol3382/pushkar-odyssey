import { useState, type ReactNode, type SyntheticEvent } from 'react';
import { PageHero } from '../components/PageHero';
import { contact } from '../content/contact';
import { site } from '../content/site';
import { buildCallUrl, buildWhatsAppUrl } from '../lib/whatsapp';

export function ContactPage() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('Tour');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = [
      `Namaste! I am ${name || 'a guest'}.`,
      `Interest: ${interest}`,
      dates ? `Preferred dates: ${dates}` : null,
      guests ? `Guests: ${guests}` : null,
      message ? `Message: ${message}` : null,
      '',
      `Sent from the ${site.brandName} website.`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <PageHero
        eyebrow="Connect"
        title={contact.title}
        subtitle={contact.subtitle}
        image="https://images.unsplash.com/photo-1596178065887-1198b6142102?auto=format&fit=crop&w=1800&q=80"
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-2xl text-ink">Direct lines</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <p className="text-xs uppercase tracking-wider text-bhagwa">WhatsApp / Phone</p>
              <a href={buildCallUrl()} className="mt-1 block text-lg text-ink hover:text-bhagwa">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <p className="text-xs uppercase tracking-wider text-bhagwa">Email</p>
              <a href={`mailto:${site.contact.email}`} className="mt-1 block text-ink hover:text-bhagwa">
                {site.contact.email}
              </a>
            </li>
            <li>
              <p className="text-xs uppercase tracking-wider text-bhagwa">Address</p>
              <p className="mt-1 text-ink-soft">{site.contact.address}</p>
              <a
                href={site.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-bhagwa hover:underline"
              >
                Open map
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="rounded-sm border border-bhagwa/15 bg-sand/30 p-6 sm:p-8">
          <p className="text-sm text-ink-soft">{contact.formIntro}</p>
          <div className="mt-6 space-y-4">
            <Field label="Your name">
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                placeholder="Full name"
                autoComplete="name"
              />
            </Field>
            <Field label="Interest">
              <select
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                }}
                className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
              >
                <option>Tour</option>
                <option>Stay</option>
                <option>Pooja / Aarti</option>
                <option>Service</option>
                <option>Custom package</option>
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preferred dates">
                <input
                  value={dates}
                  onChange={(e) => {
                    setDates(e.target.value);
                  }}
                  className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                  placeholder="e.g. 12–14 Oct"
                />
              </Field>
              <Field label="Guests">
                <input
                  value={guests}
                  onChange={(e) => {
                    setGuests(e.target.value);
                  }}
                  className="mt-1.5 w-full rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                  placeholder="e.g. 4 adults"
                />
              </Field>
            </div>
            <Field label="Message">
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="mt-1.5 min-h-28 w-full resize-y rounded-sm border border-bhagwa/25 bg-cream px-3 py-2.5 text-sm text-ink focus-visible:outline-bhagwa"
                placeholder="Anything we should know…"
              />
            </Field>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-sm bg-bhagwa py-3 text-sm font-medium text-cream transition hover:bg-bhagwa-light"
          >
            Continue on WhatsApp
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
