import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import type { Locale } from "@/lib/content";

/* ─── White-label page definitions ───────────────────────────────────────── */

interface WhiteLabelPage {
  slug: string;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  features: { title: string; description: string }[];
}

const WHITE_LABEL_PAGES: WhiteLabelPage[] = [
  {
    slug: "white-label-software",
    title: "White Label Software — Synup",
    description:
      "Create a cohesive brand experience by white-labeling Synup. Add your logo, custom URL, and brand colors.",
    headline: "Make Synup Your Own & Launch With Ease",
    subheadline:
      "Effortlessly create a fully branded client experience using our advanced customizations. Then launch your own platform in just minutes!",
    features: [
      {
        title: "Flawless White Labeling",
        description:
          "Create a cohesive brand experience by adding your logo to our software. Work with custom URLs and branded notifications your clients will love.",
      },
      {
        title: "Ready To Launch Client Portal",
        description:
          "Instantly launch a fully white-labeled client portal your clients can log on to. Customize with unique fields and tailor it effortlessly for each client's needs.",
      },
      {
        title: "Embedded Client Marketing App",
        description:
          "Seamlessly activate powerful marketing solutions directly within your platform, giving clients immediate access to tools that drive performance.",
      },
    ],
  },
  {
    slug: "white-label-listing-management-software",
    title: "White Label Listing Management Software — Synup",
    description:
      "Offer white-labeled listing management to your clients. Manage all listings across our publisher network under your brand.",
    headline: "White Label Listing Management Software",
    subheadline:
      "Offer fully branded listing management services to your clients. Manage business listings across 40+ directories under your agency's brand.",
    features: [
      { title: "Your Brand, Our Technology", description: "Deliver listing management under your agency brand." },
      { title: "40+ Directories", description: "Sync listings to Google, Bing, Facebook, Apple Maps, and more." },
      { title: "Client-Facing Dashboard", description: "Give clients a branded portal to see their listing performance." },
      { title: "Bulk Management", description: "Manage hundreds of locations efficiently from a single dashboard." },
    ],
  },
  {
    slug: "white-label-reputation-management-software",
    title: "White Label Reputation Management Software — Synup",
    description:
      "Offer white-labeled reputation management to your clients. Monitor and respond to reviews under your brand.",
    headline: "White Label Reputation Management Software",
    subheadline:
      "Offer fully branded reputation management services. Monitor reviews, respond with AI, and run review campaigns — all under your agency brand.",
    features: [
      { title: "Branded Review Dashboard", description: "Clients see your brand, not Synup's." },
      { title: "AI Review Responses", description: "Generate on-brand responses automatically." },
      { title: "Review Campaigns", description: "Run automated review request campaigns under your brand." },
      { title: "Sentiment Analytics", description: "Track sentiment trends in a branded analytics dashboard." },
    ],
  },
  {
    slug: "white-label-social-media-management-software",
    title: "White Label Social Media Management Software — Synup",
    description:
      "Offer white-labeled social media management to your clients. Manage social profiles under your agency brand.",
    headline: "White Label Social Media Management Software",
    subheadline:
      "Deliver fully branded social media management services. Schedule posts, manage multiple brands, and track analytics — all under your name.",
    features: [
      { title: "Branded Social Dashboard", description: "Clients access social tools through your branded portal." },
      { title: "AI Content Creation", description: "Generate on-brand social content automatically." },
      { title: "Multi-platform Publishing", description: "Publish to Facebook, Instagram, Google, and more." },
      { title: "Performance Analytics", description: "Share branded performance reports with clients." },
    ],
  },
  {
    slug: "white-label-seo-software",
    title: "White Label SEO Software — Synup",
    description:
      "Offer white-labeled SEO tools to your clients. Track rankings and deliver branded SEO reports.",
    headline: "White Label SEO Software",
    subheadline:
      "Deliver fully branded SEO services to your clients. Track rankings, generate reports, and demonstrate results — all under your agency brand.",
    features: [
      { title: "Branded Rank Tracking", description: "Track keyword rankings and share results under your brand." },
      { title: "White-label Reports", description: "Generate beautiful SEO reports with your logo and branding." },
      { title: "Client Portal", description: "Give clients access to their SEO data through your branded portal." },
      { title: "Local SEO Tools", description: "Optimize clients for local search under your brand." },
    ],
  },
];

const KNOWN_SLUGS = WHITE_LABEL_PAGES.map((p) => p.slug);

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of KNOWN_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = WHITE_LABEL_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "White Label — Synup" };

  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/white-label/${slug}` : `/${locale}/white-label/${slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/white-label/${slug}`,
        de: `${baseUrl}/de/white-label/${slug}`,
        fr: `${baseUrl}/fr/white-label/${slug}`,
        es: `${baseUrl}/es/white-label/${slug}`,
      },
    },
  };
}

export default async function WhiteLabelPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const page = WHITE_LABEL_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow="White Label"
        headline={page.headline}
        subheadline={page.subheadline}
        ctas={[
          { label: "Get Started", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
      />

      <FeatureGrid
        headline="Everything You Need to Launch"
        columns={3}
        items={page.features}
      />

      <CTABanner
        headline="Launch Your White-Label Platform Today"
        subheadline="Talk to our team to get your white-label platform set up."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
