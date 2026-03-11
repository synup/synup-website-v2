import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.prod.website-files.com/681cc7df3f89a5ee17bd04aa";
const HERO_IMG = `${CDN}/68923b8a23016f6033221bc6_home-hero-section-synup.avif`;

export interface HeroCTA { label: string; href: string; variant?: "primary" | "secondary"; }
export interface HeroSectionProps {
  eyebrow?: string; headline: string; subheadline?: string;
  ctas?: HeroCTA[]; image?: { src: string; alt: string; width?: number; height?: number };
  dark?: boolean; centered?: boolean; className?: string;
}

export function HeroSection({ eyebrow, headline, subheadline, ctas, image, className = "" }: HeroSectionProps) {
  const imgSrc = image?.src?.startsWith("/assets") ? HERO_IMG : (image?.src ?? HERO_IMG);
  return (
    <section className={["section_header", className].filter(Boolean).join(" ")}
      style={{ backgroundColor: "#f5f6fc", padding: "72px 32px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: image ? "1fr 1fr" : "1fr", gap: 48, alignItems: "center" }}>
        <div style={{ paddingBottom: 72 }}>
          {eyebrow && (
            <div style={{ display: "inline-flex", alignItems: "center", backgroundColor: "#e2eaff", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1a56db", fontFamily: "Inter, sans-serif" }}>{eyebrow}</span>
            </div>
          )}
          <h1 style={{ fontSize: "clamp(38px, 4.5vw, 62px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 24, fontFamily: "Inter, sans-serif", letterSpacing: "-0.03em", color: "#000d5e" }}>
            {headline}
          </h1>
          {subheadline && (
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "#4a4a7a", fontFamily: "Inter, sans-serif", marginBottom: 40, maxWidth: 500 }}>
              {subheadline}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {ctas.map((cta, i) => (
                <Link key={i} href={cta.href} style={i === 0
                  ? { padding: "14px 28px", fontSize: 16, fontWeight: 600, color: "#fff", backgroundColor: "#0085ff", borderRadius: 8, textDecoration: "none", fontFamily: "Inter, sans-serif", display: "inline-block" }
                  : { padding: "14px 28px", fontSize: 16, fontWeight: 600, color: "#000d5e", backgroundColor: "#fff", borderRadius: 8, textDecoration: "none", border: "1.5px solid #d0d5e8", fontFamily: "Inter, sans-serif", display: "inline-block" }}>
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        {image && (
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", overflow: "hidden" }}>
            <Image src={imgSrc} alt={image.alt} width={860} height={620} priority unoptimized
              style={{ width: "100%", height: "auto", objectFit: "cover", objectPosition: "top left", borderRadius: "12px 12px 0 0", boxShadow: "0 8px 48px rgba(0,13,94,0.12)", maxHeight: 580 }} />
          </div>
        )}
      </div>
    </section>
  );
}
