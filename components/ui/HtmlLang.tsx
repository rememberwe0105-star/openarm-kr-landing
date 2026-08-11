"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/locale";

// The root <html> is statically lang="en" (it can't read the [lang] route param).
// This syncs the attribute to the active locale for accessibility / correctness.
export default function HtmlLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
