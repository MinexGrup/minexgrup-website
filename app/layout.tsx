import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { site } from "./lib/site";
import Header from "./components/Header";
import Footer from "./components/Footer";

const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`
  },
  description: site.description,
  metadataBase: new URL("https://minexgrup.com"),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
