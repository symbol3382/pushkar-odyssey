import { createElement, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import {
  LuBookOpen,
  LuCalendarDays,
  LuCompass,
  LuHouse,
  LuImages,
  LuLandmark,
  LuMail,
  LuMap,
  LuMessageCircle,
  LuPackage,
  LuSun,
} from 'react-icons/lu';

const icons = {
  '/': LuHouse,
  '/works': LuImages,
  '/history': LuLandmark,
  '/contact': LuMail,
  '/darshan': LuBookOpen,
  '/cultural-program': LuSun,
  '/tours': LuMap,
  '/events': LuCalendarDays,
  '/best-sellers': LuPackage,
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
