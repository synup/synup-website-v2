/**
 * Card — Synup design system atomic component
 * Slot-based: image, badge, title, body, cta
 * Matches Webflow card surface style: white background, border-radius, shadow
 */

import Image from "next/image";
import type { ReactNode } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface CardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CardProps {
  /** Optional top image slot */
  image?: CardImageProps;
  /** Optional badge/label above the title */
  badge?: ReactNode;
  /** Card heading text */
  title?: string;
  /** Card body content — string or rich React nodes */
  body?: ReactNode;
  /** Optional footer CTA slot */
  cta?: ReactNode;
  /** Surface style: default (white) or muted (grey) */
  surface?: "default" | "muted" | "dark";
  className?: string;
}

/* ─── Style maps ─────────────────────────────────────────────────────────── */

const surfaceClasses: Record<NonNullable<CardProps["surface"]>, string> = {
  default: "bg-[var(--synup-color-card-surface)]",
  muted: "bg-[var(--synup-color-tint-grey)]",
  dark: "bg-[var(--synup-color-bg-dark)] text-white",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function Card({
  image,
  badge,
  title,
  body,
  cta,
  surface = "default",
  className = "",
}: CardProps) {
  return (
    <article
      className={[
        "flex flex-col",
        "rounded-[var(--synup-radius-md)]",
        "overflow-hidden",
        "shadow-[var(--synup-shadow-card)]",
        surfaceClasses[surface],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Image slot */}
      {image && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-[var(--synup-space-16)] p-[var(--synup-space-24)] flex-1">
        {badge && <div>{badge}</div>}

        {title && (
          <h3 className="text-[var(--synup-font-size-h4)] font-[var(--synup-font-weight-bold)] leading-[1.4] m-0">
            {title}
          </h3>
        )}

        {body && (
          <div className="text-[var(--synup-font-size-regular)] font-[var(--synup-font-weight-normal)] leading-[var(--synup-line-height-body)] flex-1">
            {body}
          </div>
        )}

        {cta && <div className="mt-auto pt-[var(--synup-space-8)]">{cta}</div>}
      </div>
    </article>
  );
}
