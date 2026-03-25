"use client";

import { useState, useEffect } from "react";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";

export default function FloatingContactButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 300px 이상 스크롤 시 버튼 표시
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // 초기 로딩 시 체크
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-[60] transition-all duration-500 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <Link 
        href="/#contact"
        className="flex items-center justify-center w-14 h-14 bg-foreground-main/90 backdrop-blur-md rounded-full shadow-lg border border-border-light/20 hover:scale-110 hover:bg-foreground-main hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] transition-all duration-300 group"
        aria-label="Contact Us"
        title="문의하기"
      >
        <MessageSquareText className="w-6 h-6 text-background-main group-hover:text-point transition-colors duration-300" />
      </Link>
    </div>
  );
}
