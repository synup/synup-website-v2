import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllCollectionItems, type Locale } from "@/lib/content";
import type { CaseStudy } from "@/lib/content-types";
import { HeroSection } from "@/components/sections/HeroSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";

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
  const path = locale === "en" ? "/case-studies" : `/${locale}/case-studies`;
  return {
    title: "Customer Stories & Case Studies — Synup",
    description:
      "See how agencies and businesses use Synup to grow their online presence, win more clients, and deliver exceptional results.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/case-studies`,
        de: `${baseUrl}/de/case-studies`,
        fr: `${baseUrl}/fr/case-studies`,
        es: `${baseUrl}/es/case-studies`,
      },
    },
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const items = await getAllCollectionItems(locale as Locale, "case-studies");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cards = items.map((item) => {
    const cs = item as unknown as CaseStudy;
    return {
      title: cs.customerName,
      description: cs.headline,
      image: cs.heroImage
        ? { src: cs.heroImage.url, alt: cs.heroImage.alt }
        : cs.logo
        ? { src: cs.logo.url, alt: cs.logo.alt }
        : undefined,
      href: `${prefix}/case-studies/${item.slug}`,
      category: cs.industry,
      ctaLabel: "Read Story",
    };
  });

  return (
    <>
      <HeroSection
        eyebrow="Customer Stories"
        headline="What Our Customers Say"
        subheadline="See how agencies and businesses around the world use Synup to grow their online presence and deliver exceptional results."
        centered
      />

      {cards.length > 0 ? (
        <CardGrid items={cards} columns={3} />
      ) : (
        <section className="py-[var(--synup-space-section)] bg-[var(--synup-color-bg-surface)]">
          <div className="text-center text-[var(--synup-color-secondary-text)] py-20">
            Case studies content loading — run the transform script to populate.
          </div>
        </section>
      )}

      <CTABanner
        headline="Ready to become a success story?"
        subheadline="Join 5000+ agencies using Synup to grow their business."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
