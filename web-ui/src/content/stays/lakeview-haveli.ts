import { images } from '../images';
import type { StayPackage } from '../types';

export const lakeviewHaveli: StayPackage = {
  slug: 'lakeview-haveli',
  title: 'Lakeview Haveli',
  summary: 'Courtyard calm with soft lake glimpses and warm Rajasthani hospitality.',
  description:
    'A boutique haveli-style stay near the ghats — carved wood, morning chai, and rooms that feel like a quiet pause between rituals.',
  image: images.stayLakeviewHaveli,
  gallery: [images.stayLakeviewGallery1],
  inclusions: ['Breakfast', 'Wi-Fi', 'Airport desk help', 'Temple timing tips'],
  duration: 'Per night',
  priceLabel: 'From ₹3,800 / night',
  featured: true,
  amenities: ['AC rooms', 'Rooftop sit-out', 'Vegetarian kitchen', 'Hot water'],
  location: 'Near Pushkar Lake, walking distance to Brahma Temple',
};
