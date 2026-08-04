"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-base-900">
      {/* Full-bleed cinematic video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Legibility + mood overlays */}
      <div className="absolute inset-0 bg-base-900/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-base-900 via-base-900/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-transparent to-base-900/60" />

      {/* Copy */}
      <div className="section relative z-10 pt-28 pb-16">
        <div className="max-w-2xl">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Türkiye · China · Europe supply network
          </motion.p>

          <motion.h1
            className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tightest text-champagne sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            Heavy machinery,
            <br />
            <span className="text-gold-sheen animate-shimmer">sourced right.</span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-champagne/80"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Machines, engines, undercarriage and spare parts — sourced to spec,
            delivered worldwide.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <Link href="/contact" className="btn-gold">
              Request a Quote
            </Link>
            <Link href="/products" className="btn-ghost">
              Explore Products
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-champagne/20 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
