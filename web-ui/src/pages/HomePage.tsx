import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookCTA } from '../components/BookCTA';
import { PackageCard } from '../components/PackageCard';
import { WorksBanner } from '../components/WorksBanner';
import { home } from '../content/home';
import { site } from '../content/site';
import { getPoojaBySlug, getStayBySlug, getTourBySlug, poojas, stays, tours } from '../content';

export function HomePage() {
  const featuredTours = home.featuredTourSlugs
    .map((slug) => getTourBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const featuredPoojas = home.featuredPoojaSlugs
    .map((slug) => getPoojaBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const featuredStays = home.featuredStaySlugs
    .map((slug) => getStayBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="relative min-h-dvh overflow-hidden grain-overlay">
        <img
          src={home.heroImage}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-maroon/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-ink/40" />

        <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              {site.tagline}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
              {home.heroTitle}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-sand/90 sm:text-lg">
              {home.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={home.ctaPrimary.to}
                className="rounded-sm bg-bhagwa px-6 py-3 text-sm font-medium text-cream shadow-lg shadow-bhagwa/30 transition hover:bg-bhagwa-light"
              >
                {home.ctaPrimary.label}
              </Link>
              <Link
                to={home.ctaSecondary.to}
                className="rounded-sm border border-cream/40 bg-cream/10 px-6 py-3 text-sm font-medium text-cream backdrop-blur-sm transition hover:bg-cream/20"
              >
                {home.ctaSecondary.label}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <WorksBanner />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured journeys"
          title="Tours with soul"
          link={{ to: '/tours', label: `All ${String(tours.length)} tours` }}
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour, i) => (
            <PackageCard
              key={tour.slug}
              to={`/tours/${tour.slug}`}
              title={tour.title}
              summary={tour.summary}
              image={tour.image}
              priceLabel={tour.priceLabel}
              meta={tour.duration}
              index={i}
            />
          ))}
        </div>
      </section>

      <section className="bg-sand/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Rituals"
            title="Poojas & aarti"
            link={{ to: '/poojas', label: `Browse ${String(poojas.length)}` }}
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {featuredPoojas.map((pooja, i) => (
              <PackageCard
                key={pooja.slug}
                to={`/poojas/${pooja.slug}`}
                title={pooja.title}
                summary={pooja.summary}
                image={pooja.image}
                priceLabel={pooja.priceLabel}
                meta={pooja.timing}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Rest"
          title="Stays near the sacred"
          link={{ to: '/stays', label: `View ${String(stays.length)} stays` }}
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {featuredStays.map((stay, i) => (
            <PackageCard
              key={stay.slug}
              to={`/stays/${stay.slug}`}
              title={stay.title}
              summary={stay.summary}
              image={stay.image}
              priceLabel={stay.priceLabel}
              meta={stay.location}
              index={i}
            />
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-maroon to-bhagwa-deep px-8 py-12 sm:px-12">
          <div className="mandala-bg absolute inset-0 opacity-30" aria-hidden />
          <div className="relative max-w-lg">
            <h2 className="font-display text-3xl text-cream sm:text-4xl">Ready to plan your Pushkar?</h2>
            <p className="mt-3 text-sand/85">
              No payment gateways — just a WhatsApp conversation with everything prefilled.
            </p>
            <BookCTA type="general" title="Custom Pushkar plan" className="mt-6" />
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link: { to: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bhagwa">{eyebrow}</p>
        <h2 className="mt-1 font-display text-3xl text-ink sm:text-4xl">{title}</h2>
      </div>
      <Link to={link.to} className="text-sm font-medium text-maroon underline-offset-4 hover:underline">
        {link.label}
      </Link>
    </div>
  );
}
