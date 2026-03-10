import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllCollectionItems, type Locale } from "@/lib/content";
import type { Video } from "@/lib/content-types";
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
  const path = locale === "en" ? "/video" : `/${locale}/video`;
  return {
    title: "Videos — Synup",
    description: "View product videos, webinars, and testimonials from Synup.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/video`,
        de: `${baseUrl}/de/video`,
        fr: `${baseUrl}/fr/video`,
        es: `${baseUrl}/es/video`,
      },
    },
  };
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const items = await getAllCollectionItems(locale as Locale, "videos");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cards = items.map((item) => {
    const video = item as unknown as Video;
    return {
      title: video.title,
      description: video.description,
      image: video.thumbnail ? { src: video.thumbnail.url, alt: video.thumbnail.alt } : undefined,
      href: `${prefix}/video/${item.slug}`,
      date: video.publishedAt ? new Date(video.publishedAt).toLocaleDateString() : undefined,
      badge: video.duration,
      ctaLabel: "Watch",
    };
  });

  return (
    <>
      <HeroSection
        eyebrow="Resources"
        headline="Product Videos, Webinars & Testimonials"
        subheadline="View product demos, learn from webinars, and hear directly from Synup customers."
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
