"use client";

import { useRef } from "react";
import { useGSAPAnimation } from "@/hooks/useGSAPAnimation";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight, Github, MessageSquare, BookOpen, Star, Users } from "lucide-react";

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

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-3 gap-6 max-w-5xl mx-auto md:px-6">
        
        {/* GitHub Bento Box - Spans 2 cols on lg, full on md */}
        <a 
          href="https://github.com/enactic/OpenArm"
          target="_blank"
          rel="noopener noreferrer"
          className="link-card lg:col-span-2 md:col-span-6 relative overflow-hidden flex flex-col justify-between p-8 md:p-10 bg-[#0d1117] rounded-[2rem] border border-white/10 hover:border-white/30 group transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-2xl"
        >
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px] md:min-h-[200px]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Github className="w-6 h-6 md:w-8 md:h-8 text-white relative z-20" />
                <span className="text-[10px] md:text-xs font-mono font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm z-20 relative">Open Source</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">
                {t("get_started.items.1.title")}
              </h3>
              <p className="text-white/60 text-sm md:text-base max-w-sm leading-relaxed">
                {t("get_started.items.1.desc")}
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-white/50 text-xs md:text-sm font-mono">
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> 500+</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Contributors</span>
              </div>
              <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                {t("get_started.items.1.btnText")} <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
          <Github className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.03] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
        </a>

        {/* Discord Bento Box - Spans 1 col */}
        <a 
          href="https://discord.gg/FsZaZ4z3We"
          target="_blank"
          rel="noopener noreferrer"
          className="link-card lg:col-span-1 md:col-span-6 relative overflow-hidden flex flex-col justify-between p-8 md:p-10 bg-[#5865F2] hover:bg-[#4752C4] rounded-[2rem] group transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1"
        >
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px] md:min-h-[200px]">
            <div>
              <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-white mb-4 relative z-20" />
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
                {t("get_started.items.2.title")}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("get_started.items.2.desc")}
              </p>
            </div>
            
            <div className="mt-8 flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
              {t("get_started.items.2.btnText")} <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          <MessageSquare className="absolute -bottom-8 -right-8 w-40 h-40 md:w-48 md:h-48 text-black/10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700" />
        </a>

        {/* Docs Bento Box - Spans all 3 cols */}
        <a 
          href="https://docs.openarm.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-card lg:col-span-3 md:col-span-6 flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-10 bg-background-sub rounded-[2rem] border border-border-light hover:border-point group transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 md:mb-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-sm border border-border-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-point" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground-main mb-2 tracking-tight">
                {t("get_started.items.0.title")}
              </h3>
              <p className="text-foreground-sub text-sm md:text-base max-w-xl leading-relaxed">
                {t("get_started.items.0.desc")}
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex items-center justify-end text-sm md:text-base font-bold text-point group-hover:translate-x-1 transition-transform whitespace-nowrap bg-white md:bg-transparent py-4 md:py-0 px-6 md:px-0 rounded-xl md:rounded-none border border-border-light md:border-none shadow-sm md:shadow-none">
            {t("get_started.items.0.btnText")} <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </a>
      </div>
    </section>
  );
}
