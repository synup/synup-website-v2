import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";
import { FormSection } from "@/components/sections/FormSection";

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
  const path = locale === "en" ? "/partners" : `/${locale}/partners`;
  return {
    title: "Partner with Synup | Reseller & Agency Partner Program",
    description:
      "Accelerate your agency's growth by partnering with Synup. Whitelabel and resell digital marketing solutions, drive more leads, and manage your clients all in one place.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/partners`,
        de: `${baseUrl}/de/partners`,
        fr: `${baseUrl}/fr/partners`,
        es: `${baseUrl}/es/partners`,
      },
    },
  };
}

export default async function PartnersPage({
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
        headline="Partner with Synup!"
        subheadline="Accelerate your agency's growth by partnering with Synup. Whitelabel and resell a host of digital marketing solutions, drive more high-intent leads, and manage your clients all in one place."
        ctas={[
          { label: "Talk to us", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
        image={{
          src: "/assets/images/partners-hero.png",
          alt: "Synup partner program illustration",
          width: 640,
          height: 480,
        }}
      />

      {/* Growth section */}
      <FeatureGrid
        eyebrow="Growth"
        headline="A partner-first platform built to help you scale your agency"
        columns={3}
        items={[
          {
            title: "Done-for-you Marketing Solutions",
            description: "Resell a local marketing platform for listing management, reviews, and social.",
          },
          {
            title: "Get New Leads on Auto-pilot",
            description: "Find your ideal prospects based on industry, size, location, and more!",
          },
          {
            title: "Close Deals Faster",
            description: "Close big opportunities – get help with prospecting, lead-gen, and client enablement.",
          },
        ]}
      />

      {/* Scan tool */}
      <ContentBlock
        eyebrow="Lead Generation"
        headline="Generate more high-quality leads with our scan tool"
        subheadline="Win over prospects with a comprehensive, white-labeled scan report that scans their local listings, reporting on voice search optimization, review visibility, social visibility, and search visibility."
        cta={{ label: "Try the Scan Tool", href: `${prefix}/get-reviews` }}
        image={{
          src: "/assets/images/scan-tool-preview.png",
          alt: "Synup scan tool preview",
          width: 560,
          height: 420,
        }}
        imagePosition="right"
      />

      {/* Reseller partner */}
      <ContentBlock
        eyebrow="For your business"
        headline="Reseller Partner"
        bodyText="As a Reseller Partner, you will receive the training and the support you need to make your clients successful while growing your business. Our completely transparent, tiered pricing system ensures your costs lower as your client base grows."
        imagePosition="left"
      />

      {/* Contact form */}
      <FormSection
        eyebrow="Become a Partner"
        headline="Let's talk about partnership"
        subheadline="Tell us about your agency and we'll get in touch with custom partnership details."
        fields={[
          { name: "name", label: "Full Name", type: "text", required: true },
          { name: "email", label: "Work Email", type: "email", required: true },
          { name: "company", label: "Company Name", type: "text", required: true },
          { name: "clientCount", label: "Estimated Number of Clients", type: "select", options: [
            { value: "1-10", label: "1-10 clients" },
            { value: "11-50", label: "11-50 clients" },
            { value: "51-200", label: "51-200 clients" },
            { value: "200+", label: "200+ clients" },
          ]},
          { name: "message", label: "Tell us about your agency", type: "textarea" },
        ]}
        submitLabel="Get Partnership Details"
        successRedirect={`${prefix}/contact-success`}
        actionUrl="/api/partner-inquiry"
      />
    </>
  );
}
