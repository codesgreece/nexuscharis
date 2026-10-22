import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, EditLink, RowActions } from "@/components/admin/DataTable";
import { applicationStatusTone, formatAdminDate } from "@/lib/careers-ui";
import type { ApplicationStatus } from "@prisma/client";

type Row = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: ApplicationStatus;
  cvFileName: string;
  createdAt: Date;
  job?: { id: string; title: string; slug: string } | null;
};

export function ApplicationsTable({
  applications,
  showJob = false,
}: {
  applications: Row[];
  showJob?: boolean;
}) {
  if (applications.length === 0) {
    return (
      <EmptyState
        title="Δεν υπάρχουν αιτήσεις"
        description="Οι νέες αιτήσεις από το public Careers form θα εμφανίζονται εδώ."
      />
    );
  }

  const headers = showJob
    ? ["Candidate", "Position", "Applied", "Status", "CV", ""]
    : ["Candidate", "Email", "Phone", "Applied", "Status", "CV", ""];

  return (
    <DataTable headers={headers}>
      {applications.map((item) => (
        <tr key={item.id} className="hover:bg-lavender-light/40">
          <td className="px-4 py-3">
            <p className="font-medium text-purple-deep">{item.fullName}</p>
            {!showJob ? null : <p className="text-xs text-muted">{item.email}</p>}
          </td>
          {showJob ? (
            <td className="px-4 py-3 text-muted">{item.job?.title || "—"}</td>
          ) : (
            <>
              <td className="px-4 py-3 text-muted">{item.email}</td>
              <td className="px-4 py-3 text-muted">{item.phone}</td>
            </>
          )}
          <td className="px-4 py-3 text-muted">{formatAdminDate(item.createdAt)}</td>
          <td className="px-4 py-3">
            <Badge tone={applicationStatusTone(item.status)}>{item.status}</Badge>
          </td>
          <td className="px-4 py-3 text-muted">{item.cvFileName}</td>
          <td className="px-4 py-3">
            <RowActions>
              <EditLink href={`/admin/careers/applications/${item.id}`} />
            </RowActions>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
