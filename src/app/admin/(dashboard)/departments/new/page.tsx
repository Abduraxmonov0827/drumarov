import Link from "next/link";
import { DepartmentForm } from "../department-form";
export default function NewDepartmentPage() {
    return (<div>
      <Link href="/admin/departments" className="text-sm text-brand hover:underline">
        ← Ro‘yxat
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Yangi bo‘lim</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <DepartmentForm />
      </div>
    </div>);
}
