// ---------------------------------------------------------------------------
// Parts Catalog types. Real data comes from Airtable (see app/lib/airtable.ts).
// The raw supplier cost NEVER reaches the client — the loader computes the
// public price (cost × 1.08) server-side and only sends that + currency.
// ---------------------------------------------------------------------------

export interface Part {
  id: string;
  partNumber: string;
  name: string;        // cleaned description, or the part number if none
  make: string;        // Komatsu, Caterpillar, Cummins, ...
  price: number | null; // public price already incl. +8% (null = On request)
  currency: string;    // "USD" | "CNY"
}

export const partMakes = [
  "Komatsu",
  "Caterpillar",
  "Cummins",
  "Hitachi",
  "Liebherr",
  "Atlas Copco",
  "Jenbacher",
  "MWM",
  "Other"
] as const;

export function formatNumber(price: number | null): string {
  if (price === null || price === undefined) return "On request";
  return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function currencySymbol(currency: string): string {
  return currency === "CNY" ? "¥" : "$";
}
