import { setAppointmentStatusForm } from "@/app/actions/admin-mutations";
import { prisma } from "@/lib/prisma";
export default async function AdminAppointmentsPage() {
    const list = await prisma.appointment.findMany({
        orderBy: { createdAt: "desc" },
        include: { department: true },
        take: 100,
    });
    return (<div>
      <h1 className="text-2xl font-semibold text-slate-900">Qabul so‘rovlari</h1>
      <p className="mt-1 text-sm text-slate-600">
        Foydalanuvchi qoldirgan yozuvlar va holatini boshqarish.
      </p>
      <div className="mt-6 space-y-4">
        {list.map((a) => (<div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{a.name}</p>
                <p className="text-sm text-slate-600">
                  {a.email} · {a.phone}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Bo‘lim: <strong>{a.department.name}</strong> · {a.preferredDate}{" "}
                  {a.preferredTime}
                </p>
                {a.message ? (<p className="mt-2 text-sm text-slate-600">{a.message}</p>) : null}
                <p className="mt-2 text-xs text-slate-400">
                  {a.createdAt.toLocaleString("uz-UZ")}
                </p>
              </div>
              <form action={setAppointmentStatusForm} className="flex items-center gap-2">
                <input type="hidden" name="id" value={a.id}/>
                <select name="status" defaultValue={a.status} className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm">
                  <option value="NEW">Yangi</option>
                  <option value="CONFIRMED">Tasdiqlangan</option>
                  <option value="DONE">Yakunlangan</option>
                  <option value="CANCELLED">Bekor qilingan</option>
                </select>
                <button type="submit" className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-900">
                  Saqlash
                </button>
              </form>
            </div>
          </div>))}
        {list.length === 0 ? (<p className="text-sm text-slate-500">Hozircha yozuvlar yo‘q.</p>) : null}
      </div>
    </div>);
}
