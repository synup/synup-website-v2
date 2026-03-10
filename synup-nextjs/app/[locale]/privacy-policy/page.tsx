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
  const path = locale === "en" ? "/privacy-policy" : `/${locale}/privacy-policy`;
  return {
    title: "Privacy Policy — Synup",
    description: "Read Synup's privacy policy to understand how we collect, use, and protect your personal information.",
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/privacy-policy`,
        de: `${baseUrl}/de/privacy-policy`,
        fr: `${baseUrl}/fr/privacy-policy`,
        es: `${baseUrl}/es/privacy-policy`,
      },
    },
    robots: { index: false },
  };
}

export default async function PrivacyPolicyPage({
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
          Privacy Policy
        </Heading>
        <div className="prose prose-synup max-w-none text-[var(--synup-color-secondary-text)]">
          <p className="text-[var(--synup-font-size-small)] text-[var(--synup-color-secondary-text)]">
            Last updated: March 2025
          </p>
          <p>
            Synup Corporation (&ldquo;Synup&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is
            committed to protecting your privacy. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p className="text-[var(--synup-color-secondary-text)]">
            The full privacy policy content is maintained in the Webflow CMS and will be imported
            via the content layer. For the current version, please refer to the live Webflow site
            or contact{" "}
            <a
              href="mailto:privacy@synup.com"
              className="text-[var(--synup-color-action-text)] underline"
            >
              privacy@synup.com
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
