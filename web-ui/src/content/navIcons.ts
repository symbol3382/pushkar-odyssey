import { createElement, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import {
  LuBedDouble,
  LuBookOpen,
  LuBuilding2,
  LuCalendarDays,
  LuCompass,
  LuFlame,
  LuHouse,
  LuImages,
  LuLandmark,
  LuMail,
  LuMap,
  LuMessageCircle,
  LuPackage,
  LuPartyPopper,
  LuSun,
} from 'react-icons/lu';

const icons = {
  '/': LuHouse,
  '/works': LuImages,
  '/history': LuLandmark,
  '/contact': LuMail,
  '/darshan': LuBookOpen,
  '/vedic-poojas': LuFlame,
  '/desert': LuSun,
  '/tours': LuMap,
  '/stays': LuBedDouble,
  '/festivals': LuPartyPopper,
  '/products': LuPackage,
  '/events': LuCalendarDays,
  '/property': LuBuilding2,
} as const satisfies Record<string, IconType>;

function resolveIcon(path: string): IconType {
  if (Object.hasOwn(icons, path)) {
    return icons[path as keyof typeof icons];
  }
  return LuCompass;
}

export function NavItemIcon({
  path,
  className,
}: {
  path: string;
  className?: string;
}): ReactNode {
  return createElement(resolveIcon(path), { className, 'aria-hidden': true });
}

export const ExploreIcon: IconType = LuCompass;
export const BookNowIcon: IconType = LuMessageCircle;
