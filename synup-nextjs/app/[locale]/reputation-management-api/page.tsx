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
  const path = locale === "en" ? "/reputation-management-api" : `/${locale}/reputation-management-api`;
  return {
    title: "Reputation Management API — Synup",
    description: "Programmatically manage online reviews and reputation with Synup's Reputation Management API.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function ReputationManagementAPIPage({
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
        headline="Reputation Management API"
        subheadline="Programmatically monitor, analyze, and respond to online reviews across all major review platforms."
        ctas={[
          { label: "View API Docs", href: "https://developers.synup.com", external: true, variant: "primary" },
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "secondary" },
        ]}
      />
      <FeatureGrid
        headline="API Capabilities"
        columns={3}
        items={[
          { title: "Review Monitoring", description: "Monitor new reviews across Google, Yelp, Facebook, and more." },
          { title: "Review Responses", description: "Post responses to reviews programmatically." },
          { title: "Sentiment Analysis", description: "Get AI-powered sentiment scores for reviews." },
          { title: "Review Campaigns", description: "Launch automated review request campaigns via API." },
          { title: "Analytics", description: "Access detailed review analytics and trends." },
          { title: "Webhooks", description: "Real-time notifications for new reviews." },
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
