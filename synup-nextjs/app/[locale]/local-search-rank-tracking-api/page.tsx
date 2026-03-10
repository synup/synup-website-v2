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
  const path = locale === "en" ? "/local-search-rank-tracking-api" : `/${locale}/local-search-rank-tracking-api`;
  return {
    title: "Local Search Rank Tracking API — Synup",
    description: "Programmatically track local search rankings for any keyword and location with Synup's Rank Tracking API.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function LocalSearchRankTrackingAPIPage({
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
        eyebrow="Developer API"
        headline="Local Search Rank Tracking API"
        subheadline="Programmatically track local search rankings for any keyword, location, and device type."
        ctas={[
          { label: "View API Docs", href: "https://developers.synup.com", external: true, variant: "primary" },
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "secondary" },
        ]}
      />
      <FeatureGrid
        headline="API Capabilities"
        columns={3}
        items={[
          { title: "Keyword Tracking", description: "Track rankings for unlimited keywords across locations." },
          { title: "Local Pack Results", description: "Track Google Local Pack (map pack) rankings specifically." },
          { title: "Historical Data", description: "Access historical ranking data for trend analysis." },
          { title: "Bulk Requests", description: "Process thousands of rank checks simultaneously." },
          { title: "Custom Reports", description: "Generate custom ranking reports via API." },
          { title: "Webhooks", description: "Get notified when rankings change significantly." },
        ]}
      />
      <CTABanner
        headline="Ready to Build?"
        primaryCta={{ label: "Contact API Team", href: `${prefix}/contact` }}
        variant="brand"
      />
    </>
  );
}
