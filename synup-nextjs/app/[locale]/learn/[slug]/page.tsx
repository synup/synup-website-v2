import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { Learn } from "@/lib/content-types";
import { DetailHero } from "@/components/sections/DetailHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "learns");
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
  const item = await getCollectionItem(locale as Locale, "learns", slug);
  if (!item) return { title: "Learn — Synup" };

  const learn = item as unknown as Learn;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/learn/${slug}` : `/${locale}/learn/${slug}`;

  return {
    title: learn.seo?.title ?? `${learn.title} — Synup`,
    description: learn.seo?.description ?? learn.headline,
    alternates: {
      canonical: learn.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/learn/${slug}`,
        de: `${baseUrl}/de/learn/${slug}`,
        fr: `${baseUrl}/fr/learn/${slug}`,
        es: `${baseUrl}/es/learn/${slug}`,
      },
    },
  };
}

export default async function LearnDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "learns", slug);
  if (!item) notFound();

  const learn = item as unknown as Learn;
  const prefix = locale === "en" ? "" : `/${locale}`;

  const meta: { label: string; value: string }[] = [];
  if (learn.author) meta.push({ label: "Author", value: learn.author });
  if (learn.publishedAt) {
    meta.push({
      label: "Published",
      value: new Date(learn.publishedAt).toLocaleDateString(),
    });
  }

  return (
    <>
      <DetailHero
        collectionLabel="Learn"
        headline={learn.headline}
        heroImage={learn.heroImage ? { src: learn.heroImage.url, alt: learn.heroImage.alt } : undefined}
        meta={meta.length > 0 ? meta : undefined}
      />

      {learn.body?.html && (
        <ContentBlock bodyHtml={learn.body.html} />
      )}

      <CTABanner
        headline="Ready to grow your agency?"
        subheadline="Discover how Synup helps agencies win more clients and deliver exceptional results."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
