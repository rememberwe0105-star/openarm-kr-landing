import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import FloatingContactButton from "@/components/ui/FloatingContactButton";
import HtmlLang from "@/components/ui/HtmlLang";
import { LOCALES, META, SITE_URL, buildAlternates, isLocale } from "@/lib/i18n/locale";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Locale-level defaults for the home route. Sub-routes (store/products/…) set
// their own title + alternates, which override these for their subtree.
export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "en";
  const m = META[lang];
  return {
    title: m.title,
    description: m.description,
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
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;

  return (
    <LanguageProvider initialLang={lang}>
      <HtmlLang lang={lang} />
      {children}
      <FloatingContactButton />
    </LanguageProvider>
  );
}
