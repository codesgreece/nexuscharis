"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  aboutContentSchema,
  heroContentSchema,
  introContentSchema,
  visionContentSchema,
} from "@/lib/validations";
import { AuditAction, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fail,
  formBool,
  formJson,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

function revalidateContent(path: string) {
  revalidatePath("/");
  revalidatePath(path);
}

export async function updateHeroAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const stats = formJson<unknown>(formData, "stats");
  if (stats === null) return fail("Stats must be valid JSON", { stats: ["Invalid JSON"] });

  const parsed = parseWithSchema(heroContentSchema, {
    badge: formString(formData, "badge"),
    title: formString(formData, "title"),
    subtitle: formString(formData, "subtitle"),
    primaryCtaText: formString(formData, "primaryCtaText"),
    primaryCtaUrl: formString(formData, "primaryCtaUrl"),
    secondaryCtaText: formString(formData, "secondaryCtaText"),
    secondaryCtaUrl: formString(formData, "secondaryCtaUrl"),
    trustLine: formString(formData, "trustLine"),
    stats,
    enabled: formBool(formData, "enabled"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const existing = await prisma.heroContent.findFirst();
  const data = {
    ...parsed.data,
    stats: parsed.data.stats as Prisma.InputJsonValue,
  };
  const item = existing
    ? await prisma.heroContent.update({ where: { id: existing.id }, data })
    : await prisma.heroContent.create({ data });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "HeroContent",
    entityId: item.id,
  });
  revalidateContent("/admin/hero");
  return ok();
}

export async function updateAboutAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const timeline = formJson<unknown>(formData, "timeline");
  if (timeline === null) return fail("Timeline must be valid JSON", { timeline: ["Invalid JSON"] });

  const parsed = parseWithSchema(aboutContentSchema, {
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    timeline,
    enabled: formBool(formData, "enabled"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const existing = await prisma.aboutContent.findFirst();
  const data = {
    ...parsed.data,
    timeline: parsed.data.timeline as Prisma.InputJsonValue,
  };
  const item = existing
    ? await prisma.aboutContent.update({ where: { id: existing.id }, data })
    : await prisma.aboutContent.create({ data });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "AboutContent",
    entityId: item.id,
  });
  revalidateContent("/admin/about");
  return ok();
}

export async function updateVisionAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const principles = formJson<unknown>(formData, "principles");
  if (principles === null) {
    return fail("Principles must be valid JSON", { principles: ["Invalid JSON"] });
  }

  const parsed = parseWithSchema(visionContentSchema, {
    title: formString(formData, "title"),
    statement: formString(formData, "statement"),
    description: formString(formData, "description"),
    principles,
    enabled: formBool(formData, "enabled"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const existing = await prisma.visionContent.findFirst();
  const data = {
    ...parsed.data,
    principles: parsed.data.principles as Prisma.InputJsonValue,
  };
  const item = existing
    ? await prisma.visionContent.update({ where: { id: existing.id }, data })
    : await prisma.visionContent.create({ data });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "VisionContent",
    entityId: item.id,
  });
  revalidateContent("/admin/vision");
  return ok();
}

export async function updateIntroAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(introContentSchema, {
    title: formString(formData, "title"),
    body: formString(formData, "body"),
    highlight: formString(formData, "highlight"),
    enabled: formBool(formData, "enabled"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const existing = await prisma.introContent.findFirst();
  const item = existing
    ? await prisma.introContent.update({ where: { id: existing.id }, data: parsed.data })
    : await prisma.introContent.create({ data: parsed.data });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "IntroContent",
    entityId: item.id,
  });
  revalidateContent("/admin/intro");
  return ok();
}
