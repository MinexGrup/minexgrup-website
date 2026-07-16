import Link from "next/link";
import { industries } from "../lib/site";
import Reveal from "./Reveal";

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

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 0.1}>
              <Link
                href={`/industries#${ind.slug}`}
                className="card group flex h-full flex-col justify-between p-8"
              >
                <div>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-gold">
                    {ind.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-champagne/60">
                    {ind.conditions}
                  </p>
                </div>
                <p className="mt-6 border-t border-white/[0.06] pt-5 text-sm leading-relaxed text-champagne/75">
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
