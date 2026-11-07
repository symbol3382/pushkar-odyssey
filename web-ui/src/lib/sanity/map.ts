import type { PortableTextBlock } from '@portabletext/types';
import { catalogs, type Catalog } from '../../content/catalogs';
import type {
  CardView,
  CatalogDetailView,
  FaqView,
  HistoryView,
  HomeView,
  PageView,
  SiteView,
  TestimonialView,
  WorkView,
} from '../../content/views';
import { imageFromSanity, type Media } from './images';
import { pickLocale, pickText } from './locale';
import { formatStartingPrice } from './price';
import type {
  LocaleBlocks,
  LocaleString,
  RawCard,
  RawCatalog,
  RawCoordinates,
  RawFaq,
  RawHistory,
  RawHomePayload,
  RawPage,
  RawSeo,
  RawSiteSettings,
  RawTestimonial,
  RawWork,
  SanityImage,
} from './types';

export interface MapContext {
  language: string;
  fromLabel: string;
  durationLabel: (days: number, nights: number) => string;
  dayLabel: (day: number) => string;
  optionLabel: (group: string, value: string) => string;
  fallbackHero?: string;
}

function texts(items: LocaleString[] | null | undefined, language: string): string[] {
  if (!items) return [];
  return items.map((item) => pickText(item, language)).filter((item) => item.length > 0);
}

function blocks(
  field: LocaleBlocks | null | undefined,
  language: string,
): PortableTextBlock[] | null {
  const value = pickLocale(field, language);
  return value && value.length > 0 ? value : null;
}

function gallery(images: SanityImage[] | null | undefined, language: string): Media[] {
  if (!images) return [];
  return images.flatMap((image) => {
    const media = imageFromSanity(image, language);
    return media ? [media] : [];
  });
}

function coordinates(
  value: RawCoordinates | null | undefined,
): { lat: number; lng: number } | null {
  if (typeof value?.lat !== 'number' || typeof value.lng !== 'number') return null;
  if (value.lat < -90 || value.lat > 90 || value.lng < -180 || value.lng > 180) return null;
  return { lat: value.lat, lng: value.lng };
}

function mapUrl(value: RawCoordinates | null | undefined): string | undefined {
  const point = coordinates(value);
  if (!point) return undefined;
  return `https://www.google.com/maps?q=${String(point.lat)},${String(point.lng)}`;
}

function seoFields(seo: RawSeo | null | undefined, language: string) {
  const image = imageFromSanity(seo?.image, language);
  return {
    seoTitle: pickText(seo?.title, language) || undefined,
    seoDescription: pickText(seo?.description, language) || undefined,
    seoImage: image?.src,
  };
}

function durationOf(raw: RawCard, context: MapContext): string | undefined {
  const label =
    pickText(raw.durationLabel, context.language) || pickText(raw.duration, context.language);
  if (label) return label;
  if (typeof raw.days === 'number') return context.durationLabel(raw.days, raw.nights ?? 0);
  return undefined;
}

function kindValue(raw: RawCard, field: Catalog['kindField']): string | undefined {
  if (!field) return undefined;
  const value = raw[field];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export function catalogMeta(
  raw: RawCard,
  catalog: Catalog,
  context: MapContext,
): string | undefined {
  if (catalog.id === 'tour') return durationOf(raw, context);
  if (catalog.id === 'desert' && raw.kind === 'adventure' && raw.adventureActivity) {
    return context.optionLabel('adventure', raw.adventureActivity);
  }
  const value = kindValue(raw, catalog.kindField);
  if (!value) return undefined;
  return context.optionLabel(catalog.kindGroup, value);
}

export function mapCard(
  raw: RawCard | null | undefined,
  context: MapContext,
  base: string,
  meta?: string,
): CardView | null {
  const slug = raw?.slug?.trim();
  const title = pickText(raw?.title, context.language);
  if (!raw || !slug || !title) return null;
  const image = imageFromSanity(raw.featuredImage, context.language);
  return {
    slug,
    title,
    summary: pickText(raw.summary, context.language),
    image: image?.src ?? '',
    imageAlt: image?.alt ?? title,
    imageSrcSet: image?.srcSet,
    priceLabel: formatStartingPrice(
      raw.price
        ? {
            amount: raw.price.amount,
            currency: raw.price.currency,
            note: pickText(raw.price.note, context.language),
          }
        : null,
      context.fromLabel,
    ),
    meta,
    to: `${base}/${slug}`,
    groupKey: raw.catalog ?? undefined,
  };
}

function cards(
  items: RawCard[] | null | undefined,
  context: MapContext,
  catalog: Catalog,
): CardView[] {
  if (!items) return [];
  return items.flatMap((item) => {
    const card = mapCard(item, context, catalog.path, catalogMeta(item, catalog, context));
    return card ? [card] : [];
  });
}

export function mapCatalogCards(
  items: RawCatalog[] | null | undefined,
  catalog: Catalog,
  context: MapContext,
): CardView[] {
  return cards(items, context, catalog);
}

export function mapCatalogDetail(
  raw: RawCatalog | null,
  catalog: Catalog,
  context: MapContext,
): CatalogDetailView | null {
  const card = mapCard(
    raw,
    context,
    catalog.path,
    raw ? catalogMeta(raw, catalog, context) : undefined,
  );
  if (!raw || !card) return null;
  return {
    ...card,
    description: pickText(raw.summary, context.language),
    body: blocks(raw.description, context.language),
    gallery: gallery(raw.gallery, context.language),
    inclusions: texts(raw.included, context.language),
    exclusions: texts(raw.excluded, context.language),
    notes: (raw.notes ?? []).flatMap((note) => {
      const question = pickText(note.question, context.language);
      const answer = pickText(note.answer, context.language);
      if (!question || !answer) return [];
      return [{ question, answer }];
    }),
    highlights: texts(raw.highlights, context.language),
    amenities: texts(raw.amenities, context.language),
    enquiryNote: pickText(raw.enquiryNote, context.language) || undefined,
    preparation: pickText(raw.preparation, context.language) || undefined,
    season: pickText(raw.season, context.language) || undefined,
    when: pickText(raw.when, context.language) || undefined,
    transport: pickText(raw.transport, context.language) || undefined,
    accommodation: pickText(raw.accommodation, context.language) || undefined,
    rooms: pickText(raw.rooms, context.language) || undefined,
    address: pickText(raw.address, context.language) || undefined,
    mapUrl: mapUrl(raw.coordinates),
    languages: (raw.languages ?? []).filter((item) => item.trim().length > 0),
    minGroup: raw.minGroup ?? undefined,
    maxGroup: raw.maxGroup ?? undefined,
    seasonal: raw.seasonal === true,
    format: raw.format ? context.optionLabel('format', raw.format) : undefined,
    purposes: (raw.purpose ?? []).flatMap((item) => {
      const label = context.optionLabel('purpose', item);
      return label ? [label] : [];
    }),
    location: pickText(raw.location, context.language) || undefined,
    itinerary: (raw.itinerary ?? []).flatMap((stop) => {
      const title = pickText(stop.heading, context.language);
      if (!title || typeof stop.dayNumber !== 'number') return [];
      const image = imageFromSanity(stop.image, context.language) ?? undefined;
      return [
        {
          day: context.dayLabel(stop.dayNumber),
          title,
          details: pickText(stop.description, context.language),
          location: pickText(stop.location, context.language) || undefined,
          image,
        },
      ];
    }),
    ...seoFields(raw.seo, context.language),
  };
}

export function mapPage(raw: RawPage | null, context: MapContext): PageView | null {
  const slug = raw?.slug?.trim();
  const title = pickText(raw?.title, context.language);
  if (!raw || !slug || !title) return null;
  const image = imageFromSanity(raw.image, context.language);
  return {
    slug,
    title,
    summary: pickText(raw.summary, context.language),
    body: blocks(raw.body, context.language),
    image: image?.src ?? '',
    imageAlt: image?.alt ?? title,
    imageSrcSet: image?.srcSet,
    ...seoFields(raw.seo, context.language),
  };
}

export function mapSite(
  raw: RawSiteSettings | null,
  context: MapContext,
  fallback: SiteView,
): SiteView {
  if (!raw) {
    return {
      ...fallback,
      source: 'sanity',
      contact: { whatsapp: '', phone: '', email: '', address: '', mapUrl: '' },
      social: { instagram: '', facebook: '', youtube: '' },
      footerText: '',
    };
  }

  const seoImage = imageFromSanity(raw.seo?.image, context.language);
  return {
    brandName: pickText(raw.name, context.language) || fallback.brandName,
    tagline: pickText(raw.description, context.language) || fallback.tagline,
    shortDescription: pickText(raw.description, context.language) || fallback.shortDescription,
    footerText: pickText(raw.footerText, context.language),
    contact: {
      whatsapp: raw.whatsapp?.replace(/\D/g, '') ?? '',
      phone: raw.phone?.trim() ?? '',
      email: raw.email?.trim() ?? '',
      address: raw.address?.trim() ?? '',
      mapUrl: raw.mapUrl?.trim() ?? '',
    },
    social: {
      instagram: raw.instagram?.trim() ?? '',
      facebook: raw.facebook?.trim() ?? '',
      youtube: raw.youtube?.trim() ?? '',
    },
    bookingTemplate: pickText(raw.enquiryTemplate, context.language) || fallback.bookingTemplate,
    seoTitle:
      pickText(raw.seo?.title, context.language) ||
      pickText(raw.name, context.language) ||
      fallback.seoTitle,
    seoDescription: pickText(raw.seo?.description, context.language) || fallback.seoDescription,
    seoImage: seoImage?.src,
    source: 'sanity',
  };
}

function rail(
  id: 'darshan' | 'desert' | 'tour' | 'stay',
  raw: RawHomePayload | null,
  context: MapContext,
): CardView[] {
  const catalog = catalogs.find((item) => item.id === id);
  if (catalog?.home !== 'rail') return [];
  const pinned = raw?.home?.[catalog.featuredKey];
  const flagged = raw?.[catalog.featuredKey];
  const chosen = (pinned ?? []).some((item) => item.slug) ? pinned : flagged;
  return cards(chosen, context, catalog);
}

export function mapHome(raw: RawHomePayload | null, context: MapContext): HomeView {
  const home = raw?.home;
  const image = imageFromSanity(home?.heroImage, context.language);
  return {
    heroImage: image?.src ?? context.fallbackHero ?? '',
    heroImageAlt: image?.alt.trim() ? image.alt : undefined,
    heroImageSrcSet: image?.srcSet,
    featuredDarshan: rail('darshan', raw, context),
    featuredDesert: rail('desert', raw, context),
    featuredTours: rail('tour', raw, context),
    featuredStays: rail('stay', raw, context),
  };
}

export function mapHistory(
  raw: RawHistory | null,
  context: MapContext,
  fallbackImage: string,
): HistoryView | null {
  if (!raw) return null;
  const image = imageFromSanity(raw.heroImage, context.language);
  return {
    intro: {
      title: pickText(raw.introTitle, context.language),
      subtitle: pickText(raw.introSubtitle, context.language),
    },
    heroImage: image?.src ?? fallbackImage,
    heroImageAlt: image?.alt ?? pickText(raw.introTitle, context.language),
    blocks: (raw.blocks ?? []).flatMap((block, index) => {
      const title = pickText(block.title, context.language);
      if (!title) return [];
      return [
        {
          id: `${String(index)}-${title}`,
          year: pickText(block.year, context.language),
          title,
          body: pickText(block.body, context.language),
        },
      ];
    }),
  };
}

export function mapWork(raw: RawWork, context: MapContext): WorkView | null {
  const title = pickText(raw.title, context.language);
  if (!title) return null;
  const image = imageFromSanity(raw.image, context.language);
  return {
    id: raw._id,
    title,
    category: pickText(raw.category, context.language),
    description: pickText(raw.summary, context.language),
    image: image?.src ?? '',
    imageAlt: image?.alt ?? title,
    imageSrcSet: image?.srcSet,
    date: raw.dateLabel?.trim() ?? '',
  };
}

export function mapTestimonial(raw: RawTestimonial, context: MapContext): TestimonialView | null {
  const quote = pickText(raw.quote, context.language);
  if (!quote) return null;
  return {
    id: raw._id,
    quote,
    name: raw.name?.trim() ?? '',
    detail: pickText(raw.detail, context.language),
  };
}

export function mapFaq(raw: RawFaq, context: MapContext): FaqView | null {
  const question = pickText(raw.question, context.language);
  const answer = pickText(raw.answer, context.language);
  if (!question || !answer) return null;
  return { id: raw._id, question, answer };
}
