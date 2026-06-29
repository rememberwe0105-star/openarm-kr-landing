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
  async redirects() {
    return [
      // The 2.0 work previously lived at /v2 and /v2/order (indexed on the live
      // site). The unified site moves them to / and /store — redirect to keep SEO.
      { source: '/v2', destination: '/', permanent: true },
      { source: '/v2/order', destination: '/store', permanent: true },
    ];
  },
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
