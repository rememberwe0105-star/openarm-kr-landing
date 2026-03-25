"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const images = [
  {
    src: "https://openarm.dev/images/img_introducing.webp",
    alt: "OpenArm Bimanual System",
    title: "Bimanual System",
    description: "인간의 양팔을 완벽하게 모사한 구조",
  },
  {
    src: "https://openarm.dev/images/features_teleoperation_pc.webp",
    alt: "Teleoperation",
    title: "Teleoperation",
    description: "직관적이고 정밀한 원격 조종",
  },
  {
    src: "https://openarm.dev/images/features_fully_opensource_pc.webp",
    alt: "Hardware Profile",
    title: "Simulation",
    description: "데스크탑 환경에 최적화된 하드웨어",
  },
  {
    src: "https://openarm.dev/images/features_dexterous_pc.webp",
    alt: "Dexterous Gripper",
    title: "Dexterous, Powerful & Safe Design",
    description: "다양한 물체를 정교하게 파지하는 그리퍼",
  },
  {
    src: "https://openarm.dev/images/features_bilateral_pc.webp",
    alt: "Bilateral Force Feedback",
    title: "Bilateral Force Feedback",
    description: "작업의 감각을 전달하는 포스 피드백",
  },
];

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      // Stagger reveal on entry
      gsap.fromTo(
        ".showcase-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section 
      id="showcase" 
      ref={containerRef}
      className="py-24 md:py-32 bg-background-main overflow-hidden relative"
    >
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />
      
      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-foreground-main tracking-tighter mb-4">
          {t("showcase.title")}
        </h2>
        <p className="text-foreground-sub text-lg max-w-2xl mx-auto font-medium">
          {t("showcase.subtitle")}
        </p>
      </div>

      <div 
        ref={scrollWrapperRef}
        className="w-full relative px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col gap-6 md:gap-8"
      >
        {/* Top Row: Main Image + Video (Symmetrical 50/50 Layout for harmony) */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 w-full">
          {/* Main Image (Bimanual System) */}
          <div className="showcase-item relative flex-shrink-0 rounded-[2rem] overflow-hidden group w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:h-[500px] bg-black border border-border-light">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${images[0].src}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:px-8 px-6">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-tight">
                {images[0].title}
              </h3>
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                <div className="overflow-hidden">
                  <p className="text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pt-1">
                    {t("showcase.images.0.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* New Video Block (kv.mp4) perfectly matching the left image */}
          <div className="showcase-item relative flex-shrink-0 rounded-[2rem] overflow-hidden group w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:h-[500px] bg-black border border-border-light flex items-center justify-center">
             <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            >
              <source src="https://openarm.dev/videos/kv.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:px-8 px-6 z-10">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-tight">
                Fully Open-source
              </h3>
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                <div className="overflow-hidden">
                  <p className="text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pt-1">
                    {t("showcase.dynamic_motion_subtitle")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Menu: Remaining 4 Images in a Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
           {images.slice(1).map((img, idx) => (
            <div 
              key={idx + 1}
              className="showcase-item relative rounded-[2rem] overflow-hidden group w-full aspect-[4/3] lg:h-[350px] bg-background-sub border border-border-light"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${img.src}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-tight">
                  {img.title}
                </h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-sm md:text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pt-1">
                      {t(`showcase.images.${idx + 1}.desc`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
