import type { ReactNode } from "react";
import Link from "next/link";
import { productCategories, brands, brandsMinor, stats } from "../lib/site";
import Reveal from "./Reveal";
import Counter from "./Counter";

// Lucide-style stroke icons, one per product category slug.
const icons: Record<string, ReactNode> = {
  machinery: (
    <path d="M3 21h18M6 21V10l5-2 3 5M14 13l4-1 3 4v5M4 21v-3M9 5l6-2 1 3-6 2z" />
  ),
  undercarriage: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 14V8h9l3 6M9 17h6M9 8V5h4" />
    </>
  ),
  engines: (
    <path d="M5 9h3l2-2h4v3h3l2 2v3h-2v2h-4l-2 2H8v-3H5zM3 12h2M19 12h2" />
  ),
  "spare-parts": (
    <path d="M14.5 5.5a3 3 0 0 0-4 4L4 16v4h4l6.5-6.5a3 3 0 0 0 4-4l-2.3 2.3-1.7-1.7z" />
  )
};

export default function ProductsPreview() {
  return (
    <section className="section py-24 md:py-32">
      <div className="grid gap-4 md:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4">
        {/* Feature tile — intro + animated proof */}
        <Reveal className="md:col-span-2 lg:col-span-2 lg:row-span-2">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] via-base-800/60 to-base-800/60 p-8 md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative">
              <p className="eyebrow">What we supply</p>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tightest text-champagne md:text-5xl">
                Four categories.
                <br />
                One point of contact.
              </h2>
              <p className="mt-5 max-w-md text-champagne/70">
                Machines, undercarriage, engines and spare parts — matched to spec
                and sourced across Türkiye, China and Europe.
              </p>
            </div>

            <div className="relative mt-10">
              <div className="grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4 lg:grid-cols-2">
                {stats.map((s) => (
                  <div key={s.label}>
                    <Counter
                      value={s.value}
                      className="block font-display text-4xl font-bold text-gold md:text-5xl"
                    />
                    <span className="mt-2 block text-xs leading-snug text-champagne/60">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/products" className="btn-ghost mt-8 inline-flex">
                All products
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Category tiles */}
        {productCategories.map((cat, i) => (
          <Reveal key={cat.slug} delay={i * 0.06}>
            <Link
              href={`/products/${cat.slug}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-base-800/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:bg-base-800"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/[0.08] text-gold-bright">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[22px] w-[22px]"
                  >
                    {icons[cat.slug]}
                  </svg>
                </span>
                <span className="text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </div>
              <div className="mt-6">
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-champagne">
                  {cat.name}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.examples.slice(0, 2).map((ex) => (
                    <span
                      key={ex}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-champagne/55"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Brands */}
      <Reveal>
        <div className="mt-4 flex flex-col items-center gap-6 rounded-2xl border border-white/[0.06] bg-base-800/50 p-8 md:flex-row md:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-xs uppercase tracking-[0.22em] text-champagne/40">
              Major brands
            </span>
            {brands.map((b) => (
              <span
                key={b}
                className="font-display text-xl font-semibold uppercase tracking-tight text-champagne/85"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-xs uppercase tracking-[0.22em] text-gold/60">
              Minor brands
            </span>
            {brandsMinor.map((b) => (
              <span key={b} className="text-sm text-champagne/40">
                {b}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
