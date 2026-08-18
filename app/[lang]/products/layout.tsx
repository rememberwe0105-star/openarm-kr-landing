import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/locale";

// Legacy catalog page — not fully localized and superseded by /store. Kept
// reachable but excluded from search (noindex) and from the sitemap so the
// half-translated page never competes with the real store in search results.
export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "en";
  const robots = { index: false, follow: true };
  return lang === "ko"
    ? {
        title: "제품 — OpenArm 데브킷 | 리버트론",
        description: "OpenArm 로보틱스 데브킷·양팔 시스템·액세서리. 한국에서 조립·검수합니다.",
        robots,
      }
    : {
        title: "Products — OpenArm Devkits | Libertron",
        description: "Browse OpenArm robotics devkits, bimanual systems, and accessories. Assembled in Korea.",
        robots,
      };
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
