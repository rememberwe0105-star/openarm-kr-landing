import { SITE_URL, type Locale } from "@/lib/i18n/locale";

// Locale-specific JSON-LD. EN carries a valid priced offer (rich-result / merchant
// eligible); KO omits price (per the "가격 문의" policy) so it stays valid without an
// invalid-offer warning, and instead leans on the localized FAQPage for rich results.

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
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "6000",
        highPrice: "9100",
        offerCount: "8",
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

const FAQ_KO = [
  {
    q: "오픈암(OpenArm)은 기존 산업용 로봇팔과 어떻게 다른가요?",
    a: "OpenArm은 합리적인 가격으로 협동 로봇을 경험해 볼 수 있는 최고의 스타팅 머신입니다. 고가의 산업용 로봇과 달리 연구에 적합한 스펙으로 가격 거품을 제거했으며, 누구나 쉽게 접근하고 개조할 수 있도록 오픈소스를 기반으로 설계되어 교육, 연구, 프로토타이핑에 최적화되어 있습니다.",
  },
  {
    q: "파이썬(Python)이나 ROS2로 직접 제어가 가능한가요?",
    a: "네, 완벽하게 지원합니다! OpenArm은 Python API를 제공하며, C++, ROS2, 웹소켓 등 다양한 환경에서 직접 코딩하여 제어할 수 있습니다. 로봇 공학도나 AI 연구원들이 딥러닝, 강화학습(RL) 모델을 로봇팔에 바로 적용해 볼 수 있는 최고의 플랫폼입니다.",
  },
  {
    q: "대학교 연구실이나 고등학교 로봇 실습용으로 적합한가요?",
    a: "최고의 선택입니다. 컴팩트한 사이즈와 가벼운 무게로 좁은 공간에서도 안전하게 실습할 수 있습니다. 또한 직관적인 티칭 기능과 오픈소스 특성 덕분에 기초 코딩 교육부터 심화 로봇 역학 연구까지 전천후로 활용 가능합니다.",
  },
  {
    q: "그리퍼나 카메라 등 액세서리를 추가할 수 있나요?",
    a: "네. 기본 제공되는 리더·팔로워 그리퍼 외에도 주문형 그리퍼와 흡착 펌프 등 다양한 엔드이펙터(End Effector)를 테스트 해볼 수 있습니다. 오픈소스 하드웨어를 제공하기 때문에 CNC, 3D 프린터 등을 활용하여 어댑터를 제작하고 결합해보는 과정도 어렵지 않게 가능합니다. 상단에는 깊이 정보까지 담는 Depth 카메라(ZED Mini 스테레오 카메라)를 옵션으로 장착할 수 있어, 비전 AI 기반의 자율 픽앤플레이스도 테스트 해볼 수 있습니다.",
  },
  {
    q: "A/S 및 기술 지원은 어떻게 되나요?",
    a: "(주)리버트론은 한국에서 직접 제작한 제품을 기반으로, 상담에서 배송, 기술 지원 등 장비 도입의 전 과정에 대한 원스톱 서비스를 제공합니다. 국내는 복잡한 수입 절차 없이 신속하게 공급하며, 해외 고객의 경우에는 FedEx 등 글로벌 물류 네트워크를 통해 안전하고 효율적인 배송을 지원합니다.",
  },
];

const FAQ_EN = [
  {
    q: "How is OpenArm different from conventional industrial robot arms?",
    a: "OpenArm is an affordable way to get hands-on with a collaborative robot. Unlike expensive industrial arms it is spec'd for research and strips out the price premium, and because it is fully open source anyone can access and modify it — ideal for education, research, and prototyping.",
  },
  {
    q: "Can I control it directly with Python or ROS2?",
    a: "Yes, fully. OpenArm offers a Python API and can be controlled via C++, ROS2, WebSocket, and more. It is an ideal platform for robotics students and AI researchers to run deep-learning and reinforcement-learning (RL) models directly on a real arm.",
  },
  {
    q: "Is it suitable for university labs or high-school robotics classes?",
    a: "It is a great fit. Its compact size and light weight make it safe to work with even in tight spaces, and thanks to intuitive teaching and its open-source design it covers everything from intro coding classes to advanced robot-dynamics research.",
  },
  {
    q: "Can I add accessories like grippers or cameras?",
    a: "Yes. Beyond the standard Leader and Follower grippers, you can test custom grippers, suction pumps, and other end effectors. Because the hardware is open source, fabricating and mounting your own adapters with a CNC or 3D printer is straightforward. A depth camera (ZED Mini stereo camera) can be mounted on top to capture depth data, so you can also try vision-AI-based autonomous pick-and-place.",
  },
  {
    q: "What about after-sales and technical support?",
    a: "Libertron provides one-stop service across the whole adoption process — from consultation to delivery and technical support — for products built in Korea. Domestic orders ship quickly without complex import procedures, and international customers are served through global logistics networks such as FedEx.",
  },
];

function faqPage(lang: Locale) {
  const items = lang === "en" ? FAQ_EN : FAQ_KO;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
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
  // warning) and lean on Organization + FAQPage instead.
  const base = [ORG, website, VIDEO, faqPage(lang)];
  return lang === "en" ? [ORG, website, product("en"), VIDEO, faqPage("en")] : base;
}
