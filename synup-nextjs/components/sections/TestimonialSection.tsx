/**
 * TestimonialSection — Customer quotes with logos/photos.
 * Matches Webflow section: .section_testimonials, .testimonials-wrapper
 */

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface TestimonialItem {
  /** Reviewer name */
  name: string;
  /** Title / role */
  title?: string;
  /** Company name */
  company?: string;
  /** Quote text */
  quote: string;
  /** Star rating 1-5 */
  rating?: number;
  /** Avatar image */
  avatar?: {
    src: string;
    alt: string;
  };
  /** Source platform label (e.g. G2, Capterra) */
  source?: string;
}

export interface TestimonialSectionProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  testimonials: TestimonialItem[];
  /** Layout: 'grid' (cards) or 'featured' (single large quote) */
  layout?: "grid" | "featured";
  dark?: boolean;
  className?: string;
}

/* ─── Star Rating ─────────────────────────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < rating ? "#f59e0b" : "#e5e7eb"}
          aria-hidden="true"
        >
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.12L8 10.5l-3.71 1.96L5 8.42 2 5.5l4.15-.75L8 1z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function TestimonialSection({
  eyebrow,
  headline,
  subheadline,
  testimonials,
  layout = "grid",
  dark = false,
  className = "",
}: TestimonialSectionProps) {
  const bgClass = dark
    ? "bg-[var(--synup-color-bg-dark)] text-white"
    : "bg-[var(--synup-color-bg-surface)]";

  if (layout === "featured" && testimonials.length > 0) {
    const t = testimonials[0];
    return (
      <section
        className={["section_testimonials", bgClass, "py-[var(--synup-space-section)]", className]
          .filter(Boolean)
          .join(" ")}
      >
        <Container size="medium">
          <div className="text-center">
            {eyebrow && (
              <span className="inline-block mb-[var(--synup-space-12)] px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
                {eyebrow}
              </span>
            )}
            {t.rating && <StarRating rating={t.rating} />}
            <blockquote className="mt-[var(--synup-space-24)] text-[var(--synup-font-size-h3)] font-[var(--synup-font-weight-semibold)] leading-[1.3] text-[var(--synup-color-primary-text)] max-w-[800px] mx-auto">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-[var(--synup-space-24)] flex items-center justify-center gap-[var(--synup-space-12)]">
              {t.avatar && (
                <Image
                  src={t.avatar.src}
                  alt={t.avatar.alt}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              )}
              <div className="text-left">
                <p className="font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-primary-text)] m-0">
                  {t.name}
                </p>
                {(t.title || t.company) && (
                  <p className="text-[var(--synup-font-size-small)] text-[var(--synup-color-secondary-text)] m-0">
                    {[t.title, t.company].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      className={["section_testimonials", bgClass, "py-[var(--synup-space-section)]", className]
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--synup-space-24)]">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="bg-white rounded-[var(--synup-radius-md)] p-[var(--synup-space-32)] shadow-[var(--synup-shadow-card)] flex flex-col gap-[var(--synup-space-16)]"
            >
              {t.rating && <StarRating rating={t.rating} />}
              <blockquote className="flex-1 text-[var(--synup-color-primary-text)] text-[var(--synup-font-size-regular)] leading-[var(--synup-line-height-relaxed)] m-0">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-[var(--synup-space-12)] pt-[var(--synup-space-16)] border-t border-gray-100">
                {t.avatar && (
                  <Image
                    src={t.avatar.src}
                    alt={t.avatar.alt}
                    width={40}
                    height={40}
                    className="rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div>
                  <p className="font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-primary-text)] text-[var(--synup-font-size-small)] m-0">
                    {t.name}
                  </p>
                  {(t.title || t.company) && (
                    <p className="text-[var(--synup-font-size-tiny)] text-[var(--synup-color-secondary-text)] m-0">
                      {[t.title, t.company].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
                {t.source && (
                  <span className="ml-auto text-[var(--synup-font-size-tiny)] text-[var(--synup-color-secondary-text)]">
                    {t.source}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
