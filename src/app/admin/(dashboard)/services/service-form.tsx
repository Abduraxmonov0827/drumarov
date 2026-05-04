import { saveService } from "@/app/actions/admin-mutations";
import { prisma } from "@/lib/prisma";
type Row = NonNullable<Awaited<ReturnType<typeof prisma.service.findUnique>>>;
export async function ServiceForm({ service }: {
    service?: Row | null;
}) {
    const departments = await prisma.department.findMany({
        orderBy: { sortOrder: "asc" },
    });
    return (<form action={saveService} className="mx-auto max-w-2xl space-y-4">
      {service ? <input type="hidden" name="id" value={service.id}/> : null}
      <div>
        <label className="text-sm font-medium text-slate-700">Xizmat nomi</label>
        <input name="name" required defaultValue={service?.name} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Slug</label>
        <input name="slug" defaultValue={service?.slug} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Tavsif</label>
        <textarea name="description" required rows={4} defaultValue={service?.description} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Bo‘lim (ixtiyoriy)</label>
        <select name="departmentId" defaultValue={service?.departmentId ?? ""} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="">—</option>
          {departments.map((d) => (<option key={d.id} value={d.id}>
              {d.name}
            </option>))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Tartib</label>
        <input name="sortOrder" type="number" defaultValue={service?.sortOrder ?? 0} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <button type="submit" className="rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-accent/90">
        Saqlash
      </button>
    </form>);
}
