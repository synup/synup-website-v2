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
  const path = locale === "en" ? "/online-review-statistics" : `/${locale}/online-review-statistics`;
  return {
    title: "Online Review Statistics 2025 — Synup",
    description: "The most important online review statistics for 2025. Understand how reviews impact local businesses and why reputation management matters.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function OnlineReviewStatisticsPage({
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
        eyebrow="Online Review Statistics"
        headline="Online Review Statistics You Need to Know in 2025"
        subheadline="Key statistics on online reviews and their impact on local businesses, consumer trust, and purchase decisions."
        centered
      />
      <StatsSection
        eyebrow="Review Stats"
        headline="Reviews by the Numbers"
        stats={[
          { value: "93%", label: "of consumers say online reviews impact their purchase decisions" },
          { value: "87%", label: "of consumers read online reviews for local businesses" },
          { value: "73%", label: "of consumers only pay attention to reviews written in the last month" },
          { value: "4.3x", label: "more likely to purchase from a business with 50+ reviews" },
        ]}
      />
      <CTABanner
        headline="Help Your Clients Get More Reviews"
        subheadline="Synup automates review requests and helps agencies manage online reputation at scale."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
