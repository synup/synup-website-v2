/**
 * Typography — Synup design system atomic component
 * Provides semantic heading and body text components with correct token mapping.
 * Matches Webflow classes: .heading-style-h1 through .heading-style-h6,
 * .text-size-regular, .text-size-small, .text-size-large, .text-size-medium,
 * .text-size-tiny, .text-style-muted
 */

import type { HTMLAttributes, ReactNode } from "react";

/* ─── Heading ─────────────────────────────────────────────────────────────── */

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  children: ReactNode;
  /** Render with the visual style of a different level while keeping semantic tag */
  visualLevel?: HeadingLevel;
  className?: string;
}

const headingTokenClasses: Record<HeadingLevel, string> = {
  h1: [
    "text-[var(--synup-font-size-h1)]",
    "font-[var(--synup-font-weight-bold)]",
    "leading-[var(--synup-line-height-heading)]",
    "tracking-[var(--synup-letter-spacing-normal)]",
  ].join(" "),
  h2: [
    "text-[var(--synup-font-size-h2)]",
    "font-[var(--synup-font-weight-semibold)]",
    "leading-[var(--synup-line-height-heading)]",
    "tracking-[var(--synup-letter-spacing-normal)]",
  ].join(" "),
  h3: [
    "text-[var(--synup-font-size-h3)]",
    "font-[var(--synup-font-weight-semibold)]",
    "leading-[var(--synup-line-height-h3)]",
  ].join(" "),
  h4: [
    "text-[var(--synup-font-size-h4)]",
    "font-[var(--synup-font-weight-bold)]",
    "leading-[1.4]",
  ].join(" "),
  h5: [
    "text-[var(--synup-font-size-h5)]",
    "font-[var(--synup-font-weight-bold)]",
    "leading-[1.5]",
  ].join(" "),
  h6: [
    "text-[var(--synup-font-size-h6)]",
    "font-[var(--synup-font-weight-bold)]",
    "leading-[1.5]",
  ].join(" "),
};

export function Heading({
  as: Tag = "h2",
  visualLevel,
  children,
  className = "",
  ...rest
}: HeadingProps) {
  const styleLevel = visualLevel ?? Tag;
  return (
    <Tag
      className={["m-0", headingTokenClasses[styleLevel], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ─── Text ───────────────────────────────────────────────────────────────── */

export type TextSize = "tiny" | "small" | "regular" | "medium" | "large" | "xlarge";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize;
  weight?: TextWeight;
  muted?: boolean;
  children: ReactNode;
  className?: string;
}

const textSizeClasses: Record<TextSize, string> = {
  tiny: "text-[var(--synup-font-size-tiny)] leading-[var(--synup-line-height-snug)]",
  small: "text-[var(--synup-font-size-small)] leading-[var(--synup-line-height-tight)]",
  regular: "text-[var(--synup-font-size-regular)] leading-[var(--synup-line-height-body)]",
  medium: "text-[var(--synup-font-size-medium)] leading-[var(--synup-line-height-relaxed)]",
  large: "text-[var(--synup-font-size-large)] leading-[var(--synup-line-height-loose)]",
  xlarge: "text-[var(--synup-font-size-xlarge)] leading-[var(--synup-line-height-loose)]",
};

const textWeightClasses: Record<TextWeight, string> = {
  normal: "font-[var(--synup-font-weight-normal)]",
  medium: "font-[var(--synup-font-weight-medium)]",
  semibold: "font-[var(--synup-font-weight-semibold)]",
  bold: "font-[var(--synup-font-weight-bold)]",
};

/** Renders as a <p> tag by default. Use as a CSS-class source for custom elements. */
export function Text({
  size = "regular",
  weight = "normal",
  muted = false,
  children,
  className = "",
  ...rest
}: TextProps) {
  return (
    <p
      className={[
        textSizeClasses[size],
        textWeightClasses[weight],
        muted ? "opacity-60" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </p>
  );
}

/* ─── Span — inline text with same style API ─────────────────────────────── */

export interface TextSpanProps extends HTMLAttributes<HTMLSpanElement> {
  size?: TextSize;
  weight?: TextWeight;
  muted?: boolean;
  children: ReactNode;
  className?: string;
}

export function TextSpan({
  size = "regular",
  weight = "normal",
  muted = false,
  children,
  className = "",
  ...rest
}: TextSpanProps) {
  return (
    <span
      className={[
        textSizeClasses[size],
        textWeightClasses[weight],
        muted ? "opacity-60" : "",
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

/* ─── Caption ─────────────────────────────────────────────────────────────── */

export interface CaptionProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

export function Caption({ children, className = "", ...rest }: CaptionProps) {
  return (
    <span
      className={[
        textSizeClasses.tiny,
        textWeightClasses.normal,
        "opacity-60",
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
