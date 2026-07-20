"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
  const { t } = useLanguage();

  // 개발용 캘리브레이션 모드 (URL ?calib=1 일 때만 활성화)
  const [calib, setCalib] = useState(false);
  const [calibReadout, setCalibReadout] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("calib")) {
      setCalib(true);
    }
  }, []);

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

    // 분해 시퀀스 + 지시선 + 라벨 타임라인 (데스크톱/모바일 공용)
    const buildSteps = (tl: gsap.core.Timeline) => {
      // A. 로봇 분해(Explode) 시퀀스 렌더링 (스크롤의 약 70% 점유)
      tl.to(seqObj, {
        frame: framesCount,
        snap: "frame",
        ease: "power2.inOut",
        onUpdate: renderFrame,
        duration: 7,
      });

      // B. 지시선(라인) 드로잉 — 분해가 거의 끝난 뒤(≈93%)에 시작해 부품과 라벨 위치가 어긋나 보이지 않게 함
      tl.fromTo(
        ".exploded-line",
        { strokeDashoffset: 4000 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power1.out" },
        "-=0.5"
      );

      // C. 점 및 텍스트 팝업
      tl.fromTo(
        ".exploded-dot",
        { opacity: 0, scale: 0, transformOrigin: "center center" },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.04, ease: "back.out(1.5)" },
        "-=1.0"
      );

      tl.fromTo(
        ".exploded-text",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.04, ease: "power2.out" },
        "<0.15" // dot이 나오고 직후 텍스트 동시 재생
      );

      // D. 라벨이 다 뜬 상태로 잠깐 머무름(dwell) — 핀 해제 전에 읽을 시간 확보
      tl.to({}, { duration: 1.6 });
    };

    const mm = gsap.matchMedia();

    // 데스크톱: 섹션을 고정(Pin)하고 스크롤로 스크럽
    //    end를 뷰포트 비례로 축소(기존 고정 2000px → 약 1200~1500px)해서 과도한 스크롤 완화
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // 전체 배경 영역이 화면에 닿으면
          start: "top top",           // 헤더 아래 최상단 포지션일 때
          end: () => "+=" + Math.round(Math.min(1500, (typeof window !== "undefined" ? window.innerHeight : 900) * 1.3)),
          scrub: 0.5,                 // 휠 동작에 부드럽게 딜레이 동기화
          pin: true,
          invalidateOnRefresh: true,  // 리사이즈 시 end 재계산
        }
      });
      buildSteps(tl);
    });

    // 모바일: pin이 터치 스크롤을 가로채 심한 랙으로 체감됨.
    // 스크롤은 자연스럽게 두고, 섹션이 보이면 시퀀스를 1회 자동재생.
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        }
      });
      buildSteps(tl);
      tl.timeScale(2); // 총 ~9초 분량을 절반으로 압축 재생
    });

  }, { scope: sectionRef });

  // 캘리브레이션: 이미지 위 클릭 지점을 %좌표로 변환 → 콘솔/클립보드/화면에 출력
  const handleCalibClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = +(((e.clientX - r.left) / r.width) * 100).toFixed(1);
    const y = +(((e.clientY - r.top) / r.height) * 100).toFixed(1);
    const str = `endX: ${x}, endY: ${y}`;
    // eslint-disable-next-line no-console
    console.log("[exploded calib]", str);
    navigator.clipboard?.writeText(str).catch(() => {});
    setCalibReadout(str);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#1b222c] relative overflow-hidden flex flex-col justify-center py-10 md:min-h-screen"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-10">

        {/* Title Area */}
        <div className="text-center mb-8 relative z-50">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
            {t("exploded_view.title_1")} <span className="text-point">{t("exploded_view.title_2")}</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            {t("exploded_view.subtitle")}
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

          {/* SVG Lines Overlay (데스크톱 전용) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block"
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

          {/* HTML Labels Overlay (데스크톱 전용) */}
          {labelsData.map((lbl) => {
            const isUp = lbl.startY > lbl.endY;
            const isHorizontal = lbl.startY === lbl.endY;
            const yOffset = isUp ? '0%' : (isHorizontal ? '-50%' : '-100%');
            const xOffset = lbl.align === 'center' ? '-50%' : lbl.align === 'right' ? '-100%' : '0%';

            return (
              <div
                key={`label-${lbl.id}`}
                className="absolute z-20 pointer-events-auto hidden md:block"
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

          {/* 캘리브레이션 오버레이 (URL ?calib=1, 데스크톱 전용) */}
          {calib && (
            <>
              {/* 현재 dot 위치 + id 표기 */}
              {labelsData.map((lbl) => (
                <span
                  key={`calib-id-${lbl.id}`}
                  className="absolute z-40 text-[9px] font-mono text-yellow-300 bg-black/70 px-1 rounded -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
                  style={{ left: `${lbl.endX}%`, top: `${lbl.endY}%` }}
                >
                  {lbl.id}
                </span>
              ))}
              {/* 10% 격자 + 클릭→%좌표 복사 */}
              <div
                className="absolute inset-0 z-40 cursor-crosshair hidden md:block"
                onClick={handleCalibClick}
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(0,200,255,.25) 0 1px, transparent 1px 10%)," +
                    "repeating-linear-gradient(to bottom, rgba(0,200,255,.25) 0 1px, transparent 1px 10%)",
                }}
              >
                <span className="absolute top-2 left-2 bg-black/85 text-cyan-300 text-xs font-mono px-2 py-1 rounded">
                  CALIB · 클릭하면 %좌표 복사{calibReadout && ` → ${calibReadout}`}
                </span>
              </div>
            </>
          )}
        </div>

        {/* 모바일 전용 번호 범례 (지시선·라벨 대신 부품 목록) */}
        <ol className="md:hidden mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-gray-300 text-xs list-decimal list-inside">
          {labelsData.map((lbl) => (
            <li key={`legend-${lbl.id}`} className="uppercase tracking-wide">{lbl.text}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
