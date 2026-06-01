"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { VIDEO_1_1 } from "@/lib/constants";

export default function HeroVideoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  // Lazy load YouTube iframe when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (videoWrapperRef.current) {
      observer.observe(videoWrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-background-main pt-8 pb-16 md:pt-12 md:pb-24 px-6 md:px-12 lg:px-24 flex justify-center"
    >
      <div 
        ref={videoWrapperRef}
        className="w-full max-w-[1400px] overflow-hidden rounded-[2rem] border border-border-light bg-black relative aspect-video shadow-2xl"
      >
        {/* YouTube Embed — autoplay, mute, loop, no controls for cinematic feel */}
        {shouldLoad ? (
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_1_1.id}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_1_1.id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3`}
            title={VIDEO_1_1.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.2]"
            style={{ border: 'none' }}
            loading="lazy"
          />
        ) : (
          /* Placeholder thumbnail before iframe loads */
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://img.youtube.com/vi/${VIDEO_1_1.id}/maxresdefault.jpg')` }}
          />
        )}

        {/* Subtle overlay to blend into the Dark theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-main/40 to-transparent pointer-events-none" />

        {/* v1.1 Badge */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white/90 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            OpenArm v1.1
          </span>
        </div>
      </div>
    </section>
  );
}
