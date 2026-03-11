export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { NavItem } from "@/components/layout/Nav";
import type { FooterLinkColumn, FooterLink } from "@/components/layout/Footer";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  };
  const { locale } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.synup.com";

  return {
    title: {
      template: "%s | Synup",
      default: "Synup — Manage Your Online Presence",
    },
    description:
      "Synup helps businesses manage listings, reputation, and social media across the web.",
    openGraph: {
      title: "Synup — Manage Your Online Presence",
      description:
        "Synup helps businesses manage listings, reputation, and social media across the web.",
      images: [
        {
          url: `${baseUrl}/assets/og-default.png`,
          width: 1200,
          height: 630,
          alt: "Synup — Manage Your Online Presence",
        },
      ],
      siteName: "Synup",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: [`${baseUrl}/assets/og-default.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/`,
      languages: {
        en: `${baseUrl}/en/`,
        de: `${baseUrl}/de/`,
        fr: `${baseUrl}/fr/`,
        es: `${baseUrl}/es/`,
        "x-default": `${baseUrl}/en/`,
      },
    },
  };
}

/* ─── Navigation data (placeholder — CMS agent will populate from content layer) ── */

function buildNavItems(locale: string): NavItem[] {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return [
    { label: "Products", href: `${prefix}/products` },
    { label: "Solutions", href: `${prefix}/solutions` },
    {
      label: "Resources",
      href: `${prefix}/resources`,
      children: [
        { label: "Blog", href: `${prefix}/learn` },
        { label: "Ebooks", href: `${prefix}/ebooks` },
        { label: "How-to Guides", href: `${prefix}/how-to` },
      ],
    },
    { label: "Pricing", href: `${prefix}/pricing` },
  ];
}

function buildFooterColumns(locale: string): FooterLinkColumn[] {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return [
    {
      heading: "Products",
      links: [
        { label: "Listings", href: `${prefix}/products` },
        { label: "Reputation", href: `${prefix}/products` },
        { label: "Social Media", href: `${prefix}/products` },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: `${prefix}/about` },
        { label: "Careers", href: `${prefix}/careers` },
        { label: "Partners", href: `${prefix}/partners` },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Blog", href: `${prefix}/learn` },
        { label: "Ebooks", href: `${prefix}/ebooks` },
        { label: "Tools", href: `${prefix}/tools` },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Contact", href: `${prefix}/contact` },
        { label: "Book a Demo", href: `${prefix}/book-a-demo` },
      ],
    },
  ];
}

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

/* ─── Layout ─────────────────────────────────────────────────────────────── */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Header
            locale={locale}
            navItems={buildNavItems(locale)}
            cta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
            secondaryCta={{ label: "Sign In", href: "https://app.synup.com" }}
          />
          <main>{children}</main>
          <Footer
            locale={locale}
            columns={buildFooterColumns(locale)}
            legalLinks={legalLinks}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
