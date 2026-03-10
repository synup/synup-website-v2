/**
 * ProductTabSection — Tab navigation with content panels for product pages.
 * Matches Webflow section: .section_tabs, .product-tabs
 *
 * Client component — uses useState for active tab.
 */

"use client";

import { useState } from "react";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface ProductTab {
  label: string;
  content: {
    headline: string;
    description: string;
    features?: string[];
    cta?: {
      label: string;
      href: string;
    };
    image?: {
      src: string;
      alt: string;
    };
  };
}

export interface ProductTabSectionProps {
  eyebrow?: string;
  headline?: string;
  tabs: ProductTab[];
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

import Image from "next/image";

export function ProductTabSection({
  eyebrow,
  headline,
  tabs,
  className = "",
}: ProductTabSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab];

  return (
    <section
      className={[
        "section_tabs",
        "bg-white",
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        {(eyebrow || headline) && (
          <div className="text-center mb-[var(--synup-space-48)]">
            {eyebrow && (
              <span className="inline-block mb-[var(--synup-space-12)] px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
                {eyebrow}
              </span>
            )}
            {headline && (
              <Heading as="h2" className="text-[var(--synup-color-primary-text)]">
                {headline}
              </Heading>
            )}
          </div>
        )}

        {/* Tab nav */}
        <div
          className="flex flex-wrap gap-[var(--synup-space-4)] border-b border-gray-200 mb-[var(--synup-space-48)]"
          role="tablist"
        >
          {tabs.map((tab, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeTab}
              aria-controls={`tab-panel-${i}`}
              id={`tab-${i}`}
              onClick={() => setActiveTab(i)}
              className={[
                "px-[var(--synup-space-20)] py-[var(--synup-space-12)] text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] transition-all",
                "rounded-t-[var(--synup-radius-sm)] border-b-2 -mb-px",
                i === activeTab
                  ? "border-[var(--synup-color-action-bg)] text-[var(--synup-color-action-bg)] bg-[var(--synup-color-tint-blue)]"
                  : "border-transparent text-[var(--synup-color-secondary-text)] hover:text-[var(--synup-color-primary-text)] hover:border-gray-300",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        {active && (
          <div
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="flex flex-col lg:flex-row gap-[var(--synup-space-64)] items-center"
          >
            <div className="flex-1 flex flex-col gap-[var(--synup-space-24)]">
              <Heading as="h3" className="text-[var(--synup-color-primary-text)]">
                {active.content.headline}
              </Heading>
              <Text className="text-[var(--synup-color-secondary-text)] m-0">
                {active.content.description}
              </Text>
              {active.content.features && active.content.features.length > 0 && (
                <ul className="list-none m-0 p-0 flex flex-col gap-[var(--synup-space-10)]">
                  {active.content.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-[var(--synup-space-10)]">
                      <span className="w-5 h-5 rounded-full bg-[var(--synup-color-tint-green)] text-[var(--synup-color-tint-green-tick)] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                        ✓
                      </span>
                      <span className="text-[var(--synup-font-size-small)] text-[var(--synup-color-primary-text)]">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {active.content.cta && (
                <Button href={active.content.cta.href} variant="primary">
                  {active.content.cta.label}
                </Button>
              )}
            </div>
            {active.content.image && (
              <div className="lg:w-5/12 w-full">
                <Image
                  src={active.content.image.src}
                  alt={active.content.image.alt}
                  width={560}
                  height={400}
                  className="w-full h-auto object-contain rounded-[var(--synup-radius-md)]"
                />
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
