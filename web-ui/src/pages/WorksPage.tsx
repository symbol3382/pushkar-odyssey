import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { works } from '../content/works';

export function WorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our works"
        subtitle="A living gallery of tours, rituals, stays, and services we have hosted for guests."
        image={works[0]?.image}
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src={item.image}
                  alt=""
                  className="size-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
                <span className="absolute left-3 top-3 rounded-sm bg-cream/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-maroon">
                  {item.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs text-sand/70">{item.date}</p>
                  <h2 className="font-display text-2xl text-cream">{item.title}</h2>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-soft">{item.description}</p>
            </motion.article>
          ))}
        </div>
        <p className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex rounded-sm bg-bhagwa px-6 py-3 text-sm font-medium text-cream hover:bg-bhagwa-light"
          >
            Plan your visit
          </Link>
        </p>
      </div>
    </>
  );
}
