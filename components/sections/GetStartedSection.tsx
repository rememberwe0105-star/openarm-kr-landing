"use client";

import { useRef } from "react";
import { useGSAPAnimation } from "@/hooks/useGSAPAnimation";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const links = [
  {
    title: "Documentation",
    desc: "API 레퍼런스 및 튜토리얼 (영문)",
    url: "https://docs.openarm.dev/",
    btnText: "Read Docs",
  },
  {
    title: "GitHub Repo",
    desc: "오픈소스 하드웨어 및 소프트웨어",
    url: "https://github.com/enactic/OpenArm",
    btnText: "View Code",
  },
  {
    title: "Discord Community",
    desc: "글로벌 개발자 커뮤니티 참여",
    url: "https://discord.gg/FsZaZ4z3We",
    btnText: "Join server",
  }
];

export default function GetStartedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { staggerFadeIn } = useGSAPAnimation();
  const { t } = useLanguage();

  useGSAP(() => {
    staggerFadeIn(".link-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section id="get-started" className="section-padding bg-background-main">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground-main mb-4">
          {t("get_started.title")}
        </h2>
        <p className="text-foreground-sub text-lg">
          {t("get_started.subtitle")}
        </p>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {links.map((link, idx) => {
          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card flex flex-col justify-between p-8 bg-background-main rounded-2xl border border-border-light hover:border-point group transition-all duration-300"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground-main mb-2">
                  {t(`get_started.items.${idx}.title`)}
                </h3>
                <p className="text-foreground-sub text-sm mb-8">
                  {t(`get_started.items.${idx}.desc`)}
                </p>
              </div>
              
              <div className="flex items-center text-point font-semibold group-hover:gap-2 transition-all duration-300">
                <span className="group-hover:underline">{t(`get_started.items.${idx}.btnText`)}</span>
              <svg 
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
          );
        })}
      </div>
    </section>
  );
}
