// Parts Catalog types. Real data comes from Airtable (see app/lib/airtable.ts).
// Prices are intentionally NOT part of the public site — pricing goes only in
// the quote/PPT we send. So the catalog exposes part number, name and make.

export interface Part {
  id: string;
  partNumber: string;
  name: string;   // cleaned description, or the part number if none
  make: string;   // Komatsu, Caterpillar, Cummins, ...
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
