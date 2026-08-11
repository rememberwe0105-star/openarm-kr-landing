"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import enTranslations from "./en.json";
import koTranslations from "./ko.json";
import { stripLocale, type Locale } from "./locale";

type Language = Locale;

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: <T extends string | string[] = string>(key: string) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// The active locale now comes from the URL (/ko/… or /en/…). `initialLang` is
// seeded server-side by app/[lang]/layout.tsx, so SSR renders the correct
// language and both versions are fully crawlable. Toggling navigates to the
// sibling locale URL and remembers the choice in a cookie the middleware reads.
export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Language;
}) {
  const [lang, setLang] = useState<Language>(initialLang);
  const router = useRouter();
  const pathname = usePathname();

  // keep state aligned with the URL locale across client navigations
  useEffect(() => {
    setLang(initialLang);
  }, [initialLang]);

  const toggleLanguage = useCallback(() => {
    const next: Language = lang === "en" ? "ko" : "en";
    document.cookie = `openarm-lang=${next};path=/;max-age=31536000;samesite=lax`;
    const rest = stripLocale(pathname || `/${lang}`);
    setLang(next); // snappy toggle; the navigation re-seeds via initialLang
    router.push(`/${next}${rest}`);
  }, [lang, pathname, router]);

  const t = useCallback(<T extends string | string[] = string>(key: string): T => {
    const translations = lang === "en" ? enTranslations : koTranslations;

    // Support nested keys like "hero.title"
    const keys = key.split(".");
    let value: unknown = translations;

    for (const k of keys) {
      if (value === undefined || value === null) break;
      value = (value as Record<string, unknown>)[k];
    }

    // fallback to English then to key itself
    if (value === undefined && lang !== "en") {
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
  }, [lang]);

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
