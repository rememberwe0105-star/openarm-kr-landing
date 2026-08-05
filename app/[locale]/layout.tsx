import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import FloatingContactButton from "@/components/ui/FloatingContactButton";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { LOCALES, Locale, alternatesFor, isLocale } from "@/lib/i18n/config";
import { jsonLdFor } from "./structured-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const COPY: Record<
  Locale,
  { title: string; description: string; ogTitle: string; ogDescription: string; keywords: string[] }
> = {
  en: {
    title: "OpenArm — Open-Source Bimanual Robot Arm for Physical AI | Libertron",
    description:
      "Buy the OpenArm bimanual robot arm: 14 DOF, fully open-source hardware and software, ROS 2 and Python control. Assembled and tested in Korea by Libertron, shipped worldwide for AI research, education and development.",
    ogTitle: "OpenArm — Open-Source Bimanual Robot Arm for Physical AI",
    ogDescription:
      "14 DOF open-source bimanual robot arm. ROS 2 and Python control, backdrivable QDD motors, research-grade specs without the industrial price tag. Assembled in Korea, shipped worldwide.",
    keywords: [
      "OpenArm",
      "bimanual robot arm",
      "open source robot arm",
      "humanoid robot arm",
      "physical AI robot",
      "research robot arm",
      "teleoperation robot arm",
      "ROS 2 robot arm",
      "robot arm for AI research",
      "Libertron",
    ],
  },
  ko: {
    title: "오픈암(OpenArm) — 오픈소스 양팔 로봇암 구매 | 리버트론",
    description:
      "오픈소스 양팔 로봇암 OpenArm 공식 구매. 14 DOF, ROS 2 · Python 제어 지원. (주)리버트론이 한국에서 조립·검수해 전 세계로 배송합니다. 교육 · 연구 · AI 개발용 데브킷.",
    ogTitle: "오픈암(OpenArm) — 오픈소스 양팔 로봇암",
    ogDescription:
      "14 DOF 오픈소스 양팔 로봇암. ROS 2 · Python 제어, 백드라이버블 QDD 모터. 산업용 가격 거품 없이 연구용 스펙. 리버트론이 한국에서 조립·검수합니다.",
    keywords: [
      "OpenArm",
      "오픈암",
      "오픈소스 로봇암",
      "양팔 로봇 구매",
      "연구용 로봇팔",
      "AI 로봇 데브킷",
      "교육용 로봇암",
      "ROS2 호환 로봇팔",
      "리버트론 오픈암",
    ],
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
  const alternates = alternatesFor("/", locale);

  return {
    metadataBase: new URL("https://openarm.co.kr"),
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates,
    openGraph: {
      title: copy.ogTitle,
      description: copy.ogDescription,
      url: alternates.canonical,
      siteName: "Libertron OpenArm",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
      type: "website",
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
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale === "ko" ? "ko-KR" : "en"}
      className="scroll-smooth scroll-pt-20"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} font-inter bg-background-main text-foreground-main antialiased`}
        suppressHydrationWarning
      >
        <GoogleTagManager gtmId="GTM-N9TLN2LT" />
        <GoogleAnalytics gaId="G-Y8P93G14MQ" />
        <LanguageProvider lang={locale}>
          {children}
          <FloatingContactButton />
        </LanguageProvider>
        {/* JSON-LD — localized, so the English document carries English answers
            instead of the Korean FAQ it used to emit for every visitor. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFor(locale)) }}
        />
      </body>
    </html>
  );
}
