import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { Tool } from "@/lib/content-types";
import { DetailHero } from "@/components/sections/DetailHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "tools");
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
  const item = await getCollectionItem(locale as Locale, "tools", slug);
  if (!item) return { title: "Free Tool — Synup" };

  const tool = item as unknown as Tool;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/tools/${slug}` : `/${locale}/tools/${slug}`;

  return {
    title: tool.seo?.title ?? `${tool.name} — Free Tool — Synup`,
    description: tool.seo?.description ?? tool.description,
    alternates: {
      canonical: tool.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/tools/${slug}`,
        de: `${baseUrl}/de/tools/${slug}`,
        fr: `${baseUrl}/fr/tools/${slug}`,
        es: `${baseUrl}/es/tools/${slug}`,
      },
    },
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "tools", slug);
  if (!item) notFound();

  const tool = item as unknown as Tool;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <DetailHero
        collectionLabel="Free Tool"
        headline={tool.name}
        subheadline={tool.description}
        logo={tool.image ? { src: tool.image.url, alt: tool.image.alt } : undefined}
        cta={tool.toolUrl ? { label: "Use Tool", href: tool.toolUrl } : undefined}
      />
      {tool.body?.html && <ContentBlock bodyHtml={tool.body.html} />}
      <CTABanner
        headline="See All Free Tools"
        subheadline="Explore our full library of free tools for marketers and agencies."
        primaryCta={{ label: "View All Tools", href: `${prefix}/tools` }}
        secondaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="light"
      />
    </>
  );
}
