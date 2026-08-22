import { desertSunsetSafari } from './desert-sunset-safari';
import { kartikFairImmersion } from './kartik-fair-immersion';
import { pushkarSacredCircuit } from './pushkar-sacred-circuit';
import type { TourPackage } from '../types';

export const tours: TourPackage[] = [
  pushkarSacredCircuit,
  desertSunsetSafari,
  kartikFairImmersion,
];

export function getTourBySlug(slug: string): TourPackage | undefined {
  return tours.find((t) => t.slug === slug);
}
