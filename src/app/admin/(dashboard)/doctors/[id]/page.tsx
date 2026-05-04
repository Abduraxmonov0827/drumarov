import Link from "next/link";
import { notFound } from "next/navigation";
import { DoctorForm } from "../doctor-form";
import { prisma } from "@/lib/prisma";
export default async function EditDoctorPage({ params, }: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;
    const doctor = await prisma.doctor.findUnique({ where: { id } });
    if (!doctor)
        notFound();
    return (<div>
      <Link href="/admin/doctors" className="text-sm text-brand hover:underline">
        ← Ro‘yxatga qaytish
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Shifokorni tahrirlash</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <DoctorForm doctor={doctor}/>
      </div>
    </div>);
}
