import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Typography";

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
  const path = locale === "en" ? "/terms-and-conditions" : `/${locale}/terms-and-conditions`;
  return {
    title: "Terms and Conditions — Synup",
    description: "Read Synup's terms and conditions of service.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/terms-and-conditions`,
        de: `${baseUrl}/de/terms-and-conditions`,
        fr: `${baseUrl}/fr/terms-and-conditions`,
        es: `${baseUrl}/es/terms-and-conditions`,
      },
    },
    robots: { index: false },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-[var(--synup-space-section)] bg-white">
      <Container size="medium">
        <Heading as="h1" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-32)]">
          Terms and Conditions
        </Heading>
        <div className="prose max-w-none text-[var(--synup-color-secondary-text)]">
          <p className="text-[var(--synup-font-size-small)] text-[var(--synup-color-secondary-text)]">
            Last updated: March 2025
          </p>
          <p>
            By accessing or using Synup&apos;s services, you agree to be bound by these Terms and
            Conditions. Please read them carefully.
          </p>
          <p className="text-[var(--synup-color-secondary-text)]">
            The full terms content is maintained in the Webflow CMS and will be imported via the
            content layer. For the current version, please contact{" "}
            <a
              href="mailto:legal@synup.com"
              className="text-[var(--synup-color-action-text)] underline"
            >
              legal@synup.com
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
