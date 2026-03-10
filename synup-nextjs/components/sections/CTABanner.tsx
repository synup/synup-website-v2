/**
 * CTABanner — Full-width call-to-action strip.
 * Matches Webflow section: .section_cta, .cta-banner, .partner-cta
 */

import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface CTABannerProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCta: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  /** Background style */
  variant?: "brand" | "dark" | "light" | "gradient";
  /** Centered or left-aligned */
  centered?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function CTABanner({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  variant = "brand",
  centered = true,
  className = "",
}: CTABannerProps) {
  const bgMap: Record<NonNullable<CTABannerProps["variant"]>, string> = {
    brand: "bg-[var(--synup-color-action-bg)] text-white",
    dark: "bg-[var(--synup-color-bg-dark)] text-white",
    light: "bg-[var(--synup-color-tint-grey)]",
    gradient:
      "bg-gradient-to-br from-[var(--synup-color-brand-blue)] to-[var(--synup-color-action-bg)] text-white",
  };

  const isLight = variant === "light";

  return (
    <section
      className={[
        "section_cta",
        bgMap[variant],
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="medium">
        <div
          className={[
            "flex flex-col gap-[var(--synup-space-24)]",
            centered ? "items-center text-center" : "items-start",
          ].join(" ")}
        >
          {eyebrow && (
            <span
              className={[
                "inline-block px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)]",
                isLight
                  ? "bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]"
                  : "bg-white/20 text-white",
              ].join(" ")}
            >
              {eyebrow}
            </span>
          )}

          <Heading
            as="h2"
            className={isLight ? "text-[var(--synup-color-primary-text)]" : "text-white"}
          >
            {headline}
          </Heading>

          {subheadline && (
            <Text
              size="medium"
              className={[
                "m-0 max-w-[600px]",
                isLight
                  ? "text-[var(--synup-color-secondary-text)]"
                  : "text-white/80",
              ].join(" ")}
            >
              {subheadline}
            </Text>
          )}

          <div className="flex flex-wrap gap-[var(--synup-space-16)]">
            <Button
              href={primaryCta.href}
              variant={isLight ? "primary" : "secondary"}
              size="lg"
              external={primaryCta.external}
            >
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant="ghost"
                size="lg"
                external={secondaryCta.external}
                className={isLight ? "" : "border-white text-white hover:bg-white hover:text-[var(--synup-color-action-bg)]"}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
