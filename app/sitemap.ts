import { MetadataRoute } from 'next';
import { localeUrl } from '@/lib/i18n/config';

const LAST_MODIFIED = new Date('2026-06-01');
const V2_MODIFIED = new Date('2026-06-17');

/**
 * One entry per real document. The previous sitemap advertised `?lang=en`
 * variants that served identical HTML and canonicalised back to the bare URL,
 * so Google dropped every one of them. Each route now ships as an `/` (English)
 * and `/ko` (Korean) pair with reciprocal hreflang annotations.
 */
const ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  lastModified: Date;
}> = [
  { path: '/', priority: 1, changeFrequency: 'weekly', lastModified: LAST_MODIFIED },
  { path: '/v2', priority: 1, changeFrequency: 'weekly', lastModified: V2_MODIFIED },
  { path: '/v2/order', priority: 0.9, changeFrequency: 'weekly', lastModified: V2_MODIFIED },
  { path: '/products', priority: 0.8, changeFrequency: 'weekly', lastModified: LAST_MODIFIED },
  { path: '/resources', priority: 0.5, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(({ path, priority, changeFrequency, lastModified }) => {
    const languages = {
      en: localeUrl(path, 'en'),
      ko: localeUrl(path, 'ko'),
      'x-default': localeUrl(path, 'en'),
    };

    return [
      {
        url: localeUrl(path, 'en'),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: localeUrl(path, 'ko'),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  });
}
