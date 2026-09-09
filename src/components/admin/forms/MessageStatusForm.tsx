"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { FieldLabel, FormSection, TextSelect } from "@/components/admin/FormField";
import { updateMessageStatusAction } from "@/server/actions/messages";
import type { ContactMessage } from "@prisma/client";

export function MessageStatusForm({ item }: { item: ContactMessage }) {
  const action = updateMessageStatusAction.bind(null, item.id);
  return (
    <AdminForm action={action} submitLabel="Update status">
      <FormSection title="Status">
        <div>
          <FieldLabel htmlFor="status">Message status</FieldLabel>
          <TextSelect id="status" name="status" defaultValue={item.status}>
            <option value="NEW">NEW</option>
            <option value="READ">READ</option>
            <option value="REPLIED">REPLIED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </TextSelect>
        </div>
      </FormSection>
    </AdminForm>
  );
}
