import type { PortableTextBlock } from '@portabletext/types';
import type {
  CardView,
  ContentLink,
  DestinationView,
  ExperienceView,
  FaqView,
  HistoryView,
  HomeView,
  PageView,
  PoojaView,
  SiteView,
  StayView,
  TestimonialView,
  TourView,
  WorkView,
} from '../../content/views';
import { imageFromSanity, type Media } from './images';
import { pickLocale, pickText } from './locale';
import { formatStartingPrice } from './price';
import type {
  LocaleBlocks,
  LocaleString,
  RawCard,
  RawCoordinates,
  RawDestination,
  RawExperience,
  RawFaq,
  RawHistory,
  RawHomePayload,
  RawPage,
  RawPooja,
  RawSeo,
  RawSiteSettings,
  RawStay,
  RawTestimonial,
  RawTour,
  RawWork,
  SanityImage,
} from './types';

export interface MapContext {
  language: string;
  fromLabel: string;
  durationLabel: (days: number, nights: number) => string;
  dayLabel: (day: number) => string;
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

function link(
  ref: { title?: LocaleString | null; slug?: string | null } | null | undefined,
  language: string,
  base: string,
): ContentLink | undefined {
  const slug = ref?.slug?.trim();
  const title = pickText(ref?.title, language);
  if (!slug || !title) return undefined;
  return { title, to: `${base}/${slug}` };
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
  };
}

function cards(
  items: RawCard[] | null | undefined,
  context: MapContext,
  base: string,
  metaFor?: (item: RawCard) => string | undefined,
): CardView[] {
  if (!items) return [];
  return items.flatMap((item) => {
    const card = mapCard(item, context, base, metaFor?.(item));
    return card ? [card] : [];
  });
}

export function mapPooja(raw: RawPooja | null, context: MapContext): PoojaView | null {
  const card = mapCard(
    raw,
    context,
    '/poojas',
    pickText(raw?.duration, context.language) || undefined,
  );
  if (!raw || !card) return null;
  return {
    ...card,
    description: pickText(raw.summary, context.language),
    body: blocks(raw.description, context.language),
    gallery: gallery(raw.gallery, context.language),
    inclusions: texts(raw.included, context.language),
    exclusions: texts(raw.excluded, context.language),
    timing: pickText(raw.duration, context.language) || undefined,
    suitableFor: [],
    preparation: pickText(raw.preparation, context.language) || undefined,
    languages: (raw.languages ?? []).filter((item) => item.trim().length > 0),
    enquiryNote: pickText(raw.enquiryNote, context.language) || undefined,
    destination: link(raw.destination, context.language, '/destinations'),
    category: pickText(raw.category, context.language) || undefined,
    ...seoFields(raw.seo, context.language),
  };
}

export function mapTour(raw: RawTour | null, context: MapContext): TourView | null {
  const card = mapCard(raw, context, '/tours', raw ? durationOf(raw, context) : undefined);
  if (!raw || !card) return null;
  return {
    ...card,
    description: pickText(raw.summary, context.language),
    body: blocks(raw.description, context.language),
    gallery: gallery(raw.gallery, context.language),
    inclusions: texts(raw.included, context.language),
    exclusions: texts(raw.excluded, context.language),
    startingLocation: pickText(raw.startingLocation, context.language) || undefined,
    destinations: (raw.destinations ?? []).flatMap((item) => {
      const mapped = link(item, context.language, '/destinations');
      return mapped ? [mapped] : [];
    }),
    transport: pickText(raw.transport, context.language) || undefined,
    accommodation: pickText(raw.accommodation, context.language) || undefined,
    languages: (raw.languages ?? []).filter((item) => item.trim().length > 0),
    minGroup: raw.minGroup ?? undefined,
    maxGroup: raw.maxGroup ?? undefined,
    season: pickText(raw.season, context.language) || undefined,
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

export function mapStay(raw: RawStay | null, context: MapContext): StayView | null {
  const location = pickText(raw?.address, context.language);
  const card = mapCard(raw, context, '/stays', location || undefined);
  if (!raw || !card) return null;
  return {
    ...card,
    description: pickText(raw.summary, context.language),
    body: blocks(raw.description, context.language),
    gallery: gallery(raw.gallery, context.language),
    inclusions: texts(raw.included, context.language),
    amenities: texts(raw.amenities, context.language),
    location: location || undefined,
    address: location || undefined,
    mapUrl: mapUrl(raw.coordinates),
    accommodationType: raw.accommodationType ?? undefined,
    rooms: pickText(raw.rooms, context.language) || undefined,
    enquiryNote: pickText(raw.enquiryNote, context.language) || undefined,
    destination: link(raw.destination, context.language, '/destinations'),
    ...seoFields(raw.seo, context.language),
  };
}

export function mapExperience(
  raw: RawExperience | null,
  context: MapContext,
): ExperienceView | null {
  const location = pickText(raw?.location, context.language);
  const card = mapCard(
    raw,
    context,
    '/services',
    pickText(raw?.duration, context.language) || location || undefined,
  );
  if (!raw || !card) return null;
  return {
    ...card,
    description: pickText(raw.summary, context.language),
    body: blocks(raw.description, context.language),
    gallery: gallery(raw.gallery, context.language),
    inclusions: texts(raw.included, context.language),
    exclusions: texts(raw.excluded, context.language),
    experienceType: raw.experienceType ?? undefined,
    location: location || undefined,
    duration: pickText(raw.duration, context.language) || undefined,
    languages: (raw.languages ?? []).filter((item) => item.trim().length > 0),
    requirements: pickText(raw.requirements, context.language) || undefined,
    enquiryNote: pickText(raw.enquiryNote, context.language) || undefined,
    destination: link(raw.destination, context.language, '/destinations'),
    ...seoFields(raw.seo, context.language),
  };
}

export function mapDestination(
  raw: RawDestination | null,
  context: MapContext,
): DestinationView | null {
  const region = pickText(raw?.region, context.language);
  const card = mapCard(raw, context, '/destinations', region || undefined);
  if (!raw || !card) return null;
  return {
    ...card,
    description: pickText(raw.summary, context.language),
    body: blocks(raw.description, context.language),
    gallery: gallery(raw.gallery, context.language),
    region: region || undefined,
    mapUrl: mapUrl(raw.coordinates),
    visiting: pickText(raw.visiting, context.language) || undefined,
    relatedPoojas: cards(
      raw.relatedPoojas,
      context,
      '/poojas',
      (item) => pickText(item.duration, context.language) || undefined,
    ),
    relatedTours: cards(raw.relatedTours, context, '/tours', (item) => durationOf(item, context)),
    relatedExperiences: cards(raw.relatedExperiences, context, '/services'),
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

  const logo = imageFromSanity(raw.logo, context.language);
  const favicon = imageFromSanity(raw.favicon, context.language);
  const seoImage = imageFromSanity(raw.seo?.image, context.language);
  return {
    brandName: pickText(raw.name, context.language) || fallback.brandName,
    tagline: pickText(raw.description, context.language) || fallback.tagline,
    shortDescription: pickText(raw.description, context.language) || fallback.shortDescription,
    footerText: pickText(raw.footerText, context.language),
    logo,
    favicon,
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

export function mapHome(raw: RawHomePayload | null, context: MapContext): HomeView {
  const home = raw?.home;
  const image = imageFromSanity(home?.heroImage, context.language);
  const tours = featured(home?.featuredTours, raw?.featuredTours, context, '/tours', (item) =>
    durationOf(item, context),
  );
  const poojas = featured(
    home?.featuredPoojas,
    raw?.featuredPoojas,
    context,
    '/poojas',
    (item) => pickText(item.duration, context.language) || undefined,
  );
  const stays = featured(
    home?.featuredStays,
    raw?.featuredStays,
    context,
    '/stays',
    (item) => pickText(item.address, context.language) || undefined,
  );
  return {
    heroTitle: pickText(home?.heroTitle, context.language),
    heroSubtitle: pickText(home?.heroSubtitle, context.language),
    heroImage: image?.src ?? context.fallbackHero ?? '',
    heroImageAlt: image?.alt ?? pickText(home?.heroTitle, context.language),
    heroImageSrcSet: image?.srcSet,
    ctaPrimary: {
      label: pickText(home?.primaryCta?.label, context.language),
      to: home?.primaryCta?.path?.startsWith('/') ? home.primaryCta.path : '/tours',
    },
    ctaSecondary: {
      label: pickText(home?.secondaryCta?.label, context.language),
      to: home?.secondaryCta?.path?.startsWith('/') ? home.secondaryCta.path : '/poojas',
    },
    featuredTours: tours,
    featuredPoojas: poojas,
    featuredStays: stays,
  };
}

function featured(
  pinned: RawCard[] | null | undefined,
  flagged: RawCard[] | null | undefined,
  context: MapContext,
  base: string,
  metaFor: (item: RawCard) => string | undefined,
): CardView[] {
  const chosen = (pinned ?? []).some((item) => item.slug) ? pinned : flagged;
  return cards(chosen, context, base, metaFor);
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
