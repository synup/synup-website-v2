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
  const path = locale === "en" ? "/local-seo-statistics" : `/${locale}/local-seo-statistics`;
  return {
    title: "Local SEO Statistics 2025 — Synup",
    description: "The most up-to-date local SEO statistics to help you understand local search and grow your clients' online visibility.",
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

export default async function LocalSEOStatisticsPage({
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
        eyebrow="Local SEO Statistics"
        headline="Local SEO Statistics You Need to Know in 2025"
        subheadline="The most comprehensive collection of local SEO statistics to help agencies understand local search and demonstrate value to clients."
        centered
      />
      <StatsSection
        eyebrow="Key Stats"
        headline="Local Search by the Numbers"
        stats={[
          { value: "46%", label: "of Google searches are local" },
          { value: "88%", label: "of local searches result in a call or visit within 24 hours" },
          { value: "76%", label: "of people who search locally visit a business within a day" },
          { value: "28%", label: "of local searches result in a purchase" },
        ]}
      />
      <CTABanner
        headline="Help Your Clients Win in Local Search"
        subheadline="Synup gives agencies the tools to dominate local search for their clients."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
