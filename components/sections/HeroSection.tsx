"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    const tl = gsap.timeline();

    // Sequence for text
    tl.fromTo(
      ".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    )
    .fromTo(
      ".hero-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.2 },
      "-=0.4"
    );

    // Parallax background
    gsap.to(".hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background-main"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div 
          className="hero-bg absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center"
          style={{ backgroundImage: "url('https://openarm.dev/images/img_introducing.webp')" }}
        />
        {/* Cinematic dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        {/* Gradient fade to bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-main via-background-main/50 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 md:px-12 flex flex-col items-center pt-24 md:pt-32 lg:pt-40">
        <div className="mb-8">
          <h1 className="hero-title flex flex-col items-center gap-2 md:gap-3">
            <span className="sr-only">리버트론이 제공하는 압도적인 가성비의 파이썬 코딩 6축 로봇팔, 대학 연구소와 산업용 자동화를 위한 최고의 오픈소스 협동로봇 솔루션</span>
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent font-black tracking-tighter text-[4rem] md:text-[7rem] lg:text-[9rem] leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              OpenArm
            </span>
            <span className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white/95 drop-shadow-md mt-2">
              {t("hero.built_in_korea")}
            </span>
          </h1>
        </div>
        
        <p className="hero-subtitle text-base md:text-lg lg:text-xl text-white/80 font-medium tracking-wide max-w-2xl mb-12 leading-relaxed drop-shadow-md">
          <span className="text-white font-semibold">{t("hero.subtitle")}</span><br />
          {t("hero.subtitle_desc")}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-4">
          <Link href="/products" className="hero-cta bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-point hover:text-white transition-all duration-300 text-center shadow-xl">
            {t("hero.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
