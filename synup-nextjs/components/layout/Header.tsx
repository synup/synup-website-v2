"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const CDN = "https://cdn.prod.website-files.com/681cc7df3f89a5ee17bd04aa";
const LOGO = `${CDN}/6862d1fc7765f3021ebc8f50_Frame%202147225722.avif`;

const NAV = [
  { label: "Products", dropdown: [
    { label: "Listings Management", href: "/en/products/listings" },
    { label: "Reputation Management", href: "/en/products/reputation" },
    { label: "Local SEO", href: "/en/products/local-seo" },
    { label: "Social Media", href: "/en/products/social" },
    { label: "Analytics", href: "/en/products/analytics" },
  ]},
  { label: "Solutions", dropdown: [
    { label: "For Agencies", href: "/en/solutions/agencies" },
    { label: "For Enterprises", href: "/en/solutions/enterprises" },
  ]},
  { label: "Integrations", href: "/en/integrations" },
  { label: "Why Synup?", dropdown: [
    { label: "About Us", href: "/en/about" },
    { label: "Customers", href: "/en/customers" },
  ]},
  { label: "Pricing", href: "/en/pricing" },
  { label: "Resources", dropdown: [
    { label: "Blog", href: "https://synpost.synup.com" },
    { label: "Help Center", href: "https://help.synup.com" },
  ]},
];

export function Header({ locale = "en" }: { locale?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
        
        <Link href={`${prefix}/`} style={{ flexShrink: 0 }}>
          <Image src={LOGO} alt="Synup" width={120} height={36} priority unoptimized style={{ height: 36, width: "auto" }} />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {NAV.map((item) => (
            <div key={item.label} style={{ position: "relative" }}
              onMouseEnter={() => item.dropdown && setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}>
              {item.href ? (
                <Link href={item.href} style={{ display: "flex", alignItems: "center", padding: "8px 12px", fontSize: 15, fontWeight: 500, color: "#1a1a2e", textDecoration: "none", fontFamily: "Inter, Arial, sans-serif", whiteSpace: "nowrap" }}>
                  {item.label}
                </Link>
              ) : (
                <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 12px", fontSize: 15, fontWeight: 500, color: "#1a1a2e", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, Arial, sans-serif", whiteSpace: "nowrap" }}>
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></

cat > ~/Downloads/synup-website-v2/synup-nextjs/components/sections/HomeHero.tsx << 'EOF'
import Link from "next/link";
import Image from "next/image";

const CDN = "https://cdn.prod.website-files.com/681cc7df3f89a5ee17bd04aa";

export function HomeHero({ locale = "en" }: { locale?: string }) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return (
    <section style={{ backgroundColor: "#f7f8ff", padding: "80px 32px 60px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", backgroundColor: "#e8f0ff", borderRadius: 100, padding: "6px 14px", marginBottom: 28 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#0055cc", fontFamily: "Inter, Arial, sans-serif" }}>Join 5000+ Agency Partners</span>
          </div>
          <h1 style={{ fontSize: "clamp(40px,5vw,64px)", fontWeight: 800, lineHeight: 1.1, color: "#000d5e", fontFamily: "Inter, Arial, sans-serif", marginBottom: 24, letterSpacing: "-0.02em" }}>
            Level up your agency & delight your clients
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#4a4a6a", fontFamily: "Inter, Arial, sans-serif", marginBottom: 36, maxWidth: 480 }}>
            Join 5000+ partners using our unified platform to drive revenue, streamline agency operations, and deliver exceptional results for their clients.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href={`${prefix}/book-a-demo`} style={{ padding: "14px 28px", fontSize: 16, fontWeight: 600, color: "#fff", backgroundColor: "#0085ff", borderRadius: 8, textDecoration: "none", fontFamily: "Inter, Arial, sans-serif" }}>Book a Demo</Link>
            <Link href={`${prefix}/integrations`} style={{ padding: "14px 28px", fontSize: 16, fontWeight: 600, color: "#000d5e", backgroundColor: "#fff", borderRadius: 8, textDecoration: "none", border: "1.5px solid #d0d5e8", fontFamily: "Inter, Arial, sans-serif" }}>Explore Apps</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 48, paddingTop: 40, borderTop: "1px solid #e0e4f0" }}>
            {[["5,000+","Agency Partners"],["600,000+","Businesses"],["2014","Founded"],["Inc. 500","Fastest Growing"]].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#000d5e", fontFamily: "Inter, Arial, sans-serif" }}>{v}</div>
cat > ~/Downloads/synup-website-v2/synup-nextjs/app/\[locale\]/page.tsx << 'EOF'
import { HomeHero } from "@/components/sections/HomeHero";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeHero locale={locale} />;
}
