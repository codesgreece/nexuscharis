import { ZodError, type ZodType } from "zod";

export type ActionResult<T = undefined> = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  data?: T;
};

export function ok<T = undefined>(data?: T): ActionResult<T> {
  return { success: true, data };
}

export function fail(error: string, fieldErrors?: Record<string, string[]>): ActionResult {
  return { success: false, error, fieldErrors };
}

export function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function formOptionalString(formData: FormData, key: string): string | null {
  const value = formString(formData, key);
  return value === "" ? null : value;
}

export function formBool(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

export function formInt(formData: FormData, key: string, fallback = 0): number {
  const raw = formString(formData, key);
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}

export function formLines(formData: FormData, key: string): string[] {
  return formString(formData, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function formJson<T>(formData: FormData, key: string): T | null {
  const raw = formString(formData, key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function formDateTime(formData: FormData, key: string): string | null {
  const value = formString(formData, key);
  if (!value) return null;
  // datetime-local -> ISO
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function parseWithSchema<T>(schema: ZodType<T>, data: unknown): ActionResult<T> {
  try {
    return ok(schema.parse(data));
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of error.issues) {
        const path = issue.path.join(".") || "_root";
        fieldErrors[path] = fieldErrors[path] ?? [];
        fieldErrors[path].push(issue.message);
      }
      return { success: false, error: "Validation failed", fieldErrors };
    }
    return { success: false, error: "Validation failed" };
  }
}

export function toDatetimeLocal(value?: Date | string | null): string {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function featuresToText(features: unknown): string {
  if (Array.isArray(features)) {
    return features.map(String).join("\n");
  }
  return "";
}

export function jsonPretty(value: unknown): string {
  try {
    return JSON.stringify(value ?? [], null, 2);
  } catch {
    return "[]";
  }
}
