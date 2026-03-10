import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllCollectionItems, type Locale } from "@/lib/content";
import type { HowTo } from "@/lib/content-types";
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
  const path = locale === "en" ? "/how-to" : `/${locale}/how-to`;
  return {
    title: "How-To Guides — Synup",
    description: "Step-by-step guides to help you get the most out of Synup and grow your agency.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/how-to`,
        de: `${baseUrl}/de/how-to`,
        fr: `${baseUrl}/fr/how-to`,
        es: `${baseUrl}/es/how-to`,
      },
    },
  };
}

export default async function HowToPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const items = await getAllCollectionItems(locale as Locale, "how-tos");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cards = items.map((item) => {
    const howTo = item as unknown as HowTo;
    return {
      title: howTo.title,
      description: howTo.headline,
      image: howTo.heroImage ? { src: howTo.heroImage.url, alt: howTo.heroImage.alt } : undefined,
      href: `${prefix}/how-to/${item.slug}`,
      ctaLabel: "Read Guide",
    };
  });

  return (
    <>
      <HeroSection
        eyebrow="How-To Guides"
        headline="Step-by-Step Guides for Agency Growth"
        subheadline="Practical guides to help you master local SEO, reputation management, and agency operations."
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
