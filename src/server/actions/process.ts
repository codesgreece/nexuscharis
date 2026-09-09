"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { processStepSchema } from "@/lib/validations";
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

function revalidateProcessPaths() {
  revalidatePath("/");
  revalidatePath("/admin/process");
}

function parseStep(formData: FormData) {
  return parseWithSchema(processStepSchema, {
    number: formString(formData, "number"),
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    icon: formString(formData, "icon") || "message",
    order: formInt(formData, "order"),
    active: formBool(formData, "active"),
  });
}

export async function createProcessStepAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseStep(formData);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.processStep.create({ data: parsed.data });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.CREATE,
    entity: "ProcessStep",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateProcessPaths();
  redirect("/admin/process");
}

export async function updateProcessStepAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseStep(formData);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.processStep.update({ where: { id }, data: parsed.data });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "ProcessStep",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateProcessPaths();
  return ok();
}

export async function deleteProcessStepAction(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const item = await prisma.processStep.delete({ where: { id } });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.DELETE,
    entity: "ProcessStep",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidateProcessPaths();
  return ok();
}
