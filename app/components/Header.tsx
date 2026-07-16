"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "../lib/site";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-base-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section flex h-20 items-center justify-between">
        <Link href="/" aria-label="Minex Grup home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-champagne/75 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-gold">
            Request a Quote
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-champagne lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/[0.06] bg-base-900/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <nav className="section flex flex-col gap-1 py-4">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-champagne/80 transition-colors hover:bg-white/5 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-gold mt-3 w-full">
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
