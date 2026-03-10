import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";
import type { Locale } from "@/lib/content";

/* ─── Solution definitions ────────────────────────────────────────────────── */

interface SolutionPage {
  slug: string;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  benefits: { title: string; description: string }[];
}

const SOLUTION_PAGES: SolutionPage[] = [
  {
    slug: "seo-agency",
    title: "Synup for SEO Agencies | Grow Your SEO Agency",
    description:
      "Synup gives SEO agencies everything needed to win more clients, improve online presence, and expand services without adding overhead.",
    headline: "Grow Your SEO Agency With Synup",
    subheadline:
      "Synup gives you everything you need to win more clients, improve their online presence, and expand your SEO services without adding overheads or sacrificing margins.",
    benefits: [
      {
        title: "Generate More Qualified Leads",
        description:
          "Use Synup's prospecting tools to discover businesses with poor search visibility, unclaimed listings, or weak reviews. Run quick audits and convert insights into sales conversations.",
      },
      {
        title: "Expand Your Offering",
        description:
          "Add high-demand services like Listings, Reputation, Social Media, and Local SEO without added costs. All tools are ready to white-label and easy to launch.",
      },
      {
        title: "Deliver On-Brand Client Experiences",
        description:
          "Offer clients a fully branded portal to track local listings, SEO rankings, reviews, and campaigns in real time.",
      },
      {
        title: "Automate SEO Reporting",
        description:
          "Eliminate the weekly scramble to create client updates. Synup helps automate reports for rank tracking, listing performance, and review analytics.",
      },
      {
        title: "Track Client Data to Mitigate Churn",
        description:
          "Get early warnings with churn forecasting tools powered by actual usage trends like review volume drops, SEO ranking decline, or client inactivity.",
      },
      {
        title: "White Label Marketing Apps",
        description:
          "Clients want results. You want retention. With Synup's fully brandable marketing apps, you can do both.",
      },
    ],
  },
  {
    slug: "web-agency",
    title: "Synup for Web Design Agencies | Offer More Than Web Services",
    description:
      "Web design agencies can expand revenue by offering digital marketing services with Synup's white-label platform.",
    headline: "Offer More Than Web Services",
    subheadline:
      "Synup helps web design agencies expand their service offering and generate recurring revenue by adding digital marketing services to their portfolio.",
    benefits: [
      { title: "Add Recurring Revenue", description: "Layer in listing, reputation, and social media management on top of your web projects." },
      { title: "White-label Everything", description: "Offer fully branded marketing services under your agency name." },
      { title: "Retain Clients Longer", description: "Keep clients engaged and on retainer with monthly marketing services." },
      { title: "Simple Client Portal", description: "Give clients access to results through a simple, branded portal." },
    ],
  },
  {
    slug: "advertising-agency",
    title: "Synup for Advertising Agencies | Build Consistent Revenue",
    description:
      "Build a consistent revenue stream by expanding your advertising agency's digital marketing services.",
    headline: "Build a Consistent Revenue Stream",
    subheadline:
      "Expand your advertising agency's offering with digital marketing services that keep clients coming back month after month.",
    benefits: [
      { title: "Expand Digital Services", description: "Add listings, reviews, and social media management to complement paid campaigns." },
      { title: "Demonstrate ROI", description: "Show clients measurable results across organic and paid channels." },
      { title: "White-label Platform", description: "Deliver services under your brand, not Synup's." },
      { title: "Reduce Churn", description: "Multi-channel relationships keep clients longer than single-service engagements." },
    ],
  },
  {
    slug: "web-host-domains",
    title: "Synup for Web Hosts & Domain Registrars | Add Value for SMBs",
    description: "Give more value to SMB clients by offering digital marketing services alongside your hosting.",
    headline: "Give More Value to Your SMB Clients",
    subheadline:
      "Web hosts and domain registrars can differentiate from the competition by offering digital marketing services as an add-on to their core offerings.",
    benefits: [
      { title: "Upsell Digital Marketing", description: "Offer listings, reviews, and social as premium add-ons." },
      { title: "Reduce Churn", description: "Clients who use multiple services stay longer." },
      { title: "White-label Dashboard", description: "Deliver the experience under your brand." },
      { title: "Simple Onboarding", description: "Get clients set up in minutes with automated onboarding." },
    ],
  },
  {
    slug: "franchisee",
    title: "Synup for Franchisors | Empower Franchisees to Grow",
    description: "Manage digital presence for hundreds of franchise locations from one centralized platform.",
    headline: "Empower Franchisees to Grow",
    subheadline:
      "Manage and optimize the digital presence of every franchise location from a single platform while empowering individual franchisees.",
    benefits: [
      { title: "Centralized Management", description: "Manage all franchise locations from one dashboard." },
      { title: "Brand Consistency", description: "Ensure brand guidelines are followed across every location." },
      { title: "Local Optimization", description: "Let each franchisee optimize locally while staying on-brand." },
      { title: "Performance Analytics", description: "Compare performance across all franchise locations." },
    ],
  },
  {
    slug: "telecom",
    title: "Synup for Telecom | Build a New Revenue Stream",
    description: "Telecom providers can build a new revenue stream by offering digital marketing services to local business clients.",
    headline: "Build a New Revenue Stream with Digital Marketing",
    subheadline:
      "Telecom providers can expand beyond connectivity by offering local digital marketing services to their SMB customers.",
    benefits: [
      { title: "New Revenue Stream", description: "Add digital marketing services to your SMB offering." },
      { title: "Retain Customers", description: "Customers using multiple services churn at lower rates." },
      { title: "White-label Platform", description: "Deliver under your brand." },
      { title: "Managed Services", description: "Offer fully managed services or self-serve tools." },
    ],
  },
  {
    slug: "vertical-saas-providers",
    title: "Synup for Vertical SaaS | Expand Your SaaS Suite",
    description: "Vertical SaaS providers can expand their product suite with digital marketing capabilities.",
    headline: "Expand Your SaaS Suite with Digital Marketing",
    subheadline:
      "Vertical SaaS platforms can expand their product suite and increase customer LTV by adding digital marketing tools.",
    benefits: [
      { title: "API Integration", description: "Embed Synup's tools into your existing platform via API." },
      { title: "White-label UI", description: "Maintain a consistent user experience under your brand." },
      { title: "Increase LTV", description: "Customers using more tools have higher lifetime value." },
      { title: "Revenue Share", description: "Earn revenue share on every customer you refer." },
    ],
  },
  {
    slug: "tv-radio-stations",
    title: "Synup for TV & Radio Stations | Offer More to Local Advertisers",
    description: "TV and radio stations can offer digital marketing services to local advertisers to increase ad revenue.",
    headline: "Offer More to Your Local Advertisers",
    subheadline:
      "Expand beyond traditional media by offering digital marketing services that help local advertisers maximize their impact.",
    benefits: [
      { title: "Digital Add-ons", description: "Complement TV/radio ads with digital listings and reputation management." },
      { title: "Prove Campaign Impact", description: "Show advertisers how their digital presence improved alongside their ad campaigns." },
      { title: "White-label Dashboard", description: "Deliver digital services under your media brand." },
      { title: "New Revenue Lines", description: "Generate recurring digital revenue from existing advertisers." },
    ],
  },
  {
    slug: "internet-yellow-pages",
    title: "Synup for IYP | Become a Local Growth Partner",
    description: "Internet Yellow Pages can evolve into a local growth partner by offering digital marketing services.",
    headline: "Become a Local Growth Partner",
    subheadline:
      "Transform from a listing directory into a comprehensive local growth partner for your business customers.",
    benefits: [
      { title: "Beyond Listings", description: "Add reputation, social, and SEO to your listing service." },
      { title: "Prove ROI", description: "Show businesses measurable results from your platform." },
      { title: "White-label Tools", description: "Keep your brand front and center." },
      { title: "Recurring Revenue", description: "Build subscription-based recurring revenue from your existing customer base." },
    ],
  },
  {
    slug: "marketing",
    title: "Synup for Marketing Teams | Show Real Marketing Impact",
    description: "Marketing teams can use Synup to demonstrate real impact across listings, reviews, and social.",
    headline: "Show Real Marketing Impact",
    subheadline:
      "Marketing teams can use Synup to track and demonstrate the real impact of their local marketing efforts.",
    benefits: [
      { title: "Unified Analytics", description: "Track listings, reviews, and social from one dashboard." },
      { title: "Custom Reports", description: "Build reports that tell the story of your marketing impact." },
      { title: "Multi-location View", description: "See performance across all your locations at once." },
      { title: "Campaign Tracking", description: "Track how marketing campaigns affect local visibility and reviews." },
    ],
  },
  {
    slug: "sales",
    title: "Synup for Sales Teams | Manage Your Sales Pipeline",
    description: "Sales teams can use Synup to find prospects, manage their pipeline, and close more deals.",
    headline: "Manage Your Sales Pipeline",
    subheadline:
      "Sales teams can use Synup to prospect, manage their pipeline, and close more deals with data-driven insights.",
    benefits: [
      { title: "Lead Prospecting", description: "Find prospects from a database of 40M+ businesses." },
      { title: "Pipeline Management", description: "Visual CRM to track deals through every stage." },
      { title: "Email Sequences", description: "Automate follow-ups to keep prospects engaged." },
      { title: "Sales Analytics", description: "Track team performance and identify coaching opportunities." },
    ],
  },
  {
    slug: "finance",
    title: "Synup for Finance Teams | Centralize Payment Workflows",
    description: "Finance teams can centralize invoicing, payments, and billing workflows with Synup.",
    headline: "Centralize Payment Workflows",
    subheadline:
      "Simplify billing, invoicing, and payment collection for your agency or business.",
    benefits: [
      { title: "Automated Invoicing", description: "Set up recurring invoices that send automatically." },
      { title: "Payment Tracking", description: "See all outstanding invoices and payment status at a glance." },
      { title: "Subscription Management", description: "Manage subscription billing for retainer clients." },
      { title: "Integrated Payments", description: "Accept credit cards and ACH payments within the platform." },
    ],
  },
  {
    slug: "customer-success",
    title: "Synup for Customer Success | Forecast and Manage Churn",
    description: "Customer success teams can forecast churn and proactively retain clients with Synup.",
    headline: "Forecast and Manage Churn",
    subheadline:
      "Give your customer success team the tools they need to identify at-risk accounts before it's too late.",
    benefits: [
      { title: "Churn Forecasting", description: "Predict which clients are at risk based on usage patterns." },
      { title: "Client Health Scores", description: "Automatically calculate health scores for every client." },
      { title: "Early Warning Alerts", description: "Get alerts when clients show signs of disengagement." },
      { title: "Proactive Outreach", description: "Trigger automated outreach workflows for at-risk clients." },
    ],
  },
  {
    slug: "pos-providers",
    title: "Synup for POS Providers | Expand Your POS Offerings",
    description: "POS and payment providers can expand their value proposition by offering digital marketing services.",
    headline: "Expand Your POS Offerings",
    subheadline:
      "Payment processors and POS providers can increase customer LTV and reduce churn by adding digital marketing services.",
    benefits: [
      { title: "Expand Value Prop", description: "Offer more than transactions — help customers grow their business." },
      { title: "Reduce POS Churn", description: "Customers with multiple services stay longer." },
      { title: "White-label Digital Marketing", description: "Add listings, reviews, and social under your brand." },
      { title: "Recurring Revenue", description: "Generate subscription revenue alongside transaction fees." },
    ],
  },
];

const KNOWN_SLUGS = SOLUTION_PAGES.map((p) => p.slug);

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
  const page = SOLUTION_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Solutions — Synup" };

  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/solutions/${slug}` : `/${locale}/solutions/${slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/solutions/${slug}`,
        de: `${baseUrl}/de/solutions/${slug}`,
        fr: `${baseUrl}/fr/solutions/${slug}`,
        es: `${baseUrl}/es/solutions/${slug}`,
      },
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const page = SOLUTION_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow="Solutions"
        headline={page.headline}
        subheadline={page.subheadline}
        ctas={[
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
      />

      <FeatureGrid
        eyebrow="How Synup Helps"
        headline={`Built for ${page.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`}
        columns={2}
        items={page.benefits}
      />

      <CTABanner
        headline="Scale Up Fast"
        subheadline="Partner with Synup to grow your business with a platform built specifically for your needs."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        secondaryCta={{ label: "View Pricing", href: `${prefix}/pricing` }}
        variant="brand"
      />
    </>
  );
}
