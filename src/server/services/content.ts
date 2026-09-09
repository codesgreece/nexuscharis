import { prisma } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

function isActiveNow(active: boolean, startDate?: Date | null, endDate?: Date | null) {
  if (!active) return false;
  const now = Date.now();
  if (startDate && startDate.getTime() > now) return false;
  if (endDate && endDate.getTime() < now) return false;
  return true;
}

export async function getPublicSiteData() {
  noStore();

  try {
    const [
      settings,
      hero,
      intro,
      about,
      vision,
      services,
      processSteps,
      packages,
      projects,
      offers,
      popups,
      advertisements,
      seoHome,
    ] = await Promise.all([
      prisma.siteSettings.findFirst(),
      prisma.heroContent.findFirst({ where: { enabled: true } }),
      prisma.introContent.findFirst({ where: { enabled: true } }),
      prisma.aboutContent.findFirst({ where: { enabled: true } }),
      prisma.visionContent.findFirst({ where: { enabled: true } }),
      prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
      prisma.processStep.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
      prisma.package.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
      prisma.portfolioProject.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
      }),
      prisma.offer.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } }),
      prisma.popup.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } }),
      prisma.advertisement.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } }),
      prisma.sEOSettings.findUnique({ where: { pageKey: "home" } }),
    ]);

    const activeOffers = offers.filter((o) => isActiveNow(o.active, o.startDate, o.endDate));
    const activePopups = popups.filter((p) => isActiveNow(p.active, p.startDate, p.endDate));
    const activeAds = advertisements.filter((a) =>
      isActiveNow(a.active, a.startDate, a.endDate),
    );

    return {
      settings,
      hero,
      intro,
      about,
      vision,
      services,
      processSteps,
      packages,
      projects,
      offers: activeOffers,
      popups: activePopups,
      advertisements: activeAds,
      seo: seoHome,
    };
  } catch (error) {
    console.error("getPublicSiteData failed:", error);
    return {
      settings: null,
      hero: null,
      intro: null,
      about: null,
      vision: null,
      services: [],
      processSteps: [],
      packages: [],
      projects: [],
      offers: [],
      popups: [],
      advertisements: [],
      seo: null,
    };
  }
}

export async function getDashboardStats() {
  noStore();
  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    activePackages,
    activeOffers,
    activePopups,
    contactMessages,
    recentActivity,
  ] = await Promise.all([
    prisma.portfolioProject.count(),
    prisma.portfolioProject.count({ where: { published: true } }),
    prisma.portfolioProject.count({ where: { published: false } }),
    prisma.package.count({ where: { active: true } }),
    prisma.offer.count({ where: { active: true } }),
    prisma.popup.count({ where: { active: true } }),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { admin: { select: { name: true, email: true } } },
    }),
  ]);

  return {
    totalProjects,
    publishedProjects,
    draftProjects,
    activePackages,
    activeOffers,
    activePopups,
    contactMessages,
    recentActivity,
  };
}
