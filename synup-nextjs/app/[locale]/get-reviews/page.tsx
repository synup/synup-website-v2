import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? "/get-reviews" : `/${locale}/get-reviews`;
  return {
    title: "Get More Reviews — Free Business Scan Tool — Synup",
    description: "Generate a comprehensive business presence report. Scan local listings, review visibility, social visibility, and search visibility — free.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function GetReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow="Free Scan Tool"
        headline="Generate more high-quality leads with our scan tool"
        subheadline="Win over prospects with a comprehensive, white-labeled scan report that scans their local listings, reporting on voice search optimization, review visibility, social visibility, and search visibility."
        ctas={[
          { label: "Run a Free Scan", href: "#scan-tool", variant: "primary" },
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "secondary" },
        ]}
        centered
      />
      <FeatureGrid
        eyebrow="What Sets Us Apart"
        headline="Our scan tool is the ultimate solution"
        columns={3}
        items={[
          { title: "Gain valuable insights", description: "Build a tailored strategy for your prospects with one click." },
          { title: "Comprehensive scans", description: "Designed to empower digital marketing agencies with scores across all essential components." },
          { title: "White-labeled reports", description: "Share branded reports that demonstrate your value to prospects." },
        ]}
      />
      <CTABanner
        headline="Ready to Win More Clients?"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
