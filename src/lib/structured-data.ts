import { SERVICES_INDEX_PATH, type BuildServicePage } from "@/content/build-services";
import { faqItems } from "@/content/faq";
import { absoluteUrl } from "@/lib/utils";

export type StudioContact = {
  email: string;
  telephone: string;
  founderName: string;
  founderImage: string;
  logo: string;
  sameAs: string[];
  /** Published only when the studio has entered a real address. Never invented here. */
  address: string | null;
};

export function toInternationalPhone(phone: string): string {
  const compact = phone.replace(/[\s()-]/g, "");
  if (compact.startsWith("+")) return compact;
  const digits = compact.replace(/\D/g, "");
  if (digits.startsWith("30")) return `+${digits}`;
  return `+30${digits.replace(/^0/, "")}`;
}

export function buildGlobalGraph(site: string, contact: StudioContact, description: string) {
  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${site}/#organization`,
    name: "NEXUS DEV STUDIO GREECE",
    url: `${site}/`,
    logo: {
      "@type": "ImageObject",
      url: contact.logo,
    },
    image: contact.founderImage,
    email: contact.email,
    telephone: toInternationalPhone(contact.telephone),
    areaServed: {
      "@type": "Country",
      name: "Greece",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: toInternationalPhone(contact.telephone),
        email: contact.email,
        contactType: "customer support",
        areaServed: "GR",
        availableLanguage: ["Greek", "el"],
      },
    ],
    founder: { "@id": `${site}/#person` },
  };

  if (contact.sameAs.length > 0) {
    organization.sameAs = contact.sameAs;
  }

  if (contact.address) {
    organization.address = {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressCountry: "GR",
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: `${site}/`,
        name: "NEXUS DEV STUDIO GREECE",
        description,
        inLanguage: "el-GR",
        publisher: { "@id": `${site}/#organization` },
      },
      organization,
      {
        "@type": "Person",
        "@id": `${site}/#person`,
        name: contact.founderName,
        jobTitle: "Founder & Developer",
        worksFor: { "@id": `${site}/#organization` },
        image: contact.founderImage,
        email: contact.email,
        telephone: toInternationalPhone(contact.telephone),
        url: `${site}/#about`,
      },
    ],
  };
}

export function buildHomeStructuredData(site: string, title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${site}/#webpage`,
        url: `${site}/`,
        name: title,
        description,
        inLanguage: "el-GR",
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${site}/#organization` },
        primaryImageOfPage: absoluteUrl("/images/founder.jpg"),
      },
      {
        "@type": "FAQPage",
        "@id": `${site}/#faq`,
        url: `${site}/#faq`,
        inLanguage: "el-GR",
        isPartOf: { "@id": `${site}/#webpage` },
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.join("\n\n"),
          },
        })),
      },
    ],
  };
}

export function buildServiceStructuredData(
  site: string,
  page: Pick<BuildServicePage, "slug" | "h1" | "seoDescription" | "navLabel" | "lead">,
) {
  const url = absoluteUrl(`/services/${page.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.h1,
        description: page.seoDescription,
        inLanguage: "el-GR",
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        serviceType: page.navLabel,
        description: page.lead[0],
        url,
        provider: { "@id": `${site}/#organization` },
        areaServed: { "@type": "Country", name: "Greece" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Αρχική", item: `${site}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Υπηρεσίες",
            item: absoluteUrl(SERVICES_INDEX_PATH),
          },
          { "@type": "ListItem", position: 3, name: page.navLabel, item: url },
        ],
      },
    ],
  };
}

export function buildServicesIndexStructuredData(site: string, description: string) {
  const url = absoluteUrl(SERVICES_INDEX_PATH);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Υπηρεσίες κατασκευής ιστοσελίδων και εφαρμογών",
        description,
        inLanguage: "el-GR",
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${site}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Αρχική", item: `${site}/` },
          { "@type": "ListItem", position: 2, name: "Υπηρεσίες", item: url },
        ],
      },
    ],
  };
}
