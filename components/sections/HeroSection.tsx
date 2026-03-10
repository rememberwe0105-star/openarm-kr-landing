"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

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
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-background-main/30 backdrop-blur-[2px]" />
        {/* Gradient fade to bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-main to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 md:px-12 flex flex-col items-center pt-24 md:pt-32 lg:pt-40">
        <div className="mb-8">
          <h1 className="hero-title flex flex-col items-center gap-2 md:gap-3">
            <span className="text-point font-black tracking-tighter text-[4rem] md:text-[7rem] lg:text-[9rem] leading-none drop-shadow-sm">
              OpenArm
            </span>
            <span className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground-main/90 mt-2">
              한국에서 조립되고 전세계로 배송됩니다
            </span>
          </h1>
        </div>
        
        <p className="hero-subtitle text-base md:text-lg lg:text-xl text-foreground-sub/80 font-medium tracking-wide max-w-2xl mb-12 leading-relaxed">
          <span className="text-foreground-main/90 font-semibold">100% 오픈소스 기반의 피지컬 AI 휴머노이드 로봇암</span><br />
          합리적인 가격, 쉽고 빠른 구매
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-4">
          <Link href="/products" className="hero-cta bg-foreground-main text-background-main px-8 py-4 rounded-full text-lg font-bold hover:bg-point hover:text-white transition-all duration-300 text-center">
            제품 보러가기
          </Link>
        </div>
      </div>
    </section>
  );
}
