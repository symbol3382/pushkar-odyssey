export interface PriceValue {
  amount?: number | null;
  currency?: string | null;
  note?: string | null;
}

export function formatStartingPrice(
  price: PriceValue | null | undefined,
  fromLabel: string,
): string | null {
  if (price?.amount == null || Number.isNaN(price.amount)) return null;

  const trimmedCurrency = price.currency?.trim();
  const currency = trimmedCurrency ?? 'INR';
  let formatted: string;
  try {
    formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: Number.isInteger(price.amount) ? 0 : 2,
    }).format(price.amount);
  } catch {
    formatted = `${String(price.amount)} ${currency}`;
  }

  const note = price.note?.trim();
  return `${fromLabel} ${formatted}${note ? ` ${note}` : ''}`;
}
