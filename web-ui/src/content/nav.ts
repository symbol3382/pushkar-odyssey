import type { NavConfig } from './types';

export const nav: NavConfig = {
  primary: [
    { label: 'Home', to: '/' },
    { label: 'Our Works', to: '/works' },
    { label: 'History', to: '/history' },
    { label: 'Contact Us', to: '/contact' },
  ],
  explore: [
    { label: 'Tours', to: '/tours' },
    { label: 'Stays', to: '/stays' },
    { label: 'Poojas & Aarti', to: '/poojas' },
    { label: 'Services', to: '/services' },
  ],
  footer: [
    { label: 'Tours', to: '/tours' },
    { label: 'Stays', to: '/stays' },
    { label: 'Poojas', to: '/poojas' },
    { label: 'Services', to: '/services' },
    { label: 'Our Works', to: '/works' },
    { label: 'History', to: '/history' },
    { label: 'Contact', to: '/contact' },
  ],
};
