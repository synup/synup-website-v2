import Image from "next/image";

const CDN = "https://cdn.prod.website-files.com/681cc7df3f89a5ee17bd04aa";

export interface LogoItem { src: string; alt: string; href?: string; width?: number; height?: number; }
export interface LogoStripProps { label?: string; logos?: LogoItem[]; grayscale?: boolean; className?: string; }

export const DEFAULT_HOME_LOGOS: LogoItem[] = [
  { src: `${CDN}/68946686153641db6bfd7bf9_image%20241.png`, alt: "Vistaprint" },
  { src: `${CDN}/6894668633a65fcfbddb88b4_image%20254.png`, alt: "Olive Street Design" },
  { src: `${CDN}/68946686623d5cf0a1b49d91_image%20(7)%202.png`, alt: "Sinclair Broadcast Group" },
  { src: `${CDN}/6894668654fb9548f2a06398_image%205073.png`, alt: "NP Accel" },
  { src: `${CDN}/68946686fe876af377493023_image%205074.png`, alt: "HigherVisibility" },
  { src: `${CDN}/689466869338edf6bae87b45_logo-dark-r%202.png`, alt: "Goodwill" },
  { src: `${CDN}/689466864e182952b009c464_broadridge-logo-png_seeklogo-385469-removebg-preview%201.png`, alt: "Broadridge" },
];

export function LogoStrip({ label, logos = DEFAULT_HOME_LOGOS, grayscale = true, className = "" }: LogoStripProps) {
  return (
    <section className={["section_logos", className].filter(Boolean).join(" ")}
      style={{ backgroundColor: "#fff", padding: "28px 32px", borderTop: "1px solid #eef0f8", borderBottom: "1px solid #eef0f8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {label && <p style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: "#8892b0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24, fontFamily: "Inter, sans-serif" }}>{label}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "24px 48px" }}>
          {logos.map((logo, i) => (
            <div key={i}>
              <Image src={logo.src} alt={logo.alt} width={logo.width ?? 130} height={logo.height ?? 40} unoptimized
                style={{ height: 36, width: "auto", objectFit: "contain", filter: grayscale ? "grayscale(1) opacity(0.6)" : "none" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
