"use client";

import { Logo } from "@/components/layout/Logo";
import { StatusBanner } from "@/components/admin/StatusBanner";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { FieldLabel, TextInput } from "@/components/admin/FormField";
import { loginAction } from "@/server/actions/auth";
import type { ActionResult } from "@/server/actions/helpers";
import { useActionState } from "react";

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(loginAction, null as ActionResult | null);

  return (
    <div className="rounded-[1.75rem] border border-border-soft bg-white/90 p-7 shadow-[0_30px_80px_-40px_rgba(76,29,149,0.45)] backdrop-blur sm:p-8">
      <div className="mb-7 flex flex-col items-center text-center">
        <Logo href="/admin/login" />
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-purple-deep">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">Sign in to manage NEXUS DEV STUDIO GREECE</p>
      </div>

      {state && !state.success && state.error ? (
        <StatusBanner type="error" message={state.error} />
      ) : null}

      <form action={formAction} className="space-y-4">
        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            placeholder="admin@nexusdevstudio.gr"
          />
        </div>
        <div>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <TextInput
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            placeholder="••••••••"
          />
        </div>
        <SubmitButton className="w-full" pendingLabel="Signing in…">
          Sign in
        </SubmitButton>
      </form>
    </div>
  );
}
