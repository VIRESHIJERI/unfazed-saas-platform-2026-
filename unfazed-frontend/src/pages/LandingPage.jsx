import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/landing/HeroSection';
import CapabilitiesStrip from '../components/landing/CapabilitiesStrip';
import TherapistShowcase from '../components/landing/TherapistShowcase';
import PlatformIntroSection from '../components/landing/PlatformIntroSection';
import CoreFeaturesSection from '../components/landing/CoreFeaturesSection';
import ProductExperienceSection from '../components/landing/ProductExperienceSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import FinalCtaSection from '../components/landing/FinalCtaSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#242522]">
      <Navbar />
      <main>
        <HeroSection />
        <CapabilitiesStrip />
        <TherapistShowcase />
        <PlatformIntroSection />
        <CoreFeaturesSection />
        <ProductExperienceSection />
        <HowItWorksSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
