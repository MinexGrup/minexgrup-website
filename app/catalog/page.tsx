import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import CatalogClient from "./CatalogClient";
import { getCatalogParts } from "../lib/airtable";

export const metadata: Metadata = { title: "Parts Catalog" };
export const dynamic = "force-static"; // fetch at build time (no serverless timeout)
export const revalidate = 86400;   // rebuild data daily

export default async function CatalogPage() {
  const parts = await getCatalogParts();

  return (
    <>
      <PageHero
        eyebrow="Parts Catalog"
        title="Find the exact part"
        intro="Search our catalog by part number, machine make, or keyword — then add what you need straight to a quote request."
      />
      <section className="section pb-28">
        <CatalogClient parts={parts} />
      </section>
    </>
  );
}
