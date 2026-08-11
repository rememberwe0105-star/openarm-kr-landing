import type { Metadata } from "next";
import { buildAlternates, isLocale } from "@/lib/i18n/locale";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "en";
  const alternates = buildAlternates(lang, "/resources");
  return lang === "ko"
    ? {
        title: "자료실 — OpenArm | 리버트론",
        description: "리버트론 OpenArm 공식 문서·GitHub 저장소·커뮤니티 링크.",
        keywords: [
          "OpenArm 문서", "오픈암 GitHub", "로봇 오픈소스", "CAD 다운로드",
          "ROS2", "개발자 커뮤니티", "리버트론",
        ],
        alternates,
      }
    : {
        title: "Resources — OpenArm | Libertron",
        description: "Official documentation, GitHub repositories, and community links for Libertron OpenArm.",
        keywords: [
          "OpenArm documentation", "OpenArm GitHub", "open-source robot", "CAD files",
          "ROS2", "developer community", "Libertron",
        ],
        alternates,
      };
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
