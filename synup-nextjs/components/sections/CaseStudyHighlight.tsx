/**
 * CaseStudyHighlight — Featured case study with metrics and quote.
 * Matches Webflow section: .section_case-study, .case-study-highlight
 */

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyHighlightProps {
  eyebrow?: string;
  headline?: string;
  customerName: string;
  customerTitle?: string;
  customerCompany?: string;
  quote?: string;
  metrics?: CaseStudyMetric[];
  logo?: {
    src: string;
    alt: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  cta?: {
    label: string;
    href: string;
  };
  dark?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function CaseStudyHighlight({
  eyebrow,
  headline,
  customerName,
  customerTitle,
  customerCompany,
  quote,
  metrics,
  logo,
  image,
  cta,
  dark = false,
  className = "",
}: CaseStudyHighlightProps) {
  const bgClass = dark
    ? "bg-[var(--synup-color-bg-dark)] text-white"
    : "bg-[var(--synup-color-bg-surface)]";

  return (
    <section
      className={[
        "section_case-study",
        bgClass,
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        {(eyebrow || headline) && (
          <div className="mb-[var(--synup-space-48)]">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--synup-space-64)] items-center">
          {/* Left: metrics + quote */}
          <div className="flex flex-col gap-[var(--synup-space-32)]">
            {/* Metrics */}
            {metrics && metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-[var(--synup-space-24)]">
                {metrics.map((m, i) => (
                  <div key={i} className="flex flex-col gap-[var(--synup-space-4)]">
                    <span className="text-[var(--synup-font-size-h3)] font-[var(--synup-font-weight-bold)] text-[var(--synup-color-action-bg)]">
                      {m.value}
                    </span>
                    <span className={["text-[var(--synup-font-size-small)]", dark ? "text-white/70" : "text-[var(--synup-color-secondary-text)]"].join(" ")}>
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Quote */}
            {quote && (
              <blockquote className="border-l-4 border-[var(--synup-color-action-bg)] pl-[var(--synup-space-24)] m-0">
                <p className={["text-[var(--synup-font-size-medium)] leading-[var(--synup-line-height-relaxed)] italic m-0", dark ? "text-white/90" : "text-[var(--synup-color-primary-text)]"].join(" ")}>
                  &ldquo;{quote}&rdquo;
                </p>
                <footer className="mt-[var(--synup-space-16)]">
                  <p className={["font-[var(--synup-font-weight-semibold)] m-0 text-[var(--synup-font-size-small)]", dark ? "text-white" : "text-[var(--synup-color-primary-text)]"].join(" ")}>
                    {customerName}
                  </p>
                  {(customerTitle || customerCompany) && (
                    <p className={["text-[var(--synup-font-size-tiny)] m-0", dark ? "text-white/60" : "text-[var(--synup-color-secondary-text)]"].join(" ")}>
                      {[customerTitle, customerCompany].filter(Boolean).join(", ")}
                    </p>
                  )}
                </footer>
              </blockquote>
            )}

            {/* Logo + CTA */}
            <div className="flex items-center gap-[var(--synup-space-24)] flex-wrap">
              {logo && (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="object-contain h-8 w-auto"
                />
              )}
              {cta && (
                <Button href={cta.href} variant={dark ? "secondary" : "primary"} size="sm">
                  {cta.label}
                </Button>
              )}
            </div>
          </div>

          {/* Right: image */}
          {image && (
            <div className="rounded-[var(--synup-radius-lg)] overflow-hidden shadow-[var(--synup-shadow-card-lg)]">
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={480}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
