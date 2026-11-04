import Hero from "./components/Hero";
import WhatWeDo from "./components/WhatWeDo";
import World3D from "./components/World3D";
import GeographyBlock from "./components/GeographyBlock";
import IndustriesPreview from "./components/IndustriesPreview";
import CatalogTeaser from "./components/CatalogTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <World3D />
      <GeographyBlock />
      <IndustriesPreview />
      <CatalogTeaser />
    </>
  );
}
