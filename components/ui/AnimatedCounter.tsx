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

    gsap.fromTo(
      counterRef.current,
      { innerHTML: 0 },
      {
        innerHTML: end,
        duration: duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 85%",
          once: true,
        },
        snap: { innerHTML: Math.pow(10, -decimals) },
        onUpdate: function () {
          if (counterRef.current) {
             const val = Number(this.targets()[0].innerHTML);
             counterRef.current.innerHTML = `${prefix}${val.toFixed(decimals)}${suffix}`;
          }
        },
      }
    );
  }, { scope: counterRef });

  return <span ref={counterRef} className="font-mono text-point font-bold">0</span>;
}
