"use client";

import { useRef, useState } from "react";

const inputCls =
  "w-full rounded-lg border border-white/10 bg-base-900 px-4 py-3 text-sm text-champagne placeholder:text-champagne/35 focus:border-gold focus:outline-none transition-colors";
const labelCls = "block text-xs uppercase tracking-[0.18em] text-champagne/50 mb-2";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  // Time the form was rendered — used server-side to reject instant bot submits.
  const renderedAt = useRef<number>(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload["_ts"] = String(renderedAt.current);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <div className="card flex flex-col items-center p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-2xl text-gold">✓</div>
        <h3 className="mt-6 font-display text-2xl font-semibold uppercase tracking-tight text-champagne">Request received</h3>
        <p className="mt-3 max-w-sm text-sm text-champagne/60">
          Thank you — we&apos;ll review the specs and get back to you with the best option on price, quality, and lead time.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-ghost mt-8">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-8 md:p-10">
      {/* Honeypot — hidden from humans, tempting to bots. Real users leave it empty. */}
      <div className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company website (leave blank)
          <input
            type="text"
            name="company_url"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Name *</label>
          <input name="name" required className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label className={labelCls}>Company</label>
          <input name="company" className={inputCls} placeholder="Company name" />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input name="email" type="email" required className={inputCls} placeholder="you@company.com" />
        </div>
        <div>
          <label className={labelCls}>Location</label>
          <input name="location" className={inputCls} placeholder="Country / project site" />
        </div>
        <div>
          <label className={labelCls}>Part number / machine model</label>
          <input name="partNumber" className={inputCls} placeholder="e.g. CAT C27 injector, PC2000 track chain" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Quantity</label>
            <input name="quantity" className={inputCls} placeholder="e.g. 4" />
          </div>
          <div>
            <label className={labelCls}>Urgency</label>
            <select name="urgency" className={inputCls}>
              <option value="">Select</option>
              <option>Standard</option>
              <option>Priority</option>
              <option>Urgent / breakdown</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <label className={labelCls}>Details</label>
        <textarea name="message" rows={4} className={inputCls} placeholder="Tell us what you need — specs, machine, condition, timeline…" />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-gold mt-7 w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send Request"}
      </button>
      <p className="mt-4 text-center text-xs text-champagne/40">
        We reply with matched options on price, quality, and lead time.
      </p>
    </form>
  );
}
