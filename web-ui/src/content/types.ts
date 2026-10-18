import type { ImageSrc } from './images';

export type { ImageSrc };
export type BookingType = 'tour' | 'stay' | 'pooja' | 'service' | 'general' | 'destination';

export interface SiteContact {
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  shortDescription: string;
  contact: SiteContact;
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  bookingMessageTemplate: string;
}

export interface NavLink {
  labelKey: string;
  to: string;
}

export interface NavConfig {
  primary: NavLink[];
  explore: NavLink[];
  footer: NavLink[];
}

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  description: string;
  /** From `images.key` in content/images.ts */
  image: ImageSrc;
  date: string;
}

export interface HistoryBlock {
  id: string;
  year: string;
  title: string;
  body: string;
}

export interface PackageBase {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** From `images.key` in content/images.ts */
  image: ImageSrc;
  /** From `images.key` entries */
  gallery: ImageSrc[];
  inclusions: string[];
  duration?: string;
  priceLabel: string;
  featured?: boolean;
}

export interface TourPackage extends PackageBase {
  itinerary: { day: string; title: string; details: string }[];
}

export interface StayPackage extends PackageBase {
  amenities: string[];
  location: string;
}

export interface PoojaPackage extends PackageBase {
  timing: string;
  suitableFor: string[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** From `images.key` in content/images.ts */
  image: ImageSrc;
  priceLabel: string;
  inclusions: string[];
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  /** From `images.key` in content/images.ts */
  heroImage: ImageSrc;
  ctaPrimary: { label: string; to: string };
  ctaSecondary: { label: string; to: string };
  featuredTourSlugs: string[];
  featuredPoojaSlugs: string[];
  featuredStaySlugs: string[];
}

export interface ContactContent {
  title: string;
  subtitle: string;
  formIntro: string;
}
