import { images } from './images';
import type { HomeContent } from './types';

export const home: HomeContent = {
  heroTitle: 'Pushkar Tour',
  heroSubtitle:
    'Walk the ghats at dawn, feel the aarti glow, rest in quiet courtyards — tradition, hosted with modern ease.',
  heroImage: images.homeHero,
  ctaPrimary: { label: 'Explore tours', to: '/tours' },
  ctaSecondary: { label: 'Book a pooja', to: '/poojas' },
  featuredTourSlugs: ['pushkar-sacred-circuit', 'desert-sunset-safari'],
  featuredPoojaSlugs: ['brahma-aarti', 'rudrabhishek'],
  featuredStaySlugs: ['lakeview-haveli'],
};
