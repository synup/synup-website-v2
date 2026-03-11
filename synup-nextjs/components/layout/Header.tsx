"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const CDN = "https://cdn.prod.website-files.com/681cc7df3f89a5ee17bd04aa";
const LOGO = `${CDN}/6862d1fc7765f3021ebc8f50_Frame%202147225722.avif`;

const NAV = [
  { label: "Products", dropdown: [
    { label: "Listing Management", href: "/products/presence" },
    { label: "Reputation Management", href: "/products/reputation" },
    { label: "Social Media", href: "/products/social" },
    { label: "Local SEO", href: "/products/seo" },
    { label: "CRM", href: "/products/crm" },
    { label: "Agency OS", href: "/products/agency-os" },
  ]},
  { label: "Solutions", dropdown: [
    { label: "For Agencies", href: "/solutions/agencies" },
    { label: "For Enterprises", href: "/solutions/enterprises" },
    { label: "White Label", href: "/white-label/white-label-software" },
  ]},
  { label: "Integrations", href: "/integrations" },
  { label: "Why Synup?", dropdown: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
  ]},
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", dropdown: [
    { label: "Blog", href: "https://synpost.synup.com" },
    { label: "eBooks", href: "/ebooks" },
    { label: "Help Center", href: "https://help.synup.com" },
  ]},
];

export function Header({ locale = "en" }: { locale?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const localise = (href: string) => href.startsWith("http") ? href : `${prefix}${href}`;

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#fff", borderBottom: "1px solid #eef0f8", boxShadow: "0 1px 6px rgba(0,13,94,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Link href={`${prefix}/`} style={{ flexShrink: 0, lineHeight: 0 }}>
          <Image src={LOGO} alt="Synup" width={120} height={36} priority unoptimized style={{ height: 36, width: "auto" }} />
        </Link>
        <nav style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center" }}>
          {NAV.map((item) => (
            <div key={item.label} style={{ position: "relative" }}
              onMouseEnter={() => "dropdown" in item && setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}>
              {"href" in item ? (
                <Link href={localise(item.href as string)} style={{ display: "flex", alignItems: "center", padding: "8px 14px", fontSize: 15, fontWeight: 500, color: "#1a1a2e", textDecoration: "none", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>
                  {item.label}
                </Link>
              ) : (
                <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 14px", fontSize: 15, fontWeight: 500, color: "#1a1a2e", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
              {"dropdown" in item && open === item.label && (
                <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#fff", border: "1px solid #eef0f8", borderRadius: 10, boxShadow: "0 8px 32px rgba(0,13,94,0.12)", minWidth: 220, padding: "8px 0", zIndex: 1001 }}>
                  {(item.dropdown as {label:string;href:string}[]).map((sub) => (
                    <Link key={sub.label} href={localise(sub.href)} style={{ display: "block", padding: "10px 18px", fontSize: 14, fontWeight: 500, color: "#2d2d4e", textDecoration: "none", fontFamily: "Inter, sans-serif" }}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <Link href="https://app.synup.com" style={{ padding: "8px 18px", fontSize: 15, fontWeight: 500, color: "#1a1a2e", textDecoration: "none", fontFamily: "Inter, sans-serif" }}>Log in</Link>
          <Link href={`${prefix}/book-a-demo`} style={{ padding: "10px 20px", fontSize: 15, fontWeight: 600, color: "#fff", backgroundColor: "#0085ff", borderRadius: 8, textDecoration: "none", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>Book a Demo</Link>
        </div>
      </div>
    </header>
  );
}
