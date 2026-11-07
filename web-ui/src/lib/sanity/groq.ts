const image = `{
  alt,
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
  duration,
  durationLabel,
  address,
  category,
  ritual,
  kind,
  adventureActivity,
  stayCategory,
  festival,
  catalog,
  propertyType,
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
  amenities,
  enquiryNote,
  preparation,
  duration,
  durationLabel,
  days,
  nights,
  season,
  when,
  transport,
  accommodation,
  rooms,
  address,
  location,
  coordinates,
  languages,
  minGroup,
  maxGroup,
  seasonal,
  format,
  category,
  ritual,
  kind,
  adventureActivity,
  stayCategory,
  festival,
  catalog,
  propertyType,
  purpose,
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
  'vedicPooja',
  'desertExperience',
  'tourPackage',
  'stay',
  'festival',
  'product',
  'hospitality',
  'property',
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
    heroTitle,
    heroSubtitle,
    heroImage ${image},
    primaryCta{ label, path },
    secondaryCta{ label, path },
    featuredDarshan[]->${card},
    featuredDesert[]->${card},
    featuredTours[]->${card},
    featuredStays[]->${card}
  },
  "featuredDarshan": *[_type == "darshan" && featured == true] | order(sortOrder asc, title.en asc) ${card},
  "featuredDesert": *[_type == "desertExperience" && featured == true] | order(sortOrder asc, title.en asc) ${card},
  "featuredTours": *[_type == "tourPackage" && featured == true] | order(sortOrder asc, title.en asc) ${card},
  "featuredStays": *[_type == "stay" && featured == true] | order(sortOrder asc, title.en asc) ${card}
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

export const sitemapQuery = `{
  "darshan": *[_type == "darshan" && defined(slug.current)].slug.current,
  "vedicPoojas": *[_type == "vedicPooja" && defined(slug.current)].slug.current,
  "desert": *[_type == "desertExperience" && defined(slug.current)].slug.current,
  "tours": *[_type == "tourPackage" && defined(slug.current)].slug.current,
  "stays": *[_type == "stay" && defined(slug.current)].slug.current,
  "festivals": *[_type == "festival" && defined(slug.current)].slug.current,
  "products": *[_type == "product" && defined(slug.current)].slug.current,
  "events": *[_type == "hospitality" && defined(slug.current)].slug.current,
  "property": *[_type == "property" && defined(slug.current)].slug.current,
  "pages": *[_type == "page" && defined(slug.current)].slug.current
}`;
