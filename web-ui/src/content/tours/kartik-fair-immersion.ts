import { images } from '../images';
import type { TourPackage } from '../types';

export const kartikFairImmersion: TourPackage = {
  slug: 'kartik-fair-immersion',
  title: 'Kartik Fair Immersion',
  summary: 'Fairgrounds, cattle parade energy, and nightly aarti during Kartik.',
  description:
    'Seasonal hosting around the Pushkar Fair — lodging coordination, fair circuit, and ritual windows timed around crowds.',
  image: images.tourKartikFair,
  gallery: [],
  inclusions: ['Fair guide', 'Reserved viewing tips', 'Evening aarti slot help'],
  duration: '3–5 days (seasonal)',
  priceLabel: 'Custom quote',
  featured: false,
  itinerary: [
    {
      day: 'Daily',
      title: 'Fair + sacred rhythm',
      details: 'Morning fair walk, rest, evening lake aarti, optional folk night.',
    },
  ],
};
