import { catalogs } from './catalogs';

export const nav = {
  primary: [
    { labelKey: 'nav.home', to: '/' },
    { labelKey: 'nav.works', to: '/works' },
    { labelKey: 'nav.history', to: '/history' },
    { labelKey: 'nav.contact', to: '/contact' },
  ],
  explore: catalogs.map((catalog) => ({ labelKey: catalog.copy.nav, to: catalog.path })),
  footer: [
    ...catalogs.map((catalog) => ({ labelKey: catalog.copy.nav, to: catalog.path })),
    { labelKey: 'nav.works', to: '/works' },
    { labelKey: 'nav.history', to: '/history' },
    { labelKey: 'nav.footerContact', to: '/contact' },
  ],
} as const;
