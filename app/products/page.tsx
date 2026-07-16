import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Media from "../components/Media";
import { productCategories, brands, brandsComingSoon } from "../lib/site";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Equipment, engines, undercarriage & parts"
        intro="Four categories, sourced and matched to spec through our global supplier network. Send a request and we return the best option on price, quality, and lead time — from a single wear part to a complete machine."
      />

      <section className="section pb-28">
        <div className="grid gap-6 md:grid-cols-2">
          {productCategories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.06}>
              <Link
                href={`/products/${cat.slug}`}
                className="card group flex h-full flex-col overflow-hidden"
              >
                <Media src={cat.hero} label={cat.name} ratio="16/9" contain={cat.contain} className="rounded-none border-0 border-b border-white/[0.06]" />
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                      0{i + 1}
                    </span>
                    <span className="text-gold opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-tight text-champagne">
                    {cat.name}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-champagne/60">{cat.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.examples.map((ex) => (
                      <span key={ex} className="rounded-full border border-white/10 px-3 py-1 text-xs text-champagne/55">
                        {ex}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 text-sm font-semibold uppercase tracking-wider text-champagne/70 transition-colors group-hover:text-gold">
                    View category →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-white/[0.06] bg-base-800/50 p-8">
            <span className="text-xs uppercase tracking-[0.22em] text-champagne/40">Brands</span>
            {brands.map((b) => (
              <span key={b} className="font-display text-xl font-semibold uppercase tracking-tight text-champagne/85">{b}</span>
            ))}
            <span className="ml-auto text-xs uppercase tracking-[0.22em] text-gold/60">Coming soon</span>
            {brandsComingSoon.map((b) => (
              <span key={b} className="text-sm text-champagne/40">{b}</span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
