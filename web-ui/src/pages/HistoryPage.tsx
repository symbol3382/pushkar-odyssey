import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageHero } from '../components/PageHero';
import { EmptyCatalog, QueryStatus } from '../components/QueryStatus';
import { Seo } from '../components/Seo';
import { useLocalizedHistory, useLocalizedSite } from '../hooks/useLocalizedContent';

export function HistoryPage() {
  const { t } = useTranslation(['common', 'content']);
  const site = useLocalizedSite();
  const history = useLocalizedHistory();
  const page = history.data;
  const brand = site.data?.brandName ?? t('site.brandName', { ns: 'content' });

  return (
    <>
      <Seo
        title={`${page?.intro.title ?? t('nav.history')} · ${brand}`}
        description={page?.intro.subtitle ?? t('pages.historyEyebrow')}
        path="/history"
        image={page?.heroImage}
      />
      <QueryStatus query={history}>
        {page ? (
          <>
            <PageHero
              eyebrow={t('pages.historyEyebrow')}
              title={page.intro.title}
              subtitle={page.intro.subtitle}
              image={page.heroImage}
              imageAlt={page.heroImageAlt}
            />
            <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
              {page.blocks.length === 0 ? (
                <EmptyCatalog message={t('pages.emptyHistory')} />
              ) : (
                <ol className="relative space-y-0 border-l border-bhagwa/30 pl-8">
                  {page.blocks.map((block, i) => (
                    <motion.li
                      key={block.id}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="relative pb-12 last:pb-0"
                    >
                      <span className="absolute top-1 -left-[2.4rem] size-3 rounded-full border-2 border-cream bg-bhagwa shadow" />
                      <p className="text-xs font-semibold tracking-[0.2em] text-bhagwa uppercase">
                        {block.year}
                      </p>
                      <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                        {block.title}
                      </h2>
                      <p className="mt-3 leading-relaxed text-ink-soft">{block.body}</p>
                    </motion.li>
                  ))}
                </ol>
              )}
            </div>
          </>
        ) : (
          <EmptyCatalog message={t('pages.emptyHistory')} />
        )}
      </QueryStatus>
    </>
  );
}
