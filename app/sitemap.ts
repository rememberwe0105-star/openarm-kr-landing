import { MetadataRoute } from 'next';

const LAST_MODIFIED = new Date('2026-06-01');
const V2_MODIFIED = new Date('2026-06-17');

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
      url: 'https://openarm.co.kr/v2',
      lastModified: V2_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          'ko-KR': 'https://openarm.co.kr/v2',
          'en-US': 'https://openarm.co.kr/v2?lang=en',
        },
      },
    },
    {
      url: 'https://openarm.co.kr/v2?lang=en',
      lastModified: V2_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://openarm.co.kr/v2/order',
      lastModified: V2_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'ko-KR': 'https://openarm.co.kr/v2/order',
          'en-US': 'https://openarm.co.kr/v2/order?lang=en',
        },
      },
    },
    {
      url: 'https://openarm.co.kr/v2/order?lang=en',
      lastModified: V2_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
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
