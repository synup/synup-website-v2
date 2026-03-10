/**
 * Footer — Synup site footer component
 * Contains: logo, link columns, locale switcher, legal text
 * Webflow traceability: .footer_component
 * Security: no inline handlers, typed props only, no hardcoded URLs
 */

import Image from "next/image";
import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Container } from "@/components/ui/Container";
import { Text, TextSpan } from "@/components/ui/Typography";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterProps {
  locale: string;
  columns: FooterLinkColumn[];
  /** Copyright year — defaults to current year */
  copyrightYear?: number;
  /** Legal links row (privacy, terms) */
  legalLinks?: FooterLink[];
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function Footer({
  locale,
  columns,
  copyrightYear = new Date().getFullYear(),
  legalLinks = [],
  className = "",
}: FooterProps) {
  return (
    <footer
      className={[
        "bg-[var(--synup-color-bg-dark)] text-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Site footer"
    >
      {/* ── Main footer grid ── */}
      <Container size="large" padded>
        <div className="py-[var(--synup-section-padding-medium)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[var(--synup-space-40)]">
            {/* ── Brand column ── */}
            <div className="lg:col-span-1 flex flex-col gap-[var(--synup-space-24)]">
              <Link
                href={locale === "en" ? "/" : `/${locale}`}
                aria-label="Synup — home"
                className="no-underline block"
              >
                <Image
                  src="/assets/images/synup-logo-white.svg"
                  alt="Synup"
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>

              <LocaleSwitcher
                currentLocale={locale}
                compact={false}
                className="flex-wrap"
              />
            </div>

            {/* ── Link columns ── */}
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-[var(--synup-space-16)]">
                <TextSpan
                  size="small"
                  weight="semibold"
                  className="text-white uppercase tracking-widest"
                >
                  {col.heading}
                </TextSpan>
                <ul role="list" className="flex flex-col gap-[var(--synup-space-12)] list-none p-0 m-0">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[var(--synup-font-size-small)] text-[var(--synup-color-inverted-text)] hover:text-white transition-colors duration-200 no-underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* ── Legal row ── */}
      <div className="border-t border-white/10">
        <Container size="large" padded>
          <div className="py-[var(--synup-space-24)] flex flex-col sm:flex-row items-center justify-between gap-[var(--synup-space-16)]">
            <TextSpan
              size="tiny"
              className="text-[var(--synup-color-inverted-text)]"
            >
              &copy; {copyrightYear} Synup, Inc. All rights reserved.
            </TextSpan>
            {legalLinks.length > 0 && (
              <ul
                role="list"
                className="flex items-center gap-[var(--synup-space-16)] list-none p-0 m-0"
              >
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--synup-font-size-tiny)] text-[var(--synup-color-inverted-text)] hover:text-white transition-colors duration-200 no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </div>
    </footer>
  );
}
