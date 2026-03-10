/**
 * Redirect map for SEO parity with the old Webflow site.
 *
 * Every old URL that no longer maps 1:1 to a new route must have an entry here.
 * Populated by the SEO/QA agent from exports/redirects.xlsx and url-list.xlsx analysis.
 *
 * Rules:
 * - All permanent (301) redirects — use permanent: true
 * - No redirect chains (A→B→C) — all resolve directly to final destination
 * - No redirect loops
 * - External absolute URLs are allowed as destinations
 *
 * Sources:
 *   /exports/redirects.xlsx  — explicit redirect mappings from Webflow
 *   /exports/url-list.xlsx   — URL parity audit (missing routes → redirect to nearest equivalent)
 */

export interface RedirectEntry {
  /** Old URL path (supports Next.js path matching syntax with :param) */
  source: string;
  /** New URL path (absolute or relative) */
  destination: string;
  /** permanent: true = 308/301, false = 307/302 — always true for SEO parity */
  permanent: boolean;
}

export const redirectEntries: RedirectEntry[] = [
  /* ─────────────────────────────────────────────────────────────────────────
   * SOURCE: exports/redirects.xlsx
   * All 154 explicit redirect entries from Webflow's redirect configuration.
   * ───────────────────────────────────────────────────────────────────────── */

  // Product overview page consolidations
  { source: "/products/presence/overview", destination: "/products/presence", permanent: true },
  { source: "/products/reviews/overview", destination: "/products/reputation", permanent: true },
  { source: "/products/social/overview", destination: "/products/social", permanent: true },
  { source: "/products/agency-os/overview", destination: "/products/agency-os", permanent: true },

  // Contact page rename
  { source: "/contact-us", destination: "/contact", permanent: true },

  // Product moves / renames
  { source: "/products/presence/ai-listings", destination: "/products/ai-listings", permanent: true },
  { source: "/en/customer-stories", destination: "/en/resources/customer-success-story", permanent: true },
  { source: "/en/videos-rollup", destination: "/en/video", permanent: true },
  { source: "/en/products/sales-pipeline", destination: "/en/products/sales-management", permanent: true },
  { source: "/en/products/proposals-payments", destination: "/en/products/invoicing-payments", permanent: true },
  { source: "/en/products/presence/voice-search", destination: "/en/products/voice-search", permanent: true },
  { source: "/en/products/social/pricing-copy", destination: "/en/products/social/pricing", permanent: true },
  { source: "/en/products/invoicing-pay", destination: "/products/invoicing-payments", permanent: true },
  { source: "/en/products/invoicing", destination: "/products/invoicing-payments", permanent: true },
  { source: "/en/products/invoicing-old", destination: "/en/products/invoicing-payments", permanent: true },
  { source: "/en/invoicing-e-sign", destination: "/en/products/invoicing-e-sign", permanent: true },

  // Collection renames
  { source: "/en/use-cases-rollup", destination: "/en/use-case", permanent: true },
  { source: "/en/products/get-reviews", destination: "/en/get-reviews", permanent: true },

  // LP/misc moves
  { source: "/en/lps/local-business-directories", destination: "/en/misc/local-business-directories", permanent: true },

  // Alt/vendasta consolidation
  { source: "/en/alt/best-vendasta-alternative", destination: "/en/compare/vendasta-alternative", permanent: true },
  { source: "/alt/best-vendasta-alternative", destination: "/en/compare/vendasta-alternative", permanent: true },
  { source: "/de/alt/best-vendasta-alternative", destination: "/de/compare/vendasta-alternative", permanent: true },

  // Partner page rename
  { source: "/en/partner", destination: "/en/partners", permanent: true },

  // Removed/redirected competitor/compare pages
  {
    source: "/en/compare/singleinterface-alternative",
    destination: "https://www.synup.com/en",
    permanent: true,
  },
  {
    source: "/compare/singleinterface-alternative",
    destination: "https://www.synup.com",
    permanent: true,
  },

  // Ebook redirects (note: original xlsx has "www." prefix without https — correct here)
  { source: "/en/ebook", destination: "/en/ebooks", permanent: true },
  { source: "/ebook", destination: "/ebooks", permanent: true },

  // White label moves
  { source: "/en/white-label/lsa", destination: "/white-label/local-services-ads", permanent: true },
  { source: "/white-label/lsa", destination: "/white-label/local-services-ads", permanent: true },

  // Case study slug change
  {
    source: "/case-studies/a-case-study-on-how-marinara-pizza-increased-their-phone-calls-by-80-with-synup",
    destination: "/case-studies/marinara-pizza",
    permanent: true,
  },

  // How-to removed
  {
    source: "/en/how-to/top-10-google-maps-rank-checkers",
    destination: "https://synup.com",
    permanent: true,
  },

  // Guide moves
  { source: "/en/marketing-guide", destination: "/en/resources/marketing-guide", permanent: true },
  { source: "/en/state-of-ai-in-social-media", destination: "/en/ai-social-media-report", permanent: true },

  // Learn article consolidations
  {
    source: "/en/learn/top-whitelabel-reseller-programs-for-marketing-agencies",
    destination: "https://www.synup.com/",
    permanent: true,
  },
  { source: "/en/learn/introduction-to-local-listing-management-software", destination: "/en/learn/local-listing-management", permanent: true },
  { source: "/de/learn/introduction-to-local-listing-management-software", destination: "/de/learn/local-listing-management", permanent: true },
  { source: "/fr/learn/introduction-to-local-listing-management-software", destination: "/fr/learn/local-listing-management", permanent: true },
  { source: "/es/learn/introduction-to-local-listing-management-software", destination: "/es/learn/local-listing-management", permanent: true },

  // How-to-market slug change
  { source: "/en/how-to-market/home-health-care-business", destination: "/en/how-to-market/home-healthcare-business", permanent: true },
  { source: "/en/how-to-market/home-health-care-1", destination: "/en/how-to-market/home-healthcare-business", permanent: true },

  // Compare page rename
  { source: "/en/compare/synup-vs-gmbapi", destination: "/en/compare/gmb-api-alternative", permanent: true },

  // Competitors page consolidations
  { source: "/en/competitors/best-local-citation-management-tools", destination: "https://www.synup.com/en/competitors/top-whitelabel-local-listing-management-tools", permanent: true },
  { source: "/en/competitors/best-local-listings-management-tools", destination: "https://www.synup.com/en/competitors/top-whitelabel-local-listing-management-tools", permanent: true },
  { source: "/de/competitors/best-local-citation-management-tools", destination: "https://www.synup.com/de/competitors/top-whitelabel-local-listing-management-tools", permanent: true },
  { source: "/fr/competitors/best-local-citation-management-tools", destination: "https://www.synup.com/fr/competitors/top-whitelabel-local-listing-management-tools", permanent: true },
  { source: "/es/competitors/best-local-citation-management-tools", destination: "https://www.synup.com/es/competitors/top-whitelabel-local-listing-management-tools", permanent: true },
  { source: "/de/competitors/best-local-listings-management-tools", destination: "https://www.synup.com/de/competitors/top-whitelabel-local-listing-management-tools", permanent: true },
  { source: "/fr/competitors/best-local-listings-management-tools", destination: "https://www.synup.com/fr/competitors/top-whitelabel-local-listing-management-tools", permanent: true },
  { source: "/es/competitors/best-local-listings-management-tools", destination: "https://www.synup.com/es/competitors/top-whitelabel-local-listing-management-tools", permanent: true },

  // Learn → how-to-market redirects
  { source: "/en/learn/online-reputation-management-for-real-estate-agents", destination: "https://www.synup.com/en/how-to-market/real-estate-business", permanent: true },
  { source: "/de/learn/online-reputation-management-for-real-estate-agents", destination: "https://www.synup.com/de/how-to-market/real-estate-business", permanent: true },
  { source: "/fr/learn/online-reputation-management-for-real-estate-agents", destination: "https://www.synup.com/fr/how-to-market/real-estate-business", permanent: true },
  { source: "/es/learn/online-reputation-management-for-real-estate-agents", destination: "https://www.synup.com/es/how-to-market/real-estate-business", permanent: true },
  { source: "/en/learn/online-reputation-management-for-financial-advisors", destination: "https://www.synup.com/en/how-to-market/accountancy-business", permanent: true },
  { source: "/de/learn/online-reputation-management-for-financial-advisors", destination: "https://www.synup.com/de/how-to-market/accountancy-business", permanent: true },
  { source: "/fr/learn/online-reputation-management-for-financial-advisors", destination: "https://www.synup.com/fr/how-to-market/accountancy-business", permanent: true },
  { source: "/es/learn/online-reputation-management-for-financial-advisors", destination: "https://www.synup.com/es/how-to-market/accountancy-business", permanent: true },

  // How-to → learn redirects
  { source: "/en/how-to/generate-more-mortgage-reviews-on-lendingtree", destination: "https://www.synup.com/en/learn/online-review-management", permanent: true },
  { source: "/de/how-to/generate-more-mortgage-reviews-on-lendingtree", destination: "https://www.synup.com/de/learn/online-review-management", permanent: true },
  { source: "/fr/how-to/generate-more-mortgage-reviews-on-lendingtree", destination: "https://www.synup.com/fr/learn/online-review-management", permanent: true },
  { source: "/es/how-to/generate-more-mortgage-reviews-on-lendingtree", destination: "https://www.synup.com/es/learn/online-review-management", permanent: true },

  // Learn reputation management consolidations → online-review-management
  { source: "/en/learn/build-your-reputation-management-agency", destination: "https://www.synup.com/en/learn/online-review-management", permanent: true },
  { source: "/de/learn/build-your-reputation-management-agency", destination: "https://www.synup.com/de/learn/online-review-management", permanent: true },
  { source: "/fr/learn/build-your-reputation-management-agency", destination: "https://www.synup.com/fr/learn/online-review-management", permanent: true },
  { source: "/es/learn/build-your-reputation-management-agency", destination: "https://www.synup.com/es/learn/online-review-management", permanent: true },

  // Competitors review tools consolidation
  { source: "/en/competitors/best-review-monitoring-tools", destination: "https://www.synup.com/en/competitors/top-online-reputation-management-tools", permanent: true },
  { source: "/de/competitors/best-review-monitoring-tools", destination: "https://www.synup.com/de/competitors/top-online-reputation-management-tools", permanent: true },
  { source: "/fr/competitors/best-review-monitoring-tools", destination: "https://www.synup.com/fr/competitors/top-online-reputation-management-tools", permanent: true },
  { source: "/es/competitors/best-review-monitoring-tools", destination: "https://www.synup.com/es/competitors/top-online-reputation-management-tools", permanent: true },

  // Competitors ORM consolidation
  { source: "/en/competitors/online-reputation-management-software-for-agencies", destination: "https://www.synup.com/en/competitors/best-whitelabel-reputation-management-platform", permanent: true },
  { source: "/de/competitors/online-reputation-management-software-for-agencies", destination: "https://www.synup.com/de/competitors/best-whitelabel-reputation-management-platform", permanent: true },
  { source: "/fr/competitors/online-reputation-management-software-for-agencies", destination: "https://www.synup.com/fr/competitors/best-whitelabel-reputation-management-platform", permanent: true },
  { source: "/es/competitors/online-reputation-management-software-for-agencies", destination: "https://www.synup.com/es/competitors/best-whitelabel-reputation-management-platform", permanent: true },

  // Reputation management strategy articles → online-review-management
  { source: "/en/learn/reputation-management-strategies-for-agencies", destination: "https://www.synup.com/en/learn/online-review-management", permanent: true },
  { source: "/de/learn/reputation-management-strategies-for-agencies", destination: "https://www.synup.com/de/learn/online-review-management", permanent: true },
  { source: "/fr/learn/reputation-management-strategies-for-agencies", destination: "https://www.synup.com/fr/learn/online-review-management", permanent: true },
  { source: "/es/learn/reputation-management-strategies-for-agencies", destination: "https://www.synup.com/es/learn/online-review-management", permanent: true },

  // SMS review request → combined article
  { source: "/en/learn/how-to-request-reviews-via-sms", destination: "https://www.synup.com/en/learn/how-to-request-reviews-via-sms-and-email", permanent: true },
  { source: "/de/learn/how-to-request-reviews-via-sms", destination: "https://www.synup.com/de/learn/how-to-request-reviews-via-sms-and-email", permanent: true },
  { source: "/fr/learn/how-to-request-reviews-via-sms", destination: "https://www.synup.com/fr/learn/how-to-request-reviews-via-sms-and-email", permanent: true },
  { source: "/es/learn/how-to-request-reviews-via-sms", destination: "https://www.synup.com/es/learn/how-to-request-reviews-via-sms-and-email", permanent: true },
  { source: "/en/learn/how-to-request-reviews-via-email", destination: "https://www.synup.com/en/learn/how-to-request-reviews-via-sms-and-email", permanent: true },
  { source: "/de/learn/how-to-request-reviews-via-email", destination: "https://www.synup.com/de/learn/how-to-request-reviews-via-sms-and-email", permanent: true },
  { source: "/fr/learn/how-to-request-reviews-via-email", destination: "https://www.synup.com/fr/learn/how-to-request-reviews-via-sms-and-email", permanent: true },
  { source: "/es/learn/how-to-request-reviews-via-email", destination: "https://www.synup.com/es/learn/how-to-request-reviews-via-sms-and-email", permanent: true },

  // How-to embed reviews → use-case page
  { source: "/en/how-to/embed-google-reviews-on-website-for-social-proof", destination: "https://www.synup.com/en/use-case/review-widgets-to-collect-and-promote-customer-reviews", permanent: true },
  { source: "/de/how-to/embed-google-reviews-on-website-for-social-proof", destination: "https://www.synup.com/de/use-case/review-widgets-to-collect-and-promote-customer-reviews", permanent: true },
  { source: "/fr/how-to/embed-google-reviews-on-website-for-social-proof", destination: "https://www.synup.com/fr/use-case/review-widgets-to-collect-and-promote-customer-reviews", permanent: true },
  { source: "/es/how-to/embed-google-reviews-on-website-for-social-proof", destination: "https://www.synup.com/es/use-case/review-widgets-to-collect-and-promote-customer-reviews", permanent: true },

  // ReviewTrackers alternatives → compare
  { source: "/en/competitors/reviewtrackers-alternatives", destination: "https://www.synup.com/en/compare", permanent: true },
  { source: "/de/competitors/reviewtrackers-alternatives", destination: "https://www.synup.com/de/compare", permanent: true },
  { source: "/fr/competitors/reviewtrackers-alternatives", destination: "https://www.synup.com/fr/compare", permanent: true },
  { source: "/es/competitors/reviewtrackers-alternatives", destination: "https://www.synup.com/es/compare", permanent: true },

  // Learn automate/guide consolidations → online-review-management
  { source: "/en/learn/automate-google-reviews-for-local-businesses", destination: "https://www.synup.com/en/learn/online-review-management", permanent: true },
  { source: "/en/learn/guide-reputation-marketing-customer-reviews", destination: "https://www.synup.com/en/learn/online-review-management", permanent: true },
  { source: "/de/learn/guide-reputation-marketing-customer-reviews", destination: "https://www.synup.com/de/learn/online-review-management", permanent: true },
  { source: "/fr/learn/guide-reputation-marketing-customer-reviews", destination: "https://www.synup.com/fr/learn/online-review-management", permanent: true },
  { source: "/es/learn/guide-reputation-marketing-customer-reviews", destination: "https://www.synup.com/es/learn/online-review-management", permanent: true },
  { source: "/en/learn/guide-whitelabel-reputation-management", destination: "https://www.synup.com/en/learn/online-review-management", permanent: true },
  { source: "/de/learn/guide-whitelabel-reputation-management", destination: "https://www.synup.com/de/learn/online-review-management", permanent: true },
  { source: "/fr/learn/guide-whitelabel-reputation-management", destination: "https://www.synup.com/fr/learn/online-review-management", permanent: true },
  { source: "/es/learn/guide-whitelabel-reputation-management", destination: "https://www.synup.com/es/learn/online-review-management", permanent: true },

  // Social media management tools → competitors page
  { source: "/en/learn/best-social-media-management-tools-paid-free", destination: "https://www.synup.com/en/competitors/best-social-media-management-tools", permanent: true },
  { source: "/de/learn/best-social-media-management-tools-paid-free", destination: "https://www.synup.com/de/competitors/best-social-media-management-tools", permanent: true },
  { source: "/fr/learn/best-social-media-management-tools-paid-free", destination: "https://www.synup.com/fr/competitors/best-social-media-management-tools", permanent: true },
  { source: "/es/learn/best-social-media-management-tools-paid-free", destination: "https://www.synup.com/es/competitors/best-social-media-management-tools", permanent: true },

  // White label products → explore-apps
  { source: "/en/competitors/top-white-label-products-to-sell", destination: "https://www.synup.com/en/explore-apps", permanent: true },
  { source: "/de/competitors/top-white-label-products-to-sell", destination: "https://www.synup.com/de/explore-apps", permanent: true },
  { source: "/fr/competitors/top-white-label-products-to-sell", destination: "https://www.synup.com/fr/explore-apps", permanent: true },
  { source: "/es/competitors/top-white-label-products-to-sell", destination: "https://www.synup.com/es/explore-apps", permanent: true },

  // Listing management article consolidations
  { source: "/en/learn/claim-and-verify-local-listings", destination: "https://www.synup.com/en/learn/local-listing-management", permanent: true },
  { source: "/de/learn/claim-and-verify-local-listings", destination: "https://www.synup.com/de/learn/local-listing-management", permanent: true },
  { source: "/fr/learn/claim-and-verify-local-listings", destination: "https://www.synup.com/fr/learn/local-listing-management", permanent: true },
  { source: "/es/learn/claim-and-verify-local-listings", destination: "https://www.synup.com/es/learn/local-listing-management", permanent: true },
  { source: "/en/learn/attract-and-engage-local-customers-with-listings", destination: "https://www.synup.com/en/learn/local-listing-management", permanent: true },
  { source: "/de/learn/attract-and-engage-local-customers-with-listings", destination: "https://www.synup.com/de/learn/local-listing-management", permanent: true },
  { source: "/fr/learn/attract-and-engage-local-customers-with-listings", destination: "https://www.synup.com/fr/learn/local-listing-management", permanent: true },
  { source: "/es/learn/attract-and-engage-local-customers-with-listings", destination: "https://www.synup.com/es/learn/local-listing-management", permanent: true },
  { source: "/en/learn/data-accuracy-and-consistency-in-local-listings", destination: "https://www.synup.com/en/learn/local-listing-management", permanent: true },
  { source: "/de/learn/data-accuracy-and-consistency-in-local-listings", destination: "https://www.synup.com/de/learn/local-listing-management", permanent: true },
  { source: "/fr/learn/data-accuracy-and-consistency-in-local-listings", destination: "https://www.synup.com/fr/learn/local-listing-management", permanent: true },
  { source: "/es/learn/data-accuracy-and-consistency-in-local-listings", destination: "https://www.synup.com/es/learn/local-listing-management", permanent: true },

  // Learn → synpost.synup.com (external blog)
  { source: "/en/learn/white-label-local-seo-services", destination: "https://synpost.synup.com/white-label-local-seo-services/", permanent: true },
  { source: "/de/learn/white-label-local-seo-services", destination: "https://synpost.synup.com/white-label-local-seo-services/", permanent: true },
  { source: "/fr/learn/white-label-local-seo-services", destination: "https://synpost.synup.com/white-label-local-seo-services/", permanent: true },
  { source: "/es/learn/white-label-local-seo-services", destination: "https://synpost.synup.com/white-label-local-seo-services/", permanent: true },
  { source: "/en/learn/the-impact-of-inaccurate-local-listings-on-your-business", destination: "https://synpost.synup.com/the-impact-of-inaccurate-local-listings-on-your-business/", permanent: true },
  { source: "/de/learn/the-impact-of-inaccurate-local-listings-on-your-business", destination: "https://synpost.synup.com/the-impact-of-inaccurate-local-listings-on-your-business/", permanent: true },
  { source: "/fr/learn/the-impact-of-inaccurate-local-listings-on-your-business", destination: "https://synpost.synup.com/the-impact-of-inaccurate-local-listings-on-your-business/", permanent: true },
  { source: "/es/learn/the-impact-of-inaccurate-local-listings-on-your-business", destination: "https://synpost.synup.com/the-impact-of-inaccurate-local-listings-on-your-business/", permanent: true },
  { source: "/en/learn/online-reputation-management-for-restaurants", destination: "https://synpost.synup.com/online-reputation-management-for-restaurants/", permanent: true },
  { source: "/de/learn/online-reputation-management-for-restaurants", destination: "https://synpost.synup.com/online-reputation-management-for-restaurants/", permanent: true },
  { source: "/fr/learn/online-reputation-management-for-restaurants", destination: "https://synpost.synup.com/online-reputation-management-for-restaurants/", permanent: true },
  { source: "/es/learn/online-reputation-management-for-restaurants", destination: "https://synpost.synup.com/online-reputation-management-for-restaurants/", permanent: true },
  { source: "/en/learn/examples-of-online-reputation-management-done-right", destination: "https://synpost.synup.com/examples-of-online-reputation-management/", permanent: true },
  { source: "/de/learn/examples-of-online-reputation-management-done-right", destination: "https://synpost.synup.com/examples-of-online-reputation-management/", permanent: true },
  { source: "/es/learn/examples-of-online-reputation-management-done-right", destination: "https://synpost.synup.com/examples-of-online-reputation-management/", permanent: true },
  { source: "/fr/learn/examples-of-online-reputation-management-done-right", destination: "https://synpost.synup.com/examples-of-online-reputation-management/", permanent: true },

  // Competitors review response tools → ORM tools
  { source: "/en/competitors/top-tools-for-review-responses", destination: "https://www.synup.com/en/competitors/top-online-reputation-management-tools", permanent: true },
  { source: "/de/competitors/top-tools-for-review-responses", destination: "https://www.synup.com/de/competitors/top-online-reputation-management-tools", permanent: true },
  { source: "/fr/competitors/top-tools-for-review-responses", destination: "https://www.synup.com/fr/competitors/top-online-reputation-management-tools", permanent: true },
  { source: "/es/competitors/top-tools-for-review-responses", destination: "https://www.synup.com/es/competitors/top-online-reputation-management-tools", permanent: true },

  // Standee link
  { source: "/en/standee-link", destination: "https://www.synup.com", permanent: true },

  // Old HTML guide
  { source: "/local-seo-guides/handling-negative-reviews.html", destination: "https://www.synup.com/en/learn/local-seo", permanent: true },

  // Google Maps how-to with path param
  { source: "/en/how-to/add-address-to-google-maps/business.google.com", destination: "/en/how-to/add-address-to-google-maps", permanent: true },

  // Use-case → product redirects
  { source: "/en/use-case/review-widgets-to-collect-and-promote-customer-reviews", destination: "/en/products/reputation", permanent: true },
  { source: "/de/use-case/review-widgets-to-collect-and-promote-customer-reviews", destination: "/de/products/reputation", permanent: true },
  { source: "/fr/use-case/review-widgets-to-collect-and-promote-customer-reviews", destination: "/fr/products/reputation", permanent: true },
  { source: "/es/use-case/review-widgets-to-collect-and-promote-customer-reviews", destination: "/es/products/reputation", permanent: true },

  // Social media redirect
  { source: "/en/social-media", destination: "/white-label/social-media", permanent: true },

  // Learn how-to client acquisition redirects
  { source: "/en/learn/how-to-get-clients-for-online-reputation-management", destination: "https://www.synup.com/en/learn/lead-generation-strategies-for-agencies", permanent: true },
  { source: "/de/learn/how-to-get-clients-for-online-reputation-management", destination: "https://www.synup.com/de/learn/lead-generation-strategies-for-agencies", permanent: true },
  { source: "/fr/learn/how-to-get-clients-for-online-reputation-management", destination: "https://www.synup.com/fr/learn/lead-generation-strategies-for-agencies", permanent: true },
  { source: "/es/learn/how-to-get-clients-for-online-reputation-management", destination: "https://www.synup.com/es/learn/lead-generation-strategies-for-agencies", permanent: true },

  /* ─────────────────────────────────────────────────────────────────────────
   * SOURCE: URL parity audit — Missing URLs from url-list.xlsx
   * These URLs have 200 OK status in Webflow but no matching Next.js route.
   * Redirected to nearest equivalent.
   * ───────────────────────────────────────────────────────────────────────── */

  // /en/ai-social-media-report → correct Next.js path is /en/ai/ai-social-media-report
  { source: "/en/ai-social-media-report", destination: "/en/ai/ai-social-media-report", permanent: true },
  { source: "/de/ai-social-media-report", destination: "/de/ai/ai-social-media-report", permanent: true },
  { source: "/fr/ai-social-media-report", destination: "/fr/ai/ai-social-media-report", permanent: true },
  { source: "/es/ai-social-media-report", destination: "/es/ai/ai-social-media-report", permanent: true },

  // /videos/* (plural, legacy) → /video/* (singular — matches Webflow URLs)
  { source: "/en/videos/:slug", destination: "/en/video/:slug", permanent: true },
  { source: "/de/videos/:slug", destination: "/de/video/:slug", permanent: true },
  { source: "/fr/videos/:slug", destination: "/fr/video/:slug", permanent: true },
  { source: "/es/videos/:slug", destination: "/es/video/:slug", permanent: true },

  // Products not in PRODUCT_SLUGS → redirect to nearest product or products home
  // NOTE: Page Builder did not build pages for these product slugs.
  // Products with full Webflow pages that need Pages built OR redirect:
  { source: "/en/products/ai-listings", destination: "/en/ai/ai-listings", permanent: true },
  { source: "/de/products/ai-listings", destination: "/de/ai/ai-listings", permanent: true },
  { source: "/fr/products/ai-listings", destination: "/fr/ai/ai-listings", permanent: true },
  { source: "/es/products/ai-listings", destination: "/es/ai/ai-listings", permanent: true },

  { source: "/en/products/campaigns", destination: "/en/products/presence", permanent: true },
  { source: "/de/products/campaigns", destination: "/de/products/presence", permanent: true },
  { source: "/fr/products/campaigns", destination: "/fr/products/presence", permanent: true },
  { source: "/es/products/campaigns", destination: "/es/products/presence", permanent: true },

  { source: "/en/products/content", destination: "/en/products/social", permanent: true },
  { source: "/de/products/content", destination: "/de/products/social", permanent: true },
  { source: "/fr/products/content", destination: "/fr/products/social", permanent: true },
  { source: "/es/products/content", destination: "/es/products/social", permanent: true },

  { source: "/en/products/insights", destination: "/en/products/presence/analytics", permanent: true },
  { source: "/de/products/insights", destination: "/de/products/presence/analytics", permanent: true },
  { source: "/fr/products/insights", destination: "/fr/products/presence/analytics", permanent: true },
  { source: "/es/products/insights", destination: "/es/products/presence/analytics", permanent: true },

  { source: "/en/products/invoicing-payments", destination: "/en/products/invoicing-e-sign", permanent: true },
  { source: "/de/products/invoicing-payments", destination: "/de/products/invoicing-e-sign", permanent: true },
  { source: "/fr/products/invoicing-payments", destination: "/fr/products/invoicing-e-sign", permanent: true },
  { source: "/es/products/invoicing-payments", destination: "/es/products/invoicing-e-sign", permanent: true },

  { source: "/en/products/new-scan-tool", destination: "/en/get-reviews", permanent: true },
  { source: "/de/products/new-scan-tool", destination: "/de/get-reviews", permanent: true },
  { source: "/fr/products/new-scan-tool", destination: "/fr/get-reviews", permanent: true },
  { source: "/es/products/new-scan-tool", destination: "/es/get-reviews", permanent: true },

  { source: "/en/products/sales-management", destination: "/en/products/crm", permanent: true },
  { source: "/de/products/sales-management", destination: "/de/products/crm", permanent: true },
  { source: "/fr/products/sales-management", destination: "/fr/products/crm", permanent: true },
  { source: "/es/products/sales-management", destination: "/es/products/crm", permanent: true },

  { source: "/en/products/tasks-activities", destination: "/en/products/agency-os", permanent: true },
  { source: "/de/products/tasks-activities", destination: "/de/products/agency-os", permanent: true },
  { source: "/fr/products/tasks-activities", destination: "/fr/products/agency-os", permanent: true },
  { source: "/es/products/tasks-activities", destination: "/es/products/agency-os", permanent: true },

  { source: "/en/products/voice-search", destination: "/en/products/presence", permanent: true },
  { source: "/de/products/voice-search", destination: "/de/products/presence", permanent: true },
  { source: "/fr/products/voice-search", destination: "/fr/products/presence", permanent: true },
  { source: "/es/products/voice-search", destination: "/es/products/presence", permanent: true },

  // /resources/customer-success-story → /case-studies
  { source: "/en/resources/customer-success-story", destination: "/en/case-studies", permanent: true },
  { source: "/de/resources/customer-success-story", destination: "/de/case-studies", permanent: true },
  { source: "/fr/resources/customer-success-story", destination: "/fr/case-studies", permanent: true },
  { source: "/es/resources/customer-success-story", destination: "/es/case-studies", permanent: true },

  // /why-synup slug mismatches
  // contract-buy-outs (Webflow) → contract-buyouts (Next.js built)
  { source: "/en/why-synup/contract-buy-outs", destination: "/en/why-synup/contract-buyouts", permanent: true },
  { source: "/de/why-synup/contract-buy-outs", destination: "/de/why-synup/contract-buyouts", permanent: true },
  { source: "/fr/why-synup/contract-buy-outs", destination: "/fr/why-synup/contract-buyouts", permanent: true },
  { source: "/es/why-synup/contract-buy-outs", destination: "/es/why-synup/contract-buyouts", permanent: true },

  // why-synup slugs not in WHY_SYNUP_PAGES (ai-enabled, case-studies, wall-of-love)
  // LAUNCH-BLOCKING: These pages exist on Webflow but have no matching Next.js route.
  // Redirect to why-synup parent as a safe fallback until pages are built.
  // TODO: Page Builder should build pages for these 3 slugs.
  { source: "/en/why-synup/ai-enabled", destination: "/en/why-synup/ai-driven-tools", permanent: true },
  { source: "/de/why-synup/ai-enabled", destination: "/de/why-synup/ai-driven-tools", permanent: true },
  { source: "/fr/why-synup/ai-enabled", destination: "/fr/why-synup/ai-driven-tools", permanent: true },
  { source: "/es/why-synup/ai-enabled", destination: "/es/why-synup/ai-driven-tools", permanent: true },
  { source: "/en/why-synup/case-studies", destination: "/en/case-studies", permanent: true },
  { source: "/de/why-synup/case-studies", destination: "/de/case-studies", permanent: true },
  { source: "/fr/why-synup/case-studies", destination: "/fr/case-studies", permanent: true },
  { source: "/es/why-synup/case-studies", destination: "/es/case-studies", permanent: true },
  { source: "/en/why-synup/wall-of-love", destination: "/en/testimonials", permanent: true },
  { source: "/de/why-synup/wall-of-love", destination: "/de/testimonials", permanent: true },
  { source: "/fr/why-synup/wall-of-love", destination: "/fr/testimonials", permanent: true },
  { source: "/es/why-synup/wall-of-love", destination: "/es/testimonials", permanent: true },

  // /how-to-market/restaurant-marketing — shell page exists but no subpage route
  // Redirect to the how-to-market parent shell page
  // TODO: Page Builder should add subpage routing for /how-to-market/[slug]
  { source: "/en/how-to-market/restaurant-marketing", destination: "/en/how-to-market", permanent: true },
  { source: "/de/how-to-market/restaurant-marketing", destination: "/de/how-to-market", permanent: true },
  { source: "/fr/how-to-market/restaurant-marketing", destination: "/fr/how-to-market", permanent: true },
  { source: "/es/how-to-market/restaurant-marketing", destination: "/es/how-to-market", permanent: true },

  // /managed-services/* subpages — shell page exists but no subpage route
  { source: "/en/managed-services/google-business-profile-post", destination: "/en/managed-services", permanent: true },
  { source: "/de/managed-services/google-business-profile-post", destination: "/de/managed-services", permanent: true },
  { source: "/fr/managed-services/google-business-profile-post", destination: "/fr/managed-services", permanent: true },
  { source: "/es/managed-services/google-business-profile-post", destination: "/es/managed-services", permanent: true },
  { source: "/en/managed-services/review-management", destination: "/en/managed-services", permanent: true },
  { source: "/de/managed-services/review-management", destination: "/de/managed-services", permanent: true },
  { source: "/fr/managed-services/review-management", destination: "/fr/managed-services", permanent: true },
  { source: "/es/managed-services/review-management", destination: "/es/managed-services", permanent: true },
  { source: "/en/managed-services/social-media-post", destination: "/en/managed-services", permanent: true },
  { source: "/de/managed-services/social-media-post", destination: "/de/managed-services", permanent: true },
  { source: "/fr/managed-services/social-media-post", destination: "/fr/managed-services", permanent: true },
  { source: "/es/managed-services/social-media-post", destination: "/es/managed-services", permanent: true },

  // /misc/* — no /misc/ route in Next.js
  { source: "/en/misc/review-response-templates", destination: "/en/learn/google-review-reply-templates", permanent: true },
  { source: "/de/misc/review-response-templates", destination: "/de/learn/google-review-reply-templates", permanent: true },
  { source: "/fr/misc/review-response-templates", destination: "/fr/learn/google-review-reply-templates", permanent: true },
  { source: "/es/misc/review-response-templates", destination: "/es/learn/google-review-reply-templates", permanent: true },

  /* ─────────────────────────────────────────────────────────────────────────
   * Locale-less → locale-prefixed (for legacy links without locale)
   * ───────────────────────────────────────────────────────────────────────── */
  { source: "/about", destination: "/en/about", permanent: true },
  { source: "/pricing", destination: "/en/pricing", permanent: true },
  { source: "/contact", destination: "/en/contact", permanent: true },
  { source: "/careers", destination: "/en/careers", permanent: true },
  { source: "/partners", destination: "/en/partners", permanent: true },
  { source: "/book-a-demo", destination: "/en/book-a-demo", permanent: true },
  { source: "/solutions/:slug", destination: "/en/solutions/:slug", permanent: true },
  { source: "/integrations/:slug", destination: "/en/integrations/:slug", permanent: true },
  { source: "/case-studies/:slug", destination: "/en/case-studies/:slug", permanent: true },
  { source: "/learn/:slug", destination: "/en/learn/:slug", permanent: true },
  { source: "/how-to/:slug", destination: "/en/how-to/:slug", permanent: true },
  { source: "/compare/:slug", destination: "/en/compare/:slug", permanent: true },
  { source: "/competitors/:slug", destination: "/en/competitors/:slug", permanent: true },
  { source: "/white-label/:slug", destination: "/en/white-label/:slug", permanent: true },
  { source: "/why-synup/:slug", destination: "/en/why-synup/:slug", permanent: true },
  { source: "/use-case/:slug", destination: "/en/use-case/:slug", permanent: true },
  { source: "/tools/:slug", destination: "/en/tools/:slug", permanent: true },
  { source: "/ebooks/:slug", destination: "/en/ebooks/:slug", permanent: true },
  { source: "/videos/:slug", destination: "/en/video/:slug", permanent: true },
  { source: "/products/:slug", destination: "/en/products/:slug", permanent: true },
];
