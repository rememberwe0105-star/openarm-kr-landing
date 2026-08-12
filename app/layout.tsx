import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://openarm.co.kr'),
  title: "OpenArm 2.0 | 오픈소스 양팔 로봇 · 피지컬 AI 데브킷 | 리버트론",
  description: "OpenArm 2.0 — 100% 오픈소스 양팔 로봇암. 피지컬 AI 연구를 누구나 재현할 수 있게. 리버트론이 한국에서 조립·검수하고 전 세계로 배송합니다. Open-source bimanual robot for physical-AI research, education & development.",
  keywords: [
    "OpenArm", "OpenArm 2.0", "OpenArm KR", "리버트론 오픈암", "오픈소스 로봇암", "양팔 로봇", "피지컬 AI", "연구용 로봇팔", "AI 로봇 데브킷", "교육용 로봇암", "ROS2 호환 로봇팔"
  ],
  openGraph: {
    title: "OpenArm 2.0 | 오픈소스 양팔 로봇 · 피지컬 AI 데브킷",
    description: "100% 오픈소스 양팔 로봇암. 피지컬 AI 연구를 누구나 재현할 수 있게 — 리버트론이 한국에서 조립·검수, 전 세계 배송. Open-source bimanual robot for physical AI.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-20" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-inter bg-background-main text-foreground-main antialiased`} suppressHydrationWarning>
        <GoogleTagManager gtmId="GTM-N9TLN2LT" />
        <GoogleAnalytics gaId="G-Y8P93G14MQ" />
        {children}
      </body>
    </html>
  );
}
