"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import {
  CheckboxField,
  FieldLabel,
  FormSection,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormField";
import { toDatetimeLocal } from "@/server/actions/helpers";
import { createOfferAction, updateOfferAction } from "@/server/actions/offers";
import type { Offer } from "@prisma/client";

export function OfferForm({ item }: { item?: Offer }) {
  const action = item ? updateOfferAction.bind(null, item.id) : createOfferAction;

  return (
    <AdminForm action={action} submitLabel={item ? "Update offer" : "Create offer"}>
      <FormSection title="Offer">
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
            <FieldLabel htmlFor="discount">Discount</FieldLabel>
            <TextInput id="discount" name="discount" defaultValue={item?.discount ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="price">Price</FieldLabel>
            <TextInput id="price" name="price" defaultValue={item?.price ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="oldPrice">Old price</FieldLabel>
            <TextInput id="oldPrice" name="oldPrice" defaultValue={item?.oldPrice ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="ctaText">CTA text</FieldLabel>
            <TextInput id="ctaText" name="ctaText" defaultValue={item?.ctaText ?? "Μάθε περισσότερα"} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="ctaUrl">CTA URL</FieldLabel>
            <TextInput id="ctaUrl" name="ctaUrl" defaultValue={item?.ctaUrl ?? "#contact"} />
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
