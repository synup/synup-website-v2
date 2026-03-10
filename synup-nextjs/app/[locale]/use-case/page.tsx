import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllCollectionItems, type Locale } from "@/lib/content";
import type { UseCase } from "@/lib/content-types";
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
  const path = locale === "en" ? "/use-case" : `/${locale}/use-case`;
  return {
    title: "Use Cases — Synup",
    description: "Explore how agencies and businesses use Synup across different industries and scenarios.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/use-case`,
        de: `${baseUrl}/de/use-case`,
        fr: `${baseUrl}/fr/use-case`,
        es: `${baseUrl}/es/use-case`,
      },
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const items = await getAllCollectionItems(locale as Locale, "use-cases");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cards = items.map((item) => {
    const uc = item as unknown as UseCase;
    return {
      title: uc.title,
      description: uc.headline,
      image: uc.heroImage ? { src: uc.heroImage.url, alt: uc.heroImage.alt } : undefined,
      href: `${prefix}/use-case/${item.slug}`,
      ctaLabel: "Learn More",
    };
  });

  return (
    <>
      <HeroSection
        eyebrow="Use Cases"
        headline="See How Synup Helps Across Industries"
        subheadline="Explore real-world use cases and discover how agencies use Synup to grow their clients' online presence."
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
