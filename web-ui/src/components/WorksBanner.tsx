import { motion } from 'framer-motion';
import { works } from '../content/works';

export function WorksBanner() {
  const loop = [
    ...works.map((item) => ({ ...item, key: `${item.id}-a` })),
    ...works.map((item) => ({ ...item, key: `${item.id}-b` })),
  ];

  return (
    <section className="relative border-y border-bhagwa/10 bg-sand/40 py-8" aria-label="Our recent works">
      <div className="mx-auto mb-5 flex max-w-6xl items-end justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bhagwa">Our works</p>
          <h2 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Moments we have hosted</h2>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-sand/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-sand/90 to-transparent" />
        <motion.div
          className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {loop.map((item) => (
            <article key={item.key} className="relative w-72 shrink-0 overflow-hidden rounded-sm sm:w-80">
              <img src={item.image} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold-soft">{item.category}</p>
                <p className="font-display text-xl text-cream">{item.title}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
