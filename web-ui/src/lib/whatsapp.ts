import type { TFunction } from 'i18next';
import type { BookingType } from '../content/types';

export interface BookingPayload {
  type: BookingType;
  title: string;
  slug?: string;
  date?: string;
  guests?: string;
  notes?: string;
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function buildWhatsAppUrl(text: string, whatsapp: string): string | null {
  const phone = digitsOnly(whatsapp);
  if (phone.length < 8 || phone.length > 15) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function buildCallUrl(phone: string): string | null {
  const digits = digitsOnly(phone);
  if (digits.length < 8 || digits.length > 15) return null;
  return `tel:+${digits}`;
}

const TYPE_KEYS: Record<BookingType, string> = {
  tour: 'booking.typeTour',
  stay: 'booking.typeStay',
  pooja: 'booking.typePooja',
  service: 'booking.typeService',
  general: 'booking.typeGeneral',
  destination: 'booking.typeDestination',
};

export function buildBookingMessage(
  payload: BookingPayload,
  t: TFunction,
  template: string,
  pageUrl?: string,
): string {
  const detailLines: string[] = [];
  if (payload.date)
    detailLines.push(t('booking.preferredDate', { date: payload.date, ns: 'common' }));
  if (payload.guests)
    detailLines.push(t('booking.guests', { guests: payload.guests, ns: 'common' }));
  if (payload.notes) detailLines.push(t('booking.notes', { notes: payload.notes, ns: 'common' }));

  const details = detailLines.length
    ? detailLines.join('\n')
    : t('booking.detailsFallback', { ns: 'common' });
  const typeLabel = t(TYPE_KEYS[payload.type], { ns: 'common' });
  const message = template
    .replaceAll('{{type}}', typeLabel)
    .replaceAll('{{title}}', payload.title)
    .replaceAll('{{slug}}', payload.slug ?? '—')
    .replaceAll('{{details}}', details);

  return pageUrl ? `${message}\n${pageUrl}` : message;
}

export function buildBookingUrl(
  payload: BookingPayload,
  t: TFunction,
  template: string,
  whatsapp: string,
  pageUrl?: string,
): string | null {
  return buildWhatsAppUrl(buildBookingMessage(payload, t, template, pageUrl), whatsapp);
}
