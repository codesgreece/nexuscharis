import { PrismaClient, Prisma } from "@prisma/client";
import { buildLegalDefaults } from "../src/content/legal/defaults";

const prisma = new PrismaClient();

async function main() {
  const legalDefaults = buildLegalDefaults({
    businessName: "NEXUS DEV STUDIO GREECE",
    email: "nexusdevstudio@outlook.com",
    phone: "6936732844",
    founderName: "Χριστόπουλος Χαράλαμπος",
  });

  for (const page of legalDefaults) {
    await prisma.legalPage.upsert({
      where: { pageKey: page.pageKey },
      update: {
        title: page.title,
        sections: page.sections as unknown as Prisma.InputJsonValue,
        version: page.version,
        published: true,
        lastUpdated: new Date(page.lastUpdated),
      },
      create: {
        pageKey: page.pageKey,
        title: page.title,
        sections: page.sections as unknown as Prisma.InputJsonValue,
        version: page.version,
        published: true,
        lastUpdated: new Date(page.lastUpdated),
      },
    });
  }

  const existingBiz = await prisma.legalBusinessInfo.findFirst();
  if (!existingBiz) {
    await prisma.legalBusinessInfo.create({
      data: {
        businessName: "NEXUS DEV STUDIO GREECE",
        email: "nexusdevstudio@outlook.com",
        phone: "6936732844",
        country: "Ελλάδα",
      },
    });
  }

  const legalSeo = [
    {
      pageKey: "privacy",
      title: "NEXUS DEV STUDIO | Πολιτική Απορρήτου",
      metaDescription: "Πολιτική απορρήτου του NEXUS DEV STUDIO GREECE.",
      robots: "index, follow",
    },
    {
      pageKey: "cookies",
      title: "NEXUS DEV STUDIO | Πολιτική Cookies",
      metaDescription: "Πολιτική cookies του NEXUS DEV STUDIO GREECE.",
      robots: "index, follow",
    },
    {
      pageKey: "terms",
      title: "NEXUS DEV STUDIO | Όροι Χρήσης",
      metaDescription: "Όροι χρήσης του NEXUS DEV STUDIO GREECE.",
      robots: "index, follow",
    },
    {
      pageKey: "services-terms",
      title: "NEXUS DEV STUDIO | Όροι Υπηρεσιών",
      metaDescription: "Όροι υπηρεσιών του NEXUS DEV STUDIO GREECE.",
      robots: "index, follow",
    },
    {
      pageKey: "copyright",
      title: "NEXUS DEV STUDIO | Πνευματικά Δικαιώματα",
      metaDescription: "Πνευματικά δικαιώματα του NEXUS DEV STUDIO GREECE.",
      robots: "index, follow",
    },
  ];

  for (const seo of legalSeo) {
    await prisma.sEOSettings.upsert({
      where: { pageKey: seo.pageKey },
      update: seo,
      create: seo,
    });
  }

  console.log("Legal seed OK", await prisma.legalPage.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
