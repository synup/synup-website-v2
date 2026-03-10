import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import { DetailHero } from "@/components/sections/DetailHero";
import { CTABanner } from "@/components/sections/CTABanner";

/* ─── Local type for testimonial content shape ──────────────────────────── */

interface TestimonialData {
  slug: string;
  locale: string;
  collectionType: string;
  partner_name?: string;
  person_name?: string;
  designation?: string;
  partner_testimonial?: string;
  partner_logo?: string;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string | null;
  };
}

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "testimonials");
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
  const item = await getCollectionItem(locale as Locale, "testimonials", slug);
  if (!item) return { title: "Testimonial — Synup" };

  const t = item as unknown as TestimonialData;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/testimonials/${slug}` : `/${locale}/testimonials/${slug}`;

  return {
    title: t.seo?.title ?? `${t.partner_name ?? "Customer"} Testimonial — Synup`,
    description: t.seo?.description ?? `Read what ${t.partner_name ?? "our customer"} says about Synup.`,
    alternates: {
      canonical: t.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/testimonials/${slug}`,
        de: `${baseUrl}/de/testimonials/${slug}`,
        fr: `${baseUrl}/fr/testimonials/${slug}`,
        es: `${baseUrl}/es/testimonials/${slug}`,
      },
    },
  };
}

export default async function TestimonialDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "testimonials", slug);
  if (!item) notFound();

  const t = item as unknown as TestimonialData;
  const prefix = locale === "en" ? "" : `/${locale}`;

  const meta: { label: string; value: string }[] = [
    ...(t.person_name ? [{ label: "Reviewer", value: t.person_name }] : []),
    ...(t.designation ? [{ label: "Title", value: t.designation }] : []),
  ];

  // Strip HTML tags from testimonial text for display
  const quoteText = t.partner_testimonial
    ? t.partner_testimonial.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, "").trim()
    : "";

  return (
    <>
      <DetailHero
        collectionLabel="Testimonial"
        headline={t.partner_name ?? "Customer Review"}
        subheadline={quoteText}
        logo={t.partner_logo ? { src: t.partner_logo, alt: `${t.partner_name ?? ""} logo` } : undefined}
        meta={meta.length > 0 ? meta : undefined}
      />
      <CTABanner
        headline="Join 5000+ Agencies Growing with Synup"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
