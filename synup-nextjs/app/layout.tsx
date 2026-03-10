import type { ReactNode } from "react";

/**
 * Root layout — minimal shell.
 * The real layout (html lang, metadata, providers) lives in app/[locale]/layout.tsx.
 * This file exists because Next.js requires a root layout.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
