import { saveDepartment } from "@/app/actions/admin-mutations";
import type { Department } from "@/generated/prisma/client";
type Row = Department;
const icons = ["Building2", "Heart", "Microscope", "Scissors", "Sparkles", "Stethoscope"];
export async function DepartmentForm({ department }: {
    department?: Row | null;
}) {
    return (<form action={saveDepartment} className="mx-auto max-w-2xl space-y-4">
      {department ? <input type="hidden" name="id" value={department.id}/> : null}
      <div>
        <label className="text-sm font-medium text-slate-700">Bo‘lim nomi</label>
        <input name="name" required defaultValue={department?.name} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Slug</label>
        <input name="slug" defaultValue={department?.slug} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Qisqa tavsif</label>
        <textarea name="shortDescription" required rows={2} defaultValue={department?.shortDescription} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Batafsil</label>
        <textarea name="description" required rows={6} defaultValue={department?.description} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Ikon (lucide nomi)</label>
        <select name="icon" defaultValue={department?.icon ?? "Building2"} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {icons.map((i) => (<option key={i} value={i}>
              {i}
            </option>))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Tartib</label>
        <input name="sortOrder" type="number" defaultValue={department?.sortOrder ?? 0} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <button type="submit" className="rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-accent/90">
        Saqlash
      </button>
    </form>);
}
