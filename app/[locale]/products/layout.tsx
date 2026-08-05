import type { Metadata } from "next";
import { Locale, alternatesFor, isLocale } from "@/lib/i18n/config";

const COPY: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  en: {
    title: "Buy OpenArm — Bimanual Robot Arm Devkits & Accessories | Libertron",
    description:
      "Browse OpenArm bimanual robot arm devkits, leader/follower sets, grippers and depth-camera options. Pre-assembled and tested in Korea, shipped worldwide.",
    ogDescription:
      "OpenArm bimanual robot arm devkits, grippers and accessories. Pre-assembled 14 DOF arms tested in Korea and shipped worldwide.",
  },
  ko: {
    title: "오픈암 구매 — 양팔 로봇암 데브킷 · 액세서리 | 리버트론",
    description:
      "OpenArm 양팔 로봇암 데브킷, 리더/팔로워 세트, 그리퍼, 뎁스 카메라 옵션을 살펴보세요. 한국에서 조립·검수 후 전 세계로 배송합니다.",
    ogDescription:
      "OpenArm 양팔 로봇암 데브킷과 그리퍼·액세서리. 14 DOF 사전 조립 로봇암을 한국에서 검수해 전 세계로 배송합니다.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = COPY[locale];
  const alternates = alternatesFor("/products", locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates,
    openGraph: {
      title: copy.title,
      description: copy.ogDescription,
      url: alternates.canonical,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
