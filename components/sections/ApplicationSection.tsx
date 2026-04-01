"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

const applications = [
  {
    title: "Robot Manipulation Research",
    image: "/images/app_robot_manipulation.png",
  },
  {
    title: "Human-Robot Interaction (HRI)",
    image: "/images/app_hri_handshake.png",
  },
  {
    title: "Reinforcement & Imitation Learning for Robotics",
    image: "/images/app_rl_imitation.png",
  },
  {
    title: "Teleoperation & Demonstration-based Learning",
    image: "/images/app_teleoperation.png",
  },
  {
    title: "AI-driven Humanoid Robot Learning",
    image: "/images/app_ai_humanoid.png",
  },
  {
    title: "AI Robotics Education",
    image: "/images/app_ai_education.png",
  },
];

export default function ApplicationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".app-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section 
      id="applications" 
      ref={containerRef} 
      className="py-24 md:py-32 bg-background-main relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground-main tracking-tighter mb-4">
            Applications
          </h2>
          {/* Subtitle omitted to keep it strictly English and professional as requested */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {applications.map((app, idx) => (
            <div 
              key={idx} 
              className="app-card group relative bg-background-main rounded-[2rem] overflow-hidden border border-border-light shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-black flex items-center justify-center">
                <Image 
                  src={app.image} 
                  alt={`오픈소스 로봇팔 OpenArm 활용 사례: ${app.title} (대학 연구소, 코딩 교육용 협동로봇)`} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Gradient overlay to make text highly legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-500" />
                
                {/* Title perfectly placed over the image */}
                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-white text-xl md:text-2xl font-bold leading-snug tracking-tight">
                    {app.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
