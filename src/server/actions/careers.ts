"use server";

import { writeAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isBlankRichHtml, sanitizeRichHtml, slugify } from "@/lib/html";
import { applicationStatusSchema, jobSchema } from "@/lib/validations";
import { AuditAction, type JobStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fail,
  formDateTime,
  formOptionalString,
  formString,
  ok,
  parseWithSchema,
  type ActionResult,
} from "./helpers";

function revalidateCareersPaths(slug?: string) {
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
  revalidatePath("/admin/careers/applications");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/careers/${slug}`);
    revalidatePath(`/admin/careers`);
  }
}

function parseJobForm(formData: FormData, forcedStatus?: JobStatus) {
  const title = formString(formData, "title");
  let slug = formString(formData, "slug");
  if (!slug && title) slug = slugify(title);

  const description = sanitizeRichHtml(formString(formData, "description"));
  const responsibilities = sanitizeRichHtml(formString(formData, "responsibilities"));
  const requirements = sanitizeRichHtml(formString(formData, "requirements"));
  const benefits = sanitizeRichHtml(formString(formData, "benefits"));
  const role = sanitizeRichHtml(formString(formData, "role"));
  const whyNexus = sanitizeRichHtml(formString(formData, "whyNexus"));

  const status = forcedStatus ?? (formString(formData, "status") as JobStatus);

  return parseWithSchema(jobSchema, {
    title,
    slug,
    category: formString(formData, "category"),
    location: formString(formData, "location") || "Remote",
    employmentType: formString(formData, "employmentType") || "Full-time",
    shortDescription: formString(formData, "shortDescription"),
    description: isBlankRichHtml(description) ? "" : description,
    role: isBlankRichHtml(role) ? "" : role,
    responsibilities: isBlankRichHtml(responsibilities) ? "" : responsibilities,
    requirements: isBlankRichHtml(requirements) ? "" : requirements,
    benefits: isBlankRichHtml(benefits) ? "" : benefits,
    whyNexus: isBlankRichHtml(whyNexus) ? "" : whyNexus,
    salary: formOptionalString(formData, "salary"),
    experience: formOptionalString(formData, "experience"),
    coverImage: formOptionalString(formData, "coverImage"),
    status,
    publishedAt: formDateTime(formData, "publishedAt"),
    expiresAt: formDateTime(formData, "expiresAt"),
  });
}

function toJobData(data: NonNullable<ReturnType<typeof parseJobForm>["data"]>) {
  const publishedAt =
    data.status === "ACTIVE"
      ? data.publishedAt
        ? new Date(data.publishedAt)
        : new Date()
      : data.publishedAt
        ? new Date(data.publishedAt)
        : null;

  return {
    title: data.title,
    slug: data.slug,
    category: data.category,
    location: data.location,
    employmentType: data.employmentType,
    shortDescription: data.shortDescription,
    description: data.description,
    role: data.role || "",
    responsibilities: data.responsibilities,
    requirements: data.requirements,
    benefits: data.benefits,
    whyNexus: data.whyNexus || "",
    salary: data.salary,
    experience: data.experience,
    coverImage: data.coverImage,
    status: data.status,
    publishedAt,
    expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
  };
}

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  let candidate = slug;
  let n = 2;
  while (true) {
    const existing = await prisma.job.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return candidate;
    candidate = `${slug}-${n}`;
    n += 1;
  }
}

export async function createJobAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const intent = formString(formData, "intent");
  const forced: JobStatus | undefined =
    intent === "draft" ? "DRAFT" : intent === "publish" ? "ACTIVE" : undefined;

  const parsed = parseJobForm(formData, forced);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const slug = await ensureUniqueSlug(parsed.data.slug);
  const data = toJobData({ ...parsed.data, slug });
  const item = await prisma.job.create({ data });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.CREATE,
    entity: "Job",
    entityId: item.id,
    details: { title: item.title, status: item.status },
  });

  revalidateCareersPaths(item.slug);
  redirect(`/admin/careers/${item.id}`);
}

export async function updateJobAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const intent = formString(formData, "intent");
  const forced: JobStatus | undefined =
    intent === "draft" ? "DRAFT" : intent === "publish" ? "ACTIVE" : undefined;

  const parsed = parseJobForm(formData, forced);
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const slug = await ensureUniqueSlug(parsed.data.slug, id);
  const data = toJobData({ ...parsed.data, slug });
  const item = await prisma.job.update({ where: { id }, data });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "Job",
    entityId: item.id,
    details: { title: item.title, status: item.status },
  });

  revalidateCareersPaths(item.slug);
  return ok();
}

export async function setJobStatusAction(id: string, status: JobStatus): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const existing = await prisma.job.findUnique({ where: { id } });
  if (!existing || existing.archivedAt) return fail("Η θέση δεν βρέθηκε");

  const item = await prisma.job.update({
    where: { id },
    data: {
      status,
      publishedAt:
        status === "ACTIVE"
          ? existing.publishedAt ?? new Date()
          : existing.publishedAt,
    },
  });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.TOGGLE,
    entity: "Job",
    entityId: item.id,
    details: { title: item.title, status: item.status },
  });

  revalidateCareersPaths(item.slug);
  return ok();
}

export async function duplicateJobAction(id: string): Promise<ActionResult<{ id: string }>> {
  const { user } = await requireAdmin();
  const existing = await prisma.job.findUnique({ where: { id } });
  if (!existing || existing.archivedAt) {
    return { success: false, error: "Η θέση δεν βρέθηκε" };
  }

  const slug = await ensureUniqueSlug(`${existing.slug}-copy`);
  const item = await prisma.job.create({
    data: {
      title: `${existing.title} (copy)`,
      slug,
      category: existing.category,
      location: existing.location,
      employmentType: existing.employmentType,
      shortDescription: existing.shortDescription,
      description: existing.description,
      role: existing.role,
      responsibilities: existing.responsibilities,
      requirements: existing.requirements,
      benefits: existing.benefits,
      whyNexus: existing.whyNexus,
      salary: existing.salary,
      experience: existing.experience,
      coverImage: existing.coverImage,
      status: "DRAFT",
      publishedAt: null,
      expiresAt: existing.expiresAt,
    },
  });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.CREATE,
    entity: "Job",
    entityId: item.id,
    details: { title: item.title, duplicatedFrom: existing.id },
  });

  revalidateCareersPaths();
  return ok({ id: item.id });
}

/** Soft-delete / archive. Prefer this over hard delete. */
export async function archiveJobAction(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const existing = await prisma.job.findUnique({
    where: { id },
    include: { _count: { select: { applications: true } } },
  });
  if (!existing || existing.archivedAt) return fail("Η θέση δεν βρέθηκε");

  const item = await prisma.job.update({
    where: { id },
    data: {
      archivedAt: new Date(),
      status: "CLOSED",
    },
  });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.DELETE,
    entity: "Job",
    entityId: item.id,
    details: {
      title: item.title,
      softDelete: true,
      applications: existing._count.applications,
    },
  });

  revalidateCareersPaths(item.slug);
  return ok();
}

export async function updateApplicationStatusAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = parseWithSchema(applicationStatusSchema, {
    status: formString(formData, "status"),
  });
  if (!parsed.success || !parsed.data) return fail(parsed.error || "Invalid data", parsed.fieldErrors);

  const item = await prisma.jobApplication.update({
    where: { id },
    data: { status: parsed.data.status },
    include: { job: { select: { slug: true } } },
  });

  await writeAuditLog({
    adminId: user.id,
    action: AuditAction.UPDATE,
    entity: "JobApplication",
    entityId: item.id,
    details: { status: item.status, jobId: item.jobId },
  });

  revalidatePath("/admin/careers");
  revalidatePath("/admin/careers/applications");
  revalidatePath(`/admin/careers/applications/${item.id}`);
  revalidatePath(`/admin/careers/${item.jobId}/applications`);
  return ok();
}
