/**
 * Container — Synup design system layout wrapper
 * Matches Webflow classes: .container-large (74.5rem), .container-medium (64rem),
 * .container-small (48rem), .padding-global (horizontal 2.5rem)
 */

import type { ElementType, HTMLAttributes, ReactNode } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type ContainerSize = "small" | "medium" | "large" | "xlarge" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: ContainerSize;
  /** Apply padding-global (2.5rem horizontal padding) — default true */
  padded?: boolean;
  children: ReactNode;
  className?: string;
}

/* ─── Style maps ─────────────────────────────────────────────────────────── */

const sizeClasses: Record<ContainerSize, string> = {
  small: "max-w-[var(--synup-container-small)]",
  medium: "max-w-[var(--synup-container-medium)]",
  large: "max-w-[var(--synup-container-large)]",
  xlarge: "max-w-[var(--synup-container-xlarge)]",
  full: "max-w-none",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function Container({
  as: Tag = "div",
  size = "large",
  padded = true,
  children,
  className = "",
  ...rest
}: ContainerProps) {
  const TagElement = Tag as ElementType;
  return (
    <TagElement
      className={[
        "w-full mx-auto",
        sizeClasses[size],
        padded ? "px-[var(--synup-padding-global)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </TagElement>
  );
}
