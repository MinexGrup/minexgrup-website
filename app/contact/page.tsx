import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import ContactForm from "./ContactForm";
import { site, geography } from "../lib/site";
import SupplyMap from "../components/SupplyMap";

export const metadata: Metadata = { title: "Request a Quote" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Send a part number. We'll handle the rest."
        intro="Tell us the machine, engine, or part you need. We identify the correct specs, source suitable suppliers, and return the best option — one contact from request to delivery."
      />
      <section className="section grid gap-12 pb-28 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="flex flex-col gap-6">
            <div className="card p-8">
              <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-gold">Contact</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <span className="block text-xs uppercase tracking-[0.18em] text-champagne/40">Email</span>
                  <a href={`mailto:${site.contact.email}`} className="text-champagne/85 transition-colors hover:text-gold">{site.contact.email}</a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-[0.18em] text-champagne/40">Phone</span>
                  <a href={`tel:${site.contact.phone}`} className="text-champagne/85 transition-colors hover:text-gold">{site.contact.phoneDisplay}</a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-[0.18em] text-champagne/40">Address</span>
                  <span className="text-champagne/85">{site.contact.address}</span>
                </li>
              </ul>
            </div>

            {/* Coverage / network map */}
            <div className="card overflow-hidden p-8">
              <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-gold">Supply network</h3>
              <div className="relative mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-base-900 p-2">
                <SupplyMap className="w-full" />
              </div>
              <ul className="mt-5 space-y-2 text-xs text-champagne/55">
                {geography.map((g) => (
                  <li key={g.region}><span className="text-champagne/80">{g.region}</span> — {g.role}</li>
                ))}
              </ul>
            </div>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
