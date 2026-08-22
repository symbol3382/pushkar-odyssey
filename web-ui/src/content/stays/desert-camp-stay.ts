import { images } from '../images';
import type { StayPackage } from '../types';

export const desertCampStay: StayPackage = {
  slug: 'desert-camp-stay',
  title: 'Desert Camp Stay',
  summary: 'Luxury tents under desert stars with folk dinner.',
  description:
    'An overnight camp beyond town — comfortable tents, communal dinner, and a sky full of quiet.',
  image: images.stayDesertCamp,
  gallery: [],
  inclusions: ['Dinner & breakfast', 'Cultural evening', 'Transfers from Pushkar'],
  duration: '1 night',
  priceLabel: 'From ₹5,500 / person',
  featured: false,
  amenities: ['Ensuite tents', 'Bonfire (seasonal)', 'Parking'],
  location: 'Pushkar outskirts / dunes',
};
