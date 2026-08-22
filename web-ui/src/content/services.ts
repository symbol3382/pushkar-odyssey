import { images } from './images';
import type { ServiceItem } from './types';

export const services: ServiceItem[] = [
  {
    slug: 'airport-transfer',
    title: 'Airport & station transfer',
    summary: 'Comfortable pickup from Jaipur / Ajmer with temple etiquette briefing.',
    description:
      'Private vehicle with a local host who helps with arrival logistics, hotel check-in, and a gentle orientation to Pushkar customs.',
    image: images.serviceAirportTransfer,
    priceLabel: 'From ₹2,500',
    inclusions: ['AC vehicle', 'Meet & greet', 'Bottled water', 'Local orientation'],
  },
  {
    slug: 'local-guide',
    title: 'Local temple guide',
    summary: 'Half-day walking guide for ghats, bazaars, and key shrines.',
    description:
      'A knowledgeable companion for respectful temple visits, photo moments, and hidden courtyards — paced for families or solo travelers.',
    image: images.serviceLocalGuide,
    priceLabel: 'From ₹1,800',
    inclusions: ['4-hour walk', 'Temple protocol tips', 'Photo assistance', 'Tea stop'],
  },
  {
    slug: 'photography',
    title: 'Ritual photography',
    summary: 'Discreet coverage of aarti and family blessings.',
    description:
      'Soft, respectful photography during rituals and lake moments — edited selects delivered digitally within a few days.',
    image: images.servicePhotography,
    priceLabel: 'From ₹4,000',
    inclusions: ['2-hour coverage', '20 edited photos', 'Private gallery link'],
  },
];
