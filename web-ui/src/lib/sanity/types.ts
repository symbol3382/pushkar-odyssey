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
  category?: string | null;
  ritual?: string | null;
  kind?: string | null;
  adventureActivity?: string | null;
  stayCategory?: string | null;
  festival?: string | null;
  catalog?: string | null;
  propertyType?: string | null;
  when?: LocaleString | null;
}

export interface RawItineraryDay {
  dayNumber?: number | null;
  heading?: LocaleString | null;
  description?: LocaleString | null;
  location?: LocaleString | null;
  image?: SanityImage | null;
}

export interface RawNote {
  question?: LocaleString | null;
  answer?: LocaleString | null;
}

export interface RawCoordinates {
  lat?: number | null;
  lng?: number | null;
}

export interface RawCatalog extends RawCard {
  description?: LocaleBlocks | null;
  gallery?: SanityImage[] | null;
  included?: LocaleString[] | null;
  excluded?: LocaleString[] | null;
  notes?: RawNote[] | null;
  highlights?: LocaleString[] | null;
  amenities?: LocaleString[] | null;
  itinerary?: RawItineraryDay[] | null;
  enquiryNote?: LocaleString | null;
  preparation?: LocaleString | null;
  season?: LocaleString | null;
  transport?: LocaleString | null;
  accommodation?: LocaleString | null;
  rooms?: LocaleString | null;
  coordinates?: RawCoordinates | null;
  languages?: string[] | null;
  minGroup?: number | null;
  maxGroup?: number | null;
  seasonal?: boolean | null;
  format?: string | null;
  purpose?: string[] | null;
  location?: LocaleString | null;
  seo?: RawSeo | null;
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
  seo?: RawSeo | null;
}

export interface RawHome {
  heroImage?: SanityImage | null;
  featuredDarshan?: RawCard[] | null;
  featuredDesert?: RawCard[] | null;
  featuredTours?: RawCard[] | null;
  featuredStays?: RawCard[] | null;
}

export interface RawHomePayload {
  home: RawHome | null;
  featuredDarshan: RawCard[];
  featuredDesert: RawCard[];
  featuredTours: RawCard[];
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

