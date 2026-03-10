/**
 * CardGrid — Cards arranged in a grid (blog posts, case studies, resources, etc.)
 * Matches Webflow section: .section_cards, .card-grid, .resources-grid
 */

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface CardGridItem {
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  badge?: string;
  href: string;
  /** Optional date string */
  date?: string;
  /** Optional author name */
  author?: string;
  /** Optional category label */
  category?: string;
  ctaLabel?: string;
}

export interface CardGridProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  items: CardGridItem[];
  columns?: 2 | 3 | 4;
  /** Optional "view all" link */
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

const colClasses: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function CardGrid({
  eyebrow,
  headline,
  subheadline,
  items,
  columns = 3,
  viewAllHref,
  viewAllLabel = "View All",
  className = "",
}: CardGridProps) {
  return (
    <section
      className={[
        "section_cards",
        "bg-[var(--synup-color-bg-surface)]",
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        {(eyebrow || headline || subheadline) && (
          <div className="mb-[var(--synup-space-48)]">
            {eyebrow && (
              <span className="inline-block mb-[var(--synup-space-12)] px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
                {eyebrow}
              </span>
            )}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[var(--synup-space-16)]">
              <div>
                {headline && (
                  <Heading as="h2" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-8)]">
                    {headline}
                  </Heading>
                )}
                {subheadline && (
                  <Text size="medium" className="text-[var(--synup-color-secondary-text)] m-0">
                    {subheadline}
                  </Text>
                )}
              </div>
              {viewAllHref && (
                <Button href={viewAllHref} variant="secondary" size="sm" className="flex-shrink-0">
                  {viewAllLabel}
                </Button>
              )}
            </div>
          </div>
        )}

        <div className={`grid ${colClasses[columns]} gap-[var(--synup-space-24)]`}>
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="group flex flex-col bg-white rounded-[var(--synup-radius-md)] overflow-hidden shadow-[var(--synup-shadow-card)] hover:shadow-[var(--synup-shadow-card-lg)] transition-shadow no-underline"
            >
              {item.image && (
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-col gap-[var(--synup-space-12)] p-[var(--synup-space-24)] flex-1">
                {item.badge && (
                  <Badge variant="brand">{item.badge}</Badge>
                )}
                {item.category && (
                  <span className="text-[var(--synup-font-size-tiny)] uppercase tracking-wide font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-action-bg)]">
                    {item.category}
                  </span>
                )}
                <h3 className="text-[var(--synup-font-size-h4)] font-[var(--synup-font-weight-bold)] text-[var(--synup-color-primary-text)] leading-[1.3] m-0 group-hover:text-[var(--synup-color-action-bg)] transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-[var(--synup-font-size-small)] text-[var(--synup-color-secondary-text)] leading-[var(--synup-line-height-relaxed)] m-0 flex-1 line-clamp-3">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-auto pt-[var(--synup-space-8)]">
                  {item.date && (
                    <span className="text-[var(--synup-font-size-tiny)] text-[var(--synup-color-secondary-text)]">
                      {item.date}
                    </span>
                  )}
                  <span className="text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] text-[var(--synup-color-action-bg)] ml-auto">
                    {item.ctaLabel ?? "Read More"} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
