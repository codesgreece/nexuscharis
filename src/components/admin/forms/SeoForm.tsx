"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import {
  FieldLabel,
  FormSection,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormField";
import { updateSeoAction } from "@/server/actions/seo";
import type { SEOSettings } from "@prisma/client";

export function SeoForm({ item }: { item: SEOSettings }) {
  const action = updateSeoAction.bind(null, item.pageKey);

  return (
    <AdminForm action={action} submitLabel={`Save ${item.pageKey} SEO`}>
      <FormSection title={`SEO · ${item.pageKey}`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor={`title-${item.pageKey}`}>Title</FieldLabel>
            <TextInput id={`title-${item.pageKey}`} name="title" required defaultValue={item.title} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor={`meta-${item.pageKey}`}>Meta description</FieldLabel>
            <TextTextarea
              id={`meta-${item.pageKey}`}
              name="metaDescription"
              required
              defaultValue={item.metaDescription}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor={`keywords-${item.pageKey}`}>Keywords</FieldLabel>
            <TextInput id={`keywords-${item.pageKey}`} name="keywords" defaultValue={item.keywords ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor={`canonical-${item.pageKey}`}>Canonical URL</FieldLabel>
            <TextInput id={`canonical-${item.pageKey}`} name="canonicalUrl" defaultValue={item.canonicalUrl ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor={`robots-${item.pageKey}`}>Robots</FieldLabel>
            <TextInput id={`robots-${item.pageKey}`} name="robots" defaultValue={item.robots ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor={`ogTitle-${item.pageKey}`}>OG title</FieldLabel>
            <TextInput id={`ogTitle-${item.pageKey}`} name="ogTitle" defaultValue={item.ogTitle ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor={`ogImage-${item.pageKey}`}>OG image</FieldLabel>
            <TextInput id={`ogImage-${item.pageKey}`} name="ogImage" defaultValue={item.ogImage ?? ""} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor={`ogDesc-${item.pageKey}`}>OG description</FieldLabel>
            <TextTextarea
              id={`ogDesc-${item.pageKey}`}
              name="ogDescription"
              defaultValue={item.ogDescription ?? ""}
            />
          </div>
          <div>
            <FieldLabel htmlFor={`twitter-${item.pageKey}`}>Twitter card</FieldLabel>
            <TextInput
              id={`twitter-${item.pageKey}`}
              name="twitterCard"
              defaultValue={item.twitterCard ?? "summary_large_image"}
            />
          </div>
        </div>
      </FormSection>
    </AdminForm>
  );
}
