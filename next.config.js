/** @type {import('next').NextConfig} */
const nextConfig = {
  // ═══════════════════════════════════════════════════════════
  // SYSTEM ANALYST-LEVEL OPTIMIZATIONS
  // ═══════════════════════════════════════════════════════════
  
  reactStrictMode: true,
  
  // 1️⃣ PERFORMANCE OPTIMIZATION
  swcMinify: true, // Fast minification with SWC
  
  // 2️⃣ PRODUCTION BUILD OPTIMIZATION
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // 3️⃣ IMAGE OPTIMIZATION (Critical for performance)
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats first
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // 4️⃣ COMPRESSION (Gzip/Brotli handled by deployment platform)
  compress: true,
  
  // 5️⃣ HEADERS (Security + Performance)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // 6️⃣ EXPERIMENTAL FEATURES (Performance)
  experimental: {
    // optimizeCss: true, // Disabled - requires 'critters' package (PostCSS handles minification)
    optimizePackageImports: ['framer-motion', '@headlessui/react'], // Tree-shake large dependencies
  },
  
  // 7️⃣ WEBPACK OPTIMIZATION
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunks
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // 8️⃣ POWEREDBYHEADER (Security - remove)
  poweredByHeader: false,
};

module.exports = nextConfig;

