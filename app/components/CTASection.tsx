import Link from "next/link";
import { site } from "../lib/site";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="section pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-base-800 to-base-900 p-10 md:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-4xl font-bold uppercase leading-tight tracking-tightest text-champagne md:text-5xl">
                Send us a part number.<br />We&apos;ll handle the rest.
              </h2>
              <p className="mt-5 max-w-xl text-champagne/70">
                One request. Multiple supplier options. One contact, from quote to delivery.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-4">
              <Link href="/contact" className="btn-gold">Request a Quote</Link>
              <a href={`mailto:${site.contact.email}`} className="text-center text-sm text-champagne/60 transition-colors hover:text-gold">
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
