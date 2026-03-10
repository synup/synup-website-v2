import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { Competitor } from "@/lib/content-types";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "competitors");
  const params: { locale: string; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getCollectionItem(locale as Locale, "competitors", slug);
  if (!item) return { title: "Synup vs Competitor" };

  const comp = item as unknown as Competitor;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/competitors/${slug}` : `/${locale}/competitors/${slug}`;

  return {
    title: comp.seo?.title ?? `Synup vs ${comp.name} — Detailed Comparison`,
    description: comp.seo?.description ?? comp.tagline,
    alternates: {
      canonical: comp.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/competitors/${slug}`,
        de: `${baseUrl}/de/competitors/${slug}`,
        fr: `${baseUrl}/fr/competitors/${slug}`,
        es: `${baseUrl}/es/competitors/${slug}`,
      },
    },
  };
}

export default async function CompetitorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "competitors", slug);
  if (!item) notFound();

  const comp = item as unknown as Competitor;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow={`Synup vs ${comp.name}`}
        headline={comp.heroHeadline}
        subheadline={comp.heroSubheadline}
        ctas={[
          { label: comp.ctaLabel || "Try Synup Free", href: comp.ctaHref || `${prefix}/book-a-demo`, variant: "primary" },
          ...(comp.competitorUrl
            ? [{ label: `Visit ${comp.name}`, href: comp.competitorUrl, variant: "secondary" as const, external: true }]
            : []),
        ]}
      />

      {comp.body?.html && (
        <ContentBlock bodyHtml={comp.body.html} />
      )}

      <CTABanner
        headline={`Why Choose Synup Over ${comp.name}?`}
        subheadline="Book a personalized demo to see the difference for yourself."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
