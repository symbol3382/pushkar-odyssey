import { Link } from 'react-router-dom';
import { nav } from '../content/nav';
import { site } from '../content/site';
import { buildCallUrl, buildWhatsAppUrl } from '../lib/whatsapp';

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-bhagwa/15 bg-maroon-deep text-sand">
      <div className="mandala-bg absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-3xl text-cream">{site.brandName}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand/80">{site.tagline}</p>
          <p className="mt-4 text-sm text-sand/70">{site.contact.address}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {nav.footer.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-sand/85 transition hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">Reach us</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href={buildWhatsAppUrl(`Namaste! I found ${site.brandName} online and would like to plan a visit.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream underline-offset-4 hover:underline"
            >
              WhatsApp {site.contact.phone}
            </a>
            <a href={buildCallUrl()} className="hover:text-cream">
              Call {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="hover:text-cream">
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-cream/10 py-4 text-center text-xs text-sand/55">
        © {COPYRIGHT_YEAR} {site.brandName}. Placeholder content — update via src/content.
      </div>
    </footer>
  );
}
