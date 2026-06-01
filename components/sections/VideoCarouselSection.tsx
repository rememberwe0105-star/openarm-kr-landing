"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const VIDEO_1_1 = { id: "6ZLM6f8kF4Q", title: "OpenArm v1.1 Official Reveal" };

export default function VideoCarouselSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldPlay(true);
          if (videoRef.current) {
            observer.unobserve(videoRef.current);
          }
        }
      },
      { threshold: 0.3 }
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
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            {t("video_section.title")}
          </h2>
        </div>

        {/* Two Column Layout */}
        <div 
          ref={videoRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl mx-auto"
        >
          {/* Left: OpenArm v1.1 — Now Shipping */}
          <div className="relative flex flex-col">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("video_section.now_shipping")}
              </span>
              <span className="text-sm text-white/60 font-medium">OpenArm v1.1</span>
            </div>

            {/* Video */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10 relative group shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_1_1.id}?rel=0&modestbranding=1${shouldPlay ? '&autoplay=1&mute=1' : ''}`}
                title={VIDEO_1_1.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full absolute inset-0 rounded-2xl"
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div>
            </div>

            {/* Caption */}
            <p className="mt-4 text-sm text-white/50 font-medium">
              {t("video_section.v1_1_caption")}
            </p>
          </div>

          {/* Right: OpenArm 2.0 — Coming Soon Teaser */}
          <div className="relative flex flex-col">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/15 text-violet-400 border border-violet-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                {t("video_section.coming_soon")}
              </span>
              <span className="text-sm text-white/60 font-medium">OpenArm 2.0</span>
            </div>

            {/* Teaser Card */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden relative group shadow-2xl border border-white/10">
              {/* Blurred background — YouTube thumbnail of 2.0 */}
              <div 
                className="absolute inset-0 bg-cover bg-center scale-110 blur-md brightness-[0.3]"
                style={{ backgroundImage: `url('https://img.youtube.com/vi/6ZLM6f8kF4Q/maxresdefault.jpg')` }}
              />
              
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-950/80 via-black/60 to-indigo-950/80" />
              
              {/* Subtle grid pattern */}
              <div 
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px] animate-pulse" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10">
                {/* Lock icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                  OpenArm 2.0
                </h3>
                <p className="text-violet-300 font-semibold text-lg mb-3">
                  {t("video_section.coming_soon")}
                </p>
                <p className="text-white/50 text-sm max-w-xs leading-relaxed">
                  {t("video_section.v2_0_teaser_desc")}
                </p>
              </div>

              {/* Hover reveal — slight unblur effect */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
            </div>

            {/* Caption */}
            <p className="mt-4 text-sm text-white/50 font-medium">
              {t("video_section.v2_0_caption")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
