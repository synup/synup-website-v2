import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
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
  const path = locale === "en" ? "/yext-alt" : `/${locale}/yext-alt`;
  return {
    title: "Best Yext Alternative — Synup vs Yext",
    description: "Looking for a Yext alternative? Synup offers more features at better value. Compare Synup vs Yext for agencies.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function YextAltPage({
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
        eyebrow="Yext Alternative"
        headline="The Best Yext Alternative for Agencies"
        subheadline="Switch from Yext to Synup and get more features, better support, and lower cost. Purpose-built for agencies, not enterprises."
        ctas={[
          { label: "Try Synup Free", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
      />

      <FeatureGrid
        eyebrow="Why Agencies Switch"
        headline="What You Get With Synup That You Don't Get With Yext"
        columns={3}
        items={[
          { title: "Agency-First Platform", description: "Synup is built for agencies. Yext is built for enterprises. Better fit, better results." },
          { title: "Full Marketing Suite", description: "Listings + reviews + social + SEO + CRM in one platform. Yext is primarily listings." },
          { title: "White-label Included", description: "Full white-label branding included. No extra fee." },
          { title: "Better Value", description: "Same or better capabilities at a fraction of the cost." },
          { title: "Dedicated Support", description: "Dedicated CSM from day one. Not just a support ticket queue." },
          { title: "Easy Migration", description: "We migrate your data from Yext. Managed migration at no extra cost." },
        ]}
      />

      <ComparisonTable
        eyebrow="Feature Comparison"
        headline="Synup vs Yext — Side by Side"
        competitorName="Yext"
        rows={[
          { feature: "Listings Management", synup: true, competitor: true },
          { feature: "Review Management", synup: true, competitor: "Limited" },
          { feature: "Social Media Management", synup: true, competitor: false },
          { feature: "Local SEO Tools", synup: true, competitor: true },
          { feature: "White-label Client Portal", synup: true, competitor: "Paid Add-on" },
          { feature: "CRM / Sales Pipeline", synup: true, competitor: false },
          { feature: "Agency-focused Pricing", synup: true, competitor: false },
          { feature: "Managed Migration", synup: true, competitor: false },
          { feature: "Contract Buy-outs", synup: true, competitor: false },
          { feature: "Churn Forecasting", synup: true, competitor: false },
        ]}
      />

      <CTABanner
        headline="Ready to Switch From Yext?"
        subheadline="Book a demo and we'll show you exactly how to make the move. Migration included."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
