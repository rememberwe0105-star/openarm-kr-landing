"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import enTranslations from "./en.json";
import koTranslations from "./ko.json";

type Language = "en" | "ko";

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en"); // Default to English
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Component is mounted, we can safely access localStorage
    setIsMounted(true);
    const savedLang = localStorage.getItem("openarm-lang") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "ko")) {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => {
      const newLang = prev === "en" ? "ko" : "en";
      localStorage.setItem("openarm-lang", newLang);
      return newLang;
    });
  };

  const t = useCallback((key: string): string => {
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

    return typeof value === "string" ? value : key;
  }, [lang]);

  // We still provide the context so `useLanguage` does not crash during SSR
  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      <div style={{ visibility: isMounted ? "visible" : "hidden" }}>
        {children}
      </div>
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
