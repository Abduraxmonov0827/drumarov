import Link from "next/link";
import { notFound } from "next/navigation";
import { DepartmentForm } from "../department-form";
import { prisma } from "@/lib/prisma";
export default async function EditDepartmentPage({ params, }: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;
    const department = await prisma.department.findUnique({ where: { id } });
    if (!department)
        notFound();
    return (<div>
      <Link href="/admin/departments" className="text-sm text-brand hover:underline">
        ← Ro‘yxat
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Bo‘limni tahrirlash</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <DepartmentForm department={department}/>
      </div>
    </div>);
}
