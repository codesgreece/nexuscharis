"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { advertisementSchema } from "@/lib/validations";
import { AdPosition, AuditAction } from "@prisma/client";
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

function revalidateAdPaths() {
  revalidatePath("/");
  revalidatePath("/admin/advertisements");
}

function parseAd(formData: FormData) {
  return parseWithSchema(advertisementSchema, {
    title: formString(formData, "title"),
    content: formOptionalString(formData, "content"),
    imageUrl: formOptionalString(formData, "imageUrl"),
    url: formOptionalString(formData, "url"),
    position: formString(formData, "position") || "BEFORE_PACKAGES",
    active: formBool(formData, "active"),
    startDate: formDateTime(formData, "startDate"),
    endDate: formDateTime(formData, "endDate"),
  });
}

export async function createAdvertisementAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseAd(formData);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.advertisement.create({
    data: {
      ...parsed.data,
      position: parsed.data.position as AdPosition,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    },
  });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.CREATE,
    entity: "Advertisement",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateAdPaths();
  redirect("/admin/advertisements");
}

export async function updateAdvertisementAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseAd(formData);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.advertisement.update({
    where: { id },
    data: {
      ...parsed.data,
      position: parsed.data.position as AdPosition,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    },
  });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "Advertisement",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateAdPaths();
  return ok();
}

export async function deleteAdvertisementAction(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const item = await prisma.advertisement.delete({ where: { id } });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.DELETE,
    entity: "Advertisement",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateAdPaths();
  return ok();
}
