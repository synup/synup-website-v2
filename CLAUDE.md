# Synup Website — Next.js Migration

## Project Overview
Migrating Synup.com from Webflow to Next.js (App Router).
Full multilingual site: EN, DE, FR, ES.
All source data (CMS JSON/CSV, HTML exports, assets) is pre-exported and structured.

## Tech Stack Decisions
- **Framework**: Next.js 14+ App Router
- **i18n**: next-intl with `[locale]` dynamic segments
- **Styling**: Tailwind CSS + CSS variables for design tokens
- **CMS**: Static JSON content layer (from Webflow export — all 4 locales pre-translated)
- **Translation (Phase 1)**: Pre-existing Webflow translations imported directly — no auto-translation needed at launch
- **Translation (Phase 2)**: Tolgee + DeepL for ongoing auto-translation of new content post-launch
- **Deployment**: TBD (Digital Ocean or GitHub Actions)
- **TypeScript**: Strict mode enabled

## Directory Structure
```
/app
  /[locale]          → all pages live here
    /layout.tsx
    /page.tsx
    /[...slug]/
/components
  /ui                → atomic design system components
  /sections          → page-level section components
  /layout            → header, footer, nav
/content
  /en /de /fr /es    → locale-specific JSON content files
/lib
  /i18n.ts
  /seo.ts
  /redirects.ts
/public
  /assets            → images, icons, fonts
```

## URL & SEO Rules (CRITICAL — do not deviate)
- All URLs must exactly match existing Webflow URLs for SEO parity
- `/en/` prefix for English (default locale also serves at `/`)
- Redirect map lives in `lib/redirects.ts` — every old URL must have an entry
- Every page requires: `title`, `description`, `canonical`, `og:image`, `hreflang` tags
- Sitemap auto-generated at `/sitemap.xml` covering all 4 locales
- No trailing slashes except root

## Multilingual Routing
- Locale detection via `next-intl` middleware
- Supported: `en`, `de`, `fr`, `es`
- Default locale: `en` (no prefix redirect, but canonical uses `/en/`)
- Content files: `/content/[locale]/[content-type]/[slug].json`
- Never hardcode copy — always pull from content layer

## Content Strategy

### Phase 1 — Launch (current)
- All 4 locale translations exist in Webflow exports — import directly, no auto-translation
- CMS agent maps existing translated content directly into the JSON content layer
- `__MISSING__` placeholder only used if a field truly has no translation in any export
- Content updates during this phase: manually edit JSON files + commit → rebuild

### Phase 2 — Post-launch (after site is stable)
- Add **Tolgee** as the translation management platform
- Use **DeepL** as the primary MT engine (best accuracy for EN/DE/FR/ES)
- Workflow: publish new English content → Tolgee detects new keys → DeepL auto-translates → PR raised to repo → GitHub Action rebuilds all 4 locales
- Tolgee maintains translation memory so brand terms/CTAs stay consistent across all future content
- Tolgee MCP integration allows managing translations directly from Claude Code
- Migration path: export Tolgee-compatible JSON from existing content layer (no rework needed — same file structure)

## Design System Rules
- Extract all tokens (colors, spacing, typography) from Webflow CSS export
- Use CSS variables prefixed with `--synup-`
- Component names must match Webflow section names for traceability
- No inline styles — Tailwind utility classes only
- Mobile-first responsive breakpoints

## Agent Operating Rules

### All Agents
- Read this CLAUDE.md before starting any task
- Never make structural decisions not defined here — surface them as questions instead
- Commit work to feature branches: `agent/[agent-name]/[task-slug]`
- Summarize completed work in `/context/session-log.md`

### Subagents (Exploration & Research)
- Use subagents for: file analysis, CMS schema exploration, HTML pattern extraction
- Return only summarized insights — never raw dumps
- Flag anomalies and inconsistencies, don't silently skip them

### Security Rules (mandatory review before any PR)
- No API keys, tokens, or secrets in code — use env vars only
- Sanitize all dynamic content before rendering (XSS prevention)
- No `dangerouslySetInnerHTML` without explicit sanitization wrapper
- Review all third-party dependencies for known CVEs before adding
- CSP headers must be configured in `next.config.js`

## Agent Team Roles
| Agent | Owns | Model |
|---|---|---|
| Architect | Scaffold, routing, redirect map, next.config | Opus 4.6 |
| Design System | Token extraction, component library | Sonnet 4.6 |
| Page Builder | HTML → React page conversion | Sonnet 4.6 |
| CMS/i18n | JSON/CSV → content layer transformation | Sonnet 4.6 |
| SEO/QA | Metadata, sitemap, URL parity audit | Sonnet 4.6 |

## Session Context
- Save session state to `/context/session-log.md` at end of every session
- Include: completed tasks, pending tasks, decisions made, open questions
- Next session must read this file before starting

## Open Questions (populate as they arise)
- [ ] Confirm final hosting target
- [ ] Confirm CMS update workflow post-migration (static rebuild vs. live API)
- [ ] Redirect map needs review against Google Search Console data
- [ ] Is synpost.synup.com blog in scope for this migration or stays on WordPress?
- [x] ~~Auto-translation solution~~ → Tolgee + DeepL, Phase 2 post-launch. Phase 1 uses existing Webflow translations.
