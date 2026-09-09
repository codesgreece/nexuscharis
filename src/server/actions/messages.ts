"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { messageStatusSchema } from "@/lib/validations";
import { AuditAction, ContactStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fail,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

function revalidateMessagePaths() {
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function updateMessageStatusAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(messageStatusSchema, {
    status: formString(formData, "status"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.contactMessage.update({
    where: { id },
    data: { status: parsed.data.status as ContactStatus },
  });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "ContactMessage",
    entityId: item.id,
    details: { status: item.status, email: item.email },
  });
  revalidateMessagePaths();
  return ok();
}

export async function deleteMessageAction(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const item = await prisma.contactMessage.delete({ where: { id } });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.DELETE,
    entity: "ContactMessage",
    entityId: item.id,
    details: { email: item.email },
  });
  revalidateMessagePaths();
  return ok();
}

export async function deleteMessageAndRedirectAction(id: string): Promise<ActionResult> {
  const result = await deleteMessageAction(id);
  if (result.success) redirect("/admin/messages");
  return result;
}
