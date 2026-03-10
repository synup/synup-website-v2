import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Heading, Text, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Style Guide — Synup Design System",
    description: "The Synup design system style guide — colors, typography, components.",
    robots: { index: false },
  };
}

export default async function StyleGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-[var(--synup-space-section)] bg-white">
      <Container size="large">
        <Heading as="h1" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-64)]">
          Synup Design System
        </Heading>

        {/* Colors */}
        <section className="mb-[var(--synup-space-64)]">
          <Heading as="h2" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-32)]">Colors</Heading>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Brand Blue", var: "--synup-color-brand-blue" },
              { name: "Brand Pink", var: "--synup-color-brand-pink" },
              { name: "Action BG", var: "--synup-color-action-bg" },
              { name: "Primary Text", var: "--synup-color-primary-text" },
              { name: "BG Surface", var: "--synup-color-bg-surface" },
              { name: "BG Dark", var: "--synup-color-bg-dark" },
              { name: "Tint Blue", var: "--synup-color-tint-blue" },
              { name: "Tint Green", var: "--synup-color-tint-green" },
            ].map((color) => (
              <div key={color.var} className="flex flex-col gap-2">
                <div className="h-16 rounded-[var(--synup-radius-md)] border border-gray-200" style={{ backgroundColor: `var(${color.var})` }} />
                <Caption className="text-[var(--synup-color-secondary-text)]">{color.name}</Caption>
                <Caption className="font-mono text-[var(--synup-color-secondary-text)]">{color.var}</Caption>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-[var(--synup-space-64)]">
          <Heading as="h2" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-32)]">Typography</Heading>
          <div className="flex flex-col gap-4">
            {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((level) => (
              <Heading key={level} as={level} className="text-[var(--synup-color-primary-text)]">
                {level.toUpperCase()} — The quick brown fox jumps over the lazy dog
              </Heading>
            ))}
            <Text size="large">Large — The quick brown fox jumps over the lazy dog</Text>
            <Text size="medium">Medium — The quick brown fox jumps over the lazy dog</Text>
            <Text>Regular — The quick brown fox jumps over the lazy dog</Text>
            <Text size="small">Small — The quick brown fox jumps over the lazy dog</Text>
            <Caption>Caption — The quick brown fox</Caption>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-[var(--synup-space-64)]">
          <Heading as="h2" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-32)]">Buttons</Heading>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-[var(--synup-space-64)]">
          <Heading as="h2" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-32)]">Badges</Heading>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="brand">Brand</Badge>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-[var(--synup-space-64)]">
          <Heading as="h2" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-32)]">Cards</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card title="Default Card" body="A standard card with title and body content." surface="default" />
            <Card title="Muted Card" body="A muted surface card." surface="muted" badge={<Badge>New</Badge>} />
            <Card title="Dark Card" body="A dark surface card." surface="dark" />
          </div>
        </section>
      </Container>
    </div>
  );
}
