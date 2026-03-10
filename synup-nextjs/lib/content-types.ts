/**
 * Synup CMS Content Types
 *
 * TypeScript interfaces for every content type exported from Webflow CMS.
 * Derived from 36 content collections across 4 locales (EN, DE, FR, ES).
 *
 * Key naming convention (Tolgee-compatible flat keys):
 *   seo.metaTitle, seo.metaDescription, hero.title, hero.subtitle, etc.
 *
 * Locale-specific fields: all copy fields (title, description, body, etc.)
 * Shared fields: slug, dates, numeric values, URLs, IDs, image URLs
 */

import type { Locale, SeoMeta, PageContentBase } from "./content";

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface RichText {
  /** Sanitized HTML — stripped of scripts and unsafe attributes */
  html: string;
  /** Plain text fallback for meta/OG use */
  plain?: string;
}

// ---------------------------------------------------------------------------
// Competitor / Alternative pages
// ---------------------------------------------------------------------------

/** Webflow collection: Competitors */
export interface Competitor extends PageContentBase {
  collectionType: "competitors";
  /** Competitor brand name */
  name: string;
  /** Short tagline or description */
  tagline: string;
  /** Long-form comparison body (sanitized HTML) */
  body: RichText;
  /** Competitor logo image */
  logo: ImageAsset;
  /** Competitor homepage URL (external link) */
  competitorUrl?: string;
  /** Overall star rating (0–5) */
  rating?: number;
  /** G2 or Capterra review count */
  reviewCount?: number;
  /** Page hero headline */
  heroHeadline: string;
  /** Page hero subheadline */
  heroSubheadline: string;
  /** CTA button label */
  ctaLabel: string;
  /** CTA button href */
  ctaHref: string;
  seo: SeoMeta;
}

/** Webflow collection: Competitor Sections */
export interface CompetitorSection {
  id: string;
  competitorRef: string;
  /** Section heading */
  heading: string;
  /** Section body (sanitized HTML) */
  body: RichText;
  /** Display order */
  order: number;
}

/** Webflow collection: Alternatives */
export interface Alternative extends PageContentBase {
  collectionType: "alternatives";
  /** The "compared to" product name */
  alternativeName: string;
  /** Page headline */
  headline: string;
  /** Subheadline */
  subheadline: string;
  /** Body content */
  body: RichText;
  /** Comparison table reference IDs */
  comparisonTableRefs?: string[];
  seo: SeoMeta;
}

/** Webflow collection: Alts (short-form alternative pages) */
export interface Alt extends PageContentBase {
  collectionType: "alts";
  name: string;
  headline: string;
  body: RichText;
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Compare pages
// ---------------------------------------------------------------------------

/** Webflow collection: Compare pages */
export interface ComparePage extends PageContentBase {
  collectionType: "compare-pages";
  /** Page title (e.g. "Synup vs Yext") */
  title: string;
  /** Hero headline */
  heroHeadline: string;
  /** Hero subheadline */
  heroSubheadline: string;
  /** Body content */
  body: RichText;
  /** Reference to comparison category */
  categoryRef?: string;
  seo: SeoMeta;
}

/** Webflow collection: Compare categories */
export interface CompareCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/** Webflow collection: Compare table categories */
export interface CompareTableCategory {
  id: string;
  name: string;
  slug: string;
}

/** Webflow collection: Comparison Table Categories */
export interface ComparisonTableCategory {
  id: string;
  name: string;
  slug: string;
}

/** Webflow collection: Comparision Table Ros (rows) */
export interface ComparisonTableRow {
  id: string;
  /** Feature / row label */
  featureLabel: string;
  /** Synup supports this feature */
  synupValue: string | boolean;
  /** Competitor value */
  competitorValue: string | boolean;
  /** Category grouping ref */
  categoryRef?: string;
  /** Display order */
  order: number;
}

/** Webflow collection: Comparisons (full comparison pages) */
export interface Comparison extends PageContentBase {
  collectionType: "comparisons";
  title: string;
  headline: string;
  body: RichText;
  /** Comparison table category refs */
  tableCategories?: string[];
  seo: SeoMeta;
}

/** Webflow collection: Comparsions sections */
export interface ComparisonSection {
  id: string;
  comparisonRef: string;
  heading: string;
  body: RichText;
  order: number;
}

/** Webflow collection: Competitors rating tables */
export interface CompetitorRatingTable {
  id: string;
  competitorRef: string;
  /** Rating category label (e.g. "Ease of Use") */
  categoryLabel: string;
  /** Synup score (0–10) */
  synupScore: number;
  /** Competitor score (0–10) */
  competitorScore: number;
  order: number;
}

// ---------------------------------------------------------------------------
// Case Studies
// ---------------------------------------------------------------------------

/** Webflow collection: Case Studies */
export interface CaseStudy extends PageContentBase {
  collectionType: "case-studies";
  /** Customer company name */
  customerName: string;
  /** Industry */
  industry?: string;
  /** Company size (e.g. "500+ locations") */
  companySize?: string;
  /** Hero headline */
  headline: string;
  /** Subheadline */
  subheadline?: string;
  /** Full case study body (sanitized HTML) */
  body: RichText;
  /** Customer logo */
  logo?: ImageAsset;
  /** Hero image */
  heroImage?: ImageAsset;
  /** Results/metrics references */
  resultsRefs?: string[];
  seo: SeoMeta;
}

/** Webflow collection: Case Study Results */
export interface CaseStudyResult {
  id: string;
  caseStudyRef: string;
  /** Metric label (e.g. "Increase in traffic") */
  metricLabel: string;
  /** Metric value (e.g. "143%") */
  metricValue: string;
  order: number;
}

// ---------------------------------------------------------------------------
// Learn / How-To / Marketing Guides
// ---------------------------------------------------------------------------

/** Webflow collection: Learns */
export interface Learn extends PageContentBase {
  collectionType: "learns";
  title: string;
  headline: string;
  body: RichText;
  /** Hero image */
  heroImage?: ImageAsset;
  /** Category reference */
  categoryRef?: string;
  /** Author name */
  author?: string;
  /** Publish date (ISO 8601) */
  publishedAt?: string;
  seo: SeoMeta;
}

/** Webflow collection: How-Tos */
export interface HowTo extends PageContentBase {
  collectionType: "how-tos";
  title: string;
  headline: string;
  body: RichText;
  heroImage?: ImageAsset;
  author?: string;
  publishedAt?: string;
  seo: SeoMeta;
}

/** Webflow collection: Marketing Guides */
export interface MarketingGuide extends PageContentBase {
  collectionType: "marketing-guides";
  title: string;
  headline: string;
  body: RichText;
  heroImage?: ImageAsset;
  /** Company references in guide */
  companyRefs?: string[];
  publishedAt?: string;
  seo: SeoMeta;
}

/** Webflow collection: Marketing Guide Companies */
export interface MarketingGuideCompany {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
}

// ---------------------------------------------------------------------------
// Ebooks
// ---------------------------------------------------------------------------

/** Webflow collection: Ebook Categories */
export interface EbookCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/** Webflow collection: Ebooks */
export interface Ebook extends PageContentBase {
  collectionType: "ebooks";
  title: string;
  headline: string;
  description: string;
  /** Cover image */
  coverImage?: ImageAsset;
  /** PDF download URL */
  downloadUrl?: string;
  /** Gated (requires form submission) */
  gated: boolean;
  /** Category reference */
  categoryRef?: string;
  publishedAt?: string;
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Integrations
// ---------------------------------------------------------------------------

/** Webflow collection: Integration Types */
export interface IntegrationType {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/** Webflow collection: Integrations Tags */
export interface IntegrationTag {
  id: string;
  name: string;
  slug: string;
}

/** Webflow collection: Integrations */
export interface Integration extends PageContentBase {
  collectionType: "integrations";
  /** Integration name (e.g. "Google Business Profile") */
  name: string;
  /** Short description */
  description: string;
  /** Long-form body */
  body: RichText;
  /** Integration logo */
  logo?: ImageAsset;
  /** External integration URL */
  integrationUrl?: string;
  /** Type reference */
  typeRef?: string;
  /** Tag references */
  tagRefs?: string[];
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Videos
// ---------------------------------------------------------------------------

/** Webflow collection: Video Categories */
export interface VideoCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/** Webflow collection: Videos */
export interface Video extends PageContentBase {
  collectionType: "videos";
  title: string;
  /** Short description */
  description: string;
  /** YouTube/Vimeo embed URL */
  embedUrl: string;
  /** Thumbnail image */
  thumbnail?: ImageAsset;
  /** Duration (e.g. "3:45") */
  duration?: string;
  /** Category reference */
  categoryRef?: string;
  publishedAt?: string;
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

/** Webflow collection: Testimonials */
export interface Testimonial {
  id: string;
  /** Reviewer name */
  reviewerName: string;
  /** Reviewer title */
  reviewerTitle?: string;
  /** Company name */
  companyName?: string;
  /** Rating (1–5) */
  rating?: number;
  /** Review body (plain text — no HTML in testimonials) */
  body: string;
  /** Reviewer avatar image */
  avatar?: ImageAsset;
  /** Source platform (G2, Capterra, etc.) */
  source?: string;
}

/** Webflow collection: Testimonial Reviews */
export interface TestimonialReview {
  id: string;
  testimonialRef?: string;
  reviewerName: string;
  reviewerTitle?: string;
  companyName?: string;
  rating?: number;
  body: string;
  source?: string;
  publishedAt?: string;
}

/** Webflow collection: Testimonial Written reviews */
export interface TestimonialWrittenReview {
  id: string;
  reviewerName: string;
  reviewerTitle?: string;
  companyName?: string;
  body: string;
  source?: string;
}

// ---------------------------------------------------------------------------
// Press
// ---------------------------------------------------------------------------

/** Webflow collection: Presses */
export interface Press extends PageContentBase {
  collectionType: "presses";
  /** Publication name */
  publicationName: string;
  /** Article headline */
  headline: string;
  /** Short excerpt */
  excerpt?: string;
  /** External article URL */
  articleUrl: string;
  /** Publication logo */
  logo?: ImageAsset;
  /** Publish date */
  publishedAt?: string;
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

/** Webflow collection: Tools */
export interface Tool extends PageContentBase {
  collectionType: "tools";
  /** Tool name */
  name: string;
  /** Short description */
  description: string;
  /** Long-form body */
  body: RichText;
  /** Tool icon or screenshot */
  image?: ImageAsset;
  /** External tool URL (if applicable) */
  toolUrl?: string;
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Use Cases
// ---------------------------------------------------------------------------

/** Webflow collection: Use Case Categories */
export interface UseCaseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/** Webflow collection: Use Cases */
export interface UseCase extends PageContentBase {
  collectionType: "use-cases";
  title: string;
  headline: string;
  subheadline?: string;
  body: RichText;
  heroImage?: ImageAsset;
  /** Category reference */
  categoryRef?: string;
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Managed Services
// ---------------------------------------------------------------------------

/** Webflow collection: Managed services */
export interface ManagedService extends PageContentBase {
  collectionType: "managed-services";
  title: string;
  headline: string;
  subheadline?: string;
  body: RichText;
  heroImage?: ImageAsset;
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Pro Portals
// ---------------------------------------------------------------------------

/** Webflow collection: Pro Portals */
export interface ProPortal extends PageContentBase {
  collectionType: "pro-portals";
  title: string;
  headline: string;
  description: string;
  body: RichText;
  heroImage?: ImageAsset;
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Customer Logos
// ---------------------------------------------------------------------------

/** Webflow collection: Customer Logos */
export interface CustomerLogo {
  id: string;
  /** Company name */
  companyName: string;
  /** Logo image */
  logo: ImageAsset;
  /** Company website URL */
  websiteUrl?: string;
  /** Display order on logo strip */
  order?: number;
}

// ---------------------------------------------------------------------------
// Local Listings Management Clients
// ---------------------------------------------------------------------------

/** Webflow collection: Local Listings Management Clients */
export interface LocalListingsClient extends PageContentBase {
  collectionType: "local-listings-clients";
  /** Client company name */
  name: string;
  /** Short description */
  description: string;
  body: RichText;
  logo?: ImageAsset;
  seo: SeoMeta;
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
  /** Whether this link has a dropdown */
  hasDropdown?: boolean;
  children?: NavLink[];
}

export interface Navigation {
  locale: Locale;
  /** Top-level nav links */
  mainLinks: NavLink[];
  /** CTA button in nav */
  ctaLabel: string;
  ctaHref: string;
  /** Footer columns */
  footerColumns: FooterColumn[];
  /** Footer legal links */
  legalLinks: NavLink[];
  /** Copyright text */
  copyright: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

// ---------------------------------------------------------------------------
// Union type — all CMS collection types
// ---------------------------------------------------------------------------

export type AnyCollectionItem =
  | Competitor
  | Alternative
  | Alt
  | ComparePage
  | Comparison
  | CaseStudy
  | Learn
  | HowTo
  | MarketingGuide
  | Ebook
  | Integration
  | Video
  | Press
  | Tool
  | UseCase
  | ManagedService
  | ProPortal
  | LocalListingsClient;

// ---------------------------------------------------------------------------
// Content type registry — maps collection folder name to its type
// ---------------------------------------------------------------------------

export const COLLECTION_TYPES = [
  "competitors",
  "alternatives",
  "alts",
  "compare-pages",
  "compare-categories",
  "compare-table-categories",
  "comparison-table-categories",
  "comparison-table-rows",
  "comparisons",
  "comparison-sections",
  "competitor-sections",
  "competitor-rating-tables",
  "case-studies",
  "case-study-results",
  "learns",
  "how-tos",
  "marketing-guides",
  "marketing-guide-companies",
  "ebook-categories",
  "ebooks",
  "integration-types",
  "integration-tags",
  "integrations",
  "video-categories",
  "videos",
  "testimonials",
  "testimonial-reviews",
  "testimonial-written-reviews",
  "presses",
  "tools",
  "use-case-categories",
  "use-cases",
  "managed-services",
  "pro-portals",
  "customer-logos",
  "local-listings-clients",
] as const;

export type CollectionType = (typeof COLLECTION_TYPES)[number];
