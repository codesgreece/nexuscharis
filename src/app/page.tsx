import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NexusBrandMark } from "@/components/brand";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PerformanceSection } from "@/components/sections/PerformanceSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { OffersBanner } from "@/components/marketing/OffersBanner";
import { AdBanner } from "@/components/marketing/AdBanner";
import { MarketingPopup } from "@/components/marketing/MarketingPopup";
import { getPublicSiteData } from "@/server/services/content";
import { HOME_SEO, prefersNationwideSeo } from "@/content/seo";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getPublicSiteData();

  const settings = data.settings!;
  const hero = data.hero!;
  const intro = data.intro!;
  const about = data.about!;
  const vision = data.vision!;

  const stats = (Array.isArray(hero.stats) ? hero.stats : []) as {
    value: string;
    label: string;
  }[];
  const timeline = (Array.isArray(about.timeline) ? about.timeline : []) as {
    year: string;
    title: string;
    description: string;
  }[];
  const principles = (Array.isArray(vision.principles) ? vision.principles : []) as {
    number: string;
    title: string;
    description: string;
  }[];
  const businessHours = (Array.isArray(settings.businessHours)
    ? settings.businessHours
    : []) as { day: string; hours: string }[];

  return (
    <>
      {data.offers.length > 0 && <OffersBanner offers={data.offers} />}
      <Header />
      <main>
        <HeroSection
          badge={hero.badge}
          title={prefersNationwideSeo(hero.title) ? hero.title : HOME_SEO.h1}
          subtitle={
            prefersNationwideSeo(hero.subtitle)
              ? hero.subtitle
              : "Web development, web design, landing pages, e-shops και custom digital solutions για επιχειρήσεις και επαγγελματίες σε όλη την Ελλάδα — σχεδιασμένα γύρω από τις πραγματικές ανάγκες κάθε project."
          }
          primaryCtaText={hero.primaryCtaText || "Δες τις υπηρεσίες"}
          primaryCtaUrl={hero.primaryCtaUrl || "#services"}
          secondaryCtaText={hero.secondaryCtaText}
          secondaryCtaUrl={hero.secondaryCtaUrl}
          trustLine={hero.trustLine}
          stats={stats}
          founderImageUrl={settings.founderImageUrl || "/images/founder.jpg"}
          founderName={settings.founderName || "Χριστόπουλος Χαράλαμπος"}
          founderTitle={settings.founderTitle || "Founder & Developer"}
        />

        <AdBanner ads={data.advertisements} position="HERO" />

        <NexusBrandMark />

        <IntroSection title={intro.title} body={intro.body} highlight={intro.highlight} />

        <AudienceSection />
        <CoverageSection />

        <AboutSection
          title={about.title}
          description={about.description}
          timeline={timeline}
        />

        <VisionSection
          title={vision.title}
          statement={vision.statement}
          description={vision.description}
          principles={principles}
        />

        <AdBanner ads={data.advertisements} position="BEFORE_SERVICES" />

        <ServicesSection services={data.services} />
        <ProcessSection steps={data.processSteps} />
        <PerformanceSection />

        <AdBanner ads={data.advertisements} position="BEFORE_PACKAGES" />
        <PackagesSection packages={data.packages} />

        <AdBanner ads={data.advertisements} position="BEFORE_PORTFOLIO" />
        <PortfolioSection projects={data.projects} />

        <AdBanner ads={data.advertisements} position="BEFORE_CONTACT" />
        <FaqSection />
        <ContactSection
          phone={settings.phone || "6936732844"}
          email={settings.email || "nexusdevstudio@outlook.com"}
          businessHours={businessHours}
          services={data.services.map((s) => ({ title: s.title }))}
        />
      </main>
      <Footer
        siteName={settings.siteName || "NEXUS DEV STUDIO GREECE"}
        tagline={settings.tagline || "Digital solutions designed around your business."}
        phone={settings.phone || "6936732844"}
        email={settings.email || "nexusdevstudio@outlook.com"}
      />
      <MarketingPopup popup={data.popups[0] || null} />
    </>
  );
}
