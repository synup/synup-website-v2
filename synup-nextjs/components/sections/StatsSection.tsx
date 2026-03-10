/**
 * StatsSection — Big numbers with labels (social proof metrics).
 * Matches Webflow section: .section_stats, .stats-grid, .metrics-row
 */

import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface StatItem {
  /** Numeric value (e.g. "600,000+" or "20%") */
  value: string;
  /** Label describing the stat */
  label: string;
  /** Optional sub-label or source */
  sublabel?: string;
}

export interface StatsSectionProps {
  eyebrow?: string;
  headline?: string;
  stats: StatItem[];
  dark?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function StatsSection({
  eyebrow,
  headline,
  stats,
  dark = false,
  className = "",
}: StatsSectionProps) {
  const bgClass = dark
    ? "bg-[var(--synup-color-bg-dark)] text-white"
    : "bg-[var(--synup-color-bg-surface)]";

  return (
    <section
      className={[
        "section_stats",
        bgClass,
        "py-[var(--synup-space-section-sm)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        {(eyebrow || headline) && (
          <div className="text-center mb-[var(--synup-space-48)]">
            {eyebrow && (
              <span className="inline-block mb-[var(--synup-space-12)] px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
                {eyebrow}
              </span>
            )}
            {headline && (
              <Heading
                as="h2"
                className={dark ? "text-white" : "text-[var(--synup-color-primary-text)]"}
              >
                {headline}
              </Heading>
            )}
          </div>
        )}

        <div
          className={[
            "grid gap-[var(--synup-space-40)]",
            stats.length <= 3
              ? `grid-cols-1 sm:grid-cols-${stats.length}`
              : "grid-cols-2 lg:grid-cols-4",
          ].join(" ")}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-[var(--synup-space-8)]">
              <span
                className={[
                  "text-[var(--synup-font-size-h2)] font-[var(--synup-font-weight-bold)]",
                  "leading-[var(--synup-line-height-tight)]",
                  dark ? "text-white" : "text-[var(--synup-color-action-bg)]",
                ].join(" ")}
              >
                {stat.value}
              </span>
              <Text
                weight="semibold"
                className={[
                  "m-0",
                  dark ? "text-white/80" : "text-[var(--synup-color-primary-text)]",
                ].join(" ")}
              >
                {stat.label}
              </Text>
              {stat.sublabel && (
                <Text
                  size="small"
                  muted
                  className="m-0"
                >
                  {stat.sublabel}
                </Text>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
