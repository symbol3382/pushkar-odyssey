import { coordinates } from "./objects/coordinates";
import { galleryImage } from "./objects/galleryImage";
import { itineraryDay } from "./objects/itineraryDay";
import { localeBlockContent, localeString, localeText } from "./objects/locale";
import { price } from "./objects/price";
import { seo } from "./objects/seo";
import { destination } from "./documents/destination";
import { experience } from "./documents/experience";
import { faq } from "./documents/faq";
import { historyPage } from "./documents/historyPage";
import { homePage } from "./documents/homePage";
import { page } from "./documents/page";
import { pooja } from "./documents/pooja";
import { siteSettings } from "./documents/siteSettings";
import { stay } from "./documents/stay";
import { testimonial } from "./documents/testimonial";
import { travelPackage } from "./documents/travelPackage";
import { workItem } from "./documents/workItem";

export const schemaTypes = [
  localeString,
  localeText,
  localeBlockContent,
  galleryImage,
  seo,
  price,
  coordinates,
  itineraryDay,
  siteSettings,
  homePage,
  historyPage,
  pooja,
  travelPackage,
  stay,
  experience,
  destination,
  workItem,
  testimonial,
  faq,
  page,
];
