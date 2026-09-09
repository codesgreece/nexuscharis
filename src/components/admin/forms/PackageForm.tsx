"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import {
  CheckboxField,
  FieldLabel,
  FormSection,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormField";
import { featuresToText } from "@/server/actions/helpers";
import {
  createPackageAction,
  updatePackageAction,
} from "@/server/actions/packages";
import type { Package } from "@prisma/client";

export function PackageForm({ item }: { item?: Package }) {
  const action = item
    ? updatePackageAction.bind(null, item.id)
    : createPackageAction;

  return (
    <AdminForm action={action} submitLabel={item ? "Update package" : "Create package"}>
      <div className="grid gap-5">
        <FormSection title="Package details" description="Prices and features shown on the public site.">
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
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <TextInput id="price" name="price" required defaultValue={item?.price} placeholder="από €XXX" />
            </div>
            <div>
              <FieldLabel htmlFor="oldPrice">Old price</FieldLabel>
              <TextInput id="oldPrice" name="oldPrice" defaultValue={item?.oldPrice ?? ""} />
            </div>
            <div>
              <FieldLabel htmlFor="discount">Discount label</FieldLabel>
              <TextInput id="discount" name="discount" defaultValue={item?.discount ?? ""} />
            </div>
            <div>
              <FieldLabel htmlFor="order">Order</FieldLabel>
              <TextInput id="order" name="order" type="number" min={0} defaultValue={item?.order ?? 0} />
            </div>
            <div>
              <FieldLabel htmlFor="ctaText">CTA text</FieldLabel>
              <TextInput id="ctaText" name="ctaText" defaultValue={item?.ctaText ?? "Ζήτησε Προσφορά"} />
            </div>
            <div>
              <FieldLabel htmlFor="ctaUrl">CTA URL</FieldLabel>
              <TextInput id="ctaUrl" name="ctaUrl" defaultValue={item?.ctaUrl ?? "#contact"} />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="features" hint="One feature per line">
                Features
              </FieldLabel>
              <TextTextarea
                id="features"
                name="features"
                required
                defaultValue={featuresToText(item?.features)}
                className="min-h-[160px]"
              />
            </div>
            <div className="flex flex-wrap gap-5 sm:col-span-2">
              <CheckboxField id="highlighted" name="highlighted" label="Highlighted" defaultChecked={item?.highlighted} />
              <CheckboxField id="active" name="active" label="Active" defaultChecked={item?.active ?? true} />
            </div>
          </div>
        </FormSection>
      </div>
    </AdminForm>
  );
}
