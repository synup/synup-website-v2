import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingTable } from "@/components/sections/PricingTable";
import { FAQSection } from "@/components/sections/FAQSection";
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
  const path = locale === "en" ? "/pricing" : `/${locale}/pricing`;
  return {
    title: "Pricing | Simple, Transparent Agency Plans — Synup",
    description:
      "Simple, transparent pricing for the most essential tools your agency needs. Scale with our marketing add-ons flexibly. Startup, Agency and Scale plans.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/pricing`,
        de: `${baseUrl}/de/pricing`,
        fr: `${baseUrl}/fr/pricing`,
        es: `${baseUrl}/es/pricing`,
      },
    },
  };
}

export default async function PricingPage({
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
        headline="Select the most suitable plan for your agency"
        subheadline="Simple, transparent pricing for the most essential tools your agency needs. Scale with our marketing add-ons flexibly."
        centered
      />

      {/* Pricing plans */}
      <PricingTable
        plans={[
          {
            name: "Startup",
            description: "Ideal for agencies with small client count that need quick access to basic features.",
            priceAnnual: "$79",
            priceMonthly: "$99",
            billingNote: "/month | billed annually",
            savingsBadge: "Save 20%",
            cta: { label: "Book a Demo", href: `${prefix}/book-a-demo` },
            features: [
              { label: "team members", included: "Upto 5" },
              { label: "client accounts", included: "Upto 25" },
              { label: "client users", included: "Upto 50" },
              { label: "Listings Management - 25 Locations", included: true },
              { label: "Review Management - 25 Locations", included: true },
            ],
          },
          {
            name: "Agency",
            description: "Ideal for growth stage agencies, looking to streamline their operations with ease.",
            priceAnnual: "$199",
            priceMonthly: "$249",
            billingNote: "/month | billed annually",
            savingsBadge: "Save 20%",
            featured: true,
            cta: { label: "Book a Demo", href: `${prefix}/book-a-demo` },
            features: [
              { label: "team members", included: "Upto 10" },
              { label: "client accounts", included: "Upto 100" },
              { label: "client users", included: "Unlimited" },
              { label: "Listings Management - 100 Locations", included: true },
              { label: "Review Management - 100 Locations", included: true },
            ],
          },
          {
            name: "Scale",
            description: "Ideal for large agencies looking to power their operations with a robust platform.",
            priceAnnual: "$799",
            priceMonthly: "$999",
            billingNote: "/month | billed annually",
            savingsBadge: "Save 20%",
            cta: { label: "Book a Demo", href: `${prefix}/book-a-demo` },
            features: [
              { label: "team members", included: "Upto 50" },
              { label: "client accounts", included: "Upto 500" },
              { label: "client users", included: "Unlimited" },
              { label: "Listings Management - 500 Locations", included: true },
              { label: "Review Management - 500 Locations", included: true },
            ],
          },
        ]}
      />

      {/* FAQ */}
      <FAQSection
        eyebrow="Frequently Asked Questions"
        headline="Questions about pricing?"
        items={[
          {
            question: "Can I change my plan later?",
            answer:
              "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
          },
          {
            question: "What happens if I exceed my client account limit?",
            answer:
              "You can purchase additional client accounts at $1.50 per account per month. Additional team members are $5 per member per month.",
          },
          {
            question: "Is there a free trial?",
            answer:
              "We offer personalized demos with our team. Book a demo to see Synup in action and discuss which plan is right for your agency.",
          },
          {
            question: "What payment methods do you accept?",
            answer:
              "We accept all major credit cards. Annual plans can also be paid by invoice.",
          },
          {
            question: "Can I white-label the platform?",
            answer:
              "Yes! White-labeling is available on Agency and Scale plans. Add your logo, custom URL, and brand colors to deliver a seamless client experience.",
          },
        ]}
      />

      {/* CTA */}
      <CTABanner
        headline="Ready to grow your agency?"
        subheadline="Book a call with our partnership manager to explore the right plan for your agency."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        secondaryCta={{ label: "Contact Sales", href: `${prefix}/contact` }}
        variant="brand"
      />
    </>
  );
}
