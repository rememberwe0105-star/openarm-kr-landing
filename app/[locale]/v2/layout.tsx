import type { Metadata } from "next";
import { Locale, SITE_URL, alternatesFor, isLocale, localeUrl } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  { title: string; description: string; keywords: string[]; ogTitle: string; ogDescription: string }
> = {
  en: {
    title: "OpenArm 2.0 — Price & Pre-order | Bimanual Robot Arm | Libertron",
    description:
      "Pre-order OpenArm 2.0, the next-generation bimanual robot arm. Estimated from $6,500. 7-DOF x2, bilateral force feedback, in-hand camera, OpenArm Cell and KER leader arm. Assembled in Korea, shipped worldwide.",
    keywords: [
      "OpenArm 2.0",
      "OpenArm 2.0 price",
      "buy OpenArm 2.0",
      "OpenArm 2.0 pre-order",
      "bimanual robot arm price",
      "force feedback robot arm",
      "OpenArm Cell",
      "OpenArm KER",
      "teleoperation leader arm",
    ],
    ogTitle: "OpenArm 2.0 — Pre-order & Price",
    ogDescription:
      "Pre-order OpenArm 2.0 from $6,500. Bilateral force feedback, in-hand camera, OpenArm Cell and KER. Assembled in Korea, shipped worldwide.",
  },
  ko: {
    title: "오픈암 2.0 사전예약 · 가격 | 양팔 로봇암 | 리버트론",
    description:
      "차세대 양팔 로봇암 오픈암 2.0 사전예약. 예상가 $6,500부터. 7-DOF ×2, 양방향 힘 피드백, 인핸드 카메라, OpenArm Cell · KER 리더암. 한국에서 조립해 전 세계로 배송합니다.",
    keywords: [
      "오픈암 2.0",
      "오픈암 2.0 구매",
      "오픈암 2.0 가격",
      "오픈암 2.0 사전예약",
      "양팔 로봇암 구매",
      "힘 피드백 로봇암",
      "리버트론 오픈암",
      "OpenArm Cell",
      "OpenArm KER",
    ],
    ogTitle: "오픈암 2.0 — 사전예약 · 가격",
    ogDescription:
      "오픈암 2.0 사전예약, 예상가 $6,500부터. 양방향 힘 피드백, 인핸드 카메라, OpenArm Cell · KER. 한국에서 조립해 전 세계로 배송합니다.",
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
  const alternates = alternatesFor("/v2", locale);

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates,
    openGraph: {
      title: copy.ogTitle,
      description: copy.ogDescription,
      url: alternates.canonical,
      siteName: "Libertron OpenArm",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.ogTitle,
      description: copy.ogDescription,
    },
  };
}

function jsonLd(locale: Locale) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "OpenArm 2.0 Bimanual Robot Arm",
      image: [`${SITE_URL}/opengraph-image.png`],
      description:
        locale === "ko"
          ? "차세대 오픈소스 양팔 로봇암. 7-DOF ×2, 양방향 힘 피드백, 인핸드 카메라 탑재 컴팩트 그리퍼. 리버트론이 한국에서 조립해 전 세계로 배송하며 사전예약을 받고 있습니다."
          : "Next-generation open-source bimanual robot arm. 7-DOF x2, bilateral force feedback, compact gripper with in-hand camera. Assembled in Korea by Libertron, shipped worldwide. Available for pre-order.",
      brand: { "@type": "Brand", name: "Libertron" },
      category: "Robotic Arm",
      offers: {
        "@type": "Offer",
        url: localeUrl("/v2/order", locale),
        priceCurrency: "USD",
        price: "6500",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/PreOrder",
        seller: { "@type": "Organization", name: "Libertron (리버트론)" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "OpenArm", item: localeUrl("/", locale) },
        { "@type": "ListItem", position: 2, name: "OpenArm 2.0", item: localeUrl("/v2", locale) },
        {
          "@type": "ListItem",
          position: 3,
          name: locale === "ko" ? "사전예약" : "Pre-order",
          item: localeUrl("/v2/order", locale),
        },
      ],
    },
  ];
}

export default async function V2Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(activeLocale)) }}
      />
      {children}
    </>
  );
}
