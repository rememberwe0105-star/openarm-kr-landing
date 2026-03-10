"use client";

import { useGSAPAnimation } from "@/hooks/useGSAPAnimation";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const features = [
  {
    title: "Bimanual System",
    description: "완벽히 동기화된 양팔 14DOF 제어로 인간 수준의 복잡한 작업 수행이 가능합니다.",
    imgUrl: "/images/features/bimanual.png",
  },
  {
    title: "1kHz CAN-FD Control",
    description: "독자 개발된 초고속 통신 프로토콜로 실시간 초정밀 모션 제어를 실현합니다.",
    imgUrl: "/images/features/can_fd.png",
  },
  {
    title: "Affordable Platform",
    description: "$6,500(USD)의 합리적인 가격. 연구 및 산업 현장의 도입 장벽을 획기적으로 낮췄습니다.",
    imgUrl: "/images/features/affordable.png",
  },
  {
    title: "Lightweight & Powerful",
    description: "5.5kg의 가벼운 암 무게에도 불구하고 최대 6kg의 강력한 페이로드를 자랑합니다.",
    imgUrl: "/images/features/lightweight.png",
  },
  {
    title: "Open Source Ecosystem",
    description: "ROS2 완벽 호환 및 풍부한 오픈소스 커뮤니티 지원으로 빠른 개발이 가능합니다.",
    imgUrl: "/images/features/opensource.png",
  },
  {
    title: "Built for AI",
    description: "Sim-to-Real 강화학습 모델 배포에 최적화된 하드웨어 아키텍처를 제공합니다.",
    imgUrl: "/images/features/ai.png",
  }
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { staggerFadeIn } = useGSAPAnimation();

  useGSAP(() => {
    staggerFadeIn(".feature-card");
  }, { scope: containerRef });

  return (
    <section id="features" className="section-padding bg-background-main">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground-main mb-4">
          Key Features
        </h2>
        <p className="text-foreground-sub text-lg max-w-2xl mx-auto">
          연구부터 양산까지, 혁신을 앞당기는 핵심 기능들
        </p>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="feature-card group flex flex-col bg-background-sub rounded-3xl overflow-hidden border border-border-light hover:border-point transition-colors duration-300"
          >
            <div className="relative w-full aspect-video overflow-hidden bg-gray-200">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url('${feature.imgUrl}')` }}
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-foreground-main mb-3 group-hover:text-point transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-foreground-sub leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
