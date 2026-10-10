import { ApplicationStatusForm } from "@/components/admin/forms/ApplicationStatusForm";
import { AdminCard, Badge, PageHeader } from "@/components/admin/DataTable";
import { applicationStatusTone, formatAdminDate } from "@/lib/careers-ui";
import { getAdminApplicationById } from "@/server/services/careers";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getAdminApplicationById(id);
  if (!item) notFound();

  return (
    <div>
      <PageHeader
        title={item.fullName}
        description={item.email}
        action={
          <Link
            href={`/admin/careers/${item.jobId}/applications`}
            className="rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep hover:bg-lavender-light"
          >
            Back to job applications
          </Link>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-5">
          <AdminCard>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge tone={applicationStatusTone(item.status)}>{item.status}</Badge>
              <Badge tone="neutral">{item.job.title}</Badge>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">Ονοματεπώνυμο</dt>
                <dd className="mt-1 font-semibold text-purple-deep">{item.fullName}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">Email</dt>
                <dd className="mt-1 font-semibold text-purple-deep">
                  <a href={`mailto:${item.email}`} className="hover:text-purple-primary">
                    {item.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">Τηλέφωνο</dt>
                <dd className="mt-1 font-semibold text-purple-deep">
                  <a href={`tel:${item.phone}`} className="hover:text-purple-primary">
                    {item.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">Position</dt>
                <dd className="mt-1 font-semibold text-purple-deep">{item.job.title}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">Applied</dt>
                <dd className="mt-1 font-semibold text-purple-deep">
                  {format(item.createdAt, "dd/MM/yyyy HH:mm")}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">Status</dt>
                <dd className="mt-1">
                  <Badge tone={applicationStatusTone(item.status)}>{item.status}</Badge>
                </dd>
              </div>
            </dl>
          </AdminCard>

          <AdminCard>
            <h2 className="text-base font-semibold text-purple-deep">Cover Message</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-purple-deep">
              {item.coverMessage?.trim() || "—"}
            </p>
            <p className="mt-4 text-xs text-muted">Submitted {formatAdminDate(item.createdAt)}</p>
          </AdminCard>

          <AdminCard>
            <h2 className="text-base font-semibold text-purple-deep">CV</h2>
            <p className="mt-2 text-sm font-medium text-purple-deep">{item.cvFileName}</p>
            <p className="mt-1 text-xs text-muted">
              {(item.cvSize / 1024).toFixed(1)} KB · {item.cvContentType}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`/api/admin/cvs/${item.id}?disposition=inline`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep transition hover:bg-lavender-light"
              >
                Προβολή
              </a>
              <a
                href={`/api/admin/cvs/${item.id}?disposition=attachment`}
                className="rounded-xl bg-purple-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-bright"
              >
                Λήψη
              </a>
            </div>
          </AdminCard>
        </div>

        <ApplicationStatusForm item={item} />
      </div>
    </div>
  );
}
