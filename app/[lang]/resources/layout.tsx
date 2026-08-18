import type { Metadata } from "next";
import { buildAlternates, isLocale } from "@/lib/i18n/locale";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "en";
  const ko = lang === "ko";
  const title = ko ? "자료실 — OpenArm | 리버트론" : "Resources — OpenArm | Libertron";
  const description = ko
    ? "리버트론 OpenArm 공식 문서·GitHub 저장소·커뮤니티 링크."
    : "Official documentation, GitHub repositories, and community links for Libertron OpenArm.";
  const alternates = buildAlternates(lang, "/resources");
  return {
    title,
    description,
    keywords: ko
      ? ["OpenArm 문서", "오픈암 GitHub", "로봇 오픈소스", "CAD 다운로드", "ROS2", "개발자 커뮤니티", "리버트론"]
      : ["OpenArm documentation", "OpenArm GitHub", "open-source robot", "CAD files", "ROS2", "developer community", "Libertron"],
    alternates,
    openGraph: { title, description, url: alternates.canonical },
  };
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
