"use client";
import { useActionState } from "react";
import { adminLogin, type AdminLoginState } from "@/app/actions/admin-auth";
export function LoginForm() {
    const [state, formAction, pending] = useActionState(adminLogin, undefined as AdminLoginState);
    return (<form action={formAction} className="mt-6 space-y-4">
      {state?.error && (<p className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{state.error}</p>)}
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="username" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2" placeholder="admin@klinika.uz"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="password">
          Parol
        </label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"/>
      </div>
      <button type="submit" disabled={pending} className="w-full rounded-lg bg-brand-accent py-2.5 text-sm font-medium text-white hover:bg-brand-accent/90 disabled:opacity-60">
        {pending ? "Kutilmoqda…" : "Kirish"}
      </button>
    </form>);
}
