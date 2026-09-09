"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { offerSchema } from "@/lib/validations";
import { AuditAction } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fail,
  formBool,
  formDateTime,
  formOptionalString,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

function revalidateOfferPaths() {
  revalidatePath("/");
  revalidatePath("/admin/offers");
}

function parseOffer(formData: FormData) {
  return parseWithSchema(offerSchema, {
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    discount: formOptionalString(formData, "discount"),
    price: formOptionalString(formData, "price"),
    oldPrice: formOptionalString(formData, "oldPrice"),
    ctaText: formString(formData, "ctaText") || "Μάθε περισσότερα",
    ctaUrl: formString(formData, "ctaUrl") || "#contact",
    startDate: formDateTime(formData, "startDate"),
    endDate: formDateTime(formData, "endDate"),
    active: formBool(formData, "active"),
  });
}

export async function createOfferAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseOffer(formData);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.offer.create({
    data: {
      ...parsed.data,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    },
  });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.CREATE,
    entity: "Offer",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateOfferPaths();
  redirect("/admin/offers");
}

export async function updateOfferAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseOffer(formData);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.offer.update({
    where: { id },
    data: {
      ...parsed.data,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    },
  });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "Offer",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateOfferPaths();
  return ok();
}

export async function deleteOfferAction(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const item = await prisma.offer.delete({ where: { id } });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.DELETE,
    entity: "Offer",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateOfferPaths();
  return ok();
}
