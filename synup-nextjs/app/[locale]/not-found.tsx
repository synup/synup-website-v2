/**
 * Branded 404 page — shown when a [locale] route is not found.
 * This file lives inside [locale]/ so the locale layout (header/footer) wraps it.
 */

import { Container } from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-[var(--synup-space-section)] bg-[var(--synup-color-bg-surface)] min-h-[70vh] flex items-center">
      <Container size="small">
        <div className="text-center flex flex-col items-center gap-[var(--synup-space-24)]">
          {/* Large 404 */}
          <span className="text-[8rem] font-[var(--synup-font-weight-bold)] text-[var(--synup-color-tint-blue)] leading-none select-none">
            404
          </span>

          <Heading as="h1" className="text-[var(--synup-color-primary-text)]">
            Page Not Found
          </Heading>

          <Text
            size="medium"
            className="text-[var(--synup-color-secondary-text)] m-0 max-w-[480px]"
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
            you back on track.
          </Text>

          <div className="flex flex-wrap gap-[var(--synup-space-16)] justify-center">
            <Button href="/" variant="primary">
              Go to Homepage
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Support
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
