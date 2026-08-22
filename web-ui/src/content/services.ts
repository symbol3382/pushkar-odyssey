import type { ServiceItem } from './types';

export const services: ServiceItem[] = [
  {
    slug: 'airport-transfer',
    title: 'Airport & station transfer',
    summary: 'Comfortable pickup from Jaipur / Ajmer with temple etiquette briefing.',
    description:
      'Private vehicle with a local host who helps with arrival logistics, hotel check-in, and a gentle orientation to Pushkar customs.',
    image:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1400&q=80',
    priceLabel: 'From ₹2,500',
    inclusions: ['AC vehicle', 'Meet & greet', 'Bottled water', 'Local orientation'],
  },
  {
    slug: 'local-guide',
    title: 'Local temple guide',
    summary: 'Half-day walking guide for ghats, bazaars, and key shrines.',
    description:
      'A knowledgeable companion for respectful temple visits, photo moments, and hidden courtyards — paced for families or solo travelers.',
    image:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80',
    priceLabel: 'From ₹1,800',
    inclusions: ['4-hour walk', 'Temple protocol tips', 'Photo assistance', 'Tea stop'],
  },
  {
    slug: 'photography',
    title: 'Ritual photography',
    summary: 'Discreet coverage of aarti and family blessings.',
    description:
      'Soft, respectful photography during rituals and lake moments — edited selects delivered digitally within a few days.',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80',
    priceLabel: 'From ₹4,000',
    inclusions: ['2-hour coverage', '20 edited photos', 'Private gallery link'],
  },
];
