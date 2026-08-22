import type { TourPackage } from '../types';

export const desertSunsetSafari: TourPackage = {
  slug: 'desert-sunset-safari',
  title: 'Desert Sunset Safari',
  summary: 'Dunes, folk music, and a golden-hour feast beyond the town.',
  description:
    'Leave the bustle for open sand — camel or jeep options, Rajasthani snacks, and folk tunes as the sky turns bhagwa.',
  image:
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
  ],
  inclusions: ['Transport', 'Camel or jeep', 'Snacks & chai', 'Folk performance'],
  duration: 'Half day (evening)',
  priceLabel: 'From ₹2,200 / person',
  featured: true,
  itinerary: [
    {
      day: 'Evening',
      title: 'Into the dunes',
      details: 'Pickup from hotel, dune ride, sunset photography, dinner return.',
    },
  ],
};
