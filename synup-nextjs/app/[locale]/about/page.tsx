import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
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
  const path = locale === "en" ? "/about" : `/${locale}/about`;
  return {
    title: "About Synup | Our Company & Mission",
    description:
      "Our mission is to help brands continuously transform their local brand awareness, acquire new customers, and see growth in sales results.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/about`,
        de: `${baseUrl}/de/about`,
        fr: `${baseUrl}/fr/about`,
        es: `${baseUrl}/es/about`,
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      {/* Hero */}
      <HeroSection
        eyebrow="Our Company"
        headline="Our mission is to help brands continuously transform their local brand awareness"
        subheadline="We enable our clients to seamlessly manage and optimize their business information and content — across devices and digital platforms — to improve discoverability and conversion."
        ctas={[
          { label: "See Open Positions", href: `${prefix}/careers`, variant: "primary" },
        ]}
        centered
      />

      {/* Stats */}
      <StatsSection
        stats={[
          { value: "600,000+", label: "Businesses use our platform" },
          { value: "2014", label: "Founded" },
          { value: "Inc. 500", label: "One of the fastest growing companies" },
        ]}
      />

      {/* CTA */}
      <CTABanner
        eyebrow="Careers at Synup"
        headline="Explore Your Future Career Opportunities"
        subheadline="Join our innovative, collaborative, and passionate team helping businesses grow their online presence."
        primaryCta={{ label: "See Open Positions", href: `${prefix}/careers` }}
        variant="light"
      />
    </>
  );
}
