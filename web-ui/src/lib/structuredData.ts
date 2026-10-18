import { siteOrigin } from './sanity/config';
import type { SiteView } from '../content/views';

function withUrl(data: Record<string, unknown>, path: string) {
  const origin = siteOrigin();
  if (origin) data.url = `${origin}${path}`;
  return data;
}

export function pageJsonLd(
  type: string,
  name: string,
  description: string,
  path: string,
): Record<string, unknown> {
  return withUrl(
    {
      '@context': 'https://schema.org',
      '@type': type,
      name,
      description,
    },
    path,
  );
}

export function organizationJsonLd(site: SiteView): Record<string, unknown> | null {
  if (site.source !== 'sanity' || !site.brandName) return null;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.brandName,
  };
  const origin = siteOrigin();
  if (origin) data.url = origin;
  if (site.shortDescription) data.description = site.shortDescription;
  if (site.contact.email) data.email = site.contact.email;
  if (site.contact.phone) data.telephone = site.contact.phone;
  if (site.contact.address) {
    data.address = { '@type': 'PostalAddress', streetAddress: site.contact.address };
  }
  return data;
}
