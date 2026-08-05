import type { Metadata } from "next";
import { Locale, SITE_URL, alternatesFor, isLocale, localeUrl } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  { title: string; description: string; keywords: string[]; ogTitle: string; ogDescription: string }
> = {
  en: {
    title: "Buy OpenArm 2.0 — Pre-order, Price & Configurations | Libertron",
    description:
      "Pre-order OpenArm 2.0, OpenArm Cell, the KER leader arm and the 1.1 to 2.0 upgrade kit. Estimated prices: OpenArm 2.0 from $6,500, Cell from $6,200, upgrade kit from $1,000. Assembled in Korea, shipped worldwide.",
    keywords: [
      "OpenArm 2.0 price",
      "buy OpenArm 2.0",
      "OpenArm 2.0 pre-order",
      "OpenArm 2.0 cost",
      "OpenArm Cell price",
      "OpenArm KER",
      "OpenArm upgrade kit",
      "bimanual robot arm price",
    ],
    ogTitle: "Buy OpenArm 2.0 — Pre-order & Price",
    ogDescription:
      "Pre-order OpenArm 2.0 from $6,500, Cell from $6,200, upgrade kit from $1,000. Assembled in Korea, shipped worldwide.",
  },
  ko: {
    title: "오픈암 2.0 구매 · 사전예약 · 구성 안내 | 리버트론",
    description:
      "오픈암 2.0, OpenArm Cell, KER 리더암, 1.1→2.0 업그레이드 키트 사전예약. 예상가: 오픈암 2.0 $6,500부터, Cell $6,200부터, 업그레이드 키트 $1,000부터. 한국에서 조립해 전 세계로 배송합니다.",
    keywords: [
      "오픈암 2.0 구매",
      "오픈암 2.0 가격",
      "오픈암 2.0 사전예약",
      "오픈암 셀 구매",
      "양팔 로봇암 구매",
      "OpenArm KER",
      "오픈암 업그레이드 키트",
    ],
    ogTitle: "오픈암 2.0 구매 — 사전예약 · 가격",
    ogDescription:
      "오픈암 2.0 $6,500부터, Cell $6,200부터, 업그레이드 키트 $1,000부터 사전예약. 한국에서 조립해 전 세계로 배송합니다.",
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
  const alternates = alternatesFor("/v2/order", locale);

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
      name: "OpenArm 2.0 Bimanual Robot Arm — Pre-order",
      image: [`${SITE_URL}/opengraph-image.png`],
      description:
        locale === "ko"
          ? "오픈암 2.0 양팔 로봇암과 액세서리(OpenArm Cell, KER 리더암, 1.1→2.0 업그레이드 키트) 사전예약. 리버트론이 한국에서 조립해 전 세계로 배송합니다."
          : "Pre-order the OpenArm 2.0 bimanual robot arm and accessories (OpenArm Cell, KER leader arm, 1.1 to 2.0 upgrade kit). Assembled in Korea, shipped worldwide by Libertron.",
      brand: { "@type": "Brand", name: "Libertron" },
      category: "Robotic Arm",
      offers: {
        "@type": "AggregateOffer",
        url: localeUrl("/v2/order", locale),
        priceCurrency: "USD",
        lowPrice: "1000",
        highPrice: "6500",
        offerCount: "4",
        availability: "https://schema.org/PreOrder",
        seller: { "@type": "Organization", name: "Libertron (리버트론)" },
      },
    },
  ];
}

export default async function V2OrderLayout({
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
