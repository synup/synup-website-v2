import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Thank You — Synup",
    description: "Thank you for your interest in Synup.",
    robots: { index: false },
  };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <section className="py-[var(--synup-space-section)] bg-[var(--synup-color-bg-surface)] min-h-[60vh] flex items-center">
      <Container size="small">
        <div className="text-center flex flex-col items-center gap-[var(--synup-space-24)]">
          <Heading as="h1" className="text-[var(--synup-color-primary-text)]">
            Thank You!
          </Heading>
          <Text size="medium" className="text-[var(--synup-color-secondary-text)] m-0">
            Thank you for your interest in Synup. Our team will be in touch with you shortly.
          </Text>
          <Button href={`${prefix}/`} variant="primary">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
