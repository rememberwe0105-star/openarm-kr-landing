import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";

// Decide the locale for a non-prefixed request. Location is the source of truth
// (it decides the market: Korean ₩/domestic vs global $), so a KNOWN geo always
// wins over browser language — Korea → Korean, any other country → English.
//   1) explicit manual choice (cookie; reserved for a future country selector)
//   2) geo — Vercel edge sets x-vercel-ip-country. Known → KR ? ko : en
//   3) geo unknown (header absent) → Accept-Language, then x-default (English)
function pickLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get("openarm-lang")?.value;
  if (cookie === "ko" || cookie === "en") return cookie;

  const country = req.headers.get("x-vercel-ip-country");
  if (country && country !== "XX") return country === "KR" ? "ko" : "en";

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
  // /products is superseded by /store. It used to be noindex'd, which threw its
  // search equity away — every query landing on it ("openarm camera", "openarm
  // leader", "openarm ker", "openarm gripper") is store intent. Redirect instead,
  // so that equity moves to /store rather than evaporating.
  "/products": "/store",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const country = req.headers.get("x-vercel-ip-country");

  if (hasLocalePrefix(pathname)) {
    // /{locale}/products → /{locale}/store, permanently. Unlike the geo redirect
    // below this destination does not depend on the visitor, so 308 is safe and
    // is what actually transfers ranking signals to /store.
    const productsMatch = pathname.match(/^\/(ko|en)\/products\/?$/);
    if (productsMatch) {
      const url = req.nextUrl.clone();
      url.pathname = `/${productsMatch[1]}/store`;
      return NextResponse.redirect(url, 308);
    }

    // Domestic guard: a Korea-geo visitor must never sit on the global /en pages
    // (they'd see $ pricing). However they arrived — a shared /en link, a search
    // result, a stale cookie — bounce /en/* → /ko/* when geo is KR.
    // One-directional on purpose: /ko is NOT forced to /en for non-KR, so
    // Googlebot (which crawls from the US) can still reach and index /ko.
    if (country === "KR" && (pathname === "/en" || pathname.startsWith("/en/"))) {
      const url = req.nextUrl.clone();
      url.pathname = "/ko" + pathname.slice(3); // "/en" → "/ko", "/en/x" → "/ko/x"
      const res = NextResponse.redirect(url, 307);
      res.headers.set("Cache-Control", "private, no-store");
      return res;
    }
    // Already localized — let it through. Each route emits its own canonical +
    // hreflang from its known path (static-generation safe).
    return NextResponse.next();
  }

  // No locale prefix → send to the detected locale. 307 (temporary) so search
  // engines keep both localized URLs indexable rather than collapsing to one.
  // The destination is geo-dependent, so the redirect must never be cached by a
  // shared proxy (that would leak one visitor's locale to another region).
  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  const legacy = LEGACY[pathname.replace(/\/$/, "")];
  url.pathname = `/${locale}${legacy !== undefined ? legacy : pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("Vary", "Accept-Language");
  return res;
}

export const config = {
  // Run on everything except API routes, Next internals, generated metadata
  // routes, and static assets.
  //
  // This used to exclude "any path containing a dot", which was wrong in both
  // directions:
  //   - it skipped real content whose slug has a dot, so /openarm-1.1 404'd and
  //     /en/openarm-1.1 slipped past the domestic guard above, and
  //   - it did NOT skip /opengraph-image, which has no extension at all, so
  //     every page's og:image got a locale prepended and 404'd (no link
  //     preview thumbnail anywhere).
  // So: exclude static assets by extension, and name the extension-less
  // metadata routes explicitly. Keep this in sync with the metadata files in
  // app/ (favicon.ico, icon.png, apple-icon.png, opengraph-image.tsx,
  // manifest.ts, robots.ts, sitemap.ts).
  matcher: [
    "/((?!api(?:/|$)|_next(?:/|$)|favicon\\.ico$|icon\\.png$|apple-icon\\.png$|opengraph-image$|twitter-image$|manifest\\.webmanifest$|robots\\.txt$|sitemap\\.xml$|.*\\.(?:webp|png|jpe?g|gif|svg|avif|ico|glb|gltf|bin|css|mjs|js|map|json|html|txt|xml|mp4|webm|mov|woff2|woff|ttf|otf|eot|pdf|zip)$).*)",
  ],
};
