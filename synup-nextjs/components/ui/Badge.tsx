/**
 * Badge — Synup design system atomic component
 * Matches Webflow classes: .fs-styleguide_label, status/system colors
 * Variants: default | success | warning | error | brand
 */

import type { HTMLAttributes } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type BadgeVariant = "default" | "success" | "warning" | "error" | "brand";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

/* ─── Style map ─────────────────────────────────────────────────────────── */

const variantClasses: Record<BadgeVariant, string> = {
  /** .fs-styleguide_label — brand blue pill */
  default: "bg-[var(--synup-color-brand-blue)] text-white",
  /** System success */
  success: "bg-[var(--synup-color-success-bg)] text-[var(--synup-color-success-text)]",
  /** System warning */
  warning: "bg-[var(--synup-color-warning-bg)] text-[var(--synup-color-warning-text)]",
  /** System error */
  error: "bg-[var(--synup-color-error-bg)] text-[var(--synup-color-error-text)]",
  /** Brand pink accent */
  brand: "bg-[var(--synup-color-brand-pink)] text-white",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function Badge({ variant = "default", children, className = "", ...rest }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center",
        "rounded-[var(--synup-radius-sm)]",
        "px-3 py-[0.3rem]",
        "text-[var(--synup-font-size-small)]",
        "font-[var(--synup-font-weight-semibold)]",
        "leading-none",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}
