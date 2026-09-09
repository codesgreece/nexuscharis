"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AdminForm } from "@/components/admin/AdminForm";
import {
  FieldLabel,
  FormSection,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormField";
import { jsonPretty } from "@/server/actions/helpers";
import { LEGAL_ROUTE_BY_KEY } from "@/content/legal/meta";
import { updateLegalBusinessAction, updateLegalPageAction } from "@/server/actions/legal";
import type { LegalBusinessInfo, LegalPage, LegalPageKey } from "@prisma/client";

const TABS: Array<{ key: LegalPageKey | "BUSINESS"; label: string }> = [
  { key: "PRIVACY", label: "Privacy" },
  { key: "COOKIES", label: "Cookies" },
  { key: "TERMS", label: "Terms" },
  { key: "SERVICES_TERMS", label: "Services Terms" },
  { key: "COPYRIGHT", label: "Copyright" },
  { key: "BUSINESS", label: "Business info" },
];

export function LegalAdminPanel({
  pages,
  business,
}: {
  pages: LegalPage[];
  business: LegalBusinessInfo | null;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("PRIVACY");
  const byKey = useMemo(() => {
    const map = new Map<LegalPageKey, LegalPage>();
    for (const page of pages) map.set(page.pageKey, page);
    return map;
  }, [pages]);

  const activePage = tab === "BUSINESS" ? null : byKey.get(tab);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Legal sections">
        {TABS.map((item) => {
          const active = item.key === tab;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(item.key)}
              className={`rounded-2xl px-3 py-2 text-sm font-semibold transition focus-ring ${
                active
                  ? "bg-purple-primary text-white"
                  : "border border-border-soft bg-white text-purple-deep hover:bg-lavender-soft"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === "BUSINESS" ? (
        <AdminForm action={updateLegalBusinessAction} submitLabel="Save business info">
          <FormSection
            title="Legal business configuration"
            description="Use clear placeholders — do not invent AFM, ΓΕΜΗ, address, or DPO details."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FieldLabel htmlFor="businessName">LEGAL_BUSINESS_NAME</FieldLabel>
                <TextInput
                  id="businessName"
                  name="businessName"
                  required
                  defaultValue={business?.businessName || "NEXUS DEV STUDIO GREECE"}
                />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel htmlFor="address">LEGAL_ADDRESS</FieldLabel>
                <TextInput
                  id="address"
                  name="address"
                  placeholder="[ΠΡΟΣΘΕΣΤΕ ΔΙΕΥΘΥΝΣΗ]"
                  defaultValue={business?.address ?? ""}
                />
              </div>
              <div>
                <FieldLabel htmlFor="email">LEGAL_EMAIL</FieldLabel>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={business?.email || "nexusdevstudio@outlook.com"}
                />
              </div>
              <div>
                <FieldLabel htmlFor="phone">LEGAL_PHONE</FieldLabel>
                <TextInput
                  id="phone"
                  name="phone"
                  required
                  defaultValue={business?.phone || "6936732844"}
                />
              </div>
              <div>
                <FieldLabel htmlFor="vatNumber">LEGAL_VAT_NUMBER</FieldLabel>
                <TextInput
                  id="vatNumber"
                  name="vatNumber"
                  placeholder="[ΠΡΟΣΘΕΣΤΕ ΑΦΜ]"
                  defaultValue={business?.vatNumber ?? ""}
                />
              </div>
              <div>
                <FieldLabel htmlFor="taxOffice">LEGAL_TAX_OFFICE</FieldLabel>
                <TextInput
                  id="taxOffice"
                  name="taxOffice"
                  placeholder="[ΠΡΟΣΘΕΣΤΕ ΔΟΥ]"
                  defaultValue={business?.taxOffice ?? ""}
                />
              </div>
              <div>
                <FieldLabel htmlFor="registryNumber">LEGAL_REGISTRY_NUMBER</FieldLabel>
                <TextInput
                  id="registryNumber"
                  name="registryNumber"
                  placeholder="[ΠΡΟΣΘΕΣΤΕ ΓΕΜΗ / ΜΗΤΡΩΟ]"
                  defaultValue={business?.registryNumber ?? ""}
                />
              </div>
              <div>
                <FieldLabel htmlFor="country">LEGAL_COUNTRY</FieldLabel>
                <TextInput id="country" name="country" required defaultValue={business?.country || "Ελλάδα"} />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel htmlFor="dpoEmail">DPO email (optional)</FieldLabel>
                <TextInput
                  id="dpoEmail"
                  name="dpoEmail"
                  type="email"
                  placeholder="[ΠΡΟΣΘΕΣΤΕ DPO EMAIL, ΑΝ ΥΠΑΡΧΕΙ]"
                  defaultValue={business?.dpoEmail ?? ""}
                />
              </div>
            </div>
          </FormSection>
        </AdminForm>
      ) : activePage ? (
        <LegalPageEditor key={activePage.id} page={activePage} />
      ) : (
        <p className="rounded-2xl border border-border-soft bg-white p-4 text-sm text-muted">
          Δεν βρέθηκε περιεχόμενο για αυτή την καρτέλα. Αποθηκεύστε για να δημιουργηθεί.
        </p>
      )}
    </div>
  );
}

function LegalPageEditor({ page }: { page: LegalPage }) {
  const action = updateLegalPageAction.bind(null, page.pageKey);
  const previewHref = LEGAL_ROUTE_BY_KEY[page.pageKey];
  const [preview, setPreview] = useState(false);

  let previewSections: Array<{ heading: string; paragraphs: string[] }> = [];
  try {
    const parsed = JSON.parse(jsonPretty(page.sections));
    if (Array.isArray(parsed)) previewSections = parsed;
  } catch {
    previewSections = [];
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={previewHref}
          target="_blank"
          className="rounded-2xl border border-border-soft bg-white px-3 py-2 text-sm font-semibold text-purple-deep hover:bg-lavender-soft focus-ring"
        >
          Preview live page
        </Link>
        <button
          type="button"
          onClick={() => setPreview((v) => !v)}
          className="rounded-2xl border border-border-soft bg-white px-3 py-2 text-sm font-semibold text-purple-deep hover:bg-lavender-soft focus-ring"
        >
          {preview ? "Hide draft preview" : "Preview sections"}
        </button>
        <span className="text-xs text-muted">
          Last updated: {new Date(page.lastUpdated).toLocaleString("el-GR")} · Version {page.version} ·{" "}
          {page.published ? "Published" : "Unpublished"}
        </span>
      </div>

      {preview ? (
        <div className="space-y-4 rounded-2xl border border-border-soft bg-lavender-light p-5">
          <h3 className="text-lg font-bold text-purple-deep">{page.title}</h3>
          {previewSections.map((section) => (
            <div key={section.heading}>
              <h4 className="font-semibold text-[#171717]">{section.heading}</h4>
              <div className="mt-2 space-y-2 text-sm text-muted">
                {(section.paragraphs || []).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <AdminForm action={action} submitLabel="Save & publish state">
        <FormSection title={`${page.pageKey} content`} description="Edit JSON sections carefully. Save updates lastUpdated automatically.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FieldLabel htmlFor={`title-${page.pageKey}`}>Title</FieldLabel>
              <TextInput id={`title-${page.pageKey}`} name="title" required defaultValue={page.title} />
            </div>
            <div>
              <FieldLabel htmlFor={`version-${page.pageKey}`}>Version</FieldLabel>
              <TextInput id={`version-${page.pageKey}`} name="version" required defaultValue={page.version} />
            </div>
            <div className="flex items-end pb-2">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-purple-deep">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={page.published}
                  className="h-4 w-4 rounded border-border-soft text-purple-primary"
                />
                Published
              </label>
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor={`sections-${page.pageKey}`}>Sections JSON</FieldLabel>
              <TextTextarea
                id={`sections-${page.pageKey}`}
                name="sectionsJson"
                rows={18}
                required
                defaultValue={jsonPretty(page.sections)}
                className="font-mono text-xs"
              />
            </div>
          </div>
        </FormSection>
      </AdminForm>
    </div>
  );
}
