import Link from "next/link";
import { LoginForm } from "./login-form";
export default async function AdminLoginPage({ searchParams, }: {
    searchParams: Promise<{
        err?: string;
    }>;
}) {
    const sp = await searchParams;
    const configErr = sp.err === "config";
    return (<div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Admin panel</h1>
        <p className="mt-1 text-sm text-slate-600">Tizimga kiring</p>
        {configErr && (<p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
            .env faylida ADMIN_JWT_SECRET (kamida 16 belgi) sozlang.
          </p>)}
        <LoginForm />
        <p className="mt-6 text-center text-xs text-slate-500">
          <Link href="/" className="text-brand hover:underline">
            Saytga qaytish
          </Link>
        </p>
      </div>
    </div>);
}
