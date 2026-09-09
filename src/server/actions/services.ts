"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serviceSchema } from "@/lib/validations";
import { AuditAction } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fail,
  formBool,
  formInt,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

function revalidateServicePaths() {
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function createServiceAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(serviceSchema, {
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    icon: formString(formData, "icon") || "globe",
    order: formInt(formData, "order"),
    active: formBool(formData, "active"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.service.create({ data: parsed.data });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.CREATE,
    entity: "Service",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateServicePaths();
  redirect("/admin/services");
}

export async function updateServiceAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(serviceSchema, {
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    icon: formString(formData, "icon") || "globe",
    order: formInt(formData, "order"),
    active: formBool(formData, "active"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.service.update({ where: { id }, data: parsed.data });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "Service",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateServicePaths();
  return ok();
}

export async function deleteServiceAction(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const item = await prisma.service.delete({ where: { id } });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.DELETE,
    entity: "Service",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateServicePaths();
  return ok();
}
