import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { HowTo } from "@/lib/content-types";
import { DetailHero } from "@/components/sections/DetailHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "how-tos");
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
  const item = await getCollectionItem(locale as Locale, "how-tos", slug);
  if (!item) return { title: "How-To Guide — Synup" };

  const howTo = item as unknown as HowTo;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/how-to/${slug}` : `/${locale}/how-to/${slug}`;

  return {
    title: howTo.seo?.title ?? `${howTo.title} — Synup`,
    description: howTo.seo?.description ?? howTo.headline,
    alternates: {
      canonical: howTo.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/how-to/${slug}`,
        de: `${baseUrl}/de/how-to/${slug}`,
        fr: `${baseUrl}/fr/how-to/${slug}`,
        es: `${baseUrl}/es/how-to/${slug}`,
      },
    },
  };
}

export default async function HowToDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "how-tos", slug);
  if (!item) notFound();

  const howTo = item as unknown as HowTo;
  const prefix = locale === "en" ? "" : `/${locale}`;

  const meta: { label: string; value: string }[] = [];
  if (howTo.author) meta.push({ label: "Author", value: howTo.author });
  if (howTo.publishedAt) {
    meta.push({ label: "Published", value: new Date(howTo.publishedAt).toLocaleDateString() });
  }

  return (
    <>
      <DetailHero
        collectionLabel="How-To Guide"
        headline={howTo.headline}
        heroImage={howTo.heroImage ? { src: howTo.heroImage.url, alt: howTo.heroImage.alt } : undefined}
        meta={meta.length > 0 ? meta : undefined}
      />
      {howTo.body?.html && <ContentBlock bodyHtml={howTo.body.html} />}
      <CTABanner
        headline="See How Synup Can Help Your Agency"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
