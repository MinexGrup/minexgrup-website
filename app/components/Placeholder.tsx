// Polished image placeholder — a styled slot until real machine photos are added.
export default function Placeholder({
  label,
  ratio = "4/3",
  className = ""
}: {
  label?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-white/[0.07] bg-base-800 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* subtle industrial pattern */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #c9a24b 0 1px, transparent 1px 14px)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base-900/80 to-transparent" />
      {/* crane/equipment glyph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 48 48" className="h-12 w-12 text-gold/30" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 40h30l-3-9H12l-6 9Z" />
          <path d="M14 31l3-9m14 9-2-6" />
          <circle cx="22" cy="20" r="3" />
          <path d="M22 17 34 9m-12 8L10 12" />
        </svg>
      </div>
      {label && (
        <span className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.16em] text-champagne/45">
          {label}
        </span>
      )}
    </div>
  );
}
