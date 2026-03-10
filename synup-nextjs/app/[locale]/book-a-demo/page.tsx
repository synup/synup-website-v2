import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { FormSection } from "@/components/sections/FormSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

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
  const path = locale === "en" ? "/book-a-demo" : `/${locale}/book-a-demo`;
  return {
    title: "Book a Demo — Synup",
    description:
      "Schedule a call with our product specialist today for a personalized growth plan. Whether you're an agency or a reseller partner, Synup helps you expand your product stack.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/book-a-demo`,
        de: `${baseUrl}/de/book-a-demo`,
        fr: `${baseUrl}/fr/book-a-demo`,
        es: `${baseUrl}/es/book-a-demo`,
      },
    },
  };
}

export default async function BookADemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const sidePoints = (
    <ul className="list-none p-0 m-0 flex flex-col gap-4">
      {[
        "Expand your product stack without overhead",
        "Generate recurring revenue streams",
        "White-label & resell marketing tools",
        "Dedicated Customer Success Manager",
        "Transparent, tiered pricing that scales",
      ].map((point, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-5 h-5 rounded-full bg-[var(--synup-color-tint-green)] text-[var(--synup-color-tint-green-tick)] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
            ✓
          </span>
          <span className="text-[var(--synup-font-size-regular)] text-[var(--synup-color-secondary-text)]">
            {point}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <FormSection
      eyebrow="Get Started"
      headline="Grow Your Business. Without Building From Scratch."
      subheadline="Whether you're an agency or a reseller partner, Synup helps you expand your product stack and generate recurring revenue, without overhead or complexity."
      sideContent={sidePoints}
      fields={[
        { name: "firstName", label: "First Name", type: "text", required: true },
        { name: "lastName", label: "Last Name", type: "text", required: true },
        { name: "email", label: "Work Email", type: "email", required: true },
        { name: "company", label: "Company Name", type: "text", required: true },
        { name: "phone", label: "Phone Number", type: "tel" },
        {
          name: "agencySize",
          label: "Agency Size",
          type: "select",
          options: [
            { value: "solo", label: "Solo / Freelancer" },
            { value: "2-10", label: "2-10 employees" },
            { value: "11-50", label: "11-50 employees" },
            { value: "51-200", label: "51-200 employees" },
            { value: "200+", label: "200+ employees" },
          ],
        },
      ]}
      submitLabel="Schedule My Demo"
      successRedirect={`${prefix}/contact-success`}
      actionUrl="/api/book-demo"
    />
  );
}
