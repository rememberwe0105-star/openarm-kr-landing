"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function HeroVideoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Parallax or subtle reveal effect
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

  return (
    <section 
      ref={containerRef}
      className="w-full bg-background-main pt-8 pb-16 md:pt-12 md:pb-24 px-6 md:px-12 lg:px-24 flex justify-center"
    >
      <div className="w-full max-w-[1400px] overflow-hidden rounded-[2rem] border border-border-light bg-black relative aspect-video md:aspect-[21/9] shadow-2xl">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://openarm.dev/videos/kv.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay to blend into the Dark theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-main/40 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
