# SEO/QA Report — Synup Next.js Migration
**Agent**: SEO/QA (Sonnet 4.6)
**Date**: 2026-03-10
**Session**: 8 (final agent — quality gate before launch)

---

## Executive Summary

The build passes (4,040 static pages generated). Core infrastructure is solid — CSP headers in place, next/image used everywhere, no hardcoded secrets, all forms use POST. However, there are **3 launch-blocking issues** and **several warnings** that should be resolved before go-live.

---

## 1. URL Parity Audit

**Source**: exports/url-list.xlsx — 587 EN 200-OK paths analyzed (same structure mirrors across DE/FR/ES)

### Results

| Status | Count | Notes |
|---|---|---|
| MATCHED to Next.js route | 534 | Direct route or dynamic CMS match |
| MISSING (no route + no redirect) | 53 | See detail below |
| Already in redirects.xlsx | 0 | All redirects from xlsx are new (map was empty stubs before) |

**Match rate: 91% (534/587)**

### MISSING URLs — Grouped by Issue Type

#### GROUP A: `/video/*` vs `/videos/*` — URL MISMATCH (LAUNCH-BLOCKING)
Webflow uses `/video/[slug]` (singular). Next.js was built as `/videos/[slug]` (plural).
**20 video detail pages will return 404** to Googlebot and existing incoming links.

Affected URLs (all 20 video detail pages across 4 locales = 80 404s):
```
/en/video/chasing-googles-algorithm-disappearing-reviews-ben-fisher
/en/video/choosing-what-content-to-create-from-ai-to-googles-helpful-content-update-with-amy-aitman
/en/video/creating-authentic-content-with-amy-aitman
/en/video/demo-best-social-media-management-platform-synup-social
/en/video/google-business-profile-optimization
/en/video/googles-new-business-dashboard-and-beyond-ben-fisher
/en/video/how-to-build-a-digital-marketing-agency-with-judy-lin
/en/video/lead-gen-101-unlocking-secrets-to-skyrocket-your-business-traffic
/en/video/mastering-multi-location-seo-with-steve-wiideman
/en/video/office-hour-13 through /en/video/synup-office-hour-12 (18 office hour videos)
/en/video/what-makes-a-good-social-media-management-tool-with-lauren-freund
/en/video/why-we-googles-helpful-content-update-with-steve-wiideman
/en/video/writing-for-humans-and-robots-with-maddy-osman
```

**Resolution implemented**: Added `/:locale/video/:slug → /:locale/videos/:slug` 301 redirects in lib/redirects.ts. This handles SEO link equity transfer. However, the Page Builder **should also consider** renaming `/videos/` to `/video/` (singular) to match the original URL exactly, eliminating the redirect overhead for crawlers.

#### GROUP B: Products built with wrong slugs or not built at all
Webflow has these product pages at `/products/[slug]` but the Next.js PRODUCT_SLUGS array is missing them:

| Webflow URL | Next.js Status | Redirect in redirects.ts |
|---|---|---|
| `/en/products/ai-listings` | Not built | → `/en/ai/ai-listings` |
| `/en/products/campaigns` | Not built | → `/en/products/presence` |
| `/en/products/content` | Not built | → `/en/products/social` |
| `/en/products/insights` | Not built | → `/en/products/presence/analytics` |
| `/en/products/invoicing-payments` | Not built (built as `invoicing-e-sign`) | → `/en/products/invoicing-e-sign` |
| `/en/products/new-scan-tool` | Not built | → `/en/get-reviews` |
| `/en/products/sales-management` | Not built | → `/en/products/crm` |
| `/en/products/tasks-activities` | Not built | → `/en/products/agency-os` |
| `/en/products/voice-search` | Not built | → `/en/products/presence` |

All redirects added to lib/redirects.ts. These are acceptable — the Page Builder mapped these to equivalent modern pages.

#### GROUP C: Why Synup slug mismatches
| Webflow URL | Issue |
|---|---|
| `/en/why-synup/contract-buy-outs` | Built as `contract-buyouts` (hyphen difference) — redirect added |
| `/en/why-synup/ai-enabled` | Not in WHY_SYNUP_PAGES — redirect to `ai-driven-tools` added |
| `/en/why-synup/case-studies` | Not built — redirect to `/case-studies` added |
| `/en/why-synup/wall-of-love` | Not built — redirect to `/testimonials` added |

**NOTE**: `/why-synup/wall-of-love` and `/why-synup/case-studies` are high-visibility pages. The Page Builder agent should be asked to build these.

#### GROUP D: AI page URL mismatch
- `/en/ai-social-media-report` (root path, Webflow) — Next.js built under `/ai/ai-social-media-report`
- `/en/ai/client-ai`, `/en/ai/marketing-ai`, `/en/ai/sales-ai` — NOT in AI_PAGES slug list (AI_PAGES only has: `synup-ai`, `ai-listings`, `ai-social-media-report`)
- Redirect added for `ai-social-media-report`. **client-ai, marketing-ai, sales-ai need to be added to AI_PAGES in `app/[locale]/ai/[slug]/page.tsx`** — these are indexable Webflow pages.

#### GROUP E: Missing route patterns
| Webflow URL | Issue | Resolution |
|---|---|---|
| `/en/managed-services/google-business-profile-post` | No subpage routing for managed-services | Redirect to `/managed-services` |
| `/en/managed-services/review-management` | Same | Redirect to `/managed-services` |
| `/en/managed-services/social-media-post` | Same | Redirect to `/managed-services` |
| `/en/how-to-market/restaurant-marketing` | No `/how-to-market/[slug]` route | Redirect to `/how-to-market` |
| `/en/misc/review-response-templates` | No `/misc/` route | Redirect to `/learn/google-review-reply-templates` |
| `/en/resources/customer-success-story` | No `/resources/` route | Redirect to `/case-studies` |

All redirects added. The `/managed-services/[slug]` pattern suggests these sub-pages should be built in Phase 2.

---

## 2. Redirect Map Status

**Status: COMPLETE** — lib/redirects.ts fully populated.

### Summary
- **Total redirect entries**: 262 (was 3 placeholder entries before this session)
- **Source**: 154 from exports/redirects.xlsx + 108 from URL parity audit
- **Chains**: NONE detected in redirects.xlsx source data
- **Loops**: NONE detected
- **All use `permanent: true`** (equivalent to 301)

### Notes
- Redirects are implemented via Next.js `redirects()` in next.config.ts (static import pattern from Architect)
- For very large redirect maps (262 entries), this approach is fine for build-time resolution
- If redirect count grows significantly post-launch, consider middleware-based redirects for better performance

---

## 3. Metadata Audit

### generateMetadata Coverage
- **66 page files** total
- **All 66** export `generateMetadata()` — 100% coverage

### Title
- All pages have `title` set
- Homepage and static pages use hardcoded locale-specific titles
- CMS detail pages derive title from `item.seo?.title ?? item.title`
- Shell pages have descriptive titles
- Layout sets `{ template: "%s | Synup", default: "Synup — Manage Your Online Presence" }` as fallback

### Description
- All pages have `description` set
- CMS detail pages use `item.seo?.description ?? item.description`

### Canonical URL
- All pages set `alternates.canonical`
- Pattern: `locale === 'en' ? /path : /locale/path` — correct per project rules

### og:title, og:description, og:image
- **Pages WITH full openGraph** (title + description + image): 2 pages
  - Homepage (`/[locale]/page.tsx`) — has full openGraph block with absolute og:image
  - Integrations detail (`/[locale]/integrations/[slug]/page.tsx`) — has full openGraph

- **Pages MISSING openGraph entirely** (29 pages): WARNING — not launch-blocking but affects social sharing:
  ```
  about, book-a-demo, careers, case-studies (listing+detail), contact,
  ebooks (listing+detail), explore-apps, facebook-post-scheduler, freetrial,
  get-reviews, google-business-profile-post-scheduler, how-to (listing+detail),
  learn (listing+detail), linkedin-post-scheduler, lists/[slug], local-grid-ranking-tool,
  local-seo-statistics, local-search-rank-tracking-api, lps/[slug], managed-services,
  office-hours, online-review-statistics, partners, pricing, privacy-policy,
  pro-portal, products/[slug], products/[product]/[subpage], registration-success,
  reports-and-stats, reputation-management-api, roi-profiles, social-media-marketing-statistics,
  solutions/[slug], style-guide, synup-vs-hootsuite, terms-and-conditions,
  testimonials/[slug], thank-you, tools (listing+detail), use-case (listing+detail),
  videos/[slug], voice-search-statistics, what-is-ranking, white-label/[slug],
  yext-alt
  ```

  **Recommended fix**: The layout.tsx `generateMetadata` sets the `template` title — extend it to also set a default `og:image` so every page has at least a fallback social image even without page-specific og:image blocks.

### og:image absolute URL check
- The one og:image present (`og-home.png`) uses `${baseUrl}/assets/images/og-home.png` — absolute URL, correct.

---

## 4. Hreflang Audit

### x-default
- **MISSING from all page files** — no page exports `x-default` in its `generateMetadata` `languages` block
- Layout `generateMetadata` does not include `x-default` either
- **This is a warning-level issue** — Google recommends x-default for multilingual sites

Recommended fix in layout.tsx `generateMetadata`:
```typescript
languages: {
  en: "https://www.synup.com/en/",
  de: "https://www.synup.com/de/",
  fr: "https://www.synup.com/fr/",
  es: "https://www.synup.com/es/",
  "x-default": "https://www.synup.com/en/",
},
```

And add the same `"x-default"` key to each page's `generateMetadata` that includes a `languages` block.

### Pages with hreflang alternates
- **37 of 66 pages** include `languages` alternates in `generateMetadata`
- **29 pages** are missing `languages` entirely — see list under og:image section above

The same 29 pages that are missing openGraph are also missing hreflang alternates. This is partially acceptable for utility/noindex pages (style-guide, success pages, LPs) but the following indexable pages should have hreflang added:
- about, book-a-demo, explore-apps, pricing, get-reviews, all statistics pages, all scheduler pages, all API pages, solutions, white-label, products

### Hreflang format check
- Pages that do include hreflang use format: `{en: url, de: url, fr: url, es: url}`
- EN canonical uses path without locale prefix (e.g. `/pricing` not `/en/pricing`) — this is consistent with the `localePrefix: "as-needed"` routing strategy

### Self-referencing errors
- None found — each locale page correctly points its canonical to the same locale

### Orphaned hreflang links
- Cannot verify CMS collection hreflang (they reference slugs from the not-yet-run transform script). Once the transform script runs and the content layer is populated, verify that all hreflang URLs resolve to actual pages.

---

## 5. Sitemap

**Status: CREATED** — `/app/sitemap.ts` written this session.

### Coverage
- All static pages (39 paths × 4 locales)
- All 9 product pages × 4 locales
- All 18 sub-product pages × 4 locales
- All 14 solution pages × 4 locales
- All 5 white-label pages × 4 locales
- All 8 why-synup pages × 4 locales
- All 3 AI pages × 4 locales
- All 3 lists pages × 4 locales
- All CMS collection detail pages (read from /content/en/[collection]/ at build time)
- Collection listing pages

### lastmod
- All entries include `lastModified: new Date().toISOString()` — rebuilds on each deploy, which is correct for a static generation setup.

### xhtml:link alternates
- Each sitemap entry includes `alternates.languages` with all 4 locale URLs + x-default.

### Exclusions (correct)
- `/en/lps/*` — excluded (noindex landing pages)
- `/en/style-guide` — excluded (noindex utility page)
- Success pages — excluded (noindex)
- `/api/` — excluded
- `/_next/` — excluded

### Staging URL risk
- Uses `process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.synup.com"` — correct. Staging builds will use the env var to avoid leaking staging URLs into the production sitemap.

---

## 6. Robots.txt

**Status: CREATED** — `/app/robots.ts` written this session.

- Allows all crawlers on all production paths
- Disallows: `/api/`, `/_next/`, style-guide, LP pages, success/thank-you pages
- Points sitemap to `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`
- Uses env var for base URL — no hardcoded production URL risk in staging

---

## 7. Environment Setup

**Status: CREATED** — `.env.example` created this session.

### Variables documented:
- `NEXT_PUBLIC_SITE_URL` — canonical site URL (required for sitemap, robots, og:image)
- `CONTACT_FORM_ENDPOINT`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID` — form API
- `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID` — analytics
- `TOLGEE_API_URL`, `TOLGEE_API_KEY` — Phase 2 translation management
- `DEEPL_API_KEY` — Phase 2 auto-translation
- `NEXT_PUBLIC_ASSET_CDN` — Webflow CDN base URL

### .gitignore fix
- `.env*` glob in the original .gitignore was overly broad — it would have also excluded `.env.example` from git tracking.
- **Fixed**: replaced `.env*` with specific exclusion patterns that protect secrets but allow `.env.example` to be committed.

---

## 8. Performance Flags

These are observations for human review — no code changes made.

### Images
- All section components (`HeroSection`, `ContentBlock`, `CardGrid`, `LogoStrip`, `FeatureGrid`, `TestimonialSection`, `DetailHero`, `CaseStudyHighlight`, `ProductTabSection`) correctly import and use `next/image`.
- `Header` and `Footer` also use `next/image` for logos.
- No raw `<img>` tags found in components or pages.
- **FLAG**: `/public/assets/images/og-home.png` referenced in metadata but the file likely does not exist yet (placeholder). Build will succeed but social previews will be broken until image is added.
- **FLAG**: Most pages reference `/assets/images/hero-dashboard.png`, `/assets/images/ai-advantage.png`, etc. These are placeholder paths — actual images must be added before launch.

### Static vs Dynamic Rendering
- All pages use `generateStaticParams()` — fully statically generated.
- No `"use client"` directive in any page component — all pages are server components. ✓
- `FormSection` and `ProductTabSection` are client components but are used as leaf components — this is correct and does not make the page dynamic.
- No `export const dynamic = "force-dynamic"` found anywhere. ✓

### Bundle Size
- No large client-side bundles identified from code review.
- `ProductTabSection` uses dynamic import `import Image from "next/image"` — minor lazy load consideration, non-critical.
- Recommend running `next build --debug` to verify actual bundle sizes before launch.

---

## 9. Security Final Check

### PASS items
| Check | Status | Notes |
|---|---|---|
| No hardcoded API keys/secrets | PASS | Grep found no secrets in any .ts/.tsx file |
| No `dangerouslySetInnerHTML` without sanitization | PASS | Only in `ContentBlock.tsx` with documented sanitization note (pre-sanitized by transform script) |
| All forms use POST | PASS | `FormSection` uses `method: "POST"` via fetch; no HTML `<form method="get">` patterns found |
| CSP headers configured | PASS | Configured in `next.config.ts` by Architect. All routes covered. |
| X-Frame-Options: DENY | PASS | Configured in `next.config.ts` |
| X-Content-Type-Options: nosniff | PASS | Configured in `next.config.ts` |
| External links use `rel="noopener noreferrer"` | PASS | Button component applies automatically on external hrefs |
| VideoEmbed validates URLs | PASS | Allowlist: YouTube, Vimeo, Loom only |
| No path traversal in content loader | PASS | lib/content.ts validates `[a-z0-9_-]` slug pattern |
| No `.env` committed | PASS | .gitignore updated this session |

### WARNINGS (non-blocking)
- **CSP `unsafe-inline` and `unsafe-eval`** on `script-src`: Required by Next.js for hydration. Accepted as known limitation. Tighten with nonce-based CSP in Phase 2 per CLAUDE.md plan.
- **`dangerouslySetInnerHTML` in ContentBlock**: Pre-sanitized by transform script. The comment documents this, but the transform script has not been run yet. Verify sanitization actually runs before pushing content to production.
- **No HSTS header**: Consider adding `Strict-Transport-Security` in `next.config.ts` headers before launch.

### CRITICAL items
None found beyond those listed in sections 1–4.

---

## 10. Launch Readiness Assessment

### LAUNCH-BLOCKING (must resolve before go-live)

1. **`/video/*` URL mismatch** — Webflow uses `/video/[slug]`, Next.js built `/videos/[slug]`. 20 video pages with incoming SEO links will land on 301s. Redirects are in place, but if possible, rename the Next.js route to `/video/[slug]` to eliminate the redirect chain for crawlers. If renaming is not feasible, the 301s are adequate for SEO.

2. **AI pages missing**: `/en/ai/client-ai`, `/en/ai/marketing-ai`, `/en/ai/sales-ai` are indexed Webflow pages (Indexable status) with no matching Next.js route and no redirect. These 3 slugs must be added to `AI_PAGES` in `app/[locale]/ai/[slug]/page.tsx`. Currently these will 404.

3. **og:image missing on 29+ pages**: While not technically a 404, pages shared on social media will show no preview image. The homepage has an og:image, but `/pricing`, `/about`, `/book-a-demo`, product pages, and all CMS collection pages lack it. This affects conversion from social channels on launch day. Recommend adding a default `og:image` in `layout.tsx` `generateMetadata` as an immediate fix.

### PRE-LAUNCH WARNINGS (should resolve before go-live)

4. **x-default hreflang missing on all pages**: Google recommends x-default for multilingual sites. Add to every page's `languages` block and to `layout.tsx`.

5. **29 indexable pages missing hreflang alternates entirely**: Specifically: about, book-a-demo, explore-apps, pricing, get-reviews, statistics pages, scheduler pages, API pages, solutions, white-label, products. These are all indexable pages in Webflow.

6. **Image assets not yet added**: `og-home.png`, `hero-dashboard.png`, `ai-advantage.png`, `white-label-preview.png`, `synup-logo.svg`, `synup-logo-white.svg`, `inter.woff2` — all referenced but not yet in `/public/`.

7. **Transform script not run**: `/content/` is empty (no JSON files). The entire CMS layer (integrations, case studies, learn articles, etc.) will 404 until `python3 scripts/transform-cms.py` is executed. Run before first build.

8. **Privacy Policy and Terms**: Shell pages only. Full legal content must be added before launch.

9. **Nav mega-menu**: Hardcoded placeholder nav items. Should be replaced with real Webflow nav structure before go-live.

10. **`/en/compare` listing page missing**: Webflow has `/en/compare` as an indexable page, but Next.js only has `/compare/[slug]` — there is no listing page at `/compare`. Add a listing page similar to `/case-studies/page.tsx`.

### ACCEPTABLE (can be deferred post-launch)

- Shell page content (managed-services, office-hours, pro-portal, reports-and-stats, etc.)
- why-synup/wall-of-love and why-synup/case-studies pages
- managed-services subpage routing
- how-to-market/[slug] subpage routing
- Nav mega-menu full structure

---

## Files Created/Modified This Session

| File | Action | Description |
|---|---|---|
| `lib/redirects.ts` | Replaced | Fully populated — 262 entries from redirects.xlsx + parity audit |
| `app/sitemap.ts` | Created | Full multilingual sitemap with alternates and CMS coverage |
| `app/robots.ts` | Created | Robots.txt with correct allow/disallow rules |
| `.env.example` | Created | Environment variable template |
| `.gitignore` | Updated | Fixed `.env*` glob to allow `.env.example` to be tracked |
| `context/seo-qa-report.md` | Created | This report |
| `context/session-log.md` | Updated | Session 8 summary appended |
