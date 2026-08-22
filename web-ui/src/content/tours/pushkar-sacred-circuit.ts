import type { TourPackage } from '../types';

export const pushkarSacredCircuit: TourPackage = {
  slug: 'pushkar-sacred-circuit',
  title: 'Pushkar Sacred Circuit',
  summary: 'Temples, ghats, and sunset camel trail in two unhurried days.',
  description:
    'A paced introduction to Pushkar’s spiritual heart — Brahma Temple, lake ghats, Savitri viewpoint, and a desert evening under soft saffron light.',
  image:
    'https://images.unsplash.com/photo-1596178065887-1198b6142102?auto=format&fit=crop&w=1600&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
  ],
  inclusions: [
    'Local guide',
    'Temple entry coordination',
    'Camel sunset experience',
    'Bottled water & welcome tea',
  ],
  duration: '2 days / 1 night',
  priceLabel: 'From ₹6,500 / person',
  featured: true,
  itinerary: [
    {
      day: 'Day 1',
      title: 'Temples & ghats',
      details: 'Morning Brahma darshan, lake circuit, bazaar walk, evening ghat aarti.',
    },
    {
      day: 'Day 2',
      title: 'Hills & desert dusk',
      details: 'Savitri temple sunrise option, rest, camel trail, farewell dinner.',
    },
  ],
};
