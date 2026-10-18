import { sanityFetch } from './client';
import {
  destinationBySlugQuery,
  destinationsQuery,
  experienceBySlugQuery,
  experiencesQuery,
  faqsQuery,
  historyQuery,
  homeQuery,
  pageBySlugQuery,
  poojaBySlugQuery,
  poojasQuery,
  relatedContentQuery,
  siteSettingsQuery,
  stayBySlugQuery,
  staysQuery,
  testimonialsQuery,
  tourBySlugQuery,
  toursQuery,
  worksQuery,
} from './groq';
import type {
  RawCard,
  RawDestination,
  RawExperience,
  RawFaq,
  RawHistory,
  RawHomePayload,
  RawPage,
  RawPooja,
  RawSiteSettings,
  RawStay,
  RawTestimonial,
  RawTour,
  RawWork,
  RelatedContent,
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

export function getPoojas(): Promise<RawPooja[]> {
  return sanityFetch('poojas', poojasQuery);
}

export async function getFeaturedPoojas(): Promise<RawCard[]> {
  const home = await getHome();
  const pinned = (home.home?.featuredPoojas ?? []).filter((item) => item.slug);
  return pinned.length > 0 ? pinned : home.featuredPoojas;
}

export function getPoojaBySlug(slug: string): Promise<RawPooja | null> {
  return sanityFetch(`pooja:${slug}`, poojaBySlugQuery, { slug });
}

export function getTravelPackages(): Promise<RawTour[]> {
  return sanityFetch('tours', toursQuery);
}

export function getTravelPackageBySlug(slug: string): Promise<RawTour | null> {
  return sanityFetch(`tour:${slug}`, tourBySlugQuery, { slug });
}

export function getHotels(): Promise<RawStay[]> {
  return sanityFetch('stays', staysQuery);
}

export function getHotelBySlug(slug: string): Promise<RawStay | null> {
  return sanityFetch(`stay:${slug}`, stayBySlugQuery, { slug });
}

export function getExperiences(): Promise<RawExperience[]> {
  return sanityFetch('experiences', experiencesQuery);
}

export function getExperienceBySlug(slug: string): Promise<RawExperience | null> {
  return sanityFetch(`experience:${slug}`, experienceBySlugQuery, { slug });
}

export function getDestinations(): Promise<RawDestination[]> {
  return sanityFetch('destinations', destinationsQuery);
}

export function getDestinationBySlug(slug: string): Promise<RawDestination | null> {
  return sanityFetch(`destination:${slug}`, destinationBySlugQuery, { slug });
}

export function getPageBySlug(slug: string): Promise<RawPage | null> {
  return sanityFetch(`page:${slug}`, pageBySlugQuery, { slug });
}

export function getRelatedContent(id: string): Promise<RelatedContent> {
  return sanityFetch(`related:${id}`, relatedContentQuery, { id });
}
