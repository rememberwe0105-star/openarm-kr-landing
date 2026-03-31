"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ComparisonSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(
      ".comp-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(
      ".comp-card-diy",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(
      ".comp-card-pro",
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(
      ".comp-cta",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

  }, { scope: containerRef });

  return (
    <section 
      id="comparison" 
      ref={containerRef}
      className="py-24 md:py-32 bg-background-main relative z-10 border-t border-border-light overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="comp-title text-center mb-16 md:mb-24 px-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground-main mb-6 leading-tight break-keep" dangerouslySetInnerHTML={{ __html: t("comparison.title_main") as string }} />
          <p className="text-foreground-sub text-lg md:text-xl max-w-3xl mx-auto leading-relaxed break-keep" dangerouslySetInnerHTML={{ __html: t("comparison.title_desc") as string }} />
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative max-w-5xl mx-auto">
          
          {/* VS Badge (Desktop Center) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-background-main border-2 border-border-light rounded-full items-center justify-center z-20 font-black text-2xl text-foreground-sub shadow-xl">
            VS
          </div>

          {/* DIY Card */}
          <div className="comp-card-diy flex flex-col bg-background-sub/50 border border-border-light rounded-[2rem] overflow-hidden opacity-0">
            <div className="p-8 md:p-10 border-b border-border-light bg-background-sub text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground-sub mb-2">{t("comparison.card_diy_title") as string}</h3>
              <p className="text-sm font-medium text-foreground-sub/70">{t("comparison.card_diy_subtitle") as string}</p>
            </div>
            <div className="p-8 md:p-10 flex flex-col gap-8 flex-1">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-foreground-sub/60 uppercase tracking-wider">{t(`comparison.items.${idx}.label`) as string}</span>
                  <div className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-foreground-sub leading-snug break-keep">
                      <strong className="text-foreground-main">{t(`comparison.items.${idx}.diy_strong`) as string}</strong><br/>
                      {t(`comparison.items.${idx}.diy_desc`) as string}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Libertron Package Card */}
          <div className="comp-card-pro flex flex-col bg-point/5 border-2 border-point rounded-[2rem] overflow-hidden shadow-2xl shadow-point/10 relative opacity-0 transform-gpu lg:-translate-y-4">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-point to-blue-500"></div>
            <div className="p-8 md:p-10 border-b border-point/20 bg-point/10 text-center">
              <h3 className="text-2xl md:text-3xl font-black text-foreground-main mb-2">{t("comparison.card_pro_title") as string}</h3>
              <p className="text-sm font-bold text-point">{t("comparison.card_pro_subtitle") as string}</p>
            </div>
            <div className="p-8 md:p-10 flex flex-col gap-8 flex-1">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-point/80 uppercase tracking-wider">{t(`comparison.items.${idx}.label`) as string}</span>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-point shrink-0 mt-0.5" />
                    <p className="text-foreground-main font-medium leading-snug break-keep">
                      <strong className="text-foreground-main font-black">{t(`comparison.items.${idx}.pro_strong`) as string}</strong><br/>
                      {t(`comparison.items.${idx}.pro_desc`) as string}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="comp-cta mt-16 md:mt-24 text-center opacity-0">
          <p className="text-foreground-sub font-medium mb-6">{t("comparison.cta_msg") as string}</p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 bg-point text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-point/80 hover:shadow-lg hover:shadow-point/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            {t("comparison.cta_btn") as string}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
