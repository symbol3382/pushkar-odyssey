import { sanityFetch } from './client';
import {
  faqsQuery,
  historyQuery,
  homeQuery,
  pageBySlugQuery,
  serviceBySlugQuery,
  servicesByCategoryQuery,
  siteSettingsQuery,
  testimonialsQuery,
  worksQuery,
} from './groq';
import type {
  RawCatalog,
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

export function getServicesByCategory(categorySlug: string): Promise<RawCatalog[]> {
  return sanityFetch(`services:${categorySlug}`, servicesByCategoryQuery(), { categorySlug });
}

export function getServiceBySlug(
  categorySlug: string,
  slug: string,
): Promise<RawCatalog | null> {
  return sanityFetch(`service:${categorySlug}:${slug}`, serviceBySlugQuery(), {
    categorySlug,
    slug,
  });
}

export function getPageBySlug(slug: string): Promise<RawPage | null> {
  return sanityFetch(`page:${slug}`, pageBySlugQuery, { slug });
}
