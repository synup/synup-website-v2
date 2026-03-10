import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllCollectionItems, type Locale } from "@/lib/content";
import type { Tool } from "@/lib/content-types";
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
  const path = locale === "en" ? "/tools" : `/${locale}/tools`;
  return {
    title: "Free Tools for Marketers — Synup",
    description: "Free tools to help you grow your agency and deliver better results for clients.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/tools`,
        de: `${baseUrl}/de/tools`,
        fr: `${baseUrl}/fr/tools`,
        es: `${baseUrl}/es/tools`,
      },
    },
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const items = await getAllCollectionItems(locale as Locale, "tools");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cards = items.map((item) => {
    const tool = item as unknown as Tool;
    return {
      title: tool.name,
      description: tool.description,
      image: tool.image ? { src: tool.image.url, alt: tool.image.alt } : undefined,
      href: `${prefix}/tools/${item.slug}`,
      badge: "Free",
      ctaLabel: "Use Tool",
    };
  });

  return (
    <>
      <HeroSection
        eyebrow="Free Tools"
        headline="Free Tools for Marketers"
        subheadline="Powerful free tools to help agencies and marketers grow their clients' online presence."
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
