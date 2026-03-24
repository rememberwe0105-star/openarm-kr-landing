"use client";

import { useRef } from "react";
import AnimatedCounter from "../ui/AnimatedCounter";
import { useGSAPAnimation } from "@/hooks/useGSAPAnimation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);
  useGSAPAnimation();
  const { t } = useLanguage();

  // Define specs data
  type Stat = { labelKey: string; value: number; suffix: string; prefix?: string; decimals?: number; modifier?: string };
  const stats: Stat[] = [
    { labelKey: "dof", value: 7, suffix: "DOF" },
    { labelKey: "reach", value: 633, suffix: "mm" },
    { labelKey: "weight", value: 5.5, suffix: "kg", decimals: 1 },
    { labelKey: "payload", value: 6.0, suffix: "kg", decimals: 1 },
    { labelKey: "control", value: 1, suffix: "kHz" },
    { labelKey: "torque", value: 54, suffix: "Nm" }
  ];

  return (
    <section 
      id="specs" 
      ref={containerRef}
      className="bg-gradient-to-b from-[#111] to-[#0a0a0a] text-white w-full py-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
          {t("stats.title")}
        </h2>
        <p className="text-white/70 text-lg">
          {t("stats.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="stat-card flex flex-col items-center justify-center p-6 md:py-8 bg-white/[0.03] backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-1 group"
          >
            <div className="text-4xl md:text-5xl lg:text-6xl mb-2 flex items-baseline">
              {stat.prefix && <span className="text-2xl md:text-3xl font-bold font-mono text-point mr-1">{stat.prefix}</span>}
              <AnimatedCounter 
                end={stat.value} 
                decimals={stat.decimals || 0} 
                duration={2 + (idx * 0.2)} 
              />
              {stat.suffix && <span className="text-lg md:text-xl font-bold font-mono text-point ml-1">{stat.suffix}</span>}
              {stat.modifier && <span className="text-sm md:text-base font-bold text-white/40 ml-1 mt-auto pb-1">{stat.modifier}</span>}
            </div>
            <p className="text-sm md:text-base font-medium text-white/60 group-hover:text-white/80 transition-colors duration-300">
              {t(`stats.labels.${stat.labelKey}`)}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
