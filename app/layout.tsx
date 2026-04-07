import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://openarm.co.kr'),
  title: "OpenArm KR | Libertron Devkits (Global) | (주)리버트론",
  description: "Buy the official OpenArm bimanual robot from Libertron. Assembled in Korea, Shipped globally. 오픈소스 로봇암 OpenArm 글로벌 구매 페이지. 교육/연구/AI 개발용 양팔 로봇암을 전 세계로 배송합니다.",
  keywords: [
    "오픈암", "OpenArm", "오픈암 구매", "오픈암 사는 법", "오픈암 파는 곳", "오픈암 가격", "오픈암 견적", "오픈암 로봇", "리버트론 오픈암", "OpenArm KR", "오픈암 한국", "오픈암 수입", "오픈암 판매처", "연구용 로봇팔", "연구용 로봇암", "교육용 로봇팔", "교육용 로봇암", "저렴한 로봇팔", "가성비 로봇팔", "소형 로봇팔 구매", "탁상용 로봇팔", "대학 연구실 로봇팔", "AI 연구용 로봇", "로봇 제어 실습기기", "인공지능 로봇 실험", "협동로봇 구매", "다관절 로봇팔 구매", "양팔 로봇 구매", "오픈소스 로봇팔", "오픈소스 로봇암", "로봇팔 오픈소스", "로봇팔 키트", "DIY 로봇팔", "ROS 로봇팔", "ROS2 호환 로봇팔", "파이썬 제어 로봇팔", "파이썬 로봇암", "강화학습 로봇팔", "딥러닝 로봇팔", "비전 AI 로봇", "휴머노이드 로봇팔", "7자유도 로봇팔", "14자유도 양팔 로봇", "원격 제어 로봇팔", "텔레오퍼레이션 로봇", "포스 피드백 로봇팔", "햅틱 로봇팔", "픽앤플레이스 로봇", "로봇팔 그리퍼 세트", "로봇팔 데브킷",
    "OpenArm robot", "buy OpenArm", "OpenArm price", "OpenArm cost", "order OpenArm", "where to buy OpenArm", "OpenArm kit", "OpenArm pre-built", "Enactic OpenArm", "OpenArm 01", "OpenArm distributor", "research robot arm", "educational robot arm", "affordable robot arm", "cheap robotic arm", "desktop robot arm", "small robotic arm", "collaborative robot arm", "cobot for sale", "buy cobot", "dual arm robot", "bimanual robot arm", "robot arm for university lab", "robot arm for AI research", "robotics devkit", "open source robot arm", "open source robotic arm", "DIY robot arm kit", "ROS robot arm", "ROS2 compatible robot arm", "Python controllable robot arm", "AI robot arm", "reinforcement learning robot", "Sim-to-Real robot arm", "MuJoCo robot arm", "Isaac Sim robot arm", "robotics prototyping", "AI robotics platform", "7 DOF robot arm", "14 DOF dual arm", "bimanual bipedal robot arm", "teleoperation robot arm", "robotic arm with force feedback", "bilateral force feedback robot", "CAN-FD robot control", "compliant robot joint", "backdrivable robot arm", "pick and place robot arm", "humanoid robot parts"
  ],
  openGraph: {
    title: "OpenArm KR | Libertron Devkits (Global) | (주)리버트론",
    description: "Buy the official OpenArm bimanual robot from Libertron. Assembled in Korea, Shipped globally. 오픈소스 로봇암 OpenArm 글로벌 구매 페이지. 교육/연구/AI 개발용 양팔 로봇암을 전 세계로 배송합니다.",
    url: 'https://openarm.co.kr',
    siteName: 'Libertron OpenArm',
    locale: 'en_US',
    alternateLocale: ['ko_KR'],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "RfumMM0xS671BdC5hI5aCjkZtTNyiPfIjboU0RsiHtQ",
    other: {
      "naver-site-verification": "9bd898a66b987915de9b7da28b94898ad2b3a666",
    },
  },
};

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import FloatingContactButton from "@/components/ui/FloatingContactButton";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth scroll-pt-20" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-inter bg-background-main text-foreground-main antialiased`} suppressHydrationWarning>
        <GoogleTagManager gtmId="GTM-N9TLN2LT" />
        <GoogleAnalytics gaId="G-Y8P93G14MQ" />
        <LanguageProvider>
          {children}
          <FloatingContactButton />
        </LanguageProvider>
        {/* JSON-LD SEO Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Libertron (리버트론)",
                "url": "https://openarm.co.kr",
                "logo": "https://openarm.co.kr/images/openarm_logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+82-2-3486-5278",
                  "contactType": "sales",
                  "availableLanguage": ["en", "ko"]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "OpenArm Bimanual Robot Devkit",
                "image": "https://openarm.co.kr/opengraph-image.png",
                "brand": {
                  "@type": "Brand",
                  "name": "Libertron"
                },
                "description": "Pre-assembled 14DOF open-source bimanual robotic arm. Fully tested and shipped globally from South Korea for AI researchers.",
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD",
                  "price": "0",
                  "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingDestination": {
                      "@type": "DefinedRegion",
                      "addressCountry": "US"
                    }
                  }
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "OpenArm Official Reveal",
                "description": "Witness the capabilities of the OpenArm Bimanual Robot Devkit in action.",
                "thumbnailUrl": "https://img.youtube.com/vi/6ZLM6f8kF4Q/maxresdefault.jpg",
                "uploadDate": "2024-01-01T00:00:00Z",
                "contentUrl": "https://www.youtube.com/watch?v=6ZLM6f8kF4Q",
                "embedUrl": "https://www.youtube.com/embed/6ZLM6f8kF4Q"
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "오픈암(OpenArm)은 기존 산업용 로봇팔과 어떻게 다른가요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "OpenArm은 합리적인 가격으로 협동 로봇을 경험해 볼 수 있는 최고의 스타팅 머신입니다. 고가의 산업용 로봇과 달리 연구에 적합한 스펙으로 가격 거품을 제거했으며, 누구나 쉽게 접근하고 개조할 수 있도록 오픈소스를 기반으로 설계되어 교육, 연구, 프로토타이핑에 최적화되어 있습니다."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "파이썬(Python)이나 ROS로 직접 제어가 가능한가요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "네, 완벽하게 지원합니다! OpenArm은 Python API를 제공하며, C++, ROS, 웹소켓 등 다양한 환경에서 직접 코딩하여 제어할 수 있습니다. 로봇 공학도나 AI 연구원들이 딥러닝, 강화학습(RL) 모델을 로봇팔에 바로 적용해 볼 수 있는 최고의 플랫폼입니다."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "대학교 연구실이나 고등학교 로봇 실습용으로 적합한가요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "최고의 선택입니다. 컴팩트한 사이즈와 가벼운 무게로 좁은 공간에서도 안전하게 실습할 수 있습니다. 또한 직관적인 티칭 펜던트 기능과 오픈소스 특성 덕분에 기초 코딩 교육부터 심화 로봇 역학 연구까지 전천후로 활용 가능합니다."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "그리퍼나 카메라 등 액세서리를 추가할 수 있나요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "네, 현재 제공중인 Leader arm과 Follower arm용 그리퍼 이외에 주문형 그리퍼 및 흡착 펌프 등 다양한 엔드 이펙터(End Effector)를 준비 중이며, 옵션으로 제공되는 고성능 Depth 카메라(Intel RealSense D435IF, D455F, D405 등)을 마운트하여 비전 AI 기반의 자율 픽앤플레이스 작업도 쉽게 구현할 수 있습니다."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "A/S 및 기술 지원은 어떻게 되나요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "(주)리버트론은 한국에서 직접 제작한 제품을 기반으로, 상담에서 배송, 기술 지원 등 장비 도입의 전 과정에 대한 원스톱 서비스를 제공합니다. 국내는 복잡한 수입 절차 없이 신속하게 공급하며, 해외 고객의 경우에는 FedEx 등 글로벌 물류 네트워크를 통해 안전하고 효율적인 배송을 지원합니다."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
