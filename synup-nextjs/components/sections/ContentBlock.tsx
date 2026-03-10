/**
 * ContentBlock — Rich text content with optional sidebar or split layout.
 * Matches Webflow section: .section_content, .content-block, .layout-2col
 *
 * Security: richText.html is assumed pre-sanitized by the transform script.
 * Do NOT pass unsanitized user input to this component.
 */

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface ContentBlockProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  /** Pre-sanitized HTML body — comes from content layer transform script */
  bodyHtml?: string;
  /** Plain text body (alternative to HTML) */
  bodyText?: string;
  /** Optional image alongside the content */
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  /** Image position relative to text */
  imagePosition?: "left" | "right" | "top";
  cta?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "link";
    external?: boolean;
  };
  dark?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function ContentBlock({
  eyebrow,
  headline,
  subheadline,
  bodyHtml,
  bodyText,
  image,
  imagePosition = "right",
  cta,
  dark = false,
  className = "",
}: ContentBlockProps) {
  const bgClass = dark
    ? "bg-[var(--synup-color-bg-dark)] text-white"
    : "bg-white";

  const hasImage = Boolean(image);
  const reverseOnDesktop = hasImage && imagePosition === "left";

  return (
    <section
      className={[
        "section_content",
        bgClass,
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        <div
          className={[
            "flex gap-[var(--synup-space-64)]",
            hasImage
              ? `flex-col lg:flex-row items-center${reverseOnDesktop ? " lg:flex-row-reverse" : ""}`
              : "flex-col max-w-[var(--synup-container-medium)] mx-auto",
          ].join(" ")}
        >
          {/* Text */}
          <div className={hasImage ? "flex-1 flex flex-col gap-[var(--synup-space-24)]" : "flex flex-col gap-[var(--synup-space-24)]"}>
            {eyebrow && (
              <span className="inline-block w-fit px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
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
            {subheadline && (
              <Text
                size="medium"
                className={[
                  "m-0",
                  dark ? "text-white/70" : "text-[var(--synup-color-secondary-text)]",
                ].join(" ")}
              >
                {subheadline}
              </Text>
            )}
            {bodyText && (
              <Text
                className={[
                  "m-0",
                  dark ? "text-white/70" : "text-[var(--synup-color-secondary-text)]",
                ].join(" ")}
              >
                {bodyText}
              </Text>
            )}
            {/* Pre-sanitized HTML from content layer */}
            {bodyHtml && (
              <div
                className={[
                  "prose max-w-none",
                  "text-[var(--synup-font-size-regular)] leading-[var(--synup-line-height-relaxed)]",
                  dark ? "text-white/70 prose-invert" : "text-[var(--synup-color-secondary-text)]",
                ].join(" ")}
                // Security note: bodyHtml is pre-sanitized by scripts/transform-cms.py.
                // Only whitelisted HTML tags are retained; no scripts or event handlers.
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            )}
            {cta && (
              <div className="mt-[var(--synup-space-8)]">
                <Button
                  href={cta.href}
                  variant={cta.variant ?? "primary"}
                  external={cta.external}
                >
                  {cta.label}
                </Button>
              </div>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className="lg:w-5/12 w-full flex-shrink-0">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 560}
                height={image.height ?? 420}
                className="w-full h-auto object-contain rounded-[var(--synup-radius-md)]"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
