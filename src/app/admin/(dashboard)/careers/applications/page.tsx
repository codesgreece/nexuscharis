import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { AdminCard, PageHeader } from "@/components/admin/DataTable";
import { listAdminApplications } from "@/server/services/careers";
import type { ApplicationStatus } from "@prisma/client";
import Link from "next/link";

type SearchParams = Promise<{ q?: string; status?: string }>;

const STATUSES: Array<"ALL" | ApplicationStatus> = [
  "ALL",
  "NEW",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
];

export default async function AllApplicationsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const statusParam = (query.status || "ALL").toUpperCase();
  const status = (STATUSES as string[]).includes(statusParam)
    ? (statusParam as "ALL" | ApplicationStatus)
    : "ALL";
  const q = query.q?.trim() || "";

  const applications = await listAdminApplications({ q, status });

  return (
    <div>
      <PageHeader
        title="Applications"
        description="Όλες οι αιτήσεις υποψηφίων από το Careers form."
        action={
          <Link
            href="/admin/careers"
            className="rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep hover:bg-lavender-light"
          >
            Back to Careers
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
          <button
            type="submit"
            className="rounded-xl bg-purple-deep px-3 py-2 text-xs font-semibold text-white"
          >
            Search
          </button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUSES.map((value) => {
            const active = status === value;
            const href =
              value === "ALL"
                ? `/admin/careers/applications${q ? `?q=${encodeURIComponent(q)}` : ""}`
                : `/admin/careers/applications?status=${value}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
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

      <ApplicationsTable applications={applications} showJob />
    </div>
  );
}
