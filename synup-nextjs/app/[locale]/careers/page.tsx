import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContentBlock } from "@/components/sections/ContentBlock";
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
  const path = locale === "en" ? "/careers" : `/${locale}/careers`;
  return {
    title: "Careers at Synup — Join Us and Help Change Marketing Forever",
    description:
      "Synup has an innovative, collaborative, and passionate culture. We look for creative and driven self-starters. See open positions.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/careers`,
        de: `${baseUrl}/de/careers`,
        fr: `${baseUrl}/fr/careers`,
        es: `${baseUrl}/es/careers`,
      },
    },
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      {/* Hero */}
      <HeroSection
        eyebrow="CAREERS"
        headline="Join us and help change marketing forever."
        ctas={[
          { label: "See Open Positions", href: "https://jobs.lever.co/synup", variant: "primary", external: true },
        ]}
        centered
      />

      {/* Mission */}
      <ContentBlock
        eyebrow="Our Mission"
        headline="Helping businesses transform their local brand awareness"
        bodyText="Our mission is to help businesses continuously transform their local brand awareness, new customer acquisition, and sales results. We enable our clients to seamlessly manage and optimize their business information and content — across devices and digital platforms — to improve discoverability and conversion."
      />

      {/* Culture */}
      <ContentBlock
        eyebrow="Our Culture"
        headline="Innovative, collaborative, and passionate"
        bodyText="Synup has an innovative, collaborative and passionate culture. We look for creative and driven self-starters that can think globally, relate to others empathetically, and act quickly. We foster a culture of open dialogue, mutual respect, and intellectual rigor, with a healthy dose of humor. If you're a collaborative team player capable of wearing multiple hats, Synup is the right place for you.

Synup is an equal opportunity workplace that is committed to creating an inclusive environment for all employees regardless of race, color, religion, gender, nationality, political affiliation, sexual orientation, marital status, age, disability, genetic information, membership in an employee organization, parental status, military service, socio-economic level, or other non-merit factors."
        imagePosition="left"
      />

      {/* CTA */}
      <CTABanner
        eyebrow="Careers at Synup"
        headline="Explore Your Future Career Opportunities"
        primaryCta={{ label: "See Open Positions", href: "https://jobs.lever.co/synup", external: true }}
        variant="brand"
      />
    </>
  );
}
