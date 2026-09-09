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
import { createPopupAction, updatePopupAction } from "@/server/actions/popups";
import type { Popup } from "@prisma/client";

export function PopupForm({ item }: { item?: Popup }) {
  const action = item ? updatePopupAction.bind(null, item.id) : createPopupAction;

  return (
    <AdminForm action={action} submitLabel={item ? "Update popup" : "Create popup"}>
      <FormSection title="Popup">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <TextInput id="title" name="title" required defaultValue={item?.title} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <TextTextarea id="content" name="content" required defaultValue={item?.content} />
          </div>
          <div>
            <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
            <TextInput id="imageUrl" name="imageUrl" defaultValue={item?.imageUrl ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="triggerDelayMs">Trigger delay (ms)</FieldLabel>
            <TextInput
              id="triggerDelayMs"
              name="triggerDelayMs"
              type="number"
              min={0}
              defaultValue={item?.triggerDelayMs ?? 3000}
            />
          </div>
          <div>
            <FieldLabel htmlFor="ctaText">CTA text</FieldLabel>
            <TextInput id="ctaText" name="ctaText" defaultValue={item?.ctaText ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="ctaUrl">CTA URL</FieldLabel>
            <TextInput id="ctaUrl" name="ctaUrl" defaultValue={item?.ctaUrl ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="displayFrequency">Frequency</FieldLabel>
            <TextSelect
              id="displayFrequency"
              name="displayFrequency"
              defaultValue={item?.displayFrequency ?? "ONCE_PER_SESSION"}
            >
              <option value="ALWAYS">Always</option>
              <option value="ONCE_PER_SESSION">Once per session</option>
              <option value="ONCE_PER_DAY">Once per day</option>
              <option value="ONCE_EVER">Once ever</option>
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
