import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { Ebook } from "@/lib/content-types";
import { DetailHero } from "@/components/sections/DetailHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { FormSection } from "@/components/sections/FormSection";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "ebooks");
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
  const item = await getCollectionItem(locale as Locale, "ebooks", slug);
  if (!item) return { title: "Ebook — Synup" };

  const ebook = item as unknown as Ebook;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/ebooks/${slug}` : `/${locale}/ebooks/${slug}`;

  return {
    title: ebook.seo?.title ?? `${ebook.title} — Free Ebook — Synup`,
    description: ebook.seo?.description ?? ebook.description,
    alternates: {
      canonical: ebook.seo?.canonical ?? `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/ebooks/${slug}`,
        de: `${baseUrl}/de/ebooks/${slug}`,
        fr: `${baseUrl}/fr/ebooks/${slug}`,
        es: `${baseUrl}/es/ebooks/${slug}`,
      },
    },
  };
}

export default async function EbookDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "ebooks", slug);
  if (!item) notFound();

  const ebook = item as unknown as Ebook;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <DetailHero
        collectionLabel="Free Ebook"
        headline={ebook.headline}
        subheadline={ebook.description}
        logo={ebook.coverImage ? { src: ebook.coverImage.url, alt: ebook.coverImage.alt } : undefined}
      />

      {/* Gated ebooks show a form; free ebooks show a download button */}
      {ebook.gated ? (
        <FormSection
          headline="Download Your Free Ebook"
          subheadline="Enter your details below to get instant access."
          fields={[
            { name: "firstName", label: "First Name", type: "text", required: true },
            { name: "lastName", label: "Last Name", type: "text", required: true },
            { name: "email", label: "Work Email", type: "email", required: true },
            { name: "company", label: "Company Name", type: "text", required: true },
          ]}
          submitLabel="Download Ebook"
          successRedirect={ebook.downloadUrl ?? `${prefix}/thank-you`}
          actionUrl="/api/ebook-download"
        />
      ) : ebook.downloadUrl ? (
        <section className="py-[var(--synup-space-section)] bg-white">
          <div className="text-center">
            <a
              href={ebook.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--synup-color-action-bg)] text-white px-8 py-4 rounded-[var(--synup-radius-md)] font-[var(--synup-font-weight-medium)] hover:bg-[var(--synup-color-action-hover)] transition-colors"
            >
              Download Ebook
            </a>
          </div>
        </section>
      ) : null}

      <CTABanner
        headline="See How Synup Can Help Your Agency"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
