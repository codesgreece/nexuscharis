"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import {
  CheckboxField,
  FieldLabel,
  FormSection,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormField";
import {
  createServiceAction,
  updateServiceAction,
} from "@/server/actions/services";
import type { Service } from "@prisma/client";

export function ServiceForm({ item }: { item?: Service }) {
  const action = item ? updateServiceAction.bind(null, item.id) : createServiceAction;

  return (
    <AdminForm action={action} submitLabel={item ? "Update service" : "Create service"}>
      <FormSection title="Service">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <TextInput id="title" name="title" required defaultValue={item?.title} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <TextTextarea id="description" name="description" required defaultValue={item?.description} />
          </div>
          <div>
            <FieldLabel htmlFor="icon">Icon key</FieldLabel>
            <TextInput id="icon" name="icon" defaultValue={item?.icon ?? "globe"} />
          </div>
          <div>
            <FieldLabel htmlFor="order">Order</FieldLabel>
            <TextInput id="order" name="order" type="number" min={0} defaultValue={item?.order ?? 0} />
          </div>
          <CheckboxField id="active" name="active" label="Active" defaultChecked={item?.active ?? true} />
        </div>
      </FormSection>
    </AdminForm>
  );
}
