import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { UseCase } from "@/lib/content-types";
import { DetailHero } from "@/components/sections/DetailHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "use-cases");
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
  const item = await getCollectionItem(locale as Locale, "use-cases", slug);
  if (!item) return { title: "Use Case — Synup" };

  const uc = item as unknown as UseCase;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/use-case/${slug}` : `/${locale}/use-case/${slug}`;

  return {
    title: uc.seo?.title ?? `${uc.title} — Synup`,
    description: uc.seo?.description ?? uc.headline,
    alternates: {
      canonical: uc.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/use-case/${slug}`,
        de: `${baseUrl}/de/use-case/${slug}`,
        fr: `${baseUrl}/fr/use-case/${slug}`,
        es: `${baseUrl}/es/use-case/${slug}`,
      },
    },
  };
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "use-cases", slug);
  if (!item) notFound();

  const uc = item as unknown as UseCase;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <DetailHero
        collectionLabel="Use Case"
        headline={uc.headline}
        subheadline={uc.subheadline}
        heroImage={uc.heroImage ? { src: uc.heroImage.url, alt: uc.heroImage.alt } : undefined}
      />
      {uc.body?.html && <ContentBlock bodyHtml={uc.body.html} />}
      <CTABanner
        headline="See How Synup Can Help"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
