import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

import HeroSection from "@/components/sections/HeroSection";
import HeroVideoSection from "@/components/sections/HeroVideoSection";
import StatsSection from "@/components/sections/StatsSection";
import VideoCarouselSection from "@/components/sections/VideoCarouselSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import WhyKoreaSection from "@/components/sections/WhyKoreaSection";
import GetStartedSection from "@/components/sections/GetStartedSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      
      <HeroSection />
      <HeroVideoSection />
      <StatsSection />
      <VideoCarouselSection />
      <ShowcaseSection />
      <FeaturesSection />
      <GetStartedSection />
      <WhyKoreaSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
