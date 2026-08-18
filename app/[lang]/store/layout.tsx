import type { Metadata } from "next";
import { buildAlternates, isLocale } from "@/lib/i18n/locale";

// Route-specific title/description + per-path canonical/hreflang + og:title per locale.
export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "en";
  const ko = lang === "ko";
  const title = ko
    ? "OpenArm 스토어 | 2.0 · Cell · KER · 1.1 | 리버트론"
    : "OpenArm Store | 2.0 · Cell · KER · 1.1 | Libertron";
  const description = ko
    ? "OpenArm 전 라인업 구매 — 2.0 양팔, Cell, KER, 1.1. 리버트론이 한국에서 조립·검수하고 국내 배송·설치·시연까지 지원합니다."
    : "Buy the full OpenArm lineup from Libertron — 2.0 bimanual, Cell, KER, and 1.1 arms. Assembled and tested in Korea, shipped worldwide.";
  return {
    title,
    description,
    keywords: ko
      ? ["OpenArm", "OpenArm 2.0", "오픈암 2.0 구매", "오픈암 2.0 가격", "리버트론 오픈암", "OpenArm Cell", "OpenArm KER", "양팔 로봇 구매"]
      : ["OpenArm", "OpenArm 2.0", "OpenArm 2.0 price", "buy OpenArm", "OpenArm Cell", "OpenArm KER", "bimanual robot arm"],
    alternates: buildAlternates(lang, "/store"),
    openGraph: { title, description, url: `${buildAlternates(lang, "/store").canonical}` },
  };
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
