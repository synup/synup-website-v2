import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
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
  const path = locale === "en" ? "/synup-vs-hootsuite" : `/${locale}/synup-vs-hootsuite`;
  return {
    title: "Synup vs Hootsuite — Which is Right for Your Agency?",
    description: "Compare Synup and Hootsuite for agency social media management. See feature comparisons, pricing, and why agencies choose Synup.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function SynupVsHootSuitePage({
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
        eyebrow="Synup vs Hootsuite"
        headline="Synup vs Hootsuite — Which is Right for Your Agency?"
        subheadline="Compare the two platforms to find the best fit for managing social media and online presence for your agency clients."
        ctas={[
          { label: "Try Synup Free", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
      />

      <ComparisonTable
        eyebrow="Feature Comparison"
        headline="Synup vs Hootsuite — Side by Side"
        competitorName="Hootsuite"
        rows={[
          { feature: "Social Media Scheduling", synup: true, competitor: true },
          { feature: "Local Listings Management", synup: true, competitor: false },
          { feature: "Review Management", synup: true, competitor: false },
          { feature: "Local SEO Tools", synup: true, competitor: false },
          { feature: "White-label Client Portal", synup: true, competitor: false },
          { feature: "CRM / Sales Pipeline", synup: true, competitor: false },
          { feature: "Agency-focused Platform", synup: true, competitor: false },
          { feature: "Multi-location Management", synup: true, competitor: "Limited" },
          { feature: "AI Content Generation", synup: true, competitor: true },
          { feature: "Churn Forecasting", synup: true, competitor: false },
          { feature: "Invoicing & Payments", synup: true, competitor: false },
        ]}
      />

      <CTABanner
        headline="Ready to Switch to Synup?"
        subheadline="Book a demo to see why 5000+ agencies choose Synup over Hootsuite."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
