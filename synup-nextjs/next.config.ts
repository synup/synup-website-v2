import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { redirectEntries } from "./lib/redirects";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Trailing slashes off (except root) per SEO rules
  trailingSlash: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
    ],
  },

  // CSP and security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https://cdn.prod.website-files.com data:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Redirects — delegates to the redirect map in lib/redirects.ts
  // Note: Next.js redirects() must return the array directly.
  // For large redirect maps, consider middleware-based redirects instead.
  async redirects() {
    return redirectEntries.map((entry) => ({
      source: entry.source,
      destination: entry.destination,
      permanent: entry.permanent,
    }));
  },
};

export default withNextIntl(nextConfig);
