/**
 * VideoEmbed — Embedded video with description.
 * Matches Webflow section: .section_video, .video-embed
 *
 * Security: embedUrl is validated to allow only YouTube/Vimeo embeds.
 */

import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface VideoEmbedProps {
  eyebrow?: string;
  headline?: string;
  description?: string;
  /** YouTube embed URL (https://www.youtube.com/embed/...) or Vimeo */
  embedUrl: string;
  /** Video title for accessibility */
  title: string;
  /** Aspect ratio (default 16/9) */
  aspectRatio?: "16/9" | "4/3" | "1/1";
  className?: string;
}

/* ─── URL validation ──────────────────────────────────────────────────────── */

function isSafeEmbedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const allowedHosts = [
      "www.youtube.com",
      "youtube.com",
      "player.vimeo.com",
      "vimeo.com",
      "www.loom.com",
    ];
    return (
      (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      allowedHosts.includes(parsed.hostname)
    );
  } catch {
    return false;
  }
}

const aspectPaddingMap = {
  "16/9": "pb-[56.25%]",
  "4/3": "pb-[75%]",
  "1/1": "pb-[100%]",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function VideoEmbed({
  eyebrow,
  headline,
  description,
  embedUrl,
  title,
  aspectRatio = "16/9",
  className = "",
}: VideoEmbedProps) {
  const safe = isSafeEmbedUrl(embedUrl);

  return (
    <section
      className={[
        "section_video",
        "bg-white",
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="medium">
        {(eyebrow || headline || description) && (
          <div className="text-center mb-[var(--synup-space-48)]">
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
            {description && (
              <Text size="medium" className="text-[var(--synup-color-secondary-text)] m-0">
                {description}
              </Text>
            )}
          </div>
        )}

        <div
          className={[
            `relative w-full ${aspectPaddingMap[aspectRatio]}`,
            "rounded-[var(--synup-radius-lg)] overflow-hidden shadow-[var(--synup-shadow-card-lg)]",
          ].join(" ")}
        >
          {safe ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <p className="text-[var(--synup-color-secondary-text)]">
                Video unavailable — invalid embed URL.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
