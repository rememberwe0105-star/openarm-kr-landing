import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenArm Store | 2.0 · Cell · KER · 1.1 | Libertron",
  description: "Buy OpenArm — 2.0 bimanual ($6,500), Cell, KER, and 1.1 arms from Libertron. Assembled in Korea, shipped globally. OpenArm 전 라인업 구매 · OpenArm 2.0 가격·구매·배송.",
  keywords: [
    "OpenArm", "OpenArm 2.0", "OpenArm 2.0 price", "OpenArm 2.0 purchase", "buy OpenArm",
    "OpenArm Cell", "OpenArm KER", "오픈암 2.0 구매", "오픈암 2.0 가격", "리버트론 오픈암",
  ],
  alternates: {
    canonical: "/store",
    languages: {
      "ko-KR": "/store",
      "en-US": "/store?lang=en",
      "x-default": "/store",
    },
  },
  openGraph: {
    title: "OpenArm Store — 2.0 · Cell · KER · 1.1 | Libertron",
    description: "Buy the full OpenArm lineup from Libertron. OpenArm 2.0 ($6,500 USD), Cell, KER, and 1.1. 정식 구매 · 배송 안내.",
    url: "https://openarm.co.kr/store",
    siteName: "Libertron OpenArm",
    locale: "en_US",
    alternateLocale: ["ko_KR"],
    type: "website",
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
