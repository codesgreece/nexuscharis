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
  createProcessStepAction,
  updateProcessStepAction,
} from "@/server/actions/process";
import type { ProcessStep } from "@prisma/client";

export function ProcessForm({ item }: { item?: ProcessStep }) {
  const action = item
    ? updateProcessStepAction.bind(null, item.id)
    : createProcessStepAction;

  return (
    <AdminForm action={action} submitLabel={item ? "Update step" : "Create step"}>
      <FormSection title="Process step">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="number">Number</FieldLabel>
            <TextInput id="number" name="number" required defaultValue={item?.number} placeholder="01" />
          </div>
          <div>
            <FieldLabel htmlFor="order">Order</FieldLabel>
            <TextInput id="order" name="order" type="number" min={0} defaultValue={item?.order ?? 0} />
          </div>
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
            <TextInput id="icon" name="icon" defaultValue={item?.icon ?? "message"} />
          </div>
          <CheckboxField id="active" name="active" label="Active" defaultChecked={item?.active ?? true} />
        </div>
      </FormSection>
    </AdminForm>
  );
}
