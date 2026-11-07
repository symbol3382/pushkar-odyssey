import { coordinates } from "./objects/coordinates";
import { galleryImage } from "./objects/galleryImage";
import { itineraryDay } from "./objects/itineraryDay";
import { localeBlockContent, localeString, localeText } from "./objects/locale";
import { price } from "./objects/price";
import { seo } from "./objects/seo";
import { darshan } from "./documents/darshan";
import { desertExperience } from "./documents/desertExperience";
import { faq } from "./documents/faq";
import { festival } from "./documents/festival";
import { historyPage } from "./documents/historyPage";
import { homePage } from "./documents/homePage";
import { hospitality } from "./documents/hospitality";
import { page } from "./documents/page";
import { product } from "./documents/product";
import { property } from "./documents/property";
import { siteSettings } from "./documents/siteSettings";
import { stay } from "./documents/stay";
import { testimonial } from "./documents/testimonial";
import { tourPackage } from "./documents/tourPackage";
import { vedicPooja } from "./documents/vedicPooja";
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
  vedicPooja,
  desertExperience,
  tourPackage,
  stay,
  festival,
  product,
  hospitality,
  property,
  workItem,
  testimonial,
  faq,
  page,
];
