import Placeholder from "./Placeholder";

// Shows a real image when `src` is provided, otherwise the styled placeholder.
// `contain` floats a cut-out part on the dark card; `spin` slowly rotates it.
export default function Media({
  src,
  label,
  ratio = "4/3",
  className = "",
  contain = false,
  spin = false
}: {
  src?: string;
  label?: string;
  ratio?: string;
  className?: string;
  contain?: boolean;
  spin?: boolean;
}) {
  if (!src) return <Placeholder label={label} ratio={ratio} className={className} />;

  if (contain) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl border border-white/[0.07] bg-base-800 ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.08] blur-2xl" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label || ""}
          className={`relative h-full w-full object-contain p-4 ${spin ? "animate-spin-slow" : ""}`}
          loading="lazy"
        />
        {label && (
          <span className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.16em] text-champagne/70">{label}</span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/[0.07] bg-base-800 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label || ""} className="h-full w-full object-cover" loading="lazy" />
      {label && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-900/70 to-transparent" />
          <span className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.16em] text-champagne/80">{label}</span>
        </>
      )}
    </div>
  );
}
