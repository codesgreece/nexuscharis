"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { packageSchema } from "@/lib/validations";
import { AuditAction, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fail,
  formBool,
  formInt,
  formLines,
  formOptionalString,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

function revalidatePackagePaths() {
  revalidatePath("/");
  revalidatePath("/admin/packages");
}

export async function createPackageAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(packageSchema, {
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    price: formString(formData, "price"),
    oldPrice: formOptionalString(formData, "oldPrice"),
    discount: formOptionalString(formData, "discount"),
    features: formLines(formData, "features"),
    ctaText: formString(formData, "ctaText") || "Ζήτησε Προσφορά",
    ctaUrl: formString(formData, "ctaUrl") || "#contact",
    highlighted: formBool(formData, "highlighted"),
    active: formBool(formData, "active"),
    order: formInt(formData, "order"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.package.create({
    data: {
      ...parsed.data,
      features: parsed.data.features as Prisma.InputJsonValue,
    },
  });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.CREATE,
    entity: "Package",
    entityId: item.id,
    details: { title: item.title },
  });

  revalidatePackagePaths();
  redirect("/admin/packages");
}

export async function updatePackageAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(packageSchema, {
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    price: formString(formData, "price"),
    oldPrice: formOptionalString(formData, "oldPrice"),
    discount: formOptionalString(formData, "discount"),
    features: formLines(formData, "features"),
    ctaText: formString(formData, "ctaText") || "Ζήτησε Προσφορά",
    ctaUrl: formString(formData, "ctaUrl") || "#contact",
    highlighted: formBool(formData, "highlighted"),
    active: formBool(formData, "active"),
    order: formInt(formData, "order"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.package.update({
    where: { id },
    data: {
      ...parsed.data,
      features: parsed.data.features as Prisma.InputJsonValue,
    },
  });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "Package",
    entityId: item.id,
    details: { title: item.title },
  });

  revalidatePackagePaths();
  return ok();
}

export async function deletePackageAction(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const item = await prisma.package.delete({ where: { id } });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.DELETE,
    entity: "Package",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidatePackagePaths();
  return ok();
}
