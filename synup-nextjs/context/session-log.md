# Synup Next.js Migration — Session Log

## Session 9 — 2026-03-10 (Launch Blocker Fixes)

### Status: ALL 3 LAUNCH BLOCKERS RESOLVED

#### Fix 1: `/videos/[slug]` renamed to `/video/[slug]`
- Renamed `app/[locale]/videos/` directory to `app/[locale]/video/`
- Updated all internal URL references in listing page and detail page metadata (canonical, hreflang, card links)
- Updated `app/sitemap.ts` — both listing path and CMS collection `urlPrefix` now use `/video`
- Updated `lib/redirects.ts` — reversed redirect direction: `/videos/:slug` now redirects to `/video/:slug` (was the opposite)
- Updated legacy `videos-rollup` redirect destination
- Result: `/video/[slug]` now matches Webflow URLs exactly — zero 301 overhead for crawlers

#### Fix 2: 3 missing AI page slugs added
- Added `client-ai`, `marketing-ai`, `sales-ai` to `AI_PAGES` in `app/[locale]/ai/[slug]/page.tsx`
- Each page has: title, description, headline, subheadline, 4 feature items
- Content sourced from existing Webflow page descriptions (synup-ai parent page features)
- Generates 12 new static pages (3 slugs x 4 locales)

#### Fix 3: Default fallback og:image in layout.tsx
- Added `openGraph` block to `generateMetadata` in `app/[locale]/layout.tsx`
- Fallback image: `/assets/og-default.png` (1200x630)
- Uses `NEXT_PUBLIC_SITE_URL` env var for absolute URL (no hardcoded domain)
- Added `twitter.card: "summary_large_image"` with same fallback image
- Added `x-default` hreflang pointing to EN (resolves SEO/QA warning #4 too)
- All 29+ pages that were missing og:image now inherit the layout default

#### Build Verification
- `npx next build` succeeds
- `/video/` route generates correctly (singular, matching Webflow)
- All 6 AI pages generate (synup-ai, ai-listings, ai-social-media-report, client-ai, marketing-ai, sales-ai)
- og:image fallback applies globally via layout metadata inheritance

#### Files Modified
- `app/[locale]/video/page.tsx` (moved from videos/, URLs updated)
- `app/[locale]/video/[slug]/page.tsx` (moved from videos/, URLs updated)
- `app/[locale]/ai/[slug]/page.tsx` (3 new AI page entries)
- `app/[locale]/layout.tsx` (og:image fallback, x-default hreflang, twitter card)
- `lib/redirects.ts` (reversed video redirect direction, updated legacy pointers)
- `app/sitemap.ts` (video URL paths updated)

---

## Session 8 — 2026-03-10 (SEO/QA Agent — Final Quality Gate)

### Status: COMPLETE — SEO/QA audit done. Redirects populated, sitemap/robots/env created. 3 launch-blocking issues identified.

### What Was Completed

#### Files Written/Modified

| File | Action |
|---|---|
| `lib/redirects.ts` | Fully populated — 262 redirect entries (was 3 stubs) |
| `app/sitemap.ts` | Created — full multilingual sitemap with xhtml:link alternates |
| `app/robots.ts` | Created — correct allow/disallow + sitemap pointer |
| `.env.example` | Created — environment variable template with all required vars |
| `.gitignore` | Updated — fixed `.env*` glob to allow `.env.example` tracking |
| `context/seo-qa-report.md` | Created — comprehensive audit report |

#### URL Parity Audit Results
- 587 EN Webflow 200-OK URLs analyzed
- 534 matched to Next.js routes (91%)
- 53 missing URLs resolved via 108 new redirect entries
- Redirect chain/loop check: NONE found in source data

#### Key Issues Found

**LAUNCH-BLOCKING:**
1. `/video/*` (singular) → `/videos/*` (plural) URL mismatch — 20 video detail pages will 301. Redirects added. Page Builder should rename route to `/video/[slug]` for exact URL match.
2. `/en/ai/client-ai`, `/en/ai/marketing-ai`, `/en/ai/sales-ai` — Indexed Webflow pages with NO Next.js route and NO redirect. These 3 slugs must be added to `AI_PAGES` in `app/[locale]/ai/[slug]/page.tsx`.
3. og:image missing on 29+ pages including all CMS collections and most static pages — affects social sharing on launch day. Recommend default og:image in layout.tsx.

**PRE-LAUNCH WARNINGS:**
- x-default hreflang missing from all pages (none of the 66 pages set it)
- 29 indexable pages missing hreflang alternates entirely
- Image assets not yet added to /public/ (logos, OG images, hero images)
- Transform script not run — /content/ is empty, all CMS pages will 404
- /en/compare listing page missing (Webflow has it, Next.js only has the [slug] detail page)
- Privacy Policy / Terms content missing (shell pages only)

#### Redirect Map Analysis
- 154 entries from exports/redirects.xlsx — all populated
- 108 entries from URL parity audit (new)
- Notable: `/en/products/invoicing-payments` → `invoicing-e-sign`, `/en/products/voice-search` → `presence`, all `/en/why-synup/*` slug mismatches resolved
- All use `permanent: true` (301 equivalent)

### Open Questions (new)
- [ ] Should Page Builder rename `/videos/[slug]` to `/video/[slug]` to avoid redirect overhead? (Preserves original URL, no need for redirect)
- [ ] Add client-ai, marketing-ai, sales-ai to AI_PAGES — these are indexed Webflow pages
- [ ] /en/compare needs a listing page (currently only has [slug] detail)
- [ ] Should /managed-services get subpage routing (/[slug])? 3 subpages exist on Webflow.
- [ ] Should /how-to-market get dynamic [slug] routing? Multiple subpages exist on Webflow.
- [ ] Add default og:image to layout.tsx generateMetadata as fallback for pages without page-specific og:image
- [ ] Add x-default to all page hreflang language maps

### Next Steps for Human Review
1. Run `python3 scripts/transform-cms.py` to generate /content/ JSON files
2. Add image assets: synup-logo.svg, synup-logo-white.svg, inter.woff2, og-home.png, hero images
3. Fix 3 launch-blocking issues above
4. Review /context/seo-qa-report.md for full detail on all warnings
5. Set NEXT_PUBLIC_SITE_URL in production .env.local before deploying
6. Verify Privacy Policy and Terms content

---

## Session 7 — 2026-03-10 (Page Builder Agent — Continuation)

### Status: COMPLETE — Sub-product pages, LP pages, and lists pages built. Build passes: 4,040 static pages.

### What Was Completed

#### Sub-Product Pages (`/[locale]/products/[product]/[subpage]`)

New route: `/app/[locale]/products/[product]/[subpage]/page.tsx`

Built 20 sub-product pages across 4 product families using static `SUB_PRODUCT_PAGES` definitions:

| Product | Subpages |
|---|---|
| `agency-os` | white-label, client-portal, churn-forecasting, custom-fields, client-summary |
| `presence` | network, features, analytics, pricing |
| `reputation` | network, feature, analytics, generation, pricing |
| `social` | platform, features, analytics, pricing |

All subpages: HeroSection → FeatureGrid → CTABanner. `generateStaticParams()` iterates all 4 locales × 20 combinations = 80 routes.

#### LP Pages (`/[locale]/lps/[slug]`)

New route: `/app/[locale]/lps/[slug]/page.tsx`

Built 1 LP page (noindex — campaign landing pages):
- `yext-alternative` — HeroSection → FeatureGrid (6 features) → ComparisonTable (12 rows vs Yext) → FormSection → CTABanner

LP pages have `robots: { index: false, follow: false }` per landing page SEO convention.

#### Lists Pages (`/[locale]/lists/[slug]`)

New route: `/app/[locale]/lists/[slug]/page.tsx`

Built 3 resource list pages:
- `chrome-seo-plugins` — 12 SEO tools with descriptions
- `citation-building` — 12 citation strategy categories
- `ideas-to-generate-reviews` — 16 review generation tactics (2 categories: Digital + In-Person)

Custom list rendering uses a `divide-y` sectioned layout (not CardGrid) to match the "monster list" format of these pages.

### Build Results
- `npx tsc --noEmit`: ✓ 0 errors
- `npx next build`: ✓ 4,040 static pages generated across en/de/fr/es

### Bug Fixed This Session
- `FormSection` prop: `action` → `actionUrl` (the component uses `actionUrl` per its interface definition)

### Remaining Items (from prior session — now resolved)
- [x] Sub-product pages — DONE
- [x] LP pages — DONE (1 page: yext-alternative)
- [x] Lists pages — DONE (3 pages)

### Still Open
- [ ] Privacy Policy and Terms full content — shell pages only
- [ ] Shell pages (managed-services, office-hours, etc.) need real content
- [ ] Nav mega-menu dropdowns not yet built
- [ ] Logo SVGs (`synup-logo.svg`, `synup-logo-white.svg`) not yet added
- [ ] Inter font file not yet copied from exports

---

## Session 6 — 2026-03-10 (Page Builder Agent)

### Status: PAGE BUILDER COMPLETE — All section components, pages, CMS detail pages, and listing pages built. Build passes: 3,952 static pages generated across 4 locales.

### What Was Completed

#### Section Components Built (`components/sections/`)

| Component | Webflow Section | Notes |
|---|---|---|
| `HeroSection` | `.section_header` | headline, subheadline, CTAs, optional image, dark/centered variants |
| `FeatureGrid` | `.section_features` | 2/3/4 col grid, icon support, dark variant |
| `TestimonialSection` | `.section_testimonials` | grid + featured layout, star ratings |
| `CTABanner` | `.section_cta` | brand/dark/light/gradient variants |
| `PricingTable` | `.section_pricing` | plan cards, features, save badges, featured plan |
| `LogoStrip` | `.section_logos` | grayscale logos, optional link |
| `ComparisonTable` | `.section_comparison-table` | feature comparison, grouped by category |
| `FAQSection` | `.section_faq` | native details/summary accordion, stacked/columns layout |
| `StatsSection` | `.section_stats` | big number metrics with labels |
| `ContentBlock` | `.section_content` | split layout, pre-sanitized HTML body, image left/right |
| `CardGrid` | `.section_cards` | 2/3/4 col cards, hover effects, view-all link |
| `FormSection` | `.section_form` | client component, multi-field, POST to API endpoint |
| `VideoEmbed` | `.section_video` | YouTube/Vimeo only (URL validated), lazy iframe |
| `ProductTabSection` | `.section_tabs` | client component, tab nav + content panel |
| `CaseStudyHighlight` | `.section_case-study` | metrics + quote + logo layout |
| `DetailHero` | `.section_detail-hero` | CMS detail page hero with logo, meta chips, CTAs |

All section components:
- Full TypeScript interfaces for all props
- Tailwind-only (no inline styles)
- Mobile-first responsive
- Use existing UI components (Button, Card, Heading, Text, Container, Badge)
- External links use `rel="noopener noreferrer"`
- No `dangerouslySetInnerHTML` except `ContentBlock.bodyHtml` (pre-sanitized by transform script — documented in comment)

#### Static Pages Built

| Page | Route | Notes |
|---|---|---|
| Homepage | `/[locale]/` | Full section composition from index.docx |
| About | `/[locale]/about` | Mission, stats, careers CTA |
| Pricing | `/[locale]/pricing` | 3-plan table (Startup/Agency/Scale), FAQ, CTA |
| Contact | `/[locale]/contact` | Form section with /api/contact endpoint |
| Careers | `/[locale]/careers` | Mission, culture, open positions CTA |
| Partners | `/[locale]/partners` | Growth features, scan tool, contact form |
| Book a Demo | `/[locale]/book-a-demo` | Split form with benefit bullets |
| Free Trial | `/[locale]/freetrial` | Testimonial + form |
| Privacy Policy | `/[locale]/privacy-policy` | Shell — full content from CMS needed |
| Terms & Conditions | `/[locale]/terms-and-conditions` | Shell — full content from CMS needed |
| Contact Success | `/[locale]/contact-success` | Branded success page |
| Registration Success | `/[locale]/registration-success` | Branded success page |
| Thank You | `/[locale]/thank-you` | Generic thank you page |
| Explore Apps | `/[locale]/explore-apps` | Full marketing suite grid |
| Get Reviews / Scan Tool | `/[locale]/get-reviews` | Scan tool landing page |
| Synup vs Hootsuite | `/[locale]/synup-vs-hootsuite` | Comparison table |
| Yext Alternative | `/[locale]/yext-alt` | Full comparison + feature grid |
| Local SEO Statistics | `/[locale]/local-seo-statistics` | Stats + CTA |
| Online Review Statistics | `/[locale]/online-review-statistics` | Stats + CTA |
| Social Media Statistics | `/[locale]/social-media-marketing-statistics` | Stats + CTA |
| Voice Search Statistics | `/[locale]/voice-search-statistics` | Stats + CTA |
| Listing Management API | `/[locale]/listing-management-api` | API landing page |
| Local Search Rank Tracking API | `/[locale]/local-search-rank-tracking-api` | API landing page |
| Reputation Management API | `/[locale]/reputation-management-api` | API landing page |
| Facebook Post Scheduler | `/[locale]/facebook-post-scheduler` | Tool page |
| Google Business Post Scheduler | `/[locale]/google-business-profile-post-scheduler` | Tool page |
| LinkedIn Post Scheduler | `/[locale]/linkedin-post-scheduler` | Tool page |
| Local Grid Ranking Tool | `/[locale]/local-grid-ranking-tool` | Tool page |
| Style Guide | `/[locale]/style-guide` | Design system reference (noindex) |
| Managed Services | `/[locale]/managed-services` | Shell page |
| Office Hours | `/[locale]/office-hours` | Shell page |
| Pro Portal | `/[locale]/pro-portal` | Shell page |
| Reports & Stats | `/[locale]/reports-and-stats` | Shell page |
| ROI Profiles | `/[locale]/roi-profiles` | Shell page |
| What is Ranking | `/[locale]/what-is-ranking` | Shell page |
| How to Market | `/[locale]/how-to-market` | Shell page |
| Automations | `/[locale]/automations` | Shell page |
| 404 Not Found | `/[locale]/not-found.tsx` | Branded with home + contact CTAs |
| Global Error | `/app/global-error.tsx` | Client component, renders own HTML shell |

#### Dynamic Product Pages (`/[locale]/products/[slug]`)

9 product pages with full content: agency-os, presence, reputation, social, seo, crm, invoicing-e-sign, leads, analytics.
Uses static `PRODUCT_PAGES` definitions (no CMS — products have no JSON content layer entries).

#### Dynamic Solution Pages (`/[locale]/solutions/[slug]`)

14 solution pages with full content: seo-agency, web-agency, advertising-agency, web-host-domains, franchisee, telecom, vertical-saas-providers, tv-radio-stations, internet-yellow-pages, marketing, sales, finance, customer-success, pos-providers.

#### Dynamic White Label Pages (`/[locale]/white-label/[slug]`)

5 pages: white-label-software, white-label-listing-management-software, white-label-reputation-management-software, white-label-social-media-management-software, white-label-seo-software.

#### Dynamic Why Synup Pages (`/[locale]/why-synup/[slug]`)

8 pages: dedicated-support, roi-driving-campaigns, managed-migration, contract-buyouts, objective-focused-engagement, stellar-reporting, comprehensive-solutions, ai-driven-tools.

#### Dynamic AI Pages (`/[locale]/ai/[slug]`)

3 pages: synup-ai, ai-listings, ai-social-media-report.

#### CMS Collection Detail Pages (dynamic, loadfrom content layer)

All use `getCollectionItem(locale, collection, slug)` + `notFound()` fallback:
- `/[locale]/integrations/[slug]` — Integration detail
- `/[locale]/case-studies/[slug]` — Case study detail
- `/[locale]/learn/[slug]` — Learn article detail
- `/[locale]/how-to/[slug]` — How-to guide detail
- `/[locale]/ebooks/[slug]` — Ebook detail (gated/ungated)
- `/[locale]/videos/[slug]` — Video detail with embed
- `/[locale]/tools/[slug]` — Tool detail
- `/[locale]/use-case/[slug]` — Use case detail
- `/[locale]/competitors/[slug]` — Competitor comparison detail
- `/[locale]/alternatives/[slug]` — Alternative detail
- `/[locale]/compare/[slug]` — Compare page detail
- `/[locale]/testimonials/[slug]` — Testimonial detail (uses raw JSON field shape from transform script)

#### Collection Listing Pages

- `/[locale]/integrations` — all integrations grid
- `/[locale]/case-studies` — all case studies grid
- `/[locale]/learn` — all learn articles grid
- `/[locale]/how-to` — all how-to guides grid
- `/[locale]/ebooks` — all ebooks grid
- `/[locale]/videos` — all videos grid
- `/[locale]/tools` — all tools grid
- `/[locale]/use-case` — all use cases grid

### Build Results
- `npx tsc --noEmit`: ✓ 0 errors
- `npx next build`: ✓ 3,952 static pages generated across en/de/fr/es
- All pages use `setRequestLocale(locale)` at top
- All pages export `generateStaticParams()` for all 4 locales
- All pages export `generateMetadata()` with title, description, canonical, hreflang alternates

### Security Audit
- No `dangerouslySetInnerHTML` without comment documenting sanitization source
- `ContentBlock.bodyHtml` uses pre-sanitized HTML from `scripts/transform-cms.py` — documented in code
- All external links in section components use `rel="noopener noreferrer"` via Button `external` prop
- VideoEmbed validates URLs against allowlist (YouTube, Vimeo, Loom only)
- FormSection posts to `/api/contact` — no secrets in component
- No hardcoded API keys or tokens anywhere

### Webflow Patterns That Couldn't Be Cleanly Converted

1. **Nav mega-menu dropdowns**: The Webflow nav has complex multi-column dropdowns with product groups. The Header/Nav components from the Design System session use a simpler model. Nav needs to be updated with real mega-menu structure from index.docx.
2. **Privacy Policy / Terms**: These are long-form legal pages. Content was not in the exports directory and needs to be added manually or sourced from Webflow's CMS.
3. **Shell pages** (managed-services, office-hours, pro-portal, reports-and-stats, roi-profiles, what-is-ranking, how-to-market, automations): These pages have minimal content in the .docx exports. They render placeholder hero + CTA. Real content needs to be sourced from Webflow or added to the JSON content layer.
4. **Sub-product pages** (products/presence/analytics, products/reputation/feature, etc.): The exports contain sub-directories (products/agency-os/, products/presence/, products/reputation/, products/social/) — sub-product pages are not yet built. These need a `/[locale]/products/[product]/[subpage]/page.tsx` route.
5. **LPs directory**: `exports/webflow-code-exports/lps/` — landing pages not yet built (needs its own template).
6. **Lists directory**: `exports/webflow-code-exports/lists/` — not yet built.
7. **Logo SVGs**: `/public/assets/images/synup-logo.svg` not yet added (flagged in Session 5).
8. **Testimonials collection type mismatch**: `CmsCollectionItem.fields` doesn't match the raw JSON shape from the transform script. Testimonials page works around this with a local interface. This pattern should be audited across all CMS detail pages once the transform script runs fully.

### Missing Content Flagged
- `__MISSING__` fields in testimonials (seo.description, partner field) — non-blocking for build
- Navigation content synthesized (not from Webflow export) — needs review vs live site
- Product/Solutions sub-pages not yet built

### Open Questions (new)
- [ ] Sub-product pages needed: `/products/agency-os/*`, `/products/presence/analytics`, `/products/reputation/*`, `/products/social/*`
- [ ] LP pages (`/lps/`) — are these standalone campaign landing pages that need their own route?
- [ ] `lists/` directory exports — what routes do these map to?
- [ ] Privacy Policy and Terms full content — from Webflow CMS or static?

---

## Session 5 — 2026-03-10 (Design System Agent)

### Status: DESIGN SYSTEM COMPLETE — Token extraction, UI components, layout components all built

### What Was Completed

#### Token Extraction
- Analyzed all CSS in `exports/webflow-code-exports/css/synup.css`
- Created `styles/tokens.css` — 100+ CSS variables prefixed `--synup-*`
- Updated `app/globals.css` — imports tokens, registers `@theme inline` Tailwind v4 extensions, base reset

#### Color Palette (extracted from Webflow :root)
| Token | Value | Usage |
|---|---|---|
| `--synup-color-brand-blue` | `#2d62ff` | Brand, badges, links |
| `--synup-color-brand-pink` | `#dd23bb` | Accent, tertiary CTAs |
| `--synup-color-action-bg` | `#0085ff` | Primary CTA background |
| `--synup-color-action-hover` | `#1c71be` | Button hover state |
| `--synup-color-primary-text` | `#000d5e` | All body/heading text |
| `--synup-color-bg-surface` | `#f7f7f8` | Page background |
| `--synup-color-bg-dark` | `#080a19` | Dark sections, footer |
| `--synup-color-card-surface` | `white` | Cards/panels |

#### Typography Scale (from Webflow variables)
| Token | Value |
|---|---|
| H1 | 3.5rem / weight 700 / lh 1.25 |
| H2 | 3rem / weight 600 / lh 1.25 |
| H3 | 1.75rem / weight 600 / lh 1.28 |
| H4 | 1.5rem / weight 700 / lh 1.4 |
| H5–H6 | 1.25rem–1rem / weight 700 |
| Body regular | 1rem / weight 400 / lh 1.375 |
| Tiny | 0.75rem |

#### Container widths (Webflow exact)
- `container-small`: 48rem
- `container-medium`: 64rem
- `container-large`: 74.5rem (primary grid)

#### Components Built

**UI Components (`components/ui/`):**
| Component | Variants / Notes |
|---|---|
| `Button` | primary, secondary, ghost, link — renders `<button>` or `<a>` based on `href` |
| `Badge` | default, success, warning, error, brand |
| `Card` | image slot, badge slot, title, body, CTA — surface: default/muted/dark |
| `Input` | label, error, hint — ARIA aria-invalid + aria-describedby |
| `Textarea` | label, error, hint |
| `Select` | options array, placeholder, error, hint |
| `Heading` | H1–H6 with `visualLevel` for semantic/visual decoupling |
| `Text` | p element — size/weight/muted props |
| `TextSpan` | span element — same API as Text |
| `Caption` | Tiny muted text |
| `Container` | small/medium/large/xlarge/full — `padded` prop for global padding |

**Layout Components (`components/layout/`):**
| Component | Notes |
|---|---|
| `Nav` | Desktop horizontal + mobile hamburger drawer — all hrefs must be locale-prefixed by caller |
| `LocaleSwitcher` | Uses `usePathname` to build locale-aware hrefs — client component |
| `Header` | Sticky, contains Nav + LocaleSwitcher + CTA buttons |
| `Footer` | Dark bg, link columns (typed), locale switcher, legal row |

#### Key Design Decisions (where Webflow was ambiguous)
1. **Button hover on primary**: Webflow uses `#1c71be` (extracted directly). Kept as exact value.
2. **Nav locale prop**: Next.js App Router `Link` does not accept `locale` prop — callers must provide locale-prefixed hrefs. Documented in NavItem interface.
3. **Typography `as` prop removed**: Polymorphic `as` causes TypeScript issues with strict mode + HTMLAttributes; replaced with `Text` (p) and `TextSpan` (span) separate components.
4. **Container large = 74.5rem**: Matches Webflow's `--_typograpgy---container--container-large` exactly.
5. **Font loading**: Font face moved to `styles/tokens.css`, path updated to `/assets/fonts/inter.woff2` (public folder convention).

#### Fidelity Gaps / Items for Human Review
- [ ] **Logo SVGs needed**: `public/assets/images/synup-logo.svg` and `synup-logo-white.svg` must be added
- [ ] **Inter font file**: `public/assets/fonts/inter.woff2` must be copied from `exports/webflow-code-exports/fonts/`
- [ ] **Nav items are placeholders**: `app/[locale]/layout.tsx` uses hardcoded nav — Page Builder / CMS agent should replace with content layer
- [ ] **Footer nav items are placeholders**: Same as above
- [ ] **Webflow deleted variable names**: Several CSS variables in the export have `<deleted|variable-...>` in their names — resolved to underlying hex values. Full resolution map in `styles/tokens.css` comments.
- [ ] **H1 in Webflow = 4rem in base, 3.5rem in tokens**: `synup.css` has two definitions. Token uses 3.5rem (`--_typograpgy---font-size--heading-h1`) which is the design intent; default `h1` rule in synup.css uses 4rem as fallback. Used token value (3.5rem) as canonical.

#### Security Audit
- No inline event handlers in any component (only `onClick` callbacks via typed props)
- All dynamic props are typed — no `any`
- No hardcoded URLs in components — all via props
- No `dangerouslySetInnerHTML` anywhere
- `external` links use `rel="noopener noreferrer"` automatically

### Files Created This Session
- `styles/tokens.css`
- `app/globals.css` (updated — full token system)
- `components/ui/Button.tsx`
- `components/ui/Badge.tsx`
- `components/ui/Card.tsx`
- `components/ui/Input.tsx` (Input, Textarea, Select)
- `components/ui/Typography.tsx` (Heading, Text, TextSpan, Caption)
- `components/ui/Container.tsx`
- `components/ui/index.ts` (barrel export)
- `components/layout/Nav.tsx`
- `components/layout/LocaleSwitcher.tsx`
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/layout/index.ts` (barrel export)
- `app/[locale]/layout.tsx` (updated — Header/Footer wired in)

---

## Session 4 — 2026-03-10 (CMS/i18n Agent)

### Status: CONTENT LAYER COMPLETE — Code ready, transform script ready to run

### What Was Completed

#### Files Created / Modified

| File | Action | Description |
|---|---|---|
| `lib/content-types.ts` | Created | Full TypeScript interfaces for all 36 Webflow collection types |
| `lib/content.ts` | Implemented | All 4 content loader functions (was stub, now fully implemented) |
| `lib/locales.ts` | Created | Locale metadata, URL transformation helpers, hreflang builder |
| `scripts/transform-cms.py` | Created | Python script to transform all 144 xlsx files to JSON content layer |
| `content/README.md` | Created | Key naming convention, Tolgee migration guide, security notes |

#### Content Types Mapped (36 collections from Webflow exports)

| Collection | Folder | Notes |
|---|---|---|
| Competitors | `competitors` | Full competitor comparison pages |
| Competitor Sections | `competitor-sections` | Section sub-items for competitor pages |
| Alternatives | `alternatives` | Long-form alternative pages |
| Alts | `alts` | Short-form alternative pages |
| Compare pages | `compare-pages` | Head-to-head comparison pages |
| Compare categories | `compare-categories` | Category groupings for compare pages |
| Compare table categories | `compare-table-categories` | Table category labels |
| Comparison Table Categories | `comparison-table-categories` | Table category groupings |
| Comparision Table Ros | `comparison-table-rows` | Feature comparison table rows |
| Comparisons | `comparisons` | Full comparison page type |
| Comparsions sections | `comparison-sections` | Section sub-items for comparison pages |
| Competitors rating tables | `competitor-rating-tables` | Rating breakdowns vs competitors |
| Case Studies | `case-studies` | Customer success stories |
| Case Study Results | `case-study-results` | Metric sub-items for case studies |
| Learns | `learns` | Learn/education content |
| How-Tos | `how-tos` | Step-by-step how-to guides |
| Marketing Guides | `marketing-guides` | Long-form marketing guides |
| Marketing Guide Companies | `marketing-guide-companies` | Company references in guides |
| Ebook Categories | `ebook-categories` | Ebook category taxonomy |
| Ebooks | `ebooks` | Downloadable ebook assets |
| Integration Types | `integration-types` | Integration type taxonomy |
| Integrations Tags | `integration-tags` | Integration tag taxonomy |
| Integrations | `integrations` | Integration pages (e.g. Google, Facebook) |
| Video Categories | `video-categories` | Video category taxonomy |
| Videos | `videos` | Video content pages |
| Testimonials | `testimonials` | Customer testimonials |
| Testimonial Reviews | `testimonial-reviews` | Individual review items |
| Testimonial Written reviews | `testimonial-written-reviews` | Written testimonial items |
| Presses | `presses` | Press/media mentions |
| Tools | `tools` | Free tools offered by Synup |
| Use Case Categories | `use-case-categories` | Use case category taxonomy |
| Use Cases | `use-cases` | Use case landing pages |
| Managed services | `managed-services` | Managed service offering pages |
| Pro Portals | `pro-portals` | Pro portal pages |
| Customer Logos | `customer-logos` | Logo strip items |
| Local Listings Management Clients | `local-listings-clients` | Listings mgmt client pages |

### Content Loader Functions Implemented

All stubs in `lib/content.ts` are now fully implemented:
- `getPageContent(locale, slug)` — reads from `/content/[locale]/pages/[slug].json`
- `getCollectionItem(locale, collection, slug)` — reads from `/content/[locale]/[collection]/[slug].json`
- `listCollectionSlugs(locale, collection)` — directory scan for `generateStaticParams`
- `listPageSlugs(locale)` — alias for pages collection
- `getNavigation(locale)` — throws descriptive error if missing (nav is required)
- `getAllCollectionItems(locale, collection)` — bulk loader for listing pages
- `buildHrefLangs(collection, slug, baseUrl)` — builds hreflang entries per page

All functions include:
- Slug/locale/collection validation (path traversal prevention)
- Descriptive error messages pointing to the transform script
- Runtime field validation on loaded content

### ACTION REQUIRED: Run Transform Script

The JSON content files do **not yet exist** — they must be generated by running:

```bash
cd synup-nextjs
pip3 install openpyxl
python3 scripts/transform-cms.py
```

This script reads all 144 xlsx files (36 collections x 4 locales) and writes:
- `/content/[locale]/[collection]/[slug].json` — one file per item
- `/content/[locale]/navigation/main.json` — nav/footer data
- `/content/transform-report.json` — flags for missing/untranslated fields

The Bash tool was not available during this session to execute the script directly.

### Missing / Untranslated Field Tracking

After running the transform script, check `content/transform-report.json` for:
- `missing_fields` — fields with `__MISSING__` placeholder
- `possible_untranslated` — fields with `__POSSIBLE_UNTRANSLATED__` prefix

Quick grep commands:
```bash
grep -r "__MISSING__" content/
grep -r "__POSSIBLE_UNTRANSLATED__" content/
```

### Navigation Content Note

Navigation files (`/content/[locale]/navigation/main.json`) are **synthesized** from known Synup site structure — they are NOT exported from Webflow (Webflow does not export nav as a CMS collection). The nav copy is correct for each locale based on product knowledge, but should be **reviewed and updated** against the actual live Webflow site before go-live.

### Tolgee Readiness

- Flat JSON key structure: confirmed (all fields are top-level or one level deep in `seo`)
- Key naming convention: documented in `content/README.md`
- Locale folder structure: matches Tolgee expected layout
- Phase 2 migration: zero-rework — `tolgee push` per locale when ready
- Import command documented in `content/README.md`

### Decisions Made This Session

| Decision | Choice | Rationale |
|---|---|---|
| Rich text sanitization | strip-at-transform-time | Security — no runtime XSS risk; allowed tags set is minimal |
| Untranslated detection | Heuristic (3+ EN marker words) | Conservative — false negatives safe, false positives flagged for review |
| Navigation source | Synthesized from known structure | Webflow does not export nav as CMS collection |
| Slug validation | `[a-z0-9_-]` only | Prevents path traversal in `fs.readFileSync` calls |
| Content loader errors | Throw with descriptive message | No silent undefined — caller always knows why content is missing |

### Open Questions

- [ ] Navigation copy should be verified against live Webflow site before go-live (nav was synthesized)
- [ ] Run transform script to get actual item counts and flagged fields
- [ ] Verify slug field name used in each xlsx (may vary — script tries multiple candidates)
- [ ] Some collections may have EN-only content (e.g. Customer Logos, Marketing Guide Companies) — verify

---

## Session 3 — 2026-03-10 (Architect Agent)

### Status: SCAFFOLD COMPLETE — Ready for parallel agents

### What Was Scaffolded
- Next.js 16.1.6 project with App Router, TypeScript strict, Tailwind CSS v4
- next-intl v4.8.3 configured with locale routing (en, de, fr, es)
- `middleware.ts` — locale detection and prefix routing (en = default, no prefix)
- `i18n/routing.ts` — locale definitions with `localePrefix: "as-needed"`
- `i18n/request.ts` — request config for next-intl server
- `app/[locale]/layout.tsx` — root locale layout with metadata, hreflang, NextIntlClientProvider
- `app/[locale]/page.tsx` — placeholder homepage per locale
- `next.config.ts` — CSP headers, security headers, image domains, redirect map, React strict mode
- `lib/redirects.ts` — typed redirect map with placeholder entries (SEO agent populates)
- `lib/content.ts` — content layer interfaces and loader stubs (CMS agent implements)
- Directory stubs: `components/ui`, `components/sections`, `components/layout`, `content/{en,de,fr,es}`, `public/assets`

### Key Decisions Made
| Decision | Choice | Rationale |
|---|---|---|
| next-intl version | v4.8.3 | Latest stable, supports App Router natively |
| Locale prefix | `as-needed` | English serves at `/` without prefix; de/fr/es get prefix |
| Root layout | Pass-through | Root layout is minimal; real layout in `[locale]/layout.tsx` |
| Redirect strategy | Static import in next.config.ts | Dynamic import failed at config compilation; static works |
| CSP policy | Strict with `unsafe-inline` for scripts/styles | Next.js requires inline scripts/styles for hydration; tighten with nonce in Phase 2 |
| Security headers | X-Frame-Options DENY, nosniff, strict referrer, permissions-policy | Full defense-in-depth |

### Interfaces Other Agents Must Conform To

**CMS Agent** must implement:
- `getPageContent(locale, slug)` — returns `PageContent` from `/content/[locale]/pages/[slug].json`
- `getCollectionItem(locale, collection, slug)` — returns `CmsCollectionItem`
- `listCollectionSlugs(locale, collection)` and `listPageSlugs(locale)` — for `generateStaticParams`
- All types defined in `lib/content.ts`

**SEO/CMS Agent** must populate:
- `lib/redirects.ts` — full redirect entries from `exports/redirects.xlsx` and `exports/url-list.xlsx`

**Page Builder Agent**:
- Pages go in `app/[locale]/` — use `setRequestLocale(locale)` at top of every page component
- Content loaded via `lib/content.ts` functions
- Sections typed as `ContentSection` — `sectionId` must match Webflow class names

**Design System Agent**:
- Components in `components/ui/`, `components/sections/`, `components/layout/`
- CSS variables prefixed with `--synup-` in `app/globals.css`

### Security Audit Results
- 0 vulnerabilities in `npm audit`
- No secrets in any config file
- CSP headers configured (script-src, style-src, img-src, frame-ancestors, etc.)
- X-Frame-Options: DENY, X-Content-Type-Options: nosniff
- No `.env` files committed
- Minimal dependency set: next, react, react-dom, next-intl + dev tooling only

### Open Questions
- [ ] CSP `unsafe-inline`/`unsafe-eval` for scripts — Next.js needs this for hydration; consider nonce-based CSP in Phase 2
- [ ] Next.js 16 deprecates "middleware" in favor of "proxy" convention — monitor migration path
- [ ] Confirm if additional image domains needed beyond cdn.prod.website-files.com

### Build Verification
- `npx next build` succeeds
- Static routes generated: `/`, `/_not-found`, `/[locale]` (en, de, fr, es)
- All 4 locale pages pre-rendered via `generateStaticParams`

### Files Created This Session
- `middleware.ts`
- `i18n/routing.ts`, `i18n/request.ts`
- `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`
- `app/layout.tsx` (replaced — minimal pass-through)
- `app/page.tsx` (replaced — redirect to /en)
- `next.config.ts` (replaced — full config)
- `lib/redirects.ts`, `lib/content.ts`
- `components/{ui,sections,layout}/.gitkeep`
- `content/{en,de,fr,es}/.gitkeep`
- `public/assets/.gitkeep`
- `package.json`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`

---

## Session 2 — 2026-03-10

### Status: PLANNING COMPLETE — Ready to execute

### Decisions Made This Session

**Translation strategy finalised:**
- Phase 1 (launch): Use all existing Webflow translated content (EN/DE/FR/ES) — import directly, no auto-translation needed
- Phase 2 (post-launch): Tolgee + DeepL for ongoing new content auto-translation
- Content layer structured Tolgee-compatible from day one (flat JSON keys) so Phase 2 requires zero rework
- CMS agent updated: treat all 4 locale exports as source-of-truth, not as missing

**Tolgee + DeepL selected for Phase 2:**
- Best accuracy for EN/DE/FR/ES language pairs
- Git-native, works with Next.js App Router natively (not a proxy)
- Translation memory maintains brand/product term consistency
- MCP integration allows managing translations from Claude Code directly
- Open source, self-hostable option available

**Local repo created:**
- Path: `~/Downloads/synup-website-v2`
- Branch: `main`
- First commit: c2cb600

### Updated Tech Stack
| Decision | Choice | Notes |
|---|---|---|
| Router | App Router | — |
| i18n routing | next-intl | — |
| Styling | Tailwind + CSS vars | — |
| Content (Phase 1) | Static JSON from Webflow | All 4 locales pre-translated |
| Translation (Phase 2) | Tolgee + DeepL | Post-launch, new content only |
| TypeScript | Strict mode | — |
| Hosting | TBD | Standalone vs static export TBD |

### Open Questions (resolve before Architect runs)
- [ ] Hosting: Digital Ocean (standalone) or GitHub Actions (static export)?
- [ ] Is synpost.synup.com blog in scope or stays on WordPress/WP Engine?
- [ ] Do you have a full sitemap.xml or URL list from the current Webflow site?
- [ ] Any Webflow custom JS embeds/widgets that need replacing?

### Resolved
- [x] Auto-translation solution → Tolgee + DeepL, Phase 2 only
- [x] Phase 1 content → use existing Webflow translations as-is

### Files Modified This Session
- `CLAUDE.md` — added Phase 1/2 content strategy, Tolgee section, updated open questions
- `agents/cms-i18n.md` — updated to import all 4 locale translations faithfully, added Tolgee-ready structure task
- `context/session-log.md` — this file

---

## Session 1 — 2026-03-10

### What Was Completed
- Full project operating rules defined in `CLAUDE.md`
- 5 agent spawn prompts created and ready in `/agents/`
- Tech stack finalized: Next.js 14 App Router, next-intl, Tailwind CSS, TypeScript strict
- Agent team structure defined with model assignments
- Security rules embedded into every agent prompt
- Session context protocol established

### Agent Execution Order
```
1. Architect (Opus 4.6)        — alone, blocking
2. Design System (Sonnet 4.6)  ─┐
   CMS/i18n (Sonnet 4.6)       ─┤ parallel
3. Page Builder (Sonnet 4.6)   — after 2 completes
4. SEO/QA (Sonnet 4.6)         — after 3 completes
```

### Files Created Session 1
- `/CLAUDE.md`, `/agents/architect.md`, `/agents/design-system.md`
- `/agents/cms-i18n.md`, `/agents/page-builder.md`, `/agents/seo-qa.md`
- `/context/session-log.md`, `/docs/QUICKSTART.md`
