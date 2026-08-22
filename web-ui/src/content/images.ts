/**
 * Central image registry — edit paths/URLs here only.
 *
 * Values may be:
 * - a public-folder path (e.g. `/images/home-hero.svg`)
 * - an absolute URL (e.g. `https://cdn.example.com/photo.jpg`)
 *
 * Usage in content:
 *   import { images } from '../images';
 *   image: images.homeHero,
 */
export const images = {
  homeHero: '/images/home-hero.svg',
  lakeAarti: '/images/lake-aarti.svg',
  pushkarBazaar: '/images/pushkar-bazaar.svg',
  haveliStay: '/images/haveli-stay.svg',
  templeSpire: '/images/temple-spire.svg',
  roadJourney: '/images/road-journey.svg',
  kartikFair: '/images/kartik-fair.svg',
  desertDunes: '/images/desert-dunes.svg',
  haveliRoom: '/images/haveli-room.svg',
  airportTransfer: '/images/airport-transfer.svg',
  templeGuide: '/images/temple-guide.svg',
  ritualPhoto: '/images/ritual-photo.svg',
  historyHero: '/images/history-hero.svg',
  contactHero: '/images/contact-hero.svg',

  // Tours
  tourSacredCircuit: '/images/home-hero.svg',
  tourSacredCircuitGallery1: '/images/lake-aarti.svg',
  tourSacredCircuitGallery2: '/images/pushkar-bazaar.svg',
  tourDesertSafari: '/images/desert-dunes.svg',
  tourDesertSafariGallery1: '/images/road-journey.svg',
  tourKartikFair: '/images/kartik-fair.svg',

  // Stays
  stayLakeviewHaveli: '/images/haveli-stay.svg',
  stayLakeviewGallery1: '/images/haveli-room.svg',
  stayDesertCamp: '/images/desert-dunes.svg',

  // Poojas
  poojaBrahmaAarti: '/images/lake-aarti.svg',
  poojaBrahmaGallery1: '/images/temple-spire.svg',
  poojaRudrabhishek: '/images/temple-spire.svg',
  poojaGhatDeepdaan: '/images/lake-aarti.svg',

  // Services
  serviceAirportTransfer: '/images/airport-transfer.svg',
  serviceLocalGuide: '/images/temple-guide.svg',
  servicePhotography: '/images/ritual-photo.svg',

  // Works portfolio
  workW1: '/images/lake-aarti.svg',
  workW2: '/images/pushkar-bazaar.svg',
  workW3: '/images/haveli-stay.svg',
  workW4: '/images/temple-spire.svg',
  workW5: '/images/road-journey.svg',
  workW6: '/images/kartik-fair.svg',
} as const;

export type ImageKey = keyof typeof images;
export type ImageSrc = (typeof images)[ImageKey];
