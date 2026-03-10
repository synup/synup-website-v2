import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { Alternative } from "@/lib/content-types";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "alternatives");
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
  const item = await getCollectionItem(locale as Locale, "alternatives", slug);
  if (!item) return { title: "Alternative — Synup" };

  const alt = item as unknown as Alternative;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/alternatives/${slug}` : `/${locale}/alternatives/${slug}`;

  return {
    title: alt.seo?.title ?? `Best ${alt.alternativeName} Alternative — Synup`,
    description: alt.seo?.description ?? alt.subheadline,
    alternates: {
      canonical: alt.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/alternatives/${slug}`,
        de: `${baseUrl}/de/alternatives/${slug}`,
        fr: `${baseUrl}/fr/alternatives/${slug}`,
        es: `${baseUrl}/es/alternatives/${slug}`,
      },
    },
  };
}

export default async function AlternativeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "alternatives", slug);
  if (!item) notFound();

  const alt = item as unknown as Alternative;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow={`${alt.alternativeName} Alternative`}
        headline={alt.headline}
        subheadline={alt.subheadline}
        ctas={[
          { label: "Try Synup Free", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
      />
      {alt.body?.html && <ContentBlock bodyHtml={alt.body.html} />}
      <CTABanner
        headline="Switch to Synup Today"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
