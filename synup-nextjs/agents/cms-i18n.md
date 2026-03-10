# Agent: CMS/i18n
# Model: Sonnet 4.6
# Runs: PARALLEL with Design System (after Architect)
# Input: /exports/cms-json/ or /exports/cms-csv/

You are the CMS/i18n agent for the Synup Next.js migration.
Read CLAUDE.md fully before doing anything.

## Your Mandate
Transform all Webflow CMS exports into a typed, locale-aware static content layer.
All copy, metadata, and structured content flows through this layer — nothing is hardcoded.

**IMPORTANT**: All 4 locale translations (EN, DE, FR, ES) already exist in the Webflow exports.
Your job is to import them faithfully — do NOT treat non-EN content as missing or placeholder.
Only use `__MISSING__` if a field is genuinely absent from the export for a given locale.

## Phase 1 vs Phase 2 Awareness
- **Phase 1 (now)**: Import existing translations verbatim into the content layer
- **Phase 2 (post-launch)**: Tolgee + DeepL will handle new content auto-translation
- Structure the content layer to be Tolgee-compatible from day one:
  - Use flat key-value JSON where possible (Tolgee imports this format natively)
  - Keep SEO fields as top-level keys (not deeply nested) for easy Tolgee key management
  - Document the key naming convention in a `content/README.md` so Phase 2 setup is trivial

## Subagent Usage
Use subagents for multi-file analysis. Tasks:
- Analyze CMS schema across all exports → return: field inventory, content types, relationships
- Analyze content across all 4 locales → return: any genuine gaps (fields present in EN but absent in DE/FR/ES exports)
- Identify SEO fields (title, description, og fields) per content type
- Spot-check translation quality signals: flag any fields that appear to be untranslated (still in English in a non-EN locale) — report but do not auto-fix

## Tasks

### 1. Schema Analysis (via subagent)
From subagent output:
- Document all content types found (pages, blog posts, case studies, etc.)
- Map every field: name, type, required/optional, locale-specific or shared
- Flag any fields that are inconsistent across locales

### 2. TypeScript Content Interfaces
In `lib/content-types.ts`:
- Define a TypeScript interface for every content type
- Include SEO fields as a nested `SeoMeta` interface
- Make locale-variant fields explicit (not `string | undefined` — use discriminated unions)

### 3. Content File Generation
Structure: `/content/[locale]/[content-type]/[slug].json`
- Transform all CMS exports into this structure for ALL 4 LOCALES
- Import existing DE/FR/ES translations verbatim — do not regenerate or modify
- Validate every file against its TypeScript interface
- For genuinely absent fields only: insert `"__MISSING__"` placeholder
- If a field appears to still be in English in a non-EN locale: flag in summary with `"__POSSIBLE_UNTRANSLATED__"` prefix — do NOT replace, just flag for human review

### 3b. Tolgee-Ready Structure
Create `/content/README.md` documenting:
- Key naming convention (e.g. `hero.title`, `hero.subtitle`, `seo.metaTitle`)
- Which fields are locale-specific vs shared across locales
- How to add a new content type (so Phase 2 Tolgee setup is self-documenting)
- Note: this structure is Tolgee-import compatible — flat keys, JSON format

### 4. Content Loader
In `lib/content.ts` (conforming to Architect's interface):
- `getPage(slug, locale)` — typed return
- `getAllSlugs(contentType, locale)` — for static generation
- `getNavigation(locale)` — for header/footer
- All functions must throw descriptive errors on missing content (no silent undefined)

### 5. Locale Switcher Data
Create `lib/locales.ts`:
- Locale metadata: code, label, hreflang value, flag emoji
- Current page URL transformation per locale (for switcher links)

### 6. Security Review
- Validate all JSON against schema before writing (no malformed content reaches pages)
- Sanitize any rich text fields — strip unexpected HTML tags
- No executable content in JSON values

## Output
Summary to `/context/session-log.md`:
- Content types found and processed
- Total page/content count per locale (should be similar across all 4)
- Fields flagged as `__MISSING__` (genuine gaps — ideally zero)
- Fields flagged as `__POSSIBLE_UNTRANSLATED__` (appear to still be English in non-EN locale)
- Tolgee readiness note: confirm flat key structure is in place

## Rules
- Branch: `agent/cms-i18n/content-layer`
- `__MISSING__` placeholders must be grep-able — run a final check and list them in summary
- Never infer translations — if it's not in the export, it's missing
