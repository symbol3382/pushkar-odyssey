import { coordinates } from "./objects/coordinates";
import { galleryImage } from "./objects/galleryImage";
import { itineraryDay } from "./objects/itineraryDay";
import { localeBlockContent, localeString, localeText } from "./objects/locale";
import { price } from "./objects/price";
import { seo } from "./objects/seo";
import { bestSeller } from "./documents/bestSeller";
import { culturalProgram } from "./documents/culturalProgram";
import { darshan } from "./documents/darshan";
import { event } from "./documents/event";
import { faq } from "./documents/faq";
import { historyPage } from "./documents/historyPage";
import { homePage } from "./documents/homePage";
import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";
import { testimonial } from "./documents/testimonial";
import { tourPackage } from "./documents/tourPackage";
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
  darshan,
  culturalProgram,
  tourPackage,
  event,
  bestSeller,
  workItem,
  testimonial,
  faq,
  page,
];
