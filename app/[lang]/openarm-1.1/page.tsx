import type { Metadata } from "next";
import { buildAlternates, isLocale } from "@/lib/i18n/locale";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "en";
  const alternates = buildAlternates(lang, "/openarm-1.1");
  return lang === "ko"
    ? {
        title: "OpenArm 1.1 | 리버트론",
        description: "검증된 OpenArm 1.1 양팔 로봇암 상세 페이지 — 리버트론.",
        alternates,
      }
    : {
        title: "OpenArm 1.1 | Libertron",
        description: "OpenArm 1.1 — the proven bimanual research arm from Libertron.",
        alternates,
      };
}

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import HeroVideoSection from "@/components/sections/HeroVideoSection";
import ExplodedViewSection from "@/components/sections/ExplodedViewSection";
import StatsSection from "@/components/sections/StatsSection";
import VideoCarouselSection from "@/components/sections/VideoCarouselSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ApplicationSection from "@/components/sections/ApplicationSection";
import WhyKoreaSection from "@/components/sections/WhyKoreaSection";
import GetStartedSection from "@/components/sections/GetStartedSection";
import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQSection";

// Preserved OpenArm 1.1 landing (previously the site root `/`).
// The unified premium 2.0-led landing now lives at `/`.
export default function OpenArm11Page() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navbar />

      <HeroSection />
      <HeroVideoSection />
      <ExplodedViewSection />
      <StatsSection />
      <VideoCarouselSection />
      <ShowcaseSection />
      <FeaturesSection />
      <ApplicationSection />
      <GetStartedSection />
      <ComparisonSection />
      <WhyKoreaSection />
      <FAQSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
