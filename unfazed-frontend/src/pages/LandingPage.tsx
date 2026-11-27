import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  BenchmarksBand,
  CapabilitiesCarouselBand,
  FaqBand,
  FinalCtaBand,
  GettingStartedBand,
  HandleFinderBand,
  HeroBand,
  LaunchPillarsBand,
  ProductStageBand,
  ShowcaseGalleryBand,
} from '../components/landing/HomeSections';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1D1B]">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] bg-[#FAF8F4] px-4 py-3 text-sm font-semibold text-[#111312] focus:not-sr-only focus:outline-2 focus:outline-[#4E6E5D]"
      >
        Skip to content
      </a>
      <Navbar transparentOverHero />
      <main id="main-content">
        <HeroBand />
        <BenchmarksBand />
        <CapabilitiesCarouselBand />
        <ProductStageBand />
        <GettingStartedBand />
        <HandleFinderBand />
        <ShowcaseGalleryBand />
        <LaunchPillarsBand />
        <FaqBand />
        <FinalCtaBand />
      </main>
      <Footer />
    </div>
  );
}
