import { PageHeader } from "@/components/admin/DataTable";
import { JobForm } from "@/components/admin/forms/JobForm";
import { getAdminJobById } from "@/server/services/careers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getAdminJobById(id);
  if (!job) notFound();

  return (
    <div>
      <PageHeader
        title={job.title}
        description="Επεξεργασία θέσης εργασίας."
        action={
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/careers/${job.id}/preview`}
              className="rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep hover:bg-lavender-light"
            >
              Προεπισκόπηση
            </Link>
            <Link
              href={`/admin/careers/${job.id}/applications`}
              className="rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep hover:bg-lavender-light"
            >
              Applications ({job._count.applications})
            </Link>
          </div>
        }
      />
      <JobForm item={job} />
    </div>
  );
}
