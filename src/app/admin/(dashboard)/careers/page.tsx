import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, PageHeader, AdminCard } from "@/components/admin/DataTable";
import { JobRowActions } from "@/components/admin/JobRowActions";
import { Button } from "@/components/ui/Button";
import { formatAdminDate, jobStatusTone } from "@/lib/careers-ui";
import { getAdminJobStats, listAdminJobs } from "@/server/services/careers";
import type { JobStatus } from "@prisma/client";
import Link from "next/link";

type SearchParams = Promise<{ q?: string; status?: string }>;

const FILTERS: Array<{ label: string; value: "ALL" | JobStatus }> = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Draft", value: "DRAFT" },
  { label: "Closed", value: "CLOSED" },
];

export default async function CareersAdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const statusParam = (params.status || "ALL").toUpperCase();
  const status =
    statusParam === "ACTIVE" || statusParam === "DRAFT" || statusParam === "CLOSED"
      ? statusParam
      : "ALL";
  const q = params.q?.trim() || "";

  const [stats, jobs] = await Promise.all([
    getAdminJobStats(),
    listAdminJobs({ q, status }),
  ]);

  return (
    <div>
      <PageHeader
        title="Careers"
        description="Διαχείριση θέσεων εργασίας και αιτήσεων υποψηφίων."
        action={
          <Link href="/admin/careers/new">
            <Button size="sm">+ Νέα Θέση</Button>
          </Link>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Active", value: stats.active },
          { label: "Draft", value: stats.draft },
          { label: "Closed", value: stats.closed },
          { label: "Applications", value: stats.applications },
          { label: "New Applications", value: stats.newApplications, href: "/admin/careers/applications?status=NEW" },
        ].map((card) => {
          const inner = (
            <AdminCard className="p-4 sm:p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{card.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-purple-deep">{card.value}</p>
            </AdminCard>
          );
          return card.href ? (
            <Link key={card.label} href={card.href} className="transition hover:-translate-y-0.5">
              {inner}
            </Link>
          ) : (
            <div key={card.label}>{inner}</div>
          );
        })}
      </div>

      <AdminCard className="mb-5">
        <form className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="q" className="mb-1.5 block text-sm font-semibold text-purple-deep">
              Search jobs
            </label>
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Τίτλος, κατηγορία, τοποθεσία…"
              className="w-full rounded-2xl border border-border-soft bg-white px-3.5 py-2.5 text-sm outline-none focus:border-purple-electric focus:ring-4 focus:ring-purple-primary/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const active = status === filter.value;
              const href =
                filter.value === "ALL"
                  ? q
                    ? `/admin/careers?q=${encodeURIComponent(q)}`
                    : "/admin/careers"
                  : `/admin/careers?status=${filter.value}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
              return (
                <Link
                  key={filter.value}
                  href={href}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-purple-primary text-white"
                      : "border border-border-soft bg-white text-purple-deep hover:bg-lavender-light"
                  }`}
                >
                  {filter.label}
                </Link>
              );
            })}
            <button
              type="submit"
              className="rounded-xl bg-purple-deep px-3 py-2 text-xs font-semibold text-white"
            >
              Search
            </button>
          </div>
        </form>
      </AdminCard>

      <h2 className="mb-3 text-lg font-bold text-purple-deep">Ανοιχτές Θέσεις</h2>

      {jobs.length === 0 ? (
        <EmptyState
          title="Δεν υπάρχουν θέσεις"
          description="Δημιούργησε την πρώτη θέση εργασίας από το admin."
          actionHref="/admin/careers/new"
          actionLabel="+ Νέα Θέση"
        />
      ) : (
        <DataTable
          headers={[
            "Title",
            "Category",
            "Location",
            "Type",
            "Status",
            "Applications",
            "Created",
            "Actions",
          ]}
        >
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-lavender-light/40">
              <td className="px-4 py-3">
                <p className="font-medium text-purple-deep">{job.title}</p>
                <p className="text-xs text-muted">/{job.slug}</p>
              </td>
              <td className="px-4 py-3 text-muted">{job.category}</td>
              <td className="px-4 py-3 text-muted">{job.location}</td>
              <td className="px-4 py-3 text-muted">{job.employmentType}</td>
              <td className="px-4 py-3">
                <Badge tone={jobStatusTone(job.status)}>{job.status}</Badge>
              </td>
              <td className="px-4 py-3 text-muted">{job._count.applications}</td>
              <td className="px-4 py-3 text-muted">{formatAdminDate(job.createdAt)}</td>
              <td className="px-4 py-3">
                <JobRowActions
                  id={job.id}
                  status={job.status}
                  applicationCount={job._count.applications}
                />
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
