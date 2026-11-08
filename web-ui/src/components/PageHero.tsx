import { motion } from 'framer-motion';
import { HeroScrim } from './HeroScrim';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
}

export function PageHero({ eyebrow, title, subtitle, image, imageAlt = '' }: PageHeroProps) {
  return (
    <section className="relative min-h-[52vh] overflow-hidden pt-24 sm:min-h-[56vh] sm:pt-28">
      {image ? (
        <div className="absolute inset-0">
          <img src={image} alt={imageAlt} className="size-full object-cover" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-maroon via-bhagwa-deep to-ink" />
      )}
      <HeroScrim tone="bottom" />
      <div className="relative mx-auto flex min-h-[calc(52vh-6rem)] max-w-page items-end px-4 pb-14 sm:min-h-[calc(56vh-7rem)] sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-shadow-hero max-w-4xl"
        >
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 font-display text-4xl text-balance text-cream sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-cream/90 sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
