import type { Metadata } from "next";
import { Locale, alternatesFor, isLocale } from "@/lib/i18n/config";

const COPY: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  en: {
    title: "OpenArm Documentation, CAD & Source Code | Libertron",
    description:
      "Official OpenArm documentation, GitHub repositories, CAD files and community links. Everything needed to build, control and extend the arm.",
    ogDescription:
      "Access official OpenArm documentation, GitHub source code, CAD files, and join the developer community on Discord.",
  },
  ko: {
    title: "오픈암 문서 · CAD · 소스코드 | 리버트론",
    description:
      "OpenArm 공식 문서, GitHub 저장소, CAD 파일, 커뮤니티 링크. 로봇암을 조립하고 제어하고 확장하는 데 필요한 자료를 모았습니다.",
    ogDescription:
      "OpenArm 공식 문서와 GitHub 소스코드, CAD 파일을 확인하고 Discord 개발자 커뮤니티에 참여하세요.",
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
  const alternates = alternatesFor("/resources", locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates,
    openGraph: {
      title: copy.title,
      description: copy.ogDescription,
      url: alternates.canonical,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
