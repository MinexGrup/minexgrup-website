import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  intro
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="section pt-40 pb-14 md:pt-48">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.98] tracking-tightest text-champagne md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-champagne/70">{intro}</p>
        )}
      </Reveal>
      <div className="hairline mt-14" />
    </section>
  );
}
