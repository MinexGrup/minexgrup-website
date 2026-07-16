import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-bold text-gold">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold uppercase tracking-tight text-champagne">Page not found</h1>
      <p className="mt-3 text-champagne/60">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn-gold mt-8">Back home</Link>
    </section>
  );
}
