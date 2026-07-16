import Link from "next/link";
import { productCategories, brands, brandsComingSoon } from "../lib/site";
import Reveal from "./Reveal";

export default function ProductsPreview() {
  return (
    <section className="section py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <p className="eyebrow">What we supply</p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tightest text-champagne md:text-5xl">
            Four categories.<br />One point of contact.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link href="/products" className="btn-ghost shrink-0">
            All products
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {productCategories.map((cat, i) => (
          <Reveal key={cat.slug} delay={i * 0.08}>
            <Link href={`/products/${cat.slug}`} className="card group flex h-full flex-col p-8">
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl font-semibold text-white/[0.08] transition-colors group-hover:text-gold/25">
                  0{i + 1}
                </span>
                <span className="mt-2 text-gold opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight text-champagne">
                {cat.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-champagne/60">{cat.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {cat.examples.slice(0, 4).map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-champagne/55"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Brands */}
      <Reveal>
        <div className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-white/[0.06] bg-base-800/50 p-8 md:flex-row md:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-xs uppercase tracking-[0.22em] text-champagne/40">Brands</span>
            {brands.map((b) => (
              <span key={b} className="font-display text-xl font-semibold uppercase tracking-tight text-champagne/85">
                {b}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-xs uppercase tracking-[0.22em] text-gold/60">Coming soon</span>
            {brandsComingSoon.map((b) => (
              <span key={b} className="text-sm text-champagne/40">{b}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
