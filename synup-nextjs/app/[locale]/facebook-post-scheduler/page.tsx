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
    title: "Free Facebook Post Scheduler — Synup",
    description: "Schedule Facebook posts for free with Synup's social media management tools.",
    alternates: { canonical: `${baseUrl}${locale === "en" ? "/facebook-post-scheduler" : `/${locale}/facebook-post-scheduler`}` },
  };
}

export default async function FacebookPostSchedulerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  return (
    <>
      <HeroSection
        eyebrow="Free Tool"
        headline="Free Facebook Post Scheduler"
        subheadline="Schedule your Facebook posts in advance. Manage all your clients' Facebook content from one dashboard."
        ctas={[{ label: "Try For Free", href: `${prefix}/freetrial`, variant: "primary" }, { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "secondary" }]}
        centered
      />
      <CTABanner headline="Manage All Social Media in One Place" primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }} variant="brand" />
    </>
  );
}
