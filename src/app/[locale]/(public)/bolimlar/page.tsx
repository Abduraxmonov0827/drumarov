import { LocalizedLink } from "@/components/localized-link";
import { DepartmentIcon } from "@/components/department-icon";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    return { title: getDictionary(locale).pages.departments.title };
}
export default async function DepartmentsPage({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(locale);
    const p = dict.pages.departments;
    const departments = await prisma.department.findMany({
        orderBy: { sortOrder: "asc" },
    });
    return (<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">{p.title}</h1>
      <p className="mt-3 max-w-2xl text-brand-muted">{p.intro}</p>
      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6">
        {departments.map((d) => (<LocalizedLink key={d.id} href={`/bolimlar/${d.slug}`} className="medfit-card flex gap-4 rounded-xl border border-brand/15 p-5 shadow-md shadow-brand/10 transition hover:border-brand/30 sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand/10 bg-white/75 text-brand backdrop-blur-sm">
              <DepartmentIcon name={d.icon} className="h-6 w-6"/>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-brand">{d.name}</h2>
              <p className="mt-2 text-sm text-brand-muted">{d.shortDescription}</p>
            </div>
          </LocalizedLink>))}
      </div>
    </div>);
}
