# Claude Code Quickstart — Synup Migration

## Before You Open Claude Code

Resolve these open questions first (answers go into CLAUDE.md):
1. Hosting target → Digital Ocean (standalone) or GitHub Actions (static export)?
2. Is synpost.synup.com (blog) in scope for this migration?
3. Do you have a sitemap.xml or URL list from the current site?
4. Any Webflow custom JS embeds to preserve?

## Setup in Claude Code

```bash
# Enable agent teams (experimental)
# Add to ~/.claude/settings.json:
{
  "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": true
}

# Update Claude Code to latest
npm update -g @anthropic-ai/claude-code

# Open project
cd /path/to/synup-nextjs
claude
```

## Kicking Off Each Agent

### Step 1 — Architect (run alone first)
```
> I need to scaffold the Synup Next.js migration project.
> Please use Opus 4.6 and follow the instructions in agents/architect.md.
> Read CLAUDE.md first. Report back when done.
```
Wait for completion before proceeding.

### Step 2 — Parallel agents (after Architect)
```
> Please use a team of two specialists for the next phase:
> Agent 1: Follow agents/design-system.md using Sonnet 4.6
> Agent 2: Follow agents/cms-i18n.md using Sonnet 4.6
> Both should read CLAUDE.md first. Coordinate via the shared task board.
```

### Step 3 — Page Builder (after Step 2)
```
> Design system and content layer are complete.
> Please follow agents/page-builder.md using Sonnet 4.6.
> Read CLAUDE.md and the session log in context/session-log.md first.
```

### Step 4 — SEO/QA (final)
```
> Pages are built. Please run the SEO and QA audit.
> Follow agents/seo-qa.md using Sonnet 4.6.
> Output the final report to context/seo-qa-report.md.
```

## Monitoring
- Use Shift+Down to cycle between active agent terminals
- Check context/session-log.md for live progress summaries
- Each agent commits to its own branch — review diffs before merging

## If an Agent Gets Stuck
Tell the lead: "Agent [name] is blocked on [issue]. The decision is [X]. Resume."
Or: "Wait — surface that as an open question in session-log.md and continue."

## End of Session
Tell the lead: "Session ending. Please update context/session-log.md with current status."
