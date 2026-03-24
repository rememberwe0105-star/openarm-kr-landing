"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAPAnimation } from "@/hooks/useGSAPAnimation";

const VIDEO = { id: "6ZLM6f8kF4Q", title: "OpenArm Offical Reveal" };

export default function VideoCarouselSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useGSAPAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldPlay(true);
          // 한 번 재생되면 옵저버 해제하여 사용자가 수동으로 제어할 수 있도록 함
          if (videoRef.current) {
            observer.unobserve(videoRef.current);
          }
        }
      },
      { threshold: 0.5 } // 요소가 50% 이상 화면에 보일 때 트리거
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="videos" 
      ref={containerRef}
      className="bg-[#0a0a0a] text-white py-24 overflow-hidden border-b border-border-light/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Row */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            OpenArm in Action
          </h2>
        </div>

        {/* Single Video Container */}
        <div 
          ref={videoRef}
          className="w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden bg-black/50 border border-white/10 relative group shadow-2xl"
        >
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO.id}?rel=0&modestbranding=1${shouldPlay ? '&autoplay=1&mute=1' : ''}`}
            title={VIDEO.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full absolute inset-0 rounded-3xl"
            loading="lazy"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl"></div>
        </div>
      </div>
    </section>
  );
}
