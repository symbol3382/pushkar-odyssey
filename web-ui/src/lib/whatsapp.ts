import type { TFunction } from 'i18next';
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

const TYPE_KEYS: Record<BookingType, string> = {
  tour: 'booking.typeTour',
  stay: 'booking.typeStay',
  pooja: 'booking.typePooja',
  service: 'booking.typeService',
  general: 'booking.typeGeneral',
};

export function buildBookingMessage(payload: BookingPayload, t: TFunction): string {
  const detailLines: string[] = [];
  if (payload.date) detailLines.push(t('booking.preferredDate', { date: payload.date, ns: 'common' }));
  if (payload.guests) detailLines.push(t('booking.guests', { guests: payload.guests, ns: 'common' }));
  if (payload.notes) detailLines.push(t('booking.notes', { notes: payload.notes, ns: 'common' }));

  const details = detailLines.length
    ? detailLines.join('\n')
    : t('booking.detailsFallback', { ns: 'common' });

  const typeLabel = t(TYPE_KEYS[payload.type], { ns: 'common' });
  const template = t('site.bookingTemplate', { ns: 'content' });

  return template
    .replace('{{type}}', typeLabel)
    .replace('{{title}}', payload.title)
    .replace('{{slug}}', payload.slug ?? '—')
    .replace('{{details}}', details);
}

export function buildBookingUrl(payload: BookingPayload, t: TFunction): string {
  return buildWhatsAppUrl(buildBookingMessage(payload, t));
}

export function buildCallUrl(): string {
  const phone = digitsOnly(site.contact.phone);
  return `tel:+${phone}`;
}
