import Link from "next/link";
import Reveal from "./Reveal";

export default function CatalogTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-base-900 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[130px]" />
      </div>
      <div className="section relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">Parts Catalog</p>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tightest text-champagne md:text-6xl">
              10,000+ parts.<br />Search by number, model, or machine.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-champagne/70">
              Find the exact part number, engine, or undercarriage component you need —
              then add it straight to a quote request.
            </p>
            <div className="mt-9 flex justify-center">
              <Link href="/catalog" className="btn-gold">
                Browse the Catalog
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Faux search bar preview */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/[0.08] bg-base-800/70 p-3 backdrop-blur">
            <div className="flex items-center gap-3 rounded-xl bg-base-900 px-5 py-4">
              <span className="text-gold">⌕</span>
              <span className="text-sm text-champagne/45">
                e.g. “Cat C27 injector”, “PC2000 track chain”, part #...
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
