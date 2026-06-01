import { MetadataRoute } from 'next';

const LAST_MODIFIED = new Date('2026-06-01');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://openarm.co.kr',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://openarm.co.kr/?lang=en',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://openarm.co.kr/products',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://openarm.co.kr/products?lang=en',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://openarm.co.kr/resources',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://openarm.co.kr/resources?lang=en',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
