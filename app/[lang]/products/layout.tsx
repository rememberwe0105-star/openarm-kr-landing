import type { Metadata } from "next";
import { buildAlternates, isLocale } from "@/lib/i18n/locale";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "en";
  const alternates = buildAlternates(lang, "/products");
  return lang === "ko"
    ? {
        title: "제품 — OpenArm 데브킷 | 리버트론",
        description: "OpenArm 로보틱스 데브킷·양팔 시스템·액세서리. 한국에서 조립·검수합니다.",
        keywords: [
          "OpenArm 제품", "로봇 데브킷", "양팔 로봇 시스템", "오픈암 라인업",
          "로봇팔 액세서리", "그리퍼", "연구용 로봇", "리버트론",
        ],
        alternates,
      }
    : {
        title: "Products — OpenArm Devkits | Libertron",
        description: "Browse OpenArm robotics devkits, bimanual systems, and accessories. Assembled in Korea.",
        keywords: [
          "OpenArm products", "robot devkit", "bimanual robot system", "OpenArm lineup",
          "robot arm accessories", "gripper", "research robots", "Libertron",
        ],
        alternates,
      };
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
