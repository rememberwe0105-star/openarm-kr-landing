"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, useLocalePath } from "@/lib/i18n/LanguageContext";
import { stripLocale } from "@/lib/i18n/config";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, toggleLanguage, t } = useLanguage();
  const lp = useLocalePath();
  const route = stripLocale(pathname || "/").path;
  
  // If we are on /products or /resources, we always want the dark text because the background is white
  const isDarkPage = route === "/products" || route === "/resources" || route === "/v2";
  
  // Text should be dark if scrolled, or if we are firmly on a dark-text page
  const shouldUseDarkText = isScrolled || isDarkPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Evaluate initially
    handleScroll();

    // Standard scroll listener (fires during smooth hash jumps too)
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav 
        className={`navbar fixed top-0 w-full z-50 transition-[color,background-color,box-shadow] duration-300 ${
          shouldUseDarkText ? "text-foreground-main" : "text-white"
        } ${
          isScrolled ? "bg-white/95 shadow-md md:backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
          <Link href={lp("/")} className="text-2xl font-bold tracking-tighter" onClick={closeMobileMenu}>
            OpenArm<span className="text-point">.</span>
          </Link>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link href={lp("/v2")} className="flex items-center gap-1.5 font-bold text-point hover:opacity-80 transition-opacity">{t("nav.v2")}<span className="text-[10px] font-extrabold bg-point text-white px-1.5 py-0.5 rounded-full leading-none tracking-wide">NEW</span></Link>
            <Link href={lp("/#specs")} className="hover:text-point transition-colors">{t("nav.specs")}</Link>
            <Link href={lp("/#features")} className="hover:text-point transition-colors">{t("nav.features")}</Link>
            <Link href={lp("/#applications")} className="hover:text-point transition-colors">{t("nav.applications")}</Link>
            <Link href={lp("/#get-started")} className="hover:text-point transition-colors">{t("nav.resources")}</Link>
            <Link href={lp("/#why-korea")} className="hover:text-point transition-colors">{t("nav.about")}</Link>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <button 
              onClick={toggleLanguage}
              aria-label={lang === "en" ? "한국어로 보기" : "View in English"}
              className={`font-mono text-sm font-bold tracking-wider hover:text-point transition-colors ${
                shouldUseDarkText ? "text-foreground-main" : "text-white"
              }`}
            >
              {lang === "en" ? "Kor" : "En"}
            </button>
            <Link
              href={lp("/products")}
              className={`px-5 py-2 md:px-6 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                shouldUseDarkText 
                  ? "bg-foreground-main text-background-main hover:bg-point hover:text-white" 
                  : "bg-white text-black hover:bg-point hover:text-white"
              }`}
            >
              {t("nav.store")}
            </Link>
            {/* Mobile Hamburger Button */}
            <button 
              className={`md:hidden p-1.5 focus:outline-none transition-colors hover:text-point`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay Menu */}
      <div 
        className={`fixed inset-0 z-[60] bg-background-main/95 flex flex-col justify-center items-center transition-all duration-400 ease-in-out md:hidden ${
          isMobileMenuOpen ? "visible opacity-100 pointer-events-auto translate-y-0" : "invisible opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <button 
          onClick={closeMobileMenu}
          className="absolute top-6 right-6 p-4 text-foreground-main hover:text-point transition-colors focus:outline-none"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="flex flex-col items-center space-y-8 text-2xl font-bold text-foreground-main">
          <Link href={lp("/v2")} onClick={closeMobileMenu} className="flex items-center gap-2 text-point hover:opacity-80 transition-opacity">{t("nav.v2")}<span className="text-xs font-extrabold bg-point text-white px-2 py-0.5 rounded-full leading-none tracking-wide">NEW</span></Link>
          <Link href={lp("/#specs")} onClick={closeMobileMenu} className="hover:text-point transition-colors">{t("nav.specs")}</Link>
          <Link href={lp("/#features")} onClick={closeMobileMenu} className="hover:text-point transition-colors">{t("nav.features")}</Link>
          <Link href={lp("/#applications")} onClick={closeMobileMenu} className="hover:text-point transition-colors">{t("nav.applications")}</Link>
          <Link href={lp("/#get-started")} onClick={closeMobileMenu} className="hover:text-point transition-colors">{t("nav.resources")}</Link>
          <Link href={lp("/#why-korea")} onClick={closeMobileMenu} className="hover:text-point transition-colors">{t("nav.about")}</Link>
        </div>
      </div>
    </>
  );
}
