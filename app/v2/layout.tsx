import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenArm 2.0 Price & Pre-order | 오픈암 2.0 사전예약·구매 | OpenArm Korea",
  description:
    "Pre-order OpenArm 2.0 — the next-gen bimanual robot arm. Estimated from $6,500. 7-DOF ×2, bilateral force feedback, in-hand camera, OpenArm Cell & KER. Assembled in Korea, shipped worldwide. 오픈암 2.0 사전예약·구매 — 가격, 구성, 글로벌 배송 안내.",
  keywords: [
    "OpenArm 2.0", "OpenArm 2.0 price", "OpenArm 2.0 purchase", "buy OpenArm 2.0",
    "OpenArm 2.0 pre-order", "OpenArm 2.0 cost", "OpenArm bimanual robot",
    "OpenArm Cell", "OpenArm KER",
    "오픈암 2.0", "오픈암 2.0 구매", "오픈암 2.0 가격", "오픈암 2.0 사전예약",
    "OpenArm 2.0 사전예약", "양팔 로봇암 구매", "리버트론 오픈암",
  ],
  alternates: {
    canonical: "/v2",
    languages: {
      "ko-KR": "/v2",
      "en-US": "/v2?lang=en",
      "x-default": "/v2",
    },
  },
  openGraph: {
    title: "OpenArm 2.0 — Pre-order & Price | 오픈암 2.0 사전예약",
    description:
      "Pre-order OpenArm 2.0 from Korea. Estimated from $6,500. Bilateral force feedback, in-hand camera, OpenArm Cell & KER. 오픈암 2.0 사전예약·구매 문의.",
    url: "/v2",
    siteName: "Libertron OpenArm",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR"],
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenArm 2.0 — Pre-order & Price | 오픈암 2.0 사전예약",
    description:
      "Pre-order OpenArm 2.0 from Korea. Estimated from $6,500. 오픈암 2.0 사전예약·구매 문의.",
    images: ["/twitter-image.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "OpenArm 2.0 Bimanual Robot Arm",
    image: ["https://openarm.co.kr/opengraph-image.png"],
    description:
      "Next-generation open-source bimanual robot arm. 7-DOF x2, bilateral force feedback, compact gripper with in-hand camera. Assembled in Korea by Libertron, shipped worldwide. Available for pre-order.",
    brand: { "@type": "Brand", name: "Libertron" },
    category: "Robotic Arm",
    offers: {
      "@type": "Offer",
      url: "https://openarm.co.kr/v2/order",
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
      { "@type": "ListItem", position: 1, name: "OpenArm", item: "https://openarm.co.kr" },
      { "@type": "ListItem", position: 2, name: "OpenArm 2.0", item: "https://openarm.co.kr/v2" },
      { "@type": "ListItem", position: 3, name: "Pre-order", item: "https://openarm.co.kr/v2/order" },
    ],
  },
];

export default function V2Layout({ children }: { children: React.ReactNode }) {
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
