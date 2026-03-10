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
    title: "Registration Successful — Synup",
    description: "Your registration is complete. Check your email to get started.",
    robots: { index: false },
  };
}

export default async function RegistrationSuccessPage({
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
          <div className="w-16 h-16 rounded-full bg-[var(--synup-color-tint-green)] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M8 16l6 6 10-12"
                stroke="var(--synup-color-tint-green-tick)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Heading as="h1" className="text-[var(--synup-color-primary-text)]">
            Registration Successful!
          </Heading>
          <Text size="medium" className="text-[var(--synup-color-secondary-text)] m-0">
            Your account is being set up. Check your email for next steps to get started with Synup.
          </Text>
          <Button href={`${prefix}/`} variant="primary">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
