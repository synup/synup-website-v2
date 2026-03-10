import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { Integration } from "@/lib/content-types";
import { DetailHero } from "@/components/sections/DetailHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";

/* ─── Static params ──────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "integrations");
  const params: { locale: string; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getCollectionItem(locale as Locale, "integrations", slug);
  if (!item) return { title: "Integration — Synup" };

  const integration = item as unknown as Integration;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/integrations/${slug}` : `/${locale}/integrations/${slug}`;

  return {
    title: integration.seo?.title ?? `${integration.name} Integration — Synup`,
    description: integration.seo?.description ?? integration.description,
    alternates: {
      canonical: integration.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/integrations/${slug}`,
        de: `${baseUrl}/de/integrations/${slug}`,
        fr: `${baseUrl}/fr/integrations/${slug}`,
        es: `${baseUrl}/es/integrations/${slug}`,
      },
    },
    openGraph: {
      images: integration.seo?.ogImage ? [{ url: integration.seo.ogImage }] : [],
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "integrations", slug);
  if (!item) notFound();

  const integration = item as unknown as Integration;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <DetailHero
        collectionLabel="Integration"
        headline={`Synup + ${integration.name}`}
        subheadline={integration.description}
        logo={integration.logo ? { src: integration.logo.url, alt: integration.logo.alt } : undefined}
        cta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        secondaryCta={
          integration.integrationUrl
            ? { label: `Visit ${integration.name}`, href: integration.integrationUrl, external: true }
            : undefined
        }
      />

      {integration.body?.html && (
        <ContentBlock
          bodyHtml={integration.body.html}
        />
      )}

      <CTABanner
        headline="Partner With Synup Today!"
        subheadline="Book a call with our partnership manager to explore custom growth solutions for your agency."
        primaryCta={{ label: "Get Started", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
