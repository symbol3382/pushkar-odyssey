import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@sanity/client';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');

function loadEnvFile(name) {
  const file = resolve(root, name);
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] == null || process.env[key] === '') process.env[key] = value;
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');
loadEnvFile('.env.production');

const staticRoutes = [
  '/',
  '/works',
  '/history',
  '/contact',
  '/tours',
  '/stays',
  '/poojas',
  '/services',
  '/destinations',
];
const siteUrl = process.env.VITE_SITE_URL?.trim().replace(/\/$/, '');

if (!siteUrl) {
  console.warn(
    'Sitemap skipped: set VITE_SITE_URL to publish absolute URLs. No domain was invented.',
  );
  process.exit(0);
}

let origin;
try {
  origin = new URL(siteUrl).origin;
} catch {
  console.warn('Sitemap skipped: VITE_SITE_URL is not a valid absolute URL.');
  process.exit(0);
}

const routes = new Set(staticRoutes);
const projectId = process.env.VITE_SANITY_PROJECT_ID?.trim();

if (projectId) {
  try {
    const client = createClient({
      projectId,
      dataset: process.env.VITE_SANITY_DATASET?.trim() || 'production',
      apiVersion: process.env.VITE_SANITY_API_VERSION?.trim() || '2026-02-01',
      useCdn: true,
      perspective: 'published',
    });
    const slugs = await client.fetch(`{
      "tours": *[_type == "travelPackage" && defined(slug.current)].slug.current,
      "stays": *[_type == "stay" && defined(slug.current)].slug.current,
      "poojas": *[_type == "pooja" && defined(slug.current)].slug.current,
      "experiences": *[_type == "experience" && defined(slug.current)].slug.current,
      "destinations": *[_type == "destination" && defined(slug.current)].slug.current,
      "pages": *[_type == "page" && defined(slug.current)].slug.current
    }`);
    const groups = [
      ['tours', '/tours'],
      ['stays', '/stays'],
      ['poojas', '/poojas'],
      ['experiences', '/services'],
      ['destinations', '/destinations'],
      ['pages', '/pages'],
    ];
    for (const [key, base] of groups) {
      const values = slugs[key];
      if (!Array.isArray(values)) continue;
      for (const slug of values) {
        if (typeof slug === 'string' && slug.trim()) routes.add(`${base}/${slug.trim()}`);
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.warn(
      `Sitemap is using fixed routes only. Published slugs could not be read: ${message}`,
    );
  }
} else {
  console.warn('Sitemap is using fixed routes only. VITE_SANITY_PROJECT_ID is not set.');
}

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...routes].map((route) => `  <url><loc>${origin}${route}</loc></url>`).join('\n')}
</urlset>
`;
writeFileSync(resolve(dist, 'sitemap.xml'), body);
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
writeFileSync(resolve(dist, 'robots.txt'), robots);
console.log(`Wrote sitemap with ${String(routes.size)} URLs.`);
