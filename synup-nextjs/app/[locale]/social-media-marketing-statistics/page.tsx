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
  const path = locale === "en" ? "/social-media-marketing-statistics" : `/${locale}/social-media-marketing-statistics`;
  return {
    title: "Social Media Marketing Statistics 2025 — Synup",
    description: "Key social media marketing statistics to help agencies demonstrate the value of social media management to clients.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function SocialMediaStatisticsPage({
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
        eyebrow="Social Media Statistics"
        headline="Social Media Marketing Statistics for 2025"
        subheadline="Essential social media statistics to help agencies build the business case for social media management services."
        centered
      />
      <StatsSection
        eyebrow="Social Media Stats"
        headline="Social Media by the Numbers"
        stats={[
          { value: "4.9B", label: "social media users worldwide" },
          { value: "2.5hrs", label: "average daily social media usage" },
          { value: "73%", label: "of marketers say social media marketing has been effective" },
          { value: "71%", label: "of consumers likely to recommend a brand after a positive social experience" },
        ]}
      />
      <CTABanner
        headline="Help Your Clients Succeed on Social Media"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
