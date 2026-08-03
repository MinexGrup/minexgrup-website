type Variant = "lockup" | "mark" | "full";

function Mark({ className, label }: { className?: string; label?: string }) {
  return (
    <span className="logo-sheen">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/minex-mark.png"
        alt={label ?? ""}
        aria-hidden={label ? undefined : true}
        className={className || "h-9 w-auto"}
      />
      <span className="logo-sheen__glint" aria-hidden="true" />
    </span>
  );
}

export default function Logo({
  variant = "lockup",
  className = ""
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "mark") {
    return <Mark className={className} label="Minex Grup" />;
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
      <Mark />
      <span className="font-display text-lg font-semibold uppercase tracking-tightest leading-none">
        <span className="text-champagne">MINEX</span> <span className="text-gold">GRUP</span>
      </span>
    </span>
  );
}
