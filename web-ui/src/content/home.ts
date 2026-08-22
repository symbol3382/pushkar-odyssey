import type { HomeContent } from './types';

export const home: HomeContent = {
  heroTitle: 'Pushkar Tour',
  heroSubtitle:
    'Walk the ghats at dawn, feel the aarti glow, rest in quiet courtyards — tradition, hosted with modern ease.',
  heroImage:
    'https://images.unsplash.com/photo-1596178065887-1198b6142102?auto=format&fit=crop&w=2000&q=80',
  ctaPrimary: { label: 'Explore tours', to: '/tours' },
  ctaSecondary: { label: 'Book a pooja', to: '/poojas' },
  featuredTourSlugs: ['pushkar-sacred-circuit', 'desert-sunset-safari'],
  featuredPoojaSlugs: ['brahma-aarti', 'rudrabhishek'],
  featuredStaySlugs: ['lakeview-haveli'],
};
