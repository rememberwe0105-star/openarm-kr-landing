/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openarm.dev',
      },
    ],
  },
  // NOTE: legacy /v2 and /v2/order redirects are handled in middleware.ts —
  // middleware runs before next.config redirects, and would otherwise prepend a
  // locale to /v2 and 404. Middleware maps them to /{locale} and /{locale}/store.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' }
        ],
      },
    ];
  },
};

export default nextConfig;
