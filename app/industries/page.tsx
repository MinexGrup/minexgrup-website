import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Media from "../components/Media";
import { industries } from "../lib/site";

export const metadata: Metadata = { title: "Industries" };

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Mining · Quarry · Construction"
        intro="Durable equipment matters most where conditions are hardest. Here's what each sector demands — the conditions, the challenges, and what Minex supplies to keep production moving."
      />

      <section className="section space-y-20 pb-28">
        {industries.map((ind, i) => (
          <Reveal key={ind.slug}>
            <div id={ind.slug} className="scroll-mt-28">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <Media src={ind.image} label={ind.name} ratio="4/3" />
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                    0{i + 1} — {ind.name}
                  </span>
                  <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-tightest text-champagne">
                    {ind.name}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-champagne/75">{ind.intro}</p>
                  <p className="mt-4 text-sm uppercase tracking-[0.15em] text-champagne/40">{ind.conditions}</p>
                </div>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <div className="card p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">The challenges</h3>
                  <ul className="mt-5 space-y-3">
                    {ind.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-sm leading-relaxed text-champagne/75">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne/30" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">What we supply</h3>
                  <ul className="mt-5 space-y-3">
                    {ind.supplies.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-sm leading-relaxed text-champagne/80">
                        <span className="mt-0.5 text-gold">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div className="rounded-3xl border border-gold/20 bg-base-800/50 p-10 text-center md:p-14">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tightest text-champagne md:text-4xl">
              Tell us your operation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-champagne/70">
              Whatever the ground, we source equipment and parts built to survive it — and get them to you.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="btn-gold">Request a Quote</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
