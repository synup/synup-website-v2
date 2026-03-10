/**
 * LocaleSwitcher — Synup locale selector component
 * Used in Header and Footer.
 * Uses next-intl's Link with locale prop for proper locale switching.
 * Security: no inline handlers, all navigation via typed hrefs.
 */

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface LocaleOption {
  code: string;
  label: string;
  /** Native-language short label for display */
  nativeLabel: string;
}

export interface LocaleSwitcherProps {
  currentLocale: string;
  locales?: LocaleOption[];
  /** Compact: show only native label (default) or full label */
  compact?: boolean;
  className?: string;
}

/* ─── Default locale options (all 4 supported locales) ──────────────────── */

export const DEFAULT_LOCALES: LocaleOption[] = [
  { code: "en", label: "English", nativeLabel: "EN" },
  { code: "de", label: "Deutsch", nativeLabel: "DE" },
  { code: "fr", label: "Français", nativeLabel: "FR" },
  { code: "es", label: "Español", nativeLabel: "ES" },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function LocaleSwitcher({
  currentLocale,
  locales = DEFAULT_LOCALES,
  compact = true,
  className = "",
}: LocaleSwitcherProps) {
  const pathname = usePathname();

  // Strip the locale prefix from the pathname to get the base path
  const pathWithoutLocale = pathname.replace(/^\/(en|de|fr|es)(\/|$)/, "/") || "/";

  return (
    <div
      role="navigation"
      aria-label="Language selector"
      className={[
        "flex items-center gap-[var(--synup-space-8)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {locales.map((locale) => {
        const isCurrent = locale.code === currentLocale;
        const targetPath =
          locale.code === "en"
            ? pathWithoutLocale
            : `/${locale.code}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

        return isCurrent ? (
          <span
            key={locale.code}
            aria-current="true"
            className={[
              "text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-semibold)]",
              "text-[var(--synup-color-action-text)]",
              "cursor-default",
            ].join(" ")}
          >
            {compact ? locale.nativeLabel : locale.label}
          </span>
        ) : (
          <Link
            key={locale.code}
            href={targetPath}
            className={[
              "text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)]",
              "text-[var(--synup-color-secondary-text)]",
              "hover:text-[var(--synup-color-action-text)] transition-colors duration-200",
              "no-underline",
            ].join(" ")}
          >
            {compact ? locale.nativeLabel : locale.label}
          </Link>
        );
      })}
    </div>
  );
}
