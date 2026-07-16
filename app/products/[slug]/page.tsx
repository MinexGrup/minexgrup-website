import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import Media from "../../components/Media";
import { productCategories, industries } from "../../lib/site";

export function generateStaticParams() {
  return productCategories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = productCategories.find((c) => c.slug === params.slug);
  return { title: cat ? cat.name : "Product" };
}

export default function ProductCategoryPage({ params }: { params: { slug: string } }) {
  const cat = productCategories.find((c) => c.slug === params.slug);
  if (!cat) return notFound();

  const idx = productCategories.findIndex((c) => c.slug === cat.slug);
  const next = productCategories[(idx + 1) % productCategories.length];

  return (
    <>
      <PageHero eyebrow="Product category" title={cat.name} intro={cat.intro} />

      <section className="section pb-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: hero image + models */}
          <Reveal>
            <div>
              <Media src={cat.hero} label={cat.name} ratio="16/9" contain={cat.contain} />
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-tight text-gold">
                What we supply
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {cat.supplies.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm leading-relaxed text-champagne/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {s}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-tight text-gold">
                Examples
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {cat.models.map((m) => (
                  <div key={m.name} className="card overflow-hidden">
                    <Media src={m.image} label="" ratio={(m.contain ?? cat.contain) ? "1/1" : "4/3"} contain={m.contain ?? cat.contain} spin={m.spin} className="rounded-none border-0 border-b border-white/[0.06]" />
                    <div className="p-5">
                      <p className="font-display text-lg font-semibold uppercase tracking-tight text-champagne">{m.name}</p>
                      <p className="mt-1 text-sm text-champagne/55">{m.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-champagne/45">
                Real photos and full model galleries will populate here as examples are added.
              </p>
            </div>
          </Reveal>

          {/* Right: features + request */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="card p-8">
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-champagne">
                  Why source it with us
                </h3>
                <ul className="mt-5 space-y-4">
                  {cat.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-champagne/75">
                      <span className="mt-0.5 text-gold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/contact" className="btn-gold w-full">Send Request</Link>
                </div>
              </div>

              <div className="card mt-5 p-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Industries served</h3>
                <ul className="mt-4 space-y-2 text-sm text-champagne/70">
                  {industries.map((ind) => (
                    <li key={ind.slug}>
                      <Link href={`/industries#${ind.slug}`} className="transition-colors hover:text-gold">
                        · {ind.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next category */}
      <section className="section pb-28">
        <div className="hairline mb-8" />
        <Link href={`/products/${next.slug}`} className="group flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-champagne/40">Next category</span>
            <p className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight text-champagne transition-colors group-hover:text-gold">
              {next.name}
            </p>
          </div>
          <span className="text-2xl text-gold">→</span>
        </Link>
      </section>
    </>
  );
}
