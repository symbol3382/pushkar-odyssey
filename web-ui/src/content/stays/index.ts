import { desertCampStay } from './desert-camp-stay';
import { lakeviewHaveli } from './lakeview-haveli';
import type { StayPackage } from '../types';

export const stays: StayPackage[] = [lakeviewHaveli, desertCampStay];

export function getStayBySlug(slug: string): StayPackage | undefined {
  return stays.find((s) => s.slug === slug);
}
