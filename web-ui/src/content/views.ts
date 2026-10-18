import type { PortableTextBlock } from '@portabletext/types';
import type { Media } from '../lib/sanity/images';

export interface ContentLink {
  title: string;
  to: string;
}

export interface CardView {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  imageSrcSet?: string;
  priceLabel: string | null;
  meta?: string;
  to: string;
}

export interface ItineraryStop {
  day: string;
  title: string;
  details: string;
  location?: string;
  image?: Media;
}

export interface TourView extends CardView {
  description: string;
  body: PortableTextBlock[] | null;
  gallery: Media[];
  inclusions: string[];
  exclusions: string[];
  startingLocation?: string;
  destinations: ContentLink[];
  transport?: string;
  accommodation?: string;
  languages: string[];
  minGroup?: number;
  maxGroup?: number;
  season?: string;
  itinerary: ItineraryStop[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

export interface PoojaView extends CardView {
  description: string;
  body: PortableTextBlock[] | null;
  gallery: Media[];
  inclusions: string[];
  exclusions: string[];
  timing?: string;
  suitableFor: string[];
  preparation?: string;
  languages: string[];
  enquiryNote?: string;
  destination?: ContentLink;
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

export interface StayView extends CardView {
  description: string;
  body: PortableTextBlock[] | null;
  gallery: Media[];
  inclusions: string[];
  amenities: string[];
  location?: string;
  address?: string;
  mapUrl?: string;
  accommodationType?: string;
  rooms?: string;
  enquiryNote?: string;
  destination?: ContentLink;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

export interface ExperienceView extends CardView {
  description: string;
  body: PortableTextBlock[] | null;
  gallery: Media[];
  inclusions: string[];
  exclusions: string[];
  experienceType?: string;
  location?: string;
  duration?: string;
  languages: string[];
  requirements?: string;
  enquiryNote?: string;
  destination?: ContentLink;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

export interface DestinationView extends CardView {
  description: string;
  body: PortableTextBlock[] | null;
  gallery: Media[];
  region?: string;
  mapUrl?: string;
  visiting?: string;
  relatedPoojas: CardView[];
  relatedTours: CardView[];
  relatedExperiences: CardView[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

export interface PageView {
  slug: string;
  title: string;
  summary: string;
  body: PortableTextBlock[] | null;
  image: string;
  imageAlt: string;
  imageSrcSet?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

export interface WorkView {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  imageSrcSet?: string;
  date: string;
}

export interface HistoryView {
  intro: { title: string; subtitle: string };
  heroImage: string;
  heroImageAlt: string;
  blocks: { id: string; year: string; title: string; body: string }[];
}

export interface TestimonialView {
  id: string;
  quote: string;
  name: string;
  detail: string;
}

export interface FaqView {
  id: string;
  question: string;
  answer: string;
}

export interface SiteView {
  brandName: string;
  tagline: string;
  shortDescription: string;
  footerText: string;
  logo: Media | null;
  favicon: Media | null;
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
    address: string;
    mapUrl: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  bookingTemplate: string;
  seoTitle: string;
  seoDescription: string;
  seoImage?: string;
  source: 'local' | 'sanity';
}

export interface HomeView {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageSrcSet?: string;
  ctaPrimary: { label: string; to: string };
  ctaSecondary: { label: string; to: string };
  featuredTours: CardView[];
  featuredPoojas: CardView[];
  featuredStays: CardView[];
}
