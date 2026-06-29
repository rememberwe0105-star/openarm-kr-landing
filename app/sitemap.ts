import { MetadataRoute } from 'next';

const LAST_MODIFIED = new Date('2026-06-28');
const BASE = 'https://openarm.co.kr';

// Unified site: `/` = premium OpenArm 2.0 landing, `/store` = full lineup store
// (carries the 2.0 purchase-intent SEO previously on /v2 + /v2/order, now redirected).
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'weekly',
  ): MetadataRoute.Sitemap => [
    { url: `${BASE}${path}`, lastModified: LAST_MODIFIED, changeFrequency, priority },
    { url: `${BASE}${path}?lang=en`, lastModified: LAST_MODIFIED, changeFrequency, priority },
  ];

  return [
    ...entry('', 1.0),
    ...entry('/store', 0.9),
    ...entry('/openarm-1.1', 0.7),
    ...entry('/products', 0.7),
    ...entry('/resources', 0.5, 'monthly'),
  ];
}
