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
  const path = locale === "en" ? "/voice-search-statistics" : `/${locale}/voice-search-statistics`;
  return {
    title: "Voice Search Statistics 2025 — Synup",
    description: "Key voice search statistics for 2025. Understand how voice search impacts local businesses and how to optimize for it.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function VoiceSearchStatisticsPage({
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
        eyebrow="Voice Search Statistics"
        headline="Voice Search Statistics for 2025"
        subheadline="Essential voice search statistics to help agencies optimize their clients for the growing voice search channel."
        centered
      />
      <StatsSection
        eyebrow="Voice Search Stats"
        headline="Voice Search by the Numbers"
        stats={[
          { value: "8.4B", label: "voice assistant devices in use worldwide" },
          { value: "71%", label: "of consumers prefer voice queries over typing" },
          { value: "58%", label: "of consumers have used voice search to find local business info" },
          { value: "22%", label: "of voice queries are for local content" },
        ]}
      />
      <CTABanner
        headline="Optimize Your Clients for Voice Search"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
