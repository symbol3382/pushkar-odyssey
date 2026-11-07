import { sanityFetch } from './client';
import {
  catalogBySlugQuery,
  catalogListQuery,
  categoryPageQuery,
  faqsQuery,
  historyQuery,
  homeQuery,
  pageBySlugQuery,
  siteSettingsQuery,
  testimonialsQuery,
  worksQuery,
} from './groq';
import type {
  RawCatalog,
  RawCategoryPage,
  RawFaq,
  RawHistory,
  RawHomePayload,
  RawPage,
  RawSiteSettings,
  RawTestimonial,
  RawWork,
} from './types';

export function getSiteSettings(): Promise<RawSiteSettings | null> {
  return sanityFetch('site', siteSettingsQuery);
}

export function getHome(): Promise<RawHomePayload> {
  return sanityFetch('home', homeQuery);
}

export function getHistory(): Promise<RawHistory | null> {
  return sanityFetch('history', historyQuery);
}

export function getWorks(): Promise<RawWork[]> {
  return sanityFetch('works', worksQuery);
}

export function getTestimonials(): Promise<RawTestimonial[]> {
  return sanityFetch('testimonials', testimonialsQuery);
}

export function getFaqs(): Promise<RawFaq[]> {
  return sanityFetch('faqs', faqsQuery);
}

export function getCatalog(documentType: string): Promise<RawCatalog[]> {
  return sanityFetch(documentType, catalogListQuery(documentType));
}

export function getCatalogBySlug(documentType: string, slug: string): Promise<RawCatalog | null> {
  return sanityFetch(`${documentType}:${slug}`, catalogBySlugQuery(documentType), { slug });
}

export function getPageBySlug(slug: string): Promise<RawPage | null> {
  return sanityFetch(`page:${slug}`, pageBySlugQuery, { slug });
}

export function getCategoryPage(category: string): Promise<RawCategoryPage | null> {
  return sanityFetch(`categoryPage:${category}`, categoryPageQuery, { category });
}
