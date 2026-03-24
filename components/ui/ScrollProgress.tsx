"use client";

import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function ScrollProgress() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useGSAP(() => {
    gsap.to(".progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2, // smooth scrubbing
      },
    });
  });

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] origin-left">
      <div className="progress-bar w-full h-full bg-point scale-x-0 origin-left" />
    </div>
  );
}
