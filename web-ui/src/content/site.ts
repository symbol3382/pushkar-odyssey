import type { SiteConfig } from './types';

/** Edit brand + contact here — UI reads this only. */
export const site: SiteConfig = {
  brandName: 'Pushkar Tour',
  tagline: 'Sacred journeys · Warm stays · Timeless rituals',
  shortDescription:
    'Curated Pushkar experiences — temple aarti, guided tours, serene stays, and local services — booked simply over WhatsApp.',
  contact: {
    whatsapp: '919876543210',
    phone: '+91 98765 43210',
    email: 'hello@pushkartour.example',
    address: 'Near Brahma Temple, Pushkar, Rajasthan 305022',
    mapUrl: 'https://maps.google.com/?q=Pushkar+Brahma+Temple',
  },
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },
  bookingMessageTemplate:
    'Namaste! I would like to book:\n\n*{{type}}*: {{title}}\nRef: {{slug}}\n{{details}}\n\nPlease share availability and next steps. Thank you.',
};
