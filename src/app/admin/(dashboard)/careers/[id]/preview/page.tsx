import { PageHeader } from "@/components/admin/DataTable";
import { JobDetailView } from "@/components/careers/JobDetailView";
import { getAdminJobById, toPublicJob } from "@/server/services/careers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function JobPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getAdminJobById(id);
  if (!job) notFound();

  const publicJob = toPublicJob(job);

  return (
    <div>
      <PageHeader
        title="Προεπισκόπηση"
        description={`Πώς θα φαίνεται η θέση «${job.title}» στο public Careers design. Status: ${job.status}`}
        action={
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/careers/${job.id}`}
              className="rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep hover:bg-lavender-light"
            >
              Επιστροφή στο Edit
            </Link>
            {job.status === "ACTIVE" ? (
              <Link
                href={`/careers/${job.slug}`}
                target="_blank"
                className="rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep hover:bg-lavender-light"
              >
                Άνοιγμα public
              </Link>
            ) : null}
          </div>
        }
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-border-soft bg-warm-ivory shadow-sm">
        <JobDetailView job={publicJob} preview />
      </div>
    </div>
  );
}
