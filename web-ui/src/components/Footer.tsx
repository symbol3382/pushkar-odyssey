import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { nav } from '../content/nav';
import { useLocalizedSite } from '../hooks/useLocalizedContent';
import { buildCallUrl, buildWhatsAppUrl } from '../lib/whatsapp';

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  const { t } = useTranslation(['common', 'content']);
  const siteQuery = useLocalizedSite();
  const site = siteQuery.data;
  const whatsapp = site
    ? buildWhatsAppUrl(
        t('site.footerWhatsApp', { ns: 'content', brand: site.brandName }),
        site.contact.whatsapp,
      )
    : null;
  const call = site ? buildCallUrl(site.contact.phone) : null;
  const socials = [
    site?.social.instagram ? { href: site.social.instagram, label: 'Instagram' } : null,
    site?.social.facebook ? { href: site.social.facebook, label: 'Facebook' } : null,
    site?.social.youtube ? { href: site.social.youtube, label: 'YouTube' } : null,
  ].filter((item) => item !== null);

  return (
    <footer className="relative mt-24 border-t border-bhagwa/15 bg-maroon-deep text-sand">
      <div className="mandala-bg absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-3xl text-cream">{site?.brandName}</p>
          {site?.tagline && (
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand/80">{site.tagline}</p>
          )}
          {site?.footerText && (
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand/70">{site.footerText}</p>
          )}
          {site?.contact.address && (
            <p className="mt-4 text-sm text-sand/70">{site.contact.address}</p>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {t('footer.explore')}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {nav.footer.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-sand/85 transition hover:text-cream">
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {t('footer.reachUs')}
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream underline-offset-4 hover:underline"
              >
                WhatsApp{site?.contact.phone ? ` ${site.contact.phone}` : ''}
              </a>
            )}
            {call && site?.contact.phone && (
              <a href={call} className="hover:text-cream">
                {t('actions.call')} {site.contact.phone}
              </a>
            )}
            {site?.contact.email && (
              <a href={`mailto:${site.contact.email}`} className="hover:text-cream">
                {site.contact.email}
              </a>
            )}
            {socials.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative border-t border-cream/10 py-4 text-center text-xs text-sand/55">
        {t('footer.copyright', { year: COPYRIGHT_YEAR, brand: site?.brandName ?? '' })}
      </div>
    </footer>
  );
}
