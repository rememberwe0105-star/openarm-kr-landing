"use client";

import { useRef } from "react";
import AnimatedCounter from "../ui/AnimatedCounter";
import { useGSAPAnimation } from "@/hooks/useGSAPAnimation";

export default function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { staggerFadeIn } = useGSAPAnimation();

  // Define specs data
  const stats = [
    { label: "Bimanual Arms", value: 7, suffix: "DOF" },
    { label: "Arm Reach", value: 633, suffix: "mm" },
    { label: "Weight per Arm", value: 5.5, suffix: "kg", decimals: 1 },
    { label: "Peak Payload per Arm", value: 6.0, suffix: "kg", decimals: 1 },
    { label: "CAN-FD Control", value: 1, suffix: "kHz" },
    { label: "Bill of Materials Cost", prefix: "$", value: 6500, suffix: "" }
  ];

  return (
    <section 
      id="specs" 
      ref={containerRef}
      className="bg-background-sub border-y border-border-light section-padding"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground-main mb-4">
          Core Specifications
        </h2>
        <p className="text-foreground-sub text-lg">
          리버트론은 오픈암의 표준 스펙을 준수합니다
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
              {(stat as any).modifier && <span className="text-sm md:text-base font-bold text-foreground-sub ml-1 mt-auto pb-1">{(stat as any).modifier}</span>}
            </div>
            <p className="text-sm md:text-base font-medium text-foreground-sub">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
