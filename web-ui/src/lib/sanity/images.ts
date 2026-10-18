import { createImageUrlBuilder } from '@sanity/image-url';
import { DEFAULT_SANITY_DATASET, readSanityEnv } from './config';
import { pickText } from './locale';
import type { SanityImage } from './types';

export interface Media {
  src: string;
  alt: string;
  srcSet?: string;
}

const WIDTHS = [480, 768, 1200, 1600];

export function imageFromSanity(
  source: SanityImage | null | undefined,
  language: string,
): Media | null {
  const env = readSanityEnv();
  if (!source?.asset?._ref || !env.projectId) return null;

  const projectId = env.projectId;
  const dataset = env.dataset ?? DEFAULT_SANITY_DATASET;
  const urlFor = (width: number) =>
    createImageUrlBuilder({ projectId, dataset }).image(source).width(width).auto('format').url();

  return {
    src: urlFor(960),
    srcSet: WIDTHS.map((width) => `${urlFor(width)} ${String(width)}w`).join(', '),
    alt: pickText(source.alt, language),
  };
}

export function mediaFromSrc(src: string, alt: string): Media {
  return { src, alt };
}
