"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function useGSAPAnimation() {
  const { contextSafe } = useGSAP();

  const fadeIn = contextSafe((target: string | Element, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: target,
          start: "top 85%",
          ...vars?.scrollTrigger,
        },
        ...vars,
      }
    );
  });

  const staggerFadeIn = contextSafe((targets: string | Element[], vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      targets,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: targets as any, // typically passing the parent container for staggered lists
          start: "top 80%",
          ...vars?.scrollTrigger,
        },
        ...vars,
      }
    );
  });

  return { fadeIn, staggerFadeIn };
}
