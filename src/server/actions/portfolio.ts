"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { portfolioSchema } from "@/lib/validations";
import { AuditAction } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fail,
  formBool,
  formInt,
  formOptionalString,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

function revalidatePortfolioPaths() {
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}

export async function createPortfolioAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(portfolioSchema, {
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    category: formString(formData, "category"),
    imageUrl: formOptionalString(formData, "imageUrl"),
    logoUrl: formOptionalString(formData, "logoUrl"),
    liveUrl: formOptionalString(formData, "liveUrl"),
    caseStudyUrl: formOptionalString(formData, "caseStudyUrl"),
    featured: formBool(formData, "featured"),
    published: formBool(formData, "published"),
    order: formInt(formData, "order"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.portfolioProject.create({ data: parsed.data });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.CREATE,
    entity: "PortfolioProject",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidatePortfolioPaths();
  redirect("/admin/portfolio");
}

export async function updatePortfolioAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(portfolioSchema, {
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    category: formString(formData, "category"),
    imageUrl: formOptionalString(formData, "imageUrl"),
    logoUrl: formOptionalString(formData, "logoUrl"),
    liveUrl: formOptionalString(formData, "liveUrl"),
    caseStudyUrl: formOptionalString(formData, "caseStudyUrl"),
    featured: formBool(formData, "featured"),
    published: formBool(formData, "published"),
    order: formInt(formData, "order"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.portfolioProject.update({ where: { id }, data: parsed.data });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "PortfolioProject",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidatePortfolioPaths();
  return ok();
}

export async function deletePortfolioAction(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const item = await prisma.portfolioProject.delete({ where: { id } });
  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.DELETE,
    entity: "PortfolioProject",
    entityId: item.id,
    details: { title: item.title },
  });
  revalidatePortfolioPaths();
  return ok();
}
