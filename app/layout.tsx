import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://openarm.co.kr'),
  title: "OpenArm KR | 공식 한국 총판 (주)리버트론",
  description: "합리적인 가격, 압도적인 성능. 오픈소스 로봇팔 OpenArm의 한국 공식 런칭 페이지. 교육, 연구, 산업용 로봇팔의 새로운 기준.",
  keywords: ["OpenArm", "오픈암", "로봇팔", "오픈소스 로봇", "리버트론", "Libertron", "협동로봇", "연구용 로봇"],
  openGraph: {
    title: "OpenArm KR | 공식 한국 런칭",
    description: "합리적인 가격, 압도적인 성능. 오픈소스 로봇팔 OpenArm을 리버트론을 통해 만나보세요.",
    url: 'https://openarm.co.kr',
    siteName: 'OpenArm KR',
    locale: 'ko_KR',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth scroll-pt-20">
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-inter bg-background-main text-foreground-main antialiased`}>
        <LanguageProvider>
          {children}
          <FloatingContactButton />
        </LanguageProvider>
        {/* JSON-LD SEO Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "리버트론 (Libertron) OpenArm KR",
              "url": "https://openarm.co.kr",
              "logo": "https://openarm.co.kr/images/openarm_logo.png"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "OpenArm KR",
              "url": "https://openarm.co.kr"
            })
          }}
        />
      </body>
    </html>
  );
}
