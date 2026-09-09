"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { popupSchema } from "@/lib/validations";
import { AuditAction, PopupFrequency } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fail,
  formBool,
  formDateTime,
  formInt,
  formOptionalString,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

function revalidatePopupPaths() {
  revalidatePath("/");
  revalidatePath("/admin/popups");
}

function parsePopup(formData: FormData) {
  return parseWithSchema(popupSchema, {
    title: formString(formData, "title"),
    content: formString(formData, "content"),
    imageUrl: formOptionalString(formData, "imageUrl"),
    ctaText: formOptionalString(formData, "ctaText"),
    ctaUrl: formOptionalString(formData, "ctaUrl"),
    triggerDelayMs: formInt(formData, "triggerDelayMs", 3000),
    displayFrequency: formString(formData, "displayFrequency") || "ONCE_PER_SESSION",
    active: formBool(formData, "active"),
    startDate: formDateTime(formData, "startDate"),
    endDate: formDateTime(formData, "endDate"),
  });
}

export async function createPopupAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parsePopup(formData);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.popup.create({
    data: {
      ...parsed.data,
      displayFrequency: parsed.data.displayFrequency as PopupFrequency,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    },
  });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.CREATE,
    entity: "Popup",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidatePopupPaths();
  redirect("/admin/popups");
}

export async function updatePopupAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parsePopup(formData);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.popup.update({
    where: { id },
    data: {
      ...parsed.data,
      displayFrequency: parsed.data.displayFrequency as PopupFrequency,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    },
  });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "Popup",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidatePopupPaths();
  return ok();
}

export async function deletePopupAction(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const item = await prisma.popup.delete({ where: { id } });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.DELETE,
    entity: "Popup",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidatePopupPaths();
  return ok();
}
