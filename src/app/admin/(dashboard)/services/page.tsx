import Link from "next/link";
import { deleteService } from "@/app/actions/admin-mutations";
import { prisma } from "@/lib/prisma";
export default async function AdminServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { sortOrder: "asc" },
        include: { department: true },
    });
    return (<div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Xizmatlar</h1>
        <Link href="/admin/services/new" className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-medium text-white hover:bg-brand-accent/90">
          Yangi xizmat
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Bo‘lim</th>
              <th className="px-4 py-3 font-medium"/>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (<tr key={s.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                <td className="px-4 py-3 text-slate-600">{s.department?.name ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/services/${s.id}`} className="text-brand hover:underline">
                    Tahrirlash
                  </Link>
                  <form action={deleteService.bind(null, s.id)} className="ml-3 inline">
                    <button type="submit" className="text-red-600 hover:underline">
                      O‘chirish
                    </button>
                  </form>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
}
