"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const applications = [
  {
    title: "Robot Manipulation Research",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Human-Robot Interaction (HRI)",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Reinforcement & Imitation Learning for Robotics",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Teleoperation & Demonstration-based Learning",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AI-driven Humanoid Robot Learning",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AI Robotics Education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
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
      className="py-24 md:py-32 bg-background-main border-t border-border-light relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-16 text-center md:text-left">
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
                <img 
                  src={app.image} 
                  alt={app.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                {/* Gradient overlay to make text highly legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
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
