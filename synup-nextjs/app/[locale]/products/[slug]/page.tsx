import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import type { Locale } from "@/lib/content";

/* ─── Product definitions ─────────────────────────────────────────────────── */

interface ProductPage {
  slug: string;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  heroImageSrc: string;
  features: { title: string; description: string; href?: string }[];
}

const PRODUCT_PAGES: ProductPage[] = [
  {
    slug: "agency-os",
    title: "Agency OS — Synup Operating System For Agencies",
    description:
      "One operating system for scaling your agency. Manage the entire client lifecycle from sales to retention.",
    headline: "One Operating System For Scaling Your Agency Business",
    subheadline:
      "Effortlessly manage the entire client lifecycle, from sales and onboarding to retention and renewal, through one centralized, powerful platform.",
    heroImageSrc: "/assets/images/agency-os-hero.png",
    features: [
      {
        title: "Pre-sales & CRM",
        description:
          "Centralize all client information, communication history, and real-time project updates in a unified hub.",
        href: "/products/agency-os",
      },
      {
        title: "Sales Pipeline",
        description:
          "Track and manage sales opportunities with a built-in CRM designed for agencies.",
        href: "/products/agency-os",
      },
      {
        title: "Proposals & Payments",
        description:
          "Create trackable proposals and e-sign documents. Get access to a library of ready-to-use templates.",
        href: "/products/agency-os",
      },
      {
        title: "Client Management",
        description:
          "Know what's happening across your customer base in seconds with a unified dashboard.",
        href: "/products/agency-os",
      },
      {
        title: "Churn Forecasting",
        description:
          "Forecast churn based on custom risk parameters. Identify potential issues and implement proactive retention strategies.",
        href: "/products/agency-os",
      },
      {
        title: "AI-Powered Tools",
        description:
          "Smart AI solutions for prospecting new clients, creating pitches, and improving your sales communication.",
        href: "/products/agency-os",
      },
    ],
  },
  {
    slug: "presence",
    title: "Listings Management — Synup",
    description:
      "Manage all client listings across our expansive publisher network and optimize their Share of Voice.",
    headline: "Manage Client Listings Across Every Platform",
    subheadline:
      "Manage all client listings across our expansive publisher network and optimize their Share of Voice through effective listing indexation.",
    heroImageSrc: "/assets/images/presence-hero.png",
    features: [
      {
        title: "Multi-location Management",
        description: "Manage listings for thousands of locations from a single dashboard.",
      },
      {
        title: "Publisher Network",
        description: "Sync to 40+ directories including Google, Bing, Facebook, Apple Maps, and more.",
      },
      {
        title: "Profile Analytics",
        description: "Track listing performance metrics like views, actions, and search visibility.",
      },
      {
        title: "Local Posts",
        description: "Publish and maintain local posts directly to Google and Facebook profiles.",
      },
    ],
  },
  {
    slug: "reputation",
    title: "Review Management — Synup",
    description:
      "Improve client reputation with AI responses, seamless CRM integrations, and automated review campaigns.",
    headline: "Improve Client Reputation at Scale",
    subheadline:
      "Improve client reputation with AI responses, seamless CRM integrations, and automated review campaigns for maximum impact.",
    heroImageSrc: "/assets/images/reputation-hero.png",
    features: [
      {
        title: "AI Review Responses",
        description: "Auto-generate personalized, on-brand review responses with AI.",
      },
      {
        title: "Review Monitoring",
        description: "Weekly review monitoring across Google, Facebook, Yelp, and more.",
      },
      {
        title: "Review Campaigns",
        description: "Automated email/SMS campaigns to request reviews from happy customers.",
      },
      {
        title: "Sentiment Analysis",
        description: "Track sentiment trends across all reviews to identify issues early.",
      },
    ],
  },
  {
    slug: "social",
    title: "Social Media Management — Synup",
    description:
      "Boost engagement with AI-generated social posts, smart scheduling, and multi-brand management capabilities.",
    headline: "Manage Social Media for All Your Clients",
    subheadline:
      "Boost engagement with AI-generated social posts, smart scheduling, and multi-brand management capabilities.",
    heroImageSrc: "/assets/images/social-hero.png",
    features: [
      {
        title: "AI Content Generation",
        description: "Automatically create on-brand social posts using AI.",
      },
      {
        title: "Smart Scheduling",
        description: "Schedule posts to publish at optimal times for maximum engagement.",
      },
      {
        title: "Multi-Brand Management",
        description: "Manage social profiles for multiple clients from a single dashboard.",
      },
      {
        title: "Analytics & Reporting",
        description: "Track post performance, engagement, and growth across all channels.",
      },
    ],
  },
  {
    slug: "seo",
    title: "SEO Tools — Synup",
    description:
      "Boost your client's search performance with advanced SEO tools, rank tracking, and custom reports.",
    headline: "Boost Client Search Performance",
    subheadline:
      "Boost your client's search performance with advanced SEO tools, rank tracking, and custom reports to optimize their marketing strategies.",
    heroImageSrc: "/assets/images/seo-hero.png",
    features: [
      {
        title: "Rank Tracking",
        description: "Track keyword rankings across Google, Bing, and local search results.",
      },
      {
        title: "SEO Reports",
        description: "Beautiful, shareable SEO reports for clients with actionable insights.",
      },
      {
        title: "Local SEO",
        description: "Optimize for local search with location-specific keyword tracking.",
      },
      {
        title: "Competitor Analysis",
        description: "Track competitor rankings and identify opportunities to outperform them.",
      },
    ],
  },
  {
    slug: "crm",
    title: "CRM — Synup",
    description:
      "Manage projects, activities, client data, and communication history in one centralized place.",
    headline: "Centralize All Client Operations",
    subheadline:
      "Manage projects, activities, client data, and communication history in one centralized place. Your team gets instant context, your clients get faster answers.",
    heroImageSrc: "/assets/images/crm-hero.png",
    features: [
      { title: "Contact Management", description: "Centralize all client contacts and communication history." },
      { title: "Task Management", description: "Assign and track tasks across your team." },
      { title: "Activity Timeline", description: "See a full timeline of all client interactions." },
      { title: "Pipeline View", description: "Visual sales pipeline with drag-and-drop management." },
    ],
  },
  {
    slug: "invoicing-e-sign",
    title: "Invoicing & e-Signature — Synup",
    description:
      "Avoid the headache of billing with invoicing software for faster payments. Use e-sign for documents.",
    headline: "Get Paid On Time, Every Time",
    subheadline:
      "Avoid the headache of billing with our invoicing software for faster payments. Use e-sign and securely share important documents.",
    heroImageSrc: "/assets/images/invoicing-hero.png",
    features: [
      { title: "Automated Invoices", description: "Automate recurring invoices and payment reminders." },
      { title: "e-Signature", description: "Get documents signed digitally without third-party tools." },
      { title: "Proposals", description: "Close deals faster with ready-to-use proposal templates." },
      { title: "Payment Integration", description: "Accept payments seamlessly within your dashboard." },
    ],
  },
  {
    slug: "leads",
    title: "Lead Generation — Synup",
    description:
      "Find high-quality SMB leads with precision targeting and run personalized sales motions.",
    headline: "Find and Convert High-Quality Leads",
    subheadline:
      "Identify high-potential prospects with precision targeting, run personalized sales motions, and convert them into profitable long-term clients.",
    heroImageSrc: "/assets/images/leads-hero.png",
    features: [
      { title: "40M+ Prospects", description: "Access a database of 40M+ business prospects." },
      { title: "150+ Filters", description: "Pinpoint ideal prospects with 150+ targeting filters." },
      { title: "Lead Scoring", description: "Automatically score leads based on fit and intent signals." },
      { title: "Email Sequences", description: "Automate multi-step email campaigns to follow up with leads." },
    ],
  },
  {
    slug: "analytics",
    title: "Analytics & Reporting — Synup",
    description:
      "Build tailored dashboards and reports to track KPIs that matter to your agency and clients.",
    headline: "Custom Analytics and Reporting",
    subheadline:
      "Build tailored dashboards and reports to track the KPIs that matter to your agency and clients.",
    heroImageSrc: "/assets/images/analytics-hero.png",
    features: [
      { title: "Custom Dashboards", description: "Build dashboards that show what matters to each client." },
      { title: "Automated Reports", description: "Schedule reports to deliver automatically to clients." },
      { title: "White-label Reports", description: "Fully branded reports with your agency's logo and colors." },
      { title: "Data Export", description: "Export data to CSV or integrate with your BI tools." },
    ],
  },
];

const KNOWN_SLUGS = PRODUCT_PAGES.map((p) => p.slug);

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
  const page = PRODUCT_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Product — Synup" };

  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/products/${slug}` : `/${locale}/products/${slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/products/${slug}`,
        de: `${baseUrl}/de/products/${slug}`,
        fr: `${baseUrl}/fr/products/${slug}`,
        es: `${baseUrl}/es/products/${slug}`,
      },
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const page = PRODUCT_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow="Products"
        headline={page.headline}
        subheadline={page.subheadline}
        ctas={[
          { label: "Get Started", href: `${prefix}/book-a-demo`, variant: "primary" },
          { label: "See All Products", href: `${prefix}/products`, variant: "secondary" },
        ]}
        image={{
          src: page.heroImageSrc,
          alt: `${page.title} screenshot`,
          width: 640,
          height: 480,
        }}
      />

      <FeatureGrid
        headline="Key Features"
        columns={3}
        items={page.features}
      />

      <CTABanner
        headline="Partner With Synup Today!"
        subheadline="Book a call with our partnership manager to explore custom growth solutions for your agency."
        primaryCta={{ label: "Get Started", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
