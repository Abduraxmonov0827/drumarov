import Link from "next/link";
import { ServiceForm } from "../service-form";
export default function NewServicePage() {
    return (<div>
      <Link href="/admin/services" className="text-sm text-brand hover:underline">
        ← Ro‘yxat
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Yangi xizmat</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <ServiceForm />
      </div>
    </div>);
}
