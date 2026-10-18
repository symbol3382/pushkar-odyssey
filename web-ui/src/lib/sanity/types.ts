import type { PortableTextBlock } from '@portabletext/types';
import type { ContentLanguage } from './locale';

export type LocaleString = Partial<Record<ContentLanguage, string>>;
export type LocaleBlocks = Partial<Record<ContentLanguage, PortableTextBlock[]>>;

export interface SanityImage {
  alt?: LocaleString | null;
  crop?: { top: number; bottom: number; left: number; right: number } | null;
  hotspot?: { x: number; y: number; height: number; width: number } | null;
  asset?: { _ref?: string; _type?: string } | null;
}

export interface RawPrice {
  amount?: number | null;
  currency?: string | null;
  note?: LocaleString | null;
}

export interface RawReference {
  title?: LocaleString | null;
  slug?: string | null;
}

export interface RawCard {
  _id: string;
  slug?: string | null;
  title?: LocaleString | null;
  summary?: LocaleString | null;
  featuredImage?: SanityImage | null;
  price?: RawPrice | null;
  featured?: boolean | null;
  duration?: LocaleString | null;
  durationLabel?: LocaleString | null;
  days?: number | null;
  nights?: number | null;
  address?: LocaleString | null;
  location?: LocaleString | null;
  category?: LocaleString | null;
  experienceType?: string | null;
}

export interface RawItineraryDay {
  dayNumber?: number | null;
  heading?: LocaleString | null;
  description?: LocaleString | null;
  location?: LocaleString | null;
  image?: SanityImage | null;
}

export interface RawPooja extends RawCard {
  description?: LocaleBlocks | null;
  gallery?: SanityImage[] | null;
  destination?: RawReference | null;
  included?: LocaleString[] | null;
  excluded?: LocaleString[] | null;
  preparation?: LocaleString | null;
  languages?: string[] | null;
  enquiryNote?: LocaleString | null;
  seo?: RawSeo | null;
}

export interface RawTour extends RawCard {
  description?: LocaleBlocks | null;
  gallery?: SanityImage[] | null;
  startingLocation?: LocaleString | null;
  destinations?: RawReference[] | null;
  itinerary?: RawItineraryDay[] | null;
  included?: LocaleString[] | null;
  excluded?: LocaleString[] | null;
  transport?: LocaleString | null;
  accommodation?: LocaleString | null;
  languages?: string[] | null;
  minGroup?: number | null;
  maxGroup?: number | null;
  season?: LocaleString | null;
  seo?: RawSeo | null;
}

export interface RawCoordinates {
  lat?: number | null;
  lng?: number | null;
}

export interface RawStay extends RawCard {
  description?: LocaleBlocks | null;
  gallery?: SanityImage[] | null;
  destination?: RawReference | null;
  coordinates?: RawCoordinates | null;
  amenities?: LocaleString[] | null;
  accommodationType?: string | null;
  rooms?: LocaleString | null;
  included?: LocaleString[] | null;
  enquiryNote?: LocaleString | null;
  seo?: RawSeo | null;
}

export interface RawExperience extends RawCard {
  description?: LocaleBlocks | null;
  gallery?: SanityImage[] | null;
  destination?: RawReference | null;
  included?: LocaleString[] | null;
  excluded?: LocaleString[] | null;
  languages?: string[] | null;
  requirements?: LocaleString | null;
  enquiryNote?: LocaleString | null;
  seo?: RawSeo | null;
}

export interface RawDestination extends RawCard {
  description?: LocaleBlocks | null;
  gallery?: SanityImage[] | null;
  region?: LocaleString | null;
  coordinates?: RawCoordinates | null;
  visiting?: LocaleString | null;
  seo?: RawSeo | null;
  relatedPoojas?: RawCard[] | null;
  relatedTours?: RawCard[] | null;
  relatedExperiences?: RawCard[] | null;
}

export interface RawSeo {
  title?: LocaleString | null;
  description?: LocaleString | null;
  image?: SanityImage | null;
}

export interface RawSiteSettings {
  name?: LocaleString | null;
  description?: LocaleString | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  mapUrl?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  footerText?: LocaleString | null;
  enquiryTemplate?: LocaleString | null;
  logo?: SanityImage | null;
  favicon?: SanityImage | null;
  seo?: RawSeo | null;
}

export interface RawCta {
  label?: LocaleString | null;
  path?: string | null;
}

export interface RawHome {
  heroTitle?: LocaleString | null;
  heroSubtitle?: LocaleString | null;
  heroImage?: SanityImage | null;
  primaryCta?: RawCta | null;
  secondaryCta?: RawCta | null;
  featuredTours?: RawCard[] | null;
  featuredPoojas?: RawCard[] | null;
  featuredStays?: RawCard[] | null;
}

export interface RawHomePayload {
  home: RawHome | null;
  featuredTours: RawCard[];
  featuredPoojas: RawCard[];
  featuredStays: RawCard[];
}

export interface RawHistoryBlock {
  year?: LocaleString | null;
  title?: LocaleString | null;
  body?: LocaleString | null;
}

export interface RawHistory {
  introTitle?: LocaleString | null;
  introSubtitle?: LocaleString | null;
  heroImage?: SanityImage | null;
  blocks?: RawHistoryBlock[] | null;
}

export interface RawWork {
  _id: string;
  title?: LocaleString | null;
  category?: LocaleString | null;
  summary?: LocaleString | null;
  dateLabel?: string | null;
  image?: SanityImage | null;
}

export interface RawTestimonial {
  _id: string;
  quote?: LocaleString | null;
  name?: string | null;
  detail?: LocaleString | null;
}

export interface RawFaq {
  _id: string;
  question?: LocaleString | null;
  answer?: LocaleString | null;
}

export interface RawPage {
  _id: string;
  slug?: string | null;
  title?: LocaleString | null;
  summary?: LocaleString | null;
  body?: LocaleBlocks | null;
  image?: SanityImage | null;
  seo?: RawSeo | null;
}

export interface RelatedContent {
  poojas: RawCard[];
  tours: RawCard[];
  stays: RawCard[];
  experiences: RawCard[];
}
