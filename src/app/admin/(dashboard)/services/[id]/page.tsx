import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceForm } from "../service-form";
import { prisma } from "@/lib/prisma";
export default async function EditServicePage({ params, }: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service)
        notFound();
    return (<div>
      <Link href="/admin/services" className="text-sm text-brand hover:underline">
        ← Ro‘yxat
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Xizmatni tahrirlash</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <ServiceForm service={service}/>
      </div>
    </div>);
}
