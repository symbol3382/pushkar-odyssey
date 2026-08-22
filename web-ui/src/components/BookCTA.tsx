import type { BookingType } from '../content/types';
import { buildBookingUrl, buildCallUrl } from '../lib/whatsapp';

interface BookCTAProps {
  type: BookingType;
  title: string;
  slug?: string;
  className?: string;
  compact?: boolean;
}

export function BookCTA({ type, title, slug, className = '', compact = false }: BookCTAProps) {
  const wa = buildBookingUrl({ type, title, slug });
  const call = buildCallUrl();

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-sm bg-bhagwa font-medium text-cream shadow-md shadow-bhagwa/25 transition hover:bg-bhagwa-light active:scale-[0.98] ${compact ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}`}
      >
        <WhatsAppIcon className={compact ? 'size-4' : 'size-5'} />
        Book on WhatsApp
      </a>
      <a
        href={call}
        className={`inline-flex items-center justify-center gap-2 rounded-sm border border-maroon/30 bg-cream/80 font-medium text-maroon transition hover:border-maroon hover:bg-sand ${compact ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}`}
      >
        <PhoneIcon className={compact ? 'size-4' : 'size-5'} />
        Call
      </a>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.139-1.633-.79-1.886-.88-.252-.09-.435-.139-.618.14-.183.279-.71.88-.87 1.06-.16.18-.32.2-.597.06-.277-.14-1.17-.43-2.23-1.37-.824-.735-1.38-1.64-1.542-1.92-.162-.279-.017-.43.122-.568.126-.125.279-.326.418-.489.14-.163.186-.279.28-.465.093-.186.047-.349-.023-.488-.07-.14-.618-1.49-.847-2.04-.223-.535-.45-.462-.618-.47-.16-.008-.343-.01-.526-.01s-.488.07-.744.349c-.256.279-.976.954-.976 2.33s1 2.703 1.139 2.892c.14.186 1.965 3 4.76 4.21.666.288 1.186.46 1.592.59.668.213 1.276.183 1.758.111.536-.081 1.633-.668 1.864-1.313.23-.645.23-1.197.16-1.313-.07-.116-.256-.186-.533-.326z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.988-1.307A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.082-1.117l-.292-.174-3.057.801.817-2.98-.19-.306A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.036 12.036 0 01-7.143-7.143 1.125 1.125 0 01.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}
