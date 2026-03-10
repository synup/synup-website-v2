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
    title: "managed-services — Synup",
    description: "Learn about managed-services at Synup.",
    alternates: { canonical: `${baseUrl}${locale === "en" ? "/managed-services" : `/${locale}/managed-services`}` },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  return (
    <>
      <HeroSection
        headline="managed-services"
        subheadline="Learn more about this feature or offering from Synup."
        ctas={[{ label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "primary" as const }]}
        centered
      />
      <CTABanner headline="Ready to Learn More?" primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }} variant="brand" />
    </>
  );
}
