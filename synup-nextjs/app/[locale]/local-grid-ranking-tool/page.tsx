import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://www.synup.com";
  return {
    title: "local-grid-ranking-tool — Synup",
    description: "Free local-grid-ranking-tool tool from Synup.",
    alternates: { canonical: `${baseUrl}${locale === "en" ? "/local-grid-ranking-tool" : `/${locale}/local-grid-ranking-tool`}` },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  return (
    <>
      <HeroSection
        eyebrow="Free Tool"
        headline="local-grid-ranking-tool"
        subheadline="A free tool from Synup to help agencies grow their clients' online presence."
        ctas={[{ label: "Try For Free", href: `${prefix}/freetrial`, variant: "primary" as const }]}
        centered
      />
      <CTABanner headline="Explore All Synup Tools" primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }} variant="brand" />
    </>
  );
}
