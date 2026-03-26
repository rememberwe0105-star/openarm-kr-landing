"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const faqCount = 5;

  useGSAP(() => {
    gsap.fromTo(
      ".faq-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="faq" ref={containerRef} className="py-24 md:py-32 bg-background-main border-t border-border-light relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground-main mb-6 tracking-tighter">
            {t("faq.title_1")} <span className="text-point">{t("faq.title_2")}</span>
          </h2>
          <p className="text-foreground-sub text-lg md:text-xl font-medium">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {Array.from({ length: faqCount }).map((_, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-point shadow-md bg-background-sub' : 'border-border-light bg-background-main hover:border-foreground-sub/30'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <h3 className="text-lg md:text-xl font-bold text-foreground-main pr-8">
                    {t(`faq.items.${index}.question`)}
                  </h3>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-point text-white' : 'bg-background-sub text-foreground-sub'}`}>
                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 md:p-8 pt-0 text-foreground-sub text-base md:text-lg leading-relaxed font-medium">
                    {t(`faq.items.${index}.answer`)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
