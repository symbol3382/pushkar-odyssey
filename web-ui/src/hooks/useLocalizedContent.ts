import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { home as homeMeta } from '../content/home';
import { history as historyMeta } from '../content/history';
import { poojas as poojaMeta } from '../content/poojas';
import { services as serviceMeta } from '../content/services';
import { site as siteMeta } from '../content/site';
import { stays as stayMeta } from '../content/stays';
import { tours as tourMeta } from '../content/tours';
import { works as worksMeta } from '../content/works';
import type {
  HistoryBlock,
  PoojaPackage,
  ServiceItem,
  StayPackage,
  TourPackage,
  WorkItem,
} from '../content/types';

function tArray(t: TFunction, key: string): string[] {
  const value = t(key, { returnObjects: true, defaultValue: [] });
  return Array.isArray(value) ? (value as string[]) : [];
}

function tItinerary(t: TFunction, key: string): TourPackage['itinerary'] {
  const value = t(key, { returnObjects: true, defaultValue: [] });
  if (!Array.isArray(value)) return [];
  return value as TourPackage['itinerary'];
}

export function useLocalizedSite() {
  const { t } = useTranslation('content');
  return {
    brandName: t('site.brandName'),
    tagline: t('site.tagline'),
    shortDescription: t('site.shortDescription'),
    address: t('site.address'),
    bookingTemplate: t('site.bookingTemplate'),
    contact: siteMeta.contact,
    social: siteMeta.social,
  };
}

export function useLocalizedHome() {
  const { t } = useTranslation('content');
  return {
    heroTitle: t('home.heroTitle'),
    heroSubtitle: t('home.heroSubtitle'),
    heroImage: homeMeta.heroImage,
    ctaPrimary: { label: t('home.ctaPrimary'), to: homeMeta.ctaPrimary.to },
    ctaSecondary: { label: t('home.ctaSecondary'), to: homeMeta.ctaSecondary.to },
    featuredTourSlugs: homeMeta.featuredTourSlugs,
    featuredPoojaSlugs: homeMeta.featuredPoojaSlugs,
    featuredStaySlugs: homeMeta.featuredStaySlugs,
  };
}

export function useLocalizedTours(): TourPackage[] {
  const { t } = useTranslation('content');
  return tourMeta.map((tour) => ({
    ...tour,
    title: t(`tours.${tour.slug}.title`),
    summary: t(`tours.${tour.slug}.summary`),
    description: t(`tours.${tour.slug}.description`),
    duration: t(`tours.${tour.slug}.duration`),
    priceLabel: t(`tours.${tour.slug}.priceLabel`),
    inclusions: tArray(t, `tours.${tour.slug}.inclusions`),
    itinerary: tItinerary(t, `tours.${tour.slug}.itinerary`),
  }));
}

export function useLocalizedTour(slug: string | undefined): TourPackage | undefined {
  const tours = useLocalizedTours();
  if (!slug) return undefined;
  return tours.find((item) => item.slug === slug);
}

export function useLocalizedStays(): StayPackage[] {
  const { t } = useTranslation('content');
  return stayMeta.map((stay) => ({
    ...stay,
    title: t(`stays.${stay.slug}.title`),
    summary: t(`stays.${stay.slug}.summary`),
    description: t(`stays.${stay.slug}.description`),
    duration: t(`stays.${stay.slug}.duration`),
    priceLabel: t(`stays.${stay.slug}.priceLabel`),
    location: t(`stays.${stay.slug}.location`),
    inclusions: tArray(t, `stays.${stay.slug}.inclusions`),
    amenities: tArray(t, `stays.${stay.slug}.amenities`),
  }));
}

export function useLocalizedStay(slug: string | undefined): StayPackage | undefined {
  const stays = useLocalizedStays();
  if (!slug) return undefined;
  return stays.find((item) => item.slug === slug);
}

export function useLocalizedPoojas(): PoojaPackage[] {
  const { t } = useTranslation('content');
  return poojaMeta.map((pooja) => ({
    ...pooja,
    title: t(`poojas.${pooja.slug}.title`),
    summary: t(`poojas.${pooja.slug}.summary`),
    description: t(`poojas.${pooja.slug}.description`),
    duration: t(`poojas.${pooja.slug}.duration`),
    priceLabel: t(`poojas.${pooja.slug}.priceLabel`),
    timing: t(`poojas.${pooja.slug}.timing`),
    inclusions: tArray(t, `poojas.${pooja.slug}.inclusions`),
    suitableFor: tArray(t, `poojas.${pooja.slug}.suitableFor`),
  }));
}

export function useLocalizedPooja(slug: string | undefined): PoojaPackage | undefined {
  const poojas = useLocalizedPoojas();
  if (!slug) return undefined;
  return poojas.find((item) => item.slug === slug);
}

export function useLocalizedServices(): ServiceItem[] {
  const { t } = useTranslation('content');
  return serviceMeta.map((service) => ({
    ...service,
    title: t(`services.${service.slug}.title`),
    summary: t(`services.${service.slug}.summary`),
    description: t(`services.${service.slug}.description`),
    priceLabel: t(`services.${service.slug}.priceLabel`),
    inclusions: tArray(t, `services.${service.slug}.inclusions`),
  }));
}

export function useLocalizedWorks(): WorkItem[] {
  const { t } = useTranslation(['content', 'common']);
  return worksMeta.map((work) => {
    const categoryKey = t(`works.${work.id}.category`, { ns: 'content' });
    return {
      ...work,
      title: t(`works.${work.id}.title`, { ns: 'content' }),
      description: t(`works.${work.id}.description`, { ns: 'content' }),
      category: t(`categories.${categoryKey}`, {
        ns: 'common',
        defaultValue: categoryKey,
      }),
    };
  });
}

export function useLocalizedHistory() {
  const { t } = useTranslation('content');
  const blocks: HistoryBlock[] = historyMeta.map((block) => ({
    id: block.id,
    year: t(`history.${block.id}.year`),
    title: t(`history.${block.id}.title`),
    body: t(`history.${block.id}.body`),
  }));
  return {
    intro: {
      title: t('history.introTitle'),
      subtitle: t('history.introSubtitle'),
    },
    blocks,
  };
}
