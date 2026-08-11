import type { Metadata } from "next";
import { buildAlternates, isLocale } from "@/lib/i18n/locale";

// Route-specific title/description + per-path canonical/hreflang per locale.
export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "en";
  const alternates = buildAlternates(lang, "/store");
  return lang === "ko"
    ? {
        title: "OpenArm 스토어 | 2.0 · Cell · KER · 1.1 | 리버트론",
        description:
          "OpenArm 전 라인업 구매 — 2.0 양팔, Cell, KER, 1.1. 리버트론이 한국에서 조립·검수하고 국내 배송·설치·시연까지 지원합니다.",
        keywords: [
          "OpenArm", "OpenArm 2.0", "오픈암 2.0 구매", "오픈암 2.0 가격", "리버트론 오픈암",
          "OpenArm Cell", "OpenArm KER", "양팔 로봇 구매",
        ],
        alternates,
      }
    : {
        title: "OpenArm Store | 2.0 · Cell · KER · 1.1 | Libertron",
        description:
          "Buy the full OpenArm lineup from Libertron — 2.0 bimanual, Cell, KER, and 1.1 arms. Assembled and tested in Korea, shipped worldwide.",
        keywords: [
          "OpenArm", "OpenArm 2.0", "OpenArm 2.0 price", "buy OpenArm",
          "OpenArm Cell", "OpenArm KER", "bimanual robot arm",
        ],
        alternates,
      };
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
