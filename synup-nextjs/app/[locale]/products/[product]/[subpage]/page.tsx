import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";
import { StatsSection } from "@/components/sections/StatsSection";
import { PricingTable } from "@/components/sections/PricingTable";
import type { Locale } from "@/lib/content";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface SubProductPage {
  product: string;
  subpage: string;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  eyebrow?: string;
  features?: { title: string; description: string; icon?: string }[];
  contentBlocks?: {
    headline: string;
    bodyText: string;
    bullets?: string[];
  }[];
  ctaHeadline?: string;
  ctaVariant?: "brand" | "dark" | "light" | "gradient";
}

/* ─── Sub-product page definitions ──────────────────────────────────────── */

const SUB_PRODUCT_PAGES: SubProductPage[] = [
  /* ── Agency OS ─────────────────────────────────────────────────────── */
  {
    product: "agency-os",
    subpage: "white-label",
    title: "White Label Agency OS — Synup",
    description:
      "Make Synup OS your own. Full white-label branding from custom domains to stylesheets, logos, and client portals.",
    headline: "Make Synup OS Your Own",
    subheadline:
      "From branding to workflows, provide a customized experience that reflects your agency's unique identity. With white labeling down to the source code level, boost trust, increase loyalty, and position yourself as a reliable marketing solution provider.",
    eyebrow: "Agency OS",
    features: [
      {
        title: "Custom Brand Settings",
        description:
          "Set master brand guidelines — customize stylesheets, colors, and themes across Synup OS, Client Portal, and Client Apps.",
      },
      {
        title: "Custom Domains",
        description:
          "Access the platform on your own domain for complete brand consistency at every client touchpoint.",
      },
      {
        title: "White Label Client Portal",
        description:
          "Brand your client portal with custom colors, logos, favicons, and URLs your clients log into.",
      },
      {
        title: "White Label Client Apps",
        description:
          "Customize the theme, colors, and navigation bar across all marketing apps your clients use.",
      },
      {
        title: "Custom Notifications",
        description:
          "Send alerts and communications from your own email domain. Build a true white-label experience with no thin veils.",
      },
      {
        title: "Localize in 100+ Languages",
        description:
          "Take your agency global with dedicated language support and platform customizations for international clients.",
      },
    ],
    ctaHeadline: "White Label Synup for Your Agency",
    ctaVariant: "brand",
  },
  {
    product: "agency-os",
    subpage: "client-portal",
    title: "Client Portal — Agency OS — Synup",
    description:
      "Allow clients to self-manage their online presence with a fully branded, white-label client portal.",
    headline: "Make Self-Serve Your Competitive Edge",
    subheadline:
      "Allow customers to self-manage their online presence while ensuring everything stays consistent. Robust tools to launch a self-serve customer portal within minutes, with support for provisioning and deprovisioning.",
    eyebrow: "Agency OS",
    features: [
      {
        title: "White Label Portal",
        description:
          "Launch quickly with a white-label portal where clients log on and see important performance insights.",
      },
      {
        title: "Custom Client App Experience",
        description:
          "Build a truly pixel-perfect client app experience from scratch with full customization.",
      },
      {
        title: "Document & Report Sharing",
        description:
          "Set up custom notifications for documents, reports, invoices, and more using your own email domain.",
      },
      {
        title: "User Access Controls",
        description:
          "Add team members or external partners with admin or member-level access to collaborate seamlessly.",
      },
      {
        title: "Integrated Marketing Apps",
        description:
          "Enhance client portals with Listings, Reviews, Social, and CRM apps in one self-serve experience.",
      },
    ],
    ctaHeadline: "Launch Your Client Portal Today",
    ctaVariant: "brand",
  },
  {
    product: "agency-os",
    subpage: "churn-forecasting",
    title: "Churn Forecasting — Agency OS — Synup",
    description:
      "Know when clients are about to churn before they do. Use powerful forecasting and signals to improve client retention.",
    headline: "Tools To Improve Client Retention",
    subheadline:
      "Know when clients are about to churn before they do. Use powerful forecasting and signals to improve client retention and take action before clients leave.",
    eyebrow: "Agency OS",
    features: [
      {
        title: "Custom Churn Criteria",
        description:
          "Configure how churn risk is calculated based on what matters to your agency — tool usage, performance trends, and more.",
      },
      {
        title: "Risk Factor Identification",
        description:
          "Identify clients at High, Medium, or Low risk using real-time, data-driven logic.",
      },
      {
        title: "Custom Parameters",
        description:
          "Set your own churn parameters, customizable per client, with a dynamic risk scoring engine.",
      },
      {
        title: "Internal Client Rating",
        description:
          "Add your own internal rating to factor in your team's input on client relationship health.",
      },
      {
        title: "Client Health Insights",
        description:
          "View an always-up-to-date snapshot of every client's health score via a Client Pulse dashboard.",
      },
      {
        title: "Health & Performance Trends",
        description:
          "Monitor week-over-week or month-over-month changes across critical client performance metrics.",
      },
    ],
    ctaHeadline: "Reduce Churn With Synup Agency OS",
    ctaVariant: "brand",
  },
  {
    product: "agency-os",
    subpage: "custom-fields",
    title: "Custom Fields — Agency OS — Synup",
    description:
      "Capture, organize, and retrieve every piece of client information that matters — your way.",
    headline: "Keep Record Of All Data On Your Clients",
    subheadline:
      "Capture, organize, and retrieve every piece of client information that matters — your way. Custom fields let you store anything from business details to internal notes, giving your agency total flexibility and control.",
    eyebrow: "Agency OS",
    features: [
      {
        title: "Client App Tracking",
        description:
          "Know which tools each client is subscribed to (Listings, Reviews, Social, and others).",
      },
      {
        title: "Custom Field Management",
        description:
          "Add and manage custom fields based on your agency's unique workflow and data needs.",
      },
      {
        title: "Activity & Communication Logs",
        description:
          "Track payment history, communication logs, proposals, and more without switching tabs.",
      },
      {
        title: "Standardized Data Points",
        description:
          "Keep your team aligned by standardizing key data points across all client records.",
      },
      {
        title: "AI-Powered Data Enrichment",
        description:
          "Let built-in AI fill in the blanks — employee count, industry, competitor ratings — automatically.",
      },
      {
        title: "Performance Snapshot",
        description:
          "Quickly check how each client is performing across SEO, reputation, and visibility channels.",
      },
    ],
    ctaHeadline: "Organize Your Client Data With Synup OS",
    ctaVariant: "brand",
  },
  {
    product: "agency-os",
    subpage: "client-summary",
    title: "Client Summary — Agency OS — Synup",
    description:
      "Get a complete, real-time view of each client — payments, performance, engagement, risk — all in one dashboard.",
    headline: "At-A-Glance View Of All Client Information",
    subheadline:
      "Get a complete, real-time view of each client. Check on payments, performance, engagement, risk, and more in one streamlined, customizable dashboard — no need to switch between multiple platforms.",
    eyebrow: "Agency OS",
    features: [
      {
        title: "Business Details",
        description:
          "View contact details, business information, and onboarding status at a glance.",
      },
      {
        title: "Performance Signals",
        description:
          "Track important business performance metrics for each client across all marketing channels.",
      },
      {
        title: "Activity Timeline",
        description:
          "See recent activities by your team or the client themselves in a single timeline view.",
      },
      {
        title: "AI Data Enrichment",
        description:
          "Add or remove custom fields and enrich client data with AI-powered research.",
      },
      {
        title: "Gaps & Opportunities",
        description:
          "Identify service gaps and upsell opportunities for each account instantly.",
      },
      {
        title: "Notes & Docs",
        description:
          "Centralize call notes, contracts, and project files tied directly to each client profile.",
      },
    ],
    ctaHeadline: "Build Your Single Source of Truth With Synup OS",
    ctaVariant: "brand",
  },
  /* ── Presence (Listings) ─────────────────────────────────────────── */
  {
    product: "presence",
    subpage: "network",
    title: "Listings Publisher Network — Synup",
    description:
      "Explore Synup's extensive network of listing publishers across every country. From Google to local directories.",
    headline: "List Your Clients Everywhere That Matters",
    subheadline:
      "Explore Synup's extensive network of listing publishers for each country. From global platforms like Google and Facebook to local directories, ensure your clients' business data is consistent, accurate, and discoverable wherever customers are searching.",
    eyebrow: "Presence",
    features: [
      {
        title: "Google & Facebook",
        description:
          "Sync to the two most critical directories — Google Business Profile and Facebook — on all plans.",
      },
      {
        title: "Apple Maps",
        description:
          "Reach millions of iPhone and Siri users searching for nearby businesses via Apple Maps.",
      },
      {
        title: "Bing & Microsoft",
        description:
          "Appear on Bing search and Windows devices to capture Microsoft's user base.",
      },
      {
        title: "40+ Premium Directories",
        description:
          "Sync to Foursquare, Yellow Pages, Hotfrog, and 40+ other high-authority directories.",
      },
      {
        title: "Country-Specific Publishers",
        description:
          "Access region-specific directories across 30+ countries including US, UK, Germany, France, Australia, India, and more.",
      },
      {
        title: "Industry Directories",
        description:
          "Get listed on vertical-specific directories most relevant to your clients' industries.",
      },
    ],
    ctaHeadline: "List Everywhere. Rank Anywhere. Convert More.",
    ctaVariant: "brand",
  },
  {
    product: "presence",
    subpage: "features",
    title: "Listings Features — Synup",
    description:
      "Packed with powerful features to help clients dominate local search, drive foot traffic, and stay ahead of competition.",
    headline: "Everything You Need To Win Local Search",
    subheadline:
      "Packed with powerful features to help your clients dominate local search, drive foot traffic, and stay ahead of the competition.",
    eyebrow: "Presence",
    features: [
      {
        title: "Duplicate Listings Suppression",
        description:
          "Identify and suppress duplicate listings to maintain brand accuracy across all platforms.",
      },
      {
        title: "Bulk Verification",
        description:
          "Handle multi-location onboarding at scale with bulk verification capabilities.",
      },
      {
        title: "Bulk Edits & Automations",
        description:
          "Bulk edit listings across multiple client locations and schedule important listing updates.",
      },
      {
        title: "Publisher Override",
        description:
          "Manually edit listings on specific platforms using the publisher override feature.",
      },
      {
        title: "Local Posts & Campaigns",
        description:
          "Schedule local posts to Google and Facebook. Run weather-based and event-based trigger campaigns.",
      },
      {
        title: "AI-Powered Content",
        description:
          "Use AI to create engaging posts for all client locations and keep content fresh automatically.",
      },
    ],
    ctaHeadline: "Win Local Search With Synup",
    ctaVariant: "brand",
  },
  {
    product: "presence",
    subpage: "analytics",
    title: "Listings Analytics — Synup",
    description:
      "Track, measure, and report the true impact of local marketing from one powerful dashboard.",
    headline: "Prove Value. Show ROI. Win Client Trust.",
    subheadline:
      "Track, measure, and report the true impact of your local marketing efforts from one powerful dashboard. Synup gives agencies the local analytics they need to win client trust, optimize performance, and drive measurable growth across locations.",
    eyebrow: "Presence",
    features: [
      {
        title: "Profile Actions Tracking",
        description:
          "Monitor calls, direction requests, website visits, and map views across all locations.",
      },
      {
        title: "Share of Voice",
        description:
          "Track which listings are indexed by search engines and monitor Share of Voice.",
      },
      {
        title: "Top Keywords",
        description:
          "Discover top keywords driving traffic to clients' Google Business Profiles.",
      },
      {
        title: "Local Rank Tracking",
        description:
          "Bulk-add keywords and monitor rankings on Google Search and Google Maps per location.",
      },
      {
        title: "Grid Rank Tracking",
        description:
          "Visualize search rankings on a neighborhood grid to see exactly where clients rank.",
      },
      {
        title: "Key Insights & ROI",
        description:
          "Demonstrate the real-world impact of local SEO with revenue-linked insights for clients.",
      },
    ],
    ctaHeadline: "Prove Your Impact With Synup Analytics",
    ctaVariant: "brand",
  },
  {
    product: "presence",
    subpage: "pricing",
    title: "Listings Management Pricing — Synup",
    description:
      "No hidden fees — just powerful tools to manage local presence. Listings Pro starts at $35/location/month.",
    headline: "Select the Most Suitable Plan for Your Agency",
    subheadline:
      "No hidden fees, just powerful tools to manage your clients' local presence. Choose the plan that fits your agency's scale.",
    eyebrow: "Presence",
    features: [
      {
        title: "Listings Pro — $35/location/month",
        description:
          "Listing on 75+ directories, bulk connect & edit, automated indexing, Share of Voice, duplicate suppression, local posting, and rank tracking.",
      },
      {
        title: "Synup OS Base — $79/month",
        description:
          "Ideal for agencies with a small client count that need quick access to basic features.",
      },
      {
        title: "Synup OS Agency — $199/month",
        description:
          "Ideal for growth-stage agencies looking to streamline operations and scale client management.",
      },
      {
        title: "No Hidden Fees",
        description:
          "Transparent pricing with no surprises — pay only for the locations and features you need.",
      },
    ],
    ctaHeadline: "Get Started With Synup Listings",
    ctaVariant: "brand",
  },
  /* ── Reputation (Reviews) ────────────────────────────────────────── */
  {
    product: "reputation",
    subpage: "network",
    title: "Review Monitoring Network — Synup",
    description:
      "Monitor and manage reviews across top platforms — Google, Facebook, Yelp, and industry-specific sites.",
    headline: "Monitor and Manage Reviews Across Top Platforms",
    subheadline:
      "Discover all the review sites Synup supports across different countries. From Google and Facebook to industry-specific platforms, manage client feedback in one place across every reputation touchpoint.",
    eyebrow: "Reputation",
    features: [
      {
        title: "Google & Facebook",
        description:
          "Monitor and respond to the most impactful reviews on Google Search and Facebook.",
      },
      {
        title: "Apple & Bing",
        description:
          "Stay on top of reviews on Apple Maps and Bing to cover Microsoft and Apple device users.",
      },
      {
        title: "Industry-Specific Platforms",
        description:
          "Track reviews on Zillow, DealerRater, Cars.com, Edmunds, and other vertical directories.",
      },
      {
        title: "20+ Review Sources",
        description:
          "Monitor reviews from over 20 platforms in one centralized dashboard.",
      },
      {
        title: "Multi-Country Support",
        description:
          "Support for review platforms across 30+ countries including US, UK, Germany, France, Australia, and India.",
      },
    ],
    ctaHeadline: "Monitor Every Review With Synup",
    ctaVariant: "brand",
  },
  {
    product: "reputation",
    subpage: "feature",
    title: "Review Management Features — Synup",
    description:
      "Advanced features to take clients' reputation up a notch — bulk monitoring, AI responses, and automation.",
    headline: "Advanced Features To Elevate Client Reputation",
    subheadline:
      "From bulk review monitoring to automated review acquisition campaigns, Synup equips your agency with everything needed to manage, enhance, and show improvement in client reputation at scale.",
    eyebrow: "Reputation",
    features: [
      {
        title: "Review Monitoring",
        description:
          "See reviews from Google, Facebook, Yelp, and more in real-time. Multi-location management with bulk actions.",
      },
      {
        title: "Smart AI Responses",
        description:
          "Craft contextual review responses using AI based on sentiment, keywords, and star ratings.",
      },
      {
        title: "Review Templates",
        description:
          "Build a library of pre-approved response templates for every client and respond quickly.",
      },
      {
        title: "Automated Response Rules",
        description:
          "Set up automations for specific actions whenever there's a new review for any client location.",
      },
      {
        title: "Review Alerts",
        description:
          "Get instant alerts or daily/weekly digests delivered directly to your mailbox.",
      },
      {
        title: "Review Widgets",
        description:
          "Use customizable review widgets to display the best reviews on client websites.",
      },
    ],
    ctaHeadline: "Manage Client Reputation With Synup",
    ctaVariant: "brand",
  },
  {
    product: "reputation",
    subpage: "analytics",
    title: "Review Analytics — Synup",
    description:
      "Turn reviews into powerful insights with sentiment analysis, trend tracking, and customizable reports.",
    headline: "Turn Reviews Into Powerful Insights",
    subheadline:
      "Deliver more than just responses — deliver results. With Synup's Review Analytics, your agency can track sentiment, performance, and trends across locations to prove ROI for your services.",
    eyebrow: "Reputation",
    features: [
      {
        title: "Sentiment Analysis",
        description:
          "Detect recurring themes and customer concerns automatically. Go beyond the star rating.",
      },
      {
        title: "Identify Improvements",
        description:
          "Identify areas for operational improvement based on real customer sentiment data.",
      },
      {
        title: "Performance Dashboards",
        description:
          "Access dashboards for all client accounts showing review volume, response rates, and average rating trends.",
      },
      {
        title: "Exportable Reports",
        description:
          "Export reports for QBRs or performance reviews. Share data-driven narratives with clients.",
      },
      {
        title: "Flexible Filters",
        description:
          "Filter reviews by star rating, platform, response status, or location to focus on what needs attention.",
      },
      {
        title: "Quick-View Dashboard",
        description:
          "See top-performing and underperforming locations at a glance with platform-wise breakdowns.",
      },
    ],
    ctaHeadline: "Prove Reputation ROI With Synup Analytics",
    ctaVariant: "brand",
  },
  {
    product: "reputation",
    subpage: "generation",
    title: "Review Generation — Synup",
    description:
      "Automate review requests at scale via email or SMS. Help clients generate fresh, authentic reviews consistently.",
    headline: "Generate More Reviews For Your Clients",
    subheadline:
      "Fresh, authentic reviews aren't just good for reputation — they're critical for local SEO. Using Synup's review software, your agency can help clients generate more reviews through automated, scalable campaigns.",
    eyebrow: "Reputation",
    features: [
      {
        title: "Automated Review Campaigns",
        description:
          "Launch review generation campaigns in minutes using email or SMS. Bulk upload contacts or connect to client CRM.",
      },
      {
        title: "Personalized Requests",
        description:
          "Send personalized review requests from the client's own domain, matching their brand tone and style.",
      },
      {
        title: "CRM & POS Integration",
        description:
          "Automatically request reviews from new customers by connecting to client CRM or POS systems.",
      },
      {
        title: "Custom Review Pages",
        description:
          "Create a dedicated review collection page with customizable logo, styling, and messaging.",
      },
      {
        title: "Unhappy Customer Filtering",
        description:
          "Use customizable filters to flag unhappy customers and address their concerns before public posting.",
      },
      {
        title: "Review Recency for SEO",
        description:
          "Keep clients relevant in local search — Google prioritizes businesses with a steady stream of recent reviews.",
      },
    ],
    ctaHeadline: "Launch New Review Campaigns for Clients",
    ctaVariant: "brand",
  },
  {
    product: "reputation",
    subpage: "pricing",
    title: "Review Management Pricing — Synup",
    description:
      "Reviews Pro at $20/location/month. Reviews Gold at $50/location/month. No hidden fees.",
    headline: "Select the Most Suitable Plan for Your Agency",
    subheadline:
      "No hidden fees, just powerful tools to manage and grow your clients' reputation. Choose the plan that best fits your agency's needs.",
    eyebrow: "Reputation",
    features: [
      {
        title: "Reviews Pro — $20/location/month",
        description:
          "Monitor 20+ review sources, unlimited review viewing, daily monitoring, automations, and AI responses.",
      },
      {
        title: "Reviews Gold — $50/location/month",
        description:
          "Everything in Pro plus review surveys, CRM integration, sentiment analysis, and 1,000 monthly email credits.",
      },
      {
        title: "Synup OS Base — $79/month",
        description:
          "The agency management platform. All reputation add-ons work within Synup OS.",
      },
    ],
    ctaHeadline: "Start Managing Client Reputation With Synup",
    ctaVariant: "brand",
  },
  /* ── Social ──────────────────────────────────────────────────────── */
  {
    product: "social",
    subpage: "platform",
    title: "Social Media Platforms — Synup",
    description:
      "Build client presence on Instagram, Facebook, LinkedIn, X (Twitter), and Pinterest from one dashboard.",
    headline: "Build Client Presence On Popular Social Networks",
    subheadline:
      "Explore the top social media platforms Synup Social supports — manage content across every major network from one centralized dashboard.",
    eyebrow: "Social",
    features: [
      {
        title: "Instagram",
        description:
          "Share visual content, reels, and stories to engage audiences with high-impact creative.",
      },
      {
        title: "Facebook",
        description:
          "Reach audiences with posts, images, and links on the world's largest social network.",
      },
      {
        title: "LinkedIn",
        description:
          "Connect with professionals and build authority through B2B-focused content.",
      },
      {
        title: "X (formerly Twitter)",
        description:
          "Join real-time conversations and amplify your message with trending hashtags.",
      },
      {
        title: "Pinterest",
        description:
          "Inspire audiences through visually-driven, search-friendly pins.",
      },
    ],
    ctaHeadline: "Manage All Social Platforms With Synup",
    ctaVariant: "brand",
  },
  {
    product: "social",
    subpage: "features",
    title: "Social Media Features — Synup",
    description:
      "AI-powered content creation, multi-location publishing, bulk scheduling, and performance tracking — all in one.",
    headline: "All The Features You Need To Power Social At Scale",
    subheadline:
      "From AI-powered content creation to multi-location publishing and performance tracking, explore everything Synup Social offers to help you and your clients post smarter, faster, and better.",
    eyebrow: "Social",
    features: [
      {
        title: "Multi-Platform Scheduling",
        description:
          "Schedule posts for Facebook, Instagram, X, LinkedIn, and Pinterest in one go.",
      },
      {
        title: "Bulk Post Scheduler",
        description:
          "Upload and schedule tens of posts across accounts and brands in minutes.",
      },
      {
        title: "Platform-Specific Editing",
        description:
          "Customize captions and media for each platform without duplicating your workflow.",
      },
      {
        title: "AI-Assisted Post Generation",
        description:
          "Get instant post ideas based on trending topics, hashtags, and audience interests.",
      },
      {
        title: "In-Built Approval Workflow",
        description:
          "Assign approvers, track approvals, and notify reviewers to keep posts moving on schedule.",
      },
      {
        title: "Paid Social Posts",
        description:
          "Boost visibility by managing and sponsoring social posts directly to Meta platforms.",
      },
    ],
    ctaHeadline: "Power Social At Scale With Synup",
    ctaVariant: "brand",
  },
  {
    product: "social",
    subpage: "analytics",
    title: "Social Media Analytics — Synup",
    description:
      "Track engagement, follower growth, and post performance across all social platforms from one dashboard.",
    headline: "Powerful Analytics To Enable the Right Decisions",
    subheadline:
      "From engagement scores to follower growth, Synup Social's analytics give you and your clients a clear picture of what's performing, what's not, and what to do next.",
    eyebrow: "Social",
    features: [
      {
        title: "Organic & Paid Tracking",
        description:
          "Track both organic and paid post performance in one unified dashboard.",
      },
      {
        title: "Engagement Metrics",
        description:
          "View platform-specific metrics like likes, comments, shares, and clicks.",
      },
      {
        title: "Performance Comparisons",
        description:
          "Compare specific periods and platforms to pinpoint what's working best for each client.",
      },
      {
        title: "Engagement Score",
        description:
          "Overall engagement score per brand with breakdown by individual metrics and channel.",
      },
      {
        title: "Visual Trends",
        description:
          "Engagement graphs, post impression trends, follower growth, and weekly/monthly target tracking.",
      },
      {
        title: "Shareable Reports",
        description:
          "Share visually appealing reports with clients, or share live analytics dashboards via secure links.",
      },
    ],
    ctaHeadline: "Measure Social Impact With Synup",
    ctaVariant: "brand",
  },
  {
    product: "social",
    subpage: "pricing",
    title: "Social Media Management Pricing — Synup",
    description:
      "Social Pro starts at $6/connection/month. Includes AI content, shared calendar, analytics, and more.",
    headline: "Select the Most Suitable Plan for Your Agency",
    subheadline:
      "No hidden fees, just powerful tools to manage social media for all your clients. Start with Social Pro and scale as you grow.",
    eyebrow: "Social",
    features: [
      {
        title: "Social Pro — $6/connect/month",
        description:
          "Post ideas, AI-generated posts, shared content calendar, analytics, paid boosts, hashtag tracking, and competitor tracking.",
      },
      {
        title: "Synup OS Base — $79/month",
        description:
          "The agency operating system. Social Pro works as an add-on within Synup OS.",
      },
      {
        title: "Synup OS Agency — $199/month",
        description:
          "For growth-stage agencies looking to streamline operations and scale social management.",
      },
    ],
    ctaHeadline: "Start Managing Social With Synup",
    ctaVariant: "brand",
  },
];

/* ─── Known param combinations for generateStaticParams ─────────────────── */

const KNOWN_COMBOS = SUB_PRODUCT_PAGES.map(({ product, subpage }) => ({
  product,
  subpage,
}));

/* ─── Static params ──────────────────────────────────────────────────────── */

export function generateStaticParams() {
  const params: { locale: string; product: string; subpage: string }[] = [];
  for (const locale of routing.locales) {
    for (const { product, subpage } of KNOWN_COMBOS) {
      params.push({ locale, product, subpage });
    }
  }
  return params;
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; product: string; subpage: string }>;
}): Promise<Metadata> {
  const { locale, product, subpage } = await params;
  const page = SUB_PRODUCT_PAGES.find(
    (p) => p.product === product && p.subpage === subpage
  );
  if (!page) return { title: "Product — Synup" };

  const baseUrl = "https://www.synup.com";
  const path =
    locale === "en"
      ? `/products/${product}/${subpage}`
      : `/${locale}/products/${product}/${subpage}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/products/${product}/${subpage}`,
        de: `${baseUrl}/de/products/${product}/${subpage}`,
        fr: `${baseUrl}/fr/products/${product}/${subpage}`,
        es: `${baseUrl}/es/products/${product}/${subpage}`,
      },
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function SubProductPage({
  params,
}: {
  params: Promise<{ locale: string; product: string; subpage: string }>;
}) {
  const { locale, product, subpage } = await params;
  setRequestLocale(locale as Locale);

  const page = SUB_PRODUCT_PAGES.find(
    (p) => p.product === product && p.subpage === subpage
  );
  if (!page) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;
  const parentHref = `${prefix}/products/${page.product}`;

  return (
    <>
      <HeroSection
        eyebrow={page.eyebrow ?? "Products"}
        headline={page.headline}
        subheadline={page.subheadline}
        ctas={[
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "primary" },
          { label: `Back to ${page.eyebrow ?? "Product"}`, href: parentHref, variant: "secondary" },
        ]}
      />

      {page.features && page.features.length > 0 && (
        <FeatureGrid
          headline="Key Features"
          columns={3}
          items={page.features}
        />
      )}

      <CTABanner
        headline={page.ctaHeadline ?? "Partner With Synup Today!"}
        subheadline="Book a call with our team to explore how Synup can help your agency grow."
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        secondaryCta={{ label: "See All Products", href: `${prefix}/products` }}
        variant={page.ctaVariant ?? "brand"}
      />
    </>
  );
}
