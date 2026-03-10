import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import type { Locale } from "@/lib/content";

interface AIPage {
  slug: string;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  features: { title: string; description: string }[];
}

const AI_PAGES: AIPage[] = [
  {
    slug: "synup-ai",
    title: "Synup AI — Artificial Intelligence for Agencies",
    description:
      "Smart AI solutions built into the Synup platform for sales, client management, and marketing automation.",
    headline: "Your Agency's AI Advantage",
    subheadline:
      "Do more with less effort with our smart AI solutions built into the OS platform for multiple use cases.",
    features: [
      {
        title: "Sales AI",
        description:
          "Bring sales efficiency by using smart AI solutions for prospecting new clients, creating pitches, and improving your sales communication.",
      },
      {
        title: "Client AI",
        description:
          "Want an assistant to find and summarize client data? From quick-dive executive reports to research assistant for client information, Synup's AI does it all.",
      },
      {
        title: "Marketing AI",
        description:
          "Automate your marketing workflows with AI. Respond to reviews, analyze sentiment, and craft creative content for clients' social & local profiles.",
      },
    ],
  },
  {
    slug: "ai-listings",
    title: "AI Listings Management — Synup",
    description: "Use AI to optimize and manage business listings across 40+ directories.",
    headline: "AI-Powered Listings Management",
    subheadline:
      "Let AI optimize your clients' business listings automatically. From content suggestions to bulk updates, Synup AI handles the repetitive work.",
    features: [
      { title: "AI Content Optimization", description: "AI suggests optimized business descriptions and categories." },
      { title: "Bulk AI Updates", description: "Update listings across all directories simultaneously with AI assistance." },
      { title: "Anomaly Detection", description: "AI detects and flags listing inaccuracies automatically." },
      { title: "Performance Insights", description: "AI-powered insights to improve listing performance." },
    ],
  },
  {
    slug: "ai-social-media-report",
    title: "AI Social Media Report — Synup",
    description: "Get AI-powered insights on your clients' social media performance.",
    headline: "AI Social Media Report",
    subheadline:
      "Get detailed AI-generated reports on social media performance, content effectiveness, and growth opportunities.",
    features: [
      { title: "Automated Report Generation", description: "AI generates comprehensive social media reports instantly." },
      { title: "Sentiment Analysis", description: "Understand audience sentiment across all social platforms." },
      { title: "Content Recommendations", description: "AI recommends high-performing content types and topics." },
      { title: "Competitive Benchmarking", description: "Compare your clients' social performance against competitors." },
    ],
  },
  {
    slug: "client-ai",
    title: "Client AI — Synup",
    description:
      "AI-powered client management for agencies. Find and summarize client data, generate executive reports, and research client information instantly.",
    headline: "Client AI for Agencies",
    subheadline:
      "Want an assistant to find and summarize client data? From quick-dive executive reports to research assistant for client information, Synup's AI does it all.",
    features: [
      { title: "Executive Summaries", description: "Generate quick-dive executive reports on any client's performance across all channels." },
      { title: "Client Research Assistant", description: "AI-powered research finds and organizes client data from listings, reviews, and social profiles." },
      { title: "Performance Insights", description: "Identify trends and opportunities in client data automatically with AI analysis." },
      { title: "Smart Recommendations", description: "Get AI-generated action items tailored to each client's unique challenges." },
    ],
  },
  {
    slug: "marketing-ai",
    title: "Marketing AI — Synup",
    description:
      "Automate marketing workflows with AI. Respond to reviews, analyze sentiment, and craft creative content for social and local profiles.",
    headline: "Marketing AI",
    subheadline:
      "Automate your marketing workflows with AI. Respond to reviews, analyze sentiment, and craft creative content for clients' social and local profiles.",
    features: [
      { title: "AI Review Responses", description: "Generate professional, on-brand review responses in seconds with AI." },
      { title: "Sentiment Analysis", description: "Understand customer sentiment across reviews and social mentions automatically." },
      { title: "Content Creation", description: "AI crafts engaging social media posts and local content tailored to each location." },
      { title: "Campaign Automation", description: "Set up AI-driven marketing workflows that run on autopilot across all channels." },
    ],
  },
  {
    slug: "sales-ai",
    title: "Sales AI — Synup",
    description:
      "Bring sales efficiency with smart AI solutions for prospecting new clients, creating pitches, and improving sales communication.",
    headline: "Sales AI for Agencies",
    subheadline:
      "Bring sales efficiency by using smart AI solutions for prospecting new clients, creating pitches, and improving your sales communication.",
    features: [
      { title: "AI Prospecting", description: "Identify high-potential prospects using AI analysis of local business data and market signals." },
      { title: "Pitch Generator", description: "Create compelling, data-backed sales pitches tailored to each prospect's needs." },
      { title: "Smart Communication", description: "AI helps craft follow-ups, proposals, and outreach that convert at higher rates." },
      { title: "Pipeline Insights", description: "AI analyzes your sales pipeline to surface deals at risk and recommend next actions." },
    ],
  },
];

const KNOWN_SLUGS = AI_PAGES.map((p) => p.slug);

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
  const page = AI_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "AI Features — Synup" };

  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/ai/${slug}` : `/${locale}/ai/${slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/ai/${slug}`,
        de: `${baseUrl}/de/ai/${slug}`,
        fr: `${baseUrl}/fr/ai/${slug}`,
        es: `${baseUrl}/es/ai/${slug}`,
      },
    },
  };
}

export default async function AIPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const page = AI_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow="AI Features"
        headline={page.headline}
        subheadline={page.subheadline}
        ctas={[
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "primary" },
        ]}
      />

      <FeatureGrid
        headline="Powered by AI"
        columns={3}
        items={page.features}
      />

      <CTABanner
        headline="Make Your Agency AI-Ready"
        subheadline="Book a demo to see Synup's AI features in action."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
