import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FormSection } from "@/components/sections/FormSection";
import { CTABanner } from "@/components/sections/CTABanner";
import type { Locale } from "@/lib/content";

/* ─── Landing page definitions ───────────────────────────────────────────── */

interface LandingPage {
  slug: string;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  eyebrow?: string;
  features?: { title: string; description: string }[];
  comparisonRows?: {
    feature: string;
    synup: boolean | string;
    competitor: boolean | string;
    category?: string;
  }[];
  competitorName?: string;
  showForm?: boolean;
  formHeadline?: string;
  ctaHeadline?: string;
}

const LANDING_PAGES: LandingPage[] = [
  {
    slug: "yext-alternative",
    title: "The #1 Yext Alternative — Synup",
    description:
      "Join thousands of customers who chose Synup over Yext. More features, competitive pricing, and you keep your optimizations when you cancel.",
    headline: "The #1 Yext Alternative",
    subheadline:
      "Join thousands of customers who chose Synup as a Yext alternative — including Fortune 500 companies. With more features at a competitive price, it's no surprise that customers are happier after they make the switch.",
    eyebrow: "Why Synup?",
    showForm: true,
    formHeadline: "Let's Talk",
    features: [
      {
        title: "Review Acquisition",
        description:
          "Unlike Yext, with Synup you can request 5-star reviews and get feedback on your most important listings.",
      },
      {
        title: "Free Automations Library",
        description:
          "Boost your ROI with a free library of automations for managing listings, reviews, reporting, and scheduling.",
      },
      {
        title: "Personalized Campaigns",
        description:
          "Synup Campaigns lets you personalize messaging at a granular level — target your audience with the right offer at scale.",
      },
      {
        title: "Social Media Management",
        description:
          "Take control of social media with Synup Social. AI-assisted ideas and content creation built in.",
      },
      {
        title: "Permanent Optimizations",
        description:
          "Yext updates revert when you cancel. With Synup, your integrations stay in place even if you leave.",
      },
      {
        title: "White-Label Ready",
        description:
          "Full white-label capabilities for agencies — Yext does not offer this level of customization.",
      },
    ],
    comparisonRows: [
      { feature: "Manage Listings", synup: true, competitor: true },
      { feature: "Review Monitoring", synup: true, competitor: true },
      { feature: "Respond to Reviews", synup: true, competitor: true },
      { feature: "Review Acquisition", synup: true, competitor: false },
      { feature: "Review Highlights", synup: true, competitor: false },
      { feature: "Manage Content", synup: true, competitor: true },
      { feature: "AI Suggestions", synup: true, competitor: false },
      { feature: "Automations", synup: true, competitor: false },
      { feature: "White-Label", synup: true, competitor: false },
      { feature: "Google Business Profile Campaigns", synup: true, competitor: false },
      { feature: "Social Media Management", synup: true, competitor: false },
      { feature: "Demographic Targeting", synup: true, competitor: false },
    ],
    competitorName: "Yext",
    ctaHeadline: "Make the Switch to Synup Today",
  },
];

const KNOWN_SLUGS = LANDING_PAGES.map((p) => p.slug);

/* ─── Static params ──────────────────────────────────────────────────────── */

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of KNOWN_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = LANDING_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Synup" };

  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/lps/${slug}` : `/${locale}/lps/${slug}`;

  return {
    title: page.title,
    description: page.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const page = LANDING_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow={page.eyebrow}
        headline={page.headline}
        subheadline={page.subheadline}
        ctas={[
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
      />

      {page.features && page.features.length > 0 && (
        <FeatureGrid
          headline="Why Choose Synup?"
          columns={3}
          items={page.features}
        />
      )}

      {page.comparisonRows && page.comparisonRows.length > 0 && page.competitorName && (
        <ComparisonTable
          competitorName={page.competitorName}
          rows={page.comparisonRows}
        />
      )}

      {page.showForm && (
        <FormSection
          headline={page.formHeadline ?? "Get In Touch"}
          subheadline="Fill out the form and our team will be in touch shortly."
          fields={[
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "email", label: "Work Email", type: "email", required: true },
            { name: "company", label: "Company Name", type: "text", required: true },
            { name: "phone", label: "Phone Number", type: "tel" },
            {
              name: "message",
              label: "What are you looking for?",
              type: "textarea",
            },
          ]}
          submitLabel="Let's Talk"
          actionUrl="/api/contact"
          successRedirect={`${prefix}/contact-success`}
        />
      )}

      <CTABanner
        headline={page.ctaHeadline ?? "Get Started With Synup"}
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
