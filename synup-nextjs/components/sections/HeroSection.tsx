/**
 * HeroSection — Full-width hero with headline, subheadline, CTA buttons, optional image.
 * Matches Webflow section: .section_header, .section-hero
 */

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface HeroCTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
}

export interface HeroSectionProps {
  /** Eyebrow label above the headline */
  eyebrow?: string;
  /** Main headline — can include <br> via splitting on \n */
  headline: string;
  /** Supporting subheadline */
  subheadline?: string;
  /** Primary and optional secondary CTA */
  ctas?: HeroCTA[];
  /** Optional hero image displayed to the right on desktop */
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  /** Dark background variant */
  dark?: boolean;
  /** Center-aligned layout (default: left on desktop) */
  centered?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  ctas,
  image,
  dark = false,
  centered = false,
  className = "",
}: HeroSectionProps) {
  const bgClass = dark
    ? "bg-[var(--synup-color-bg-dark)] text-white"
    : "bg-[var(--synup-color-bg-surface)]";

  const contentClass = centered
    ? "flex flex-col items-center text-center max-w-[var(--synup-container-medium)] mx-auto"
    : image
    ? "flex flex-col justify-center lg:w-1/2"
    : "flex flex-col items-start max-w-[var(--synup-container-medium)]";

  return (
    <section
      className={[
        "section_header",
        bgClass,
        "py-[var(--synup-space-section-lg)] overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        <div
          className={[
            "flex gap-[var(--synup-space-48)]",
            image ? "lg:flex-row flex-col items-center" : "flex-col",
            centered ? "items-center" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Text content */}
          <div className={contentClass}>
            {eyebrow && (
              <span className="inline-block mb-[var(--synup-space-16)] px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
                {eyebrow}
              </span>
            )}

            <Heading
              as="h1"
              className={[
                "text-[var(--synup-color-primary-text)]",
                "mb-[var(--synup-space-24)]",
              ].join(" ")}
            >
              {headline}
            </Heading>

            {subheadline && (
              <p className="text-[var(--synup-font-size-medium)] leading-[var(--synup-line-height-relaxed)] text-[var(--synup-color-secondary-text)] mb-[var(--synup-space-32)] m-0">
                {subheadline}
              </p>
            )}

            {ctas && ctas.length > 0 && (
              <div className="flex flex-wrap gap-[var(--synup-space-16)] mt-[var(--synup-space-8)]">
                {ctas.map((cta, i) => (
                  <Button
                    key={i}
                    href={cta.href}
                    variant={cta.variant ?? (i === 0 ? "primary" : "secondary")}
                    size="lg"
                    external={cta.external}
                  >
                    {cta.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Optional image */}
          {image && (
            <div className="lg:w-1/2 w-full flex items-center justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 640}
                height={image.height ?? 480}
                className="w-full h-auto object-contain max-h-[500px]"
                priority
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
