"use client";

import { StatusBanner } from "@/components/admin/StatusBanner";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import {
  FieldLabel,
  FormSection,
  TextInput,
  TextSelect,
  TextTextarea,
} from "@/components/admin/FormField";
import { JOB_CATEGORIES, JOB_EMPLOYMENT_TYPES } from "@/content/jobs";
import { slugify } from "@/lib/html";
import { toDatetimeLocal, type ActionResult } from "@/server/actions/helpers";
import { createJobAction, updateJobAction } from "@/server/actions/careers";
import type { Job } from "@prisma/client";
import Link from "next/link";
import { useActionState, useState } from "react";

type Props = {
  item?: Job;
};

export function JobForm({ item }: Props) {
  const action = item ? updateJobAction.bind(null, item.id) : createJobAction;
  const [state, formAction] = useActionState(action, null as ActionResult | null);
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(item?.slug));

  const banner =
    state == null
      ? null
      : state.success
        ? { type: "success" as const, message: "Saved successfully." }
        : state.error
          ? {
              type: "error" as const,
              message: state.fieldErrors
                ? `${state.error} — ${Object.entries(state.fieldErrors)
                    .map(([k, v]) => `${k}: ${v.join(", ")}`)
                    .join(" · ")}`
                : state.error,
            }
          : null;

  return (
    <form action={formAction} className="space-y-5">
      {banner ? <StatusBanner type={banner.type} message={banner.message} /> : null}

      <FormSection title="Βασικά στοιχεία" description="Τίτλος, κατηγορία και κατάσταση δημοσίευσης.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="title">Τίτλος Θέσης *</FieldLabel>
            <TextInput
              id="title"
              name="title"
              required
              defaultValue={item?.title}
              onChange={(e) => {
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="slug" hint="URL path">
              Slug
            </FieldLabel>
            <TextInput
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="category">Κατηγορία *</FieldLabel>
            <TextSelect id="category" name="category" defaultValue={item?.category ?? "Engineering"} required>
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              {item?.category && !(JOB_CATEGORIES as readonly string[]).includes(item.category) ? (
                <option value={item.category}>{item.category}</option>
              ) : null}
            </TextSelect>
          </div>
          <div>
            <FieldLabel htmlFor="location">Τοποθεσία</FieldLabel>
            <TextInput id="location" name="location" defaultValue={item?.location ?? "Remote"} />
          </div>
          <div>
            <FieldLabel htmlFor="employmentType">Τύπος Εργασίας</FieldLabel>
            <TextSelect
              id="employmentType"
              name="employmentType"
              defaultValue={item?.employmentType ?? "Full-time"}
            >
              {JOB_EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </TextSelect>
          </div>
          <div>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <TextSelect id="status" name="status" defaultValue={item?.status ?? "DRAFT"}>
              <option value="DRAFT">DRAFT</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="CLOSED">CLOSED</option>
            </TextSelect>
          </div>
          <div>
            <FieldLabel htmlFor="publishedAt">Publish Date</FieldLabel>
            <TextInput
              id="publishedAt"
              name="publishedAt"
              type="datetime-local"
              defaultValue={toDatetimeLocal(item?.publishedAt)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="expiresAt">Expiration Date</FieldLabel>
            <TextInput
              id="expiresAt"
              name="expiresAt"
              type="datetime-local"
              defaultValue={toDatetimeLocal(item?.expiresAt)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="salary">Μισθολογικό εύρος</FieldLabel>
            <TextInput id="salary" name="salary" defaultValue={item?.salary ?? ""} placeholder="π.χ. Κατόπιν συνέντευξης" />
          </div>
          <div>
            <FieldLabel htmlFor="experience">Εμπειρία</FieldLabel>
            <TextInput
              id="experience"
              name="experience"
              defaultValue={item?.experience ?? ""}
              placeholder="π.χ. 2+ χρόνια"
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="coverImage">Cover / Visual URL</FieldLabel>
            <TextInput
              id="coverImage"
              name="coverImage"
              defaultValue={item?.coverImage ?? ""}
              placeholder="https://..."
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="shortDescription">Σύντομη περιγραφή (λίστα θέσεων) *</FieldLabel>
            <TextTextarea
              id="shortDescription"
              name="shortDescription"
              required
              defaultValue={item?.shortDescription}
              className="min-h-[80px]"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Περιεχόμενο" description="Χρησιμοποίησε τον editor — χωρίς HTML.">
        <RichTextEditor
          name="description"
          label="Περιγραφή"
          required
          defaultValue={item?.description}
        />
        <RichTextEditor name="role" label="Ο ρόλος" defaultValue={item?.role} />
        <RichTextEditor
          name="responsibilities"
          label="Αρμοδιότητες"
          required
          defaultValue={item?.responsibilities}
        />
        <RichTextEditor
          name="requirements"
          label="Απαιτήσεις"
          required
          defaultValue={item?.requirements}
        />
        <RichTextEditor
          name="benefits"
          label="Τι προσφέρουμε"
          required
          defaultValue={item?.benefits}
        />
        <RichTextEditor name="whyNexus" label="Γιατί NEXUS" defaultValue={item?.whyNexus} />
      </FormSection>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {item ? (
          <Link
            href={`/admin/careers/${item.id}/preview`}
            className="rounded-2xl border border-border-soft bg-white px-4 py-2.5 text-sm font-semibold text-purple-deep transition hover:bg-lavender-light"
          >
            Προεπισκόπηση
          </Link>
        ) : null}
        <button
          type="submit"
          name="intent"
          value="draft"
          className="rounded-2xl border border-border-soft bg-white px-4 py-2.5 text-sm font-semibold text-purple-deep transition hover:bg-lavender-light"
        >
          Save as Draft
        </button>
        {!item || item.status !== "ACTIVE" ? (
          <button
            type="submit"
            name="intent"
            value="publish"
            className="rounded-2xl bg-purple-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-bright"
          >
            Publish
          </button>
        ) : null}
        <SubmitButton>{item ? "Save Changes" : "Δημιουργία"}</SubmitButton>
      </div>
    </form>
  );
}
