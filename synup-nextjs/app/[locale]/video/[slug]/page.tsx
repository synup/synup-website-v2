import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCollectionItem,
  listCollectionSlugs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/lib/content";
import type { Video } from "@/lib/content-types";
import { DetailHero } from "@/components/sections/DetailHero";
import { VideoEmbed } from "@/components/sections/VideoEmbed";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("en", "videos");
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
  const item = await getCollectionItem(locale as Locale, "videos", slug);
  if (!item) return { title: "Video — Synup" };

  const video = item as unknown as Video;
  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/video/${slug}` : `/${locale}/video/${slug}`;

  return {
    title: video.seo?.title ?? `${video.title} — Synup`,
    description: video.seo?.description ?? video.description,
    alternates: {
      canonical: video.seo?.canonical ?? `${baseUrl}${path}`,
    },
  };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const item = await getCollectionItem(locale as Locale, "videos", slug);
  if (!item) notFound();

  const video = item as unknown as Video;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <DetailHero
        collectionLabel="Video"
        headline={video.title}
        subheadline={video.description}
        meta={[
          ...(video.duration ? [{ label: "Duration", value: video.duration }] : []),
          ...(video.publishedAt
            ? [{ label: "Published", value: new Date(video.publishedAt).toLocaleDateString() }]
            : []),
        ]}
      />

      <VideoEmbed
        embedUrl={video.embedUrl}
        title={video.title}
      />

      <CTABanner
        headline="See Synup in Action"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
