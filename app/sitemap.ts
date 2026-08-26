import { MetadataRoute } from 'next';
import { SITE_URL, hreflangLanguages } from '@/lib/i18n/locale';

// Evaluated at build time, so every deploy publishes an honest lastmod. A frozen
// literal (it used to be 2026-08-11) tells Google "nothing changed since then",
// which suppresses re-crawling exactly when we most need it.
const LAST_MODIFIED = new Date();

// Locale-split site: every page exists at /ko/… and /en/…, cross-linked via
// hreflang so each version ranks in its market. `/` geo-redirects (middleware).
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/store', priority: 0.9, freq: 'weekly' },
    { path: '/openarm-1.1', priority: 0.7, freq: 'weekly' },
    { path: '/resources', priority: 0.5, freq: 'monthly' },
  ];

  return routes.flatMap(({ path, priority, freq }) => {
    const languages = hreflangLanguages(path);
    return (['ko', 'en'] as const).map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: freq,
      priority,
      alternates: { languages },
    }));
  });
}
