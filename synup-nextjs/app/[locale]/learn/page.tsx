import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllCollectionItems, type Locale } from "@/lib/content";
import type { Learn } from "@/lib/content-types";
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
  const path = locale === "en" ? "/learn" : `/${locale}/learn`;
  return {
    title: "Learn — Synup Blog & Education",
    description:
      "Explore our content library to level up your agency knowledge. Articles, guides, and insights on local SEO, reputation management, and agency growth.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/learn`,
        de: `${baseUrl}/de/learn`,
        fr: `${baseUrl}/fr/learn`,
        es: `${baseUrl}/es/learn`,
      },
    },
  };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const items = await getAllCollectionItems(locale as Locale, "learns");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cards = items.map((item) => {
    const learn = item as unknown as Learn;
    return {
      title: learn.title,
      description: learn.headline,
      image: learn.heroImage
        ? { src: learn.heroImage.url, alt: learn.heroImage.alt }
        : undefined,
      href: `${prefix}/learn/${item.slug}`,
      date: learn.publishedAt
        ? new Date(learn.publishedAt).toLocaleDateString()
        : undefined,
      author: learn.author,
      ctaLabel: "Read Article",
    };
  });

  return (
    <>
      <HeroSection
        eyebrow="Resources"
        headline="Explore Our Content Library"
        subheadline="Stay updated with the latest in local SEO, reputation management, and agency growth strategies."
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
