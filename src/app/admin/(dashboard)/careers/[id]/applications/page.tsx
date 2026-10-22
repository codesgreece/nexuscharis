import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { AdminCard, PageHeader } from "@/components/admin/DataTable";
import { getAdminJobById, listAdminApplications } from "@/server/services/careers";
import type { ApplicationStatus } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

type SearchParams = Promise<{ q?: string; status?: string }>;

export default async function JobApplicationsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const query = await searchParams;
  const job = await getAdminJobById(id);
  if (!job) notFound();

  const statusParam = (query.status || "ALL").toUpperCase();
  const allowed: ApplicationStatus[] = [
    "NEW",
    "REVIEWING",
    "SHORTLISTED",
    "INTERVIEW",
    "ACCEPTED",
    "REJECTED",
    "WITHDRAWN",
  ];
  const status = (allowed as string[]).includes(statusParam)
    ? (statusParam as ApplicationStatus)
    : "ALL";
  const q = query.q?.trim() || "";

  const applications = await listAdminApplications({ jobId: id, q, status });

  return (
    <div>
      <PageHeader
        title={`Applications · ${job.title}`}
        description="Αιτήσεις υποψηφίων για αυτή τη θέση."
        action={
          <Link
            href={`/admin/careers/${job.id}`}
            className="rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep hover:bg-lavender-light"
          >
            Edit job
          </Link>
        }
      />

      <AdminCard className="mb-5">
        <form className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="q" className="mb-1.5 block text-sm font-semibold text-purple-deep">
              Search candidate
            </label>
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Όνομα, email, τηλέφωνο…"
              className="w-full rounded-2xl border border-border-soft bg-white px-3.5 py-2.5 text-sm outline-none focus:border-purple-electric focus:ring-4 focus:ring-purple-primary/10"
            />
          </div>
          <input type="hidden" name="status" value={status === "ALL" ? "" : status} />
          <button
            type="submit"
            className="rounded-xl bg-purple-deep px-3 py-2 text-xs font-semibold text-white"
          >
            Search
          </button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["ALL", ...allowed] as const).map((value) => {
            const active = status === value || (value === "ALL" && status === "ALL");
            const href =
              value === "ALL"
                ? `/admin/careers/${id}/applications${q ? `?q=${encodeURIComponent(q)}` : ""}`
                : `/admin/careers/${id}/applications?status=${value}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
            return (
              <Link
                key={value}
                href={href}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                  active
                    ? "bg-purple-primary text-white"
                    : "border border-border-soft bg-white text-purple-deep hover:bg-lavender-light"
                }`}
              >
                {value === "ALL" ? "All" : value}
              </Link>
            );
          })}
        </div>
      </AdminCard>

      <ApplicationsTable applications={applications} />
    </div>
  );
}
