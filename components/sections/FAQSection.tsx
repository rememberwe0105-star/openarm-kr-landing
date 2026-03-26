"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "오픈암(OpenArm)은 기존 산업용 로봇팔과 어떻게 다른가요?",
    answer: "OpenArm은 압도적인 가성비를 자랑하는 오픈소스 기반 6축 협동 로봇팔입니다. 고가의 산업용 로봇과 달리 투명한 오픈소스 기술을 사용하여 가격 거품을 제거했으며, 누구나 쉽게 접근하고 개조할 수 있도록 설계되어 교육, 연구, 프로토타이핑에 최적화되어 있습니다."
  },
  {
    question: "파이썬(Python)이나 ROS로 직접 제어가 가능한가요?",
    answer: "네, 완벽하게 지원합니다! OpenArm은 Python API를 제공하며, C++, ROS, 웹소켓 등 다양한 환경에서 직접 코딩하여 제어할 수 있습니다. 로봇 공학도나 AI 연구원들이 딥러닝, 강화학습(RL) 모델을 로봇팔에 바로 적용해 볼 수 있는 최고의 플랫폼입니다."
  },
  {
    question: "대학교 연구실이나 고등학교 로봇 실습용으로 적합한가요?",
    answer: "강력히 추천합니다. 컴팩트한 사이즈와 가벼운 무게(탄소섬유 및 알루미늄 가공)로 책상 위에서 안전하게 실습할 수 있습니다. 또한 직관적인 티칭 펜던트 기능과 오픈소스 특성 덕분에 기초 코딩 교육부터 심화 로봇 역학 연구까지 전천후로 활용 가능합니다."
  },
  {
    question: "그리퍼나 카메라 등 액세서리를 추가할 수 있나요?",
    answer: "네, 플러그 앤 플레이 방식의 생태계를 지원합니다. 흡착 펌프, 2지 그리퍼 등 전용 엔드 이펙터(End Effector)는 물론, 옵션으로 제공되는 고성능 카메라(Intel RealSense D405 등)를 마운트하여 비전 AI 기반의 자율 픽앤플레이스 작업도 쉽게 구현할 수 있습니다."
  },
  {
    question: "A/S 및 기술 지원은 어떻게 되나요?",
    answer: "오픈소스 생태계를 존중하고 이해하는 (주)리버트론을 통해 빠르고 안정적인 국내 수급 및 기술 지원을 받으실 수 있습니다. 복잡한 수입 절차 없이 세금계산서 발행이 가능하며, 고품질의 제품과 만족스러운 도입 셋업을 밀착 지원합니다."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
            자주 묻는 질문 <span className="text-point">FAQ</span>
          </h2>
          <p className="text-foreground-sub text-lg md:text-xl font-medium">
            오픈소스 6축 로봇팔 OpenArm에 대해 가장 많이 들어오는 질문들입니다.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
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
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-point text-white' : 'bg-background-sub text-foreground-sub'}`}>
                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 md:p-8 pt-0 text-foreground-sub text-base md:text-lg leading-relaxed font-medium">
                    {faq.answer}
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
