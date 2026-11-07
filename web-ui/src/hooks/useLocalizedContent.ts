import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { catalogById, type CatalogId } from '../content/catalogs';
import { images } from '../content/images';
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
} from '../content/views';
import {
  getFaqs,
  getHistory,
  getHome,
  getPageBySlug,
  getServiceBySlug,
  getServicesByCategory,
  getSiteSettings,
  getTestimonials,
  getWorks,
} from '../lib/sanity/content';
import type { MapContext } from '../lib/sanity/map';
import {
  mapCatalogCards,
  mapCatalogDetail,
  mapFaq,
  mapHistory,
  mapHome,
  mapPage,
  mapSite,
  mapTestimonial,
  mapWork,
} from '../lib/sanity/map';
import { useContentQuery, type ContentQuery } from './useContentQuery';

const emptyHome: HomeView = {
  heroImages: [],
  featuredDarshan: [],
  featuredDesert: [],
  featuredTours: [],
  featuredStays: [],
};

function useMapContext(): MapContext {
  const { t, i18n } = useTranslation('common');
  return {
    language: i18n.resolvedLanguage ?? i18n.language,
    fromLabel: t('pages.startingFrom'),
    durationLabel: (days, nights) => t('pages.durationNights', { days, nights }),
    dayLabel: (day) => t('pages.dayNumber', { day }),
    optionLabel: (group, value) => t(`catalog.${group}.${value}`, { defaultValue: value }),
  };
}

function useSiteCopy(): SiteView {
  const { t } = useTranslation('content');
  return {
    brandName: t('site.brandName'),
    tagline: t('site.tagline'),
    shortDescription: t('site.shortDescription'),
    footerText: '',
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

export function useLocalizedCatalog(id: CatalogId): ContentQuery<CardView[]> {
  const catalog = catalogById(id);
  const context = useMapContext();
  const load = useCallback(
    () => getServicesByCategory(catalog.categorySlug),
    [catalog.categorySlug],
  );
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getServicesByCategory>>) =>
      mapCatalogCards(raw, catalog, context),
    [catalog, context],
  );
  return useContentQuery(`services:${catalog.categorySlug}`, load, select, []);
}

export function useLocalizedCatalogItem(
  id: CatalogId,
  slug: string | undefined,
): ContentQuery<CatalogDetailView | null> {
  const catalog = catalogById(id);
  const context = useMapContext();
  const load = useCallback(
    () => getServiceBySlug(catalog.categorySlug, slug ?? ''),
    [catalog.categorySlug, slug],
  );
  const select = useCallback(
    (raw: Awaited<ReturnType<typeof getServiceBySlug>>) =>
      mapCatalogDetail(raw, catalog, context),
    [catalog, context],
  );
  return useContentQuery(
    slug ? `service:${catalog.categorySlug}:${slug}` : null,
    slug ? load : null,
    select,
    null,
  );
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
