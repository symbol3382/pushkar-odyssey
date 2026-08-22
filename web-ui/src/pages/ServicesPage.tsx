import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookCTA } from '../components/BookCTA';
import { PageHero } from '../components/PageHero';
import { services } from '../content/services';

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Extras"
        title="Related services"
        subtitle="Transfers, guides, and photography — the quiet logistics that make a pilgrimage smooth."
        image={services[0]?.image}
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
        {services.map((service, i) => (
          <motion.article
            key={service.slug}
            id={service.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="grid gap-6 overflow-hidden rounded-sm border border-bhagwa/10 bg-cream/60 lg:grid-cols-2"
          >
            <img src={service.image} alt="" className="aspect-[16/11] w-full object-cover lg:aspect-auto lg:min-h-72" />
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <h2 className="font-display text-3xl text-ink">{service.title}</h2>
              <p className="mt-2 text-sm font-medium text-bhagwa">{service.priceLabel}</p>
              <p className="mt-3 text-ink-soft">{service.description}</p>
              <ul className="mt-4 space-y-1">
                {service.inclusions.map((item) => (
                  <li key={item} className="text-sm text-ink-soft">
                    · {item}
                  </li>
                ))}
              </ul>
              <BookCTA type="service" title={service.title} slug={service.slug} className="mt-6" compact />
            </div>
          </motion.article>
        ))}
        <p className="text-center text-sm text-ink-soft">
          Need a package mix?{' '}
          <Link to="/contact" className="text-bhagwa hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </>
  );
}
