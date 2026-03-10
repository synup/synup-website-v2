/**
 * FeatureGrid — Icon/image + title + description in 2–4 column grid.
 * Matches Webflow section: .section_features, .features-grid, .layout-grid
 */

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface FeatureItem {
  /** Optional icon or image URL */
  icon?: string;
  iconAlt?: string;
  /** Feature headline */
  title: string;
  /** Feature description */
  description: string;
  /** Optional "Learn More" link */
  href?: string;
  linkLabel?: string;
}

export interface FeatureGridProps {
  /** Section eyebrow label */
  eyebrow?: string;
  /** Section headline */
  headline?: string;
  /** Section subheadline */
  subheadline?: string;
  /** Feature items */
  items: FeatureItem[];
  /** Number of columns (2, 3, or 4) */
  columns?: 2 | 3 | 4;
  /** Dark/light background */
  dark?: boolean;
  className?: string;
}

const colClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function FeatureGrid({
  eyebrow,
  headline,
  subheadline,
  items,
  columns = 3,
  dark = false,
  className = "",
}: FeatureGridProps) {
  const bgClass = dark
    ? "bg-[var(--synup-color-bg-dark)] text-white"
    : "bg-white";

  return (
    <section
      className={[
        "section_features",
        bgClass,
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        {/* Section header */}
        {(eyebrow || headline || subheadline) && (
          <div className="text-center max-w-[var(--synup-container-medium)] mx-auto mb-[var(--synup-space-64)]">
            {eyebrow && (
              <span className="inline-block mb-[var(--synup-space-12)] px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
                {eyebrow}
              </span>
            )}
            {headline && (
              <Heading
                as="h2"
                className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-16)]"
              >
                {headline}
              </Heading>
            )}
            {subheadline && (
              <Text
                size="medium"
                className="text-[var(--synup-color-secondary-text)] m-0"
              >
                {subheadline}
              </Text>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid ${colClasses[columns]} gap-[var(--synup-space-32)]`}>
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-[var(--synup-space-16)]">
              {item.icon && (
                <div className="w-12 h-12 rounded-[var(--synup-radius-md)] bg-[var(--synup-color-tint-blur-icon)] flex items-center justify-center flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.iconAlt ?? ""}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              )}
              <Heading
                as="h3"
                className={[
                  dark ? "text-white" : "text-[var(--synup-color-primary-text)]",
                ].join(" ")}
              >
                {item.title}
              </Heading>
              <Text
                className={[
                  "m-0",
                  dark
                    ? "text-[var(--synup-color-inverted-text)]"
                    : "text-[var(--synup-color-secondary-text)]",
                ].join(" ")}
              >
                {item.description}
              </Text>
              {item.href && (
                <Button href={item.href} variant="link" size="sm">
                  {item.linkLabel ?? "Learn More"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
