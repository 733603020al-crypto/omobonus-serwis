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

    // Весь локальный контент сайта живёт под /public/images — разрешаем
    // next/image оптимизировать любой файл оттуда (в т.ч. логотипы брендов
    // из brand-ticker.tsx, которые грузятся с ?v=N для сброса кэша при
    // замене файла — search не указываем, чтобы разрешить любое значение N).
    // Без widecard-паттерна `localPatterns` превращается в allowlist и
    // next/image возвращает 500 на КАЖДОЙ локальной картинке вне /brands/.
    localPatterns: [
      { pathname: '/images/**' },
    ],

    // увеличиваем TTL для оптимизированных картинок Next.js
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней

    qualities: [32, 40, 60, 75, 85, 90, 100],
  },

  compress: true,
  poweredByHeader: false,

  // CSS встраивается в HTML (<style>) вместо отдельных <link>: на мобильных
  // убирает 3 блокирующих запроса перед первой отрисовкой. Стили те же и в
  // том же порядке, поэтому вид страниц не меняется.
  experimental: {
    inlineCss: true,
  },

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

      // Иконки из public/icons (не хешируются) — тот же длинный TTL, что и у favicon.
      {
        source: '/icons/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000',
          },
        ],
      },

      // floating-call.html — отдельный фрагмент виджета, не часть sitemap/навигации: не индексировать.
      {
        source: '/floating-call.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
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

      // Базовые security-заголовки на все страницы. Полноценный CSP сюда
      // не добавлен — требует отдельной сверки со всеми внешними скриптами
      // (GTM, CookieYes, Google Maps, шрифты) и тестирования.
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
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
