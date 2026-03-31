"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({ end, duration = 2, prefix = "", suffix = "", decimals = 0 }: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!counterRef.current) return;

    const counterObj = { val: 0 };
    
    gsap.to(counterObj, {
      val: end,
      duration: duration,
      ease: "power2.out", // slightly smoother easing
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${prefix}${counterObj.val.toFixed(decimals)}${suffix}`;
        }
      }
    });

  }, { scope: counterRef });

  return <span ref={counterRef} className="font-mono text-point font-bold">0</span>;
}
