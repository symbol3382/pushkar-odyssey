import { useEffect } from 'react';
import { siteOrigin } from '../lib/sanity/config';

interface SeoProps {
  title: string;
  description?: string;
  path: string;
  image?: string;
  jsonLd?: Record<string, unknown> | null;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

function upsertCanonical(href: string | null) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.append(element);
  }
  element.href = href;
}

export function Seo({ title, description = '', path, image, jsonLd }: SeoProps) {
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }

    const origin = siteOrigin();
    const canonical = origin ? `${origin}${path}` : null;
    upsertCanonical(canonical);
    if (canonical) upsertMeta('property', 'og:url', canonical);

    const scriptId = 'page-jsonld';
    document.getElementById(scriptId)?.remove();
    if (serializedJsonLd) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = serializedJsonLd;
      document.head.append(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [description, image, path, serializedJsonLd, title]);

  return null;
}
