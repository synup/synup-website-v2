import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
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
  const path = locale === "en" ? "/freetrial" : `/${locale}/freetrial`;
  return {
    title: "Start Your Free Trial — Synup",
    description:
      "Synup centralizes customer feedback across platforms, automating review requests and delivering powerful insights that drive smarter business decisions.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/freetrial`,
        de: `${baseUrl}/de/freetrial`,
        fr: `${baseUrl}/fr/freetrial`,
        es: `${baseUrl}/es/freetrial`,
      },
    },
  };
}

export default async function FreeTrialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      {/* Testimonial up top */}
      <TestimonialSection
        testimonials={[
          {
            name: "Ifeoma E.",
            title: "Operational Supervisor",
            company: "Health, Wellness and Fitness",
            quote:
              "Synup centralizes customer feedback across platforms, automating review requests and delivering powerful insights that drive smarter business decisions.",
            rating: 5,
          },
        ]}
        layout="featured"
      />

      {/* Free trial form */}
      <FormSection
        eyebrow="Free Trial"
        headline="Start Your Free Trial"
        subheadline="Get started with Synup and see how it can transform your agency operations."
        fields={[
          { name: "firstName", label: "First Name", type: "text", required: true },
          { name: "lastName", label: "Last Name", type: "text", required: true },
          { name: "email", label: "Work Email", type: "email", required: true },
          { name: "company", label: "Company Name", type: "text", required: true },
          { name: "phone", label: "Phone Number", type: "tel" },
        ]}
        submitLabel="Start Free Trial"
        successRedirect={`${prefix}/registration-success`}
        actionUrl="/api/freetrial"
      />
    </>
  );
}
