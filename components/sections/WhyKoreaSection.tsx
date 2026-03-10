"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

const reasons = [
  {
    id: "01",
    title: "유연한 판매 방식",
    desc: "연구용 및 맞춤형 목적을 위한 완제품, 조립 키트, 그리고 B2B 견적 문의형 판매 방식을 지원합니다."
  },
  {
    id: "02",
    title: "직접 배송 및 설치 시연",
    desc: "한국내 배송의 경우 상품을 안전하게 직접 배송해드리며, 오픈암 설치에 필요한 내용을 지원합니다."
  },
  {
    id: "03",
    title: "투명하고 합리적인 가격",
    desc: "오픈암의 기본 취지를 지지하며 최선의 품질과 합리적인 가격 체계를 보장합니다. (국내 A/S 정책은 제품별 상세페이지 참조)"
  }
];

export default function WhyKoreaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pop-in stagger animation for the cards
    gsap.fromTo(
      ".reason-card",
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="why-korea" className="section-padding bg-background-main border-b border-border-light relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-background-sub to-transparent opcaity-50 -z-10" />

      <div className="text-left md:text-center mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground-main mb-6">
          왜 <span className="text-point">리버트론</span>에서<br className="md:hidden" /> 구매해야 할까요?
        </h2>
        <p className="text-foreground-sub text-lg md:text-xl max-w-2xl md:mx-auto">
          (주)리버트론은 다양한 하드웨어 및 소프트웨어 설계 경험을 기반으로<br className="hidden md:block"/>신뢰할 수 있는 구매 경험을 제공합니다.
        </p>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {reasons.map((reason, idx) => (
          <div 
            key={idx} 
            className="reason-card relative p-10 bg-background-main border-2 border-border-light rounded-[2rem] hover:border-point transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-point/5 group"
          >
            <div className="text-6xl font-mono font-black text-border-light group-hover:text-point/20 transition-colors duration-500 mb-6 absolute top-8 right-8">
              {reason.id}
            </div>
            <div className="relative z-10 pt-8">
              <h3 className="text-2xl font-bold text-foreground-main mb-4 group-hover:text-point transition-colors">
                {reason.title}
              </h3>
              <p className="text-foreground-sub text-lg leading-relaxed">
                {reason.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
