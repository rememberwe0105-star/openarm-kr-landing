"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, toggleLanguage, t } = useLanguage();
  
  // If we are on /products or /resources, we always want the dark text because the background is white
  const isDarkPage = pathname === "/products" || pathname === "/resources";
  
  // Text should be dark if scrolled, or if we are firmly on a dark-text page
  const shouldUseDarkText = isScrolled || isDarkPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Evaluate initially
    handleScroll();

    // Standard scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Robust polling to catch smooth-scroll hash jumps where scroll events might misfire
    const interval = setInterval(handleScroll, 100);
    const timeout = setTimeout(() => clearInterval(interval), 2500); // Stop polling after jump finishes

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [pathname]);

  useEffect(() => {
    gsap.to(".navbar", {
      backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
      backdropFilter: isScrolled ? "blur(10px)" : "none",
      boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
      duration: 0.3,
    });
  }, [isScrolled]);

  return (
    <nav 
      className={`navbar fixed top-0 w-full z-50 transition-colors duration-300 ${
        shouldUseDarkText ? "text-foreground-main" : "text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          OpenArm<span className="text-point">.</span>
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/#specs" className="hover:text-point transition-colors">{t("nav.specs")}</Link>
          <Link href="/#features" className="hover:text-point transition-colors">{t("nav.features")}</Link>
          <Link href="/#applications" className="hover:text-point transition-colors">{t("nav.applications")}</Link>
          <Link href="/#get-started" className="hover:text-point transition-colors">{t("nav.resources")}</Link>
          <Link href="/#why-korea" className="hover:text-point transition-colors">{t("nav.about")}</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleLanguage}
            className={`font-mono text-sm font-bold tracking-wider hover:text-point transition-colors ${
              shouldUseDarkText ? "text-foreground-main" : "text-white"
            }`}
          >
            {lang === "en" ? "Kor" : "En"}
          </button>
          <Link 
            href="/products" 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              shouldUseDarkText 
                ? "bg-foreground-main text-background-main hover:bg-point hover:text-white" 
                : "bg-white text-black hover:bg-point hover:text-white"
            }`}
          >
            {t("nav.store")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
