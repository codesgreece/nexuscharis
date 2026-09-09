"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { legalBusinessSchema, legalPageSchema } from "@/lib/validations";
import { LEGAL_ROUTE_BY_KEY } from "@/content/legal/meta";
import { AuditAction, type LegalPageKey, type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fail,
  formBool,
  formOptionalString,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

function parseSectionsJson(raw: string) {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    const sections = parsed.map((item) => {
      if (!item || typeof item !== "object") return null;
      const heading = "heading" in item && typeof item.heading === "string" ? item.heading.trim() : "";
      const paragraphs =
        "paragraphs" in item && Array.isArray(item.paragraphs)
          ? item.paragraphs
              .filter((p: unknown): p is string => typeof p === "string")
              .map((p: string) => p.trim())
              .filter(Boolean)
          : [];
      if (!heading) return null;
      return { heading, paragraphs };
    });
    if (sections.some((s) => s == null)) return null;
    return sections as Array<{ heading: string; paragraphs: string[] }>;
  } catch {
    return null;
  }
}

export async function updateLegalPageAction(
  pageKey: LegalPageKey,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(legalPageSchema, {
    title: formString(formData, "title"),
    version: formString(formData, "version"),
    published: formBool(formData, "published"),
    sectionsJson: formString(formData, "sectionsJson"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const sections = parseSectionsJson(parsed.data.sectionsJson);
  if (!sections) {
    return fail("Invalid sections JSON. Expected [{ heading, paragraphs: string[] }, ...]");
  }

  const item = await prisma.legalPage.upsert({
    where: { pageKey },
    update: {
      title: parsed.data.title,
      version: parsed.data.version,
      published: parsed.data.published,
      sections: sections as unknown as Prisma.InputJsonValue,
      lastUpdated: new Date(),
    },
    create: {
      pageKey,
      title: parsed.data.title,
      version: parsed.data.version,
      published: parsed.data.published,
      sections: sections as unknown as Prisma.InputJsonValue,
      lastUpdated: new Date(),
    },
  });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "LegalPage",
    entityId: item.id,
    details: { pageKey, version: item.version, published: item.published },
  });

  revalidatePath("/admin/legal");
  revalidatePath(LEGAL_ROUTE_BY_KEY[pageKey]);
  return ok();
}

export async function updateLegalBusinessAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const dpoRaw = formOptionalString(formData, "dpoEmail");
  const parsed = parseWithSchema(legalBusinessSchema, {
    businessName: formString(formData, "businessName"),
    address: formOptionalString(formData, "address"),
    email: formString(formData, "email"),
    phone: formString(formData, "phone"),
    vatNumber: formOptionalString(formData, "vatNumber"),
    taxOffice: formOptionalString(formData, "taxOffice"),
    registryNumber: formOptionalString(formData, "registryNumber"),
    country: formString(formData, "country") || "Ελλάδα",
    dpoEmail: dpoRaw === "" ? null : dpoRaw,
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const existing = await prisma.legalBusinessInfo.findFirst();
  const data = {
    ...parsed.data,
    dpoEmail: parsed.data.dpoEmail || null,
  };

  const item = existing
    ? await prisma.legalBusinessInfo.update({ where: { id: existing.id }, data })
    : await prisma.legalBusinessInfo.create({ data });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "LegalBusinessInfo",
    entityId: item.id,
  });

  revalidatePath("/admin/legal");
  for (const path of Object.values(LEGAL_ROUTE_BY_KEY)) {
    revalidatePath(path);
  }
  return ok();
}
