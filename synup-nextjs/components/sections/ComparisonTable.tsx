/**
 * ComparisonTable — Feature comparison grid (Synup vs competitor).
 * Matches Webflow section: .section_comparison-table, .compare-table
 */

import { Heading } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface ComparisonRow {
  feature: string;
  synup: boolean | string;
  competitor: boolean | string;
  /** Optional category grouping */
  category?: string;
}

export interface ComparisonTableProps {
  eyebrow?: string;
  headline?: string;
  /** Name of the competitor (e.g. "Yext") */
  competitorName: string;
  rows: ComparisonRow[];
  /** Show category sub-headers */
  groupByCategory?: boolean;
  className?: string;
}

/* ─── Icons ───────────────────────────────────────────────────────────────── */

function CheckCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--synup-color-tint-green)" />
      <path
        d="M6 10l3 3 5-5"
        stroke="var(--synup-color-tint-green-tick)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#f8e4e4" />
      <path
        d="M7 7l6 6M13 7l-6 6"
        stroke="#cc3333"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function renderValue(val: boolean | string) {
  if (typeof val === "boolean") {
    return val ? <CheckCircle /> : <XCircle />;
  }
  return <span className="text-[var(--synup-font-size-small)]">{val}</span>;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function ComparisonTable({
  eyebrow,
  headline,
  competitorName,
  rows,
  groupByCategory = false,
  className = "",
}: ComparisonTableProps) {
  // Group rows by category if needed
  const categories: string[] = [];
  if (groupByCategory) {
    rows.forEach((r) => {
      if (r.category && !categories.includes(r.category)) {
        categories.push(r.category);
      }
    });
  }

  return (
    <section
      className={[
        "section_comparison-table",
        "bg-white",
        "py-[var(--synup-space-section)]",
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
              <Heading as="h2" className="text-[var(--synup-color-primary-text)]">
                {headline}
              </Heading>
            )}
          </div>
        )}

        <div className="overflow-x-auto rounded-[var(--synup-radius-lg)] border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--synup-color-bg-surface)]">
                <th className="text-left py-[var(--synup-space-16)] px-[var(--synup-space-24)] text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-primary-text)] border-b border-gray-200 w-1/2">
                  Feature
                </th>
                <th className="text-center py-[var(--synup-space-16)] px-[var(--synup-space-24)] text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-action-bg)] border-b border-gray-200 w-1/4">
                  Synup
                </th>
                <th className="text-center py-[var(--synup-space-16)] px-[var(--synup-space-24)] text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-secondary-text)] border-b border-gray-200 w-1/4">
                  {competitorName}
                </th>
              </tr>
            </thead>
            <tbody>
              {groupByCategory && categories.length > 0
                ? categories.map((cat) => (
                    <>
                      <tr key={`cat-${cat}`} className="bg-[var(--synup-color-tint-grey)]">
                        <td
                          colSpan={3}
                          className="py-[var(--synup-space-12)] px-[var(--synup-space-24)] text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-primary-text)]"
                        >
                          {cat}
                        </td>
                      </tr>
                      {rows
                        .filter((r) => r.category === cat)
                        .map((row, j) => (
                          <tr key={j} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-[var(--synup-space-14)] px-[var(--synup-space-24)] text-[var(--synup-font-size-small)] text-[var(--synup-color-primary-text)]">
                              {row.feature}
                            </td>
                            <td className="py-[var(--synup-space-14)] px-[var(--synup-space-24)] text-center">
                              <div className="flex justify-center">{renderValue(row.synup)}</div>
                            </td>
                            <td className="py-[var(--synup-space-14)] px-[var(--synup-space-24)] text-center">
                              <div className="flex justify-center">{renderValue(row.competitor)}</div>
                            </td>
                          </tr>
                        ))}
                    </>
                  ))
                : rows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-[var(--synup-space-14)] px-[var(--synup-space-24)] text-[var(--synup-font-size-small)] text-[var(--synup-color-primary-text)]">
                        {row.feature}
                      </td>
                      <td className="py-[var(--synup-space-14)] px-[var(--synup-space-24)] text-center">
                        <div className="flex justify-center">{renderValue(row.synup)}</div>
                      </td>
                      <td className="py-[var(--synup-space-14)] px-[var(--synup-space-24)] text-center">
                        <div className="flex justify-center">{renderValue(row.competitor)}</div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
