import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { CaseStudy } from "@/lib/content-types";
import { DetailHero } from "@/components/sections/DetailHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";

/* ─── Static params ──────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "case-studies");
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
  const item = await getCollectionItem(locale as Locale, "case-studies", slug);
  if (!item) return { title: "Case Study — Synup" };

  const cs = item as unknown as CaseStudy;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/case-studies/${slug}` : `/${locale}/case-studies/${slug}`;

  return {
    title: cs.seo?.title ?? `${cs.customerName} Case Study — Synup`,
    description: cs.seo?.description ?? cs.headline,
    alternates: {
      canonical: cs.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/case-studies/${slug}`,
        de: `${baseUrl}/de/case-studies/${slug}`,
        fr: `${baseUrl}/fr/case-studies/${slug}`,
        es: `${baseUrl}/es/case-studies/${slug}`,
      },
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "case-studies", slug);
  if (!item) notFound();

  const cs = item as unknown as CaseStudy;
  const prefix = locale === "en" ? "" : `/${locale}`;

  const meta = [
    cs.industry ? { label: "Industry", value: cs.industry } : null,
    cs.companySize ? { label: "Size", value: cs.companySize } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <DetailHero
        collectionLabel="Case Study"
        headline={cs.headline}
        subheadline={cs.subheadline}
        logo={cs.logo ? { src: cs.logo.url, alt: cs.logo.alt, width: cs.logo.width, height: cs.logo.height } : undefined}
        heroImage={cs.heroImage ? { src: cs.heroImage.url, alt: cs.heroImage.alt } : undefined}
        meta={meta.length > 0 ? meta : undefined}
        cta={{ label: "Read Full Story", href: "#story" }}
      />

      {cs.body?.html && (
        <ContentBlock
          bodyHtml={cs.body.html}
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
