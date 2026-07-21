import type { Part } from "./parts";

// Loads the public Parts Catalog from Airtable ("История цен").
// Fetches all rows, de-dupes by part number (keeps most recent), parses a clean
// description from the comment, detects make, and computes public price = cost × 1.08.
// The raw supplier cost is used only here (server side) and never returned.

const BASE_ID = process.env.AIRTABLE_BASE_ID || "appTdwmhpK8DH8z4H";
const TABLE_ID = process.env.AIRTABLE_TABLE_ID || "tbl5l7F9Xq9txhojr";
const MARKUP = 1.08;

const F = {
  part: "fld6tqSILqUg4GQZy",
  price: "fldCtkyECU8PEc9jG",
  comment: "fld8b66YICom14wqC",
  currency: "fldaSKZ8LWvKsSboZ",
  date: "fldA1PDNZeodioPXG"
};

const MAKES: [string, string][] = [
  ["komatsu", "Komatsu"], ["caterpillar", "Caterpillar"], ["cummins", "Cummins"],
  ["hitachi", "Hitachi"], ["liebherr", "Liebherr"], ["atlas copco", "Atlas Copco"],
  ["volvo", "Volvo"], ["doosan", "Doosan"], ["hyundai", "Hyundai"], ["cat", "Caterpillar"]
];

function parseName(comment: string, partNumber: string): string {
  if (!comment) return "";
  let d = comment.includes("|") ? comment.split("|")[0] : comment;
  if (/^\s*(файл|file)\b/i.test(d) || /\.(xls|xlsx|pdf|docx?)\b/i.test(d)) return "";
  d = d.replace(/файл\s*:.*/gi, "");
  d = d.replace(new RegExp(partNumber.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "");
  d = d.replace(/\b[0-9][0-9A-Za-z]{1,}-[0-9A-Za-z-]{2,}\b/g, "");
  for (const [k] of MAKES) d = d.replace(new RegExp("\\b" + k + "\\b", "gi"), "");
  d = d.replace(/[⚠️✅🔴]/g, "").replace(/\s*[;:]\s*/g, " ").replace(/\s{2,}/g, " ").replace(/^\s*[-–]\s*/, "").trim();
  return d;
}

function detectMake(comment: string, partNumber: string): string {
  const c = (comment || "").toLowerCase();
  for (const [k, name] of MAKES) if (new RegExp("\\b" + k + "\\b").test(c)) return name;
  if (/-/.test(partNumber) && /\d/.test(partNumber)) return "Komatsu";
  return "Other";
}

type RawRecord = { id: string; createdTime: string; fields: Record<string, unknown> };

export async function getCatalogParts(): Promise<Part[]> {
  const key = process.env.AIRTABLE_API_KEY;
  if (!key) { console.warn("CATALOG: AIRTABLE_API_KEY missing — returning empty"); return []; }

  const all: RawRecord[] = [];
  let offset: string | undefined;
  try {
    for (let i = 0; i < 400; i++) {
      const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`);
      url.searchParams.set("pageSize", "100");
      url.searchParams.set("returnFieldsByFieldId", "true");
      for (const f of Object.values(F)) url.searchParams.append("fields[]", f);
      if (offset) url.searchParams.set("offset", offset);
      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${key}` },
        cache: "force-cache"
      });
      if (!res.ok) {
        console.error("CATALOG: Airtable responded", res.status, (await res.text()).slice(0, 300));
        break;
      }
      const json = (await res.json()) as { records: RawRecord[]; offset?: string };
      all.push(...json.records);
      offset = json.offset;
      if (!offset) break;
      await new Promise((r) => setTimeout(r, 210));
    }
  } catch (e) {
    console.error("CATALOG: fetch threw", e);
    return [];
  }

  const byPart = new Map<string, RawRecord>();
  const dateOf = (r: RawRecord) => String((r.fields[F.date] as string) || r.createdTime || "");
  for (const r of all) {
    const pn = String((r.fields[F.part] as string) || "").trim();
    if (!pn) continue;
    const cur = byPart.get(pn);
    if (!cur) { byPart.set(pn, r); continue; }
    const better = dateOf(r) > dateOf(cur);
    const rHasName = !!parseName(String(r.fields[F.comment] || ""), pn);
    const curHasName = !!parseName(String(cur.fields[F.comment] || ""), pn);
    if ((better && (rHasName || !curHasName)) || (rHasName && !curHasName)) byPart.set(pn, r);
  }

  const parts: Part[] = [];
  for (const r of byPart.values()) {
    const pn = String(r.fields[F.part]).trim();
    const comment = String(r.fields[F.comment] || "");
    const rawPrice = r.fields[F.price] as number | undefined;
    const curObj = r.fields[F.currency] as { name?: string } | undefined;
    const currency = (curObj && curObj.name) || "USD";
    const name = parseName(comment, pn) || pn;
    const price = typeof rawPrice === "number" && rawPrice > 0 ? Math.round(rawPrice * MARKUP * 100) / 100 : null;
    parts.push({ id: r.id, partNumber: pn, name, make: detectMake(comment, pn), price, currency });
  }

  parts.sort((a, b) => a.make.localeCompare(b.make) || a.partNumber.localeCompare(b.partNumber));
  console.log(`CATALOG: fetched ${all.length} rows -> ${parts.length} unique parts`);
  return parts;
}
