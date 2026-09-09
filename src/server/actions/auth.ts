"use server";

import {
  authenticateAdmin,
  createSession,
  destroySession,
  getSession,
  requireAdmin,
} from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";
import { loginSchema } from "@/lib/validations";
import { AuditAction } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { fail, formString, parseWithSchema, type ActionResult } from "./helpers";

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || undefined;
}

export async function loginAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = parseWithSchema(loginSchema, {
    email: formString(formData, "email"),
    password: formString(formData, "password"),
  });
  if (!parsed.success || !parsed.data) {
    return fail(parsed.error || "Invalid credentials", parsed.fieldErrors);
  }

  const ip = await clientIp();
  const user = await authenticateAdmin(parsed.data.email, parsed.data.password, ip);
  if (!user) {
    return fail("Invalid email or password");
  }

  await createSession({
    sub: user.id,
    email: user.email,
    name: user.name,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const session = await getSession();
  if (session) {
    await writeAuditLog({
      adminId: session.sub,
      action: AuditAction.LOGOUT,
      entity: "AdminUser",
      entityId: session.sub,
      ip: await clientIp(),
    });
  }
  await destroySession();
  redirect("/admin/login");
}

export async function ensureAdmin() {
  return requireAdmin();
}
