import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy OpenArm 2.0 — Pre-order & Price | 오픈암 2.0 구매·사전예약 | OpenArm Korea",
  description:
    "Pre-order OpenArm 2.0, OpenArm Cell, KER leader arm, and the 1.1→2.0 upgrade kit. Estimated prices: OpenArm 2.0 from $6,500, Cell from $6,200, upgrade kit from $1,000. Assembled in Korea, shipped worldwide. 오픈암 2.0 구매·가격·사전예약 신청.",
  keywords: [
    "OpenArm 2.0 price", "OpenArm 2.0 purchase", "buy OpenArm 2.0", "OpenArm 2.0 pre-order",
    "OpenArm 2.0 cost", "OpenArm Cell price", "OpenArm KER", "OpenArm upgrade kit",
    "오픈암 2.0 구매", "오픈암 2.0 가격", "오픈암 2.0 사전예약", "오픈암 셀 구매", "양팔 로봇암 구매",
  ],
  alternates: {
    canonical: "/v2/order",
    languages: {
      "ko-KR": "/v2/order",
      "en-US": "/v2/order?lang=en",
      "x-default": "/v2/order",
    },
  },
  openGraph: {
    title: "Buy OpenArm 2.0 — Pre-order & Price | 오픈암 2.0 구매",
    description:
      "Pre-order OpenArm 2.0 from $6,500, Cell from $6,200, upgrade kit from $1,000. Assembled in Korea, shipped worldwide. 오픈암 2.0 구매·사전예약.",
    url: "/v2/order",
    siteName: "Libertron OpenArm",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR"],
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy OpenArm 2.0 — Pre-order & Price | 오픈암 2.0 구매",
    description:
      "Pre-order OpenArm 2.0 from $6,500. Assembled in Korea, shipped worldwide. 오픈암 2.0 구매·사전예약.",
    images: ["/twitter-image.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "OpenArm 2.0 Bimanual Robot Arm — Pre-order",
    image: ["https://openarm.co.kr/opengraph-image.png"],
    description:
      "Pre-order the OpenArm 2.0 bimanual robot arm and accessories (OpenArm Cell, KER leader arm, 1.1->2.0 upgrade kit). Assembled in Korea, shipped worldwide by Libertron.",
    brand: { "@type": "Brand", name: "Libertron" },
    category: "Robotic Arm",
    offers: {
      "@type": "AggregateOffer",
      url: "https://openarm.co.kr/v2/order",
      priceCurrency: "USD",
      lowPrice: "1000",
      highPrice: "6500",
      offerCount: "4",
      availability: "https://schema.org/PreOrder",
      seller: { "@type": "Organization", name: "Libertron (리버트론)" },
    },
  },
];

export default function V2OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
