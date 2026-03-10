# Synup Next.js Migration — Session Log

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
