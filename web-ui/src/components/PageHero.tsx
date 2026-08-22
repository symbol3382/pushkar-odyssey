import { motion } from 'framer-motion';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
}

export function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28">
      {image ? (
        <div className="absolute inset-0">
          <img src={image} alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-cream" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/90 via-bhagwa-deep/80 to-cream" />
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">{eyebrow}</p>
          )}
          <h1 className="mt-3 font-display text-4xl text-cream text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && <p className="mt-4 text-base leading-relaxed text-sand/90 sm:text-lg">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
