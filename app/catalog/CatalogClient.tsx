"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { type Part, partMakes, formatPrice } from "../lib/parts";

const PAGE = 25;

export default function CatalogClient({ parts }: { parts: Part[] }) {
  const [q, setQ] = useState("");
  const [make, setMake] = useState("");
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc">("relevance");
  const [limit, setLimit] = useState(PAGE);

  // makes that actually exist in the data, in the canonical order
  const makes = useMemo(() => {
    const present = new Set(parts.map((p) => p.make));
    return (partMakes as readonly string[]).filter((m) => present.has(m));
  }, [parts]);

  const results = useMemo(() => {
    let rows = parts.filter((p) => {
      const hay = `${p.partNumber} ${p.name} ${p.make}`.toLowerCase();
      return (!q || hay.includes(q.toLowerCase())) && (!make || p.make === make);
    });
    if (sort === "price-asc") rows = [...rows].sort((a, b) => (a.price ?? 1e15) - (b.price ?? 1e15));
    if (sort === "price-desc") rows = [...rows].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return rows;
  }, [parts, q, make, sort]);

  const shown = results.slice(0, limit);
  const reset = () => setLimit(PAGE);
  const selectCls =
    "rounded-lg border border-white/10 bg-base-800 px-3 py-2.5 text-sm text-champagne/80 focus:border-gold focus:outline-none";

  if (parts.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-base-800/40 p-12 text-center text-champagne/60">
        The live catalog is being connected. In the meantime, tell us the part you need and we&apos;ll source it.
        <div className="mt-6"><Link href="/contact" className="btn-gold">Request a Quote</Link></div>
      </div>
    );
  }

  return (
    <div>
      {/* search + filters */}
      <div className="rounded-2xl border border-white/[0.08] bg-base-800/60 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-base-900 px-4 py-3.5">
          <span className="text-gold">⌕</span>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); reset(); }}
            placeholder="Search by part number, make, or keyword…"
            className="w-full bg-transparent text-sm text-champagne placeholder:text-champagne/35 focus:outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <select value={make} onChange={(e) => { setMake(e.target.value); reset(); }} className={selectCls}>
            <option value="">All makes</option>
            {makes.map((m) => (<option key={m} value={m}>{m}</option>))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${selectCls} ml-auto`}>
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* make section chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => { setMake(""); reset(); }}
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${make === "" ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-champagne/60 hover:text-gold"}`}
        >
          All
        </button>
        {makes.map((m) => (
          <button
            key={m}
            onClick={() => { setMake(m); reset(); }}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${make === m ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-champagne/60 hover:text-gold"}`}
          >
            {m}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-champagne/50">
        Showing {shown.length} of {results.length.toLocaleString()} part{results.length === 1 ? "" : "s"}
        {make ? ` · ${make}` : ""}
      </p>

      {/* results table (desktop) */}
      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-white/[0.06] md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-base-800 text-xs uppercase tracking-wider text-champagne/45">
            <tr>
              <th className="px-5 py-4 font-medium">Part number</th>
              <th className="px-5 py-4 font-medium">Description</th>
              <th className="px-5 py-4 font-medium">Make</th>
              <th className="px-5 py-4 font-medium">Price</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {shown.map((p) => (
              <tr key={p.id} className="border-t border-white/[0.05] transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4 font-mono text-champagne">{p.partNumber}</td>
                <td className="px-5 py-4 text-champagne/75">{p.name}</td>
                <td className="px-5 py-4"><span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-champagne/70">{p.make}</span></td>
                <td className="px-5 py-4 text-champagne">{p.price !== null ? formatPrice(p.price, p.currency) : <span className="text-gold">On request</span>}</td>
                <td className="px-5 py-4 text-right">
                  <Link href="/contact" className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-bright">Get Quote →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* results cards (mobile) */}
      <div className="mt-4 grid gap-3 md:hidden">
        {shown.map((p) => (
          <div key={p.id} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-champagne">{p.partNumber}</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-champagne/70">{p.make}</span>
            </div>
            <p className="mt-2 text-sm text-champagne/75">{p.name}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-champagne">{p.price !== null ? formatPrice(p.price, p.currency) : <span className="text-gold">On request</span>}</span>
              <Link href="/contact" className="text-xs font-semibold uppercase tracking-wider text-gold">Get Quote →</Link>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-base-800/40 p-10 text-center text-champagne/50">
          No parts match your search. Try a different term — or{" "}
          <Link href="/contact" className="text-gold hover:text-gold-bright">send us the request</Link> and we&apos;ll source it.
        </div>
      )}

      {limit < results.length && (
        <div className="mt-8 flex justify-center">
          <button onClick={() => setLimit((l) => l + PAGE)} className="btn-ghost">Load more</button>
        </div>
      )}
    </div>
  );
}
