import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JobDetailView } from "@/components/careers/JobDetailView";
import { getAllActiveJobSlugs, getJobBySlug } from "@/content/jobs";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";
import { getPublicSiteData } from "@/server/services/content";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllActiveJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) {
    return {
      title: "Θέση μη διαθέσιμη | NEXUS DEV STUDIO GREECE",
      robots: { index: false, follow: false },
    };
  }

  const title = `${job.title} | Careers | NEXUS DEV STUDIO GREECE`;
  const description = job.shortDescription;
  const url = absoluteUrl(`/careers/${job.slug}`);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      locale: "el_GR",
      type: "website",
      siteName: "NEXUS DEV STUDIO GREECE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function employmentTypeSchema(type: string) {
  switch (type) {
    case "Full-time":
      return "FULL_TIME";
    case "Part-time":
      return "PART_TIME";
    case "Contract":
      return "CONTRACTOR";
    case "Internship":
      return "INTERN";
    default:
      return "OTHER";
  }
}

function buildJobPostingJsonLd(job: NonNullable<ReturnType<typeof getJobBySlug>>) {
  const site = getSiteUrl();
  const url = absoluteUrl(`/careers/${job.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.description, job.role].join("\n\n"),
    datePosted: job.postedAt || undefined,
    employmentType: employmentTypeSchema(job.type),
    hiringOrganization: {
      "@type": "Organization",
      name: "NEXUS DEV STUDIO GREECE",
      sameAs: site,
      url: site,
    },
    jobLocationType: /remote/i.test(job.location) ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Greece",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GR",
        addressLocality: /αθήνα|athens/i.test(job.location) ? "Athens" : "Greece",
      },
    },
    url,
    directApply: true,
    identifier: {
      "@type": "PropertyValue",
      name: "NEXUS DEV STUDIO",
      value: job.id,
    },
  };
}

export default async function CareerJobPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const data = await getPublicSiteData();
  const settings = data.settings!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJobPostingJsonLd(job)) }}
      />
      <Header />
      <main className="bg-warm-ivory pt-[72px]">
        <JobDetailView job={job} />
      </main>
      <Footer
        siteName={settings.siteName || "NEXUS DEV STUDIO GREECE"}
        tagline={settings.tagline || "Digital solutions designed around your business."}
        phone={settings.phone || "6936732844"}
        email={settings.email || "nexusdevstudio@outlook.com"}
        social={{
          facebookUrl: settings.facebookUrl,
          instagramUrl: settings.instagramUrl,
          linkedinUrl: settings.linkedinUrl,
          twitterUrl: settings.twitterUrl,
          dribbbleUrl: settings.dribbbleUrl,
        }}
      />
    </>
  );
}
