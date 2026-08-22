import { site } from '../content/site';
import type { BookingType } from '../content/types';

export interface BookingPayload {
  type: BookingType;
  title: string;
  slug?: string;
  date?: string;
  guests?: string;
  notes?: string;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function buildWhatsAppUrl(text: string): string {
  const phone = digitsOnly(site.contact.whatsapp);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function buildBookingMessage(payload: BookingPayload): string {
  const detailLines: string[] = [];
  if (payload.date) detailLines.push(`Preferred date: ${payload.date}`);
  if (payload.guests) detailLines.push(`Guests: ${payload.guests}`);
  if (payload.notes) detailLines.push(`Notes: ${payload.notes}`);

  const details = detailLines.length ? detailLines.join('\n') : 'Details: (please advise availability)';

  return site.bookingMessageTemplate
    .replace('{{type}}', payload.type)
    .replace('{{title}}', payload.title)
    .replace('{{slug}}', payload.slug ?? '—')
    .replace('{{details}}', details);
}

export function buildBookingUrl(payload: BookingPayload): string {
  return buildWhatsAppUrl(buildBookingMessage(payload));
}

export function buildCallUrl(): string {
  const phone = digitsOnly(site.contact.phone);
  return `tel:+${phone}`;
}
