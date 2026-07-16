import { site } from "../lib/site";

export default function TrustStrip() {
  return (
    <section className="relative border-y border-white/[0.06] bg-base-800">
      <div className="section grid grid-cols-2 gap-px py-0 md:grid-cols-4">
        {site.trust.map((item, i) => (
          <div
            key={item}
            className="flex items-center gap-4 px-2 py-8 md:px-6"
          >
            <span className="font-display text-2xl font-semibold text-gold">
              0{i + 1}
            </span>
            <span className="text-sm font-medium leading-snug text-champagne/80">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
