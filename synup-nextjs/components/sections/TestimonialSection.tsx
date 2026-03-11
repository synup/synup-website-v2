import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

export interface TestimonialItem {
  name: string; title?: string; company?: string; quote: string; rating?: number;
  avatar?: { src: string; alt: string }; source?: string;
}
export interface AwardBadge { src: string; alt: string; width?: number; height?: number; }
export interface TestimonialSectionProps {
  eyebrow?: string; headline?: string; subheadline?: string;
  testimonials: TestimonialItem[]; layout?: "grid" | "featured";
  dark?: boolean; className?: string; awards?: AwardBadge[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i < rating ? "#f59e0b" : "#e5e7eb"}>
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.12L8 10.5l-3.71 1.96L5 8.42 2 5.5l4.15-.75L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialSection({ eyebrow, headline, subheadline, testimonials, layout = "grid", dark = false, className = "", awards }: TestimonialSectionProps) {
  const bgClass = dark ? "bg-[var(--synup-color-bg-dark)] text-white" : "bg-[var(--synup-color-bg-surface)]";
  return (
    <section className={["section_testimonials", bgClass, "py-[var(--synup-space-section)]", className].filter(Boolean).join(" ")}>
      <Container size="large">
        {(eyebrow || headline || subheadline) && (
          <div className="text-center max-w-[var(--synup-container-medium)] mx-auto mb-[var(--synup-space-64)]">
            {eyebrow && <span className="inline-block mb-[var(--synup-space-12)] px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">{eyebrow}</span>}
            {headline && <Heading as="h2" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-16)]">{headline}</Heading>}
            {subheadline && <Text size="medium" className="text-[var(--synup-color-secondary-text)] m-0">{subheadline}</Text>}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--synup-space-24)]">
          {testimonials.map((t, i) => (
            <article key={i} className="bg-white rounded-[var(--synup-radius-md)] p-[var(--synup-space-32)] shadow-[var(--synup-shadow-card)] flex flex-col gap-[var(--synup-space-16)]">
              {t.rating && <StarRating rating={t.rating} />}
              <blockquote className="flex-1 text-[var(--synup-color-primary-text)] text-[var(--synup-font-size-regular)] leading-[var(--synup-line-height-relaxed)] m-0">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-[var(--synup-space-12)] pt-[var(--synup-space-16)] border-t border-gray-100">
                {t.avatar && <Image src={t.avatar.src} alt={t.avatar.alt} width={40} height={40} className="rounded-full object-cover flex-shrink-0" unoptimized />}
                <div>
                  <p className="font-[var(--synup-font-weight-semibold)] text-[var(--synup-color-primary-text)] text-[var(--synup-font-size-small)] m-0">{t.name}</p>
                  {(t.title || t.company) && <p className="text-[var(--synup-font-size-tiny)] text-[var(--synup-color-secondary-text)] m-0">{[t.title, t.company].filter(Boolean).join(", ")}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
        {awards && awards.length > 0 && (
          <div style={{ marginTop: 56, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px 32px" }}>
            {awards.map((badge, i) => (
              <Image key={i} src={badge.src} alt={badge.alt} width={badge.width ?? 80} height={badge.height ?? 80} unoptimized style={{ height: 80, width: "auto", objectFit: "contain" }} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
