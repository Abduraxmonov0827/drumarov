"use client";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-brand-accent py-2.5 text-sm font-medium text-white hover:bg-brand-accent/90 disabled:opacity-60"
    >
      {pending ? "Kutilmoqda…" : "Kirish"}
    </button>
  );
}

export function LoginForm() {
  return (
    <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
          placeholder="admin@klinika.uz"
        />
      </div>
      <div>
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor="password"
        >
          Parol
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
