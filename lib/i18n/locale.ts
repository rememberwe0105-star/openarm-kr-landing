// Locale primitives shared by middleware, layouts, sitemap, and the language context.
// Single source of truth for the /ko + /en URL scheme with geo redirect + hreflang.

export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en"; // x-default for global / ambiguous visitors
export const SITE_URL = "https://openarm.co.kr";

export function isLocale(v: string | undefined | null): v is Locale {
  return v === "ko" || v === "en";
}

// Prefix an in-app path with the active locale. `path` starts with "/" or is "".
export function localePath(lang: Locale, path = ""): string {
  return `/${lang}${path}`;
}

// Strip a leading /ko or /en from a pathname → the locale-agnostic remainder
// ("/ko/store" → "/store", "/en" → "", "/ko/" → "").
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(ko|en)(\/.*)?$/);
  if (!m) return pathname;
  const rest = m[2] || "";
  return rest === "/" ? "" : rest;
}

// Per-locale <head> copy. Content lives in the pages; this is the crawlable metadata layer.
export const META: Record<
  Locale,
  { title: string; description: string; ogLocale: string; keywords: string[] }
> = {
  ko: {
    title: "OpenArm 2.0 | 오픈소스 양팔 로봇 · 피지컬 AI 데브킷 | 리버트론",
    description:
      "OpenArm 2.0 — 100% 오픈소스 양팔 로봇암. 피지컬 AI 연구·교육을 누구나 손쉽게. 리버트론이 한국에서 조립·검수하고, 국내는 배송·설치·시연까지 원스톱으로 지원합니다.",
    ogLocale: "ko_KR",
    keywords: [
      "OpenArm", "OpenArm 2.0", "오픈암", "오픈암 2.0", "양팔 로봇", "양팔 로봇암",
      "오픈소스 로봇암", "오픈소스 로봇팔", "피지컬 AI", "Physical AI", "연구용 로봇팔",
      "협동로봇", "로봇 데브킷", "텔레오퍼레이션", "모방학습 로봇", "강화학습 로봇",
      "ROS2 로봇팔", "교육용 로봇암", "휴머노이드 로봇팔", "리버트론", "로봇팔 구매",
    ],
  },
  en: {
    title: "OpenArm 2.0 | Open-Source Bimanual Robot · Physical-AI Devkit | Libertron",
    description:
      "OpenArm 2.0 — a 100% open-source bimanual robot arm for physical-AI research, education, and development. Teleoperation and imitation-learning ready. Assembled and tested in Korea by Libertron, shipped worldwide.",
    ogLocale: "en_US",
    keywords: [
      "OpenArm", "OpenArm 2.0", "bimanual robot", "bimanual robot arm",
      "open-source robot arm", "open source robot", "physical AI", "physical AI robot",
      "teleoperation", "imitation learning", "reinforcement learning robot",
      "robot manipulation", "dual arm robot", "ROS2 robot arm", "research robot arm",
      "robot devkit", "humanoid arm", "Libertron", "buy OpenArm",
    ],
  },
};

// hreflang map for a given locale-agnostic path (used by layout metadata + sitemap).
export function hreflangLanguages(pathNoLocale: string): Record<string, string> {
  return {
    "ko-KR": `${SITE_URL}/ko${pathNoLocale}`,
    en: `${SITE_URL}/en${pathNoLocale}`,
    "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${pathNoLocale}`,
  };
}

// Full canonical + hreflang for a route. Each route passes its own known path
// (e.g. "/store", "" for home) so values stay correct under static generation —
// no request headers involved.
export function buildAlternates(lang: Locale, pathNoLocale: string) {
  return {
    canonical: `${SITE_URL}/${lang}${pathNoLocale}`,
    languages: hreflangLanguages(pathNoLocale),
  };
}
