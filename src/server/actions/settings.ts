"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { siteSettingsSchema } from "@/lib/validations";
import { AuditAction, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fail,
  formJson,
  formOptionalString,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

export async function updateSettingsAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const businessHours = formJson<unknown>(formData, "businessHours");
  if (businessHours === null) {
    return fail("Business hours must be valid JSON", { businessHours: ["Invalid JSON"] });
  }

  const parsed = parseWithSchema(siteSettingsSchema, {
    siteName: formString(formData, "siteName"),
    tagline: formString(formData, "tagline"),
    phone: formString(formData, "phone"),
    email: formString(formData, "email"),
    address: formOptionalString(formData, "address"),
    facebookUrl: formOptionalString(formData, "facebookUrl"),
    instagramUrl: formOptionalString(formData, "instagramUrl"),
    linkedinUrl: formOptionalString(formData, "linkedinUrl"),
    dribbbleUrl: formOptionalString(formData, "dribbbleUrl"),
    twitterUrl: formOptionalString(formData, "twitterUrl"),
    logoUrl: formString(formData, "logoUrl") || "/images/logo.svg",
    founderImageUrl: formString(formData, "founderImageUrl") || "/images/founder.jpg",
    founderName: formString(formData, "founderName"),
    founderTitle: formString(formData, "founderTitle"),
    businessHours,
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const existing = await prisma.siteSettings.findFirst();
  const item = existing
    ? await prisma.siteSettings.update({
        where: { id: existing.id },
        data: {
          ...parsed.data,
          businessHours: parsed.data.businessHours as Prisma.InputJsonValue,
        },
      })
    : await prisma.siteSettings.create({
        data: {
          ...parsed.data,
          businessHours: parsed.data.businessHours as Prisma.InputJsonValue,
        },
      });

  await writeAuditLog({
    adminId: user.id,
    action: existing ? AuditAction.UPDATE : AuditAction.CREATE,
    entity: "SiteSettings",
    entityId: item.id,
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return ok();
}
