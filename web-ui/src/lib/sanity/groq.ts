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
  duration,
  durationLabel,
  days,
  nights,
  address,
  location,
  category,
  experienceType,
  price,
  featured
}`;

const seo = `{
  title,
  description,
  image ${image}
}`;

const reference = `{
  "slug": slug.current,
  title
}`;

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
  logo ${image},
  favicon ${image},
  seo ${seo}
}`;

export const homeQuery = `{
  "home": *[_id == "homePage"][0]{
    heroTitle,
    heroSubtitle,
    heroImage ${image},
    primaryCta{ label, path },
    secondaryCta{ label, path },
    featuredTours[]->${card},
    featuredPoojas[]->${card},
    featuredStays[]->${card}
  },
  "featuredTours": *[_type == "travelPackage" && featured == true] | order(sortOrder asc, title.en asc) ${card},
  "featuredPoojas": *[_type == "pooja" && featured == true] | order(sortOrder asc, title.en asc) ${card},
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

export const poojasQuery = `*[_type == "pooja"] | order(sortOrder asc, title.en asc) ${card}`;

export const poojaBySlugQuery = `*[_type == "pooja" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  summary,
  description,
  featuredImage ${image},
  gallery[] ${image},
  category,
  destination->${reference},
  duration,
  price,
  included,
  excluded,
  preparation,
  languages,
  enquiryNote,
  seo ${seo}
}`;

export const toursQuery = `*[_type == "travelPackage"] | order(sortOrder asc, title.en asc) ${card}`;

export const tourBySlugQuery = `*[_type == "travelPackage" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  summary,
  description,
  featuredImage ${image},
  gallery[] ${image},
  startingLocation,
  destinations[]->${reference},
  days,
  nights,
  durationLabel,
  itinerary[]{
    dayNumber,
    heading,
    description,
    location,
    image ${image}
  },
  included,
  excluded,
  transport,
  accommodation,
  languages,
  price,
  minGroup,
  maxGroup,
  season,
  seo ${seo}
}`;

export const staysQuery = `*[_type == "stay"] | order(sortOrder asc, title.en asc) ${card}`;

export const stayBySlugQuery = `*[_type == "stay" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  summary,
  description,
  address,
  destination->${reference},
  coordinates,
  featuredImage ${image},
  gallery[] ${image},
  amenities,
  accommodationType,
  rooms,
  price,
  included,
  enquiryNote,
  seo ${seo}
}`;

export const experiencesQuery = `*[_type == "experience"] | order(sortOrder asc, title.en asc) {
  _id,
  "slug": slug.current,
  title,
  summary,
  description,
  experienceType,
  location,
  destination->${reference},
  featuredImage ${image},
  gallery[] ${image},
  duration,
  languages,
  included,
  excluded,
  price,
  requirements,
  enquiryNote,
  seo ${seo}
}`;

export const experienceBySlugQuery = `*[_type == "experience" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  summary,
  description,
  experienceType,
  location,
  destination->${reference},
  featuredImage ${image},
  gallery[] ${image},
  duration,
  languages,
  included,
  excluded,
  price,
  requirements,
  enquiryNote,
  seo ${seo}
}`;

export const destinationsQuery = `*[_type == "destination"] | order(sortOrder asc, title.en asc) ${card}`;

export const destinationBySlugQuery = `*[_type == "destination" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  summary,
  description,
  featuredImage ${image},
  gallery[] ${image},
  region,
  coordinates,
  visiting,
  seo ${seo},
  "relatedPoojas": *[_type == "pooja" && references(^._id)] | order(sortOrder asc) ${card},
  "relatedTours": *[_type == "travelPackage" && references(^._id)] | order(sortOrder asc) ${card},
  "relatedExperiences": *[_type == "experience" && references(^._id)] | order(sortOrder asc) ${card}
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

export const relatedContentQuery = `{
  "poojas": *[_type == "pooja" && references($id)] | order(sortOrder asc) ${card},
  "tours": *[_type == "travelPackage" && references($id)] | order(sortOrder asc) ${card},
  "stays": *[_type == "stay" && references($id)] | order(sortOrder asc) ${card},
  "experiences": *[_type == "experience" && references($id)] | order(sortOrder asc) ${card}
}`;

export const sitemapQuery = `{
  "tours": *[_type == "travelPackage" && defined(slug.current)].slug.current,
  "stays": *[_type == "stay" && defined(slug.current)].slug.current,
  "poojas": *[_type == "pooja" && defined(slug.current)].slug.current,
  "experiences": *[_type == "experience" && defined(slug.current)].slug.current,
  "destinations": *[_type == "destination" && defined(slug.current)].slug.current,
  "pages": *[_type == "page" && defined(slug.current)].slug.current
}`;
