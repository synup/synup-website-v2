import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { CardGrid } from "@/components/sections/CardGrid";

/* ─── Static params ──────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://www.synup.com";
  const canonical = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  const titles: Record<string, string> = {
    en: "Synup — The Operating System For Agencies",
    de: "Synup — Das Betriebssystem für Agenturen",
    fr: "Synup — Le système d'exploitation pour les agences",
    es: "Synup — El sistema operativo para agencias",
  };
  const descriptions: Record<string, string> = {
    en: "Join 5000+ partners using Synup's unified platform to drive revenue, streamline agency operations, and deliver exceptional results for their clients.",
    de: "Schließe dich 5000+ Partnern an, die Synups einheitliche Plattform nutzen, um Umsatz zu steigern und außergewöhnliche Ergebnisse zu erzielen.",
    fr: "Rejoignez 5000+ partenaires utilisant la plateforme unifiée de Synup pour générer des revenus et obtenir des résultats exceptionnels.",
    es: "Únete a más de 5000 socios que usan la plataforma unificada de Synup para impulsar ingresos y obtener resultados excepcionales.",
  };

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical,
      languages: {
        en: baseUrl,
        de: `${baseUrl}/de`,
        fr: `${baseUrl}/fr`,
        es: `${baseUrl}/es`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: canonical,
      type: "website",
      images: [{ url: `${baseUrl}/assets/images/og-home.png`, width: 1200, height: 630 }],
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      {/* 1. Hero — "Level up your agency & delight your clients" */}
      <HeroSection
        eyebrow="Join 5000+ Agency Partners"
        headline="Level up your agency & delight your clients"
        subheadline="Use our unified platform to drive revenue, streamline agency operations, and deliver exceptional results for your clients."
        ctas={[
          { label: "Book a Demo", href: `${prefix}/book-a-demo`, variant: "primary" },
          { label: "Explore Apps", href: `${prefix}/products`, variant: "secondary" },
        ]}
        image={{
          src: "/assets/images/hero-dashboard.png",
          alt: "Synup agency dashboard screenshot",
          width: 680,
          height: 500,
        }}
      />

      {/* 2. Stats — social proof numbers */}
      <StatsSection
        stats={[
          { value: "5,000+", label: "Agency Partners" },
          { value: "600,000+", label: "Businesses on Platform" },
          { value: "2014", label: "Founded" },
          { value: "Inc. 500", label: "Fastest Growing" },
        ]}
      />

      {/* 3. Synup OS — The End-to-End Operating System */}
      <FeatureGrid
        eyebrow="Synup OS"
        headline="The End-to-End Operating System For Your Agency"
        subheadline="Manage the entire client lifecycle from sales and onboarding to retention and renewal through one centralized platform."
        columns={2}
        items={[
          {
            title: "Pre-sales & CRM",
            description:
              "Find High-quality Leads & Convert Them. Identify high-potential prospects with precision targeting, run personalized sales motions, and centralize all sales activities.",
            href: `${prefix}/products/agency-os`,
            linkLabel: "Learn More",
          },
          {
            title: "Activities & Project Management",
            description:
              "Track All Client Activities. Consolidate all client information in one place. Track team activities efficiently and use client data to be on top of any critical issues.",
            href: `${prefix}/products/agency-os`,
            linkLabel: "Learn More",
          },
          {
            title: "e-Sign, Proposals & Payments",
            description:
              "Get Paid On Time. Automate recurring invoices and set reminders to eliminate collection headaches. Create trackable proposals and e-sign documents.",
            href: `${prefix}/products/agency-os`,
            linkLabel: "Learn More",
          },
          {
            title: "Sales Pipeline",
            description:
              "Close More Deals. Everything you need to grow sales. Find and work the best leads, close deals lightning fast, and get signature & paid quickly.",
            href: `${prefix}/products/agency-os`,
            linkLabel: "Learn More",
          },
        ]}
      />

      {/* 4. AI Advantage */}
      <ContentBlock
        eyebrow="Your Agency's AI Advantage"
        headline="Do more with less effort"
        subheadline="Smart AI solutions built into the OS platform for multiple use cases — from sales to client management to marketing."
        cta={{ label: "Explore AI Features", href: `${prefix}/ai/synup-ai` }}
        image={{
          src: "/assets/images/ai-advantage.png",
          alt: "Synup AI features illustration",
          width: 560,
          height: 420,
        }}
        imagePosition="right"
      />

      {/* 5. Marketing Apps */}
      <FeatureGrid
        eyebrow="Powerful Marketing Apps"
        headline="Drive Client Performance"
        subheadline="Empower your clients with a robust suite of white label marketing tools that amplify online visibility and drive measurable growth."
        columns={3}
        items={[
          {
            title: "Listing Management",
            description:
              "Manage all client listings across our expansive publisher network and optimize their Share of Voice.",
            href: `${prefix}/products/presence`,
            linkLabel: "Know More",
          },
          {
            title: "Review Management",
            description:
              "Improve client reputation with AI responses, seamless CRM integrations, and automated review campaigns.",
            href: `${prefix}/products/reputation`,
            linkLabel: "Know More",
          },
          {
            title: "Social Media Management",
            description:
              "Boost engagement with AI-generated social posts, smart scheduling, and multi-brand management capabilities.",
            href: `${prefix}/products/social`,
            linkLabel: "Know More",
          },
          {
            title: "SEO",
            description:
              "Boost your client's search performance with advanced SEO tools, rank tracking, and custom reports.",
            href: `${prefix}/products/seo`,
            linkLabel: "Know More",
          },
          {
            title: "CRM",
            description:
              "Manage projects, activities, client data, and communication history in one centralized place.",
            href: `${prefix}/products/crm`,
            linkLabel: "Know More",
          },
          {
            title: "Invoicing & e-Signature",
            description:
              "Avoid billing headaches with our invoicing software. Use e-sign and securely share important documents.",
            href: `${prefix}/products/invoicing-e-sign`,
            linkLabel: "Know More",
          },
        ]}
      />

      {/* 6. White Labeling */}
      <ContentBlock
        eyebrow="Make Synup Your Own"
        headline="Launch With Ease"
        subheadline="Effortlessly create a fully branded client experience using our advanced customizations. Then launch your own platform in just minutes!"
        cta={{ label: "Explore White Label", href: `${prefix}/white-label/white-label-software` }}
        image={{
          src: "/assets/images/white-label-preview.png",
          alt: "Synup white label dashboard preview",
          width: 560,
          height: 420,
        }}
        imagePosition="left"
      />

      {/* 7. Social proof — customer stories */}
      <TestimonialSection
        eyebrow="Join 5000+ agencies growing with us!"
        headline="What Our Customers Say"
        testimonials={[
          {
            name: "Kristen Dillon",
            title: "VP of Operations",
            company: "Zoek",
            quote:
              "What set Synup apart from all other places we looked is their dedication to their customers and their clients. It feels like a relationship, they're really there to help you.",
            rating: 5,
          },
          {
            name: "Aaron Gobidas",
            title: "CEO",
            company: "GoBeRewarded!",
            quote:
              "Most businesses don't realize this, but getting these little things right is a leg up against the competition. The Synup platform gives us the ability to hone our attention to detail.",
            rating: 5,
          },
          {
            name: "Jane Foster",
            title: "Admin and Resident 'Synup Expert'",
            company: "Smart Link Solutions",
            quote:
              "Synup is always updating their platform. Our Customer Success Manager always lets me know about new updates that benefit our clients.",
            rating: 5,
          },
        ]}
        layout="grid"
      />

      {/* 8. Case study highlights */}
      <CardGrid
        eyebrow="Customer Stories"
        headline="How We Help Our Partners"
        items={[
          {
            title: "Zoek Marketing Delivers Custom Solutions For Clients by Partnering with Synup",
            description:
              "Learn how Zoek Marketing achieved 20% revenue impact by leveraging Synup's platform.",
            badge: "20% Revenue Impact",
            href: `${prefix}/case-studies/zoek-marketing`,
            ctaLabel: "Read Story",
          },
          {
            title: "Olive Street Design Scales Client Solutions Effectively by Partnering with Synup",
            description:
              "Learn how Olive Street Design achieved 30% revenue impact by partnering with Synup.",
            badge: "30% Revenue Impact",
            href: `${prefix}/case-studies/olive-street-design`,
            ctaLabel: "Read Story",
          },
        ]}
        columns={2}
        viewAllHref={`${prefix}/case-studies`}
        viewAllLabel="View All Stories"
      />

      {/* 9. Final CTA */}
      <CTABanner
        eyebrow="Partner With Synup Today!"
        headline="Book a call with our partnership manager to explore custom growth solutions for your agency."
        primaryCta={{ label: "Get Started", href: `${prefix}/book-a-demo` }}
        variant="brand"
      />
    </>
  );
}
