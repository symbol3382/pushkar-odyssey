import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHero } from '../components/PageHero';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { Seo } from '../components/Seo';
import { useLocalizedSite, useLocalizedWorks } from '../hooks/useLocalizedContent';

export function WorksPage() {
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();
  const works = useLocalizedWorks();
  const items = works.data ?? [];
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  return (
    <>
      <Seo
        title={`${t('works.pageTitle')} · ${brand}`}
        description={t('works.pageSubtitle')}
        path="/works"
        image={items[0]?.image}
      />
      <PageHero
        eyebrow={t('works.pageEyebrow')}
        title={t('works.pageTitle')}
        subtitle={t('works.pageSubtitle')}
        image={items[0]?.image}
        imageAlt={items[0]?.imageAlt}
      />
      <QueryStatus query={works}>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <EmptyCatalog message={t('pages.emptyWorks')} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="group overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        srcSet={item.imageSrcSet}
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="size-full object-cover transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
                    {item.category && (
                      <span className="absolute top-3 left-3 rounded-sm bg-cream/90 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-maroon uppercase">
                        {item.category}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      {item.date && <p className="text-xs text-sand/70">{item.date}</p>}
                      <h2 className="font-display text-2xl text-cream">{item.title}</h2>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-ink-soft">{item.description}</p>
                </motion.article>
              ))}
            </div>
          )}
          <p className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex rounded-sm bg-bhagwa px-6 py-3 text-sm font-medium text-cream hover:bg-bhagwa-light"
            >
              {t('actions.planVisit')}
            </Link>
          </p>
        </div>
      </QueryStatus>
    </>
  );
}
