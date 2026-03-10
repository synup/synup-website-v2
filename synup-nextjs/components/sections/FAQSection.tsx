/**
 * FAQSection — Accordion-style Q&A.
 * Matches Webflow section: .section_faq, .faq-list
 * Uses HTML details/summary for native accordion — no JS required.
 */

import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  items: FAQItem[];
  /** Side-by-side layout (columns) or stacked */
  layout?: "stacked" | "columns";
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function FAQSection({
  eyebrow,
  headline,
  subheadline,
  items,
  layout = "stacked",
  className = "",
}: FAQSectionProps) {
  return (
    <section
      className={[
        "section_faq",
        "bg-white",
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="medium">
        {(eyebrow || headline || subheadline) && (
          <div className="text-center mb-[var(--synup-space-64)]">
            {eyebrow && (
              <span className="inline-block mb-[var(--synup-space-12)] px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
                {eyebrow}
              </span>
            )}
            {headline && (
              <Heading as="h2" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-16)]">
                {headline}
              </Heading>
            )}
            {subheadline && (
              <Text size="medium" className="text-[var(--synup-color-secondary-text)] m-0">
                {subheadline}
              </Text>
            )}
          </div>
        )}

        <div
          className={
            layout === "columns"
              ? "grid grid-cols-1 md:grid-cols-2 gap-[var(--synup-space-16)]"
              : "flex flex-col gap-[var(--synup-space-4)]"
          }
        >
          {items.map((item, i) => (
            <details
              key={i}
              className="group border border-gray-200 rounded-[var(--synup-radius-md)] overflow-hidden"
            >
              <summary className="flex justify-between items-center p-[var(--synup-space-24)] cursor-pointer list-none select-none hover:bg-[var(--synup-color-bg-surface)] transition-colors">
                <span className="text-[var(--synup-font-size-regular)] font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-primary-text)] pr-[var(--synup-space-16)]">
                  {item.question}
                </span>
                {/* Chevron — rotates on open */}
                <span className="flex-shrink-0 w-5 h-5 text-[var(--synup-color-action-bg)] group-open:rotate-180 transition-transform duration-200">
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-[var(--synup-space-24)] pb-[var(--synup-space-24)]">
                <p className="text-[var(--synup-font-size-regular)] text-[var(--synup-color-secondary-text)] leading-[var(--synup-line-height-relaxed)] m-0">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
