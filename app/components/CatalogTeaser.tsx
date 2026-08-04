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
            <div className="mt-10 flex justify-center">
              <Link href="/catalog" className="btn-gold">Browse the Catalog</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
