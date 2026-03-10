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
  const path = locale === "en" ? "/explore-apps" : `/${locale}/explore-apps`;
  return {
    title: "Explore Apps — Synup Marketing Suite",
    description: "Powerful marketing apps to drive client performance. Explore Synup's full suite of listing, reputation, social, and SEO tools.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function ExploreAppsPage({
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
        eyebrow="Marketing Apps"
        headline="Powerful Marketing Apps to Drive Client Performance"
        subheadline="Empower your clients with a robust suite of white label marketing tools that amplify online visibility, streamline operations, and drive measurable growth."
        ctas={[{ label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "primary" }]}
        centered
      />
      <FeatureGrid
        headline="Explore the Full Suite"
        columns={3}
        items={[
          { title: "Listing Management", description: "Manage listings across our expansive publisher network.", href: `${prefix}/products/presence`, linkLabel: "Know More" },
          { title: "Review Management", description: "Improve client reputation with AI responses and automated campaigns.", href: `${prefix}/products/reputation`, linkLabel: "Know More" },
          { title: "Social Media Management", description: "Boost engagement with AI-generated social posts and smart scheduling.", href: `${prefix}/products/social`, linkLabel: "Know More" },
          { title: "SEO", description: "Boost search performance with rank tracking and custom reports.", href: `${prefix}/products/seo`, linkLabel: "Know More" },
          { title: "CRM", description: "Manage projects, activities, and client data in one place.", href: `${prefix}/products/crm`, linkLabel: "Know More" },
          { title: "Invoicing & e-Signature", description: "Get paid faster with automated invoicing and e-sign.", href: `${prefix}/products/invoicing-e-sign`, linkLabel: "Know More" },
        ]}
      />
      <CTABanner
        headline="Ready to Explore?"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
