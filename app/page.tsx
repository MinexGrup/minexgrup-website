import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import ProductsPreview from "./components/ProductsPreview";
import IndustriesPreview from "./components/IndustriesPreview";
import GeographyBlock from "./components/GeographyBlock";
import CatalogTeaser from "./components/CatalogTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProductsPreview />
      <IndustriesPreview />
      <GeographyBlock />
      <CatalogTeaser />
    </>
  );
}
