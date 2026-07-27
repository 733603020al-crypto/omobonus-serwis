import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Google Reviews profile photos (google-reviews-carousel.tsx)
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
    ],

    // увеличиваем TTL для оптимизированных картинок Next.js
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней

    qualities: [40, 60, 75, 85, 90, 100],
  },

  compress: true,
  poweredByHeader: false,

  async headers() {
    return [
      // Кэш для next static файлов (js, css, chunks)
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // Кэш для картинок из public/images
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // favicon.ico и robots.txt редко меняются, но не хешируются как
      // /_next/static, поэтому immutable не подходит — просто длинный TTL.
      {
        source: '/:path(favicon\\.ico|robots\\.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000',
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
