import Link from "next/link";
import { DoctorForm } from "../doctor-form";
export default function NewDoctorPage() {
    return (<div>
      <Link href="/admin/doctors" className="text-sm text-brand hover:underline">
        ← Ro‘yxatga qaytish
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Yangi shifokor</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <DoctorForm />
      </div>
    </div>);
}
