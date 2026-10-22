import { prisma } from "@/lib/db";
import type { ApplicationStatus, Job, JobStatus, Prisma } from "@prisma/client";

export type PublicJob = {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  category: string;
  shortDescription: string;
  description: string;
  role: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  whyNexus: string;
  salary: string | null;
  experience: string | null;
  coverImage: string | null;
  postedAt?: string;
  status: JobStatus;
  acceptingApplications: boolean;
};

function isExpired(job: Pick<Job, "expiresAt">, now = new Date()): boolean {
  return Boolean(job.expiresAt && job.expiresAt.getTime() < now.getTime());
}

export function toPublicJob(job: Job): PublicJob {
  const accepting =
    job.status === "ACTIVE" && !job.archivedAt && !isExpired(job);

  return {
    id: job.id,
    slug: job.slug,
    title: job.title,
    location: job.location,
    type: job.employmentType,
    category: job.category,
    shortDescription: job.shortDescription,
    description: job.description,
    role: job.role,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    benefits: job.benefits,
    whyNexus: job.whyNexus,
    salary: job.salary,
    experience: job.experience,
    coverImage: job.coverImage,
    postedAt: job.publishedAt ? job.publishedAt.toISOString().slice(0, 10) : undefined,
    status: job.status,
    acceptingApplications: accepting,
  };
}

export async function getActivePublicJobs(): Promise<PublicJob[]> {
  const now = new Date();
  const jobs = await prisma.job.findMany({
    where: {
      status: "ACTIVE",
      archivedAt: null,
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return jobs.map(toPublicJob);
}

export async function getAllActiveJobSlugs(): Promise<string[]> {
  const jobs = await getActivePublicJobs();
  return jobs.map((job) => job.slug);
}

/** Public detail: ACTIVE or CLOSED (not draft/archived). */
export async function getPublicJobBySlug(slug: string): Promise<PublicJob | null> {
  const job = await prisma.job.findFirst({
    where: {
      slug,
      archivedAt: null,
      status: { in: ["ACTIVE", "CLOSED"] },
    },
  });
  if (!job) return null;
  return toPublicJob(job);
}

/** Apply endpoint: only currently accepting jobs. */
export async function getAcceptingJobBySlug(slug: string): Promise<Job | null> {
  const now = new Date();
  return prisma.job.findFirst({
    where: {
      slug,
      status: "ACTIVE",
      archivedAt: null,
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
  });
}

export async function getAdminJobById(id: string) {
  return prisma.job.findFirst({
    where: { id, archivedAt: null },
    include: {
      _count: { select: { applications: true } },
    },
  });
}

export async function getAdminJobStats() {
  const [active, draft, closed, applications, newApplications] = await Promise.all([
    prisma.job.count({ where: { status: "ACTIVE", archivedAt: null } }),
    prisma.job.count({ where: { status: "DRAFT", archivedAt: null } }),
    prisma.job.count({ where: { status: "CLOSED", archivedAt: null } }),
    prisma.jobApplication.count(),
    prisma.jobApplication.count({ where: { status: "NEW" } }),
  ]);
  return { active, draft, closed, applications, newApplications };
}

export type AdminJobListFilters = {
  q?: string;
  status?: JobStatus | "ALL";
};

export async function listAdminJobs(filters: AdminJobListFilters = {}) {
  const where: Prisma.JobWhereInput = { archivedAt: null };
  if (filters.status && filters.status !== "ALL") {
    where.status = filters.status;
  }
  if (filters.q?.trim()) {
    const q = filters.q.trim();
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { category: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
      { slug: { contains: q, mode: "insensitive" } },
    ];
  }

  return prisma.job.findMany({
    where,
    include: { _count: { select: { applications: true } } },
    orderBy: [{ createdAt: "desc" }],
  });
}

export type AdminApplicationFilters = {
  q?: string;
  status?: ApplicationStatus | "ALL";
  jobId?: string;
};

export async function listAdminApplications(filters: AdminApplicationFilters = {}) {
  const where: Prisma.JobApplicationWhereInput = {};
  if (filters.jobId) where.jobId = filters.jobId;
  if (filters.status && filters.status !== "ALL") where.status = filters.status;
  if (filters.q?.trim()) {
    const q = filters.q.trim();
    where.OR = [
      { fullName: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
    ];
  }

  return prisma.jobApplication.findMany({
    where,
    include: {
      job: { select: { id: true, title: true, slug: true, status: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminApplicationById(id: string) {
  return prisma.jobApplication.findUnique({
    where: { id },
    include: {
      job: true,
    },
  });
}
