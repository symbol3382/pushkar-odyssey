import type { BookingType } from '../content/types';
import { BookCTA } from './BookCTA';

interface StickyBookBarProps {
  type: BookingType;
  title: string;
  slug: string;
}

/** Mobile-only sticky booking strip on detail pages. */
export function StickyBookBar({ type, title, slug }: StickyBookBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bhagwa/15 bg-cream/95 p-3 backdrop-blur-md lg:hidden">
      <BookCTA type={type} title={title} slug={slug} compact className="justify-center" />
    </div>
  );
}
