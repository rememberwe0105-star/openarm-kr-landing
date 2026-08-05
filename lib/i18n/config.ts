export const LOCALES = ["en", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * English is the unprefixed default: `/` is the English page and the
 * x-default target. Korean lives under `/ko`. The site targets a global
 * audience, so the canonical root must be the English document.
 */
export const DEFAULT_LOCALE: Locale = "en";

export const SITE_URL = "https://openarm.co.kr";

/** Cookie remembering an explicit language choice, so the `/` → `/ko`
 *  Accept-Language redirect never overrides what the visitor picked. */
export const LOCALE_COOKIE = "openarm-locale";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ko";
}

/** `/products` + `ko` → `/ko/products`; `/products` + `en` → `/products` */
export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

/** Inverse of localizePath — strips a locale prefix back to the bare route. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (isLocale(maybeLocale)) {
    const rest = `/${segments.slice(2).join("/")}`;
    return { locale: maybeLocale, path: rest === "/" ? "/" : rest.replace(/\/$/, "") };
  }
  return { locale: DEFAULT_LOCALE, path: pathname };
}

/** Absolute URL for a route in a given locale. */
export function localeUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${localizePath(path, locale)}`;
}

/**
 * Canonical + reciprocal hreflang map for a route in a given locale.
 *
 * The canonical is always self-referencing (the *current* locale's URL) —
 * pointing it at the other language is what made Google drop the previous
 * `?lang=en` pages as duplicates. The hreflang set lists every variant
 * including this one, which Google requires before honouring it at all.
 */
export function alternatesFor(path: string, locale: Locale) {
  return {
    canonical: localeUrl(path, locale),
    languages: {
      en: localeUrl(path, "en"),
      ko: localeUrl(path, "ko"),
      "x-default": localeUrl(path, DEFAULT_LOCALE),
    },
  };
}
