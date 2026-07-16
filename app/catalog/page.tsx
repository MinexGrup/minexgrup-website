import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = { title: "Parts Catalog" };

export default function CatalogPage() {
  return (
    <>
      <PageHero
        eyebrow="Parts Catalog"
        title="Find the exact part"
        intro="Search 7,000+ engine, undercarriage, and spare parts by part number, machine model, or keyword — then add what you need to a quote request."
      />
      <section className="section pb-28">
        <CatalogClient />
      </section>
    </>
  );
}
