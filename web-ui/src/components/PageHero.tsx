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
    <section className="relative overflow-hidden pt-24 sm:pt-28">
      {image ? (
        <div className="absolute inset-0">
          <img src={image} alt={imageAlt} className="size-full object-cover" />
          <HeroScrim tone="page" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-maroon via-bhagwa-deep to-cream" />
      )}
      <div className="relative mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="hero-copy max-w-4xl"
        >
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-4xl text-cream text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-cream/90 sm:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
