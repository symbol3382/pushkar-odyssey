import { images } from '../images';
import type { TourPackage } from '../types';

export const desertSunsetSafari: TourPackage = {
  slug: 'desert-sunset-safari',
  title: 'Desert Sunset Safari',
  summary: 'Dunes, folk music, and a golden-hour feast beyond the town.',
  description:
    'Leave the bustle for open sand — camel or jeep options, Rajasthani snacks, and folk tunes as the sky turns bhagwa.',
  image: images.tourDesertSafari,
  gallery: [images.tourDesertSafariGallery1],
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
