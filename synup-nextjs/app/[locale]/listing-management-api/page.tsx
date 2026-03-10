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
  const path = locale === "en" ? "/listing-management-api" : `/${locale}/listing-management-api`;
  return {
    title: "Listing Management API — Synup",
    description: "Access Synup's powerful listing management API to build custom workflows and manage business listings programmatically.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function ListingManagementAPIPage({
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
        headline="Listing Management API"
        subheadline="Access Synup's powerful APIs to build custom workflows, integrations, or extend functionality within your own systems."
        ctas={[
          { label: "View API Docs", href: "https://developers.synup.com", external: true, variant: "primary" },
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "secondary" },
        ]}
      />
      <FeatureGrid
        headline="What You Can Build"
        columns={3}
        items={[
          { title: "Custom Integrations", description: "Connect Synup with your existing tools and workflows." },
          { title: "Bulk Listing Updates", description: "Programmatically update thousands of listings at once." },
          { title: "Real-time Sync", description: "Keep listings synchronized in real-time as data changes." },
          { title: "Embedded Tools", description: "Embed Synup's listing tools directly into your platform." },
          { title: "Webhooks", description: "Receive real-time notifications when listings change." },
          { title: "Full CRUD", description: "Full create, read, update, and delete operations on listings." },
        ]}
      />
      <CTABanner
        headline="Ready to Build?"
        subheadline="Talk to our team to get API access and a custom integration plan."
        primaryCta={{ label: "Contact API Team", href: `${prefix}/contact` }}
        variant="brand"
      />
    </>
  );
}
