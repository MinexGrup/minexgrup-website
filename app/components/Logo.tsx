type Variant = "lockup" | "mark" | "full";

export default function Logo({
  variant = "lockup",
  className = ""
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "mark") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/minex-mark.png" alt="Minex Grup" className={className || "h-9 w-auto"} />
    );
  }

  if (variant === "full") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/minex-logo.png" alt="Minex Grup" className={className || "h-24 w-auto"} />
    );
  }

  // lockup: mark icon + wordmark text
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/minex-mark.png" alt="" aria-hidden="true" className="h-9 w-auto" />
      <span className="font-display text-lg font-semibold uppercase tracking-tightest leading-none">
        <span className="text-champagne">MINEX</span> <span className="text-gold">GRUP</span>
      </span>
    </span>
  );
}
