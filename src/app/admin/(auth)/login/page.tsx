"use client";

import { useActionState } from "react";
import { loginAction } from "@/server/actions/auth";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import type { ActionResult } from "@/server/actions/helpers";

const initial: ActionResult | null = null;

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[1.75rem] border border-border-soft bg-white p-8 shadow-[0_30px_80px_-40px_rgba(76,29,149,0.45)]">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Logo href="/admin/login" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#171717]">Admin Panel</h1>
          <p className="mt-2 text-sm text-muted">Σύνδεση μόνο για εξουσιοδοτημένους διαχειριστές</p>
        </div>

        <form action={action} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="h-11 w-full rounded-xl border border-border-soft bg-lavender-light/50 px-3 text-sm outline-none focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Κωδικός</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-11 w-full rounded-xl border border-border-soft bg-lavender-light/50 px-3 text-sm outline-none focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20"
            />
          </label>

          {state && !state.success && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {state.error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Σύνδεση..." : "Είσοδος"}
          </Button>
        </form>
      </div>
    </div>
  );
}
