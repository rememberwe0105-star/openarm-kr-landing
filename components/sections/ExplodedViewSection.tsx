"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function ExplodedViewSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".exploded-image",
      { opacity: 0, scale: 0.98, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-[#111] relative overflow-hidden"
    >
      <div className="w-full relative flex items-center justify-center">
        {/* The exploded view image inherently has a dark blue/grey background, filling the container nicely */}
        <img 
          src="/images/exploded_view.webp" 
          alt="OpenArm Hardware Exploded View" 
          className="exploded-image w-full h-full max-h-[90vh] object-cover origin-bottom"
        />
      </div>
    </section>
  );
}
