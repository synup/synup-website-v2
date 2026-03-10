import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import type { Locale } from "@/lib/content";

interface WhySynupPage {
  slug: string;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  features: { title: string; description: string }[];
}

const WHY_SYNUP_PAGES: WhySynupPage[] = [
  {
    slug: "dedicated-support",
    title: "Dedicated Support — Why Synup",
    description: "Synup prioritizes its customers with dedicated support and aligned partnerships.",
    headline: "Dedicated Support — We Prioritize Our Customers",
    subheadline:
      "Our Customer Success team is dedicated to your growth. From onboarding to ongoing strategy, we're with you every step of the way.",
    features: [
      { title: "Aligned Partnership", description: "We operate as a true extension of your team, not just a vendor." },
      { title: "Dedicated CSM", description: "Every partner gets a dedicated Customer Success Manager." },
      { title: "Proactive Outreach", description: "We reach out with updates, tips, and strategy recommendations." },
      { title: "Priority Support", description: "Fast response times for all support requests." },
    ],
  },
  {
    slug: "roi-driving-campaigns",
    title: "ROI-Driving Campaigns — Why Synup",
    description: "Synup delivers real, measurable results for your agency and your clients.",
    headline: "ROI-Driving Campaigns — Get Real Results",
    subheadline:
      "We don't just provide tools — we help you build campaigns that deliver measurable revenue impact for your clients.",
    features: [
      { title: "Measurable Results", description: "Track ROI for every campaign across listings, reviews, and social." },
      { title: "Performance Benchmarks", description: "Compare your clients' performance against industry benchmarks." },
      { title: "Custom Reporting", description: "Show clients exactly what impact your services are delivering." },
      { title: "Strategy Sessions", description: "Regular strategy sessions with your CSM to optimize campaigns." },
    ],
  },
  {
    slug: "managed-migration",
    title: "Managed Migration — Why Synup",
    description: "Switch to Synup easily with our managed migration service. No disruption, no data loss.",
    headline: "Managed Migration — Switch Easily & Worry-Free",
    subheadline:
      "Moving to Synup from another platform? Our team handles the entire migration so you don't have to worry about disruption.",
    features: [
      { title: "Data Migration", description: "We migrate all your existing data, listings, and settings." },
      { title: "Zero Downtime", description: "Migrations happen without disrupting your current operations." },
      { title: "Dedicated Migration Team", description: "A dedicated team guides you through every step." },
      { title: "Post-Migration Support", description: "Extra support in the first 30 days after migration." },
    ],
  },
  {
    slug: "contract-buyouts",
    title: "Contract Buy-Outs — Why Synup",
    description: "Stuck in a long-term contract with another platform? Synup can help you get out.",
    headline: "Contract Buy-Outs — No Need to Feel Stuck",
    subheadline:
      "Don't let an existing contract hold your agency back. Talk to us about our contract buy-out program.",
    features: [
      { title: "Contract Review", description: "We review your existing contract to understand your options." },
      { title: "Buy-Out Program", description: "Qualifying agencies can receive a credit toward buy-out costs." },
      { title: "Flexible Terms", description: "We offer flexible contract terms to match your needs." },
      { title: "Smooth Transition", description: "Full migration support so the switch is seamless." },
    ],
  },
  {
    slug: "objective-focused-engagement",
    title: "Objective Focused Engagement — Why Synup",
    description: "Synup aligns with your business objectives and measures success by your goals, not our metrics.",
    headline: "Objective Focused Engagement — Your Goals Matter",
    subheadline:
      "We measure our success by your success. Our engagement model is built around your specific business objectives.",
    features: [
      { title: "Goal Setting", description: "We start every engagement by defining your specific success metrics." },
      { title: "Regular Reviews", description: "Quarterly business reviews track progress against your goals." },
      { title: "Transparent Reporting", description: "Full visibility into all metrics that matter to your business." },
      { title: "Aligned Incentives", description: "Our team is compensated on your growth, not just platform usage." },
    ],
  },
  {
    slug: "stellar-reporting",
    title: "Stellar Reporting — Why Synup",
    description: "Get complete visibility into your clients' online presence with Synup's reporting tools.",
    headline: "Stellar Reporting — Get Complete Visibility",
    subheadline:
      "Beautiful, automated reports that give you and your clients complete visibility into online presence performance.",
    features: [
      { title: "Automated Reports", description: "Reports generated and delivered automatically on your schedule." },
      { title: "White-label Design", description: "Reports branded with your agency's logo and colors." },
      { title: "Multi-Channel Data", description: "Combine listings, reviews, and social data in one report." },
      { title: "Executive Summaries", description: "High-level summaries perfect for client presentations." },
    ],
  },
  {
    slug: "comprehensive-solutions",
    title: "Comprehensive Solutions — Why Synup",
    description: "Everything your agency needs in one platform — listings, reviews, social, SEO, and more.",
    headline: "Comprehensive Solutions — Everything You Need",
    subheadline:
      "One platform with everything your agency needs to manage and grow your clients' online presence.",
    features: [
      { title: "Listings Management", description: "Manage and optimize business listings across 40+ directories." },
      { title: "Reputation Management", description: "Monitor and respond to reviews with AI assistance." },
      { title: "Social Media Management", description: "Create and schedule social content across platforms." },
      { title: "SEO Tools", description: "Track rankings and optimize for local and organic search." },
    ],
  },
  {
    slug: "ai-driven-tools",
    title: "AI-Driven Tools — Why Synup",
    description: "Innovative AI-powered tools to help your agency do more with less effort.",
    headline: "AI-Driven Tools — Innovative Tech Solutions",
    subheadline:
      "Synup's AI tools help your agency automate repetitive tasks, generate better content, and make smarter decisions.",
    features: [
      { title: "AI Review Responses", description: "Generate contextual, on-brand responses to reviews automatically." },
      { title: "AI Social Content", description: "Create engaging social posts with AI assistance." },
      { title: "AI Sales Pitches", description: "Generate compelling sales pitches tailored to each prospect." },
      { title: "AI Insights", description: "Get AI-powered recommendations to improve client performance." },
    ],
  },
];

const KNOWN_SLUGS = WHY_SYNUP_PAGES.map((p) => p.slug);

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
  const page = WHY_SYNUP_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Why Synup" };

  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/why-synup/${slug}` : `/${locale}/why-synup/${slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/why-synup/${slug}`,
        de: `${baseUrl}/de/why-synup/${slug}`,
        fr: `${baseUrl}/fr/why-synup/${slug}`,
        es: `${baseUrl}/es/why-synup/${slug}`,
      },
    },
  };
}

export default async function WhySynupPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const page = WHY_SYNUP_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow="Why Synup"
        headline={page.headline}
        subheadline={page.subheadline}
        ctas={[
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
        centered
      />

      <FeatureGrid
        headline="What This Means For Your Agency"
        columns={2}
        items={page.features}
      />

      <CTABanner
        headline="Partner With Synup Today"
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
