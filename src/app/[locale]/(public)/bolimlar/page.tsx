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
    return (<section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#07274c]/90 via-[#0a3464]/80 to-[#0b2a53]/85 p-6 shadow-[0_20px_55px_rgba(1,10,28,0.45)] sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{p.title}</h1>
        <p className="mt-3 max-w-2xl text-sky-100/85">{p.intro}</p>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6">
          {departments.map((d) => (<LocalizedLink key={d.id} href={`/bolimlar/${d.slug}`} className="glass-soft flex gap-4 rounded-2xl border border-white/20 p-5 transition hover:-translate-y-1 hover:border-cyan-200/40 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-cyan-100 backdrop-blur-sm">
                <DepartmentIcon name={d.icon} className="h-6 w-6"/>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{d.name}</h2>
                <p className="mt-2 text-sm leading-6 text-sky-100/85">{d.shortDescription}</p>
              </div>
            </LocalizedLink>))}
        </div>
      </div>
    </section>);
}
