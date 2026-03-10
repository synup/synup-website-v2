/**
 * Header — Synup site header component
 * Contains: logo, primary nav, locale switcher placeholder, CTA button
 * Webflow traceability: .navbar_component
 * Mobile-first: hamburger on mobile, horizontal nav on desktop
 * Security: no inline handlers, typed props only
 */

import Image from "next/image";
import Link from "next/link";
import { Nav } from "./Nav";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { NavItem } from "./Nav";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface HeaderCTA {
  label: string;
  href: string;
}

export interface HeaderProps {
  locale: string;
  navItems: NavItem[];
  /** Primary CTA button in header — e.g. "Book a Demo" */
  cta?: HeaderCTA;
  /** Secondary CTA — e.g. "Sign In" */
  secondaryCta?: HeaderCTA;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function Header({
  locale,
  navItems,
  cta,
  secondaryCta,
  className = "",
}: HeaderProps) {
  return (
    <header
      className={[
        "sticky top-0 z-40",
        "bg-[var(--synup-color-bg-surface)]",
        "border-b border-[var(--synup-color-tint-blue)]",
        "backdrop-blur-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large" padded>
        <div className="relative flex items-center justify-between h-[4rem]">
          {/* ── Logo ── */}
          <Link
            href={locale === "en" ? "/" : `/${locale}`}
            aria-label="Synup — home"
            className="flex-shrink-0 no-underline"
          >
            <Image
              src="/assets/images/synup-logo.svg"
              alt="Synup"
              width={100}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* ── Desktop: nav + locale + CTAs ── */}
          <div className="hidden md:flex items-center gap-[var(--synup-space-32)]">
            <Nav items={navItems} locale={locale} />

            <div className="flex items-center gap-[var(--synup-space-16)]">
              <LocaleSwitcher currentLocale={locale} />

              {secondaryCta && (
                <Button href={secondaryCta.href} variant="ghost" size="sm">
                  {secondaryCta.label}
                </Button>
              )}

              {cta && (
                <Button href={cta.href} variant="primary" size="sm">
                  {cta.label}
                </Button>
              )}
            </div>
          </div>

          {/* ── Mobile: locale + hamburger ── */}
          <div className="flex md:hidden items-center gap-[var(--synup-space-16)]">
            <LocaleSwitcher currentLocale={locale} compact />
            {/* Hamburger is rendered inside Nav on mobile */}
            <Nav items={navItems} locale={locale} />
          </div>
        </div>
      </Container>
    </header>
  );
}
