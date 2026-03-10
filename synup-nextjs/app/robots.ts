/**
 * Next.js App Router robots.txt generator.
 *
 * Output: /robots.txt
 *
 * Rules:
 * - Allow all well-behaved crawlers on all production paths
 * - Disallow /api/ routes (not intended for indexing)
 * - Disallow utility/internal paths
 * - Point to sitemap.xml
 * - No accidental noindex of production marketing pages
 *
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.synup.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers on all paths by default
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",         // API routes — not for indexing
          "/_next/",       // Next.js internals
          "/en/style-guide", // Design system reference — noindex in page metadata
          "/de/style-guide",
          "/fr/style-guide",
          "/es/style-guide",
          "/en/lps/",      // Campaign landing pages (set noindex in metadata, also block crawl)
          "/de/lps/",
          "/fr/lps/",
          "/es/lps/",
          "/en/registration-success",  // Success pages — not meaningful for indexing
          "/de/registration-success",
          "/fr/registration-success",
          "/es/registration-success",
          "/en/contact-success",
          "/de/contact-success",
          "/fr/contact-success",
          "/es/contact-success",
          "/en/thank-you",
          "/de/thank-you",
          "/fr/thank-you",
          "/es/thank-you",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
