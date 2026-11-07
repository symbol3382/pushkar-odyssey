const image = `{
  crop,
  hotspot,
  asset
}`;

const card = `{
  _id,
  "slug": slug.current,
  title,
  summary,
  featuredImage ${image},
  price,
  featured,
  days,
  nights,
  durationLabel,
  kind,
  visitFocus,
  stayStyle,
  seasonal,
  when
}`;

const detail = `{
  _id,
  "slug": slug.current,
  title,
  summary,
  description,
  featuredImage ${image},
  gallery[] ${image},
  price,
  included,
  excluded,
  notes[]{ question, answer },
  highlights,
  programFlow,
  enquiryNote,
  durationLabel,
  days,
  nights,
  startTime,
  kind,
  visitFocus,
  stayStyle,
  format,
  seasonal,
  when,
  itinerary[]{
    dayNumber,
    heading,
    description,
    location,
    image ${image}
  },
  seo {
    title,
    description,
    image ${image}
  }
}`;

const seo = `{
  title,
  description,
  image ${image}
}`;

const knownTypes = new Set([
  'darshan',
  'culturalProgram',
  'tourPackage',
  'event',
  'bestSeller',
]);

function assertType(documentType: string) {
  if (!knownTypes.has(documentType)) throw new Error(`Unknown document type ${documentType}`);
}

export function catalogListQuery(documentType: string) {
  assertType(documentType);
  return `*[_type == "${documentType}"] | order(sortOrder asc, title.en asc) ${card}`;
}

export function catalogBySlugQuery(documentType: string) {
  assertType(documentType);
  return `*[_type == "${documentType}" && slug.current == $slug][0]${detail}`;
}

export function featuredByTypeQuery(documentType: string) {
  assertType(documentType);
  return `*[_type == "${documentType}" && featured == true] | order(sortOrder asc, title.en asc) ${card}`;
}

export const siteSettingsQuery = `*[_id == "siteSettings"][0]{
  name,
  description,
  email,
  phone,
  whatsapp,
  address,
  mapUrl,
  instagram,
  facebook,
  youtube,
  footerText,
  enquiryTemplate,
  seo ${seo}
}`;

export const homeQuery = `{
  "home": *[_id == "homePage"][0]{
    "heroImages": select(
      count(heroImages) > 0 => heroImages[] ${image},
      defined(heroImage) => [heroImage ${image}],
      []
    )
  },
  "featuredDarshan": *[_type == "darshan" && featured == true] | order(sortOrder asc, title.en asc) ${card},
  "featuredCultural": *[_type == "culturalProgram" && featured == true] | order(sortOrder asc, title.en asc) ${card},
  "featuredTours": *[_type == "tourPackage" && featured == true] | order(sortOrder asc, title.en asc) ${card},
  "featuredEvents": *[_type == "event" && featured == true] | order(sortOrder asc, title.en asc) ${card},
  "featuredBestsellers": *[_type == "bestSeller" && featured == true] | order(sortOrder asc, title.en asc) ${card}
}`;

export const historyQuery = `*[_id == "historyPage"][0]{
  introTitle,
  introSubtitle,
  heroImage ${image},
  blocks[]{ year, title, body }
}`;

export const worksQuery = `*[_type == "workItem"] | order(sortOrder asc, title.en asc) {
  _id,
  title,
  category,
  summary,
  dateLabel,
  image ${image}
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(sortOrder asc) {
  _id,
  quote,
  name,
  detail
}`;

export const faqsQuery = `*[_type == "faq"] | order(sortOrder asc) {
  _id,
  question,
  answer
}`;

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  summary,
  body,
  image ${image},
  seo ${seo}
}`;
