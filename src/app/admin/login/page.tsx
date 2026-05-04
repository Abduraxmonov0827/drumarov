import Link from "next/link";
import { LoginForm } from "./login-form";
export default async function AdminLoginPage({ searchParams, }: {
    searchParams: Promise<{
        err?: string;
    }>;
}) {
    const sp = await searchParams;
    const configErr = sp.err === "config";
    const authErr = sp.err === "auth";
    const serverErr = sp.err === "server";
    return (<div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Admin panel</h1>
        <p className="mt-1 text-sm text-slate-600">Tizimga kiring</p>
        {authErr && (<p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
            Email yoki parol noto‘g‘ri. Bazada admin bo‘lmasa, kompyuteringizda <code className="rounded bg-red-100 px-1">npm run db:seed</code> ishga tushiring (xuddi shu DATABASE_URL bilan).
          </p>)}
        {serverErr && (<p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
            Bazaga ulanishda xato. Vercelda DATABASE_URL (Neon) to‘g‘riligini va loglarni tekshiring.
          </p>)}
        {configErr && (<p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
            Vercelda ADMIN_JWT_SECRET (kamida 16 belgi) sozlang va qayta deploy qiling.
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
