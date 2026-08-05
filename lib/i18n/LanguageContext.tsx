"use client";

import React, { createContext, useContext, ReactNode, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import enTranslations from "./en.json";
import koTranslations from "./ko.json";
import { DEFAULT_LOCALE, LOCALE_COOKIE, Locale, localizePath, stripLocale } from "./config";

interface LanguageContextType {
  lang: Locale;
  toggleLanguage: () => void;
  t: <T extends string | string[] = string>(key: string) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * The URL is the single source of truth for language — `/` is English, `/ko`
 * is Korean — so the server and the first client render always agree and
 * crawlers see real localized markup instead of a JS-only toggle.
 */
export function LanguageProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = useCallback(() => {
    const next: Locale = lang === "en" ? "ko" : "en";
    // Remember the explicit choice so middleware stops applying the
    // Accept-Language redirect on later visits.
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    const { path } = stripLocale(pathname || "/");
    router.push(localizePath(path, next));
  }, [lang, pathname, router]);

  const t = useCallback(
    <T extends string | string[] = string>(key: string): T => {
      const translations = lang === "en" ? enTranslations : koTranslations;

      // Support nested keys like "hero.title"
      const keys = key.split(".");
      let value: unknown = translations;

      for (const k of keys) {
        if (value === undefined || value === null) break;
        value = (value as Record<string, unknown>)[k];
      }

      // fallback to English then to key itself
      if (value === undefined && lang !== DEFAULT_LOCALE) {
        let fallbackValue: unknown = enTranslations;
        for (const k of keys) {
          if (fallbackValue === undefined || fallbackValue === null) break;
          fallbackValue = (fallbackValue as Record<string, unknown>)[k];
        }
        value = fallbackValue;
      }

      if (typeof value === "string") return value as T;
      if (Array.isArray(value) && value.every((item) => typeof item === "string")) return value as T;

      return key as unknown as T;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

/**
 * Prefixes an internal route with the active locale.
 * `lp("/products")` → `/products` in English, `/ko/products` in Korean.
 */
export function useLocalePath(): (path: string) => string {
  const { lang } = useLanguage();
  return useCallback((path: string) => localizePath(path, lang), [lang]);
}
