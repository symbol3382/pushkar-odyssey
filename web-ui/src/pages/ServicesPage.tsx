import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookCTA } from '../components/BookCTA';
import { PageHero } from '../components/PageHero';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { Seo } from '../components/Seo';
import { useLocalizedServices, useLocalizedSite } from '../hooks/useLocalizedContent';

export function ServicesPage() {
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();
  const services = useLocalizedServices();
  const items = services.data ?? [];
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  return (
    <>
      <Seo
        title={`${t('pages.servicesTitle')} · ${brand}`}
        description={t('pages.servicesSubtitle')}
        path="/services"
        image={items[0]?.image}
      />
      <PageHero
        eyebrow={t('pages.servicesEyebrow')}
        title={t('pages.servicesTitle')}
        subtitle={t('pages.servicesSubtitle')}
        image={items[0]?.image}
        imageAlt={items[0]?.imageAlt}
      />
      <QueryStatus query={services}>
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <EmptyCatalog message={t('pages.emptyServices')} />
          ) : (
            items.map((service, i) => (
              <motion.article
                key={service.slug}
                id={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="grid gap-6 overflow-hidden rounded-sm border border-bhagwa/10 bg-cream/60 lg:grid-cols-2"
              >
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    srcSet={service.imageSrcSet}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-[16/11] w-full object-cover lg:aspect-auto lg:min-h-72"
                  />
                )}
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <h2 className="font-display text-3xl text-ink">
                    <Link to={service.to} className="hover:text-bhagwa">
                      {service.title}
                    </Link>
                  </h2>
                  {service.priceLabel && (
                    <p className="mt-2 text-sm font-medium text-bhagwa">{service.priceLabel}</p>
                  )}
                  <p className="mt-3 text-ink-soft">{service.description}</p>
                  {service.inclusions.length > 0 && (
                    <ul className="mt-4 space-y-1">
                      {service.inclusions.map((item) => (
                        <li key={item} className="text-sm text-ink-soft">
                          · {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to={service.to}
                    className="mt-4 text-sm font-medium text-maroon hover:underline"
                  >
                    {t('actions.viewDetails')}
                  </Link>
                  <BookCTA
                    type="service"
                    title={service.title}
                    slug={service.slug}
                    className="mt-6"
                    compact
                  />
                </div>
              </motion.article>
            ))
          )}
          <p className="text-center text-sm text-ink-soft">
            {t('actions.needPackageMix')}{' '}
            <Link to="/contact" className="text-bhagwa hover:underline">
              {t('actions.messageUs')}
            </Link>
          </p>
        </div>
      </QueryStatus>
    </>
  );
}
