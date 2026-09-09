"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import {
  FieldLabel,
  FormSection,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormField";
import { jsonPretty } from "@/server/actions/helpers";
import { updateSettingsAction } from "@/server/actions/settings";
import type { SiteSettings } from "@prisma/client";

export function SettingsForm({ item }: { item?: SiteSettings | null }) {
  return (
    <AdminForm action={updateSettingsAction}>
      <div className="grid gap-5">
        <FormSection title="Brand & contact" description="Shown in header, footer, and contact sections.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="siteName">Site name</FieldLabel>
              <TextInput id="siteName" name="siteName" required defaultValue={item?.siteName} />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="tagline">Tagline</FieldLabel>
              <TextInput id="tagline" name="tagline" required defaultValue={item?.tagline} />
            </div>
            <div>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <TextInput id="phone" name="phone" required defaultValue={item?.phone} />
            </div>
            <div>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <TextInput id="email" name="email" type="email" required defaultValue={item?.email} />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <TextInput id="address" name="address" defaultValue={item?.address ?? ""} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Social links">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="facebookUrl">Facebook</FieldLabel>
              <TextInput id="facebookUrl" name="facebookUrl" defaultValue={item?.facebookUrl ?? ""} />
            </div>
            <div>
              <FieldLabel htmlFor="instagramUrl">Instagram</FieldLabel>
              <TextInput id="instagramUrl" name="instagramUrl" defaultValue={item?.instagramUrl ?? ""} />
            </div>
            <div>
              <FieldLabel htmlFor="linkedinUrl">LinkedIn</FieldLabel>
              <TextInput id="linkedinUrl" name="linkedinUrl" defaultValue={item?.linkedinUrl ?? ""} />
            </div>
            <div>
              <FieldLabel htmlFor="dribbbleUrl">Dribbble</FieldLabel>
              <TextInput id="dribbbleUrl" name="dribbbleUrl" defaultValue={item?.dribbbleUrl ?? ""} />
            </div>
            <div>
              <FieldLabel htmlFor="twitterUrl">Twitter / X</FieldLabel>
              <TextInput id="twitterUrl" name="twitterUrl" defaultValue={item?.twitterUrl ?? ""} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Founder & assets">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="founderName">Founder name</FieldLabel>
              <TextInput id="founderName" name="founderName" required defaultValue={item?.founderName} />
            </div>
            <div>
              <FieldLabel htmlFor="founderTitle">Founder title</FieldLabel>
              <TextInput id="founderTitle" name="founderTitle" required defaultValue={item?.founderTitle} />
            </div>
            <div>
              <FieldLabel htmlFor="logoUrl">Logo URL</FieldLabel>
              <TextInput id="logoUrl" name="logoUrl" required defaultValue={item?.logoUrl} />
            </div>
            <div>
              <FieldLabel htmlFor="founderImageUrl">Founder image URL</FieldLabel>
              <TextInput id="founderImageUrl" name="founderImageUrl" required defaultValue={item?.founderImageUrl} />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="businessHours" hint='JSON: [{"day":"Δευτέρα","hours":"10:00 - 15:00"}]'>
                Business hours (JSON)
              </FieldLabel>
              <TextTextarea
                id="businessHours"
                name="businessHours"
                required
                className="min-h-[220px] font-mono text-xs"
                defaultValue={jsonPretty(item?.businessHours)}
              />
            </div>
          </div>
        </FormSection>
      </div>
    </AdminForm>
  );
}
