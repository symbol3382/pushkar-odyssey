import { images } from './images';
import type { WorkItem } from './types';

export const works: WorkItem[] = [
  {
    id: 'w1',
    title: 'Family Brahma Aarti',
    category: 'Pooja',
    description: 'Private evening aarti for a visiting family of eight.',
    image: images.workW1,
    date: '2025-11',
  },
  {
    id: 'w2',
    title: 'Three-day Sacred Circuit',
    category: 'Tour',
    description: 'Guided temple trail with camel sunset and local feast.',
    image: images.workW2,
    date: '2025-10',
  },
  {
    id: 'w3',
    title: 'Haveli Wedding Stay',
    category: 'Stay',
    description: 'Courtyard suite hosting for guests during a Pushkar wedding.',
    image: images.workW3,
    date: '2025-09',
  },
  {
    id: 'w4',
    title: 'Rudrabhishek at Dawn',
    category: 'Pooja',
    description: 'Early morning Shiva ritual with priest coordination.',
    image: images.workW4,
    date: '2025-08',
  },
  {
    id: 'w5',
    title: 'Airport Transfer & Guide',
    category: 'Service',
    description: 'Door-to-door pickup with temple protocol briefing.',
    image: images.workW5,
    date: '2025-07',
  },
  {
    id: 'w6',
    title: 'Kartik Fair Hosting',
    category: 'Tour',
    description: 'Multi-day fair immersion with lodging and rituals.',
    image: images.workW6,
    date: '2024-11',
  },
];
