"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface LabelData {
  id: string;
  text: string;
  startX: number; // Text X %
  startY: number; // Text Y %
  endX: number; // Part X %
  endY: number; // Part Y %
  align: "left" | "right" | "center";
}

const labelsData: LabelData[] = [
  { id: "finger", text: "3D-printed finger", startX: 9, startY: 57, endX: 9, endY: 77, align: "center" },
  { id: "rail", text: "Linear Guide Rail", startX: 17, startY: 50, endX: 17, endY: 74, align: "center" },
  { id: "dm4310", text: "DM-4310", startX: 24, startY: 32, endX: 34, endY: 56, align: "center" },
  { id: "stainless", text: "Stainless CNC part", startX: 45, startY: 25, endX: 47, endY: 46, align: "center" },
  { id: "alu_cnc", text: "Aluminum CNC part", startX: 46, startY: 88, endX: 47, endY: 64, align: "center" },
  { id: "dm4340", text: "DM-4340", startX: 55, startY: 28, endX: 58, endY: 53, align: "center" },
  { id: "standoff", text: "Aluminum Standoff", startX: 68, startY: 82, endX: 66, endY: 66, align: "center" },
  { id: "casing", text: "3D-printed casing", startX: 60, startY: 18, endX: 62, endY: 32, align: "center" },
  { id: "dm8009p", text: "DM-8009P", startX: 79, startY: 12, endX: 79, endY: 30, align: "center" },
  { id: "extrusion", text: "Aluminum Extrusion", startX: 76, startY: 70, endX: 89, endY: 70, align: "right" },
];

export default function ExplodedViewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const framesCount = 60;
    const images: HTMLImageElement[] = [];
    const seqObj = { frame: 0 };
    const canvas = canvasRef.current;
    
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // 1. Preload Background Sequence Images
    for (let i = 0; i <= framesCount; i++) {
      const img = new window.Image();
      // frame_000.webp ~ frame_060.webp
      img.src = `/images/sequence/frame_${i.toString().padStart(3, '0')}.webp`;
      images.push(img);
    }

    // 초기에 0프레임 (분해되기 전) 상태 그리기
    images[0].onload = () => {
      ctx?.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    };
    
    function renderFrame() {
      if (!ctx || !canvas) return;
      const f = Math.round(seqObj.frame);
      if (images[f] && images[f].complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[f], 0, 0, canvas.width, canvas.height);
      }
    }

    // 2. 전체 섹션을 고정(Pin)하고 스크롤로 애니메이션 제어
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, // 전체 배경 영역이 화면에 닿으면
        start: "top top",           // 헤더 아래 최상단 포지션일 때
        end: "+=2000",              // 스크롤 2000px 동안 고정
        scrub: 0.5,                 // 휠 동작에 부드럽게 딜레이 동기화
        pin: true,
      }
    });

    // A. 로봇 분해(Explode) 시퀀스 렌더링 (70%의 스크롤 점유)
    tl.to(seqObj, {
      frame: framesCount,
      snap: "frame",
      ease: "power2.inOut",
      onUpdate: renderFrame,
      duration: 7, 
    });

    // B. 지시선(라인) 드로잉 애니메이션 (로봇이 다 분해되어 갈 때 쯤 시작)
    tl.fromTo(
      ".exploded-line",
      { strokeDashoffset: 4000 },
      { strokeDashoffset: 0, duration: 2, ease: "power1.out" },
      "-=2.5" // 로봇 분해 타임라인이 끝나기 2.5 전부터 오버랩해서 시동
    );

    // C. 점 및 텍스트 팝업
    tl.fromTo(
      ".exploded-dot",
      { opacity: 0, scale: 0, transformOrigin: "center center" },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.05, ease: "back.out(1.5)" },
      "-=1.5"
    );

    tl.fromTo(
      ".exploded-text",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: "power2.out" },
      "<0.2" // dot이 나오고 0.2 직후 텍스트 동시 재생
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-[#1b222c] relative overflow-hidden flex flex-col justify-center py-10 min-h-screen"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-10">
        
        {/* Title Area */}
        <div className="text-center mb-8 relative z-50">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
            Exploded <span className="text-point">View</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            스크롤하여 컴포넌트 내부 구조를 투시하세요
          </p>
        </div>

        {/* Viewport for Canvas sequence & overlay */}
        <div 
          ref={containerRef}
          className="w-full relative select-none rounded-2xl overflow-hidden shadow-2xl bg-black/20"
        >
          {/* Canvas WebGL/Sequence Player */}
          <canvas 
            ref={canvasRef}
            width={1440} 
            height={810} 
            className="exploded-canvas w-full h-auto aspect-[16/9] object-contain rounded-2xl bg-[#000]"
          />

          {/* SVG Lines Overlay */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10" 
            style={{ overflow: 'visible' }}
          >
            {labelsData.map((lbl) => (
              <g key={`svg-${lbl.id}`}>
                {/* 지시선 */}
                <line 
                  className="exploded-line"
                  x1={`${lbl.startX}%`} 
                  y1={`${lbl.startY}%`} 
                  x2={`${lbl.endX}%`} 
                  y2={`${lbl.endY}%`} 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  style={{ strokeDasharray: 4000, strokeDashoffset: 4000 }}
                />
                
                {/* 부품 타겟 포인트 (동그라미) */}
                <circle
                  className="exploded-dot opacity-0"
                  cx={`${lbl.endX}%`}
                  cy={`${lbl.endY}%`}
                  r="3.5"
                  fill="rgba(255,255,255,0.9)"
                  stroke="rgba(0,0,0,0.5)"
                  strokeWidth="1"
                  style={{ transformOrigin: `${lbl.endX}% ${lbl.endY}%` }}
                />
              </g>
            ))}
          </svg>

          {/* HTML Labels Overlay */}
          {labelsData.map((lbl) => {
            const isUp = lbl.startY > lbl.endY;
            const isHorizontal = lbl.startY === lbl.endY;
            const yOffset = isUp ? '0%' : (isHorizontal ? '-50%' : '-100%');
            const xOffset = lbl.align === 'center' ? '-50%' : lbl.align === 'right' ? '-100%' : '0%';
            
            return (
              <div 
                key={`label-${lbl.id}`}
                className="absolute z-20 pointer-events-auto"
                style={{
                  top: `${lbl.startY}%`,
                  left: `${lbl.startX}%`,
                }}
              >
                <div
                  style={{
                    transform: `translate(${xOffset}, ${yOffset})`,
                    paddingTop: isUp && !isHorizontal ? '8px' : '0px',
                    paddingBottom: !isUp && !isHorizontal ? '8px' : '0px',
                    paddingLeft: lbl.align === 'left' ? '8px' : '0px',
                    paddingRight: lbl.align === 'right' ? '8px' : '0px'
                  }}
                >
                  <div className="exploded-text opacity-0">
                  <div className="relative group cursor-default text-center whitespace-nowrap">
                    {/* 텍스트 컨테이너 */}
                    <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-white tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)] px-1 relative z-10 transition-colors duration-300 group-hover:text-point">
                      {lbl.text}
                    </span>
                    
                    {/* 텍스트 배경 그라디언트 효과 (가독성 향상) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent blur-sm rounded-sm -z-10 opacity-70"></div>
                  </div>
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
