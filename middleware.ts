import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";

// Decide the locale for a non-prefixed request:
//   1) explicit manual choice (cookie set by the language toggle)
//   2) geo — Vercel edge sets x-vercel-ip-country (KR → Korean)
//   3) Accept-Language header
//   4) x-default (English)
function pickLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get("openarm-lang")?.value;
  if (cookie === "ko" || cookie === "en") return cookie;

  const country = req.headers.get("x-vercel-ip-country");
  if (country === "KR") return "ko";

  const al = (req.headers.get("accept-language") || "").toLowerCase();
  if (/(^|,)\s*ko\b/.test(al)) return "ko";

  return DEFAULT_LOCALE;
}

function hasLocalePrefix(pathname: string): boolean {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

// Legacy paths from the previous site structure, mapped to their locale-agnostic
// destination (kept for SEO / inbound links). Middleware runs before
// next.config redirects, so these must be handled here to avoid a 404.
const LEGACY: Record<string, string> = {
  "/v2": "",
  "/v2/order": "/store",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (hasLocalePrefix(pathname)) {
    // Already localized — let it through. Each route emits its own canonical +
    // hreflang from its known path (static-generation safe).
    return NextResponse.next();
  }

  // No locale prefix → send to the detected locale.
  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  const legacy = LEGACY[pathname.replace(/\/$/, "")];
  if (legacy !== undefined) {
    // Legacy URL → permanent (308) redirect to its localized destination.
    url.pathname = `/${locale}${legacy}`;
    return NextResponse.redirect(url, 308);
  }
  // 307 (temporary) so search engines keep both localized URLs indexable
  // rather than collapsing to one.
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Run on everything except API routes, Next internals, and static files
  // (anything with a dot). sitemap.xml / robots.txt are excluded via the dot rule.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
