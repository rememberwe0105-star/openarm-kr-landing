import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE } from "@/lib/i18n/config";

/**
 * Locale routing, "prefix as needed" style:
 *
 *   /              → rewrites to /en   (URL stays `/`, the canonical English doc)
 *   /products      → rewrites to /en/products
 *   /ko, /ko/...   → served as-is
 *   /en, /en/...   → 308 to the unprefixed URL so only one URL per document exists
 *
 * Korean visitors landing on an unprefixed URL are redirected to /ko so the
 * 95% of traffic that is Korean keeps its language. The decision is made from
 * Accept-Language only (never user-agent), which is the signal Google's
 * locale-adaptive-page guidance permits — crawlers and humans sending the same
 * header always get the same response.
 */

const PUBLIC_FILE = /\.[^/]+$/;

function skip(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  );
}

function prefersKorean(request: NextRequest): boolean {
  const header = request.headers.get("accept-language");
  if (!header) return false;
  // Take the highest-priority tag only: "ko-KR,ko;q=0.9,en;q=0.8" → "ko-KR"
  const primary = header.split(",")[0]?.trim().toLowerCase() ?? "";
  return primary.startsWith("ko");
}

export function middleware(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;

  if (skip(pathname)) return NextResponse.next();

  // Retire the legacy `?lang=` switch. It used to serve byte-identical HTML
  // that canonicalised back to the bare URL, so Google indexed none of it.
  // Strip the param and send the visitor to the real localized URL.
  const legacyLang = searchParams.get("lang");
  if (legacyLang === "en" || legacyLang === "ko") {
    const url = request.nextUrl.clone();
    url.searchParams.delete("lang");
    const bare = pathname === "/ko" || pathname.startsWith("/ko/") ? pathname.slice(3) || "/" : pathname;
    url.pathname = legacyLang === "ko" ? `/ko${bare === "/" ? "" : bare}` : bare;
    return NextResponse.redirect(url, 308);
  }

  // `/ko` and `/ko/...` are already canonical — serve directly.
  if (pathname === "/ko" || pathname.startsWith("/ko/")) {
    return NextResponse.next();
  }

  // `/en/...` must not exist as a second URL for the English document.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const stripped = pathname.slice(3) || "/";
    return NextResponse.redirect(new URL(`${stripped}${search}`, request.url), 308);
  }

  // Unprefixed URL. Send Korean speakers to /ko unless they already chose.
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (chosen === "ko" || (!chosen && prefersKorean(request))) {
    return NextResponse.redirect(new URL(`/ko${pathname === "/" ? "" : pathname}${search}`, request.url), 307);
  }

  // Otherwise this is the English document. Rewrite (not redirect) so the
  // URL stays clean while `[locale]` still receives a concrete value.
  return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}${search}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
