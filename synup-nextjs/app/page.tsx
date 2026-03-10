import { redirect } from "next/navigation";

/**
 * Root page — redirects to default locale.
 * next-intl middleware handles this, but this is a safety net.
 */
export default function RootPage() {
  redirect("/en");
}
