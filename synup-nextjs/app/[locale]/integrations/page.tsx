import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllCollectionItems, type Locale } from "@/lib/content";
import type { Integration } from "@/lib/content-types";
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
  const path = locale === "en" ? "/integrations" : `/${locale}/integrations`;
  return {
    title: "Integrations — Synup",
    description:
      "Connect Synup with your favorite tools. Browse our integrations with Google, Facebook, CRMs, and 40+ other platforms.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/integrations`,
        de: `${baseUrl}/de/integrations`,
        fr: `${baseUrl}/fr/integrations`,
        es: `${baseUrl}/es/integrations`,
      },
    },
  };
}

export default async function IntegrationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const items = await getAllCollectionItems(locale as Locale, "integrations");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cards = items.map((item) => {
    const integration = item as unknown as Integration;
    return {
      title: integration.name,
      description: integration.description,
      image: integration.logo
        ? { src: integration.logo.url, alt: integration.logo.alt }
        : undefined,
      href: `${prefix}/integrations/${item.slug}`,
      ctaLabel: "Learn More",
    };
  });

  return (
    <>
      <HeroSection
        eyebrow="Integrations"
        headline="Connect Synup with Your Favorite Tools"
        subheadline="Synup integrates with 40+ platforms including Google, Facebook, Yelp, CRMs, and more. Browse all integrations below."
        centered
      />

      {cards.length > 0 ? (
        <CardGrid
          items={cards}
          columns={3}
        />
      ) : (
        <section className="py-[var(--synup-space-section)] bg-[var(--synup-color-bg-surface)]">
          <div className="text-center text-[var(--synup-color-secondary-text)] py-20">
            Integrations content loading — run the transform script to populate.
          </div>
        </section>
      )}
    </>
  );
}
