import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import FloatingContactButton from "@/components/ui/FloatingContactButton";
import { LOCALES, META, SITE_URL, buildAlternates, isLocale } from "@/lib/i18n/locale";
import { buildJsonLd } from "@/lib/seo/jsonld";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

// This IS the root layout. It owns <html>/<body> on purpose: every rendered route
// lives under /{lang}, so the layout that renders <html> is the one that knows the
// locale and can emit `lang` server-side. Previously <html lang="en"> was hardcoded
// in app/layout.tsx and patched after hydration by a client effect — meaning the
// HTML that Googlebot and Naver's Yeti actually parse declared the Korean pages as
// English. That is a prime suspect for /en outranking /ko on Korean queries.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Locale-level defaults for the home route. Sub-routes (store/resources/…) set
// their own title + alternates, which override these for their subtree.
export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "en";
  const m = META[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: buildAlternates(lang, ""),
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${lang}`,
      siteName: "Libertron OpenArm",
      locale: m.ogLocale,
      alternateLocale: lang === "ko" ? ["en_US"] : ["ko_KR"],
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    verification: {
      google: "RfumMM0xS671BdC5hI5aCjkZtTNyiPfIjboU0RsiHtQ",
      other: {
        "naver-site-verification": "9bd898a66b987915de9b7da28b94898ad2b3a666",
      },
    },
  };
}

export default function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;

  return (
    <html lang={lang} className="scroll-smooth scroll-pt-20" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} font-inter bg-background-main text-foreground-main antialiased`}
        suppressHydrationWarning
      >
        <GoogleTagManager gtmId="GTM-N9TLN2LT" />
        <GoogleAnalytics gaId="G-Y8P93G14MQ" />
        <LanguageProvider initialLang={lang}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
          />
          {children}
          <FloatingContactButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
