"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { sampleParts, partCategories, partBrands, partConditions } from "../lib/parts";

const PAGE = 25;

export default function CatalogClient() {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc">("relevance");
  const [limit, setLimit] = useState(PAGE);

  const results = useMemo(() => {
    let rows = sampleParts.filter((p) => {
      const hay = `${p.partNumber} ${p.description} ${p.machine} ${p.brand}`.toLowerCase();
      return (
        (!q || hay.includes(q.toLowerCase())) &&
        (!brand || p.brand === brand) &&
        (!category || p.category === category) &&
        (!condition || p.condition === condition)
      );
    });
    if (sort === "price-asc") rows = [...rows].sort((a, b) => (a.price ?? 1e12) - (b.price ?? 1e12));
    if (sort === "price-desc") rows = [...rows].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return rows;
  }, [q, brand, category, condition, sort]);

  const shown = results.slice(0, limit);

  function reset() {
    setLimit(PAGE);
  }

  const selectCls =
    "rounded-lg border border-white/10 bg-base-800 px-3 py-2.5 text-sm text-champagne/80 focus:border-gold focus:outline-none";

  return (
    <div>
      <div className="rounded-2xl border border-white/[0.08] bg-base-800/60 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-base-900 px-4 py-3.5">
          <span className="text-gold">⌕</span>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); reset(); }}
            placeholder="Search by part number, machine model, or keyword…"
            className="w-full bg-transparent text-sm text-champagne placeholder:text-champagne/35 focus:outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <select value={brand} onChange={(e) => { setBrand(e.target.value); reset(); }} className={selectCls}>
            <option value="">All brands</option>
            {partBrands.map((b) => (<option key={b} value={b}>{b}</option>))}
          </select>
          <select value={category} onChange={(e) => { setCategory(e.target.value); reset(); }} className={selectCls}>
            <option value="">All categories</option>
            {partCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select value={condition} onChange={(e) => { setCondition(e.target.value); reset(); }} className={selectCls}>
            <option value="">Any condition</option>
            {partConditions.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${selectCls} ml-auto`}>
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-champagne/50">
        Showing {shown.length} of {results.length} result{results.length === 1 ? "" : "s"}{" "}
        <span className="text-champagne/30">· sample data — full catalog (7,000+) connects via Airtable in phase 2</span>
      </p>

      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-white/[0.06] md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-base-800 text-xs uppercase tracking-wider text-champagne/45">
            <tr>
              <th className="px-5 py-4 font-medium">Part number</th>
              <th className="px-5 py-4 font-medium">Description</th>
              <th className="px-5 py-4 font-medium">Machine</th>
              <th className="px-5 py-4 font-medium">Condition</th>
              <th className="px-5 py-4 font-medium">Price</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {shown.map((p) => (
              <tr key={p.id} className="border-t border-white/[0.05] transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4 font-mono text-champagne">{p.partNumber}</td>
                <td className="px-5 py-4 text-champagne/75">
                  {p.description}
                  <span className="mt-0.5 block text-xs text-champagne/40">{p.brand} · {p.category}</span>
                </td>
                <td className="px-5 py-4 text-champagne/70">{p.machine}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-champagne/70">{p.condition}</span>
                </td>
                <td className="px-5 py-4 text-champagne">
                  {p.price !== null ? `$${p.price.toLocaleString()}` : <span className="text-gold">On request</span>}
                  <span className="mt-0.5 block text-xs text-champagne/40">{p.availability}</span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href="/contact" className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-bright">Get Quote →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
        {shown.map((p) => (
          <div key={p.id} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-champagne">{p.partNumber}</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-champagne/70">{p.condition}</span>
            </div>
            <p className="mt-2 text-sm text-champagne/75">{p.description}</p>
            <p className="mt-1 text-xs text-champagne/40">{p.brand} · {p.machine}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-champagne">{p.price !== null ? `$${p.price.toLocaleString()}` : <span className="text-gold">On request</span>}</span>
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
          <button onClick={() => setLimit((l) => l + PAGE)} className="btn-ghost">
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
