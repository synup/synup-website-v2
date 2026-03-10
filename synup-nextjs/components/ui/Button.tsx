/**
 * Button — Synup design system atomic component
 * Matches Webflow classes: .button, .button.is-secondary, .button.is-text, .button.is-tertiary
 * Variants: primary | secondary | ghost | link
 * Sizes: sm | md | lg
 */

import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as <a> when an href is provided */
  href?: string;
  /** Open link in new tab — only applies when href is set */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/* ─── Style maps ─────────────────────────────────────────────────────────── */

const variantClasses: Record<ButtonVariant, string> = {
  /** .button — primary CTA (blue filled) */
  primary: [
    "bg-[var(--synup-color-action-bg)] text-white",
    "hover:bg-[var(--synup-color-action-hover)]",
    "shadow-[var(--synup-shadow-button)]",
    "rounded-[var(--synup-radius-md)]",
  ].join(" "),

  /** .button.is-secondary — outlined blue */
  secondary: [
    "border border-[var(--synup-color-action-bg)]",
    "bg-white text-[var(--synup-color-action-text)]",
    "hover:bg-[var(--synup-color-action-bg)] hover:text-white",
    "rounded-[var(--synup-radius-md)]",
  ].join(" "),

  /** .button.is-text — text-only with transparent bg (ghost) */
  ghost: [
    "bg-transparent border-2 border-transparent text-black",
    "hover:border-[var(--synup-color-action-bg)]",
    "rounded-[var(--synup-radius-md)]",
  ].join(" "),

  /** .button.is-tertiary — link style with no background */
  link: [
    "bg-transparent text-[var(--synup-color-action-text)]",
    "hover:gap-3 underline-offset-2 hover:underline",
    "rounded-none p-0 shadow-none",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-[var(--synup-font-size-small)]",
  md: "px-[1.125rem] py-3 text-[var(--synup-font-size-small)]",
  lg: "px-8 py-4 text-[var(--synup-font-size-regular)]",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    href,
    external,
    className = "",
    children,
    ...rest
  } = props;

  const baseClasses = [
    "inline-flex items-center justify-center",
    "font-[var(--synup-font-weight-medium)] tracking-[-0.01em]",
    "transition-all duration-300",
    "cursor-pointer",
    "leading-[var(--synup-line-height-tight)]",
    "no-underline",
    variantClasses[variant],
    variant !== "link" ? sizeClasses[size] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const anchorRest = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
    return (
      <a
        href={href}
        className={baseClasses}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={baseClasses} {...buttonRest}>
      {children}
    </button>
  );
}
