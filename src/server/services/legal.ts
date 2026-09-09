import type { LegalPageKey, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import {
  buildLegalDefaults,
  type LegalPageContent,
  type LegalSection,
} from "@/content/legal/defaults";
import { LEGAL_META, LEGAL_ROUTE_BY_KEY } from "@/content/legal/meta";

export { LEGAL_META, LEGAL_ROUTE_BY_KEY };

const FALLBACK_CONTACT = {
  businessName: "NEXUS DEV STUDIO GREECE",
  email: "nexusdevstudio@outlook.com",
  phone: "6936732844",
  founderName: "Χριστόπουλος Χαράλαμπος",
};

export type LegalBusinessConfig = {
  businessName: string;
  address: string | null;
  email: string;
  phone: string;
  vatNumber: string | null;
  taxOffice: string | null;
  registryNumber: string | null;
  country: string;
  dpoEmail: string | null;
};

function parseSections(value: unknown): LegalSection[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const heading = "heading" in item && typeof item.heading === "string" ? item.heading : "";
      const paragraphs =
        "paragraphs" in item && Array.isArray(item.paragraphs)
          ? item.paragraphs.filter((p: unknown): p is string => typeof p === "string")
          : [];
      if (!heading) return null;
      return { heading, paragraphs };
    })
    .filter((s): s is LegalSection => Boolean(s));
}

export async function getLegalContactDefaults() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return {
      businessName: settings?.siteName || FALLBACK_CONTACT.businessName,
      email: settings?.email || FALLBACK_CONTACT.email,
      phone: settings?.phone || FALLBACK_CONTACT.phone,
      founderName: settings?.founderName || FALLBACK_CONTACT.founderName,
    };
  } catch {
    return FALLBACK_CONTACT;
  }
}

export async function ensureLegalDefaults() {
  const contact = await getLegalContactDefaults();
  const defaults = buildLegalDefaults(contact);

  for (const page of defaults) {
    const existing = await prisma.legalPage.findUnique({ where: { pageKey: page.pageKey } });
    if (existing) continue;
    await prisma.legalPage.create({
      data: {
        pageKey: page.pageKey,
        title: page.title,
        sections: page.sections as unknown as Prisma.InputJsonValue,
        published: true,
        version: page.version,
        lastUpdated: new Date(page.lastUpdated),
      },
    });
  }

  const biz = await prisma.legalBusinessInfo.findFirst();
  if (!biz) {
    await prisma.legalBusinessInfo.create({
      data: {
        businessName: contact.businessName,
        email: contact.email,
        phone: contact.phone,
        address: null,
        vatNumber: null,
        taxOffice: null,
        registryNumber: null,
        country: "Ελλάδα",
        dpoEmail: null,
      },
    });
  }
}

export async function getLegalBusinessInfo(): Promise<LegalBusinessConfig> {
  try {
    await ensureLegalDefaults();
    const row = await prisma.legalBusinessInfo.findFirst();
    const contact = await getLegalContactDefaults();
    return {
      businessName: row?.businessName || contact.businessName,
      address: row?.address ?? null,
      email: row?.email || contact.email,
      phone: row?.phone || contact.phone,
      vatNumber: row?.vatNumber ?? null,
      taxOffice: row?.taxOffice ?? null,
      registryNumber: row?.registryNumber ?? null,
      country: row?.country || "Ελλάδα",
      dpoEmail: row?.dpoEmail ?? null,
    };
  } catch {
    return {
      businessName: FALLBACK_CONTACT.businessName,
      address: null,
      email: FALLBACK_CONTACT.email,
      phone: FALLBACK_CONTACT.phone,
      vatNumber: null,
      taxOffice: null,
      registryNumber: null,
      country: "Ελλάδα",
      dpoEmail: null,
    };
  }
}

export async function getLegalPage(pageKey: LegalPageKey): Promise<LegalPageContent> {
  const contact = await getLegalContactDefaults();
  const fallback = buildLegalDefaults(contact).find((p) => p.pageKey === pageKey)!;

  try {
    await ensureLegalDefaults();
    const row = await prisma.legalPage.findUnique({ where: { pageKey } });
    if (!row) return fallback;
    if (!row.published) return fallback;

    const sections = parseSections(row.sections);
    return {
      pageKey,
      title: row.title || fallback.title,
      version: row.version || fallback.version,
      lastUpdated: row.lastUpdated.toISOString().slice(0, 10),
      sections: sections.length > 0 ? sections : fallback.sections,
    };
  } catch {
    return fallback;
  }
}

export async function getAllLegalPagesAdmin() {
  await ensureLegalDefaults();
  return prisma.legalPage.findMany({ orderBy: { pageKey: "asc" } });
}
