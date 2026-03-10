import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { ComparePage } from "@/lib/content-types";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "compare-pages");
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
  const item = await getCollectionItem(locale as Locale, "compare-pages", slug);
  if (!item) return { title: "Comparison — Synup" };

  const cp = item as unknown as ComparePage;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/compare/${slug}` : `/${locale}/compare/${slug}`;

  return {
    title: cp.seo?.title ?? `${cp.title} — Synup`,
    description: cp.seo?.description ?? cp.heroSubheadline,
    alternates: {
      canonical: cp.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/compare/${slug}`,
        de: `${baseUrl}/de/compare/${slug}`,
        fr: `${baseUrl}/fr/compare/${slug}`,
        es: `${baseUrl}/es/compare/${slug}`,
      },
    },
  };
}

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "compare-pages", slug);
  if (!item) notFound();

  const cp = item as unknown as ComparePage;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow="Compare"
        headline={cp.heroHeadline}
        subheadline={cp.heroSubheadline}
        ctas={[
          { label: "Try Synup Free", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
      />
      {cp.body?.html && <ContentBlock bodyHtml={cp.body.html} />}
      <CTABanner
        headline="Make the Switch to Synup"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
