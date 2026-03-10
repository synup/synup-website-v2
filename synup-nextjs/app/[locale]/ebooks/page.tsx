import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllCollectionItems, type Locale } from "@/lib/content";
import type { Ebook } from "@/lib/content-types";
import { HeroSection } from "@/components/sections/HeroSection";
import { CardGrid } from "@/components/sections/CardGrid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? "/ebooks" : `/${locale}/ebooks`;
  return {
    title: "Free Ebooks & Guides — Synup",
    description: "Download free ebooks and guides on local SEO, reputation management, and agency growth.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/ebooks`,
        de: `${baseUrl}/de/ebooks`,
        fr: `${baseUrl}/fr/ebooks`,
        es: `${baseUrl}/es/ebooks`,
      },
    },
  };
}

export default async function EbooksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const items = await getAllCollectionItems(locale as Locale, "ebooks");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cards = items.map((item) => {
    const ebook = item as unknown as Ebook;
    return {
      title: ebook.title,
      description: ebook.description,
      image: ebook.coverImage ? { src: ebook.coverImage.url, alt: ebook.coverImage.alt } : undefined,
      badge: ebook.gated ? "Free Download" : "Free",
      href: `${prefix}/ebooks/${item.slug}`,
      ctaLabel: "Download",
    };
  });

  return (
    <>
      <HeroSection
        eyebrow="Free Resources"
        headline="Ebooks & Guides"
        subheadline="Download free resources to level up your agency knowledge on local SEO, reputation management, and more."
        centered
      />
      {cards.length > 0 ? (
        <CardGrid items={cards} columns={3} />
      ) : (
        <section className="py-[var(--synup-space-section)] bg-[var(--synup-color-bg-surface)]">
          <div className="text-center text-[var(--synup-color-secondary-text)] py-20">
            Content loading — run the transform script to populate.
          </div>
        </section>
      )}
    </>
  );
}
