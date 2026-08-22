import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { history, historyIntro } from '../content/history';

export function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Story"
        title={historyIntro.title}
        subtitle={historyIntro.subtitle}
        image="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=80"
      />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <ol className="relative space-y-0 border-l border-bhagwa/30 pl-8">
          {history.map((block, i) => (
            <motion.li
              key={block.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative pb-12 last:pb-0"
            >
              <span className="absolute -left-[2.4rem] top-1 size-3 rounded-full border-2 border-cream bg-bhagwa shadow" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bhagwa">{block.year}</p>
              <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{block.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{block.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </>
  );
}
