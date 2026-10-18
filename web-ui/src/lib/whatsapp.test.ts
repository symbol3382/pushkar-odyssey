import { describe, expect, it } from 'vitest';
import i18n from '../i18n';
import { buildBookingMessage, buildWhatsAppUrl } from './whatsapp';

describe('WhatsApp links', () => {
  it('encodes the message and rejects a number that is too short', () => {
    expect(buildWhatsAppUrl('Hello & namaste', '91 98765 43210')).toBe(
      'https://wa.me/919876543210?text=Hello%20%26%20namaste',
    );
    expect(buildWhatsAppUrl('Hello', '123')).toBeNull();
  });

  it('includes the offering and page address without saying the booking is confirmed', () => {
    const message = buildBookingMessage(
      { type: 'tour', title: 'Sacred Circuit', slug: 'sacred-circuit' },
      i18n.t.bind(i18n),
      'Namaste! *{{type}}*: {{title}}\nRef: {{slug}}\n{{details}}',
      'https://example.com/tours/sacred-circuit',
    );
    expect(message).toContain('Sacred Circuit');
    expect(message).toContain('https://example.com/tours/sacred-circuit');
    expect(message.toLowerCase()).not.toContain('confirmed');
  });
});
