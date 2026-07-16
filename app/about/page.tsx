import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Placeholder from "../components/Placeholder";
import { site, geography, processSteps, valueProps, stats } from "../lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We sell solutions, not just parts"
        intro={site.description}
      />

      {/* Overview */}
      <section className="section pb-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-champagne/75">
              <p>
                Minex Grup is a B2B supply and sourcing company for heavy mining and construction
                equipment. We are <span className="text-champagne">not a manufacturer, not a marketplace,
                and not a random trader</span> — our value is knowing where to source the right equipment,
                what fits technically, and how to deliver it reliably.
              </p>
              <p>
                You send a request. We identify the correct specs, find suitable suppliers across
                Türkiye, China, and Europe, compare price, quality, and lead time, and return the best
                option — then handle logistics through to delivery. One point of contact, from request
                to arrival.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Placeholder label="Minex Grup" ratio="4/3" />
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-base-900 p-8">
                <p className="font-display text-4xl font-bold text-gold">{s.value}</p>
                <p className="mt-2 text-sm leading-snug text-champagne/60">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* How we work */}
      <section className="border-y border-white/[0.06] bg-base-800/40 py-24">
        <div className="section">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-tightest text-champagne md:text-5xl">
              From request to delivery
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06}>
                <div className="card h-full p-6">
                  <span className="font-display text-3xl font-bold text-gold/80">{step.n}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-tight text-champagne">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-champagne/60">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why clients work with us */}
      <section className="section py-24">
        <Reveal>
          <p className="eyebrow">Why clients work with us</p>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-tightest text-champagne md:text-5xl">
            Technically aware. Supplier-connected.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="card h-full p-8">
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-gold">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-champagne/70">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Geography */}
      <section className="section pb-24">
        <Reveal>
          <div className="rounded-3xl border border-white/[0.06] bg-base-800/40 p-10 md:p-14">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">Geography &amp; trust</p>
                <h2 className="mt-5 font-display text-3xl font-bold uppercase tracking-tightest text-champagne md:text-4xl">
                  One network, three continents
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-champagne/60">
                Head base in Türkiye for logistics and coordination, manufacturing and stock in China,
                OEM and quality suppliers in Europe — serving Azerbaijan and regional projects.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {geography.map((g) => (
                <div key={g.region} className="rounded-xl border border-white/[0.06] bg-base-900 p-6">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-champagne">{g.region}</h3>
                  </div>
                  <p className="mt-3 text-sm text-champagne/60">{g.role}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="section pb-28">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-gold/20 bg-gradient-to-br from-base-800 to-base-900 p-10 text-center md:flex-row md:p-14 md:text-left">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tightest text-champagne md:text-4xl">
              Ready when your machine is
            </h2>
            <Link href="/contact" className="btn-gold shrink-0">Request a Quote</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
