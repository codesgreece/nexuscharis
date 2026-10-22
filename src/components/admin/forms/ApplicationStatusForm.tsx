"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { FieldLabel, FormSection, TextSelect } from "@/components/admin/FormField";
import { updateApplicationStatusAction } from "@/server/actions/careers";
import type { ApplicationStatus, JobApplication } from "@prisma/client";

const STATUSES: ApplicationStatus[] = [
  "NEW",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
];

export function ApplicationStatusForm({
  item,
}: {
  item: Pick<JobApplication, "id" | "status">;
}) {
  const action = updateApplicationStatusAction.bind(null, item.id);

  return (
    <AdminForm action={action} submitLabel="Change Status">
      <FormSection title="Actions" description="Ενημέρωσε την κατάσταση της αίτησης.">
        <div>
          <FieldLabel htmlFor="status">Status</FieldLabel>
          <TextSelect id="status" name="status" defaultValue={item.status}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </TextSelect>
        </div>
      </FormSection>
    </AdminForm>
  );
}
