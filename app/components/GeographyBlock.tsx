import { geography } from "../lib/site";
import Reveal from "./Reveal";
import SupplyMap from "./SupplyMap";

export default function GeographyBlock() {
  return (
    <section className="section py-24 md:py-32">
      <Reveal>
        <div className="max-w-2xl">
          <p className="eyebrow">Geography &amp; trust</p>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tightest text-champagne md:text-5xl">
            One network,<br />across the globe
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.06] bg-base-800/40 p-4 md:p-8">
          <SupplyMap className="w-full" />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {geography.map((g) => (
            <div key={g.region} className="card p-6">
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${g.hub ? "bg-gold-bright" : "bg-gold"}`} />
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-champagne">
                  {g.region}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-champagne/60">{g.role}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
