import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { images } from '../content/images';
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
  mapCard,
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
} from '../lib/sanity/map';
import { useContentQuery, type ContentQuery } from './useContentQuery';

const emptyHome: HomeView = {
  heroTitle: '',
  heroSubtitle: '',
  heroImage: '',
  heroImageAlt: '',
  ctaPrimary: { label: '', to: '/tours' },
  ctaSecondary: { label: '', to: '/poojas' },
  featuredTours: [],
  featuredPoojas: [],
  featuredStays: [],
};

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

function useSiteCopy(): SiteView {
  const { t } = useTranslation('content');
  return {
    brandName: t('site.brandName'),
    tagline: t('site.tagline'),
    shortDescription: t('site.shortDescription'),
    footerText: '',
    logo: null,
    favicon: null,
    contact: { whatsapp: '', phone: '', email: '', address: '', mapUrl: '' },
    social: { instagram: '', facebook: '', youtube: '' },
    bookingTemplate: t('site.bookingTemplate'),
    seoTitle: t('site.brandName'),
    seoDescription: t('site.shortDescription'),
    source: 'local',
  };
}

export function useLocalizedSite(): ContentQuery<SiteView> {
  const context = useMapContext();
  const copy = useSiteCopy();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getSiteSettings>>) => mapSite(raw, context, copy),
    [context, copy],
  );
  return useContentQuery('site', getSiteSettings, select, copy);
}

export function useLocalizedTours(): ContentQuery<CardView[]> {
  const context = useMapContext();
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
  return useContentQuery('tours', getTravelPackages, select, []);
}

export function useLocalizedTour(slug: string | undefined): ContentQuery<TourView | null> {
  const context = useMapContext();
  const load = useCallback(() => getTravelPackageBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getTravelPackageBySlug>>) => mapTour(raw, context),
    [context],
  );
  return useContentQuery(slug ? `tour:${slug}` : null, slug ? load : null, select, null);
}

export function useLocalizedStays(): ContentQuery<CardView[]> {
  const context = useMapContext();
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
  return useContentQuery('stays', getHotels, select, []);
}

export function useLocalizedStay(slug: string | undefined): ContentQuery<StayView | null> {
  const context = useMapContext();
  const load = useCallback(() => getHotelBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getHotelBySlug>>) => mapStay(raw, context),
    [context],
  );
  return useContentQuery(slug ? `stay:${slug}` : null, slug ? load : null, select, null);
}

export function useLocalizedPoojas(): ContentQuery<CardView[]> {
  const context = useMapContext();
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
  return useContentQuery('poojas', getPoojas, select, []);
}

export function useLocalizedPooja(slug: string | undefined): ContentQuery<PoojaView | null> {
  const context = useMapContext();
  const load = useCallback(() => getPoojaBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getPoojaBySlug>>) => mapPooja(raw, context),
    [context],
  );
  return useContentQuery(slug ? `pooja:${slug}` : null, slug ? load : null, select, null);
}

export function useLocalizedServices(): ContentQuery<ExperienceView[]> {
  const context = useMapContext();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getExperiences>>) =>
      raw.flatMap((item) => {
        const view = mapExperience(item, context);
        return view ? [view] : [];
      }),
    [context],
  );
  return useContentQuery('experiences', getExperiences, select, []);
}

export function useLocalizedService(slug: string | undefined): ContentQuery<ExperienceView | null> {
  const context = useMapContext();
  const load = useCallback(() => getExperienceBySlug(slug ?? ''), [slug]);
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getExperienceBySlug>>) => mapExperience(raw, context),
    [context],
  );
  return useContentQuery(slug ? `experience:${slug}` : null, slug ? load : null, select, null);
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
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getWorks>>) =>
      raw.flatMap((item) => {
        const work = mapWork(item, context);
        return work ? [work] : [];
      }),
    [context],
  );
  return useContentQuery('works', getWorks, select, []);
}

export function useLocalizedHistory(): ContentQuery<HistoryView | null> {
  const context = useMapContext();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getHistory>>) => mapHistory(raw, context, images.historyHero),
    [context],
  );
  return useContentQuery('history', getHistory, select, null);
}

export function useLocalizedHome(): ContentQuery<HomeView> {
  const context = useMapContext();
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getHome>>) => mapHome(raw, context),
    [context],
  );
  return useContentQuery('home', getHome, select, emptyHome);
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
