import { SITE_URL, type Locale } from "@/lib/i18n/locale";

// Locale-specific JSON-LD (Organization + WebSite + VideoObject, plus Product on EN).
// EN carries a valid priced offer (rich-result / merchant eligible); KO omits price
// (per the "가격 문의" policy) so it stays valid without an invalid-offer warning.

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Libertron (리버트론)",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+82-2-3486-5278",
    contactType: "sales",
    availableLanguage: ["en", "ko"],
  },
};

const VIDEO = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "OpenArm Official Reveal",
  description: "Witness the capabilities of the OpenArm Bimanual Robot Devkit in action.",
  thumbnailUrl: "https://img.youtube.com/vi/6ZLM6f8kF4Q/maxresdefault.jpg",
  uploadDate: "2024-10-15T00:00:00Z",
  contentUrl: "https://www.youtube.com/watch?v=6ZLM6f8kF4Q",
  embedUrl: "https://www.youtube.com/embed/6ZLM6f8kF4Q",
};

const SHIPPING = {
  "@type": "OfferShippingDetails",
  shippingDestination: [
    { "@type": "DefinedRegion", addressCountry: "KR" },
    { "@type": "DefinedRegion", addressCountry: "US" },
    { "@type": "DefinedRegion", addressCountry: "JP" },
  ],
};

function product(lang: Locale) {
  const base = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "OpenArm 2.0 Bimanual Robot Devkit",
    image: [`${SITE_URL}/og-parts.png`],
    brand: { "@type": "Brand", name: "Libertron" },
  };
  if (lang === "en") {
    return {
      ...base,
      description:
        "A 100% open-source 14-DOF bimanual robot arm for physical-AI research, teleoperation, and imitation learning. Assembled and tested in Korea, shipped worldwide.",
      // Single Offer with `price` (base config, "from $6,000") — NOT AggregateOffer.
      // Merchant-listing rich results require offers.price; AggregateOffer only has
      // lowPrice/highPrice, which GSC flags as "price 누락(경로: offers)" (알림 2026-09-01).
      // Product snippets accept either, so this satisfies both report types.
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "6000",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/en/store`,
        seller: { "@type": "Organization", name: "Libertron" },
        shippingDetails: SHIPPING,
      },
    };
  }
  // KO: no price (가격 문의) → valid Product without an offer, no invalid-offer warning.
  return {
    ...base,
    description:
      "100% 오픈소스 14자유도 양팔 로봇암. 피지컬 AI 연구·텔레오퍼레이션·모방학습에 활용. 리버트론이 한국에서 조립·검수하고 국내 배송·설치·시연까지 지원합니다.",
  };
}

export function buildJsonLd(lang: Locale) {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OpenArm — Libertron",
    url: `${SITE_URL}/${lang}`,
    inLanguage: lang === "en" ? "en" : "ko-KR",
  };
  // Google's Product rich result requires offers/review/aggregateRating. EN has a
  // priced offer → include Product. KO hides price (가격 문의), so a Product without
  // an offer would be flagged invalid — omit it entirely (no product snippet, no
  // warning). No FAQPage: Google deprecated FAQ rich results for commercial sites,
  // and the on-page FAQ copy diverged from a hand-authored duplicate — dropping the
  // schema removes that mismatch risk with no rich-result loss.
  const base = [ORG, website, VIDEO];
  return lang === "en" ? [ORG, website, product("en"), VIDEO] : base;
}
