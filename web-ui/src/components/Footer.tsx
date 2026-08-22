import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { nav } from '../content/nav';
import { site as siteMeta } from '../content/site';
import { useLocalizedSite } from '../hooks/useLocalizedContent';
import { buildCallUrl, buildWhatsAppUrl } from '../lib/whatsapp';

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();

  return (
    <footer className="relative mt-24 border-t border-bhagwa/15 bg-maroon-deep text-sand">
      <div className="mandala-bg absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-3xl text-cream">{site.brandName}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand/80">{site.tagline}</p>
          <p className="mt-4 text-sm text-sand/70">{site.address}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">{t('footer.explore')}</p>
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">{t('footer.reachUs')}</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href={buildWhatsAppUrl(
                t('site.footerWhatsApp', { ns: 'content', brand: site.brandName }),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream underline-offset-4 hover:underline"
            >
              WhatsApp {siteMeta.contact.phone}
            </a>
            <a href={buildCallUrl()} className="hover:text-cream">
              {t('actions.call')} {siteMeta.contact.phone}
            </a>
            <a href={`mailto:${siteMeta.contact.email}`} className="hover:text-cream">
              {siteMeta.contact.email}
            </a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-cream/10 py-4 text-center text-xs text-sand/55">
        {t('footer.copyright', { year: COPYRIGHT_YEAR, brand: site.brandName })}
      </div>
    </footer>
  );
}
