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

const BRANDS: [RegExp, string][] = [
  [/\b(komatsu|коматсу)\b/i, "Komatsu"],
  [/\b(caterpillar|катерпиллер|катерпилар)\b/i, "Caterpillar"],
  [/\b(cummins|камминз)\b/i, "Cummins"],
  [/\b(hitachi|хитачи)\b/i, "Hitachi"],
  [/\b(liebherr|либхер)\b/i, "Liebherr"],
  [/\batlas\s*copco\b/i, "Atlas Copco"],
  [/\b(volvo|вольво)\b/i, "Volvo"],
  [/\b(doosan|дусан)\b/i, "Doosan"],
  [/\b(hyundai|хендэ|хундай)\b/i, "Hyundai"],
  [/\bjenbacher\b/i, "Jenbacher"],
  [/\bmwm\b/i, "MWM"]
];
// Standalone CAT / САТ only — must not match Russian "Каток" (roller).
const CAT_TOKEN = /(^|[\s(])(CAT|САТ)([\s).,]|$)/;
const CUMMINS_SER = /\b(QS[KXTBCLM]|QST|KTTA|KTA|NTA|NT855|N14|IS[XMLB])\s?\d*/i;
const CUMMINS_CYR = /КТТА|камминз/i; // Cyrillic Cummins mentions
const CAT_ENGINE = /\b(ACERT|C13|C15|C18|C27|C32|C175)\b/;
const KOMATSU_PFX = /^(ND|DM|DK|SAA|SDA|RM|EA|EMP|KM)\b/i;

function parseName(comment: string, partNumber: string): string {
  if (!comment) return "";
  let d = comment.includes("|") ? comment.split("|")[0] : comment;
  if (/^\s*(файл|file)\b/i.test(d) || /\.(xls|xlsx|pdf|docx?)\b/i.test(d)) return "";
  d = d.replace(/файл\s*:.*/gi, "");
  d = d.replace(new RegExp(partNumber.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "");
  d = d.replace(/\b[0-9][0-9A-Za-z]{1,}-[0-9A-Za-z-]{2,}\b/g, "");
  for (const [re] of BRANDS) d = d.replace(new RegExp(re.source, "gi"), "");
  d = d.replace(/[⚠️✅🔴]/g, "").replace(/\s*[;:]\s*/g, " ").replace(/\s{2,}/g, " ").replace(/^\s*[-–]\s*/, "").trim();
  return d;
}

function detectMake(comment: string, partNumber: string): string {
  const text = `${comment || ""} ${partNumber || ""}`;
  for (const [re, name] of BRANDS) if (re.test(text)) return name;
  if (CAT_TOKEN.test(comment || "")) return "Caterpillar";
  if (CUMMINS_SER.test(text) || CUMMINS_CYR.test(text)) return "Cummins";
  if (CAT_ENGINE.test(text)) return "Caterpillar";
  if (/^\d{7}$/.test(partNumber)) return "Caterpillar";
  if (/-/.test(partNumber) && (partNumber.match(/\d/g) || []).length >= 4
      && !/\s/.test(partNumber) && !/[a-z]{3,}/.test(partNumber)) return "Komatsu";
  if (KOMATSU_PFX.test(partNumber)) return "Komatsu";
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

  // De-dupe on part number + description so genuine variants that share a part
  // number (e.g. QSK60 "2150" vs "250") are kept separate; only true re-quotes
  // (same part, same description, different supplier/date) collapse to the latest.
  const byKey = new Map<string, RawRecord>();
  const dateOf = (r: RawRecord) => String((r.fields[F.date] as string) || r.createdTime || "");
  const descKey = (c: string) => (c.split("|")[0] || "").replace(/\s+/g, " ").trim().toLowerCase();
  for (const r of all) {
    const pn = String((r.fields[F.part] as string) || "").trim();
    const comment = String(r.fields[F.comment] || "");
    if (!pn) continue;
    const key = pn + "\u241f" + descKey(comment);
    const cur = byKey.get(key);
    if (!cur || dateOf(r) > dateOf(cur)) byKey.set(key, r);
  }

  const parts: Part[] = [];
  for (const r of byKey.values()) {
    const pn = String(r.fields[F.part]).trim();
    const comment = String(r.fields[F.comment] || "");
    const rawPrice = r.fields[F.price] as number | undefined;
    // Airtable REST returns singleSelect as a plain string; the MCP/JSON form
    // returns { name }. Handle both so CNY rows aren't mislabelled as USD.
    const curRaw = r.fields[F.currency] as unknown;
    const currency =
      (typeof curRaw === "string" ? curRaw : (curRaw as { name?: string } | undefined)?.name) || "USD";
    const name = parseName(comment, pn) || pn;
    const price = typeof rawPrice === "number" && rawPrice > 0 ? Math.round(rawPrice * MARKUP * 100) / 100 : null;
    parts.push({ id: r.id, partNumber: pn, name, make: detectMake(comment, pn), price, currency });
  }

  parts.sort((a, b) => a.make.localeCompare(b.make) || a.partNumber.localeCompare(b.partNumber));
  console.log(`CATALOG: fetched ${all.length} rows -> ${parts.length} unique parts`);
  return parts;
}
