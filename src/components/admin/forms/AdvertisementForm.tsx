"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import {
  CheckboxField,
  FieldLabel,
  FormSection,
  TextInput,
  TextSelect,
  TextTextarea,
} from "@/components/admin/FormField";
import { toDatetimeLocal } from "@/server/actions/helpers";
import {
  createAdvertisementAction,
  updateAdvertisementAction,
} from "@/server/actions/advertisements";
import type { Advertisement } from "@prisma/client";

const POSITIONS = [
  "HEADER",
  "HERO",
  "BEFORE_SERVICES",
  "BEFORE_PACKAGES",
  "BEFORE_PORTFOLIO",
  "BEFORE_CONTACT",
  "FOOTER",
  "SIDEBAR",
] as const;

export function AdvertisementForm({ item }: { item?: Advertisement }) {
  const action = item
    ? updateAdvertisementAction.bind(null, item.id)
    : createAdvertisementAction;

  return (
    <AdminForm action={action} submitLabel={item ? "Update advertisement" : "Create advertisement"}>
      <FormSection title="Advertisement">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <TextInput id="title" name="title" required defaultValue={item?.title} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <TextTextarea id="content" name="content" defaultValue={item?.content ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
            <TextInput id="imageUrl" name="imageUrl" defaultValue={item?.imageUrl ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="url">Link URL</FieldLabel>
            <TextInput id="url" name="url" defaultValue={item?.url ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="position">Position</FieldLabel>
            <TextSelect id="position" name="position" defaultValue={item?.position ?? "BEFORE_PACKAGES"}>
              {POSITIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </TextSelect>
          </div>
          <div>
            <FieldLabel htmlFor="startDate">Start</FieldLabel>
            <TextInput id="startDate" name="startDate" type="datetime-local" defaultValue={toDatetimeLocal(item?.startDate)} />
          </div>
          <div>
            <FieldLabel htmlFor="endDate">End</FieldLabel>
            <TextInput id="endDate" name="endDate" type="datetime-local" defaultValue={toDatetimeLocal(item?.endDate)} />
          </div>
          <CheckboxField id="active" name="active" label="Active" defaultChecked={item?.active} />
        </div>
      </FormSection>
    </AdminForm>
  );
}
