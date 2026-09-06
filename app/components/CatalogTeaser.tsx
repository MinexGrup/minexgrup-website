import Link from "next/link";
import Reveal from "./Reveal";

export default function CatalogTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-base-900 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[30vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[120px]" />
      </div>
      <div className="section relative">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <p className="text-lg text-champagne/80">
              <span className="font-display text-2xl font-semibold tracking-tight text-gold-bright">10,000+ parts</span>
              <span className="mx-2 text-champagne/30">·</span>
              search by number, model, or machine
            </p>
            <Link href="/catalog" className="btn-gold">Browse the Catalog</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
