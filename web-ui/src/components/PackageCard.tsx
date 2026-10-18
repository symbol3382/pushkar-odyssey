import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PackageCardProps {
  to: string;
  title: string;
  summary: string;
  image: string;
  imageAlt?: string;
  imageSrcSet?: string;
  priceLabel?: string | null;
  meta?: string;
  index?: number;
}

export function PackageCard({
  to,
  title,
  summary,
  image,
  imageAlt = '',
  imageSrcSet,
  priceLabel,
  meta,
  index = 0,
}: PackageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={to} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <img
            src={image}
            alt={imageAlt}
            srcSet={imageSrcSet}
            sizes={imageSrcSet ? '(min-width: 1024px) 33vw, 100vw' : undefined}
            className="size-full object-cover transition duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          {meta && (
            <span className="absolute left-3 top-3 rounded-sm bg-cream/90 px-2 py-1 text-xs font-medium text-maroon">
              {meta}
            </span>
          )}
          <p className="absolute bottom-3 left-3 right-3 font-display text-2xl text-cream">
            {title}
          </p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{summary}</p>
        {priceLabel ? <p className="mt-2 text-sm font-medium text-bhagwa">{priceLabel}</p> : null}
      </Link>
    </motion.article>
  );
}
