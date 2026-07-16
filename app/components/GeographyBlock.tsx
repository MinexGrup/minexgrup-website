import { geography } from "../lib/site";
import Reveal from "./Reveal";

export default function GeographyBlock() {
  return (
    <section className="section py-24 md:py-32">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div>
            <p className="eyebrow">Geography &amp; trust</p>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tightest text-champagne md:text-5xl">
              One network,<br />three continents
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-champagne/70">
              Head base in Türkiye for logistics and coordination. Manufacturing and
              large stock in China. OEM and quality suppliers in Europe. Serving
              Azerbaijan and regional projects.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2">
            {geography.map((g) => (
              <div key={g.region} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-champagne">
                    {g.region}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-champagne/60">{g.role}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
