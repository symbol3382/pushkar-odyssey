import { useCallback, useMemo } from 'react';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { home as homeMeta } from '../content/home';
import { history as historyMeta } from '../content/history';
import { images } from '../content/images';
import { poojas as poojaMeta } from '../content/poojas';
import { services as serviceMeta } from '../content/services';
import { site as siteMeta } from '../content/site';
import { stays as stayMeta } from '../content/stays';
import { tours as tourMeta } from '../content/tours';
import type {
  HistoryBlock,
  PoojaPackage,
  ServiceItem,
  StayPackage,
  TourPackage,
  WorkItem,
} from '../content/types';
import { works as worksMeta } from '../content/works';
import type {
  CardView,
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
} from '../content/views';
import { mediaFromSrc } from '../lib/sanity/images';
import { pickText } from '../lib/sanity/locale';
import {
  getDestinationBySlug,
  getDestinations,
  getExperienceBySlug,
  getExperiences,
  getFaqs,
  getHistory,
  getHome,
  getHotelBySlug,
  getHotels,
  getPageBySlug,
  getPoojaBySlug,
  getPoojas,
  getSiteSettings,
  getTestimonials,
  getTravelPackageBySlug,
  getTravelPackages,
  getWorks,
} from '../lib/sanity/content';
import type { MapContext } from '../lib/sanity/map';
import {
  mapDestination,
  mapExperience,
  mapFaq,
  mapHistory,
  mapHome,
  mapPage,
  mapPooja,
  mapSite,
  mapStay,
  mapTestimonial,
  mapTour,
  mapWork,
  mapCard,
} from '../lib/sanity/map';
import { useContentQuery, type ContentQuery } from './useContentQuery';

function tArray(t: TFunction, key: string): string[] {
  const value = t(key, { returnObjects: true, defaultValue: [] });
  return Array.isArray(value) ? (value as string[]) : [];
}

function useMapContext(): MapContext {
  const { t, i18n } = useTranslation('common');
  return {
    language: i18n.resolvedLanguage ?? i18n.language,
    fromLabel: t('pages.startingFrom'),
    durationLabel: (days, nights) => t('pages.durationNights', { days, nights }),
    dayLabel: (day) => t('pages.dayNumber', { day }),
    fallbackHero: images.homeHero,
  };
}

function cardFrom(
  base: string,
  item: {
    slug: string;
    title: string;
    summary: string;
    image: string;
    priceLabel?: string;
    meta?: string;
  },
): CardView {
  return {
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    image: item.image,
    imageAlt: item.title,
    priceLabel: item.priceLabel ?? null,
    meta: item.meta,
    to: `${base}/${item.slug}`,
  };
}

function useLocalSite(): SiteView {
  const { t } = useTranslation('content');
  return {
    brandName: t('site.brandName'),
    tagline: t('site.tagline'),
    shortDescription: t('site.shortDescription'),
    footerText: '',
    logo: null,
    favicon: null,
    contact: siteMeta.contact,
    social: siteMeta.social,
    bookingTemplate: t('site.bookingTemplate'),
    seoTitle: t('site.brandName'),
    seoDescription: t('site.shortDescription'),
    source: 'local',
  };
}

function useLocalTours(): TourView[] {
  const { t } = useTranslation('content');
  return useMemo(
    () =>
      tourMeta.map((tour) => {
        const title = t(`tours.${tour.slug}.title`);
        const view = localTour(tour, {
          title,
          summary: t(`tours.${tour.slug}.summary`),
          description: t(`tours.${tour.slug}.description`),
          duration: t(`tours.${tour.slug}.duration`),
          priceLabel: t(`tours.${tour.slug}.priceLabel`),
          inclusions: tArray(t, `tours.${tour.slug}.inclusions`),
          itinerary: itinerary(t, `tours.${tour.slug}.itinerary`),
        });
        return view;
      }),
    [t],
  );
}

function itinerary(t: TFunction, key: string): TourPackage['itinerary'] {
  const value = t(key, { returnObjects: true, defaultValue: [] });
  if (!Array.isArray(value)) return [];
  return value as TourPackage['itinerary'];
}

function localTour(
  tour: TourPackage,
  copy: {
    title: string;
    summary: string;
    description: string;
    duration: string;
    priceLabel: string;
    inclusions: string[];
    itinerary: TourPackage['itinerary'];
  },
): TourView {
  return {
    ...cardFrom('/tours', { ...tour, ...copy, image: tour.image, meta: copy.duration }),
    description: copy.description,
    body: null,
    gallery: tour.gallery.map((src) => mediaFromSrc(src, copy.title)),
    inclusions: copy.inclusions,
    exclusions: [],
    destinations: [],
    languages: [],
    itinerary: copy.itinerary.map((stop) => ({
      day: stop.day,
      title: stop.title,
      details: stop.details,
    })),
  };
}

function useLocalStays(): StayView[] {
  const { t } = useTranslation('content');
  return useMemo(
    () =>
      stayMeta.map((stay) =>
        localStay(stay, {
          title: t(`stays.${stay.slug}.title`),
          summary: t(`stays.${stay.slug}.summary`),
          description: t(`stays.${stay.slug}.description`),
          duration: t(`stays.${stay.slug}.duration`),
          priceLabel: t(`stays.${stay.slug}.priceLabel`),
          location: t(`stays.${stay.slug}.location`),
          inclusions: tArray(t, `stays.${stay.slug}.inclusions`),
          amenities: tArray(t, `stays.${stay.slug}.amenities`),
        }),
      ),
    [t],
  );
}

function localStay(
  stay: StayPackage,
  copy: {
    title: string;
    summary: string;
    description: string;
    duration: string;
    priceLabel: string;
    location: string;
    inclusions: string[];
    amenities: string[];
  },
): StayView {
  return {
    ...cardFrom('/stays', { ...stay, ...copy, image: stay.image, meta: copy.location }),
    description: copy.description,
    body: null,
    gallery: stay.gallery.map((src) => mediaFromSrc(src, copy.title)),
    inclusions: copy.inclusions,
    amenities: copy.amenities,
    location: copy.location,
    address: copy.location,
  };
}

function useLocalPoojas(): PoojaView[] {
  const { t } = useTranslation('content');
  return useMemo(
    () =>
      poojaMeta.map((pooja) =>
        localPooja(pooja, {
          title: t(`poojas.${pooja.slug}.title`),
          summary: t(`poojas.${pooja.slug}.summary`),
          description: t(`poojas.${pooja.slug}.description`),
          priceLabel: t(`poojas.${pooja.slug}.priceLabel`),
          timing: t(`poojas.${pooja.slug}.timing`),
          inclusions: tArray(t, `poojas.${pooja.slug}.inclusions`),
          suitableFor: tArray(t, `poojas.${pooja.slug}.suitableFor`),
        }),
      ),
    [t],
  );
}

function localPooja(
  pooja: PoojaPackage,
  copy: {
    title: string;
    summary: string;
    description: string;
    priceLabel: string;
    timing: string;
    inclusions: string[];
    suitableFor: string[];
  },
): PoojaView {
  return {
    ...cardFrom('/poojas', { ...pooja, ...copy, image: pooja.image, meta: copy.timing }),
    description: copy.description,
    body: null,
    gallery: pooja.gallery.map((src) => mediaFromSrc(src, copy.title)),
    inclusions: copy.inclusions,
    exclusions: [],
    timing: copy.timing,
    suitableFor: copy.suitableFor,
    languages: [],
  };
}

function useLocalServices(): ExperienceView[] {
  const { t } = useTranslation('content');
  return useMemo(
    () =>
      serviceMeta.map((service) =>
        localService(service, {
          title: t(`services.${service.slug}.title`),
          summary: t(`services.${service.slug}.summary`),
          description: t(`services.${service.slug}.description`),
          priceLabel: t(`services.${service.slug}.priceLabel`),
          inclusions: tArray(t, `services.${service.slug}.inclusions`),
        }),
      ),
    [t],
  );
}

function localService(
  service: ServiceItem,
  copy: {
    title: string;
    summary: string;
    description: string;
    priceLabel: string;
    inclusions: string[];
  },
): ExperienceView {
  return {
    ...cardFrom('/services', { ...service, ...copy, image: service.image }),
    description: copy.description,
    body: null,
    gallery: [],
    inclusions: copy.inclusions,
    exclusions: [],
    languages: [],
  };
}

function useLocalWorks(): WorkView[] {
  const { t } = useTranslation(['content', 'common']);
  return useMemo(
    () =>
      worksMeta.map((work) => {
        const categoryKey = t(`works.${work.id}.category`, { ns: 'content' });
        const title = t(`works.${work.id}.title`, { ns: 'content' });
        return localWork(work, {
          title,
          description: t(`works.${work.id}.description`, { ns: 'content' }),
          category: t(`categories.${categoryKey}`, { ns: 'common', defaultValue: categoryKey }),
        });
      }),
    [t],
  );
}

function localWork(
  work: WorkItem,
  copy: { title: string; description: string; category: string },
): WorkView {
  return {
    id: work.id,
    title: copy.title,
    category: copy.category,
    description: copy.description,
    image: work.image,
    imageAlt: copy.title,
    date: work.date,
  };
}

function useLocalHistory(): HistoryView {
  const { t } = useTranslation('content');
  const blocks: HistoryBlock[] = historyMeta.map((block) => ({
    id: block.id,
    year: t(`history.${block.id}.year`),
    title: t(`history.${block.id}.title`),
    body: t(`history.${block.id}.body`),
  }));
  return {
    intro: { title: t('history.introTitle'), subtitle: t('history.introSubtitle') },
    heroImage: images.historyHero,
    heroImageAlt: t('history.introTitle'),
    blocks,
  };
}

function useLocalHome(tours: TourView[], poojas: PoojaView[], stays: StayView[]): HomeView {
  const { t } = useTranslation('content');
  const pick = <T extends { slug: string }>(slugs: readonly string[], items: T[]) =>
    slugs.flatMap((slug) => {
      const item = items.find((entry) => entry.slug === slug);
      return item ? [item] : [];
    });
  return {
    heroTitle: t('home.heroTitle'),
    heroSubtitle: t('home.heroSubtitle'),
    heroImage: homeMeta.heroImage,
    heroImageAlt: t('home.heroTitle'),
    ctaPrimary: { label: t('home.ctaPrimary'), to: homeMeta.ctaPrimary.to },
    ctaSecondary: { label: t('home.ctaSecondary'), to: homeMeta.ctaSecondary.to },
    featuredTours: pick(homeMeta.featuredTourSlugs, tours),
    featuredPoojas: pick(homeMeta.featuredPoojaSlugs, poojas),
    featuredStays: pick(homeMeta.featuredStaySlugs, stays),
  };
}

export function useLocalizedSite(): ContentQuery<SiteView> {
  const context = useMapContext();
  const fallback = useLocalSite();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getSiteSettings>>) => mapSite(raw, context, fallback),
    [context, fallback],
  );
  return useContentQuery('site', getSiteSettings, select, fallback);
}

export function useLocalizedTours(): ContentQuery<CardView[]> {
  const context = useMapContext();
  const local = useLocalTours();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getTravelPackages>>) =>
      raw.flatMap((item) => {
        const meta =
          pickText(item.durationLabel, context.language) ||
          pickText(item.duration, context.language) ||
          (typeof item.days === 'number' ? context.durationLabel(item.days, item.nights ?? 0) : '');
        const card = mapCard(item, context, '/tours', meta || undefined);
        return card ? [card] : [];
      }),
    [context],
  );
  return useContentQuery('tours', getTravelPackages, select, local);
}

export function useLocalizedTour(slug: string | undefined): ContentQuery<TourView | null> {
  const context = useMapContext();
  const local = useLocalTours().find((item) => item.slug === slug) ?? null;
  const load = useCallback(() => getTravelPackageBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getTravelPackageBySlug>>) => mapTour(raw, context),
    [context],
  );
  return useContentQuery(slug ? `tour:${slug}` : null, slug ? load : null, select, local);
}

export function useLocalizedStays(): ContentQuery<CardView[]> {
  const context = useMapContext();
  const local = useLocalStays();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getHotels>>) =>
      raw.flatMap((item) => {
        const card = mapCard(
          item,
          context,
          '/stays',
          pickText(item.address, context.language) || undefined,
        );
        return card ? [card] : [];
      }),
    [context],
  );
  return useContentQuery('stays', getHotels, select, local);
}

export function useLocalizedStay(slug: string | undefined): ContentQuery<StayView | null> {
  const context = useMapContext();
  const local = useLocalStays().find((item) => item.slug === slug) ?? null;
  const load = useCallback(() => getHotelBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getHotelBySlug>>) => mapStay(raw, context),
    [context],
  );
  return useContentQuery(slug ? `stay:${slug}` : null, slug ? load : null, select, local);
}

export function useLocalizedPoojas(): ContentQuery<CardView[]> {
  const context = useMapContext();
  const local = useLocalPoojas();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getPoojas>>) =>
      raw.flatMap((item) => {
        const card = mapCard(
          item,
          context,
          '/poojas',
          pickText(item.duration, context.language) || undefined,
        );
        return card ? [card] : [];
      }),
    [context],
  );
  return useContentQuery('poojas', getPoojas, select, local);
}

export function useLocalizedPooja(slug: string | undefined): ContentQuery<PoojaView | null> {
  const context = useMapContext();
  const local = useLocalPoojas().find((item) => item.slug === slug) ?? null;
  const load = useCallback(() => getPoojaBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getPoojaBySlug>>) => mapPooja(raw, context),
    [context],
  );
  return useContentQuery(slug ? `pooja:${slug}` : null, slug ? load : null, select, local);
}

export function useLocalizedServices(): ContentQuery<ExperienceView[]> {
  const context = useMapContext();
  const local = useLocalServices();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getExperiences>>) =>
      raw.flatMap((item) => {
        const view = mapExperience(item, context);
        return view ? [view] : [];
      }),
    [context],
  );
  return useContentQuery('experiences', getExperiences, select, local);
}

export function useLocalizedService(slug: string | undefined): ContentQuery<ExperienceView | null> {
  const context = useMapContext();
  const local = useLocalServices().find((item) => item.slug === slug) ?? null;
  const load = useCallback(() => getExperienceBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getExperienceBySlug>>) => mapExperience(raw, context),
    [context],
  );
  return useContentQuery(slug ? `experience:${slug}` : null, slug ? load : null, select, local);
}

export function useLocalizedDestinations(): ContentQuery<CardView[]> {
  const context = useMapContext();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getDestinations>>) =>
      raw.flatMap((item) => {
        const card = mapCard(item, context, '/destinations');
        return card ? [card] : [];
      }),
    [context],
  );
  return useContentQuery('destinations', getDestinations, select, []);
}

export function useLocalizedDestination(
  slug: string | undefined,
): ContentQuery<DestinationView | null> {
  const context = useMapContext();
  const load = useCallback(() => getDestinationBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getDestinationBySlug>>) => mapDestination(raw, context),
    [context],
  );
  return useContentQuery(slug ? `destination:${slug}` : null, slug ? load : null, select, null);
}

export function useLocalizedPage(slug: string | undefined): ContentQuery<PageView | null> {
  const context = useMapContext();
  const load = useCallback(() => getPageBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getPageBySlug>>) => mapPage(raw, context),
    [context],
  );
  return useContentQuery(slug ? `page:${slug}` : null, slug ? load : null, select, null);
}

export function useLocalizedWorks(): ContentQuery<WorkView[]> {
  const context = useMapContext();
  const local = useLocalWorks();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getWorks>>) =>
      raw.flatMap((item) => {
        const work = mapWork(item, context);
        return work ? [work] : [];
      }),
    [context],
  );
  return useContentQuery('works', getWorks, select, local);
}

export function useLocalizedHistory(): ContentQuery<HistoryView | null> {
  const context = useMapContext();
  const local = useLocalHistory();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getHistory>>) => mapHistory(raw, context, images.historyHero),
    [context],
  );
  return useContentQuery('history', getHistory, select, local);
}

export function useLocalizedHome(): ContentQuery<HomeView> {
  const context = useMapContext();
  const tours = useLocalTours();
  const poojas = useLocalPoojas();
  const stays = useLocalStays();
  const fallback = useLocalHome(tours, poojas, stays);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getHome>>) => mapHome(raw, context),
    [context],
  );
  return useContentQuery('home', getHome, select, fallback);
}

export function useLocalizedTestimonials(): ContentQuery<TestimonialView[]> {
  const context = useMapContext();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getTestimonials>>) =>
      raw.flatMap((item) => {
        const view = mapTestimonial(item, context);
        return view ? [view] : [];
      }),
    [context],
  );
  return useContentQuery('testimonials', getTestimonials, select, []);
}

export function useLocalizedFaqs(): ContentQuery<FaqView[]> {
  const context = useMapContext();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getFaqs>>) =>
      raw.flatMap((item) => {
        const view = mapFaq(item, context);
        return view ? [view] : [];
      }),
    [context],
  );
  return useContentQuery('faqs', getFaqs, select, []);
}
