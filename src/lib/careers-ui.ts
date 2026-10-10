import type { ApplicationStatus, JobStatus } from "@prisma/client";

export function jobStatusTone(status: JobStatus): "neutral" | "success" | "warning" | "danger" | "purple" {
  if (status === "ACTIVE") return "success";
  if (status === "DRAFT") return "warning";
  return "neutral";
}

export function applicationStatusTone(
  status: ApplicationStatus,
): "neutral" | "success" | "warning" | "danger" | "purple" | "info" | "orange" {
  switch (status) {
    case "NEW":
      return "purple";
    case "REVIEWING":
      return "warning";
    case "SHORTLISTED":
      return "info";
    case "INTERVIEW":
      return "orange";
    case "ACCEPTED":
      return "success";
    case "REJECTED":
      return "danger";
    case "WITHDRAWN":
      return "neutral";
    default:
      return "neutral";
  }
}

export function formatAdminDate(value?: Date | string | null) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("el-GR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
