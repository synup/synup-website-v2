import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTABanner } from "@/components/sections/CTABanner";
import type { Locale } from "@/lib/content";

/* ─── List page definitions ──────────────────────────────────────────────── */

interface ListItem {
  title: string;
  description?: string;
}

interface ListPage {
  slug: string;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  eyebrow?: string;
  categories?: { label: string; items: ListItem[] }[];
  introHtml?: string;
  ctaHeadline?: string;
}

const LIST_PAGES: ListPage[] = [
  {
    slug: "chrome-seo-plugins",
    title: "The Monster List Of Chrome SEO Plugins — Synup",
    description:
      "A curated list of the best Chrome SEO plugins and extensions to help you become an SEO superstar.",
    headline: "The Monster List Of Chrome SEO Plugins",
    subheadline:
      "Chrome plugins for you to become an SEO superstar. From rank tracking to backlink analysis, these extensions cover every SEO need.",
    eyebrow: "SEO Resources",
    categories: [
      {
        label: "SEO",
        items: [
          {
            title: "Moz Bar",
            description: "Streamline your SEO while you surf the web.",
          },
          {
            title: "Ahrefs SEO Toolbar",
            description:
              "See how you're listed on over 50 sites with free scan and sync your data.",
          },
          {
            title: "SerpWorx",
            description:
              "Instantly view the SEO metrics of all ranking sites for any keyword.",
          },
          {
            title: "SEOQuake",
            description:
              "Get key SEO metrics, along with other useful tools such as SEO Audit.",
          },
          {
            title: "WooRank",
            description:
              "Deep analysis covering SEO, Mobile, Local and Usability.",
          },
          {
            title: "Open SEO Stats",
            description:
              "Shows web rank and SEO stats of current web page, with quick access to Geo IP Location, Whois, Alexa, backlinks, and indexed pages.",
          },
          {
            title: "SEO Site Tools",
            description:
              "On-Page / External metrics, Social Media info, PR / numbering on Yahoo, Bing, Google SERPs.",
          },
          {
            title: "SEO SERP Workbench",
            description:
              "Quickly check the position of multiple sites given a keyword. Many countries are supported.",
          },
          {
            title: "Oncrawl SEO Page",
            description:
              "A real full SEO report: useful to detect errors on a page and optimize it.",
          },
          {
            title: "Majestic Backlink Analyzer",
            description:
              "Get instant link counts and see who is linking to the page.",
          },
          {
            title: "SEO Status Pagerank/Alexa Toolbar",
            description: "Streamline your SEO while you surf the web.",
          },
          {
            title: "YSlow",
            description:
              "Analyzes web pages and suggests ways to improve their performance.",
          },
        ],
      },
    ],
    ctaHeadline: "Boost Your Local SEO With Synup",
  },
  {
    slug: "citation-building",
    title: "The Monster List of Citation Building Ideas — Synup",
    description:
      "An extensive list of citation building strategies to boost your local SEO and online visibility.",
    headline: "The Monster List Of Citation Building Ideas",
    subheadline:
      "An extensive collection of citation building strategies across generic directories, niche sites, local platforms, and more.",
    eyebrow: "Local SEO Resources",
    categories: [
      {
        label: "Citation Sources",
        items: [
          {
            title: "Generic Directories",
            description:
              "Submit to major general business directories for broad coverage.",
          },
          {
            title: "Niche Directories",
            description:
              "Target industry-specific directories relevant to your business category.",
          },
          {
            title: "Location Specific Directories",
            description:
              "Get listed in city, state, and region-specific directories.",
          },
          {
            title: "Competitor Citations",
            description: "Identify where competitors are listed and get listed there too.",
          },
          {
            title: "Online Classifieds",
            description: "Use classified ad sites for additional citation opportunities.",
          },
          {
            title: "Convert Existing Mentions",
            description:
              "Find unlinked brand mentions and convert them to proper citations.",
          },
          {
            title: "Data Aggregators",
            description:
              "Submit to major data aggregators that feed information to hundreds of directories.",
          },
          {
            title: "Company Directories",
            description:
              "List your business on company-focused directories and B2B platforms.",
          },
          {
            title: "Chamber of Commerce",
            description:
              "Join your local chamber and get listed in their member directory.",
          },
          {
            title: "Job Boards",
            description:
              "Many job boards double as business citation sources with company profiles.",
          },
          {
            title: "Press Releases",
            description:
              "Distribute press releases through PR services to earn citations from news sites.",
          },
          {
            title: "Geo-Tag Your Photos",
            description:
              "Tag uploaded photos with location data for additional local signals.",
          },
        ],
      },
    ],
    ctaHeadline: "Automate Citation Building With Synup",
  },
  {
    slug: "ideas-to-generate-reviews",
    title: "The Monster List Of Ideas To Generate Reviews — Synup",
    description:
      "An extensive list of actionable ideas to generate more reviews for your business across every channel.",
    headline: "The Monster List Of Ideas To Generate Reviews",
    subheadline:
      "An extensive list of ideas to generate reviews for your business — from email marketing to in-store tactics.",
    eyebrow: "Reputation Resources",
    categories: [
      {
        label: "Digital Tactics",
        items: [
          {
            title: "Actionable Schema",
            description:
              "Use review email schema to let customers write reviews directly from the email without opening your site.",
          },
          {
            title: "Email Marketing",
            description:
              "Send targeted email campaigns asking satisfied customers for reviews.",
          },
          {
            title: "Email Review Us Links",
            description:
              "Include direct links to your review profiles in transactional emails.",
          },
          {
            title: "Website Review Widget",
            description:
              "Embed a review collection widget on your website to capture feedback.",
          },
          {
            title: "Review Landing Page",
            description:
              "Create a dedicated landing page that funnels customers to your preferred review sites.",
          },
          {
            title: "Pop Ups",
            description:
              "Use exit-intent or timed pop-ups to prompt happy visitors to leave reviews.",
          },
          {
            title: "Facebook Advertising",
            description:
              "Run targeted Facebook ads to reach past customers and request reviews.",
          },
          {
            title: "Twitter Advertising",
            description:
              "Use Twitter ads to amplify your review request campaigns.",
          },
        ],
      },
      {
        label: "In-Person Tactics",
        items: [
          {
            title: "Posters & Cards",
            description:
              "Display QR codes or review request cards in your physical location.",
          },
          {
            title: "Stickers & Posters",
            description:
              "Use physical signage to prompt customers to leave reviews after their visit.",
          },
          {
            title: "Thank You Postcards",
            description:
              "Send handwritten or printed thank you cards with a review request.",
          },
          {
            title: "Provide Free WiFi",
            description:
              "Use a captive portal on your free WiFi to direct customers to your review profiles.",
          },
          {
            title: "Video Reviews",
            description:
              "Ask satisfied customers to leave video testimonials or reviews.",
          },
          {
            title: "Meetups & Events",
            description:
              "Request reviews from attendees after hosting events or webinars.",
          },
          {
            title: "Discounts on Next Service",
            description:
              "Incentivize reviews by offering a discount or perk for the next visit.",
          },
          {
            title: "Ask",
            description:
              "The simplest and most effective tactic: just ask customers directly for a review.",
          },
        ],
      },
    ],
    ctaHeadline: "Automate Review Generation With Synup",
  },
];

const KNOWN_SLUGS = LIST_PAGES.map((p) => p.slug);

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
  const page = LIST_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Synup" };

  const baseUrl = "https://www.synup.com";
  const path = locale === "en" ? `/lists/${slug}` : `/${locale}/lists/${slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/lists/${slug}`,
        de: `${baseUrl}/de/lists/${slug}`,
        fr: `${baseUrl}/fr/lists/${slug}`,
        es: `${baseUrl}/es/lists/${slug}`,
      },
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function ListDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const page = LIST_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <HeroSection
        eyebrow={page.eyebrow ?? "Resources"}
        headline={page.headline}
        subheadline={page.subheadline}
        centered
      />

      {page.categories?.map((category) => (
        <section
          key={category.label}
          className="py-[var(--synup-space-section)] bg-[var(--synup-color-bg-surface)]"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-semibold text-[var(--synup-color-primary-text)] mb-8">
              {category.label}
            </h2>
            <div className="divide-y divide-[var(--synup-color-border)]">
              {category.items.map((item) => (
                <div key={item.title} className="py-5">
                  <p className="font-semibold text-[var(--synup-color-primary-text)] mb-1">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-[var(--synup-color-secondary-text)] text-sm">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABanner
        headline={page.ctaHeadline ?? "Grow With Synup"}
        primaryCta={{ label: "Book a Demo", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
