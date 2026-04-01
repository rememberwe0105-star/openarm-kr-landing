import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://openarm.co.kr'),
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/',
      'en-US': '/?lang=en', // Optional language param hint
      'x-default': '/',
    },
  },
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
import { GoogleTagManager } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth scroll-pt-20" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-inter bg-background-main text-foreground-main antialiased`} suppressHydrationWarning>
        <GoogleTagManager gtmId="GTM-N9TLN2LT" />
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
                "brand": {
                  "@type": "Brand",
                  "name": "Libertron"
                },
                "description": "Pre-assembled 14DOF open-source bimanual robotic arm. Fully tested and shipped globally from South Korea for AI researchers.",
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD",
                  "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingDestination": {
                      "@type": "DefinedRegion",
                      "addressCountry": "US"
                    }
                  }
                }
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
