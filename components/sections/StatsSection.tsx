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
      className="bg-background-sub border-y border-border-light section-padding"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground-main mb-4">
          {t("stats.title")}
        </h2>
        <p className="text-foreground-sub text-lg">
          {t("stats.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="stat-card flex flex-col items-center justify-center p-6 bg-background-main rounded-2xl shadow-sm border border-border-light"
          >
            <div className="text-4xl md:text-5xl lg:text-6xl mb-2 flex items-baseline">
              {stat.prefix && <span className="text-2xl md:text-3xl font-bold font-mono text-point mr-1">{stat.prefix}</span>}
              <AnimatedCounter 
                end={stat.value} 
                decimals={stat.decimals || 0} 
                duration={2 + (idx * 0.2)} 
              />
              {stat.suffix && <span className="text-lg md:text-xl font-bold font-mono text-point ml-1">{stat.suffix}</span>}
              {stat.modifier && <span className="text-sm md:text-base font-bold text-foreground-sub ml-1 mt-auto pb-1">{stat.modifier}</span>}
            </div>
            <p className="text-sm md:text-base font-medium text-foreground-sub">
              {t(`stats.labels.${stat.labelKey}`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
