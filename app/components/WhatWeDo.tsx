import Link from "next/link";
import { productCategories, brands, brandsMinor } from "../lib/site";
import Reveal from "./Reveal";

// Short labels for the homepage tiles (full names live on the Products page).
const SHORT: Record<string, string> = {
  machinery: "Machinery",
  undercarriage: "Undercarriage",
  engines: "Engines & Power",
  "spare-parts": "Spare Parts"
};

export default function WhatWeDo() {
  return (
    <section className="wwd">
      <div className="section">
        <div className="wwd-top">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.96] tracking-tightest text-champagne md:text-5xl lg:text-[58px]">
              We sell solutions,
              <br />
              not just parts.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[540px] text-[17.5px] leading-relaxed text-champagne/75">
              Send us a machine, an engine or a part number. We identify the exact spec, compare
              suppliers across Türkiye, China and Europe, and deliver to your site — with one
              contact from request to delivery.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="wwd-cats">
            {productCategories.map((cat, i) => (
              <Link key={cat.slug} href={`/products/${cat.slug}`} className="wwd-cat">
                <span className="wwd-n">0{i + 1}</span>
                <span className="wwd-nm">{SHORT[cat.slug] ?? cat.name}</span>
                <span className="wwd-ds">{cat.blurb}</span>
                <span className="wwd-ar" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Brands (same bar as before) */}
        <Reveal delay={0.2}>
          <div className="mt-3.5 flex flex-col items-center gap-6 rounded-2xl border border-white/[0.06] bg-base-800/50 p-8 md:flex-row md:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="text-xs uppercase tracking-[0.22em] text-champagne/40">Major brands</span>
              {brands.map((b) => (
                <span key={b} className="font-display text-xl font-semibold uppercase tracking-tight text-champagne/85">
                  {b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-xs uppercase tracking-[0.22em] text-gold/60">Minor brands</span>
              {brandsMinor.map((b) => (
                <span key={b} className="text-sm text-champagne/40">{b}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
