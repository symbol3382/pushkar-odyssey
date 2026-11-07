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
  "categorySlug": category->slug.current
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
  enquiryNote,
  durationLabel,
  days,
  nights,
  itinerary[]{
    dayNumber,
    heading,
    description,
    location,
    image ${image}
  },
  "categorySlug": category->slug.current,
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

function featuredServices(categorySlug: string) {
  return `*[_type == "service" && featured == true && category->slug.current == "${categorySlug}"] | order(sortOrder asc, title.en asc) ${card}`;
}

export function servicesByCategoryQuery() {
  return `*[_type == "service" && category->slug.current == $categorySlug] | order(sortOrder asc, title.en asc) ${card}`;
}

export function serviceBySlugQuery() {
  return `*[_type == "service" && slug.current == $slug && category->slug.current == $categorySlug][0]${detail}`;
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
  "featuredDarshan": ${featuredServices('pushkar-darshan')},
  "featuredDesert": ${featuredServices('desert-camping')},
  "featuredTours": ${featuredServices('tour-packages')},
  "featuredStays": ${featuredServices('stays')}
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
  "services": *[_type == "service" && defined(slug.current) && defined(category->slug.current)]{
    "slug": slug.current,
    "categorySlug": category->slug.current
  },
  "pages": *[_type == "page" && defined(slug.current)].slug.current
}`;
