import type { ReactNode } from "react";
import Link from "next/link";
import { industries } from "../lib/site";
import Reveal from "./Reveal";

// Lucide-style stroke icons, one per industry slug.
const icons: Record<string, ReactNode> = {
  mining: (
    <path d="M14 4l6 6-3 3-6-6zM11 7L3 15v6h6l8-8M9 13l2 2" />
  ),
  quarry: (
    <path d="M3 20h18L17 8l-4 4-3-5-4 8zM8 20l2-4M14 20l1.5-3" />
  ),
  construction: (
    <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h6" />
  )
};

export default function IndustriesPreview() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-base-800/40 py-24 md:py-32">
      <div className="section">
        <Reveal>
          <p className="eyebrow">Where we work</p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tightest text-champagne md:text-5xl">
            Built for the hardest ground
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 0.1}>
              <Link
                href={`/industries#${ind.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-base-800/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:bg-base-800"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/[0.08] text-gold-bright">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      {icons[ind.slug]}
                    </svg>
                  </span>
                  <span className="text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </div>
                <h3 className="mt-8 font-display text-3xl font-bold uppercase tracking-tight text-gold">
                  {ind.name}
                </h3>
                <p className="mt-5 border-t border-white/[0.06] pt-5 text-sm leading-relaxed text-champagne/75">
                  {ind.supply}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
