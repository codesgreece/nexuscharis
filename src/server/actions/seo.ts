"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { seoSchema } from "@/lib/validations";
import { AuditAction } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fail,
  formOptionalString,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

export async function updateSeoAction(
  pageKey: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(seoSchema, {
    title: formString(formData, "title"),
    metaDescription: formString(formData, "metaDescription"),
    keywords: formOptionalString(formData, "keywords"),
    canonicalUrl: formOptionalString(formData, "canonicalUrl"),
    ogTitle: formOptionalString(formData, "ogTitle"),
    ogDescription: formOptionalString(formData, "ogDescription"),
    ogImage: formOptionalString(formData, "ogImage"),
    twitterCard: formOptionalString(formData, "twitterCard"),
    robots: formOptionalString(formData, "robots"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.sEOSettings.upsert({
    where: { pageKey },
    update: parsed.data,
    create: { pageKey, ...parsed.data },
  });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "SEOSettings",
    entityId: item.id,
    details: { pageKey },
  });

  revalidatePath("/");
  revalidatePath("/admin/seo");
  return ok();
}
