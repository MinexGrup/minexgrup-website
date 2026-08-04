import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import { getCatalogParts } from "../lib/airtable";

export const metadata: Metadata = { title: "Parts Catalog" };
export const dynamic = "force-static"; // fetch at build time (no serverless timeout)
export const revalidate = false;   // build-time only — never let a failed refresh empty the catalog

export default async function CatalogPage() {
  const parts = await getCatalogParts();

  return (
    <>
      <section className="section pt-28 pb-28">
        <CatalogClient parts={parts} />
      </section>
    </>
  );
}
