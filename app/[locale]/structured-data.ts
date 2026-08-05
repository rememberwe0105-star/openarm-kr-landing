import { Locale, SITE_URL, localeUrl } from "@/lib/i18n/config";

type Faq = { q: string; a: string };

const FAQ: Record<Locale, Faq[]> = {
  en: [
    {
      q: "How is OpenArm different from a conventional industrial robot arm?",
      a: "OpenArm is a starting platform for working with collaborative robots at a reasonable price. Unlike expensive industrial arms it is specced for research rather than production throughput, which removes most of the cost, and the whole design is open source so anyone can inspect, modify and extend it. That makes it well suited to education, research and prototyping.",
    },
    {
      q: "Can I control it directly from Python or ROS 2?",
      a: "Yes. OpenArm ships with a Python API and can be driven from C++, ROS 2 and WebSocket clients. Robotics students and AI researchers can apply deep learning and reinforcement learning models to the arm directly.",
    },
    {
      q: "Is it suitable for a university lab or a school robotics course?",
      a: "It is a strong fit. The compact size and low weight make it safe to work with in tight spaces, and the combination of straightforward teaching functions with an open-source design covers everything from introductory coding classes to advanced robot dynamics research.",
    },
    {
      q: "Can I add a gripper, camera or other accessories?",
      a: "Yes. Beyond the leader-arm and follower-arm grippers available today, we are preparing custom grippers, vacuum pumps and other end effectors. Optional high-performance depth cameras (Intel RealSense D435IF, D455F, D405) can be mounted for vision-based autonomous pick-and-place.",
    },
    {
      q: "What support and service do you provide?",
      a: "Libertron builds the product in Korea and provides one-stop service across the whole deployment: consultation, delivery and technical support. Korean customers are supplied directly without import paperwork; international customers are shipped through global logistics partners such as FedEx.",
    },
  ],
  ko: [
    {
      q: "오픈암(OpenArm)은 기존 산업용 로봇팔과 어떻게 다른가요?",
      a: "OpenArm은 합리적인 가격으로 협동 로봇을 경험해 볼 수 있는 최고의 스타팅 머신입니다. 고가의 산업용 로봇과 달리 연구에 적합한 스펙으로 가격 거품을 제거했으며, 누구나 쉽게 접근하고 개조할 수 있도록 오픈소스를 기반으로 설계되어 교육, 연구, 프로토타이핑에 최적화되어 있습니다.",
    },
    {
      q: "파이썬(Python)이나 ROS로 직접 제어가 가능한가요?",
      a: "네, 완벽하게 지원합니다! OpenArm은 Python API를 제공하며, C++, ROS, 웹소켓 등 다양한 환경에서 직접 코딩하여 제어할 수 있습니다. 로봇 공학도나 AI 연구원들이 딥러닝, 강화학습(RL) 모델을 로봇팔에 바로 적용해 볼 수 있는 최고의 플랫폼입니다.",
    },
    {
      q: "대학교 연구실이나 고등학교 로봇 실습용으로 적합한가요?",
      a: "최고의 선택입니다. 컴팩트한 사이즈와 가벼운 무게로 좁은 공간에서도 안전하게 실습할 수 있습니다. 또한 직관적인 티칭 펜던트 기능과 오픈소스 특성 덕분에 기초 코딩 교육부터 심화 로봇 역학 연구까지 전천후로 활용 가능합니다.",
    },
    {
      q: "그리퍼나 카메라 등 액세서리를 추가할 수 있나요?",
      a: "네, 현재 제공중인 Leader arm과 Follower arm용 그리퍼 이외에 주문형 그리퍼 및 흡착 펌프 등 다양한 엔드 이펙터(End Effector)를 준비 중이며, 옵션으로 제공되는 고성능 Depth 카메라(Intel RealSense D435IF, D455F, D405 등)을 마운트하여 비전 AI 기반의 자율 픽앤플레이스 작업도 쉽게 구현할 수 있습니다.",
    },
    {
      q: "A/S 및 기술 지원은 어떻게 되나요?",
      a: "(주)리버트론은 한국에서 직접 제작한 제품을 기반으로, 상담에서 배송, 기술 지원 등 장비 도입의 전 과정에 대한 원스톱 서비스를 제공합니다. 국내는 복잡한 수입 절차 없이 신속하게 공급하며, 해외 고객의 경우에는 FedEx 등 글로벌 물류 네트워크를 통해 안전하고 효율적인 배송을 지원합니다.",
    },
  ],
};

const PRODUCT_DESCRIPTION: Record<Locale, string> = {
  en: "Pre-assembled 14 DOF open-source bimanual robotic arm. Fully tested and shipped globally from South Korea for AI researchers.",
  ko: "사전 조립된 14 DOF 오픈소스 양팔 로봇암. 한국에서 전수 검수 후 전 세계로 배송합니다.",
};

export function jsonLdFor(locale: Locale) {
  return [
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "OpenArm Bimanual Robot Devkit",
      image: [`${SITE_URL}/opengraph-image.png`],
      brand: { "@type": "Brand", name: "Libertron" },
      description: PRODUCT_DESCRIPTION[locale],
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        url: localeUrl("/products", locale),
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingDestination: [
            { "@type": "DefinedRegion", addressCountry: "KR" },
            { "@type": "DefinedRegion", addressCountry: "US" },
            { "@type": "DefinedRegion", addressCountry: "JP" },
          ],
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "OpenArm Official Reveal",
      description: "Witness the capabilities of the OpenArm Bimanual Robot Devkit in action.",
      thumbnailUrl: "https://img.youtube.com/vi/6ZLM6f8kF4Q/maxresdefault.jpg",
      uploadDate: "2024-10-15T00:00:00Z",
      contentUrl: "https://www.youtube.com/watch?v=6ZLM6f8kF4Q",
      embedUrl: "https://www.youtube.com/embed/6ZLM6f8kF4Q",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ[locale].map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}
