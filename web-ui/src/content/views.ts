import type { PortableTextBlock } from '@portabletext/types';
import type { Media } from '../lib/sanity/images';

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
  groupKey?: string;
}

export interface ItineraryStop {
  day: string;
  title: string;
  details: string;
  location?: string;
  image?: Media;
}

export interface NoteView {
  question: string;
  answer: string;
}

export interface CatalogDetailView extends CardView {
  description: string;
  bodyMarkdown: string;
  gallery: Media[];
  inclusions: string[];
  exclusions: string[];
  notes: NoteView[];
  highlights: string[];
  programFlow: string[];
  itinerary: ItineraryStop[];
  enquiryNote?: string;
  startTime?: string;
  seasonal: boolean;
  format?: string;
  when?: string;
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

export interface HomeHeroImage {
  src: string;
  srcSet?: string;
}

export interface HomeView {
  heroImages: HomeHeroImage[];
  featuredDarshan: CardView[];
  featuredCultural: CardView[];
  featuredTours: CardView[];
  featuredEvents: CardView[];
  featuredBestsellers: CardView[];
}
