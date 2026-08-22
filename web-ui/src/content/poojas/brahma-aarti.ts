import { images } from '../images';
import type { PoojaPackage } from '../types';

export const brahmaAarti: PoojaPackage = {
  slug: 'brahma-aarti',
  title: 'Brahma Temple Aarti',
  summary: 'Participate in evening aarti with priest coordination and seating guidance.',
  description:
    'We arrange your presence at the Brahma Temple aarti — timing, offerings guidance, and respectful protocol so the experience stays serene.',
  image: images.poojaBrahmaAarti,
  gallery: [images.poojaBrahmaGallery1],
  inclusions: ['Priest coordination', 'Flower/offerings kit', 'Protocol briefing'],
  duration: '~45–60 minutes',
  priceLabel: 'From ₹1,500',
  featured: true,
  timing: 'Evening (confirm slot on WhatsApp)',
  suitableFor: ['Families', 'Couples', 'Pilgrims'],
};
