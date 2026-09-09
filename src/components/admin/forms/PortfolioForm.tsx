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
  createPortfolioAction,
  updatePortfolioAction,
} from "@/server/actions/portfolio";
import type { PortfolioProject } from "@prisma/client";

export function PortfolioForm({ item }: { item?: PortfolioProject }) {
  const action = item
    ? updatePortfolioAction.bind(null, item.id)
    : createPortfolioAction;

  return (
    <AdminForm action={action} submitLabel={item ? "Update project" : "Create project"}>
      <FormSection
        title="Portfolio project"
        description="Only add real client work. Leave unpublished until ready."
      >
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
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <TextInput id="category" name="category" required defaultValue={item?.category} placeholder="Website" />
          </div>
          <div>
            <FieldLabel htmlFor="order">Order</FieldLabel>
            <TextInput id="order" name="order" type="number" min={0} defaultValue={item?.order ?? 0} />
          </div>
          <div>
            <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
            <TextInput id="imageUrl" name="imageUrl" defaultValue={item?.imageUrl ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="logoUrl">Logo URL</FieldLabel>
            <TextInput id="logoUrl" name="logoUrl" defaultValue={item?.logoUrl ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="liveUrl">Live URL</FieldLabel>
            <TextInput id="liveUrl" name="liveUrl" type="url" defaultValue={item?.liveUrl ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="caseStudyUrl">Case study URL</FieldLabel>
            <TextInput id="caseStudyUrl" name="caseStudyUrl" type="url" defaultValue={item?.caseStudyUrl ?? ""} />
          </div>
          <div className="flex flex-wrap gap-5 sm:col-span-2">
            <CheckboxField id="featured" name="featured" label="Featured" defaultChecked={item?.featured} />
            <CheckboxField id="published" name="published" label="Published" defaultChecked={item?.published} />
          </div>
        </div>
      </FormSection>
    </AdminForm>
  );
}
