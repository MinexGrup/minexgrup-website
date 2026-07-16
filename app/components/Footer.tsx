import Link from "next/link";
import { site, productCategories } from "../lib/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-base-900">
      <div className="section grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo variant="full" className="h-20 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-champagne/60">
            {site.tagline} Heavy mining and construction equipment, engines, undercarriage,
            and parts — sourced through a trusted global network.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Products</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {productCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="text-champagne/70 transition-colors hover:text-gold"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/industries" className="text-champagne/70 transition-colors hover:text-gold">Industries</Link></li>
            <li><Link href="/catalog" className="text-champagne/70 transition-colors hover:text-gold">Parts Catalog</Link></li>
            <li><Link href="/about" className="text-champagne/70 transition-colors hover:text-gold">About Us</Link></li>
            <li><Link href="/contact" className="text-champagne/70 transition-colors hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-champagne/70">
            <li>
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-gold">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phone}`} className="transition-colors hover:text-gold">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>{site.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="section flex flex-col items-center justify-between gap-4 py-6 text-xs text-champagne/45 md:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          {/* TODO: business disclaimer */}
          <p className="text-champagne/35">
            Heavy machinery supply &amp; sourcing · Türkiye
          </p>
        </div>
      </div>
    </footer>
  );
}
