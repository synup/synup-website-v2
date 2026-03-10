/**
 * LogoStrip — Customer/partner logo row.
 * Matches Webflow section: .section_logos, .logo-strip, .customer-logos
 */

import Image from "next/image";
import { Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
}

export interface LogoStripProps {
  /** Optional label above logos */
  label?: string;
  logos: LogoItem[];
  /** Grayscale logos (default) */
  grayscale?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function LogoStrip({
  label,
  logos,
  grayscale = true,
  className = "",
}: LogoStripProps) {
  return (
    <section
      className={[
        "section_logos",
        "py-[var(--synup-space-section-sm)] bg-white",
        "border-y border-gray-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size="large">
        {label && (
          <Text
            size="small"
            muted
            className="text-center uppercase tracking-widest font-[var(--synup-font-weight-medium)] mb-[var(--synup-space-32)] m-0"
          >
            {label}
          </Text>
        )}
        <div className="flex flex-wrap justify-center items-center gap-[var(--synup-space-40)]">
          {logos.map((logo, i) => {
            const img = (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width ?? 120}
                height={logo.height ?? 40}
                className={[
                  "object-contain h-8 w-auto",
                  grayscale ? "grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" : "",
                ].join(" ")}
              />
            );
            if (logo.href) {
              return (
                <a
                  key={i}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  {img}
                </a>
              );
            }
            return (
              <div key={i} className="flex items-center">
                {img}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
