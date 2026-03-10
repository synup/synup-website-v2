/**
 * Input, Textarea, Select — Synup form components
 * Matches Webflow class: .form_input, .form_input.is-text-area, .form_input.is-select-input
 * All components are typed, accessible, and styled with CSS variables.
 */

"use client";

import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

/* ─── Shared base classes ────────────────────────────────────────────────── */

const inputBase = [
  "block w-full",
  "border border-[var(--synup-color-action-bg)]",
  "bg-transparent",
  "text-[var(--synup-font-size-regular)]",
  "text-[var(--synup-color-primary-text)]",
  "placeholder:text-[var(--synup-color-secondary-text)]",
  "px-4 py-2",
  "min-h-[3rem]",
  "mb-3",
  "outline-none",
  "transition-all duration-200",
  "focus:ring-2 focus:ring-[var(--synup-color-action-bg)] focus:ring-offset-0",
  "disabled:opacity-50 disabled:cursor-not-allowed",
].join(" ");

/* ─── Input ──────────────────────────────────────────────────────────────── */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Visible error message */
  error?: string;
  /** Helper / description text */
  hint?: string;
}

export function Input({ label, error, hint, id, className = "", ...rest }: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-[var(--synup-space-4)]">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] text-[var(--synup-color-primary-text)]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[inputBase, error ? "border-[var(--synup-color-error-text)]" : "", className]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? `${inputId}-error` : "", hint ? `${inputId}-hint` : ""]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...rest}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-[var(--synup-font-size-small)] text-[var(--synup-color-secondary-text)]">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-[var(--synup-font-size-small)] text-[var(--synup-color-error-text)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Textarea ───────────────────────────────────────────────────────────── */

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, id, className = "", ...rest }: TextareaProps) {
  const fieldId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-[var(--synup-space-4)]">
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] text-[var(--synup-color-primary-text)]"
        >
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        className={[
          inputBase,
          "min-h-[8rem] pt-3 resize-y",
          error ? "border-[var(--synup-color-error-text)]" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? `${fieldId}-error` : "", hint ? `${fieldId}-hint` : ""]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...rest}
      />
      {hint && !error && (
        <p id={`${fieldId}-hint`} className="text-[var(--synup-font-size-small)] text-[var(--synup-color-secondary-text)]">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="text-[var(--synup-font-size-small)] text-[var(--synup-color-error-text)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Select ─────────────────────────────────────────────────────────────── */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
}

export function Select({
  label,
  options,
  placeholder,
  error,
  hint,
  id,
  className = "",
  ...rest
}: SelectProps) {
  const fieldId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-[var(--synup-space-4)]">
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[var(--synup-font-size-small)] font-[var(--synup-font-weight-medium)] text-[var(--synup-color-primary-text)]"
        >
          {label}
        </label>
      )}
      <select
        id={fieldId}
        className={[
          inputBase,
          "cursor-pointer appearance-none pr-8 bg-no-repeat",
          "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%230085ff' d='M0 0l6 8 6-8z'/%3E%3C/svg%3E\")] bg-[right_1rem_center]",
          error ? "border-[var(--synup-color-error-text)]" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? `${fieldId}-error` : "", hint ? `${fieldId}-hint` : ""]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error && (
        <p id={`${fieldId}-hint`} className="text-[var(--synup-font-size-small)] text-[var(--synup-color-secondary-text)]">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="text-[var(--synup-font-size-small)] text-[var(--synup-color-error-text)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
