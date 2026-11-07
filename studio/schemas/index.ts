import { coordinates } from "./objects/coordinates";
import { galleryImage } from "./objects/galleryImage";
import { itineraryDay } from "./objects/itineraryDay";
import { localeBlockContent, localeString, localeText } from "./objects/locale";
import { price } from "./objects/price";
import { seo } from "./objects/seo";
import { faq } from "./documents/faq";
import { historyPage } from "./documents/historyPage";
import { homePage } from "./documents/homePage";
import { page } from "./documents/page";
import { service } from "./documents/service";
import { serviceCategory } from "./documents/serviceCategory";
import { siteSettings } from "./documents/siteSettings";
import { testimonial } from "./documents/testimonial";
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
  serviceCategory,
  service,
  workItem,
  testimonial,
  faq,
  page,
];
