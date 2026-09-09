"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import {
  CheckboxField,
  FieldLabel,
  FormSection,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormField";
import { jsonPretty } from "@/server/actions/helpers";
import {
  updateAboutAction,
  updateHeroAction,
  updateIntroAction,
  updateVisionAction,
} from "@/server/actions/content";
import type {
  AboutContent,
  HeroContent,
  IntroContent,
  VisionContent,
} from "@prisma/client";

export function HeroForm({ item }: { item?: HeroContent | null }) {
  return (
    <AdminForm action={updateHeroAction}>
      <FormSection title="Hero content">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="badge">Badge</FieldLabel>
            <TextInput id="badge" name="badge" required defaultValue={item?.badge} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <TextTextarea id="title" name="title" required defaultValue={item?.title} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="subtitle">Subtitle</FieldLabel>
            <TextTextarea id="subtitle" name="subtitle" required defaultValue={item?.subtitle} />
          </div>
          <div>
            <FieldLabel htmlFor="primaryCtaText">Primary CTA text</FieldLabel>
            <TextInput id="primaryCtaText" name="primaryCtaText" required defaultValue={item?.primaryCtaText} />
          </div>
          <div>
            <FieldLabel htmlFor="primaryCtaUrl">Primary CTA URL</FieldLabel>
            <TextInput id="primaryCtaUrl" name="primaryCtaUrl" required defaultValue={item?.primaryCtaUrl} />
          </div>
          <div>
            <FieldLabel htmlFor="secondaryCtaText">Secondary CTA text</FieldLabel>
            <TextInput id="secondaryCtaText" name="secondaryCtaText" required defaultValue={item?.secondaryCtaText} />
          </div>
          <div>
            <FieldLabel htmlFor="secondaryCtaUrl">Secondary CTA URL</FieldLabel>
            <TextInput id="secondaryCtaUrl" name="secondaryCtaUrl" required defaultValue={item?.secondaryCtaUrl} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="trustLine">Trust line</FieldLabel>
            <TextInput id="trustLine" name="trustLine" required defaultValue={item?.trustLine} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="stats" hint='JSON array: [{"value":"2018","label":"..."}]'>
              Stats (JSON)
            </FieldLabel>
            <TextTextarea
              id="stats"
              name="stats"
              required
              className="min-h-[180px] font-mono text-xs"
              defaultValue={jsonPretty(item?.stats)}
            />
          </div>
          <CheckboxField id="enabled" name="enabled" label="Enabled" defaultChecked={item?.enabled ?? true} />
        </div>
      </FormSection>
    </AdminForm>
  );
}

export function AboutForm({ item }: { item?: AboutContent | null }) {
  return (
    <AdminForm action={updateAboutAction}>
      <FormSection title="About content">
        <div className="grid gap-4">
          <div>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <TextInput id="title" name="title" required defaultValue={item?.title} />
          </div>
          <div>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <TextTextarea
              id="description"
              name="description"
              required
              className="min-h-[220px]"
              defaultValue={item?.description}
            />
          </div>
          <div>
            <FieldLabel htmlFor="timeline" hint="JSON array of {year,title,description}">
              Timeline (JSON)
            </FieldLabel>
            <TextTextarea
              id="timeline"
              name="timeline"
              required
              className="min-h-[220px] font-mono text-xs"
              defaultValue={jsonPretty(item?.timeline)}
            />
          </div>
          <CheckboxField id="enabled" name="enabled" label="Enabled" defaultChecked={item?.enabled ?? true} />
        </div>
      </FormSection>
    </AdminForm>
  );
}

export function VisionForm({ item }: { item?: VisionContent | null }) {
  return (
    <AdminForm action={updateVisionAction}>
      <FormSection title="Vision content">
        <div className="grid gap-4">
          <div>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <TextInput id="title" name="title" required defaultValue={item?.title} />
          </div>
          <div>
            <FieldLabel htmlFor="statement">Statement</FieldLabel>
            <TextTextarea id="statement" name="statement" required defaultValue={item?.statement} />
          </div>
          <div>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <TextTextarea
              id="description"
              name="description"
              required
              className="min-h-[200px]"
              defaultValue={item?.description}
            />
          </div>
          <div>
            <FieldLabel htmlFor="principles" hint="JSON array of {number,title,description}">
              Principles (JSON)
            </FieldLabel>
            <TextTextarea
              id="principles"
              name="principles"
              required
              className="min-h-[220px] font-mono text-xs"
              defaultValue={jsonPretty(item?.principles)}
            />
          </div>
          <CheckboxField id="enabled" name="enabled" label="Enabled" defaultChecked={item?.enabled ?? true} />
        </div>
      </FormSection>
    </AdminForm>
  );
}

export function IntroForm({ item }: { item?: IntroContent | null }) {
  return (
    <AdminForm action={updateIntroAction}>
      <FormSection title="Intro content">
        <div className="grid gap-4">
          <div>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <TextInput id="title" name="title" required defaultValue={item?.title} />
          </div>
          <div>
            <FieldLabel htmlFor="body">Body</FieldLabel>
            <TextTextarea id="body" name="body" required className="min-h-[180px]" defaultValue={item?.body} />
          </div>
          <div>
            <FieldLabel htmlFor="highlight">Highlight</FieldLabel>
            <TextInput id="highlight" name="highlight" required defaultValue={item?.highlight} />
          </div>
          <CheckboxField id="enabled" name="enabled" label="Enabled" defaultChecked={item?.enabled ?? true} />
        </div>
      </FormSection>
    </AdminForm>
  );
}
