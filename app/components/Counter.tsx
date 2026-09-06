"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up. Accepts display strings like "6", "10,000+", "1".
 * Preserves any leading prefix and trailing suffix (e.g. the "+"),
 * re-inserts thousands separators, and respects prefers-reduced-motion.
 */
export default function Counter({
  value,
  duration = 1200,
  className = ""
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(() => leadingZeroForm(value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const digits = value.replace(/[^0-9]/g, "");
    const target = parseInt(digits || "0", 10);
    // Prefix = leading non-digits, suffix = trailing non-digits (e.g. the "+").
    // Any interior separators (commas) fold into `digits` and are re-inserted
    // by toLocaleString during the animation.
    const prefix = (value.match(/^[^0-9]*/) || [""])[0];
    const suffix = (value.match(/[^0-9]*$/) || [""])[0];

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!digits || reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const n = Math.round(target * eased);
        setDisplay(prefix + n.toLocaleString("en-US") + suffix);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

// Render a same-width "0" placeholder before animation so layout doesn't jump.
function leadingZeroForm(value: string): string {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return value;
  const prefix = (value.match(/^[^0-9]*/) || [""])[0];
  const suffix = (value.match(/[^0-9]*$/) || [""])[0];
  return prefix + "0" + suffix;
}
