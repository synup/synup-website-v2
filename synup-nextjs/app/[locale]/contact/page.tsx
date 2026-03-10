import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
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
  const path = locale === "en" ? "/contact" : `/${locale}/contact`;
  return {
    title: "Contact Us — Synup",
    description:
      "Reach out to us with questions about our product, features, pricing, demos, or anything else and we'll get right back to you.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/contact`,
        de: `${baseUrl}/de/contact`,
        fr: `${baseUrl}/fr/contact`,
        es: `${baseUrl}/es/contact`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <FormSection
      eyebrow="Get in touch with us"
      headline="Reach out to us with questions"
      subheadline="Reach out to us with questions you might have about our product, features, pricing, demos, or anything else and we'll get right back to you."
      fields={[
        { name: "firstName", label: "First Name", type: "text", placeholder: "Jane", required: true },
        { name: "lastName", label: "Last Name", type: "text", placeholder: "Smith", required: true },
        { name: "email", label: "Work Email", type: "email", placeholder: "jane@agency.com", required: true },
        { name: "company", label: "Company Name", type: "text", placeholder: "Your Agency", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" },
        { name: "message", label: "Message", type: "textarea", placeholder: "Tell us how we can help you…", required: true },
      ]}
      submitLabel="Send Message"
      successRedirect={`${prefix}/contact-success`}
      actionUrl="/api/contact"
    />
  );
}
