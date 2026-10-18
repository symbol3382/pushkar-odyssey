import { describe, expect, it } from 'vitest';
import { formatStartingPrice } from './price';

describe('formatStartingPrice', () => {
  it('hides a price that was not provided', () => {
    expect(formatStartingPrice(null, 'From')).toBeNull();
    expect(formatStartingPrice({ amount: null, currency: 'INR' }, 'From')).toBeNull();
  });

  it('labels a published amount as a starting price', () => {
    expect(formatStartingPrice({ amount: 6500, currency: 'INR', note: 'per person' }, 'From')).toBe(
      'From ₹6,500 per person',
    );
  });
});
