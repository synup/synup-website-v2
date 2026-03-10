/**
 * DetailHero — Hero section for CMS collection detail pages.
 * Matches Webflow section: .section_detail-hero, .detail-header
 * Used on: case studies, integrations, competitors, alternatives, etc.
 */

import Image from "next/image";
import { Heading, Text, Caption } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface DetailHeroProps {
  /** Collection type label (e.g. "Integration", "Case Study") */
  collectionLabel?: string;
  /** Page title / headline */
  headline: string;
  /** Supporting subheadline */
  subheadline?: string;
  /** Logo/icon for the item (integration logo, customer logo, etc.) */
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  /** Hero image */
  heroImage?: {
    src: string;
    alt: string;
  };
  /** Metadata chips (e.g. "Industry: Healthcare", "5 min read") */
  meta?: { label: string; value: string }[];
  /** Primary CTA */
  cta?: {
    label: string;
    href: string;
  };
  /** Secondary CTA */
  secondaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function DetailHero({
  collectionLabel,
  headline,
  subheadline,
  logo,
  heroImage,
  meta,
  cta,
  secondaryCta,
  className = "",
}: DetailHeroProps) {
  return (
    <section
      className={[
        "section_detail-hero",
        "bg-[var(--synup-color-bg-surface)]",
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        <div className="flex flex-col lg:flex-row gap-[var(--synup-space-48)] items-start lg:items-center">
          <div className="flex-1 flex flex-col gap-[var(--synup-space-20)]">
            {/* Logo + collection label */}
            <div className="flex items-center gap-[var(--synup-space-16)]">
              {logo && (
                <div className="w-12 h-12 rounded-[var(--synup-radius-md)] bg-white shadow-[var(--synup-shadow-card)] p-2 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width ?? 36}
                    height={logo.height ?? 36}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
              {collectionLabel && (
                <Badge variant="brand">{collectionLabel}</Badge>
              )}
            </div>

            {/* Headline */}
            <Heading as="h1" className="text-[var(--synup-color-primary-text)]">
              {headline}
            </Heading>

            {/* Subheadline */}
            {subheadline && (
              <Text size="medium" className="text-[var(--synup-color-secondary-text)] m-0">
                {subheadline}
              </Text>
            )}

            {/* Meta chips */}
            {meta && meta.length > 0 && (
              <div className="flex flex-wrap gap-[var(--synup-space-12)]">
                {meta.map((m, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full border border-gray-200 text-[var(--synup-font-size-tiny)]"
                  >
                    <Caption className="text-[var(--synup-color-secondary-text)]">
                      {m.label}:
                    </Caption>
                    <span className="font-[var(--synup-font-weight-medium)] text-[var(--synup-color-primary-text)] text-[var(--synup-font-size-tiny)]">
                      {m.value}
                    </span>
                  </span>
                ))}
              </div>
            )}

            {/* CTAs */}
            {(cta || secondaryCta) && (
              <div className="flex flex-wrap gap-[var(--synup-space-16)] mt-[var(--synup-space-8)]">
                {cta && (
                  <Button href={cta.href} variant="primary" size="lg">
                    {cta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    href={secondaryCta.href}
                    variant="secondary"
                    size="lg"
                    external={secondaryCta.external}
                  >
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Hero image */}
          {heroImage && (
            <div className="lg:w-5/12 w-full rounded-[var(--synup-radius-lg)] overflow-hidden shadow-[var(--synup-shadow-card-lg)]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={640}
                height={480}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
