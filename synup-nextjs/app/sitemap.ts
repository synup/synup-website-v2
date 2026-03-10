/**
 * Next.js App Router sitemap generator.
 *
 * Generates XML sitemap entries for all pages across all 4 locales.
 * Output: /sitemap.xml
 *
 * Coverage:
 *  - All static pages
 *  - All dynamic product/solution/white-label/why-synup/ai pages
 *  - All CMS collection listing and detail pages (loaded from /content/ layer)
 *
 * Hreflang alternates: each URL entry includes xhtml:link alternates for
 * all 4 locales (en, de, fr, es) per Google's multilingual sitemap spec.
 *
 * References:
 *  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *  - https://developers.google.com/search/docs/specialty/international/localized-versions
 */

import type { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";

/* ─── Configuration ──────────────────────────────────────────────────────── */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.synup.com";
const LOCALES = ["en", "de", "fr", "es"] as const;
type Locale = (typeof LOCALES)[number];
const LAST_MOD = new Date().toISOString();

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/** Build a canonical URL for a given locale and path. */
function localeUrl(locale: Locale, path: string): string {
  // English: no prefix (canonical uses /en/ but sitemap mirrors live URL structure)
  if (locale === "en") {
    return path === "/" ? BASE_URL : `${BASE_URL}${path}`;
  }
  return path === "/" ? `${BASE_URL}/${locale}` : `${BASE_URL}/${locale}${path}`;
}

/** Build alternate language entries (hreflang) for a path. */
function buildAlternates(path: string) {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = localeUrl(locale, path);
  }
  // x-default points to English
  alternates["x-default"] = localeUrl("en", path);
  return alternates;
}

/** Build sitemap entries for a path, expanded across all locales. */
function buildEntries(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  priority = 0.7
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified: LAST_MOD,
    changeFrequency,
    priority,
    alternates: { languages: buildAlternates(path) },
  }));
}

/** Read CMS collection slugs from /content/en/[collection]/ directory. */
function readCollectionSlugs(collection: string): string[] {
  try {
    const dir = join(process.cwd(), "content", "en", collection);
    const files = readdirSync(dir);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    // Content directory may not exist yet (pre-transform-script run)
    return [];
  }
}

/* ─── Static page paths ──────────────────────────────────────────────────── */

const STATIC_PAGES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.6 },
  { path: "/partners", changeFrequency: "monthly", priority: 0.7 },
  { path: "/book-a-demo", changeFrequency: "monthly", priority: 0.9 },
  { path: "/freetrial", changeFrequency: "monthly", priority: 0.9 },
  { path: "/explore-apps", changeFrequency: "monthly", priority: 0.8 },
  { path: "/get-reviews", changeFrequency: "monthly", priority: 0.7 },
  { path: "/synup-vs-hootsuite", changeFrequency: "monthly", priority: 0.6 },
  { path: "/yext-alt", changeFrequency: "monthly", priority: 0.7 },
  { path: "/local-seo-statistics", changeFrequency: "monthly", priority: 0.6 },
  { path: "/online-review-statistics", changeFrequency: "monthly", priority: 0.6 },
  { path: "/social-media-marketing-statistics", changeFrequency: "monthly", priority: 0.6 },
  { path: "/voice-search-statistics", changeFrequency: "monthly", priority: 0.6 },
  { path: "/listing-management-api", changeFrequency: "monthly", priority: 0.6 },
  { path: "/local-search-rank-tracking-api", changeFrequency: "monthly", priority: 0.6 },
  { path: "/reputation-management-api", changeFrequency: "monthly", priority: 0.6 },
  { path: "/facebook-post-scheduler", changeFrequency: "monthly", priority: 0.6 },
  { path: "/google-business-profile-post-scheduler", changeFrequency: "monthly", priority: 0.6 },
  { path: "/linkedin-post-scheduler", changeFrequency: "monthly", priority: 0.6 },
  { path: "/local-grid-ranking-tool", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
  // Shell pages — lower priority until content is filled
  { path: "/managed-services", changeFrequency: "monthly", priority: 0.5 },
  { path: "/office-hours", changeFrequency: "monthly", priority: 0.5 },
  { path: "/pro-portal", changeFrequency: "monthly", priority: 0.5 },
  { path: "/reports-and-stats", changeFrequency: "monthly", priority: 0.5 },
  { path: "/roi-profiles", changeFrequency: "monthly", priority: 0.5 },
  { path: "/what-is-ranking", changeFrequency: "monthly", priority: 0.5 },
  { path: "/how-to-market", changeFrequency: "monthly", priority: 0.5 },
  { path: "/automations", changeFrequency: "monthly", priority: 0.5 },
  // Collection listing pages
  { path: "/integrations", changeFrequency: "weekly", priority: 0.7 },
  { path: "/case-studies", changeFrequency: "weekly", priority: 0.7 },
  { path: "/learn", changeFrequency: "weekly", priority: 0.7 },
  { path: "/how-to", changeFrequency: "weekly", priority: 0.7 },
  { path: "/ebooks", changeFrequency: "monthly", priority: 0.6 },
  { path: "/video", changeFrequency: "weekly", priority: 0.6 },
  { path: "/tools", changeFrequency: "monthly", priority: 0.6 },
  { path: "/use-case", changeFrequency: "monthly", priority: 0.6 },
  { path: "/compare", changeFrequency: "monthly", priority: 0.7 },
];

/* ─── Dynamic (known-slug) page paths ────────────────────────────────────── */

const PRODUCT_SLUGS = [
  "agency-os",
  "presence",
  "reputation",
  "social",
  "seo",
  "crm",
  "invoicing-e-sign",
  "leads",
  "analytics",
];

const SUB_PRODUCT_COMBOS: { product: string; subpage: string }[] = [
  { product: "agency-os", subpage: "white-label" },
  { product: "agency-os", subpage: "client-portal" },
  { product: "agency-os", subpage: "churn-forecasting" },
  { product: "agency-os", subpage: "custom-fields" },
  { product: "agency-os", subpage: "client-summary" },
  { product: "presence", subpage: "network" },
  { product: "presence", subpage: "features" },
  { product: "presence", subpage: "analytics" },
  { product: "presence", subpage: "pricing" },
  { product: "reputation", subpage: "network" },
  { product: "reputation", subpage: "feature" },
  { product: "reputation", subpage: "analytics" },
  { product: "reputation", subpage: "generation" },
  { product: "reputation", subpage: "pricing" },
  { product: "social", subpage: "platform" },
  { product: "social", subpage: "features" },
  { product: "social", subpage: "analytics" },
  { product: "social", subpage: "pricing" },
];

const SOLUTION_SLUGS = [
  "seo-agency",
  "web-agency",
  "advertising-agency",
  "web-host-domains",
  "franchisee",
  "telecom",
  "vertical-saas-providers",
  "tv-radio-stations",
  "internet-yellow-pages",
  "marketing",
  "sales",
  "finance",
  "customer-success",
  "pos-providers",
];

const WHITE_LABEL_SLUGS = [
  "white-label-software",
  "white-label-listing-management-software",
  "white-label-reputation-management-software",
  "white-label-social-media-management-software",
  "white-label-seo-software",
];

const WHY_SYNUP_SLUGS = [
  "dedicated-support",
  "roi-driving-campaigns",
  "managed-migration",
  "contract-buyouts",
  "objective-focused-engagement",
  "stellar-reporting",
  "comprehensive-solutions",
  "ai-driven-tools",
];

const AI_SLUGS = ["synup-ai", "ai-listings", "ai-social-media-report"];

const LISTS_SLUGS = ["chrome-seo-plugins", "citation-building", "ideas-to-generate-reviews"];

/* ─── CMS collection names (mirrors /content/[locale]/ subdirectories) ───── */

const CMS_COLLECTIONS: {
  name: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  urlPrefix: string;
}[] = [
  { name: "integrations", changeFrequency: "monthly", priority: 0.6, urlPrefix: "/integrations" },
  { name: "case-studies", changeFrequency: "monthly", priority: 0.7, urlPrefix: "/case-studies" },
  { name: "learns", changeFrequency: "weekly", priority: 0.7, urlPrefix: "/learn" },
  { name: "how-tos", changeFrequency: "monthly", priority: 0.7, urlPrefix: "/how-to" },
  { name: "ebooks", changeFrequency: "monthly", priority: 0.6, urlPrefix: "/ebooks" },
  { name: "videos", changeFrequency: "weekly", priority: 0.6, urlPrefix: "/video" },
  { name: "tools", changeFrequency: "monthly", priority: 0.6, urlPrefix: "/tools" },
  { name: "use-cases", changeFrequency: "monthly", priority: 0.6, urlPrefix: "/use-case" },
  { name: "alternatives", changeFrequency: "monthly", priority: 0.6, urlPrefix: "/alternatives" },
  { name: "competitors", changeFrequency: "monthly", priority: 0.6, urlPrefix: "/competitors" },
  { name: "compare-pages", changeFrequency: "monthly", priority: 0.6, urlPrefix: "/compare" },
  { name: "testimonials", changeFrequency: "monthly", priority: 0.5, urlPrefix: "/testimonials" },
];

/* ─── Sitemap generator ──────────────────────────────────────────────────── */

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const { path, changeFrequency, priority } of STATIC_PAGES) {
    entries.push(...buildEntries(path, changeFrequency, priority));
  }

  // Product pages
  for (const slug of PRODUCT_SLUGS) {
    entries.push(...buildEntries(`/products/${slug}`, "monthly", 0.8));
  }

  // Sub-product pages
  for (const { product, subpage } of SUB_PRODUCT_COMBOS) {
    entries.push(...buildEntries(`/products/${product}/${subpage}`, "monthly", 0.7));
  }

  // Solution pages
  for (const slug of SOLUTION_SLUGS) {
    entries.push(...buildEntries(`/solutions/${slug}`, "monthly", 0.7));
  }

  // White label pages
  for (const slug of WHITE_LABEL_SLUGS) {
    entries.push(...buildEntries(`/white-label/${slug}`, "monthly", 0.7));
  }

  // Why Synup pages
  for (const slug of WHY_SYNUP_SLUGS) {
    entries.push(...buildEntries(`/why-synup/${slug}`, "monthly", 0.6));
  }

  // AI pages
  for (const slug of AI_SLUGS) {
    entries.push(...buildEntries(`/ai/${slug}`, "monthly", 0.7));
  }

  // Lists pages
  for (const slug of LISTS_SLUGS) {
    entries.push(...buildEntries(`/lists/${slug}`, "monthly", 0.5));
  }

  // CMS collection detail pages
  for (const collection of CMS_COLLECTIONS) {
    const slugs = readCollectionSlugs(collection.name);
    for (const slug of slugs) {
      entries.push(
        ...buildEntries(
          `${collection.urlPrefix}/${slug}`,
          collection.changeFrequency,
          collection.priority
        )
      );
    }
  }

  return entries;
}
