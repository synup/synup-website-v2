/**
 * Nav — Synup navigation component
 * Supports: mobile hamburger + desktop horizontal nav with optional dropdowns
 * Webflow traceability: navbar component
 * Security: no inline handlers, all links via typed props
 *
 * Important: Next.js App Router `Link` does NOT support a `locale` prop.
 * All hrefs in NavItem must be fully-qualified locale-aware paths,
 * e.g. "/pricing" (en default), "/de/preise", "/fr/tarifs".
 * The `locale` prop on NavProps is for reference / aria labels only.
 */

"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface NavItem {
  label: string;
  /** Fully-qualified locale-aware path e.g. "/pricing" or "/de/preise" */
  href: string;
  children?: NavItem[];
  /** Mark as active (passed from page context) */
  active?: boolean;
}

export interface NavProps {
  items: NavItem[];
  locale: string;
  onMobileToggle?: (open: boolean) => void;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function Nav({ items, className = "" }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className={className}>
      {/* ── Desktop nav (hidden on mobile) ── */}
      <ul
        role="list"
        className="hidden md:flex items-center gap-[var(--synup-space-32)] list-none p-0 m-0"
      >
        {items.map((item) => (
          <NavItemDesktop key={item.href} item={item} />
        ))}
      </ul>

      {/* ── Mobile hamburger button ── */}
      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav-menu"
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMobileOpen((prev) => !prev)}
        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 cursor-pointer bg-transparent border-none p-1"
      >
        <span
          className={[
            "block w-5 h-[2px] bg-current transition-transform duration-200",
            mobileOpen ? "translate-y-[7px] rotate-45" : "",
          ].join(" ")}
        />
        <span
          className={[
            "block w-5 h-[2px] bg-current transition-opacity duration-200",
            mobileOpen ? "opacity-0" : "",
          ].join(" ")}
        />
        <span
          className={[
            "block w-5 h-[2px] bg-current transition-transform duration-200",
            mobileOpen ? "-translate-y-[7px] -rotate-45" : "",
          ].join(" ")}
        />
      </button>

      {/* ── Mobile nav drawer ── */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden absolute top-full left-0 w-full bg-[var(--synup-color-bg-surface)] border-t border-[var(--synup-color-tint-blue)] shadow-[var(--synup-shadow-card)] z-50"
        >
          <ul
            role="list"
            className="flex flex-col list-none p-0 m-0 py-[var(--synup-space-16)]"
          >
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "block px-[var(--synup-padding-global)] py-[var(--synup-space-12)]",
                    "text-[var(--synup-font-size-regular)] font-[var(--synup-font-weight-medium)]",
                    "text-[var(--synup-color-primary-text)]",
                    "hover:text-[var(--synup-color-action-text)] transition-colors duration-200",
                    item.active ? "text-[var(--synup-color-action-text)]" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul
                    role="list"
                    className="list-none p-0 m-0 pl-[var(--synup-space-32)]"
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-[var(--synup-padding-global)] py-[var(--synup-space-8)] text-[var(--synup-font-size-small)] text-[var(--synup-color-secondary-text)] hover:text-[var(--synup-color-action-text)] transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

/* ─── Desktop nav item (with optional dropdown) ──────────────────────────── */

function NavItemDesktop({ item }: { item: NavItem }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (item.children && item.children.length > 0) {
    return (
      <li
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button
          type="button"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          className={[
            "flex items-center gap-[var(--synup-space-4)]",
            "text-[var(--synup-font-size-regular)] font-[var(--synup-font-weight-medium)]",
            "bg-transparent border-none cursor-pointer p-0",
            "text-[var(--synup-color-primary-text)] hover:text-[var(--synup-color-action-text)]",
            "transition-colors duration-200",
            item.active ? "text-[var(--synup-color-action-text)]" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {item.label}
          <span aria-hidden="true" className="text-xs leading-none">
            ▾
          </span>
        </button>
        {dropdownOpen && (
          <ul
            role="list"
            className="absolute top-full left-0 min-w-[12rem] bg-white rounded-[var(--synup-radius-md)] shadow-[var(--synup-shadow-card)] py-[var(--synup-space-8)] z-50 list-none m-0 p-0"
          >
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block px-[var(--synup-space-16)] py-[var(--synup-space-8)] text-[var(--synup-font-size-small)] text-[var(--synup-color-primary-text)] hover:text-[var(--synup-color-action-text)] hover:bg-[var(--synup-color-tint-grey)] transition-colors duration-200"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className={[
          "text-[var(--synup-font-size-regular)] font-[var(--synup-font-weight-medium)]",
          "text-[var(--synup-color-primary-text)] hover:text-[var(--synup-color-action-text)]",
          "transition-colors duration-200 no-underline",
          item.active ? "text-[var(--synup-color-action-text)]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-current={item.active ? "page" : undefined}
      >
        {item.label}
      </Link>
    </li>
  );
}
