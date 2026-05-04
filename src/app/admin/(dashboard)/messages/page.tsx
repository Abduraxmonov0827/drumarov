import { setContactStatusForm } from "@/app/actions/admin-mutations";
import { prisma } from "@/lib/prisma";
export default async function AdminMessagesPage() {
    const list = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
    });
    return (<div>
      <h1 className="text-2xl font-semibold text-slate-900">Aloqa xabarlari</h1>
      <p className="mt-1 text-sm text-slate-600">Kontakt formasidan kelgan murojaatlar.</p>
      <div className="mt-6 space-y-4">
        {list.map((m) => (<div key={m.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{m.name}</p>
                <p className="text-sm text-slate-600">
                  {m.email}
                  {m.phone ? ` · ${m.phone}` : ""}
                </p>
                {m.subject ? (<p className="mt-2 text-sm font-medium text-slate-800">{m.subject}</p>) : null}
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{m.message}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {m.createdAt.toLocaleString("uz-UZ")}
                </p>
              </div>
              <form action={setContactStatusForm} className="flex items-center gap-2">
                <input type="hidden" name="id" value={m.id}/>
                <select name="status" defaultValue={m.status} className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm">
                  <option value="NEW">Yangi</option>
                  <option value="READ">O‘qilgan</option>
                  <option value="ARCHIVED">Arxiv</option>
                </select>
                <button type="submit" className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-900">
                  Saqlash
                </button>
              </form>
            </div>
          </div>))}
        {list.length === 0 ? (<p className="text-sm text-slate-500">Xabarlar yo‘q.</p>) : null}
      </div>
    </div>);
}
