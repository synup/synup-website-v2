/**
 * PricingTable — Plan cards with features list.
 * Matches Webflow section: .section_pricing, .pricing-grid
 */

import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface PricingFeature {
  label: string;
  included: boolean | string;
}

export interface PricingPlan {
  name: string;
  description?: string;
  /** Price per month (billed annually) */
  priceAnnual?: string;
  /** Price per month (billed monthly) */
  priceMonthly?: string;
  /** Billing note (e.g. "/month | billed annually") */
  billingNote?: string;
  /** Savings badge (e.g. "Save 20%") */
  savingsBadge?: string;
  /** Whether this plan is highlighted/popular */
  featured?: boolean;
  cta: {
    label: string;
    href: string;
  };
  features: PricingFeature[];
}

export interface PricingTableProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  /** Toggle labels */
  billingToggle?: {
    annual: string;
    monthly: string;
  };
  plans: PricingPlan[];
  className?: string;
}

/* ─── Check icon ──────────────────────────────────────────────────────────── */

function CheckIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path
        d="M13.3 4L6 11.3 2.7 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function PricingTable({
  eyebrow,
  headline,
  subheadline,
  plans,
  className = "",
}: PricingTableProps) {
  return (
    <section
      className={[
        "section_pricing",
        "bg-[var(--synup-color-bg-surface)]",
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        {(eyebrow || headline || subheadline) && (
          <div className="text-center max-w-[var(--synup-container-medium)] mx-auto mb-[var(--synup-space-64)]">
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
          className={[
            "grid gap-[var(--synup-space-24)]",
            plans.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : plans.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-[var(--synup-container-medium)] mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          ].join(" ")}
        >
          {plans.map((plan, i) => (
            <article
              key={i}
              className={[
                "flex flex-col rounded-[var(--synup-radius-lg)] overflow-hidden",
                plan.featured
                  ? "border-2 border-[var(--synup-color-action-bg)] shadow-[var(--synup-shadow-card-lg)]"
                  : "border border-gray-200 shadow-[var(--synup-shadow-card)]",
                "bg-white",
              ].join(" ")}
            >
              {/* Header */}
              <div
                className={[
                  "p-[var(--synup-space-32)]",
                  plan.featured ? "bg-[var(--synup-color-action-bg)] text-white" : "",
                ].join(" ")}
              >
                <div className="flex items-start justify-between mb-[var(--synup-space-8)]">
                  <h3
                    className={[
                      "text-[var(--synup-font-size-h4)] font-[var(--synup-font-weight-bold)] m-0",
                      plan.featured ? "text-white" : "text-[var(--synup-color-primary-text)]",
                    ].join(" ")}
                  >
                    {plan.name}
                  </h3>
                  {plan.savingsBadge && (
                    <Badge variant={plan.featured ? "default" : "success"}>
                      {plan.savingsBadge}
                    </Badge>
                  )}
                </div>
                {plan.description && (
                  <p
                    className={[
                      "text-[var(--synup-font-size-small)] m-0 mb-[var(--synup-space-16)]",
                      plan.featured ? "text-white/80" : "text-[var(--synup-color-secondary-text)]",
                    ].join(" ")}
                  >
                    {plan.description}
                  </p>
                )}
                {plan.priceAnnual && (
                  <div className="mt-[var(--synup-space-16)]">
                    <span
                      className={[
                        "text-[var(--synup-font-size-h2)] font-[var(--synup-font-weight-bold)]",
                        plan.featured ? "text-white" : "text-[var(--synup-color-primary-text)]",
                      ].join(" ")}
                    >
                      {plan.priceAnnual}
                    </span>
                    {plan.billingNote && (
                      <span
                        className={[
                          "text-[var(--synup-font-size-small)] ml-1",
                          plan.featured ? "text-white/70" : "text-[var(--synup-color-secondary-text)]",
                        ].join(" ")}
                      >
                        {plan.billingNote}
                      </span>
                    )}
                    {plan.priceMonthly && (
                      <p
                        className={[
                          "text-[var(--synup-font-size-small)] mt-1 m-0",
                          plan.featured ? "text-white/70" : "text-[var(--synup-color-secondary-text)]",
                        ].join(" ")}
                      >
                        {plan.priceMonthly} /month billed monthly
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="px-[var(--synup-space-32)] py-[var(--synup-space-16)]">
                <Button
                  href={plan.cta.href}
                  variant={plan.featured ? "primary" : "secondary"}
                  size="md"
                  className="w-full justify-center"
                >
                  {plan.cta.label}
                </Button>
              </div>

              {/* Features */}
              <div className="px-[var(--synup-space-32)] pb-[var(--synup-space-32)] flex-1">
                {plan.features.length > 0 && (
                  <p className="text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-primary-text)] mb-[var(--synup-space-12)] m-0">
                    Includes
                  </p>
                )}
                <ul className="list-none m-0 p-0 flex flex-col gap-[var(--synup-space-10)]">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-[var(--synup-space-10)]">
                      <span className="mt-0.5">
                        {f.included ? (
                          <CheckIcon color="var(--synup-color-tint-green-tick)" />
                        ) : (
                          <span className="w-4 h-4 block text-gray-300 text-center leading-4">—</span>
                        )}
                      </span>
                      <span className="text-[var(--synup-font-size-small)] text-[var(--synup-color-primary-text)]">
                        {typeof f.included === "string" ? `${f.included} ` : ""}
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
