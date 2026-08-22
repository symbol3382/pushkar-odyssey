import { brahmaAarti } from './brahma-aarti';
import { ghatDeepdaan } from './ghat-deepdaan';
import { rudrabhishek } from './rudrabhishek';
import type { PoojaPackage } from '../types';

export const poojas: PoojaPackage[] = [brahmaAarti, rudrabhishek, ghatDeepdaan];

export function getPoojaBySlug(slug: string): PoojaPackage | undefined {
  return poojas.find((p) => p.slug === slug);
}
