/**
 * FormSection — Contact/demo request form.
 * Matches Webflow section: .section_form, .contact-form, .demo-form
 *
 * This is a client component (uses state for form submission).
 * Form submissions post to /api/contact — no secrets in component.
 */

"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface FormSectionProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  fields: FormField[];
  /** Submit button label */
  submitLabel?: string;
  /** Where to redirect after submit */
  successRedirect?: string;
  /** Success message if no redirect */
  successMessage?: string;
  /** Side content (bullet points, logos, etc.) */
  sideContent?: React.ReactNode;
  /** Form POST endpoint — defaults to /api/contact */
  actionUrl?: string;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function FormSection({
  eyebrow,
  headline,
  subheadline,
  fields,
  submitLabel = "Submit",
  successRedirect,
  successMessage = "Thank you! We'll be in touch shortly.",
  sideContent,
  actionUrl = "/api/contact",
  className = "",
}: FormSectionProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(actionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      if (successRedirect) {
        window.location.href = successRedirect;
      } else {
        setStatus("success");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
      console.error("[FormSection] submit error:", err);
    }
  }

  return (
    <section
      className={[
        "section_form",
        "bg-white",
        "py-[var(--synup-space-section)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container size={sideContent ? "large" : "small"}>
        <div className={sideContent ? "grid grid-cols-1 lg:grid-cols-2 gap-[var(--synup-space-64)]" : ""}>
          {/* Side content */}
          {sideContent && (
            <div className="flex flex-col gap-[var(--synup-space-24)]">
              {eyebrow && (
                <span className="inline-block w-fit px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
                  {eyebrow}
                </span>
              )}
              <Heading as="h2" className="text-[var(--synup-color-primary-text)]">
                {headline}
              </Heading>
              {subheadline && (
                <Text size="medium" className="text-[var(--synup-color-secondary-text)] m-0">
                  {subheadline}
                </Text>
              )}
              {sideContent}
            </div>
          )}

          {/* Form */}
          <div>
            {!sideContent && (
              <div className="text-center mb-[var(--synup-space-48)]">
                {eyebrow && (
                  <span className="inline-block mb-[var(--synup-space-12)] px-3 py-1 rounded-full text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] bg-[var(--synup-color-tint-blue)] text-[var(--synup-color-brand-blue)]">
                    {eyebrow}
                  </span>
                )}
                <Heading as="h2" className="text-[var(--synup-color-primary-text)] mb-[var(--synup-space-16)]">
                  {headline}
                </Heading>
                {subheadline && (
                  <Text size="medium" className="text-[var(--synup-color-secondary-text)] m-0">
                    {subheadline}
                  </Text>
                )}
              </div>
            )}

            {status === "success" ? (
              <div className="rounded-[var(--synup-radius-md)] bg-[var(--synup-color-success-bg)] p-[var(--synup-space-32)] text-center">
                <p className="text-[var(--synup-color-success-text)] font-[var(--synup-font-weight-semibold)] m-0">
                  {successMessage}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[var(--synup-space-20)]"
                noValidate
              >
                {fields.map((field) => {
                  if (field.type === "textarea") {
                    return (
                      <Textarea
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={4}
                      />
                    );
                  }
                  if (field.type === "select" && field.options) {
                    return (
                      <Select
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        options={field.options}
                        required={field.required}
                      />
                    );
                  }
                  return (
                    <Input
                      key={field.name}
                      name={field.name}
                      type={field.type}
                      label={field.label}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  );
                })}

                {status === "error" && (
                  <p className="text-[var(--synup-color-error-text)] text-[var(--synup-font-size-small)] m-0">
                    {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Submitting…" : submitLabel}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
